# Button for launching longer-running operations

`input_task_button` is a button that can be used in conjuction with
[`shiny::bindEvent()`](https://rdrr.io/pkg/shiny/man/bindEvent.html) (or
the older
[`shiny::eventReactive()`](https://rdrr.io/pkg/shiny/man/observeEvent.html)
and
[`shiny::observeEvent()`](https://rdrr.io/pkg/shiny/man/observeEvent.html)
functions) to trigger actions or recomputation.

It is similar to
[`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html),
except it prevents the user from clicking when its operation is already
in progress.

Upon click, it automatically displays a customizable progress message
and disables itself; and after the server has dealt with whatever
reactivity is triggered from the click, the button automatically reverts
to its original appearance and re-enables itself.

## Usage

``` r
input_task_button(
  id,
  label,
  ...,
  icon = NULL,
  label_busy = "Processing...",
  icon_busy = rlang::missing_arg(),
  type = "primary",
  auto_reset = TRUE
)

update_task_button(id, ..., state = NULL, session = get_current_session())
```

## Arguments

- id:

  The `input` slot that will be used to access the value.

- label:

  The label of the button while it is in ready (clickable) state;
  usually a string.

- ...:

  In `input_task_button()`, named arguments become attributes to include
  on the `<button>` element, e.g. `class` or data attributes. Unnamed
  arguments can provide additional states for the button, see the
  "Custom states" section.

  In `update_task_button()`, `...` are ignored and must be empty. The
  task button only supports changing between pre-defined states.

- icon:

  An optional icon to display next to the label while the button is in
  ready state. See
  [`fontawesome::fa_i()`](https://rstudio.github.io/fontawesome/reference/fa_i.html).

- label_busy:

  The label of the button while it is busy.

- icon_busy:

  The icon to display while the button is busy. By default,
  `fontawesome::fa_i("refresh", class = "fa-spin", "aria-hidden" = "true")`
  is used, which displays a spinning "chasing arrows" icon. You can
  create spinning icons out of other Font Awesome icons by using the
  same expression, but replacing `"refresh"` with a different icon name.
  See
  [`fontawesome::fa_i()`](https://rstudio.github.io/fontawesome/reference/fa_i.html).

- type:

  One of the Bootstrap theme colors (`"primary"`, `"default"`,
  `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`,
  `"light"`, `"dark"`), or `NULL` to leave off the Bootstrap-specific
  button CSS classes altogether.

- auto_reset:

  If `TRUE` (the default), automatically put the button back in "ready"
  state after its click is handled by the server.

- state:

  If `"busy"`, put the button into busy/disabled state. If `"ready"`,
  put the button into ready/enabled state.

- session:

  The `session` object; using the default is recommended.

## Manual button reset

In some advanced use cases, it may be necessary to keep a task button in
its busy state even after the normal reactive processing has completed.
Calling `update_task_button(id, state = "busy")` from the server will
opt out of any currently pending reset for a specific task button. After
doing so, the button can be re-enabled by calling
`update_task_button(id, state = "ready")` after each click's work is
complete.

You can also pass an explicit `auto_reset = FALSE` to
`input_task_button()`, which means that button will *never* be
automatically re-enabled and will require
`update_task_button(id, state = "ready")` to be called each time.

Note that, as a general rule, Shiny's `update` family of functions do
not take effect at the instant that they are called, but are held until
the end of the current reactive cycle. So if you have many different
reactive calculations and outputs, you don't have to be too careful
about when you call `update_task_button(id, state = "ready")`, as the
button on the client will not actually re-enable until the same moment
that all of the updated outputs simultaneously sent to the client.

## Custom states

The task button is designed to automatically switch between two states:
the "ready" state, where the button is clickable and displays the
`label` and `icon`; and the "busy" state, where the button is disabled
and displays `label_busy` and `icon_busy`.

In advanced use cases, you can include additional states by adding an
[`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
with a `slot` attribute naming the state and the icon and label as the
first and second children, respectively.

    input_task_button(
      label = "Ring home",
      icon = fontawesome::fa_i("phone"),
      div(slot = "ringing", fontawesome::fa_i("bell"), "Ringing..."),
      div(
        slot = "voice-mail",
        fontawesome::fa_i("voicemail"),
        "Leaving a message..."
      )
    )

You can move between these states by calling `update_task_button()` and
passing the slot name to the `state` argument, e.g. `state="ringing"`.
See the section above on manual button resetting, which you will likely
need to use in conjunction with custom states.

## Server value

An integer of class `"shinyActionButtonValue"`. This class differs from
ordinary integers in that a value of 0 is considered "falsy". This
implies two things:

- Event handlers (e.g.,
  [`shiny::observeEvent()`](https://rdrr.io/pkg/shiny/man/observeEvent.html),
  [`shiny::eventReactive()`](https://rdrr.io/pkg/shiny/man/observeEvent.html))
  won't execute on initial load.

- Input validation (e.g.,
  [`shiny::req()`](https://rdrr.io/pkg/shiny/man/req.html),
  [`shiny::need()`](https://rdrr.io/pkg/shiny/man/validate.html)) will
  fail on initial load.

## See also

[`bind_task_button()`](https://rstudio.github.io/bslib/reference/bind_task_button.md)

## Examples

``` r
if (FALSE) { # interactive()
library(shiny)
library(bslib)

ui <- page_sidebar(
  sidebar = sidebar(
    open = "always",
    input_task_button("resample", "Resample"),
  ),
  verbatimTextOutput("summary")
)

server <- function(input, output, session) {
  sample <- eventReactive(input$resample, ignoreNULL=FALSE, {
    Sys.sleep(2)  # Make this artificially slow
    rnorm(100)
  })

  output$summary <- renderPrint({
    summary(sample())
  })
}

shinyApp(ui, server)
}
```
