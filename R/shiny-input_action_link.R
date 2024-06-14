#' @inherit shiny::actionLink params return title description details sections references
#'
#' @inheritParams input_action_button
#'
#' @family Shiny input aliases
#' @export
input_action_link <- function(
  id,
  label,
  icon = NULL,
  ...
) {
  shiny::actionLink(
    inputId = id,
    label = list(icon, label), # avoid shiny's icon validation
    ...
  )
}

#' @inherit shiny::updateActionLink params return title description details sections references
#' @inheritParams update_action_button
#'
#' @family Shiny update aliases
#' @export
update_action_link <- function(
  id,
  ...,
  label = NULL,
  icon = NULL,
  session = get_current_session
) {
  update_action_button(
    id = id,
    label = label,
    icon = icon,
    session = session
  )
}
