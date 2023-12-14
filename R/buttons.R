button_spec <- function(label, icon, disabled = c(FALSE, TRUE)) {
  structure(
    list(label = label, icon = icon, disabled = disabled),
    class = c("button_spec", "list")
  )
}

apply_button_spec <- function(status, value, defaults, ...) {
  if (is.character(value) || is.null(value)) {
    value <- list(label = value)
  }
  resolved <- defaults
  resolved[names(value)] <- value

  tagList(
    tags$span(slot=paste0(status, "-icon"),
      resolved[["icon"]]
    ),
    tags$span(slot=paste0(status, "-label"),
      resolved[["label"]]
    )
  )
}

#' Button for launching longer-running operations
#'
#' `input_task_button` is a button whose value is initially zero, and increments
#' by one each time it is pressed. It is similar to [shiny::actionButton()],
#' except that upon click, it puts itself into a busy state that prevents the
#' user from clicking it again. `update_task_button(id, busy = FALSE)` must be
#' called from the server function to re-enable the button.
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

  if (missing(type)) {
    type <- "primary"
  }
  btn_class <- if (!is.null(type)) {
    paste0("btn btn-", type)
  }

  tags$button(
    id = id,
    class = btn_class,
    class = "bslib-task-button",
    type = "button",

    component_dependencies(),

    htmltools::tag("bslib-task-button-contents",
      list(
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
