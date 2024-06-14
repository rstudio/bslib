#' @inherit shiny::dateInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @note `r docs_callout_shiny_alias("input_date", "dateInput")`
#'
#' @family Shiny input aliases
#' @export
input_date <- function(
  id,
  label,
  value = NULL,
  ...,
  min = NULL,
  max = NULL,
  format = "yyyy-mm-dd",
  startview = "month",
  weekstart = 0,
  language = "en",
  width = NULL,
  autoclose = TRUE,
  datesdisabled = NULL,
  daysofweekdisabled = NULL
) {
  shiny::dateInput(
    inputId = id,
    label = label,
    value = value,
    min = min,
    max = max,
    format = format,
    startview = startview,
    weekstart = weekstart,
    language = language,
    width = width,
    autoclose = autoclose,
    datesdisabled = datesdisabled,
    daysofweekdisabled = daysofweekdisabled
  )
}

#' @inherit shiny::updateDateInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @note `r docs_callout_shiny_alias("update_date", "updateDateInput")`
#'
#' @family Shiny update aliases
#' @export
update_date <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  min = NULL,
  max = NULL,
  session = get_current_session()
) {
  shiny::updateDateInput(
    session = session,
    inputId = id,
    label = label,
    value = value,
    min = min,
    max = max
  )
}
