#' @inherit shiny::checkboxInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("input_checkbox", "checkboxInput")`
#'
#' @family Shiny input aliases
#' @export
input_checkbox <- function(
  id,
  label,
  value = FALSE,
  ...,
  width = NULL
) {
  shiny::checkboxInput(
    inputId = id,
    label = label,
    value = value,
    width = width
  )
}

#' @inherit shiny::updateCheckboxInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("update_checkbox", "updateCheckboxInput")`
#'
#' @family Shiny update aliases
#' @export
update_checkbox <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  session = get_current_session()
) {
  shiny::updateCheckboxInput(
    session = session,
    inputId = id,
    label = label,
    value = value
  )
}
