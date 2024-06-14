#' @inherit shiny::numericInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny input aliases
#' @export
input_numeric <- function(
  id,
  label,
  value,
  ...,
  min = NA,
  max = NA,
  step = NA,
  width = NULL
) {
  shiny::numericInput(
    inputId = id,
    label = label,
    value = value,
    min = min,
    max = max,
    step = step,
    width = width
  )
}

#' @inherit shiny::updateNumericInput params return title description details sections references
#'
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_numeric <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  min = NULL,
  max = NULL,
  step = NULL,
  session = get_current_session()
) {
  shiny::updateNumericInput(
    session = session,
    inputId = id,
    label = label,
    value = value,
    min = min,
    max = max,
    step = step
  )
}
