#' @inherit shiny::fileInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("input_file", "fileInput")`
#'
#' @family Shiny input aliases
#' @export
input_file <- function(
  id,
  label,
  ...,
  multiple = FALSE,
  accept = NULL,
  width = NULL,
  buttonLabel = "Browse...",
  placeholder = "No file selected",
  capture = NULL
) {
  shiny::fileInput(
    inputId = id,
    label = label,
    multiple = multiple,
    accept = accept,
    width = width,
    buttonLabel = buttonLabel,
    placeholder = placeholder,
    capture = capture
  )
}
