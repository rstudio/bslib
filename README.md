
# bootstraplib

Tools for obtaining and customizing bootstrap CSS via SASS.

## Installation

**bootstraplib** isn’t yet available from CRAN, but you can install
with:

``` r
remotes::install_github("rstudio/bootstraplib")
```

## Overview

The **bootstraplib** package is mainly intended to be an R developer
package. That is, most R users won’t be using it directly, but **shiny**
and **rmarkdown** will eventually use this package to compile Bootstrap
3 and 4 via **sass**, and thus provides users a way to [customize
Bootstrap styling via
SASS](https://getbootstrap.com/docs/4.4/getting-started/theming/). In
the future, there will be more official ways to use Bootstrap 4 in
**shiny** and **rmarkdown**, but if you want to try migrating your
**shiny** app today, you can add `bootstraplib::bs_sass()` to your user
interface object:

``` r
library(shiny)

# customize the primary Bootstrap color
theme_variables(primary = "salmon")

ui <- fluidPage(
  bootstraplib::bs_sass(),
  actionButton("btn", "A Bootstrap 4 button!")
)

shinyApp(ui, function(input, output) {})
```

(If you’re looking to use Bootstrap 4 in **rmarkdown**, there is a
work-in-progress
[here](https://github.com/rstudio/rmarkdown/pull/1706)).

Under the hood, the `bootstraplib::bs_sass()` function uses the **sass**
package to compile [Bootstrap’s
SASS](https://getbootstrap.com/docs/4.0/getting-started/theming/) to
CSS. This gives developers and users the opportunity to produce
customized Bootstrap CSS via [Bootstrap’s SASS
variables](https://github.com/rstudio/bootstraplib/blob/master/inst/node_modules/bootstrap/scss/_variables.scss)
(via `bootstraplib::theme_variables()`) and/or other aribitrary SCSS
files (via `bootstraplib::theme_layer()` objects). For examples, see the
example section of the following help page: `help(bs_sass, package =
"bootstraplib")`.

## Development

To upgrade or install the HTML dependencies that ship with this package,
use the `tools/yarn_install.R` script:

``` shell
Rscript tools/yarn_install.R
```

Bootswatch themes import google font urls by default. There is a script
to download all these fonts and ship them with the package…this script
be run after the `yarn_install.R` script

``` shell
Rscript tools/fonts.R
```
