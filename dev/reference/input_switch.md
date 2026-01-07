# Switch input control

Create an on-off style switch control for specifying logical values.

## Usage

``` r
input_switch(id, label, value = FALSE, width = NULL)

update_switch(id, label = NULL, value = NULL, session = get_current_session())

toggle_switch(id, value = NULL, session = get_current_session())
```

## Arguments

- id:

  An input id.

- label:

  A label for the switch.

- value:

  Whether or not the switch should be checked by default.

- width:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `width="200px"`).

- session:

  a shiny session object (the default should almost always be used).

## Value

Returns a UI element for a switch input control. The server value
received for the input corresponding to `id` will be a logical
(`TRUE`/`FALSE`) value.

## See also

Other input controls:
[`input_code_editor()`](https://rstudio.github.io/bslib/dev/reference/input_code_editor.md),
[`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fixed(
  title = "Keyboard Settings",
  h2("Keyboard Settings"),
  input_switch("auto_capitalization", "Auto-Capitalization", TRUE),
  input_switch("auto_correction", "Auto-Correction", TRUE),
  input_switch("check_spelling", "Check Spelling", TRUE),
  input_switch("smart_punctuation", "Smart Punctuation"),
  h2("Preview"),
  verbatimTextOutput("preview")
)

server <- function(input, output, session) {
  output$preview <- renderPrint({
    list(
      auto_capitalization = input$auto_capitalization,
      auto_correction = input$auto_correction,
      check_spelling = input$check_spelling,
      smart_punctuation = input$smart_punctuation
    )
  })
}

shinyApp(ui, server)
}
```
