# Create a vertically collapsing accordion

An accordion can be used to organize UI elements and content in a
limited space. It comprises multiple, vertically stacked panels that
expand or collapse when clicked, providing a compact layout that works
well for grouping input elements in a
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
or for organizing detailed context-specific information.

## Usage

``` r
accordion(
  ...,
  id = NULL,
  open = NULL,
  multiple = TRUE,
  class = NULL,
  width = NULL,
  height = NULL
)

accordion_panel(title, ..., value = title, icon = NULL)
```

## Arguments

- ...:

  Named arguments become attributes on the `<div class="accordion">`
  element. Unnamed arguments should be `accordion_panel()`s.

- id:

  If provided, you can use `input$id` in your server logic to determine
  which of the `accordion_panel()`s are currently active. The value will
  correspond to the `accordion_panel()`'s `value` argument.

- open:

  A character vector of `accordion_panel()` `value`s to open (i.e.,
  show) by default. The default value of `NULL` will open the first
  `accordion_panel()`. Use a value of `TRUE` to open all (or `FALSE` to
  open none) of the items. It's only possible to open more than one
  panel when `multiple=TRUE`.

- multiple:

  Whether multiple `accordion_panel()` can be `open` at once.

- class:

  Additional CSS classes to include on the accordion div.

- width, height:

  Any valid CSS unit; for example, height="100%".

- title:

  A title to appear in the `accordion_panel()`'s header.

- value:

  A character string that uniquely identifies this panel.

- icon:

  A
  [htmltools::tag](https://rstudio.github.io/htmltools/reference/builder.html)
  child (e.g.,
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html))
  which is positioned just before the `title`.

## References

bslib's accordion component is derived from the [Bootstrap Accordion
component](https://getbootstrap.com/docs/5.3/components/accordion/).
Accordions are also featured on the bslib website:

- [Get Started:
  Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html#accordions)

- [Sidebars:
  Accordions](https://rstudio.github.io/bslib/articles/dashboards/index.html#accordions)

## See also

[`accordion_panel_set()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md),
[`accordion_panel_open()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
and
[`accordion_panel_close()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
programmatically interact with the state of an accordion panel.

[`accordion_panel_insert()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md),
[`accordion_panel_remove()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
and
[`accordion_panel_update()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
add or remove accordion panels from an accordion.

Other Components:
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
items <- lapply(LETTERS, function(x) {
  accordion_panel(paste("Section", x), paste("Some narrative for section", x))
})

# First shown by default
accordion(!!!items)
# Nothing shown by default
accordion(!!!items, open = FALSE)
# Everything shown by default
accordion(!!!items, open = TRUE)

# Show particular sections
accordion(!!!items, open = "Section B")
accordion(!!!items, open = c("Section A", "Section B"))

# Provide an id to create a shiny input binding
library(shiny)
library(bslib)

ui <- page_fluid(
  accordion(!!!items, id = "acc")
)

server <- function(input, output) {
  observe(print(input$acc))
}

shinyApp(ui, server)
}
```
