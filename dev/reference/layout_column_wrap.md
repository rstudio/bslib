# Column-first uniform grid layouts

Wraps a 1d sequence of UI elements into a 2d grid. The number of columns
(and rows) in the grid dependent on the column `width` as well as the
size of the display. For more explanation and illustrative examples, see
the *References* section below.

## Usage

``` r
layout_column_wrap(
  ...,
  width = "200px",
  fixed_width = FALSE,
  heights_equal = c("all", "row"),
  fill = TRUE,
  fillable = TRUE,
  height = NULL,
  height_mobile = NULL,
  min_height = NULL,
  max_height = NULL,
  gap = NULL,
  class = NULL
)
```

## Arguments

- ...:

  Unnamed arguments should be UI elements (e.g.,
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)).
  Named arguments become attributes on the containing
  [htmltools::tag](https://rstudio.github.io/htmltools/reference/builder.html)
  element.

- width:

  The desired width of each card, which can be any of the following:

  - A (unit-less) number between 0 and 1.

    - This should be specified as `1/num`, where `num` represents the
      number of desired columns.

  - A [CSS length
    unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)

    - Either the minimum (when `fixed_width=FALSE`) or fixed width
      (`fixed_width=TRUE`).

  - `NULL`

    - Allows power users to set the `grid-template-columns` CSS property
      manually, either via a `style` attribute or a CSS stylesheet.

- fixed_width:

  When `width` is greater than 1 or is a CSS length unit, e.g.
  `"200px"`, `fixed_width` indicates whether that `width` value
  represents the absolute size of each column (`fixed_width=TRUE`) or
  the minimum size of a column (`fixed_width=FALSE`). When
  `fixed_width=FALSE`, new columns are added to a row when `width` space
  is available and columns will never exceed the container or viewport
  size. When `fixed_width=TRUE`, all columns will be exactly `width`
  wide, which may result in columns overflowing the parent container.

- heights_equal:

  If `"all"` (the default), every card in every row of the grid will
  have the same height. If `"row"`, then every card in *each* row of the
  grid will have the same height, but heights may vary between rows.

- fill:

  Whether or not to allow the layout to grow/shrink to fit a fillable
  container with an opinionated height (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).

- fillable:

  Whether or not each element is wrapped in a fillable container.

- height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `height` in
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)).

- height_mobile:

  Any valid CSS unit to use for the height when on mobile devices (or
  narrow windows).

- min_height, max_height:

  The maximum or minimum height of the layout container. Can be any
  valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `max_height="200px"`). Use these arguments in filling layouts
  to ensure that a layout container doesn't shrink below `min_height` or
  grow beyond `max_height`.

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the `gap` (i.e., spacing) between elements provided to `...`.
  This argument is only applicable when `fillable = TRUE`

- class:

  Additional CSS classes for the returned UI element.

## References

The bslib website features `layout_column_wrap()` in two places:

- [Column-based
  layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)

- [Cards: Multiple
  cards](https://rstudio.github.io/bslib/articles/cards/index.html#multiple-cards)

## See also

Other Column layouts:
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
x <- card("A simple card")

# Always has 2 columns (on non-mobile)
layout_column_wrap(width = 1/2, x, x, x)

# Automatically lays out three cards into columns
# such that each column is at least 200px wide:
layout_column_wrap(x, x, x)

# To use larger column widths by default, set `width`.
# This example has 3 columns when the screen is at least 900px wide:
layout_column_wrap(width = "300px", x, x, x)

# You can add a list of items, spliced with rlang's `!!!` operator
layout_column_wrap(!!!list(x, x, x))
}
```
