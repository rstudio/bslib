# Add a toolbar input button

A button designed to fit well in small places such as in a
[`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md).

## Usage

``` r
toolbar_input_button(
  id,
  label,
  icon = NULL,
  show_label = is.null(icon),
  tooltip = !show_label,
  ...,
  disabled = FALSE,
  border = FALSE
)

update_toolbar_input_button(
  id,
  label = NULL,
  show_label = NULL,
  icon = NULL,
  disabled = NULL,
  session = get_current_session()
)
```

## Arguments

- id:

  The input ID.

- label:

  The input label. By default, `label` is not shown but is used by
  `tooltip`. Set `show_label = TRUE` to show the label (see `tooltip`
  for details on how this affects the tooltip behavior).

- icon:

  An icon. If provided without `show_label = TRUE`, only the icon will
  be visible.

- show_label:

  Whether to show the label text. If `FALSE` (the default), only the
  icon is shown (if provided). If `TRUE`, the label text is shown
  alongside the icon. Note that `show_label` can be dynamically updated
  using `update_toolbar_input_button()`.

- tooltip:

  Tooltip text to display when hovering over the input. Can be:

  - `TRUE` (default when `show_label = FALSE`) - shows a tooltip with
    the `label` text

  - `FALSE` (default when `show_label = TRUE`) - no tooltip

  - A character string - shows a tooltip with custom text

  Defaults to `!show_label`. When a tooltip is created, it will have an
  ID of `"{id}_tooltip"` which can be used to update the tooltip text
  dynamically via
  [`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md).

- ...:

  Additional attributes to pass to the button.

- disabled:

  If `TRUE`, the button will not be clickable. Use
  `update_toolbar_input_button()` to dynamically enable/disable the
  button.

- border:

  Whether to show a border around the button.

- session:

  A Shiny session object (the default should almost always be used).

## Value

Returns a button suitable for use in a toolbar.

## Functions

- `toolbar_input_button()`: Create a toolbar button.

- `update_toolbar_input_button()`: Update a toolbar button.

## Updating toolbar buttons

You can dynamically update the appearance and enabled/disabled state of
a toolbar button on the client side using
`update_toolbar_input_button()`. This function works similarly to
[`shiny::updateActionButton()`](https://rdrr.io/pkg/shiny/man/updateActionButton.html).

Note that you cannot change the `tooltip` or `border` parameters after
the button has been created, as these affect the button's structure and
ARIA attributes. Please use
[`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
to update the text of the tooltip if one is present.

For example:

    library(shiny)
    library(bslib)

    ui <- page_fluid(
      card(
        card_header(
          "Toolbar Demo",
          toolbar(
            align = "right",
            toolbar_input_button("btn", label = "Click me", icon = icon("play")),
            toolbar_input_button(
              "task",
              label = "Do a Task",
              icon = icon("play-circle"),
              show_label = TRUE
            )
          )
        ),
        card_body(
          verbatimTextOutput("count")
        )
      )
    )

    server <- function(input, output, session) {
      output$count <- renderPrint({
        input$btn
      })

      observeEvent(input$btn, {
        update_toolbar_input_button(
          "btn",
          label = "Clicked!",
          icon = icon("check")
        )
        # Update the tooltip text
        update_tooltip("btn_tooltip", "Button was clicked!")
      })

      # Handle task button - toggle between states
      observeEvent(input$task, {
        if (input$task %% 2 == 1) {
          # Show task is in progress
          update_toolbar_input_button(
            "task",
            label = "Task Running...",
            icon = icon("spinner")
          )
        } else {
          # Reset to original
          update_toolbar_input_button(
            "task",
            label = "Do a Task",
            icon = icon("play-circle"),
            session = session
          )
        }
      })
    }

    shinyApp(ui, server)

## See also

Other toolbar components:
[`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md),
[`toolbar_divider()`](https://rstudio.github.io/bslib/dev/reference/toolbar_divider.md),
[`toolbar_input_select()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_select.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
# Basic toolbar button
toolbar(
  toolbar_input_button(id = "view", icon = icon("eye"), label = "View"),
  toolbar_input_button(id = "save", icon = icon("save"), label = "Save")
)
}
```
