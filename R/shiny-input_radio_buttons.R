#' @inherit shiny::radioButtons params return title description details sections references
#'
#' @inheritParams input_action_button
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny input aliases
#' @export
input_radio_buttons <- function(
  id,
  label,
  choices = NULL,
  selected = NULL,
  ...,
  inline = FALSE,
  width = NULL,
  choiceNames = NULL,
  choiceValues = NULL
) {
  shiny::radioButtons(
    inputId = id,
    label = label,
    choices = choices,
    selected = selected,
    inline = inline,
    width = width,
    choiceNames = choiceNames,
    choiceValues = choiceValues
  )
}

#' @inherit shiny::updateRadioButtons params return title description details sections references
#'
#' @param ... Ignored, included for future expansion.
#'
#' @family Shiny update aliases
#' @export
update_radio_buttons <- function(
  id,
  ...,
  label = NULL,
  choices = NULL,
  selected = NULL,
  inline = FALSE,
  choiceNames = NULL,
  choiceValues = NULL,
  session = get_current_session()
) {
  shiny::updateRadioButtons(
    session = session,
    inputId = id,
    label = label,
    choices = choices,
    selected = selected,
    inline = inline,
    choiceNames = choiceNames,
    choiceValues = choiceValues
  )
}
