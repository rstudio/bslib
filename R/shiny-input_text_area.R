#' @inherit shiny::textAreaInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("input_text_area", "textAreaInput")`
#'
#' @seealso [update_text_area()] to programmatically update a text area input.
#'
#' @family Shiny input aliases
#' @export
input_text_area <- function(
  id,
  label,
  value = "",
  ...,
  width = NULL,
  height = NULL,
  cols = NULL,
  rows = NULL,
  placeholder = NULL,
  resize = NULL
) {
  shiny::textAreaInput(
    inputId = id,
    label = label,
    value = value,
    width = width,
    height = height,
    cols = cols,
    rows = rows,
    placeholder = placeholder,
    resize = resize
  )
}

#' @inherit shiny::updateTextAreaInput params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("update_text_area", "updateTextAreaInput")`
#'
#' @seealso [input_text_area()] to create a text area input.
#'
#' @family Shiny update aliases
#' @export
update_text_area <- function(
  id,
  ...,
  label = NULL,
  value = NULL,
  placeholder = NULL,
  session = get_current_session()
) {
  shiny::updateTextAreaInput(
    session = session,
    inputId = id,
    label = label,
    value = value,
    placeholder = placeholder
  )
}
