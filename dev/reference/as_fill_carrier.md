# Test and/or coerce fill behavior

Filling layouts in bslib are built on the foundation of fillable
containers and fill items (fill carriers are both fillable and fill).
This is why most bslib components (e.g.,
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
[`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md))
possess both `fillable` and `fill` arguments (to control their fill
behavior). However, sometimes it's useful to add, remove, and/or test
fillable/fill properties on arbitrary
[`htmltools::tag()`](https://rstudio.github.io/htmltools/reference/builder.html),
which these functions are designed to do.

## Usage

``` r
as_fill_carrier(
  x,
  ...,
  min_height = NULL,
  max_height = NULL,
  gap = NULL,
  class = NULL,
  style = NULL,
  css_selector = NULL
)

as_fillable_container(
  x,
  ...,
  min_height = NULL,
  max_height = NULL,
  gap = NULL,
  class = NULL,
  style = NULL,
  css_selector = NULL
)

as_fill_item(
  x,
  ...,
  min_height = NULL,
  max_height = NULL,
  class = NULL,
  style = NULL,
  css_selector = NULL
)

remove_all_fill(x)

is_fill_carrier(x)

is_fillable_container(x)

is_fill_item(x)
```

## Arguments

- x:

  An
  [`htmltools::tag()`](https://rstudio.github.io/htmltools/reference/builder.html).

- ...:

  Currently ignored.

- min_height, max_height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `150`).

- gap:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html).

- class:

  A character vector of class names to add to the tag.

- style:

  A character vector of CSS properties to add to the tag.

- css_selector:

  A character string containing a CSS selector for targeting particular
  (inner) tag(s) of interest. For more details on what selector(s) are
  supported, see
  [`htmltools::tagAppendAttributes()`](https://rstudio.github.io/htmltools/reference/tagAppendAttributes.html).

## Value

- For `as_fill()`, `as_fillable()`, and `as_fill_carrier()`: the
  *tagified* version `x`, with relevant tags modified to possess the
  relevant fill properties.

- For `is_fill()`, `is_fillable()`, and `is_fill_carrier()`: a logical
  vector, with length matching the number of top-level tags that possess
  the relevant fill properties.

## Details

Although `as_fill()`, `as_fillable()`, and `as_fill_carrier()` can work
with non-tag objects that have a
[htmltools::as.tags](https://rstudio.github.io/htmltools/reference/as.tags.html)
method (e.g., htmlwidgets), they return the "tagified" version of that
object.

## References

The [Filling
Layouts](https://rstudio.github.io/bslib/articles/filling.html) article
on the bslib website introduces the concept of fillable containers and
fill items.

## See also

These functions provide a convenient interface to the underlying
[`htmltools::bindFillRole()`](https://rstudio.github.io/htmltools/reference/bindFillRole.html)
function.

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)
shinyApp(
  page_fillable(
    # without `as_fill_carrier()`, the plot won't fill the page because
    # `uiOutput()` is neither a fillable container nor a fill item by default.
    as_fill_carrier(uiOutput("ui"))
  ),
  function(input, output) {
    output$ui <- renderUI({
      div(
        class = "bg-info text-white",
        as_fill_item(),
        "A fill item"
      )
    })
  }
)
}
```
