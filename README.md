
<!-- badges: start -->

[![CRAN
status](https://www.r-pkg.org/badges/version/bslib)](https://cran.r-project.org/package=bslib)
[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![R build
status](https://github.com/rstudio/bslib/workflows/R-CMD-check/badge.svg)](https://github.com/rstudio/bslib/actions)

<!-- badges: end -->

# bslib (formerly known as bootstraplib)

The `{bslib}` R package provides tools for creating custom [Bootstrap
themes](https://getbootstrap.com/docs/4.4/getting-started/theming/),
making it easier to style Shiny apps & R Markdown documents directly
from R without writing unruly CSS and HTML. At the moment, `{bslib}`
provides special builds of Bootstrap 4 & 3 that “just work” with Shiny &
R Markdown.

## Installation

`{bslib}` isn’t yet available from CRAN, but you can install with:

``` r
remotes::install_github("rstudio/bslib")
```

## Getting Started

### Create a theme

Use `bs_theme()` to create a `{bslib}` theme, where you can:

  - Choose a (major) Bootstrap version (e.g., `version = 4` or `version
    = 3`).

  - If `version` isn’t specified (as in the example below), then
    `version` defaults to `version_default()`, which may change to
    Bootstrap 5 in a future version of `{bslib}`.

  - Choose a [Bootswatch](https://bootswatch.com/) theme (e.g.,
    `bootswatch = 'darkly'`).

  - Customize the main colors and fonts (e.g., `bg`, `fg`, `primary`,
    `base_font`, etc)

  - These main controls are available via named arguments to
    `bs_theme()` (and `bs_theme_update()`) and are guaranteed to work
    across Bootstrap versions.

  - More generally, customize most of Bootstrap’s styling via Sass
    variables (e.g.,
    [`font-size-base`](https://github.com/rstudio/bslib/blob/c353705/inst/lib/bootstrap/scss/_variables.scss#L282)).

  - These more specific controls pass through the `...` of `bs_theme()`.

  - These options likely depend on the Bootstrap version being used

For example, to implement a [material design inspired dark
mode](https://material.io/design/color/dark-theme.html):

``` r
library(bslib)
my_theme <- bs_theme(
  bg = "#202123", fg = "#B8BCC2", primary = "#EA80FC", 
  base_font = font_google("Grandstander"),
  "font-size-base" = "1.1rem"
)
```

### Shiny usage

> Note: this usage requires the development version of Shiny
> `remotes::install_github("rstudio/shiny")`.

To use `my_theme` inside of Shiny, pass it to the relevant `theme`
parameter in page functions such as `shiny::navbarPage()`,
`shiny::fluidPage()`, `shiny::bootstrapPage()`, etc.

``` r
library(shiny)
ui <- navbarPage(
  theme = my_theme,
  ...
)
shinyApp(ui, function(input, output) {})
```

For a preview of how `my_theme` impacts most of Shiny UI’s styling
defaults, provide it to `bs_theme_preview()`. This preview app includes
most “core” Shiny UI functionality as well as an interactive “real-time”
theming widget for quickly testing out new colors and fonts. To help
replicate those styling changes, the widgets also emits code to the R
console. It can also be used with other Shiny apps via
`run_with_themer()` (or `bs_themer()`).

``` r
bs_theme_preview(my_theme)
```

<img src="https://i.imgur.com/KLKy1s0.gif" style="display: block; margin: auto;" />

More generally, you can use a Bootstrap theme with any HTML page by
using `shiny::bootstrapLib()` to provide the theme as an
`htmltools::htmlDependency()` to an `shiny::htmlTemplate()` or any HTML
`htmltools::tags` that you wish, for example:

``` r
library(shiny)
ui <- htmlTemplate(
  "my-template.html",
  theme = my_theme,
  ...
)
shinyApp(ui, function(input, output) {})
```

``` html
<!-- my-template.html -->
<!DOCTYPE html>
<html>
  <head>
    {{ headContent() }}
    {{ bootstrapLib(theme) }}
  </head>
  <body>
    ...
  </body>
</html>
```

### R Markdown usage

> Note: this usage currently requires an experimental version of R
> Markdown `remotes::install_github("rstudio/rmarkdown#1706")`

To use a `bs_theme()` in R Markdown, pass the relevant theming
parameter(s) to the `theme` parameter of `html_document` (or, really,
anything that runs through `html_document_base`):

``` yaml
---
output:
  html_document:
    theme:
      bg: "#202123"
      fg: "#B8BCC2"
      primary: "#EA80FC"
      base_font: !expr bslib::font_google("Grandstander")
---
```

At the moment, `{bslib}` is a opt-in feature in R Markdown (i.e.,
whenever `theme` is a list or a `bs_theme()`, then `{bslib}` is used).
This means that, to use the default `bslib::bs_theme()`:

``` yaml
---
output:
  html_document:
    theme: !expr bslib::bs_theme()
---
```

Moreover, when opting into `{bslib}`, you may modify `theme` object
globally inside **knitr** code chunks. This can be useful for things
like adding additional CSS rules that leverage Bootstrap Sass variables,
functions, mixins, etc:

    ```{r}
    library(bslib)
    bs_global_add_rules(
      ".my-class { 
         background-color: mix($body-bg, $body-color, 90%);
         border: 1px solid $primary;
         @include border_radius($border-radius);
       }
      "
    )
    ```

### Add to a theme

`bs_theme()` customizes Bootstrap CSS by changing Bootstrap Sass
variable defaults, but sometimes you need to customize the theme in
other ways by adding other Sass code. For example, if you’d like to add
Sass/CSS rules for a custom, themable, component:

``` r
my_theme %>%
  bs_add_rules(
    ".my-component { color: $primary; }"
  )
```

To learn more, see the [theming
article](https://rstudio.github.io/bslib/articles/theming.html).

## Learn more

See the articles on [theming
recipes](https://rstudio.github.io/bslib/articles/recipes.html) and
[foundations](https://rstudio.github.io/bslib/articles/foundations.html).
