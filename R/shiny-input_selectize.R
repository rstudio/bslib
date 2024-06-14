#' @inherit shiny::selectizeInput params return title description details sections references
#'
#' @inheritParams input_action_button
#'
#' @family Shiny input aliases
#' @export
input_selectize <- function(
  id,
  ...,
  options = NULL,
  width = NULL
) {
  shiny::selectizeInput(
    inputId = id,
    ...,
    options = options,
    width = width
  )
}

#' @inherit shiny::updateSelectizeInput params return title description details sections references
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_selectize <- function(
  id,
  ...,
  label = NULL,
  choices = NULL,
  selected = NULL,
  options = list(),
  server = FALSE,
  session = get_current_session()
) {
  shiny::updateSelectizeInput(
    session = session,
    inputId = id,
    label = label,
    choices = choices,
    selected = selected,
    options = options,
    server = server
  )
}
