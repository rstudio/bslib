#' @inherit shiny::selectInput params return title description details sections references
#'
#' @inheritParams input_action_button
#'
#' @family Shiny input aliases
#' @export
input_select <- function(
  id,
  label,
  choices,
  selected = NULL,
  multiple = FALSE,
  selectize = FALSE, # Match Shiny for Python
  width = NULL,
  size = NULL
) {
  shiny::selectInput(
    inputId = id,
    label = label,
    choices = choices,
    selected = selected,
    multiple = multiple,
    selectize = selectize,
    width = width,
    size = size
  )
}

#' @inherit shiny::updateSelectInput params return title description details sections references
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_select <- function(
  id,
  ...,
  label = NULL,
  choices = NULL,
  selected = NULL,
  session = get_current_session()
) {
  shiny::updateSelectInput(
    session = session,
    inputId = id,
    label = label,
    choices = choices,
    selected = selected
  )
}
