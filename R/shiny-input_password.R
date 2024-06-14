#' @inherit shiny::passwordInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny input aliases
#' @export
input_password <- function(
  id,
  label,
  value = "",
  ...,
  width = NULL,
  placeholder = NULL
) {
  shiny::passwordInput(
    inputId = id,
    label = label,
    value = value,
    width = width,
    placeholder = placeholder
  )
}
