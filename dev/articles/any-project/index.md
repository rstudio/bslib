# Any project

In addition to providing components for [Shiny
dashboards](https://rstudio.github.io/bslib/dev/articles/dashboards),
`bslib` can also provide the Bootstrap dependency for any compatible R
project (e.g., Shiny, R Markdown, crosstalk, etc). When doing so, you
not only upgrade the Bootstrap version, but also gain access to
`bslib`’s UI components and theming capabilites. In this article, we’ll
cover how to do this for a handful of important uses cases.

## Shiny

`bslib` provides a handful of `page_*()` functions that can be used as
drop-in replacements for `shiny::*Page()`. The first and most important
difference is that `page_*()` provides the latest version of Bootstrap
(by default). For example:

``` r

library(shiny)

# Same as fluidPage(), but with latest Bootstrap
ui <- page_fluid(
  h2("Hello world")
)

shinyApp(ui, function(...) {})
```

In addition, some of `bslib`’s `page_*()` functions provide other new
capabilities. Most importantly, as we cover in [Shiny
dashboards](https://rstudio.github.io/bslib/dev/articles/dashboards),
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
and
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
provide deep integration with sidebar layouts, filling layouts, navbar
customizations, theming, and more.

Another new and important `page_*()` function is
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md).
This function provides a new approach to filling layouts and forms a
foundation for higher-level abstractions such as
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
and
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md).
See [filling
layouts](https://rstudio.github.io/bslib/dev/articles/filling)
(especially the [In
Practice](https://rstudio.github.io/bslib/dev/articles/filling#in-practice)
section) to learn more about
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md).

## Without Shiny

The same `page_*()` functions that offer a means for getting started
with Shiny can also be used to create static HTML pages (i.e., an HTML
file with no server-side code). Probably the most intriguing use case
for this is [crosstalk](https://rstudio.github.io/crosstalk/) (i.e.,
[htmlwidgets](https://github.com/ramnathv/htmlwidgets) that can be
linked together). For example:

``` r

library(crosstalk)
library(leaflet)

# Use crosstalk to create a client-side filter between the map and slider
quake_dat <- SharedData$new(quakes)
map_filter <- filter_slider("mag", "Magnitude", quake_dat, ~mag)
map_quakes <- leaflet(quake_dat) |> addTiles() |> addCircleMarkers()

page_sidebar(
  title = "Client-side filtering",
  sidebar = map_filter,
  # Can also put other bslib components here
  # like cards, value boxes, etc.
  map_quakes
)
```

And since the result is static HTML, you can save it to an HTML file and
share it with others through email, Slack, etc.:

``` r

htmltools::save_html(.Last.value, "index.html")
```

Also, to be clear, static HTML can also be useful without crosstalk. For
example, we can use
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
to layout numerous htmlwidgets:

``` r

plot_card <- card(
  full_screen = TRUE,
  card_header("Plot"),
  plotly::plot_ly()
)

page_fillable(
  layout_columns(plot_card, plot_card),
  plot_card
)
```

## R Markdown

Use the `theme` parameter of a compatible output format[^1] to get
started in R Markdown. By supplying `bslib: true` to that parameter,
you’ll get the latest “stock” version of Bootstrap (akin to using
`page_*()` in Shiny). Alternatively, you can supply
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
parameters to the `theme` parameter to specify the Bootstrap version,
add a Bootswatch theme, and customize theming colors ([Getting Started
with Theming](https://rstudio.github.io/bslib/dev/articles/theming)
covers this in more depth).

``` r
---
output:
  html_document:
    theme:
      bslib: true
---
```

``` r
---
output:
  html_document:
    theme:
      version: 5
      bootswatch: minty
      primary: "#6CC3D4"
---
```

`bslib` also provides some R Markdown templates that can be accessed
from RStudio by going to File -\> New File -\> R Markdown -\> From
Template:

\<img src=“rstudio-templates.png” class=“r-plt” alt=“RStudio”New
Template” dialog showing three theming-related templates from bslib.”
width=“582” style=“display: block; margin: auto;” /\>

In addition to
[`rmarkdown::html_document`](https://pkgs.rstudio.com/rmarkdown/reference/html_document.html),
there are at least a few other R Markdown projects that are compatible
with `bslib`. In most of these cases, you can get started with these
projects in a pretty similar fashion to
[`rmarkdown::html_document`](https://pkgs.rstudio.com/rmarkdown/reference/html_document.html).
See the following articles to learn more:
[flexdashboard](https://flexdashboard-pkg.netlify.app/articles/theme.html),
[pkgdown](https://pkgdown.r-lib.org/articles/customise.html), and
[bookdown](https://pkgs.rstudio.com/bookdown/reference/bs4_book.html).

## In production

Before deploying any [bslib](https://rstudio.github.io/bslib/) project
to production, it’s wise to “hard-code” the version of Bootstrap used
when it was developed. This reduces the chance of the project breaking
if and when [bslib](https://rstudio.github.io/bslib/) updates its
Bootstrap dependency. To do so, call
[`version_default()`](https://rstudio.github.io/bslib/dev/reference/versions.md)
to get the current version of Bootstrap, then pass that value to
relevant `theme` object.

``` r

library(shiny)

ui <- page_fluid(
  theme = bs_theme(version = 5),
  ...
)

shinyApp(ui, function(...) {})
```

``` r
---
output:
  html_document:
    theme:
      version: 5
---
```

[^1]: In theory, any format that passes its `theme` parameter to
    [`rmarkdown::html_document_base()`](https://pkgs.rstudio.com/rmarkdown/reference/html_document_base.html)
    is compatible with `bslib`. However, in practice, the format may not
    be compatible with modern versions of Bootstrap.
