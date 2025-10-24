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
#' busy state even after the normal reactive processing has completed. Calling
#' `update_task_button(id, state = "busy")` from the server will opt out of any
#' currently pending reset for a specific task button. After doing so, the
#' button can be re-enabled by calling `update_task_button(id, state = "ready")`
#' after each click's work is complete.
#'
#' You can also pass an explicit `auto_reset = FALSE` to `input_task_button()`,
#' which means that button will _never_ be automatically re-enabled and will
#' require `update_task_button(id, state = "ready")` to be called each time.
#'
#' Note that, as a general rule, Shiny's `update` family of functions do not
#' take effect at the instant that they are called, but are held until the end
#' of the current reactive cycle. So if you have many different reactive
#' calculations and outputs, you don't have to be too careful about when you
#' call `update_task_button(id, state = "ready")`, as the button on the client
#' will not actually re-enable until the same moment that all of the updated
#' outputs simultaneously sent to the client.
#'
#' @section Custom states:
#' The task button is designed to automatically switch between two states: the
#' "ready" state, where the button is clickable and displays the `label` and
#' `icon`; and the "busy" state, where the button is disabled and displays
#' `label_busy` and `icon_busy`.
#'
#' In advanced use cases, you can include additional states by adding an
#' [htmltools::div()] with a `slot` attribute naming the state and the icon and
#' label as the first and second children, respectively.
#'
#' ```r
#' input_task_button(
#'   label = "Ring home",
#'   icon = fontawesome::fa_i("phone"),
#'   div(slot = "ringing", fontawesome::fa_i("bell"), "Ringing..."),
#'   div(
#'     slot = "voice-mail",
#'     fontawesome::fa_i("voicemail"),
#'     "Leaving a message..."
#'   )
#' )
#' ```
#'
#' You can move between these states by calling `update_task_button()` and
#' passing the slot name to the `state` argument, e.g. `state="ringing"`. See
#' the section above on manual button resetting, which you will likely need to
#' use in conjunction with custom states.
#'
#' @section Server value:
#' An integer of class `"shinyActionButtonValue"`. This class differs from
#' ordinary integers in that a value of 0 is considered "falsy". This implies
#' two things:
#'   * Event handlers (e.g., [shiny::observeEvent()], [shiny::eventReactive()])
#'     won't execute on initial load.
#'   * Input validation (e.g., [shiny::req()], [shiny::need()]) will fail on
#'     initial load.
#'
#' @param id The `input` slot that will be used to access the value.
#' @param label The label of the button while it is in ready (clickable) state;
#'   usually a string.
#' @param icon An optional icon to display next to the label while the button is
#'   in ready state. See [fontawesome::fa_i()].
#' @param label_busy The label of the button while it is busy.
#' @param icon_busy The icon to display while the button is busy. By default,
#'   `fontawesome::fa_i("refresh", class = "fa-spin", "aria-hidden" = "true")`
#'   is used, which displays a spinning "chasing arrows" icon. You can create
#'   spinning icons out of other Font Awesome icons by using the same
#'   expression, but replacing `"refresh"` with a different icon name. See
#'   [fontawesome::fa_i()].
#' @param type One of the Bootstrap theme colors (`"primary"`, `"default"`,
#'   `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"light"`,
#'   `"dark"`), or `NULL` to leave off the Bootstrap-specific button CSS classes
#'   altogether.
#' @param ... In `input_task_button()`, named arguments become attributes to
#'   include on the `<button>` element, e.g. `class` or data attributes.
#'   Unnamed arguments can provide additional states for the button, see the
#'   "Custom states" section.
#'
#'   In `update_task_button()`, `...` are ignored and must be empty. The task
#'   button only supports changing between pre-defined states.
#' @param auto_reset If `TRUE` (the default), automatically put the button back
#'   in "ready" state after its click is handled by the server.
#'
#' @seealso [bind_task_button()]
#'
#' @examplesIf interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_sidebar(
#'   sidebar = sidebar(
#'     open = "always",
#'     input_task_button("resample", "Resample"),
#'   ),
#'   verbatimTextOutput("summary")
#' )
#'
#' server <- function(input, output, session) {
#'   sample <- eventReactive(input$resample, ignoreNULL=FALSE, {
#'     Sys.sleep(2)  # Make this artificially slow
#'     rnorm(100)
#'   })
#'
#'   output$summary <- renderPrint({
#'     summary(sample())
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @export
input_task_button <- function(
  id,
  label,
  ...,
  icon = NULL,
  label_busy = "Processing...",
  icon_busy = rlang::missing_arg(),
  type = "primary",
  auto_reset = TRUE
) {
  dots <- separate_arguments(...)
  attribs <- dots$attribs
  children <- dots$children

  icon_busy <- rlang::maybe_missing(
    icon_busy,
    fontawesome::fa_i("refresh", class = "fa-spin", "aria-hidden" = "true")
  )

  tags$button(
    id = id,
    class = if (!is.null(type)) paste0("btn btn-", type),
    class = "bslib-task-button",
    type = "button",
    "data-auto-reset" = if (isTRUE(auto_reset)) NA else NULL,
    !!!attribs,

    component_dependencies(),

    htmltools::tag(
      "bslib-switch-inline",
      rlang::list2(
        case = "ready",
        span(slot = "ready", icon, label),
        span(slot = "busy", icon_busy, label_busy),
        !!!children
      )
    )
  )
}

#' @param state If `"busy"`, put the button into busy/disabled state. If
#'   `"ready"`, put the button into ready/enabled state.
#' @param session The `session` object; using the default is recommended.
#' @rdname input_task_button
#' @export
update_task_button <- function(
  id,
  ...,
  state = NULL,
  session = get_current_session()
) {
  force(id)
  force(state)

  rlang::check_dots_empty()

  if (!is.null(state)) {
    if (!rlang::is_string(state)) {
      abort("`state` must be a single character value.")
    }
    set_task_button_manual_reset(
      session,
      id,
      manual = !identical(state, "ready")
    )
  }

  session$sendInputMessage(id, dropNulls(list(state = state)))
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

# Prevent automatic resetting of the task button when this reactive flush is
# complete
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
  value <- val[["value"]]

  if (isTRUE(val[["autoReset"]])) {
    shinysession$onFlush(once = TRUE, function() {
      # This is input_task_button's auto-reset feature: unless the button has
      # opted out using set_task_button_manual_reset(), we should reset after
      # a flush cycle where a bslib.taskbutton value is seen.
      if (!is_task_button_manual_reset(shinysession, name)) {
        update_task_button(name, state = "ready", session = shinysession)
      }
    })
  }

  # mark up the action button value with a special class so we can recognize it later
  class(value) <- c("shinyActionButtonValue", class(value))
  value
}

#' Bind `input_task_button` to `ExtendedTask`
#'
#' @description
#' Sets up a [shiny::ExtendedTask] to relay its state to an existing
#' [input_task_button()], so the task button stays in its "busy" state for as
#' long as the extended task is running.
#'
#' Note that `bind_task_button` does _not_ automatically cause button presses to
#' invoke the extended task; you still need to use [shiny::bindEvent()] (or
#' [shiny::observeEvent()]) to cause the button press to trigger an invocation,
#' as in the example below.
#'
#' `bind_task_button` cannot be used to bind one task button to multiple
#' `ExtendedTask` objects; if you attempt to do so, any bound `ExtendedTask`
#' that completes will cause the button to return to "ready" state.
#'
#' @param target The target object (i.e. `ExtendedTask`).
#' @param task_button_id A string matching the `id` argument passed to the
#'   corresponding [input_task_button()] call.
#' @param session A Shiny session object (the default should almost always be
#'   used).
#' @param ... Further arguments passed to other methods.
#'
#' @returns The `target` object that was passed in.
#'
#' @examplesIf rlang::is_interactive()
#'
#' library(shiny)
#' library(bslib)
#' library(future)
#' plan(multisession)
#'
#' ui <- page_sidebar(
#'   sidebar = sidebar(
#'     input_task_button("recalc", "Recalculate")
#'   ),
#'   textOutput("outval")
#' )
#'
#' server <- function(input, output) {
#'   rand_task <- ExtendedTask$new(function() {
#'     future({
#'       # Slow operation goes here
#'       Sys.sleep(2)
#'       runif(1)
#'     }, seed = TRUE)
#'   })
#'
#'   # Make button state reflect task.
#'   # If using R >=4.1, you can do this instead:
#'   # rand_task <- ExtendedTask$new(...) |> bind_task_button("recalc")
#'   bind_task_button(rand_task, "recalc")
#'
#'   observeEvent(input$recalc, {
#'     rand_task$invoke()
#'   })
#'
#'   output$outval <- renderText({
#'     rand_task$result()
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @export
bind_task_button <- function(target, task_button_id, ...) {
  UseMethod("bind_task_button")
}

#' @rdname bind_task_button
#' @export
bind_task_button.default <- function(target, task_button_id, ...) {
  abort(
    "Don't know how to bind a task button to an object of class '",
    class(target)[[0]],
    "'"
  )
}

#' @rdname bind_task_button
#' @export
bind_task_button.ExtendedTask <- function(
  target,
  task_button_id,
  ...,
  session = get_current_session()
) {
  force(target)
  force(task_button_id)
  force(session)

  was_running <- FALSE
  shiny::observe(
    label = "update_task_button_state",
    {
      running <- target$status() == "running"
      if (running != was_running) {
        was_running <<- running
        if (running) {
          update_task_button(task_button_id, state = "busy", session = session)
        } else {
          update_task_button(task_button_id, state = "ready", session = session)
        }
      }
    },
    priority = 1000
  )
  return(target)
}
