# Sidebars

Sidebar layouts in web interfaces allow your users to easily access
filters, settings and other inputs alongside the interactive features
they control. In the [Getting Started with
dashboards](https://rstudio.github.io/bslib/dev/articles/dashboards)
article, we covered “page-level” sidebar layouts via the
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
and
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
functions. In this article, we’ll explore the full range of sidebar
layouts available in bslib.

## Overview

There are three main types of sidebar layouts: floating, filling, and
multi-page/tab.

### Floating layout

Use
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
to create a sidebar layout that can go anywhere on any page. This layout
approach is great for visually grouping together semantically related
inputs and output(s). It can also be paired with a
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) to
leverage `full_screen` expansion, add a header/footer, and more.

Show code

``` r
layout_sidebar(
  sidebar = sidebar("Sidebar"),
  "Main contents"
)
```

[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)

Main contents

Sidebar

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

A sidebar layout.

Show code

``` r
card(
  full_screen = TRUE,
  card_header("Title"),
  layout_sidebar(
    sidebar = sidebar("Sidebar"),
    "Main contents"
  )
)
```

`layout_sidebar() in card()`

Title

Main contents

Sidebar

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)

A sidebar layout within a card.

### Filling layout

In the [Getting Started with
dashboards](https://rstudio.github.io/bslib/dev/articles/dashboards)
article, we saw how
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
yields a sidebar layout that fills the page. Underneath the hood,
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
is just a simple wrapper around
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
and
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md).
Understanding this unlocks the potential to have (any number of) sidebar
layouts within a filling layout.

Show code

``` r
page_fillable(
  layout_sidebar(
    sidebar = sidebar("Sidebar area"),
    "Main area"
  )
)
```

`layout_sidebar() in page_fillable()`

Main contents

Sidebar

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

A sidebar that fills the page.

### Multi-page layout

For a multi-page (or multi-tab) layout, use the `sidebar` argument of
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
(or
[`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)).
In this case, we get a sidebar that not only fills the page, but that
*same sidebar remains visible on every page/tab*. Later on, we’ll
explore how to put [multiple, varied, layouts on different
pages](#multi-page-example); but also keep in mind, if it is actually
desirable to have the *same sidebar* on every page, it often helps to
[hide/show sidebar contents on certain pages](#conditional-contents) via
[`conditionalPanel()`](https://rdrr.io/pkg/shiny/man/conditionalPanel.html).

Show code

``` r
page_navbar(
  sidebar = sidebar("Sidebar"),
  nav_panel("Page 1", "Page 1 content"),
  nav_panel("Page 2", "Page 2 content")
)
```

[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)

- [Page 1](#tab-5828-1)
- [Page 2](#tab-5828-2)

Page 1 content

Page 2 content

Shared sidebar

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

A sidebar shared across multiple pages.

Show code

``` r
navset_card_tab(
  sidebar = sidebar("Sidebar"),
  nav_panel("Tab 1", "Tab 1 content"),
  nav_panel("Tab 2", "Tab 2 content")
)
```

[`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)

Tab Card

- [Tab 1](#tab-8585-1)
- [Tab 2](#tab-8585-2)

Tab 1 content

Tab 2 content

Shared sidebar

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

A sidebar shared across multiple tabs.

## A real example

Now that we’ve enumerated bslib’s sidebar layout options, lets use some
real data[¹](#fn1) to create some real inputs and outputs, and explore
some additional features of sidebar layouts.

In a Shiny app[²](#fn2), you’ll probably want to use inputs like
[`selectInput()`](https://rdrr.io/pkg/shiny/man/selectInput.html),
[`sliderInput()`](https://rdrr.io/pkg/shiny/man/sliderInput.html), etc.,
in the sidebar, but because you’re reading this article in a static
website, we’ll use [crosstalk](https://rstudio.github.io/crosstalk/)
input widgets.

### Setup code

Throughout this section, we’ll make repeated use of the following
widgets from [plotly](https://plotly-r.com) and
[leaflet](https://rstudio.github.io/leaflet/). The details on how these
widgets work alongside [crosstalk](https://rstudio.github.io/crosstalk/)
to create linked views isn’t important for understanding sidebar
layouts, but do keep in mind this will give us a list of `filters` and
`plots` (views of the `diamonds` dataset), as well as `map_filter` and
`map_quakes` (views of the `quakes` dataset).

Show code

``` r
library(bslib)
library(shiny)
library(crosstalk)
library(plotly)
library(leaflet)

# Creates the "filter link" between the controls and plots
dat <- SharedData$new(dplyr::slice_sample(diamonds, n = 1000))

# Sidebar elements (e.g., filter controls)
filters <- list(
  filter_select("cut", "Cut", dat, ~cut),
  filter_select("color", "Color", dat, ~color),
  filter_select("clarity", "Clarity", dat, ~clarity)
)

# plotly visuals
plots <- list(
  plot_ly(dat) |> add_histogram(x = ~price),
  plot_ly(dat) |> add_histogram(x = ~carat),
  plot_ly(dat) |> add_histogram(x = ~cut, color = ~clarity)
)
plots <- lapply(plots, \(x) config(x, displayModeBar = FALSE))

# map filter and visual
quake_dat <- SharedData$new(quakes)
map_filter <- filter_slider("mag", "Magnitude", quake_dat, ~mag)
map_quakes <- leaflet(quake_dat) |>
  addTiles() |>
  addCircleMarkers()
```

### Hello `layout_sidebar()`

[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
behaves a lot like a
[card](https://rstudio.github.io/bslib/dev/articles/cards). For example,
when used inside
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
they’ll also grow/shrink to fit the page (because they default to
`fill = TRUE`). They also default to `fillable = TRUE` which allows fill
items in the main content area (e.g., `plots[[1]]`) to also grow/shrink
to fit their container. They also behave a lot like a
[`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
in that they can be put directly inside a
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) (which
is useful for adding a header/footer, `full_screen = TRUE`, etc.).

``` r
sidebar_diamonds <- layout_sidebar(
  sidebar = filters[[1]],
  plots[[1]]
)

sidebar_quakes <- layout_sidebar(
  sidebar = map_filter,
  map_quakes
)

page_fillable(
  sidebar_diamonds,
  card(
    card_header("Earthquakes"),
    sidebar_quakes
  )
)
```

### Resizable example

The example above is resizable. Try using the handle in the lower-right
corner to change the “window” size and notice how the plot grow/shrink
to fit the window (because of `fillable = TRUE`).

### Filling layouts

To learn more about how fillable containers and fill items work, see the
article on [filling
layouts](https://rstudio.github.io/bslib/dev/articles/filling).

### Multi-page varied layout

As we covered in [Getting Started with
dashboards](https://rstudio.github.io/bslib/dev/articles/dashboards),
the `sidebar` argument of
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
puts a sidebar *on each page* that fills the window. However, sometimes
it’s better that only particular pages have such a sidebar layout. To
acheive this, just provide a
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
as a “root” element of a `fillable` page.

For example, let’s put a “page-level” sidebar on a page dedicated to
Earthquakes, and then put multiple sidebar layouts on a page dedicated
to Diamonds (one for each plot). In this case, we’ve only allowed the
Earthquakes page to be `fillable` since there are multiple plots on the
Diamonds page (you could also keep the Diamonds page `fillable` an put a
`min_height` on the cards to prevent them from shrinking too much).

``` r
page_navbar(
  title = "Sidebar demo",
  fillable = "Earthquakes",
  nav_panel("Earthquakes", sidebar_quakes),
  nav_panel(
    "Diamonds",
    Map(
      function(filter, plot) {
        card(
          full_screen = TRUE,
          layout_sidebar(sidebar = filter, plot)
        )
      },
      filters, plots
    )
  )
)
```

### Multiple tabs

Just like
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md),
[`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
also has a `sidebar` argument that puts *the same sidebar* on each tab.
The same approach (i.e., putting a
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
within each
[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md))
can be used to put different sidebars on different tabs.

### Restricting growth

Just like with
[cards](https://rstudio.github.io/bslib/dev/articles/cards#restricting-growth),
when a [filling layout](#hello-sidebar) isn’t enforcing the size of the
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
it will allow its contents to decide how big it should be. Thus, if
there a large amount of sidebar/main contents, consider specifying a
`height` or `max_height` via
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) (as
well as `full_screen = TRUE` to reduce the need for scrolling).

``` r
page_fixed(
  h1("Sidebar demo", class = "lead mt-3"),
  card(
    height = 400,
    full_screen = TRUE,
    layout_sidebar(sidebar = filters, plots)
  ),
  card(
    full_screen = TRUE,
    layout_sidebar(sidebar = map_filter, map_quakes)
  )
)
```

## Shiny

Although sidebars work just fine outside Shiny, using them in Shiny
provides a few additional useful features.

### Conditional contents

Sometimes in a multiple page/tab setting, it’s useful to have a sidebar
on every page/tab, but changes its contents based on which page/tab is
active.[³](#fn3) Thanks to
[`conditionalPanel()`](https://rdrr.io/pkg/shiny/man/conditionalPanel.html),
this can be done fairly easily in a Shiny app with
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
(or in
[`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)/`navset_tab_pill()`).
The trick is to provide an `id` to the
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
and then reference that `id` in the
[`conditionalPanel()`](https://rdrr.io/pkg/shiny/man/conditionalPanel.html):

``` r
shinyApp(
  page_navbar(
    title = "Conditional sidebar",
    id = "nav",
    sidebar = sidebar(
      conditionalPanel(
        "input.nav === 'Page 1'",
        "Page 1 sidebar"
      ),
      conditionalPanel(
        "input.nav === 'Page 2'",
        "Page 2 sidebar"
      )
    ),
    nav_panel("Page 1", "Page 1 contents"),
    nav_panel("Page 2", "Page 2 contents")
  ),
  server = function(...) {
    # no server logic required
  }
)
```

### Reactive updates

To programmatically update (and/or re-actively read) the open/closed
state of a
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
provide an `id` and reference that `id` in your server code. Here we
reference use the `id` to programmatically open the sidebar on the 2nd
page.

``` r
library(shiny)

ui <- page_navbar(
  title = "Sidebar updates",
  id = "nav",
  sidebar = sidebar(
    id = "sidebar",
    open = FALSE,
    "Sidebar"
  ),
  nav_panel("Page 1", "Sidebar closed. Go to Page 2 to open."),
  nav_panel("Page 2", "Sidebar open. Go to Page 1 to close.")
)

server <- function(input, output) {
  observe({
    sidebar_toggle(
      id = "sidebar",
      open = input$nav == "Page 2"
    )
  })
}

shinyApp(ui, server)
```

## Accordions

All sidebars have special treatment for accordions. When an
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
appears directly within a
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
(as an immediate child of the sidebar), the accordion panels will render
flush to the sidebar, providing a convenient way to group multiple
related input controls under a collapsible section.

### Setup code

This example depends on objects from the [setup code
section](#setup-code).

``` r
accordion_filters <- accordion(
  accordion_panel(
    "Dropdowns", icon = bsicons::bs_icon("menu-app"),
    !!!filters
  ),
  accordion_panel(
    "Numerical", icon = bsicons::bs_icon("sliders"),
    filter_slider("depth", "Depth", dat, ~depth),
    filter_slider("table", "Table", dat, ~table)
  )
)

card(
  card_header("Groups of diamond filters"),
  layout_sidebar(
    sidebar = accordion_filters,
    plots[[1]]
  )
)
```

Groups of diamond filters

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLW1lbnUtYXBwICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTAgMS41QTEuNSAxLjUgMCAwIDEgMS41IDBoMkExLjUgMS41IDAgMCAxIDUgMS41djJBMS41IDEuNSAwIDAgMSAzLjUgNWgtMkExLjUgMS41IDAgMCAxIDAgMy41di0yek0xLjUgMWEuNS41IDAgMCAwLS41LjV2MmEuNS41IDAgMCAwIC41LjVoMmEuNS41IDAgMCAwIC41LS41di0yYS41LjUgMCAwIDAtLjUtLjVoLTJ6TTAgOGEyIDIgMCAwIDEgMi0yaDEyYTIgMiAwIDAgMSAyIDJ2NWEyIDIgMCAwIDEtMiAySDJhMiAyIDAgMCAxLTItMlY4em0xIDN2MmExIDEgMCAwIDAgMSAxaDEyYTEgMSAwIDAgMCAxLTF2LTJIMXptMTQtMVY4YTEgMSAwIDAgMC0xLTFIMmExIDEgMCAwIDAtMSAxdjJoMTR6TTIgOC41YS41LjUgMCAwIDEgLjUtLjVoOWEuNS41IDAgMCAxIDAgMWgtOWEuNS41IDAgMCAxLS41LS41em0wIDRhLjUuNSAwIDAgMSAuNS0uNWg2YS41LjUgMCAwIDEgMCAxaC02YS41LjUgMCAwIDEtLjUtLjV6IiAvPjwvc3ZnPg==)

Dropdowns

Cut

Color

Clarity

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLXNsaWRlcnMgIiBzdHlsZT0iaGVpZ2h0OjFlbTt3aWR0aDoxZW07ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS41IDJhMS41IDEuNSAwIDEgMCAwIDMgMS41IDEuNSAwIDAgMCAwLTN6TTkuMDUgM2EyLjUgMi41IDAgMCAxIDQuOSAwSDE2djFoLTIuMDVhMi41IDIuNSAwIDAgMS00LjkgMEgwVjNoOS4wNXpNNC41IDdhMS41IDEuNSAwIDEgMCAwIDMgMS41IDEuNSAwIDAgMCAwLTN6TTIuMDUgOGEyLjUgMi41IDAgMCAxIDQuOSAwSDE2djFINi45NWEyLjUgMi41IDAgMCAxLTQuOSAwSDBWOGgyLjA1em05LjQ1IDRhMS41IDEuNSAwIDEgMCAwIDMgMS41IDEuNSAwIDAgMCAwLTN6bS0yLjQ1IDFhMi41IDIuNSAwIDAgMSA0LjkgMEgxNnYxaC0yLjA1YTIuNSAyLjUgMCAwIDEtNC45IDBIMHYtMWg5LjA1eiIgLz48L3N2Zz4=)

Numerical

Depth

Table

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

## Nested sidebars

It’s possible to nest sidebar layouts, which means you can effectively
have any number of left and/or right sidebars in a given layout. When
doing this, you’ll want the main content area of every
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
that contains a
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
to be fillable and have zero padding (`class = "p-0"`).

``` r
page_fillable(
  h1("Left and right sidebar", class = "px-3 my-3"),
  layout_sidebar(
    sidebar = sidebar("Left sidebar"),
    layout_sidebar(
        sidebar = sidebar("Right sidebar", position = "right", open = FALSE),
        "Main contents",
        border = FALSE
    ),
    border_radius = FALSE,
    fillable = TRUE,
    class = "p-0"
  )
)
```

## Styling and customization

In the above sections we’ve focused primarily on the variety of
interface layouts where sidebars can be used. Along the way, we’ve
touched on a few of the named arguments of
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
and
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
that are helpful for customizing the styling and behavior of both the
sidebar and main content areas. However, there are a handful of other
arguments to further customize the look and feel if the sidebar layout.

Both
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
and
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
allow for a specific background color (via `bg`), which is applied to
the sidebar area and main content area respectively. When `bg` is
provided, bslib automatically provides a high-contrast foreground color
to ensure readability (but a `fg` color may also be provided). Both
functions also include a `class` argument that works well with
[Bootstrap utility
`class`es](https://getbootstrap.com/docs/5.3/utilities/spacing/) and a
`style` argument for inline styles.

Be aware that in
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
`bg`, `class` and `style` attributes are applied to the main content
area’s container and *not* the overall layout container. To add
additional classes to the layout container, use
[`htmltools::tagAppendAttributes()`](https://rstudio.github.io/htmltools/reference/tagAppendAttributes.html).
Also note that
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
derives some of its default style from Bootstrap CSS variables (e.g.,
`--bs-card-border-color`), which enables theming at the component-level
([theming via
`bs_theme()`](https://rstudio.github.io/bslib/dev/articles/bs5-variables)
works on the page-level).

The following example combines all of these concepts to create sidebar
with a dark background. Utility classes are used to make the sidebar
text monospace and bold, and we used
[`tagAppendAttributes()`](https://rstudio.github.io/htmltools/reference/tagAppendAttributes.html)
to tweak the border color of the sidebar layout to match the sidebar
background.

``` r
library(htmltools)
library(leaflet)

squake <- SharedData$new(quakes)

container <- layout_sidebar(
  class = "p-0",
  sidebar = sidebar(
    title = "Earthquakes off Fiji",
    bg = "#1E1E1E",
    width = "35%",
    class = "fw-bold font-monospace",
    filter_slider("mag", "Magnitude", squake, ~mag)
  ),
  leaflet(squake) |> addTiles() |> addCircleMarkers()
)

tagAppendAttributes(container, style = css("--bs-card-border-color" = "#1E1E1E"))
```

Earthquakes off Fiji

Magnitude

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWNoZXZyb24tbGVmdCBjb2xsYXBzZS1pY29uIiBzdHlsZT0iaGVpZ2h0Ojt3aWR0aDo7ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweiIgLz48L3N2Zz4=)

------------------------------------------------------------------------

1.  Our “real data” is just a 1,000 rows randomly sampled from
    [ggplot2](https://ggplot2.tidyverse.org)’s `diamonds` data as well
    as [leaflet](https://rstudio.github.io/leaflet/)’s `quakes`.

2.  In a Shiny app, we also recommend you add an `id` to the
    [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
    so that you can reactively read/update whether the sidebar is
    open/closed.

3.  If the controls depend on some other application state, you’ll need
    to use [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html)
    to fill the contents of a
    [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)).
