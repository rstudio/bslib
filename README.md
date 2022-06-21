
<!-- badges: start -->

[![CRAN
status](https://www.r-pkg.org/badges/version/bslib)](https://cran.r-project.org/package=bslib)
[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html)
[![R build
status](https://github.com/rstudio/bslib/actions/workflows/R-CMD-check.yaml/badge.svg)](https://github.com/rstudio/bslib/actions)

<!-- badges: end -->

# bslib

The `bslib` R package provides tools for customizing [Bootstrap
themes](https://getbootstrap.com/docs/4.6/getting-started/theming/)
directly from R, making it much easier to customize the appearance of
[Shiny](https://shiny.rstudio.com/) apps & [R
Markdown](https://rmarkdown.rstudio.com/) documents. `bslib`’s primary
goals are:

  - Make [custom
    theming](https://rstudio.github.io/bslib/articles/bslib.html#custom)
    as easy as possible.
      - Custom themes may even be created interactively in
        [real-time](https://rstudio.github.io/bslib/articles/bslib.html#real-time).
  - Also provide easy access to pre-packaged [Bootswatch
    themes](https://rstudio.github.io/bslib/articles/bslib.html#bootswatch).
  - Make [upgrading from Bootstrap 3 to 4 (and
    beyond)](https://rstudio.github.io/bslib/articles/bslib.html#versions)
    as seamless as possible.
      - Shiny and R Markdown default to Bootstrap 3 and will continue to
        do so to avoid breaking legacy code.
  - Serve as a general foundation for Shiny and R Markdown extension
    packages.
      - Extensions such as
        [`flexdashboard`](https://flexdashboard-pkg.netlify.app/articles/theme.html),
        [`pkgdown`](https://pkgdown.r-lib.org/dev/articles/customization.html),
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

`bslib` is designed for use with any Shiny or R Markdown project that
uses Bootstrap. In most cases, you can identify a project that uses
Bootstrap when the relevant page constructor has a `theme` parameter.
For example, most Shiny page layout functions (e.g.,
`shiny::navbarPage()`) and some popular R Markdown formats (e.g.,
`rmarkdown::html_document`) all have a `theme` parameter.

To use `bslib` in Shiny, provide a `bs_theme()` *object* to the `theme`
parameter; and in R Markdown, provide `bs_theme()` *parameters* to
`theme`. For example, here’s a way to upgrade Shiny (left) and R
Markdown (right) from Bootstrap 3 to 5:

<div class="usage">

``` r
library(shiny)
ui <- navbarPage(
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

</div>

See the [Get
Started](https://rstudio.github.io/bslib/articles/bslib.html) article to
learn more about Bootstrap versions, pre-packaged Bootswatch themes,
(real-time) custom theming, and more.

To get started more quickly, choose a relevant R Markdown template from
inside RStudio by going to File -\> New File -\> R Markdown -\> From
Template:

<img src="man/figures/rstudio-templates.png" width="60%" style="display: block; margin: auto;" />

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
