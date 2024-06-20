#' @inherit shiny::selectizeInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("input_selectize", "selectizeInput")`
#'
#' @seealso [update_selectize()] to programmatically update a selectize input.
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
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("update_selectize", "updateSelectizeInput")`
#'
#' @seealso [input_selectize()] to create a selectize input.
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
