#' Switch input control
#'
#' Create an on-off style switch control for specifying logical values.
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
  tag <- input_checkbox(id, label, class = "form-check form-switch", value = value, width = width)
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

input_checkbox <- function(id, label, class = "form-check", value = FALSE, width = NULL, inline = FALSE) {
  div(
    class = "form-group shiny-input-container",
    class = if (inline) "shiny-input-container-inline",
    style = css(width = width),
    div(
      class = class,
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
    )
  )
}
