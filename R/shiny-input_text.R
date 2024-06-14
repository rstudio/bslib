#' @inherit shiny::textInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny input aliases
#' @export
input_text <- function(
  id,
  label,
  value = "",
  ...,
  width = NULL,
  placeholder = NULL
) {
  shiny::textInput(
    inputId = id,
    label = label,
    value = value,
    width = width,
    placeholder = placeholder
  )
}

#' @inherit shiny::updateTextInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_text <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  placeholder = NULL,
  session = get_current_session()
) {
  shiny::updateTextInput(
    session = session,
    inputId = id,
    label = label,
    value = value,
    placeholder = placeholder
  )
}
