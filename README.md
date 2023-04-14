
<!-- badges: start -->

[![CRAN
status](https://www.r-pkg.org/badges/version/bslib)](https://cran.r-project.org/package=bslib)
[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html)
[![R build
status](https://github.com/rstudio/bslib/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/rstudio/bslib/actions)

<!-- badges: end -->

# bslib

The `bslib` R package provides a modern UI toolkit for
[Shiny](https://shiny.rstudio.com/) and [R
Markdown](https://rmarkdown.rstudio.com/) based on
[Bootstrap](https://getbootstrap.com/). `bslib`’s primary goals are:

  - Provide modern UI components, such as
    [cards](https://rstudio.github.io/bslib/articles/cards.html),
    [sidebars](https://rstudio.github.io/bslib/articles/sidebars.html),
    [value
    boxes](https://rstudio.github.io/bslib/articles/value-boxes.html),
    [layouts](https://rstudio.github.io/bslib/articles/column-layout.html),
    and more.
  - Make [custom
    theming](https://rstudio.github.io/bslib/articles/bslib.html#custom)
    as easy as possible.
      - Custom themes may even be created interactively in
        [real-time](https://rstudio.github.io/bslib/articles/bslib.html#real-time).
  - Also provide easy access to pre-packaged [Bootswatch
    themes](https://rstudio.github.io/bslib/articles/bslib.html#bootswatch).
  - Make it seamless to use any version of
    [Bootstrap](https://rstudio.github.io/bslib/articles/bslib.html#versions).
      - Shiny and R Markdown currently default to Bootstrap 3 and may
        continue to do so to avoid breaking legacy code.
  - Serve as a general foundation for Shiny and R Markdown extension
    packages.
      - Extensions such as
        [`flexdashboard`](https://flexdashboard-pkg.netlify.app/articles/theme.html),
        [`pkgdown`](https://pkgdown.r-lib.org/dev/articles/customise.html),
        and
        [`bookdown`](https://pkgs.rstudio.com/bookdown/reference/bs4_book.html)
        already fully support [`bslib`’s custom theming
        capabilities](https://rstudio.github.io/bslib/articles/bslib.html#custom).

## Installation

Install the stable release of `bslib` on CRAN:

``` r
install.packages("bslib")
```

Usage with Shiny requires version 1.6 or higher:

``` r
install.packages("shiny")
```

Usage with R Markdown requires version 2.7 or higher:

``` r
install.packages("rmarkdown")
```

## Basic usage

### Shiny

To get started using `bslib` in Shiny, use one of its `page_*()`
functions. These drop-in replacements for `shiny::*Page()` updates the
page to use the latest supported version Bootstrap.

``` r
ui <- page_fluid(
  h2("Hello world")
)
shinyApp(ui, function(...) {})
```

In production, it’s recommended to pin the version of Bootstrap
(currently 5) via `bs_theme()`. As you’ll learn in [getting
started](https://rstudio.github.io/bslib/articles/bslib.html),
`bs_theme()` also makes it easy to theme the app by customizing (and/or
adding to) Bootstrap CSS.

``` r
library(shiny)
ui <- page_fixed(
  theme = bs_theme(version = 5),
  h2("Hello world")
)
shinyApp(ui, function(...) {})
```

### R Markdown

To get started using `bslib` in R Markdown (and compatible extensions
like
[`flexdashboard`](https://flexdashboard-pkg.netlify.app/articles/theme.html)),
provide `bs_theme()` parameters to the `theme` parameter of the output
format. For example, here’s how to use “stock” Bootstrap 5 with
`rmarkdown::html_document`:

``` r
---
output:
  html_document:
    theme:
      version: 5
---
```

`bslib` also provides some R Markdown templates that can be accessed
from RStudio by going to File -\> New File -\> R Markdown -\> From
Template:

<img src="man/figures/rstudio-templates.png" width="60%" style="display: block; margin: auto;" />

### pkgdown

`{pkgdown}` has its way of using `bslib`, see
<https://pkgdown.r-lib.org/articles/customise.html>

## Getting help

There are two main places to get help with `bslib`:

  - The [RStudio community](https://community.rstudio.com) is a friendly
    place to ask any questions (be sure to add a `bslib` tag when
    creating a topic).

  - [Stack Overflow](https://stackoverflow.com/questions/tagged/bslib)
    is a great source of answers to common `bslib` questions. It is also
    a great place to get help, once you have created a reproducible
    example that illustrates your problem. Use the tags
    [`[r][bslib]`](https://stackoverflow.com/questions/tagged/bslib+r)
    if you ask a question. Add the tag `[bslib]` if you are using a
    Shiny runtime.

## Code of Conduct

Please note that the bslib project is released with a [Contributor Code
of
Conduct](https://github.com/rstudio/bslib/blob/main/CODE_OF_CONDUCT.md).
By contributing to this project, you agree to abide by its terms.
