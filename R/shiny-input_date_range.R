#' @inherit shiny::dateRangeInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("input_date_range", "dateRangeInput")`
#'
#' @seealso [update_date_range()] to programmatically update a date range input.
#'
#' @family Shiny input aliases
#' @export
input_date_range <- function(
  id,
  label,
  start = NULL,
  end = NULL,
  ...,
  min = NULL,
  max = NULL,
  format = "yyyy-mm-dd",
  startview = "month",
  weekstart = 0,
  language = "en",
  separator = " to ",
  width = NULL,
  autoclose = TRUE
) {
  shiny::dateRangeInput(
    inputId = id,
    label = label,
    start = start,
    end = end,
    min = min,
    max = max,
    format = format,
    startview = startview,
    weekstart = weekstart,
    language = language,
    separator = separator,
    width = width,
    autoclose = autoclose
  )
}

#' @inherit shiny::updateDateRangeInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("update_date_range", "updateDateRangeInput")`
#'
#' @seealso [input_date_range()] to create a date range input.
#'
#' @family Shiny update aliases
#' @export
update_date_range <- function(
  id,
  ...,
  label = NULL,
  start = NULL,
  end = NULL,
  min = NULL,
  max = NULL,
  session = get_current_session()
) {
  shiny::updateDateRangeInput(
    session = session,
    inputId = id,
    label = label,
    start = start,
    end = end,
    min = min,
    max = max
  )
}
