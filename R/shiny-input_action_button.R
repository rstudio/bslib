#' @inherit shiny::actionButton params return title description details sections references
#'
#' @param id An input id.
#' @param label An input label.
#'
#' @family Shiny input aliases
#' @export
input_action_button <- function(
  id,
  label,
  ...,
  icon = NULL,
  width = NULL,
  disabled = FALSE
) {
  shiny::actionButton(
    inputId = id,
    label = list(icon, label), # avoid shiny's icon validation
    width = width,
    disabled = disabled,
    ...
  )
}

#' @inherit shiny::updateActionButton params return title description details sections references
#' @inheritParams input_action_button
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_action_button <- function(
  id,
  ...,
  label = NULL,
  icon = NULL,
  disabled = NULL,
  session = get_current_session()
) {
  # In-lined to avoid shiny's icon validation
  validate_session_object(session, "update_action_button")

  if (!is.null(icon)) icon <- as.character(icon)
  message <- dropNulls(list(label=label, icon=icon, disabled=disabled))
  session$sendInputMessage(id, message)
}
