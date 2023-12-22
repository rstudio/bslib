#' Button for launching longer-running operations
#'
#' @description
#' `input_task_button` is a button whose value is initially zero, and increments
#' by one each time it is pressed. It is similar to [shiny::actionButton()],
#' except that upon click, it puts itself into a busy state that prevents the
#' user from clicking it again.
#'
#' In order to re-enable the button, `update_task_button(id, busy = FALSE)` must
#' be called from the server function.
#'
#' Note that, as a general rule, Shiny's `update` family of functions do not
#' take effect at the instant that they are called, but are held until the end
#' of the current flush cycle. So if you have many different reactive
#' calculations and outputs, you don't have to be too careful about when you
#' call `update_task_button(id, busy = FALSE)`, as the button on the client will
#' not actually re-enable until the same moment that all of the updated outputs
#' simultaneously sent to the client.
#'
#' @param id The `input` slot that will be used to access the value.
#' @param label The label of the button while it is in ready (clickable) state;
#'   usually a string.
#' @param icon An optional icon to display next to the label while the button is
#'   in ready state. See [fontawesome::fa_i()].
#' @param busy_label The label of the button while it is busy.
#' @param busy_icon The icon to display while the button is busy. By default, a
#'   spinning "chasing arrows" icon is used.
#' @param type One of the Bootstrap theme colors (`"primary"`, `"default"`,
#'   `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"light"`,
#'   `"dark"`), or `NULL` to leave off the Bootstrap-specific button CSS classes
#'   altogether.
#' @param ... Named arguments become attributes to include on the `<button>`
#'   element.
#'
#' @section Server value:
#' An integer of class `"shinyActionButtonValue"`. This class differs from
#' ordinary integers in that a value of 0 is considered "falsy".
#' This implies two things:
#'   * Event handlers (e.g., [shiny::observeEvent()], [shiny::eventReactive()]) won't execute on initial load.
#'   * Input validation (e.g., [shiny::req()], [shiny::need()]) will fail on initial load.
#'
#' @export
input_task_button <- function(id, label, icon = NULL,
  busy_label = "Processing...", busy_icon = icon_spinner(), type = "primary",
  ...) {

  tags$button(
    id = id,
    class = if (!is.null(type)) paste0("btn btn-", type),
    class = "bslib-task-button",
    type = "button",

    component_dependencies(),

    htmltools::tag("bslib-switch-inline",
      list(
        case = "ready",
        span(slot = "ready",
          icon, label
        ),
        span(slot = "busy",
          busy_icon, busy_label
        )
      )
    ),

    ...
  )
}

#' @rdname input_task_button
#' @export
icon_spinner <- function() {
  fontawesome::fa_i("refresh", class = "fa-spin", "aria-hidden" = "true")
}

#' @param busy If `TRUE`, put the button into busy/disabled state. If `FALSE`,
#'   put the button into ready/enabled state.
#' @param session The `session` object; using the default is recommended.
#' @rdname input_task_button
#' @export
update_task_button <- function(id, busy = NULL, session = get_current_session()) {
  force(id)
  force(busy)

  session$sendInputMessage(id, dropNulls(list(busy = busy)))
}
