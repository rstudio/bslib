# Create a textarea input control with explicit submission

Creates a textarea input where users can enter multi-line text and
submit their input using a dedicated button or keyboard shortcut. This
control is ideal when you want to capture finalized input, rather than
reacting to every keystroke, making it useful for chat boxes, comments,
or other scenarios where users may compose and review their text before
submitting.

## Usage

``` r
input_submit_textarea(
  id,
  label = NULL,
  ...,
  placeholder = NULL,
  value = "",
  width = "min(680px, 100%)",
  rows = 1,
  button = NULL,
  toolbar = NULL,
  submit_key = c("enter+modifier", "enter")
)

update_submit_textarea(
  id,
  ...,
  value = NULL,
  placeholder = NULL,
  label = NULL,
  submit = FALSE,
  focus = FALSE,
  session = get_current_session()
)
```

## Arguments

- id:

  The input ID.

- label:

  The label to display above the input control. If `NULL`, no label is
  displayed.

- ...:

  Additional attributes to apply to the underlying `<textarea>` element
  (e.g., spellcheck, autocomplete, etc).

- placeholder:

  The placeholder text for the user input.

- value:

  The value to set the user input to.

- width:

  Any valid CSS unit (e.g., `width="100%"`).

- rows:

  The number of rows (i.e., height) of the textarea. This essentially
  sets the minimum height – the textarea can grow taller as the user
  enters more text.

- button:

  A
  [htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html)
  element to use for the submit button. It's recommended that this be a
  [`input_task_button()`](https://rstudio.github.io/bslib/reference/input_task_button.md)
  since it will automatically provide a busy indicator (and disable)
  until the next flush occurs. Note also that if the submit button
  launches a
  [shiny::ExtendedTask](https://rdrr.io/pkg/shiny/man/ExtendedTask.html),
  this button can also be bound to the task
  ([`bind_task_button()`](https://rstudio.github.io/bslib/reference/bind_task_button.md))
  and/or manually updated for more accurate progress reporting
  ([`update_task_button()`](https://rstudio.github.io/bslib/reference/input_task_button.md)).

- toolbar:

  A list of optional UI elements (e.g., links, icons) to display next to
  the submit button.

- submit_key:

  A character string indicating what keyboard event should trigger the
  submit button. The default is `enter+modifier`, which requires the
  user to hold down Ctrl (or Cmd on Mac) before pressing Enter to
  submit. This helps prevent accidental submissions. To allow submission
  with just the Enter key, use `enter`. In this case, the user can still
  insert new lines using Shift+Enter or Alt+Enter.

- submit:

  Whether to automatically submit the text for the user. Requires
  `value`.

- focus:

  Whether to move focus to the input element. Requires `value`.

- session:

  The `session` object; using the default is recommended.

## Value

A textarea input control that can be added to a UI definition.

## Server value

The server receives a character string containing the user's text input.

**Important:** The initial server value is always `""` (empty string),
regardless of any `value` parameter provided to
`input_submit_textarea()`. The server value updates only when the user
explicitly submits the input by either pressing the Enter key (possibly
with a modifier key) or clicking the submit button.

## See also

`update_submit_textarea()`,
[`input_task_button()`](https://rstudio.github.io/bslib/reference/input_task_button.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fluid(
  input_submit_textarea("text", placeholder = "Enter some input..."),
  verbatimTextOutput("value")
)
server <- function(input, output) {
  output$value <- renderText({
    req(input$text)
    Sys.sleep(2)
    paste("You entered:", input$text)
  })
}
shinyApp(ui, server)
}
```
