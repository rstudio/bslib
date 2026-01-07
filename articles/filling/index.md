# Filling layouts

This article covers the building blocks of filling layouts in `bslib`:
**fillable containers** and **fill items**. Filling layout is an
inherently nuanced topic, and fully groking takes some effort, but
you’ll gain a powerful way to get UI elements to fill the window, fill
inside [cards](https://rstudio.github.io/bslib/articles/cards), fill
inside [sidebar
layouts](https://rstudio.github.io/bslib/articles/sidebars), or
generally fill anywhere you want.

Since, in theory, essentially any UI element can be coerced into a
**fillable container** and/or **fill item**[^1], it’s useful to first
study their behavior in the abstract, which we do next in the [In
theory](#in-theory) section. After, the [In practice](#in-practice)
section reinforces those concepts and demonstrates their power with
practical examples.

Throughout these sections, be aware that most `bslib` components, as
well as many Shiny outputs (e.g.,
[`plotOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html),
[`plotlyOutput()`](https://rdrr.io/pkg/plotly/man/plotly-shiny.html),
etc) classify as fill items by default. This means they possess the
potential to grow/shrink to fit their container, but that potential is
only activated when their *immediate parent* is a fillable container
*with a defined height*. Also be aware that `bslib` components and many
Shiny outputs have `fill` and/or `fillable` arguments to opt out/in of
this behavior (and `bslib` also provides an API for testing/coercing
these properties on *any* UI element – see `is_fill()` for more).

## In theory

### Activating fill

Just like any other HTML **container**, a fillable container’s default
height depends on the height of its children. So, for example, if
there’s a single fill item with a defined height of `400px` (the default
for most Shiny outputs), the fillable container’s height is also `400px`
(plus any padding, border, etc).

Defining the height of a fillable container activates its immediate
children’s potential to fill. So, for example, if fillable container’s
height is set to `200px`, the fill child would shrink to about `200px`:

If multiple fill items were immediate children of this fillable
container, they’d keep shrinking (in this case, to about `100px` each):

Adding a non-fill item (e.g.,
[`htmltools::p()`](https://rstudio.github.io/htmltools/reference/builder.html)-aragraph
of text) won’t cause that particular item to grow/shrink, but the fill
items divvy up any remaining space (**careful:** if non-fill item(s) are
larger than the fillable container, the fill items won’t be visible!).
This is big reason why
[`card()`](https://rstudio.github.io/bslib/reference/card.md)s have a
`min_height` argument (to prevent fill items from shrinking too much).

### Resizable example

Notice the resizing handle on the lower-right hand corner of the
fillable container above. Use it to change the size of the fillable
container and compare the behavior between fill and non-fill items.

### Carrying fill

The previous section focuses on the fairly simple case of *one* parent
container. However, in practice, you’ll likely be working with multiple
levels of parents, which quickly complicates things, especially because:

1.  Fill items require their *immediate* parent to be a fillable
    container in order to fill.
2.  All “raw” HTML tags (e.g.,
    [`div()`](https://rstudio.github.io/htmltools/reference/builder.html),
    [`p()`](https://rstudio.github.io/htmltools/reference/builder.html),
    etc.) as well as many Shiny UI elements (e.g.,
    [`wellPanel()`](https://rdrr.io/pkg/shiny/man/wellPanel.html), etc.)
    are neither fillable nor fill (i.e., we’ll call these non-fill
    elements).

As a result, a common way in which (1) breaks down is that a non-fill
element, like a
[`div()`](https://rstudio.github.io/htmltools/reference/builder.html),
comes between fillable and fill. In fact, you’ll run into this exact
behavior when using
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) to insert
a dynamically rendered fill item into a fillable container (see [this
section](#ui-output) for a concrete example).

Assuming the goal is for the fill item to fit the fillable container,
it’s useful to coerce the non-fill element into both fill item *and* a
fillable container, which we call a fill carriers. Any UI element can be
coerced into a fill carrier with
[`as_fill_carrier()`](https://rstudio.github.io/bslib/reference/as_fill_carrier.md).

This concept of a fill carrier is especially useful and relevant for
[cards](https://rstudio.github.io/bslib/articles/cards). In most cases,
a card has numerous children like a header and a body, and the body
commonly contains fill item(s) (to ensure fill items). This is why
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
defaults to `fillable = TRUE` (and `fill = TRUE`).

You might wonder, why then would we want or need `fillable = FALSE` or
`fill = FALSE` on a
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)?
One big reason is that fillable containers are powered by [CSS
flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), which
changes the way its children are rendered. And, although those changes
are nice for “stretchy” children, there are [downsides for rendering
inline
elements](https://rstudio.github.io/bslib/articles/cards#flexbox). So,
that’s why, it’s recommended that you use [multiple card
bodies](https://rstudio.github.io/bslib/articles/cards#multiple-card_body)
when combining fill with non-fill

## In practice

This section puts into practice what we learned in [the
theory](#in-theory) of fillable containers and fill items.

### Setup code

The example in the sub-sections that follow assume you’ve ran the
following code. Here we’re using [plotly](https://plotly-r.com) to
create a list of fill items, but the same concepts extend to other
htmlwidgets (e.g., [leaflet](https://rstudio.github.io/leaflet/)) and
Shiny outputs like
[`plotOutput()`](https://rdrr.io/pkg/shiny/man/plotOutput.html).[^2]

``` r

library(plotly)
plots <- list(
  plot_ly(diamonds) |> add_histogram(x = ~price),
  plot_ly(diamonds) |> add_histogram(x = ~carat),
  plot_ly(diamonds) |> add_histogram(x = ~cut, color = ~clarity)
)
plots <- lapply(plots, function(x) {
  config(x, displayModeBar = FALSE) |>
    layout(margin = list(t = 0, b = 0, l = 0, r = 0))
})
```

### Filling the window

Perhaps the most important fillable container is
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md),
which sets its height equal to the browser window. Thus, if fill items
appear as direct children, they’ll fill the window.
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md)
also defaults to `fillable_mobile = FALSE`, which means the height isn’t
set equal to the viewport on mobile. As a result, fill items use their
own defined height (instead of the viewport size) on mobile, which is
often better behavior when showing multiple outputs.

``` r

page_fillable(
  h2("Diamond plots"),
  plots[[1]], plots[[2]], plots[[3]]
)
```

### Resizable example

Notice the resizing handle on the lower-right hand corner of the example
above. Use it to change the size of the “window” and see the behavior of
the filling plots

### Limiting shrinkage

If you’re worried about plots becoming too small, consider putting them
in a
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
with a `min_height` (like we do later on). Also, if you don’t want the
card border, you can do `card(class = "border-0", ...)`

### Multiple columns

Since
[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md)
is a fill item (by default), it grows/shrinks just like any other fill
item. It also defaults to `fillable = TRUE`, which in this case, means
each column gets wrapped in a fillable container. That’s why, in this
example, `plots[[1]]` and `plots[[1]]` also grow/shrink to match the
size of the
[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md)
container.

``` r

page_fillable(
  h2("Diamond plots"),
  layout_columns(plots[[1]], plots[[2]]),
  plots[[3]]
)
```

### Value boxes

Since
[`value_box()`](https://rstudio.github.io/bslib/reference/value_box.md)
is a fill item (by default), it grows/shrinks just like any other fill
item. This is especially useful for keeping a common baseline in a
multi-column layout. That said, the multi-layout column that holds value
boxes probably doesn’t want it default `fill = TRUE` behavior, since the
value boxes should be given more/less space and the window becomes
larger/smaller:

``` r

boxes <- layout_columns(
  fill = FALSE,
  value_box(
    "Total diamonds",
    scales::comma(nrow(diamonds)),
    showcase = bsicons::bs_icon("gem", size = NULL)
  ),
  value_box(
    "Average price",
    scales::dollar(mean(diamonds$price), accuracy = 1),
    showcase = bsicons::bs_icon("coin", size = NULL),
    theme_color = "success"
  ),
  value_box(
    "Average carat",
    scales::number(mean(diamonds$carat), accuracy = .1),
    showcase = bsicons::bs_icon("search", size = NULL),
    theme_color = "dark"
  )
)

page_fillable(
  boxes,
  layout_columns(plots[[1]], plots[[2]]),
  plots[[3]]
)
```

### Column wrapping layouts

To learn more about
[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md),
see [this
article](https://rstudio.github.io/bslib/articles/column-layout).

### Full-screen cards

As alluded to in the [Carrying fill](#carrying-fill) section,
[`card()`](https://rstudio.github.io/bslib/reference/card.md) and
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
are fill carriers (that is, they are both fillable and fill, by
default). Therefore, by wrapping each plot in a card, the card not only
grows/shrinks (since they are fill), but also retain the plot’s ability
to grow/shrink (since they are fillable).

``` r

plot_card <- function(header, ...) {
  card(
    full_screen = TRUE,
    card_header(header, class = "bg-dark"),
    card_body(..., min_height = 150)
  )
}

page_fillable(
  layout_columns(
    plot_card("Diamond price", plots[[1]]),
    plot_card("Diamond carat", plots[[2]])
  ),
  plot_card("Diamond cut by clarity", plots[[3]])
)
```

Note that, if we changed
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md)
to [`page_fluid()`](https://rstudio.github.io/bslib/reference/page.md)
(or
[`page_fixed()`](https://rstudio.github.io/bslib/reference/page.md)),
each plot would render to its default height (`400px`) since we no
longer have a fillable with a specified height. That said, even in that
case, if we expand the card to full-screen, the plot still grows to fit
the full screen card (since the
[`card()`](https://rstudio.github.io/bslib/reference/card.md) is then a
fillable container with a specified height, the
[`card_body()`](https://rstudio.github.io/bslib/reference/card_body.md)
is a fill carrier, and the plot is a fill item).

### Sidebar layouts

Similar to what we’ve seen with outputs and
[`card()`](https://rstudio.github.io/bslib/reference/card.md)s,
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
is also a fill item (by default), so placing it as a direct child of
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md)
makes it fit the window. Also, the main content’s container defaults to
a fillable container, so if that behavior is undesirable, set
`fillable = FALSE` in
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md).

``` r

page_fillable(
  padding = 0,
  layout_sidebar(
    border = FALSE,
    fillable = FALSE,
    sidebar = sidebar(
      title = "Diamond plots",
      "Input controls here..."
    ),
    layout_columns(
      plot_card("Diamond price", plots[[1]]),
      plot_card("Diamond carat", plots[[2]])
    ),
    plot_card("Diamond cut by clarity", plots[[3]])
  )
)
```

### Sidebar layouts

To learn more about
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md),
see [this article](https://rstudio.github.io/bslib/articles/sidebars).

## Other advice

### Dynamic UI

As alluded to in the [Carrying fill](#carrying-fill) section,
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) puts an
additional UI element around
[`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html)’s return
value. So, in order to carry the potential to fill down to a fill item
(e.g., [`plot_ly()`](https://rdrr.io/pkg/plotly/man/plot_ly.html)), mark
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) as a fill
carrier.

``` r

library(plotly)

ui <- page_fluid(
  card(
    full_screen = TRUE,
    max_height = 300,
    card_header("My plot"),
    uiOutput("plot", as_fill_carrier())
  )
)

server <- function(input, output) {
  output$plot <- renderUI({
    plot_ly(diamonds, x = ~price)
  })
}

shinyApp(ui, server)
```

### DT tables

[DT](https://github.com/rstudio/DT)’s
[`datatable()`](https://rdrr.io/pkg/DT/man/datatable.html) has its own
unique interface for filling a container. Specifically, make sure to set
`datatable(fillContainer = TRUE)` in order for the table to grow/shrink
as you’d expect it to.

``` r

library(DT)

ui <- page_fluid(
  card(
    full_screen = TRUE,
    max_height = 350,
    card_header("My table"),
    dataTableOutput("dt")
  )
)

server <- function(input, output) {
  output$dt <- renderDataTable({
    datatable(
      mtcars, fillContainer = TRUE
    )
  })
}

shinyApp(ui, server)
```

### Other htmlwidgets

Broadly speaking, most `htmlwidgets` like [plotly](https://plotly-r.com)
and [leaflet](https://rstudio.github.io/leaflet/) are fill items by
default, but that might not always be the case. Also, sometimes, you
might not want a particular widget to be treated as a fill item. In the
Shiny case, you should be able to control this through a `fill` argument
on the output container (e.g., `plotlyOutput("id", fill = FALSE)`), but
if no `fill` argument is available you can also use `bslib`’s
`as_fill()` API to opt in/out. In the non-Shiny case, you can control
`fill` through the widget’s
[`htmlwidgets::sizingPolicy()`](https://rdrr.io/pkg/htmlwidgets/man/sizingPolicy.html)
(e.g., `leaflet()$sizingPolicy$fill`).

### Avoid `fluidRow()`/`column()`

Modern versions of [Bootstrap
Grid](https://getbootstrap.com/docs/5.3/layout/grid/) currently use [CSS
Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) in
such a way that filling layout is mostly incompatible with
[`fluidRow()`](https://rdrr.io/pkg/shiny/man/fluidPage.html)/[`column()`](https://rdrr.io/pkg/shiny/man/column.html).
Instead, use
[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md)
to implement [multi-column filling
layouts](https://rstudio.github.io/bslib/articles/column-layout)

[^1]: Technically speaking, a **fillable container** is just a [CSS
    flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
    container with `flex-direction: column` (which makes its children
    flex items). And, when a **fill item** appears as a direct child of
    a **fillable container**, it is given a `flex` property of `1`
    (i.e., it’s allowed to grow/shrink).

[^2]: If these techniques don’t extend as advertised to your output(s)
    of choice, see the [other advice](#other-advice) section to help
    troubleshoot. If that doesn’t help, please [let us know about
    it](https://github.com/rstudio/bslib/issues/new/choose)!
