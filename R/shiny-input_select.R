#' @inherit shiny::selectInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny:
#'   `r docs_callout_shiny_alias("input_select", "selectInput")`
#'
#'   Note that, unlike in [shiny::selectInput()], `input_select()` does not
#'   use selectize.js by default. Insttead, set `selectize = TRUE` or call
#'   [input_selectize()] directly.
#'
#' @seealso [update_select()] to programmatically update a select input.
#'
#' @family Shiny input aliases
#' @export
input_select <- function(
  id,
  label,
  choices,
  selected = NULL,
  ...,
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
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("update_select", "updateSelectInput")`
#'
#' @seealso [input_select()] to create a select input.
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
