# Toolbar component

A toolbar which can contain buttons, inputs, and other UI elements in a
small form suitable for inclusion in card headers, footers, and other
small places.

bslib includes a complete example of toolbars and the many ways they can
be used:

    shiny::runExample("toolbar", package = "bslib")

## Usage

``` r
toolbar(..., align = c("right", "left"), gap = NULL, width = NULL)
```

## Arguments

- ...:

  UI elements for the toolbar.

- align:

  Determines if toolbar should be aligned to the `"right"` or `"left"`.

- gap:

  A CSS length unit defining the gap (i.e., spacing) between elements in
  the toolbar. Defaults to `0` (no gap).

- width:

  CSS width of the toolbar. Defaults to `NULL`, which will automatically
  set `width: 100%` when the toolbar is a direct child of a label
  element (e.g., when used in input labels). For
  [`toolbar_spacer()`](https://rstudio.github.io/bslib/dev/reference/toolbar_divider.md)
  to push elements effectively, the toolbar needs `width: 100%` to
  expand and create space. Set this explicitly if you need to control
  the width in other contexts.

## Value

Returns a toolbar element.

## Cookbook

### Toolbars in Card Headers and Footers

Card headers and footers are a common places you might want to use
toolbars. Toolbars allow you to clearly show that a selection of inputs
pertain to that particular card. For example, this card uses multiple
[`toolbar_input_select()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_select.md)
for filtering and sorting, along with toolbar buttons and a "share"
button in the toolbar in the card footer.

    card(
      full_screen = TRUE,
      card_header(
        "Sales Data",
        toolbar(
          align = "right",
          toolbar_input_select(
            id = "filter",
            label = "Filter",
            choices = c("All", "Active", "Inactive"),
            icon = icon("filter")
          ),
          toolbar_input_select(
            id = "sort",
            label = "Sort by",
            choices = c("Date", "Amount", "Customer"),
            icon = icon("sort")
          ),
          toolbar_divider(),
          toolbar_input_button(
            id = "refresh",
            label = "Refresh",
            icon = icon("arrows-rotate")
          ),
          toolbar_input_button(
            id = "export",
            label = "Export",
            icon = icon("download"),
            show_label = TRUE
          )
        )
      ),
      card_body(
        h3("Card Body Here"),
      ),
      card_footer(
        toolbar(
          align = "right",
          toolbar_input_button(
            id = "share_data",
            label = "Share",
            icon = icon("share-nodes"),
            show_label = TRUE,
            border = TRUE
          )
        )
      )
    )

### Toolbars in labels

You can use toolbars in the labels of other Shiny inputs to add a
composite input with additional buttons or controls. The following
example uses a `toolbar()` in the label of a
[`shiny::numericInput()`](https://rdrr.io/pkg/shiny/man/numericInput.html)
to add increment and decrement buttons next to the label:

    shiny::numericInput(
      "quantity",
      label = toolbar(
        "Quantity",
        toolbar_spacer(), # push buttons to the right
        toolbar_input_button("decrement", "Less", icon("minus")),
        toolbar_input_button("increment", "More", icon("plus"))
      ),
      value = 1,
      min = 0,
      max = 100
    )

You can also use toolbars in the labels of text area inputs. For
example, this text editor uses a toolbar with formatting buttons:

    textAreaInput(
      "editor",
      label = toolbar(
        "Comment",
        toolbar_spacer(),
        toolbar_input_button("bold", label = "Bold", icon = icon("bold")),
        toolbar_input_button("italic", label = "Italic", icon = icon("italic")),
        toolbar_input_button("link", label = "Link", icon = icon("link"))
      ),
      value = "",
      rows = 5,
      placeholder = "Type your comment here..."
    )

The
[`input_submit_textarea()`](https://rstudio.github.io/bslib/dev/reference/input_submit_textarea.md)
function from bslib allows you to create a text area input with a submit
button and an optional toolbar. Here is an example of using a toolbar
with formatting buttons and options:

    input_submit_textarea(
      "message",
      placeholder = "Type a message...",
      toolbar = toolbar(
        toolbar_input_button("attach", icon = icon("paperclip"), label = "Attach"),
        toolbar_input_button("emoji", icon = icon("face-smile"), label = "Emoji"),
        toolbar_divider(),
        toolbar_input_select(
          "format",
          label = "Format",
          choices = c("Plain", "Markdown", "HTML"),
          icon = icon("code")
        )
      )
    )

## See also

[`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
for using toolbars in card headers/footers

Other toolbar components:
[`toolbar_divider()`](https://rstudio.github.io/bslib/dev/reference/toolbar_divider.md),
[`toolbar_input_button()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_button.md),
[`toolbar_input_select()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_select.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
# Minimal toolbar example
toolbar(
  toolbar_input_button(id = "view", icon = icon("eye"), label = "View"),
  toolbar_input_button(id = "save", icon = icon("save"), label = "Save"),
  toolbar_divider(),
  toolbar_input_select(
    id = "filter",
    label = "Filter",
    choices = c("All", "Active", "Inactive")
  )
)

# Toolbar with text input
library(shiny)
library(bslib)

ui <- page_fluid(
  numericInput(
    "quantity",
    label = toolbar(
      "Quantity",
      toolbar_spacer(),
      toolbar_input_button("decrement", "Less", icon("minus")),
      toolbar_input_button("increment", "More", icon("plus"))
    ),
    value = 5,
    min = 0,
    max = 100
  ),
  verbatimTextOutput("value")
)

server <- function(input, output, session) {
  output$value <- renderText({
    paste("Current value:", input$quantity)
  })

  observeEvent(input$increment, {
    updateNumericInput(session, "quantity", value = input$quantity + 1)
  })

  observeEvent(input$decrement, {
    updateNumericInput(session, "quantity", value = input$quantity - 1)
  })
}

shinyApp(ui, server)

# Toolbar with input_submit_textarea()
library(shiny)
library(bslib)

ui <- page_fluid(
  input_submit_textarea(
    "message",
    placeholder = "Type a message...",
    toolbar = toolbar(
      toolbar_input_button("attach", icon = icon("paperclip"), label = "Attach"),
      toolbar_input_button("emoji", icon = icon("face-smile"), label = "Emoji"),
      toolbar_divider(),
      toolbar_input_select(
        "format",
        label = "Format",
        choices = c("Plain", "Markdown", "HTML"),
        icon = icon("code")
      )
    )
  ),
  verbatimTextOutput("output")
)

server <- function(input, output, session) {
  output$output <- renderText({
    req(input$message)
    paste("You said:", input$message)
  })

  observeEvent(input$attach, {
    showNotification("Attach clicked!", duration = 2)
  })

  observeEvent(input$emoji, {
    showNotification("Emoji clicked!", duration = 2)
  })
}

shinyApp(ui, server)
}
```
