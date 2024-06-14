#' @inherit shiny::sliderInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny input aliases
#' @export
input_slider <- function(
  id,
  label,
  min,
  max,
  value,
  ...,
  step = NULL,
  round = FALSE,
  ticks = TRUE,
  animate = FALSE,
  width = NULL,
  sep = ",",
  pre = NULL,
  post = NULL,
  timeFormat = NULL,
  timezone = NULL,
  dragRange = TRUE
) {
  shiny::sliderInput(
    inputId = id,
    label = label,
    min = min,
    max = max,
    value = value,
    step = step,
    round = round,
    ticks = ticks,
    animate = animate,
    width = width,
    sep = sep,
    pre = pre,
    post = post,
    timeFormat = timeFormat,
    timezone = timezone,
    dragRange = dragRange
  )
}

#' @inherit shiny::updateSliderInput params return title description details sections references
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_slider <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  min = NULL,
  max = NULL,
  step = NULL,
  timeFormat = NULL,
  timezone = NULL,
  session = get_current_session()
) {
  shiny::updateSliderInput(
    session = session,
    inputId = id,
    label = label,
    value = value,
    min = min,
    max = max,
    step = step,
    timeFormat = timeFormat,
    timezone = timezone
  )
}
