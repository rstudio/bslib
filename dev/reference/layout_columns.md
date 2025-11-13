# Responsive 12-column grid layouts

Create responsive, column-based grid layouts, based on a 12-column grid.

## Usage

``` r
layout_columns(
  ...,
  col_widths = NA,
  row_heights = NULL,
  fill = TRUE,
  fillable = TRUE,
  gap = NULL,
  class = NULL,
  height = NULL,
  min_height = NULL,
  max_height = NULL
)
```

## Arguments

- ...:

  Unnamed arguments should be UI elements (e.g.,
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)).
  Named arguments become attributes on the containing
  [htmltools::tag](https://rstudio.github.io/htmltools/reference/builder.html)
  element.

- col_widths:

  One of the following:

  - `NA` (the default): Automatically determines a sensible number of
    columns based on the number of children.

  - A numeric vector of integers between 1 and 12, where each element
    represents the number of columns for the relevant UI element.
    Elements that happen to go beyond 12 columns wrap onto the next row.
    For example, `col_widths = c(4, 8, 12)` allocates 4 columns to the
    first element, 8 columns to the second element, and 12 columns to
    the third element (which wraps to the next row). Negative values are
    also allowed, and are treated as empty columns. For example,
    `col_widths = c(-2, 8, -2)` would allocate 8 columns to an element
    (with 2 empty columns on either side).

  - A
    [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
    object, where each breakpoint may be either of the above.

- row_heights:

  One of the following:

  - A numeric vector, where each value represents the [fractional
    unit](https://css-tricks.com/introduction-fr-css-unit/) (`fr`)
    height of the relevant row. If there are more rows than values
    provided, the pattern will repeat. For example,
    `row_heights = c(1, 2)` allows even rows to take up twice as much
    space as odd rows.

  - A list of numeric and [CSS length
    units](https://rstudio.github.io/htmltools/reference/validateCssUnit.html),
    where each value represents the height of the relevant row. If more
    rows are needed than values provided, the pattern will repeat. For
    example, `row_heights = list("auto", 1)` allows the height of odd
    rows to be driven by its contents and even rows to be
    [`1fr`](https://css-tricks.com/introduction-fr-css-unit/).

  - A character vector/string of [CSS length
    units](https://rstudio.github.io/htmltools/reference/validateCssUnit.html).
    In this case, the value is supplied directly to `grid-auto-rows`.

  - A
    [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
    object, where each breakpoint may be either of the above.

- fill:

  Whether or not to allow the layout to grow/shrink to fit a fillable
  container with an opinionated height (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).

- fillable:

  Whether or not each element is wrapped in a fillable container.

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the `gap` (i.e., spacing) between elements provided to `...`.
  This argument is only applicable when `fillable = TRUE`

- class:

  Additional CSS classes for the returned UI element.

- height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `height` in
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)).

- min_height, max_height:

  The maximum or minimum height of the layout container. Can be any
  valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `max_height="200px"`). Use these arguments in filling layouts
  to ensure that a layout container doesn't shrink below `min_height` or
  grow beyond `max_height`.

## References

[Column-based
layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)
on the bslib website.

## See also

[`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
for more information on specifying column widths at responsive
breakpoints.

Other Column layouts:
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
x <- card("A simple card")

page_fillable(
  layout_columns(x, x, x, x)
)

# Or add a list of items, spliced with rlang's `!!!` operator
page_fillable(
 layout_columns(!!!list(x, x, x))
)

page_fillable(
  layout_columns(
    col_widths = c(6, 6, 12),
    x, x, x
  )
)

page_fillable(
  layout_columns(
    col_widths = c(6, 6, -2, 8),
    row_heights = c(1, 3),
    x, x, x
  )
)

page_fillable(
  fillable_mobile = TRUE,
  layout_columns(
    col_widths = breakpoints(
      sm = c(12, 12, 12),
      md = c(6, 6, 12),
      lg = c(4, 4, 4)
    ),
    x, x, x
  )
)
}
```
