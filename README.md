
# bootsass

Tools for obtaining and customizing bootstrap CSS via SASS.

## Installation

bootsass isn’t yet available from CRAN, but you can install with:

``` r
remotes::install_github("rstudio/bootsass")
```

## Overview

The **bootsass** package is mainly intended to be an R developer
package. That is, most R users won’t be using it directly, but **shiny**
and **rmarkdown** will eventually use this package to provide (and
customize) Bootstrap 4 CSS. In the future, there will be more official
ways to use Bootstrap 4 in **shiny** and **rmarkdown**, but if you want
to try migrating your **shiny** app today, you can add
`bootsass::bs4_sass()` to your user interface object:

``` r
library(shiny)

ui <- fluidPage(
  bootsass::bs4_sass(),
  actionButton("btn", "A Boostrap 4 button!")
)

shinyApp(ui, function(input, output) {})
```

(If you’re looking to use Bootstrap 4 in **rmarkdown**, there is a
work-in-progress
[here](https://github.com/rstudio/rmarkdown/pull/1706)).

Under the hood, the `bootsass::bs4_sass()` function uses the **sass**
package to compile [Bootstrap’s
SASS](https://getbootstrap.com/docs/4.0/getting-started/theming/) to
CSS. This gives developers and users the opportunity to produce
customized Bootstrap CSS via [Bootstrap’s SASS
variables](https://github.com/rstudio/bootsass/blob/master/inst/node_modules/bootstrap/scss/_variables.scss)
(via `bootsass::theme_variables()`) and/or other aribitrary SCSS files
(via `bootsass::bs4_theme()` objects). For examples, see the example
section of the following help page: `help(bs4_sass, package =
"bootsass")`.

## Development

Bootswatch themes import google font urls by default. There is a script
to download all these fonts and ship them with the package

``` shell
Rscript tools/bootswatch_fonts.R
```

Each bootswatch theme also ships with full
bootstrap.css/bootstrap.min.css. So to keep the size of the package
down, we do:

``` shell
Rscript tools/bootswatch_downsize.R
```
