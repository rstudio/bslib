# Cards

Cards are a common organizing unit for modern user interfaces (UI). At
their core, they’re just rectangular containers with borders and
padding. However, when utilized properly to group related information,
they help users better digest, engage, and navigate through content.
This is why most successful dashboard/UI frameworks make cards a core
feature of their component library. This article provides an overview of
the API that bslib provides to create [Bootstrap
cards](https://getbootstrap.com/docs/5.0/components/card/).

## Setup code

To demonstrate that bslib cards work outside of Shiny (i.e., in R
Markdown, static HTML, etc), we’ll make repeated use of statically
rendered [htmlwidgets](http://www.htmlwidgets.org/) like
[plotly](https://plotly-r.com) and
[leaflet](https://rstudio.github.io/leaflet/). Here’s some code to
create those widgets:

``` r

library(bslib)
library(shiny)
library(htmltools)
library(plotly)
library(leaflet)

plotly_widget <- plot_ly(x = diamonds$cut) %>%
  config(displayModeBar = FALSE) %>%
  layout(margin = list(t = 0, b = 0, l = 0, r = 0))

leaflet_widget <- leafletOptions(attributionControl = FALSE) %>%
  leaflet(options = .) %>%
  addTiles()
```

### Shiny usage

Cards work equally well [in Shiny](#shiny). In the examples below,
replace `plotly_widget` with
[`plotlyOutput()`](https://rdrr.io/pkg/plotly/man/plotly-shiny.html) and
`leaflet_widget` with
[`leafletOutput()`](https://rstudio.github.io/leaflet/reference/map-shiny.html)
to adapt them for Shiny server-rendered plots/maps.

## Hello `card()`

A [`card()`](https://rstudio.github.io/bslib/reference/card.md) is
designed to handle any number of “known” card items (e.g.,
[`card_header()`](https://rstudio.github.io/bslib/reference/card_body.md),
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md),
etc) as unnamed arguments (i.e., children). As we’ll see shortly,
[`card()`](https://rstudio.github.io/bslib/reference/card.md) also has
some useful named arguments (e.g., `full_screen`, `height`, etc).

At their core,
[`card()`](https://rstudio.github.io/bslib/reference/card.md) and card
items are just an HTML
[`div()`](https://rstudio.github.io/htmltools/reference/builder.html)
with a special Bootstrap class, so you can use Bootstrap’s utility
classes to customize things like
[colors](https://getbootstrap.com/docs/5.2/utilities/background/),
[text](https://getbootstrap.com/docs/5.2/utilities/text/),
[borders](https://getbootstrap.com/docs/5.2/utilities/borders), etc.

``` r

card(
  card_header(
    class = "bg-dark",
    "A header"
  ),
  card_body(
    markdown("Some text with a [link](https://github.com)")
  )
)
```

A header

Some text with a [link](https://github.com)

## Implicit `card_body()`

If you find yourself using
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
without changing any of its defaults, consider dropping it altogether
since any direct children of
[`card()`](https://rstudio.github.io/bslib/reference/card.md) that
aren’t “known”
[`card()`](https://rstudio.github.io/bslib/reference/card.md) items, are
wrapped together into an implicit
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
call.[^1] For example, the code to the right generates HTML that is
identical to the previous example:

``` r

card(
  card_header(
    class = "bg-dark",
    "A header"
  ),
  markdown("Some text with a [link](https://github.com).")
)
```

A header

Some text with a [link](https://github.com).

## Restricting growth

By default, a
[`card()`](https://rstudio.github.io/bslib/reference/card.md)’s size
grows to accommodate the size of its contents. Thus, if a
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
contains a large amount of text, tables, etc., you may want to specify a
`height` or `max_height`. That said, when laying out [multiple
cards](#multiple-cards), it’s likely best not to specify height on the
[`card()`](https://rstudio.github.io/bslib/reference/card.md), and
instead, let the layout determine the height
[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md).

Although scrolling is convenient for reducing the amount of space
required to park lots of content, it can also be a nuisance to the user.
To help reduce the need for scrolling, consider pairing scrolling with
`full_screen = TRUE` (which adds an icon to expand the card’s size to
the browser window). Notice how, when the card is expanded to
full-screen, `max_height`/`height` won’t effect the full-screen size of
the card.

``` r

card(
  max_height = 250,
  full_screen = TRUE,
  card_header(
    "A long, scrolling, description"
  ),
  lorem::ipsum(paragraphs = 3, sentences = 5)
)
```

A long, scrolling, description

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

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Filling outputs

A [`card()`](https://rstudio.github.io/bslib/reference/card.md)’s
default behavior is optimized for facilitating [filling
layouts](https://rstudio.github.io/bslib/articles/filling). More
specifically, if a **fill item** (e.g., `plotly_widget`), appears as a
*direct child* of a
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md),
it resizes to fit the
[`card()`](https://rstudio.github.io/bslib/reference/card.md)s specified
height. This means, by specifying `height = 250` we’ve effectively
shrunk the plot’s height from its default of 400 down to about 200
pixels. And, when expanded to `full_screen`, the plot grows to match the
[`card()`](https://rstudio.github.io/bslib/reference/card.md)’s new
size.

``` r

card(
  height = 250,
  full_screen = TRUE,
  card_header("A filling plot"),
  card_body(plotly_widget)
)
```

A filling plot

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

Most htmlwidgets (e.g., plotly, leaflet, etc) and some other Shiny
output bindings (e.g,
[`plotOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html),
[`imageOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html), etc)
are **fill item**s by default, so this behavior “just works” in those
scenarios. And, in some of these situations, it’s helpful to remove
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)’s
padding, which can be done via [spacing & alignment utility
classes](https://rstudio.github.io/bslib/articles/utility-classes/#add-padding-borders-and-alignment).

``` r

card(
  height = 275,
  full_screen = TRUE,
  card_header("A filling map"),
  card_body(
    class = "p-0",
    leaflet_widget
  ),
  card_footer(
    class = "fs-6",
    "Copyright 2023 RStudio, PBC"
  )
)
```

A filling map

Copyright 2023 RStudio, PBC

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

**Fill item**(s) aren’t limited in how much they grow and shrink, which
can be problematic when a card becomes very small. To work around this,
consider adding a `min_height` on the
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
container. For example, try using the handle on the lower-right portion
of this card example to make the card taller/smaller.

This interactive example is a bit contrived in that we’re using [CSS
resize](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) to
demonstrate how to make plots that don’t shrink beyond a certain point,
but this concept becomes quite useful when implementing page-level
[filling layouts](https://rstudio.github.io/bslib/articles/filling)
(i.e.,
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md))
with [multiple cards](#multiple-cards).

``` r

card(
  height = 300,
  style = "resize:vertical;",
  card_header("Plots that grow but don't shrink"),
  card_body(
    min_height = 250,
    plotly_widget,
    plotly_widget
  )
)
```

Plots that grow but don't shrink

### Troubleshooting fill

As you’ll learn more about in [filling
layouts](https://rstudio.github.io/bslib/articles/filling), a **fill
item** loses its ability to fill when wrapped in additional UI element
that isn’t a **fillable** container. To fix the situation, use
[`as_fill_carrier()`](https://rstudio.github.io/bslib/reference/as_fill_carrier.md)
to allow the additional element to carry the potential to fill from the
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
down to the fill item.

## Multiple `card_body()`

A [`card()`](https://rstudio.github.io/bslib/reference/card.md) can have
multiple
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)s,
which is especially useful for:

1.  Combining both resizable and non-resizable contents (i.e., **fill
    items** and non-fill).
2.  Allowing each
    [`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
    to have their own styling (via inline styles and/or utility classes)
    and resizing limits (e.g., `min_height`).

For example, when pairing filling output with scrolling content, you may
want `min_height` on the filling output since the scrolling content will
force it to shrink:

``` r

card(
  height = 375,
  full_screen = TRUE,
  card_header(
    "Filling plot, scrolling description"
  ),
  card_body(
    min_height = 200,
    plotly_widget
  ),
  card_body(
    class = "lead container",
    lorem::ipsum(paragraphs = 10, sentences = 5)
  )
)
```

Filling plot, scrolling description

Elit sagittis ante pharetra ligula tincidunt sapien dapibus volutpat.
Cursus nam nisl penatibus luctus, eu, praesent suspendisse sagittis
curabitur, rhoncus sollicitudin venenatis elementum! Felis habitasse
pretium ultricies, arcu lacus: habitant curae, dis venenatis! Interdum
fames eros scelerisque cursus: orci phasellus enim sapien aliquam! Est
fusce dignissim, commodo iaculis tincidunt fringilla, donec class morbi
– elementum auctor scelerisque neque justo netus habitasse.

Consectetur proin sodales venenatis, ultricies luctus eget bibendum.
Venenatis dis conubia aliquam pretium venenatis habitasse egestas. Dui
natoque dui eu aliquet mauris: risus, gravida vitae nunc arcu potenti?
Nullam bibendum scelerisque nostra rutrum aenean turpis sagittis orci!
Interdum fermentum feugiat eu gravida integer, parturient eros cursus
inceptos aenean augue iaculis posuere lacinia tempor ad?

Lorem at dictumst metus ultricies morbi mus: ullamcorper mus duis.
Mauris consequat congue feugiat litora suscipit. Rutrum aliquam ante
accumsan inceptos vulputate cum torquent curabitur commodo et lacinia.
Fames quisque senectus, vestibulum natoque at lacinia. Tortor dis est
enim fusce nec.

Elit mi dictumst nullam habitasse a dis, imperdiet, placerat elementum
vivamus. Libero fermentum quis facilisi auctor fermentum fusce potenti
eros aliquet arcu. Tempor parturient dui – vulputate metus ultrices
consequat: ridiculus molestie cum condimentum. Ad quis montes ridiculus
vivamus, dapibus tortor? Na tortor.

Elit torquent taciti, sapien ante felis tempus vestibulum lacinia
interdum! Vitae magna rhoncus, nunc nisl, etiam magnis mattis aenean
fames. Praesent natoque quam nam suspendisse dignissim; pretium,
malesuada, massa congue nisi? Cras potenti dis, senectus elementum lacus
dapibus natoque laoreet bibendum lacus. Na lacus.

Ipsum sodales cubilia torquent leo massa himenaeos erat dignissim.
Condimentum sed diam elementum justo congue, luctus curae. Sodales
inceptos facilisis ullamcorper, proin odio maecenas natoque ornare
iaculis. Placerat scelerisque viverra porta dignissim fermentum eros
congue tincidunt et eget! Suspendisse aliquet sem sed donec ultrices
convallis a nulla penatibus, eget nec laoreet viverra orci eget at
pharetra; rutrum habitant.

Lorem fringilla pulvinar mauris risus ornare at a. Congue ultricies non
platea, neque nisi viverra, class sapien. Libero netus fusce platea
parturient auctor taciti molestie egestas in lacinia nulla. Sociis
natoque curae metus penatibus arcu. Etiam et blandit scelerisque
curabitur elementum sagittis etiam, ut quam nascetur fames.

Amet porttitor vulputate feugiat – luctus senectus taciti convallis:
mauris metus aenean. Mollis malesuada suscipit nam tristique, rhoncus
maecenas porttitor nullam? Porta montes rutrum nostra pellentesque
taciti proin nibh, nam sem ultricies. Et pulvinar fermentum neque
viverra sagittis hendrerit, rhoncus venenatis himenaeos! Facilisis
pulvinar venenatis, habitant egestas tortor tincidunt lobortis.

Lorem a netus mauris dapibus, scelerisque euismod nunc venenatis varius.
Sagittis metus habitant, in mattis auctor suspendisse at suspendisse,
orci habitasse? Nam inceptos nisl pellentesque senectus tempor facilisi
quam metus mollis, aliquet nec faucibus luctus. Massa cras justo nam id
ad ullamcorper porttitor; quisque diam. Viverra sociis.

Consectetur convallis at senectus accumsan; id cursus porta sem eros.
Viverra dignissim, enim ultricies purus sem neque tellus curabitur.
Posuere porta orci arcu, fringilla conubia himenaeos urna a lacus.
Mauris sed in aptent, aenean lacinia malesuada turpis justo sagittis
class? Na class!

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

Also, when the content has a fixed size, and should not be allowed to
scroll, set `fill = FALSE`:

``` r

card(
  height = 350,
  full_screen = TRUE,
  card_header(
    "Filling plot, short description"
  ),
  plotly_widget,
  card_body(
    fill = FALSE, gap = 0,
    card_title("A subtitle"),
    p(class = "text-muted", "And a caption")
  )
)
```

Filling plot, short description

##### A subtitle

And a caption

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Multiple columns

As you’ll learn in [column-based
layouts](https://rstudio.github.io/bslib/articles/column-layout),
[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md)
is great for multi-column layouts that are responsive and accommodate
for [filling output](#filling-outputs). Here we have an equal-width
2-column layout using `width = 1/2`, but it’s also possible to have
[varying column
widths](https://rstudio.github.io/bslib/articles/column-layout#varying-widths).

``` r

card(
  height = 350,
  full_screen = TRUE,
  card_header("A multi-column filling layout"),
  card_body(
    min_height = 200,
    layout_column_wrap(
      width = 1/2,
      plotOutput("p1"),
      plotOutput("p2")
    )
  ),
  lorem::ipsum(paragraphs = 3, sentences = 5)
)
```

A multi-column filling layout

Dolor nullam gravida tincidunt fringilla ultricies eleifend magna enim.
Aptent nisi ornare dictum aliquet penatibus arcu duis euismod? Ornare
rutrum suspendisse convallis velit ridiculus, velit tempus est fermentum
torquent pellentesque. Eleifend metus, laoreet natoque, primis massa
facilisi magnis. Cubilia egestas aptent rutrum pretium interdum in,
neque, netus inceptos pellentesque.

Dolor urna ultrices porttitor cras – taciti magna pharetra penatibus.
Cubilia rhoncus dapibus, sodales condimentum arcu proin natoque gravida.
Accumsan gravida justo orci lacinia convallis augue condimentum
habitant. Curae a mattis proin tincidunt dignissim et praesent nunc
fusce ultrices litora lacinia! Tincidunt tincidunt euismod platea
molestie?

Adipiscing cum porta accumsan, fusce hac porta a porta. Pharetra in
suscipit bibendum suscipit pellentesque quisque: at purus porta magna.
Netus quis cras rutrum mi ultrices: torquent senectus! Mauris varius
tincidunt cras habitasse metus ut nisi! Felis erat faucibus vel iaculis
ridiculus odio quis nullam quam pulvinar a nunc litora!

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Multiple cards

[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md)
is especially nice for laying out multiple cards since each card in a
particular row will have the same height (by default). Learn more in
[column-based
layouts](https://rstudio.github.io/bslib/articles/column-layout).

``` r

layout_column_wrap(
  width = 1/2,
  height = 300,
  card(full_screen = TRUE, card_header("A filling plot"), plotly_widget),
  card(full_screen = TRUE, card_header("A filling map"), card_body(class = "p-0", leaflet_widget))
)
```

A filling plot

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

A filling map

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Multiple tabs

[`navset_card_tab()`](https://rstudio.github.io/bslib/reference/navset.md)
and
[`navset_card_pill()`](https://rstudio.github.io/bslib/reference/navset.md)
make it possible to create cards with multiple tabs or pills. These
functions have the same `full_screen` capabilities as normal
[`card()`](https://rstudio.github.io/bslib/reference/card.md)s as well
some other options like `title` (since there is no natural place for a
[`card_header()`](https://rstudio.github.io/bslib/reference/card_body.md)
to be used). Note that, each
[`nav_panel()`](https://rstudio.github.io/bslib/reference/nav-items.md)
object is similar to a
[`card()`](https://rstudio.github.io/bslib/reference/card.md). That is,
if the direct children aren’t already card items (e.g.,
[`card_title()`](https://rstudio.github.io/bslib/reference/card_body.md)),
they get [implicitly wrapped](#implicit-card_body) in a
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md).

``` r

library(leaflet)
navset_card_tab(
  height = 450,
  full_screen = TRUE,
  title = "HTML Widgets",
  nav_panel(
    "Plotly",
    card_title("A plotly plot"),
    plotly_widget
  ),
  nav_panel(
    "Leaflet",
    card_title("A leaflet plot"),
    leaflet_widget
  ),
  nav_panel(
    shiny::icon("circle-info"),
    markdown("Learn more about [htmlwidgets](http://www.htmlwidgets.org/)")
  )
)
```

HTML Widgets

- [Plotly](#tab-9785-1)
- [Leaflet](#tab-9785-2)
- [](#tab-9785-3)

##### A plotly plot

##### A leaflet plot

Learn more about [htmlwidgets](http://www.htmlwidgets.org/)

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Sidebars

As you’ll learn more about in [sidebar
layouts](https://rstudio.github.io/bslib/articles/sidebars),
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
just works when placed inside in a
[`card()`](https://rstudio.github.io/bslib/reference/card.md). In this
case, if you want **fill item**s (e.g., `plotly_widget`) to still fill
the card like we’ve [seen before](#filling-outputs), you’ll need to set
`fillable = TRUE` in
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md).

``` r

card(
  height = 300,
  full_screen = TRUE,
  card_header("A sidebar layout inside a card"),
  layout_sidebar(
    fillable = TRUE,
    sidebar = sidebar(
      actionButton("btn", "A button")
    ),
    plotly_widget
  )
)
```

A sidebar layout inside a card

A button

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Static images

[`card_image()`](https://rstudio.github.io/bslib/reference/card_body.md)
makes it easy to embed static (i.e., pre-generated) images into a card.
Provide a URL to `href` to make it clickable. In the case of multiple
[`card_image()`](https://rstudio.github.io/bslib/reference/card_body.md)s,
consider laying them out in [multiple cards](#multiple-cards) with
[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md)
to produce a grid of clickable thumbnails.

``` r

card(
  height = 300,
  full_screen = TRUE,
  card_image(
    file = "shiny-hex.svg",
    alt = "Shiny's hex sticker",
    href = "https://github.com/rstudio/shiny"
  ),
  card_body(
    fill = FALSE,
    card_title("Shiny for R"),
    p(
      class = "fw-light text-muted",
      "Brought to you by RStudio."
    )
  )
)
```

[![Shiny's hex
sticker](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjUuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNTIxIDI5MTEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1MjEgMjkxMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDg4REE7fQoJLnN0MXtmaWxsOiNFMkIwNTg7fQoJLnN0MntvcGFjaXR5OjAuOTtmaWxsOiNGRkZGRkY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3Qze2ZpbGw6bm9uZTt9Cgkuc3Q0e29wYWNpdHk6MC4yNTtmaWxsOnVybCgjU1ZHSURfMV8pO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0NXtmaWxsOiMwMDc4QkU7fQo8L3N0eWxlPgo8ZyBpZD0iTGF5ZXJfMV8wMDAwMDAxNjc5NzczODg5NDQzOTU0NDk3MDAwMDAwMzMxODgxMDMwMjE2ODE1MTczOV8iPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI0MjAuNSw2NjkuOGwtOTUzLjEtNTUwLjRMMTI2MC41LDBsLTIwNi45LDExOS40TDEwMC41LDY2OS44TDAsNzI3Ljd2MTQ1NS41bDEwMC41LDU4bDk2NS4xLDU1Ny4yCgkJCWwxOTUuMiwxMTIuNWwxOTUuMi0xMTIuNWw5NjUuMS01NTcuMmw5OS44LTU3LjZWNzI3LjdMMjQyMC41LDY2OS44eiIvPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMjYwLjUsMjE3MS42YzEtMSwyLjEtMi4xLDMuMS0zLjFoLTFDMTI2Mi4yLDIxNjkuNSwxMjYxLjUsMjE3MC42LDEyNjAuNSwyMTcxLjZ6Ii8+CgkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQyMy44LDE1NjhMNDIzLjgsMTU2OEM0MTIuNSwxNTY3LjcsNDIwLDE1NjgsNDIzLjgsMTU2OHogTTQyMy41LDE1NjhjLTExLTAuMy02LjIsMC0yLjQsMGg1LjhoLTAuM0g0MjMuNQoJCQlDNDI1LjksMTU2OCw0MjYuOSwxNTY4LjQsNDIzLjUsMTU2OHogTTcwNy45LDE0MDAuNmMyMy42LTkxLjUtODcuNC0yMTMuNC05Ni42LTIyNWMtMC4xLTAuMS0wLjItMC4yLTAuMy0wLjQKCQkJYy0xMzMuMi0xMzYuMy02NC43LTI3Mi40LDI4LjMtMjU3LjRjNjYuOSwxMSwzMi4zLDEwOS4xLDY4LjMsMTE4LjdoMC43YzIxLjYsMi4xLDYzLjgtNDkuOCw3MC02Ny4zCgkJCWMyNC02Ny45LTExNC42LTEwOS41LTE1Ni44LTEwNi43Yy04NC43LDUuMS0xNDAuMyw1MS4xLTE3NC4zLDEyN2MtNjIuNCwxMzkuNiw1NC4yLDIzMi42LDEyNC45LDMyOC40CgkJCWM1My41LDcyLjQsNTEuMSwxMzYuOS0xNC40LDE5OWMtNzIsNjguMy0xNDUuMi0yOC41LTE1NC44LTk0LjdjLTguNi02MC43LTE4LjUtMTAwLjItNjkuMy0yM2MtNDcsNzEuNywxOC41LDE1OS43LDc3LjcsMTY5CgkJCUM0MjUuMywxNTY5LjIsNjQ1LjcsMTYxNy41LDcwNy45LDE0MDAuNnogTTE2MjguNCwxNzg0LjVjLTMyNS4yLDI5LjUtODAzLjksNzMuNC05MDQuNyw0MjUuNWMtMC43LDIuMS0yLjQsMy4xLTQuNSwyLjQKCQkJYy0xLTAuMy0xLjctMC43LTIuMS0xLjdDNjE4LjMsMjA0MS45LDQwNiwxOTE4LDIwOSwxOTIzLjljLTIuMSwwLjMtMy44LTAuNy00LjEtMi43czAuNy0zLjgsMi43LTQuMQoJCQljNTA3LjEtMjUxLjgsMTAyNS4xLTEzMS4xLDE1NzIuNy0yMjguOWMyMjkuNS02MC4xLDM3Mi4xLTE2Ny4yLDQ0OS42LTM0OS40YzEyLjktMjIuMiwxMi4yLTU2LjUtMjMuNS0zMi4xCgkJCWMtNTUuMiwzNy40LTEwNi4xLDkxLjYtMTY2LjEsMTIwLjhjLTIuNywxLjQtNS44LDIuNy04LjksMy44Yy0xLDAuMy0xLjcsMS40LTIuMSwyLjRjLTE3My45LDM5Ni44LTY1Ny44LDY5LjctODkuOS0xMwoJCQljMS40LTAuMywyLjQtMS40LDIuNC0yLjRsMzItMTA0YzAuNy0yLjEtMC43LTMuOC0yLjQtNC41Yy0xLjQtMC4zLTMuMSwwLjMtMy44LDEuNGMtMTMsMTkuMi0yNy40LDM3LjQtNDIuOSw1NC42CgkJCWMtMjAuMiwyMS4zLTM2LDM0LjMtNDgsMzkuMWMtMTMuNyw1LjEtMjguMSw4LjItNDIuNSw4LjljLTE3LjIsMS0zMS45LTUuOC00My4yLTIwLjJjLTExLjMtMTQuNC0xNy41LTM1LjctMTguOS02My44CgkJCWMtMC4zLTQuNS0wLjMtOS42LDAtMTUuMWMwLjMtMi4xLTAuNy0zLjgtMi40LTQuNWMtMi4xLTAuMy0zLjgsMC43LTQuNSwyLjRjLTUuNSwxMC42LTExLDIwLjYtMTYuNSwyOS41CgkJCWMtMTYuMSwyOC4xLTM2LjQsNTMuOS01OS40LDc2LjljLTIyLjYsMjIuNi00NC42LDM0LjctNjQuOCwzNmMtMzguMSwyLjQtNTguNy0xOS4yLTYxLjQtNjQuNWMtMi43LTQzLjIsMTQuNC0xMzIuMSw1MS41LTI2NC41CgkJCWMyLjEtNS44LDIuNy0xMiwyLjQtMTcuOGMtMC43LTEyLTcuNS0xNi44LTIxLjYtMTUuOGMtMTYuMSwxLjQtMzEuNiw3LjktNDQuMywxOC41Yy0xNS44LDEzLjQtMjguOCwyOS45LTM4LjEsNDguNAoJCQljLTExLjMsMjAuNi0yMS4zLDQxLjktMzAuNSw2My41Yy05LjYsMjMuNy0xNy41LDQ4LjQtMjMuNyw3My40Yy02LjksMjcuOC0xMi43LDUxLjEtMTYuNSw2OS4zYy00LjEsMTguOS03LjksMzguOC0xMS43LDU5LjQKCQkJYy0yLjcsMTQuNC01LjgsMzIuMy02LjUsMzVsLTAuNywyLjdjMCwwLTkzLjUsNi41LTk0LjMsNi4yYy0yLTE2LjgsMTYuNy04MC45LDE4LjctOTAuNmMtMTcuMSwyOS45LTIzLjgsMzkuNC0zNy42LDU3LjcKCQkJYy04LjksMTEuMy0xOC42LDIyLjEtMjguOCwzMi4zYy0yMi42LDIyLjYtNDQuNiwzNC43LTY0LjgsMzZjLTEuNCwwLTIuNywwLTQuMSwwYy0zMy4zLDAtNTIuMS0yNi4xLTU1LjItNzcuNQoJCQljLTAuNy0xMC4zLTEtMjAuNi0wLjctMzEuMmMwLjMtMi4xLTAuNy0zLjgtMi40LTQuNWMtMi4xLTAuMy0zLjgsMC43LTQuNSwyLjRjLTUxLjgsOTUtOTguNSwxNDMuMS0xNDEuNywxNDUuOAoJCQljLTM4LjEsMi40LTU4LjctMjAuMi02MS44LTY3LjZjLTMuNC01Mi41LDExLTEyOS40LDQyLjktMjI4LjJjNi45LTI0LjQsOS45LTQxLjIsOS4zLTUwLjFjLTEtMTMuNy03LjItMTUuNC0xMi40LTE1LjRoLTEuNAoJCQljLTQuNSwwLjMtMTQuMSwzLjEtMzQuMywxNS44Yy0xNy44LDExLjctMzMuMywyNi4xLTQ2LDQyLjljLTE0LjgsMTkuMi0yNi40LDQwLjgtMzUsNjMuNWMtOC45LDI0LTE2LjEsNDQuOS0yMS4zLDYyLjQKCQkJcy0xMC4zLDM5LjEtMTUuNCw2My44cy05LjYsNDYtMTMuNyw2MS44Yy00LjEsMTUuOC04LjIsMzQtMTIuNCw1NC45bC0wLjcsMi43bC05MC42LDUuOGMtMi4xLDAtMy44LTEuNC0zLjgtMy40CgkJCWMwLTAuMywwLTAuNywwLTEuNGwwLDBjMTMuNC00Ni4zLDMyLjMtMTIxLjUsNTYuMy0yMjNjMjQtMTAxLjYsNDYtMTgyLjksNjMuOC0yNDEuMmMxNS40LTUwLjgsMzMuNi0xMDAuOSw1NC45LTE0OS4zCgkJCWMxNi41LTM3LjcsMzguOC03My4xLDY1LjktMTA0LjNjMjUuNy0yOC44LDU0LjYtNDQuMyw4NS4xLTQ2LjNjMzIuMy0yLjEsNDkuNCwxNC4xLDUxLjgsNDcuNGMxLjQsMjIuMy01LjEsNTIuMi0xOS4yLDg5LjYKCQkJYy0yNS43LDY2LjItNjguNiwxNDMuNC0xMjgsMjI5LjVjLTEuNCwxLjQtMS40LDMuOCwwLDUuMXMzLjgsMS40LDUuMSwwYzEwLjMtNy45LDIxLjMtMTUuMSwzMi45LTIwLjljMTcuMi04LjksMzYtMTQuMSw1NS42LTE1LjgKCQkJYzM2LjctMi40LDU2LjMsMTQuNCw1OC43LDQ5LjhjMSwxMy0wLjMsMjYuMS00LjEsMzguNGMtMy40LDExLjMtNy4yLDI0LjctMTEuNywzOS41Yy00LjEsMTQuOC03LjUsMjcuMS0xMC4zLDM2LjQKCQkJYy0yLjcsOS42LTYuMiwyMi4zLTEwLjYsMzguNGMtNC41LDE2LjEtNy45LDMwLjItOS45LDQxLjJjLTYuMiwyNy44LTguNiw1MC4xLTcuNSw2Ni4yYzEuNCwyMC42LDkuNiwyMC42LDEyLjQsMjAuNmgxCgkJCWMzNC43LTIuMSw3NS41LTYyLjQsMTIxLjgtMTc5LjFjMC4zLTAuNywwLjMtMSwwLjctMS43YzEwLjYtMzguNCwyNC03Ni4yLDQwLjEtMTEyLjVjMTkuMi00Mi4yLDQyLjUtNjQuNSw3MC02Ni4ybDU0LjktMi43CgkJCWMyLjEsMCwzLjgsMS40LDMuOCwzLjRjMCwxLTAuMywyLjEtMSwyLjdsMCwwYy04LjYsOC4yLTE5LjksMzAuMi0zMy42LDY1LjVjLTE0LjQsMzguMS0yNC40LDY0LjItMzAuOSw4MS43CgkJCWMtNi41LDE4LjItMTQuMSw0Mi45LTIyLDczLjhzLTExLjMsNTUuNi05LjksNzQuMWMxLjcsMjQuNCwxMSwyNC40LDE0LjEsMjQuNGgxYzQuOC0wLjMsMTMuNy0zLjgsMjkuOC0xOC41CgkJCWMxMi40LTExLjMsMjMtMjQsMzEuOS0zOC4xYzguMi0xMy40LDE3LjItMzAuMiwyNy4xLTUwLjhjOS45LTIwLjYsMTguNS0zOC40LDI1LjctNTMuNWM3LjktMTYuMSwxMS0yMS42LDEzLTIzLjdsNC41LTguMgoJCQljMTYuOC02Ny45LDI0LjctMTE1LjYsMjMtMTQyLjFjMC00LjUtMS04LjktMy4xLTEzbDAsMGMtMS0xLjQtMS0zLjgsMC43LTQuOGMwLjctMC4zLDEuNC0wLjcsMi4xLTAuN2wzOC4xLTIuNAoJCQljMjIuMy0xLjQsMzYuNCwwLDQzLjYsNC44czExLjcsMTIuNywxMiwyMC45YzAsOC4yLTAuNywxNi44LTIuNCwyNWMtMC4zLDIuMSwxLDMuOCwzLjEsNC4xYzEsMC4zLDIuNC0wLjMsMy4xLTEKCQkJYzQyLjktNDQuNiw4Ny41LTY4LjYsMTMzLjUtNzEuNGMzNi43LTIuNCw1Ni42LDE1LjEsNTguNyw1MS44YzAuNywxMS43LDAsMjMuMy0yLjQsMzVzLTguMiwzNC4zLTE4LjUsNjkuMwoJCQljLTIxLjYsNzUuMS0zMS45LDEyNS42LTMwLjIsMTUwLjNjMSwxNy41LDcuOSwxOS42LDEzLDE5LjZoMWM0LjgtMC4zLDEzLjctMy44LDI5LjUtMTguOWMxMi40LTExLjcsMjMtMjQuNywzMi4zLTM4LjgKCQkJYzkuOS0xNi4xLDE5LjItMzIuOSwyNy40LTUwLjFjOS45LTE5LjksMTguMi0zNy43LDI1LjQtNTIuOGMyLjQtNS41LDQuNS05LjYsNi4yLTEzYzAtMC4zLDAuMy0wLjMsMC4zLTAuNwoJCQljOS45LTQxLjksMjEuNi03Ni41LDM1LTEwMy4zYzE1LjQtMzEuNiwzMi45LTUyLjUsNTEuNS02Mi44YzE4LjUtMTAuMyw0My45LTE2LjEsNzYuNS0xOC4ybDAsMGM0LjEtMC4zLDcuNSwyLjcsNy45LDYuNQoJCQljMCwwLjMsMCwwLjMsMCwwLjdjMC4zLDMuOC0xLjcsNy45LTUuOCwxM2MtMjMsMjUtNDUuMyw2OS4zLTY2LjksMTMxLjhjLTIxLjYsNjIuNC0zMC45LDExNC45LTI4LjUsMTU2LjgKCQkJYzEuNCwxOS4yLDYuMiwyOS4yLDE0LjQsMjkuMmgwLjdjMjAuMi0xLjQsNDYtMjYuNCw3NS44LTc0LjhjMjkuMi00Niw1Mi4xLTk1LjQsNjguNi0xNDcuMmMyLjEtNi45LDQuOC0xNi41LDguNi0yOS41CgkJCWMzLjgtMTMsNi41LTIxLjYsNy45LTI2LjRzNC4xLTExLjcsNy41LTIwLjJjMi4zLTYuNyw1LjctMTIuOCw5LjctMTguNWMwLjItMC4zLDAuNC0wLjUsMC42LTAuOGMyLjctMyw2LjctNywxMS4zLTEyCgkJCWM0LjgtNS4xLDEwLjMtOC45LDE2LjgtMTFjMTYuMS00LjgsMzIuNi03LjksNDkuNC05LjNsMzguMS0yLjRjMS43LTAuNywzLjgsMC4zLDQuNSwyLjFjMC43LDEuNy0wLjMsMy44LTIuMSw0LjVsLTAuNywwLjcKCQkJYy0xNy4yLDEzLjQtMzQsNDUuMy00OS43LDk1Yy0xMyw0Mi4yLTI0LDgxLjMtMzIuNiwxMTZzLTE0LjEsNTUuOS0xNi4xLDYzLjVjLTIuMSw3LjUtNi41LDI2LjEtMTMuNCw1NC4yCgkJCWMtNS4xLDIxLjMtOS42LDM4LjgtMTMuNCw1Mi44Yy0wLjcsMS43LDAsMy44LDEuNyw0LjVjMSwwLjMsMi40LDAuMywzLjQtMC43YzM3LjQtMjIuMyw3MS43LTQ5LjEsMTAyLjktNzkuNgoJCQljMTcuNS0xNy41LDE1Ni40LTE2NC4xLDE1Ni40LTcxLjRDMjMwMi4zLDE1NzcsMTk1My42LDE3NTUsMTYyOC40LDE3ODQuNXogTTEwNDEuNCw4MTIuNWMtMTMuNCwwLjctMzcuMSwyMS4zLTcyLjcsMTEzLjIKCQkJQzk0NCw5ODkuMiw5MjAsMTA2MS42LDg5NywxMTQxLjJjLTAuNywyLjEsMC43LDMuOCwyLjQsNC41YzEuNCwwLjMsMy4xLDAsNC4xLTEuNGM2MS44LTk0LjQsMTA0LjYtMTcyLjksMTI3LjMtMjM0LjMKCQkJYzE0LjEtNDEuOSwyMC42LTY5LjcsMTkuOS04MmMtMS0xNS4xLTYuOS0xNS4xLTguNi0xNS4xTDEwNDEuNCw4MTIuNXogTTE5MjcuMSwxNDcwYy0xNC4zLDIuNy0xOTAuMSw0OC0xNzIuMyw4Ni45CgkJCUMxNzc1LjEsMTYwMSwxODkzLjcsMTU0NC44LDE5MjcuMSwxNDcweiBNMTMxOC45LDEwMTcuN0wxMzE4LjksMTAxNy43YzIyLTEsNDkuNC05LjMsNTUuOS00MS45YzMuMS0xNC44LTUuOC0zMS42LTExLjMtMzYuNAoJCQljLTUuNS00LjgtMTMtNi45LTIzLTYuMnMtMjIsNi45LTMzLjMsMTcuNWMtMTUuMSwxNC4xLTE0LjQsMzQuMy05LjYsNDcuN0MxMzAyLjEsMTAwOS44LDEzMTAsMTAxNy4zLDEzMTguOSwxMDE3Ljd6Ii8+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIyODcuNyw2NzYuNmMtMTgwLjEsMjg4LjEtNTcyLjYsNDg3LjktMTAyNy42LDQ4Ny45QzgwNC45LDExNjQuNSw0MTIuOCw5NjUsMjMyLjUsNjc3bC05NS45LDU1LjMKCQkJbC02NC40LDM3LjF2MTM3MS45bDY0LjMsMzcuMWw5NjUuMSw1NTcuMmwxNTkuMSw5MS43bDE1OS4xLTkxLjdsOTY1LjEtNTU3LjJsNjMuNy0zNi44Vjc2OS41bC02NC4zLTM3LjFMMjI4Ny43LDY3Ni42eiIvPgoJCQoJCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjEyNTYuODUxMyIgeTE9Ii0xMjQ3LjQ5MjIiIHgyPSIxMjYxLjUyNTEiIHkyPSI0MTguOTk1MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDAgNzM2LjQzODIpIj4KCQkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MC44MyIvPgoJCQk8c3RvcCAgb2Zmc2V0PSIwLjU2IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowLjM3Ii8+CgkJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkZGRkY7c3RvcC1vcGFjaXR5OjAiLz4KCQk8L2xpbmVhckdyYWRpZW50PgoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMjYwLjEsMTE1Mi44YzQ1NSwwLDg0Ny41LTE5OS44LDEwMjcuNi00ODcuOWwtODU2LjUtNDk0LjZsLTE3MC43LTk4LjVsLTE3MC43LDk4LjVsLTg1Ny4yLDQ5NQoJCQlDNDEyLjksOTUzLjMsODA0LjksMTE1Mi44LDEyNjAuMSwxMTUyLjh6Ii8+CgkJPHBhdGggY2xhc3M9InN0NSIgZD0iTTI0MjAuNSw2NjkuOGwtOTUzLjEtNTUwLjRMMTI2MC41LDBsLTIwNi45LDExOS40TDEwMC41LDY2OS44TDAsNzI3Ljd2MTQ1NS41bDEwMC41LDU4bDk2NS4xLDU1Ny4yCgkJCWwxOTUuMiwxMTIuNWwxOTUuMi0xMTIuNWw5NjUuMS01NTcuMmw5OS44LTU3LjZWNzI3LjdMMjQyMC41LDY2OS44eiBNMjQ0OC43LDIxNDEuOGwtNjMuNywzNi44bC05NjUuMSw1NTcuMmwtMTU5LjEsOTEuNwoJCQlsLTE1OS4xLTkxLjdsLTk2NS4xLTU1Ny4ybC02NC4zLTM3LjF2LTEzNzJsNjQuNC0zNy4xbDk1LjktNTUuM2w4NTcuMi00OTVsMTcwLjctOTguNWwxNzAuNyw5OC41bDg1Ni41LDQ5NC42bDk2LjYsNTUuOAoJCQlsNjQuMywzNy4xTDI0NDguNywyMTQxLjhMMjQ0OC43LDIxNDEuOHoiLz4KCQk8cG9seWdvbiBjbGFzcz0ic3QzIiBwb2ludHM9IjIyODcuNyw2NzYuNiAxNDMxLjIsMTgyIDIzODQuMyw3MzIuNCAJCSIvPgoJPC9nPgo8L2c+CjxnIGlkPSJMYXllcl8yXzAwMDAwMTAwMzc1NzM0MzA1NjE0NTYyODMwMDAwMDAzNjAxODgwMDUzNDU1MjY1OTMzXyI+CjwvZz4KPC9zdmc+Cg==)](https://github.com/rstudio/shiny)

##### Shiny for R

Brought to you by RStudio.

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Flexbox

Both [`card()`](https://rstudio.github.io/bslib/reference/card.md) and
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
default to `fillable = TRUE` (that is, they are CSS [flexbox
containers](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)),
which works wonders for facilitating [filling
outputs](#filling-outputs), but it also leads to surprising behavior
with inline tags (e.g.,
[`actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html),
[`span()`](https://rstudio.github.io/htmltools/reference/builder.html),
strings, etc). Specifically, each inline tag is placed on a new line,
but in a “normal” layout flow (`fillable = FALSE`), inline tags render
*inline*.

``` r

card(
  card_body(
    fillable = TRUE,
    "Here's some", tags$i("inline"), "text",
    actionButton("btn1", "A button")
  ),
  card_body(
    fillable = FALSE,
    "Here's some", tags$i("inline"), "text",
    actionButton("btn2", "A button")
  )
)
```

Here's some *inline* text

A button

Here's some *inline* text

A button

That said, sometimes working in a flexbox layout is quite useful, even
when working with inline tags. Here we leverage flexbox’s
[`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) property
to control the spacing between a plot, a (full-width) button, and
paragraph. Note that, by using
[`markdown()`](https://rdrr.io/pkg/shiny/man/markdown.html) for the
paragraph, it wraps the results in a `<p>` tag, which means the
*contents* of the paragraph are not longer subject to flexbox layout. If
we wanted, we could do something similar to render the
[`actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
inline by wrapping it in a
[`div()`](https://rstudio.github.io/htmltools/reference/builder.html).

``` r

card(
  height = 325, full_screen = TRUE,
  card_header("A plot with an action links"),
  card_body(
    class = "gap-2 container",
    plotly_widget,
    actionButton(
      "go_btn", "Action button",
      class = "btn-primary rounded-0"
    ),
    markdown("Here's a _simple_ [hyperlink](https://www.google.com/).")
  )
)
```

A plot with an action links

Action button

Here's a *simple* [hyperlink](https://www.google.com/).

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

In addition to gap, flexbox has really nice ways of handling otherwise
difficult spacing and alignment issues. And, thanks to Bootstrap’s [flex
utility classes](https://getbootstrap.com/docs/5.3/utilities/flex/), we
can easily opt-in and customize defaults.

``` r

card(
  height = 300, full_screen = TRUE,
  card_header(
    class = "d-flex justify-content-between",
    "Centered plot",
    checkboxInput("check", " Check me", TRUE)
  ),
  card_body(
    class = "align-items-center",
    plotOutput("id", width = "75%")
  )
)
```

Centered plot

Check me

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

## Shiny

Since this article is statically rendered, the examples here use
statically rendered content/widgets, but the same
[`card()`](https://rstudio.github.io/bslib/reference/card.md)
functionality works for dynamically rendered content via Shiny (e.g.,
[`plotOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html),
[`plotlyOutput()`](https://rdrr.io/pkg/plotly/man/plotly-shiny.html),
etc).

An additional benefit that comes with using shiny is the ability to use
[`getCurrentOutputInfo()`](https://rdrr.io/pkg/shiny/man/getCurrentOutputInfo.html)
to render new/different content when the output container becomes large
enough, which is particularly useful with `card(full_screen = T, ...)`.
For example, you may want additional captions/labels when a plot is
large, additional controls on a table, etc (see the [value
boxes](https://rstudio.github.io/bslib/articles/value-boxes) article for
a clever use of this).

``` r

# UI logic
ui <- page_fluid(
  card(
    max_height = 200,
    full_screen = TRUE,
    card_header("A dynamically rendered plot"),
    plotOutput("plot_id")
  )
)

# Server logic
server <- function(input, output, session) {
  output$plot_id <- renderPlot({
    info <- getCurrentOutputInfo()
    if (info$height() > 600) {
      # code for "large" plot
    } else {
      # code for "small" plot
    }
  })
}

shinyApp(ui, server)
```

## Appendix

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

[^1]: If you want to customize this behavior, you can provide a function
    to `wrapper` argument (or set it to `NULL` to avoid wrapping the non
    card items in a container).
