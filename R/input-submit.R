#' Create a textarea input control with explicit submission
#'
#' Creates a textarea input where users can enter multi-line text and submit
#' their input using a dedicated button or keyboard shortcut. This control is
#' ideal when you want to capture finalized input, rather than reacting to every
#' keystroke, making it useful for chat boxes, comments, or other scenarios
#' where users may compose and review their text before submitting.
#'
#' @param id The input ID.
#' @param label The label to display above the input control. If `NULL`, no
#'   label is displayed.
#' @param placeholder The placeholder text to display when the input is empty.
#'   This can be used to provide a hint or example of the expected input.
#' @param value The initial input text. Note that, unlike [textAreaInput()],
#'   this won't set a server-side value until the value is explicitly submitted.
#' @param ... Currently not used.
#' @param button A [tags] element to use for the submit button. It's recommended
#'   that this be a [input_task_button()] since it will automatically provide a
#'   busy indicator (and disable) until the next flush occurs. Note also that if
#'   the submit button launches a [ExtendedTask], this button can also be bound
#'   to the task ([bind_task_button()]) and/or manually updated for more
#'   accurate progress reporting ([update_task_button()]).
#' @param width Any valid CSS unit (e.g., `width="100%"`).
#' @param submit_key A character string indicating what keyboard event should
#'   trigger the submit button. The default is `enter+modifier`, which requires
#'   the user to hold down Ctrl (or Cmd on Mac) before pressing Enter to
#'   submit. This helps prevent accidental submissions. To allow submission with
#'   just the Enter key, use `enter`. In this case, the user can still insert
#'   new lines using Shift+Enter or Alt+Enter.
#'
#' @return A textarea input control that can be added to a UI definition.
#'
#' @seealso [update_submit_textarea()], [input_task_button()]
#'
#' @examplesIf rlang::is_interactive()
#'
#' ui <- page_fluid(
#'   input_submit_textarea("text", placeholder = "Enter some input..."),
#'   verbatimTextOutput("value")
#' )
#' server <- function(input, output) {
#'   output$value <- renderText({
#'     req(input$text)
#'     Sys.sleep(2)
#'     paste("You entered:", input$text)
#'   })
#' }
#' shinyApp(ui, server)
#'
#' @section Server value:
#' The server receives a character string containing the user's text input.
#'
#' **Important:** The initial server value is always `""` (empty string),
#' regardless of any `value` parameter provided to `input_submit_textarea()`.
#' The server value updates only when the user explicitly submits the input by
#' either pressing the Enter key (possibly with a modifier key) or clicking the
#' submit button.
#'
#' @export
input_submit_textarea <- function(
  id,
  label = NULL,
  placeholder = NULL,
  value = "",
  ...,
  button = NULL,
  width = "min(680px, 100%)",
  submit_key = c("enter+modifier", "enter")
) {
  rlang::check_installed("shiny", version = "1.11.1")
  rlang::check_dots_empty()

  value <- shiny::restoreInput(id = id, default = value)
  if (length(value) != 1 || !is.character(value)) {
    stop("`value` must be a character string", call. = FALSE)
  }

  submit_key <- rlang::arg_match(submit_key)
  needs_modifier <- isTRUE(submit_key == "enter+modifier")

  if (is.null(button)) {
    button <- input_task_button(
      id = paste0(id, "_submit"),
      class = "btn-sm",
      label = HTML("Submit <span class='modifier-key'></span> \U23CE"),
      title = "Press Enter to Submit",
      `aria-label` = "Press Enter to Submit"
    )
  }

  if (!is_button_tag(button)) {
    stop("`button` must be a `tags$button()`", call. = FALSE)
  }

  button <- tagAppendAttributes(button, class = "bslib-submit-textarea-btn")

  div(
    class = "bslib-submit-textarea shiny-input-container bslib-mb-spacing",
    style = css(
      # TODO: validateCssUnit() needs to handle more complex CSS
      width = if (is.numeric(width)) paste0(width, "px") else width,
    ),
    shiny_input_label(id, label),
    div(
      class = "bslib-submit-textarea-container",
      tags$textarea(
        id = id,
        class = "form-control",
        style = css(width = if (!is.null(width)) "100%"),
        placeholder = placeholder,
        `data-needs-modifier` = if (needs_modifier) "",
        rows = 1,
        value
      ),
      button
    )
  )
}

is_button_tag <- function(x) {
  if (!inherits(x, "shiny.tag")) {
    return(FALSE)
  }

  isTRUE(x$name == "button") ||
    isTRUE(x$attribs$type == "button")
}

#' @param value The value to set the user input to.
#' @param placeholder The placeholder text for the user input.
#' @param submit Whether to automatically submit the text for the user. Requires `value`.
#' @param focus Whether to move focus to the input element. Requires `value`.
#' @param session The `session` object; using the default is recommended.
#'
#' @rdname input_submit_textarea
#' @export
update_submit_textarea <- function(
  id,
  ...,
  value = NULL,
  placeholder = NULL,
  label = NULL,
  submit = FALSE,
  focus = FALSE,
  session = get_current_session()
) {
  rlang::check_dots_empty()

  if (is.null(value) && (submit || focus)) {
    stop(
      "An input `value` must be provided when `submit` or `focus` are `TRUE`.",
      call. = FALSE
    )
  }

  message <- dropNulls(list(
    value = value,
    placeholder = placeholder,
    label = if (!is.null(label)) processDeps(label, session),
    submit = submit,
    focus = focus
  ))

  session$sendInputMessage(id, message)
}
