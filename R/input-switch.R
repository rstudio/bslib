#' Create a switch input
#'
#' @param id an input id.
#' @param label a label for the switch.
#' @param value whether or not the switch should be checked by default.
#' @param width a valid CSS unit defining the width.
#' @export
input_switch <- function(id, label, value = FALSE, width = NULL, inline = TRUE) {
  tag <- input_checkbox(id, label, class = "form-check form-switch", value = value, width = width, inline = inline)
  tag <- tag_require(tag, version = 5, caller = "input_switch()")
  as_fragment(tag)
}

#' @rdname input_switch
#' @export
update_switch <- function(id, label = NULL, value = NULL, session = shiny::getDefaultReactiveDomain()) {
  message <- dropNulls(list(label = label, value = value))
  session$sendInputMessage(id, message)
}

input_checkbox <- function(id, label, class = "form-check", value = FALSE, width = NULL, inline = FALSE) {
  div(
    div(
      tags$input(
        id = id,
        class = "form-check-input",
        type = "checkbox",
        checked = if (value) NA,
      ),
      tags$label(
        # The span here is needed to adhere to shiny.js' checkbox binding logic
        # https://github.com/rstudio/shiny/blob/c21ba0b/srcts/src/bindings/input/checkbox.ts#L42-L43
        tags$span(label),
        class = "form-check-label",
        `for_` = id
      ),
      class = class,
    ),
    class = "form-group shiny-input-container",
    class = if (inline) "shiny-input-container-inline",
    style = css(width = width),
  )
}
