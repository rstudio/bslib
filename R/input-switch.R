#' Switch input control
#'
#' @description
#' Create an on-off style switch control for specifying logical values.
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fixed(
#'   title = "Keyboard Settings",
#'   h2("Keyboard Settings"),
#'   input_switch("auto_capitalization", "Auto-Capitalization", TRUE),
#'   input_switch("auto_correction", "Auto-Correction", TRUE),
#'   input_switch("check_spelling", "Check Spelling", TRUE),
#'   input_switch("smart_punctuation", "Smart Punctuation"),
#'   h2("Preview"),
#'   verbatimTextOutput("preview")
#' )
#'
#' server <- function(input, output, session) {
#'   output$preview <- renderPrint({
#'     list(
#'       auto_capitalization = input$auto_capitalization,
#'       auto_correction = input$auto_correction,
#'       check_spelling = input$check_spelling,
#'       smart_punctuation = input$smart_punctuation
#'     )
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @param id An input id.
#' @param label A label for the switch.
#' @param value Whether or not the switch should be checked by default.
#' @param width Any valid [CSS unit][htmltools::validateCssUnit] (e.g.,
#'   `width="200px"`).
#'
#' @return Returns a UI element for a switch input control. The server value
#'   received for the input corresponding to `id` will be a logical
#'   (`TRUE`/`FALSE`) value.
#'
#' @family input controls
#' @export
input_switch <- function(id, label, value = FALSE, width = NULL) {
  value <- shiny::restoreInput(id, default = value)
  tag <- input_checkbox(
    id,
    label,
    class = "bslib-input-switch form-switch",
    value = value,
    width = width
  )
  tag <- tag_require(tag, version = 5, caller = "input_switch()")
  as_fragment(tag)
}

#' @rdname input_switch
#' @inheritParams nav_insert
#' @export
update_switch <- function(
  id,
  label = NULL,
  value = NULL,
  session = get_current_session()
) {
  message <- dropNulls(list(label = label, value = value))
  session$sendInputMessage(id, message)
}

#' @rdname input_switch
#' @inheritParams toggle_sidebar
#' @export
toggle_switch <- function(id, value = NULL, session = get_current_session()) {
  if (!is.null(value) && !rlang::is_logical(value, n = 1)) {
    abort("`value` must be a `NULL` or a single logical value.")
  }

  if (!rlang::is_string(id)) {
    abort("`id` must be a single string containing the `id` of a switch input.")
  }

  msg <- dropNulls(list(id = session$ns(id), value = value))

  callback <- function() {
    session$sendCustomMessage("bslib.toggle-input-binary", msg)
  }

  session$onFlush(callback, once = TRUE)
}

input_checkbox <- function(
  id,
  label,
  class = "bslib-input-checkbox",
  value = FALSE,
  width = NULL,
  inline = FALSE
) {
  div(
    class = "form-group shiny-input-container",
    class = if (inline) "shiny-input-container-inline",
    style = css(width = width),
    div(
      class = class,
      class = "form-check",
      tags$input(
        id = id,
        class = "form-check-input",
        type = "checkbox",
        role = "switch",
        checked = if (value) NA,
      ),
      tags$label(
        # The span here is needed to adhere to shiny.js' checkbox binding logic
        # https://github.com/rstudio/shiny/blob/c21ba0b/srcts/src/bindings/input/checkbox.ts#L42-L43
        tags$span(label),
        class = "form-check-label",
        `for` = id
      ),
      component_dependencies()
    )
  )
}
