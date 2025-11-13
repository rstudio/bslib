# Bind `input_task_button` to `ExtendedTask`

Sets up a
[shiny::ExtendedTask](https://rdrr.io/pkg/shiny/man/ExtendedTask.html)
to relay its state to an existing
[`input_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md),
so the task button stays in its "busy" state for as long as the extended
task is running.

Note that `bind_task_button` does *not* automatically cause button
presses to invoke the extended task; you still need to use
[`shiny::bindEvent()`](https://rdrr.io/pkg/shiny/man/bindEvent.html) (or
[`shiny::observeEvent()`](https://rdrr.io/pkg/shiny/man/observeEvent.html))
to cause the button press to trigger an invocation, as in the example
below.

`bind_task_button` cannot be used to bind one task button to multiple
`ExtendedTask` objects; if you attempt to do so, any bound
`ExtendedTask` that completes will cause the button to return to "ready"
state.

## Usage

``` r
bind_task_button(target, task_button_id, ...)

# Default S3 method
bind_task_button(target, task_button_id, ...)

# S3 method for class 'ExtendedTask'
bind_task_button(target, task_button_id, ..., session = get_current_session())
```

## Arguments

- target:

  The target object (i.e. `ExtendedTask`).

- task_button_id:

  A string matching the `id` argument passed to the corresponding
  [`input_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md)
  call.

- ...:

  Further arguments passed to other methods.

- session:

  A Shiny session object (the default should almost always be used).

## Value

The `target` object that was passed in.

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

library(shiny)
library(bslib)
library(future)
plan(multisession)

ui <- page_sidebar(
  sidebar = sidebar(
    input_task_button("recalc", "Recalculate")
  ),
  textOutput("outval")
)

server <- function(input, output) {
  rand_task <- ExtendedTask$new(function() {
    future({
      # Slow operation goes here
      Sys.sleep(2)
      runif(1)
    }, seed = TRUE)
  })

  # Make button state reflect task.
  # If using R >=4.1, you can do this instead:
  # rand_task <- ExtendedTask$new(...) |> bind_task_button("recalc")
  bind_task_button(rand_task, "recalc")

  observeEvent(input$recalc, {
    rand_task$invoke()
  })

  output$outval <- renderText({
    rand_task$result()
  })
}

shinyApp(ui, server)
}
```
