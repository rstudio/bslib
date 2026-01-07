# Column-based layout

This article outlines various layouts made possible by
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md).
To illustrate, we’ll use three
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)
instances with varying content, but keep in mind that
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
is designed to work other UI elements as well, such as [value
boxes](https://rstudio.github.io/bslib/dev/articles/value-boxes) or even
for [multiple columns within a
card](https://rstudio.github.io/bslib/dev/articles/cards/#multiple-columns).

**Note:** The examples in this section are not intended to be viewed on
mobile devices. At small window widths, all of the layouts here collapse
into a more mobile-friendly approach of “show each card at maximum
width”.

``` r

library(bslib)

card1 <- card(
  card_header("Scrolling content"),
  lapply(
    lorem::ipsum(paragraphs = 3, sentences = c(5, 5, 5)),
    tags$p
  )
)
card2 <- card(
  card_header("Nothing much here"),
  "This is it."
)
card3 <- card(
  full_screen = TRUE,
  card_header("Filling content"),
  card_body(
    class = "p-0",
    shiny::plotOutput("p")
  )
)
```

### Uniform width and height

When displaying multiple cards (or value boxes, etc) at once, it’s often
most visually appealing to have them displayed in a grid-like layout
where each card has the same height and width.
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
optimizes for this design principle, and only demands a `width` for each
column (or a number of columns). In the event that there are more cards
than columns available, cards are wrapped into a new row (by default,
all rows have the same height, but you can easily [vary the row
height](#by-row)).

#### Fixed number of columns

For a fixed number of columns, provide `width = 1/n`, where `n` is the
number of columns.[^1] As the animation (except on mobile devices) below
shows, as the width of the
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
container changes, each card grows or shrinks to maintain its 1/2 width.

``` r

layout_column_wrap(
  width = 1/2, height = 300,
  card1, card2, card3
) |>
  anim_width("100%", "67%")
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Nothing much here

This is it.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

One potential issue with a fixed number of columns is that, on medium
sized screens, the card width may become too small. If that happens to
be a problem, specifying a “responsive” number of columns may be
preferable.

#### Responsive number of columns

For a responsive number of columns (i.e., the number of columns depends
on the window size), provide `width` with any valid CSS unit, like 200
pixels. In our case (with three cards), the 3rd card gets wrapped onto a
new line when the viewport is less than 600 pixels, but on wider
screens, the cards equally distribute the free space.

``` r

layout_column_wrap(
  width = "200px", height = 300,
  card1, card2, card3
) |>
  anim_width("100%", "67%")
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Nothing much here

This is it.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

#### Fixed column width

To keep the `width` of each column fixed (don’t allow cards to grow to
take up free space), set `fixed_width = TRUE`.

``` r

layout_column_wrap(
  width = "200px", height = 300,
  fixed_width = TRUE,
  card1, card2, card3
) |>
  anim_width("100%", "67%")
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Nothing much here

This is it.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

### Varying heights

By default, when
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
wraps columns onto a new row, *all* rows are given equal height.

#### By row

To allow the height of each row to be different, set
`heights_equal = "row"`:

``` r

layout_column_wrap(
  width = 1/2,
  heights_equal = "row",
  card1, card3, card2
) |>
  anim_height(300, 450)
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

Nothing much here

This is it.

#### By cell

Since each card is a fill item by default (i.e., `fill = TRUE`), each
card grows/shrinks to fill the available vertical space in a particular
row. This can be prevented by setting `fill = FALSE` on a particular
card.

``` r

layout_column_wrap(
  width = "200px",
  card1, card3, 
  card(fill = FALSE,
    card_header("Nothing much here"),
    "This is it."
  )
) |>
  anim_height(300, 450)
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

Nothing much here

This is it.

### Varying widths

Set `width` to `NULL` and provide a custom [`grid-template-columns`
property](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
(and possibly other [CSS grid
properties](https://css-tricks.com/snippets/css/complete-guide-grid/))
to accomplish more complex layouts, like varying column widths. This
particular layout gives the 1st and 3rd card twice as much space as the
2nd:

``` r

layout_column_wrap(
  width = NULL, height = 300, fill = FALSE,
  style = css(grid_template_columns = "2fr 1fr 2fr"),
  card1, card2, card3
) |>
  anim_height(300, 450)
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Nothing much here

This is it.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

### Nested layouts

More complex layouts can be achieved by leveraging the fact that
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
can appear within another
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)s.
For example

``` r

layout_column_wrap(
  width = 1/2,
  height = 300,
  card1,
  layout_column_wrap(
    width = 1,
    heights_equal = "row",
    card2, card3
  )
)
```

Scrolling content

Dolor odio etiam tristique aenean, cubilia ligula leo pulvinar fermentum
vestibulum. Hac erat aenean eros dis, integer, ad ultrices ultricies
erat rhoncus? Dictumst integer aptent suscipit arcu, turpis, per
ultrices, commodo convallis morbi. Proin integer ultrices viverra
iaculis cum ut ante ullamcorper. Nulla maecenas molestie.

Lorem cursus eu laoreet donec, pulvinar massa non purus, egestas
iaculis! Quisque suscipit sociosqu ac, himenaeos eleifend tincidunt
auctor elementum enim id netus nibh curabitur. Habitant bibendum –
aenean pellentesque neque commodo augue nam. Ullamcorper leo dictumst
fermentum at, ullamcorper dui aliquet suspendisse dis lacinia facilisis
nisl varius? Nullam cum.

Dolor faucibus ultricies est suspendisse vestibulum. Ad ultrices
elementum luctus montes, sociosqu facilisis primis; senectus augue
vulputate eget! Accumsan aliquet auctor, eget sagittis enim; eleifend
ornare blandit eros – magnis fusce? Dapibus lacus netus sed id duis
nulla quam maecenas feugiat fames senectus dictum cubilia. Mauris arcu
lacinia.

Nothing much here

This is it.

Filling content

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

### Other grid-based layouts

[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
provides a simplified interface to [CSS
grid](https://css-tricks.com/snippets/css/complete-guide-grid/) that
won’t accommodate everything it can do. In this case, we recommend using
`{gridlayout}` and/or the [Shiny UI
editor](https://rstudio.github.io/shinyuieditor/) to produce the layout.

## Appendix

In the spirit of reproducibility, this section discloses custom CSS and
R code used in the examples above.

The following CSS is used to give
[`plotOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html) a
background color; it’s necessary here because this documentation page is
not actually hooked up to a Shiny app, so we can’t show a real plot.

``` css
.shiny-plot-output {
  background-color: #216B7288;
  height: 400px;
  width: 100%;
}
```

These R functions add animation-related CSS class and styles to whatever
tags you give it.

``` r

library(htmltools)

anim_width <- function(x, width1, width2) {
  x |> tagAppendAttributes(
    class = "animate-width",
    style = css(
      `--width1` = validateCssUnit(width1),
      `--width2` = validateCssUnit(width2),
    ),
  )
}

anim_height <- function(x, height1, height2) {
  # Wrap in a div fixed at the height of height2, so the rest of
  # the content on the page doesn't shift up and down
  div(style = css(height = validateCssUnit(height2)),
    x |> tagAppendAttributes(
      class = "animate-height",
      style = css(
        `--height1` = validateCssUnit(height1),
        `--height2` = validateCssUnit(height2),
      ),
    )
  )
}
```

And here are the CSS animation rules that power those `anim_width` and
`anim_height` R functions.

``` css
@keyframes changewidth {
  from { width: var(--width1); }
  25% { width: var(--width1); }
  50% { width: var(--width2); }
  75% { width: var(--width2); }
  to { width: var(--width1); }
}
.animate-width {
  animation-duration: 6s;
  animation-name: changewidth;
  animation-iteration-count: infinite;
  border-right: 2px solid #DDD;
  padding-right: 1rem;
  padding-bottom: 3rem;
}

@keyframes changeheight {
  from { height: var(--height1); }
  25% { height: var(--height1); }
  50% { height: var(--height2); }
  75% { height: var(--height2); }
  to { height: var(--height1); }
}
.animate-height {
  height: 600px;
  animation-duration: var(--anim-duration, 6s);
  animation-name: changeheight;
  animation-iteration-count: infinite;
  padding-bottom: 3rem;
}
```

[^1]: Do not attempt to use percent-based widths with `width`–like
    `"50%"` instead of `1/2`. Percentages will almost certainly not give
    you the results you want.
