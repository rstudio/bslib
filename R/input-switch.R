#' Switch input control
#'
#' Create an on-off style switch control for specifying logical values.
#'
#' @examplesIf interactive()
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
  tag <- input_checkbox(id, label, class = "bslib-input-switch form-switch", value = value, width = width)
  tag <- tag_require(tag, version = 5, caller = "input_switch()")
  as_fragment(tag)
}

#' @rdname input_switch
#' @inheritParams nav_insert
#' @export
update_switch <- function(id, label = NULL, value = NULL, session = get_current_session()) {
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

  if (!rlang::is_string(id, n = 1)) {
    abort("`id` must be a single string containing the `id` of a switch input.")
  }

  msg <- dropNulls(list(id = session$ns(id), value = value))

  callback <- function() {
    session$sendCustomMessage("bslib.toggle-input-binary", msg)
  }

  session$onFlush(callback, once = TRUE)
}

# Keep this internal for now until we agree on the UX
input_dark_mode_switch <- function(id, ..., mode = NULL) {
  if (!is.null(mode)) {
    mode <- rlang::arg_match(mode, c("light", "dark"))
  }

  if (any(!nzchar(rlang::names2(rlang::list2(...))))) {
    abort("All arguments in `...` must be named.")
  }

  res <- web_component(
    "bslib-dark-mode-switch",
    id = id,
    "theme-attribute" = "data-bs-theme",
    "theme-value" = mode,
    style = css(
      "--text-1" = "var(--bs-emphasis-color)",
      "--text-2" = "var(--bs-tertiary-color)",
      # The vertical correction used in the dark mode component isn't quite
      # right on Bootstrap pages. This next line overrides it and removes the
      # vertical correction. But users can still set the CSS property manually
      # in their a `style` argument passed in via `...` if they want.
      "--vertical-correction" = " "
    ),
    ...
  )

  res <- tag_require(res, version = 5, caller = "input_dark_mode_switch()")
  as_fragment(res)
}

toggle_dark_mode_switch <- function(id, mode = NULL, session = get_current_session()) {
  mode <- mode %||% "toggle"

  mode <- tryCatch(
    rlang::arg_match(mode, c("light", "dark", "toggle")),
    error = function(err) {
      rlang::warn(rlang::cnd_message(err))
      mode
    }
  )

  if (!rlang::is_string(id)) {
    abort("`id` must be a single string containing the `id` of a switch input.")
  }

  session$sendInputMessage(id, list(method = "toggle", value = mode))
}


input_checkbox <- function(id, label, class = "bslib-input-checkbox", value = FALSE, width = NULL, inline = FALSE) {
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
      )
    ),
    component_dependency_js("bslibShiny")
  )
}
