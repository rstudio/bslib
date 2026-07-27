# Custom layouts to use in other functions

A collection of functions to build custom layouts that can be used in
other functions, such as
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md).

## Usage

``` r
showcase_left_center(
  width = 0.3,
  width_full_screen = "1fr",
  max_height = "100px",
  max_height_full_screen = 0.67
)

showcase_top_right(
  width = 0.4,
  width_full_screen = "1fr",
  max_height = "75px",
  max_height_full_screen = 0.67
)

showcase_bottom(
  width = "100%",
  width_full_screen = NULL,
  height = "auto",
  height_full_screen = "2fr",
  max_height = "100px",
  max_height_full_screen = NULL
)
```

## Arguments

- width, width_full_screen, height, height_full_screen:

  one of the following:

  - A proportion (i.e., a number between 0 and 1) of available width or
    height to allocate to the showcase.

  - A valid [CSS
    unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
    defining the width or height of the showcase column, or a valid
    value accepted by the `grid-template-columns` (width) or
    `grid-template-rows` (height) CSS property to define the width or
    height of the showcase column or row. Accepted values in the second
    category are `"auto"`, `"min-content"`, `"max-content"`, a
    fractional unit (e.g. `2fr`), or a `minmax()` function (e.g.,
    `minmax(100px, 1fr)`).

- max_height:

  The maximum height of the
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  or the showcase area when used in a `showcase_layout_*()` function.
  Can be any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `max_height="200px"`).

- max_height_full_screen:

  A proportion (i.e., a number between 0 and 1) or any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the showcase `max_height` in a full screen card.

## See also

[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
has a `showcase_layout` argument where one can use the various
`showcase_*()` functions.

Other Components:
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md),
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(htmltools)

value_box(
  "KPI Title",
  h1(HTML("$1 <i>Billion</i> Dollars")),
  span(
    bsicons::bs_icon("arrow-up"),
    " 30% VS PREVIOUS 30 DAYS"
  ),
  showcase = bsicons::bs_icon("piggy-bank"),
  showcase_layout = showcase_top_right()
)
}
```
