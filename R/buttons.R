#' Button for launching longer-running operations
#'
#' @description
#' `input_task_button` is a button that can be used in conjuction with
#' [shiny::bindEvent()] (or the older [shiny::eventReactive()] and
#' [shiny::observeEvent()] functions) to trigger actions or recomputation.
#'
#' It is similar to [shiny::actionButton()], except it prevents the user from
#' clicking when its operation is already in progress.
#'
#' Upon click, it automatically displays a customizable progress message and
#' disables itself; and after the server has dealt with whatever reactivity is
#' triggered from the click, the button automatically reverts to its original
#' appearance and re-enables itself.
#'
#' @section Manual button reset:
#' In some advanced use cases, it may be necessary to keep a task button in its
#' busy state even after the normal reactive processing has completed. The
#' `set_task_button_manual_reset` function can be called from the server to opt
#' out of the automatic reset behavior for a specific task button. After doing
#' so, the button can only be re-enabled by calling `update_task_button(id, busy
#' = FALSE)`.
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
#' @examples
#' if (interactive()) {
#'   library(shiny)
#'   library(bslib)
#'
#'   ui <- page_sidebar(
#'     sidebar = sidebar(open = "always",
#'       input_task_button("resample", "Resample"),
#'     ),
#'     verbatimTextOutput("summary")
#'   )
#'
#'   server <- function(input, output, session) {
#'     sample <- eventReactive(input$resample, ignoreNULL=FALSE, {
#'       Sys.sleep(2)  # Make this artificially slow
#'       rnorm(100)
#'     })
#'
#'     output$summary <- renderPrint({
#'       summary(sample())
#'     })
#'   }
#'
#'   shinyApp(ui, server)
#' }
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


task_button_manual_reset_map <- function(session) {
  key <- "manual_task_button_reset"
  map <- session$userData[[key]]
  if (is.null(map)) {
    map <- fastmap::fastmap()
    session$userData[[key]] <- map
  }
  map
}

#' @rdname input_task_button
#' @param manual If `TRUE`, prevent automatic resetting of the task button when
#'   reactive flush is complete.
#' @export
set_task_button_manual_reset <- function(session, id, manual = TRUE) {
  ns_id <- session$ns(id)
  map <- task_button_manual_reset_map(session)
  if (isTRUE(manual)) {
    map$set(ns_id, TRUE)
  } else {
    map$remove(ns_id)
  }
}

is_task_button_manual_reset <- function(session, id) {
  ns_id <- session$ns(id)
  map <- task_button_manual_reset_map(session)
  map$get(ns_id, FALSE)
}


input_task_button_input_handler <- function(val, shinysession, name) {
  shinysession$onFlush(once = TRUE, function() {
    # This is input_task_button's auto-reset feature: unless the user has
    # opted out using set_task_button_manual_reset(), we should reset after
    # a flush cycle where a bslib.taskbutton value is seen.
    if (!is_task_button_manual_reset(shinysession, name)) {
      update_task_button(name, busy = FALSE, session = shinysession)
    }
  })

  # mark up the action button value with a special class so we can recognize it later
  class(val) <- c("shinyActionButtonValue", class(val))
  val
}
