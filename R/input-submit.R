#' Suspend input changes until a button is clicked
#'
#' Suspend changes to a particular set of input controls until a submit button
#' is clicked. This is particularly useful for allowing the user to review their
#' input(s) before sending them to the server for a potentially expensive
#' operation. Note that, by default, all inputs that are children of the
#' button's parent are deferred until the button is clicked. This can be changed
#' by setting the `scope` argument to a CSS selector that matches the container
#' of inputs you wish to suspend.
#'
#' @param id The input ID.
#' @param label A label to place on the button.
#' @param ... Arguments passed along to [input_task_button()].
#' @param scope The scope of the submit button. Can be one of the following:
#' - `NULL`: Inputs that are children of the button's parent are
#'    deferred until the button is clicked.
#' - A CSS selector: Only inputs that are within the element matching the
#'   selector are deferred until the button is clicked.
#'
#' @seealso [input_submit_textarea()], [input_task_button()]
#' @export
input_submit_button <- function(id, label, ..., scope = NULL) {
  rlang::check_installed("shiny", version = "1.11.0")

  btn <- input_task_button(id, label, ...)

  # Change type from "button" to "submit"
  btn$attribs$type <- "submit"

  tagAppendAttributes(
    btn,
    class = "bslib-submit-button",
    `data-submit-scope` = scope
  )
}


# TODO: maybe update_task_button() should gain label/icon arguments
# and then we can just call that here? Or just tell people to use
# update_task_button() directly?

## @param id The input ID.
## @param ... Currently ignored.
## @param label The label of the button.
## @param icon An optional icon to display next to the label while the button
##  is in ready state. See [fontawesome::fa_i()].
## @param session The `session` object; using the default is recommended.
## @rdname input_submit_button
## @export
#update_submit_button <- function(
#  id,
#  ...,
#  label = NULL,
#  icon = NULL,
#  session = get_current_session()
#) {
#
#}

#' Create a textarea input control with explicit submission
#'
#' Creates a textarea input where users can enter multi-line text and submit
#' their input using a dedicated button or keyboard shortcut. This control is
#' ideal when you want to capture finalized input, rather than reacting to every
#' keystroke, making it useful for chat boxes, comments, or other scenarios
#' where users may compose and review their text before submitting.
#'
#' @param id The input ID.
#' @param placeholder A character string giving the user a hint as to what can
#'   be entered into the control.
#' @param value The initial input text. Note that, unlike [textAreaInput()],
#'   this won't set a server-side value until the value is submitted.
#' @param button A [tags] element to use for the submit button. It's recommended
#'   that this be a [input_task_button()] since it will automatically provide a
#'   busy indicator (and disable) until the next flush occurs. Note also that if
#'   the submit button launches a [ExtendedTask], this button can also be bound
#'   to the task ([bind_task_button()]) and/or manually updated for more
#'   accurate progress reporting ([update_task_button()]).
#' @param submit_key A character string indicating what keyboard event should
#'   trigger the submit button. The default is `enter`, which will submit the
#'   input when the user presses the Enter/Return key. The `enter+modifier`
#'   option will submit the input when the user presses the Enter key while
#'   holding down Ctrl/Cmd.
#'
#' @return A textarea input control that can be added to a UI definition.
#'
#' @seealso [input_submit_button()], [input_task_button()]
#'
#' @examplesIf rlang::is_interactive()
#'
#' ui <- page_fluid(
#'   input_submit_textarea("text", "Enter some input..."),
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
#' A character string of the text input. The default value is `""` even if
#' `value` is provided. The value will only be set/updated when the user submits
#' the input by pressing the Enter key or clicking the submit button.
#'
#' @export
input_submit_textarea <- function(
  id,
  placeholder,
  value = "",
  ...,
  button = NULL,
  label = NULL,
  width = "min(600px, 100%)",
  submit_key = c("enter", "enter+modifier")
) {
  rlang::check_installed("shiny", version = "1.11.0")
  rlang::check_dots_empty()

  value <- shiny::restoreInput(id = id, default = value)
  if (length(value) != 1 || !is.character(value)) {
    stop("`value` must be a character string", call. = FALSE)
  }

  submit_key <- rlang::arg_match(submit_key)
  needs_modifier <- isTRUE(submit_key == "enter+modifier")

  if (is.null(button)) {
    if (needs_modifier) {
      btn_label <- "Submit ⌘ ⏎"
      btn_title <- "Press ⌘ + Enter to Submit"
    } else {
      btn_label <- "Submit ⏎"
      btn_title <- "Press Enter to Submit"
    }

    button <- input_task_button(
      id = paste0(id, "_submit"),
      class = "btn-sm",
      label = btn_label,
      title = btn_title,
      `aria-label` = btn_title
    )
  }

  if (!is_button_tag(button)) {
    stop("`button` must be a `tags$button()`", call. = FALSE)
  }

  div(
    class = "shiny-input-container bslib-mb-spacing",
    style = css(
      # TODO: validateCssUnit() needs to handle more complex CSS
      width = if (is.numeric(width)) paste0(width, "px") else width,
    ),
    shiny_input_label(id, label),
    div(
      class = "bslib-input-textsubmit",
      tags$textarea(
        id = id,
        class = "textarea-autoresize form-control",
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
    label = label,
    submit = submit,
    focus = focus
  ))

  session$sendInputMessage(id, message)
}
