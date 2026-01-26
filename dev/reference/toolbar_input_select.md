# Toolbar Input Select

Create a select input control that can be used to choose a single item
from a list of values, suitable for use within a
[`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md).

## Usage

``` r
toolbar_input_select(
  id,
  label,
  choices,
  ...,
  selected = NULL,
  icon = NULL,
  show_label = FALSE,
  tooltip = !show_label
)

update_toolbar_input_select(
  id,
  label = NULL,
  show_label = NULL,
  choices = NULL,
  selected = NULL,
  icon = NULL,
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

- choices:

  List of values to select from. If elements of the list are named, then
  that name — rather than the value — is displayed to the user. It's
  also possible to group related inputs by providing a named list whose
  elements are (either named or unnamed) lists, vectors, or factors. In
  this case, the outermost names will be used as the group labels
  (leveraging the `<optgroup>` HTML tag) for the elements in the
  respective sublist. See the example section for a small demo of this
  feature.

- ...:

  Additional named arguments passed as attributes to the outer container
  div.

- selected:

  The initially selected value. If not provided on input creation, the
  first choice will be selected by default. If provided in
  `update_toolbar_input_select()` with a new set of `choices`, it will
  replace the currently selected value.

- icon:

  An icon. If provided without `show_label = TRUE`, only the icon will
  be visible.

- show_label:

  Whether to show the label text. If `FALSE` (the default), only the
  icon is shown (if provided). If `TRUE`, the label text is shown
  alongside the icon. Note that `show_label` can be dynamically updated
  using
  [`update_toolbar_input_button()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_button.md).

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

- session:

  A Shiny session object (the default should almost always be used).

## Value

Returns a select input control suitable for use in a toolbar.

## Details

When a tooltip is created for the select input, it will have an ID of
`"{id}_tooltip"` which can be used to update the tooltip text
dynamically via
[`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md).

## Functions

- `toolbar_input_select()`: Create a toolbar select input.

- `update_toolbar_input_select()`: Update a toolbar select input.

## Updating toolbar select inputs

You can update the appearance and choices of a toolbar select input.
This function works similarly to
[`shiny::updateSelectInput()`](https://rdrr.io/pkg/shiny/man/updateSelectInput.html),
but is specifically designed for `toolbar_input_select()`. It allows you
to update the select's label, icon, choices, selected value, and label
visibility from the server.

Note that you cannot enable or disable the `tooltip` parameter after the
select has been created, only update the text of the tooltip. When a
tooltip is created for the select input, it will have an ID of
`"{id}_tooltip"` which can be used to update the tooltip text
dynamically via
[`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md).

For example:

    library(shiny)
    library(bslib)

    ui <- page_fluid(
      toolbar(
        align = "right",
        toolbar_input_select(
          "select",
          label = "Choose",
          icon = bsicons::bs_icon("filter"),
          choices = c("A", "B", "C")
        ),
        toolbar_input_button(
          "change_choices",
          label = "Change Choices",
          show_label = TRUE,
          icon = bsicons::bs_icon("arrow-repeat")
        )
      ),
      verbatimTextOutput("value")
    )

    server <- function(input, output, session) {
      output$value <- renderPrint({
        input$select
      })

      observeEvent(input$change_choices, {
        update_toolbar_input_select(
          "select",
          label = "Pick one",
          choices = c("hi", "hello", "hey"),
          selected = "hello"
        )
        # Update the tooltip text
        update_tooltip("select_tooltip", "Choose your NEW option")
      })
    }

    shinyApp(ui, server)

## See also

Other toolbar components:
[`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md),
[`toolbar_divider()`](https://rstudio.github.io/bslib/dev/reference/toolbar_divider.md),
[`toolbar_input_button()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_button.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
toolbar(
  align = "right",
  toolbar_input_select(
    id = "select",
    label = "Choose option",
    choices = c("Option 1", "Option 2", "Option 3"),
    selected = "Option 2"
  )
)
}
```
