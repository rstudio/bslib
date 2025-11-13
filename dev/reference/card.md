# A Bootstrap card component

A general purpose container for grouping related UI elements together
with a border and optional padding. To learn more about `card()`s, see
[the Cards
article](https://rstudio.github.io/bslib/articles/cards/index.html) or
the other articles listed in the *References* section below.

## Usage

``` r
card(
  ...,
  full_screen = FALSE,
  height = NULL,
  max_height = NULL,
  min_height = NULL,
  fill = TRUE,
  class = NULL,
  wrapper = card_body,
  id = NULL
)
```

## Arguments

- ...:

  Unnamed arguments can be any valid child of an [htmltools
  tag](https://rstudio.github.io/htmltools/reference/builder.html)
  (which includes card items such as
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).
  Named arguments become HTML attributes on returned UI element.

- full_screen:

  If `TRUE`, an icon will appear when hovering over the card body.
  Clicking the icon expands the card to fit viewport size.

- height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `height` in
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)).

- max_height, min_height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `max_height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `max_height` in
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)).

- fill:

  Whether or not to allow the card to grow/shrink to fit a fillable
  container with an opinionated height (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).

- class:

  Additional CSS classes for the returned UI element.

- wrapper:

  A function (which returns a UI element) to call on unnamed arguments
  in `...` which are not already card item(s) (like
  [`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
  etc.). Note that non-card items are grouped together into one
  `wrapper` call (e.g. given `card("a", "b", card_body("c"), "d")`,
  `wrapper` would be called twice, once with `"a"` and `"b"` and once
  with `"d"`).

- id:

  Provide a unique identifier for the `card()` or
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  to report its full screen state to Shiny. For example, using
  `id = "my_card"`, you can observe the card's full screen state with
  `input$my_card_full_screen`.

## Value

A
[`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
tag.

## References

Several articles on the bslib website feature the card component:

- [Cards](https://rstudio.github.io/bslib/articles/cards/index.html)

- [Get Started:
  Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)

- [Get Started: Any
  Project](https://rstudio.github.io/bslib/articles/any-project/index.html)

- [Column-based
  layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)

- [Filling layouts: Full-screen
  cards](https://rstudio.github.io/bslib/articles/filling/index.html#full-screen-cards)

## See also

[Card item
functions](https://rstudio.github.io/bslib/dev/reference/card_body.md)
create the various parts of a card.

[`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md),
[`navset_card_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
and
[`navset_card_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
create cards with tabbed navigation.

[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
and
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
help position multiple cards into columns and rows and can also be used
inside a card.

[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
adds a sidebar to a card when nested in `card()` or
[`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).

[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
uses `card()` to highlight a showcase a key piece of information.

Other Components:
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md),
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(htmltools)

card(
  full_screen = TRUE,
  card_header(
    "This is the header"
  ),
  card_body(
    p("This is the body."),
    p("This is still the body.")
  ),
  card_footer(
    "This is the footer"
  )
)
}
```
