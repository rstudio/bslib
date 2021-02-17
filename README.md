
<!-- badges: start -->

[![CRAN
status](https://www.r-pkg.org/badges/version/bslib)](https://cran.r-project.org/package=bslib)
[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://www.tidyverse.org/lifecycle/#experimental)
[![R build
status](https://github.com/rstudio/bslib/workflows/R-CMD-check/badge.svg)](https://github.com/rstudio/bslib/actions)

<!-- badges: end -->

# bslib

The `{bslib}` R package provides tools for creating custom [Bootstrap
themes](https://getbootstrap.com/docs/4.4/getting-started/theming/)
directly from R, making it much easier to customize the appearance of
Shiny apps & R Markdown documents. At the moment, `{bslib}` provides
support for Bootstrap 4 and 3 as well as their various
[Bootswatch](https://bootswatch.com/) themes. An interactive widget is
also provided for previewing themes in real time.

## Installation

Install the stable release of `{bslib}` on CRAN:

``` r
install.packages("bslib")
```

[Usage with Shiny](#shiny-usage) requires version 1.6 or higher:

``` r
install.packages("shiny")
```

[Usage with R Markdown](#r-markdown-usage) currently requires the
development version:

``` r
remotes::install_github("rstudio/rmarkdown")
```

## Overview

### Quickly create custom themes

For a quick sense of what `{bslib}` enables, call `bs_theme_preview()`,
which launches a demo Shiny app (for a hosted version, [see
here](https://testing-apps.shinyapps.io/themer-demo)) with various UI
components. On top of the demo app is an interactive widget for changing
some of [`{bslib}`’s theming options](#theming-options) in real-time.
The video below demonstrates how all these various UI components, even
3rd party components like `DT::datatable()`, are able to update their
CSS styles in response to new theming options.

``` r
bs_theme_preview()
```

<img src="https://i.imgur.com/KLKy1s0.gif" width="100%" style="display: block; margin: auto;" />

For every interactive theming change, the widget sends R code to the
console to replicate the current theme. That theming code can then be
copy/pasted for use inside any [Shiny](#shiny-usage) app or [R
Markdown](#r-markdown-usage) document.

<img src="man/figures/themer-code.png" width="80%" style="display: block; margin: auto;" />

To use this real-time theming widget inside your own Shiny apps, you
must first [use a `bs_theme()`](#shiny-usage), then call
[`bs_themer()`](https://rstudio.github.io/bslib/reference/run_with_themer.html)
inside the server function. Somewhat similarly, for R Markdown
documents, you must first [use a `bs_theme()`](#r-markdown-usage), then
add `runtime: shiny` to the YAML matter, then finally call `bs_themer()`
in a code chunk.

### Shiny usage

To use `{bslib}` in your own Shiny app, pass a `bs_theme()` object to
the `theme` argument of the relevant page layout function, such as
`navbarPage()` or `fluidPage()`:

``` r
library(shiny)
ui <- navbarPage(
  theme = bslib::bs_theme(),
  ...
)
shinyApp(ui, function(input, output) {})
```

### R Markdown usage

To use `{bslib}` inside your `html_document` R Markdown document, either
provide an R expression (prefixed with `!expr`) to create a `bs_theme()`
object for the `theme` parameter:

``` yaml
---
output:
  html_document:
    theme: !expr bslib::bs_theme()
---
```

Or, pass any of `bs_theme()`’s [basic theming options](#basic-theming)
to `theme` more directly, like this:

``` yaml
---
output:
  html_document:
    theme:
      version: 4
      bootswatch: minty
---
```

### Basic theming options

The `bs_theme()` function provides a singular entry-point to `{bslib}`’s
basic theming options. Here you can choose a Bootstrap version
(currently, `version = 4` and `version = 3` are supported) as well as
any [Bootswatch](https://bootswatch.com/) theme (e.g.,
[minty](https://bootswatch.com/minty/)):

``` r
bs_theme(version = 4, bootswatch = "minty") %>%
  bs_theme_preview()
```

<img src="man/figures/minty.png" width="100%" style="display: block; margin: auto;" />

`bs_theme()` also allows for customization of [main colors &
fonts](https://rstudio.github.io/bslib/articles/theming.html#main-colors-fonts)
as well as 100s of more specific theming option via [Bootstrap Sass
variables](https://rstudio.github.io/bslib/articles/bs4-variables.html).
When it comes to custom font(s) that may not be available on the end
users machine, make sure to leverage helpers such as
[`font_google()`](https://rstudio.github.io/bslib/reference/font_face.html)
to assist with importing font file(s) in an convenient, efficient, and
responsible way.

``` r
bs_theme(
  bg = "#101010", fg = "#FDF7F7", primary = "#ED79F9", 
  base_font = font_google("Prompt"),
  code_font = font_google("JetBrains Mono")
) %>%
  bs_theme_preview()
```

<img src="man/figures/dark-mode.png" width="100%" style="display: block; margin: auto;" />

### Advanced theming

#### Add more rules

The `bs_add_rules()` function assists with bundling additional Sass/CSS
rules to the final Bootstrap CSS bundle. Here’s an example of adding
[nes.css](https://github.com/nostalgic-css/NES.css/), which adds
additional styles for things like the mouse cursor (on top of
`bs_theme()`s theming options).

``` r
bs_theme(
  bg = "#e5e5e5", fg = "#0d0c0c", primary = "#dd2020",
  base_font = font_google("Press Start 2P"),
  code_font = font_google("Press Start 2P"),
  "font-size-base" = "0.75rem", "enable-rounded" = FALSE
) %>%
  bs_add_rules(
    '@import "https://unpkg.com/nes.css@latest/css/nes.min.css"'
  ) %>% 
  bs_theme_preview()
```

<img src="man/figures/nes.png" width="100%" style="display: block; margin: auto;" />

In the R Markdown case, it’s recommended that additional CSS (or Sass)
rules come through the `css` parameter.

    ---
    output:
      html_document:
        theme: !expr bslib::bs_theme()
        css: my-rules.scss
    ---

As with `bs_add_rules()`, these rules can [reference Bootstrap Sass
variables](https://rstudio.github.io/bslib/articles/theming.html#themeable-components)
as well as utilize convenient Sass mixins or functions like
[`color-contrast()`](https://github.com/rstudio/bslib/blob/c95d6b/inst/sass-utils/color-contrast.scss#L9),
[`mix()`](https://sass-lang.com/documentation/modules/color#mix), etc.

#### Utility Classes

Thanks to Bootstrap’s Utility Classes, you can add or subtract styles on
specific elements to handle common UI problems like spacing, border,
colors, and more. [See
here](https://rstudio.github.io/bslib/articles/theming.html#utility-classes-1)
for some useful examples specific to Shiny and R Markdown as well as
[here for the full
list](https://getbootstrap.com/docs/4.4/utilities/borders/) of Bootstrap
4 Utility Classes.

#### Dynamic theming

The framework behind [real-time theming](#real-time-theming) is also
available to Shiny app developers through the `setCurrentTheme()` and
`getCurrentTheme()` [session
methods](https://shiny.rstudio.com/reference/shiny/1.6.0/session.html).
This is useful for implementing a [dark mode
switch](https://rstudio.github.io/bslib/articles/theming.html#dynamic-theming-in-shiny)
for your app, or more generally, your own custom real-time theming
widget.

#### Developing themable components

Developers of Shiny input and output widgets who wish to make their
custom widgets work seamlessly with custom `{bslib}` themes, [see
here](https://rstudio.github.io/bslib/articles/theming.html#themeable-components).

## Frequently Asked Questions

### Does `{bslib}` work with `{flexdashboard}`?

Yes, but you currently need the development version to use it.

``` r
remotes::install_github("rstudio/flexdashboard")
```

Then you can customize main color and fonts in the same way as the
[`html_document` usage](#r-markdown-usage) (note also that [real-time
theming](#real-time-theming) also works):

``` yaml
---
output: 
  flexdashboard::flex_dashboard:
    theme: 
      bg: "#101010"
      fg: "#FDF7F7"
      primary: "#ED79F9"
      base_font: !expr bslib::font_google("Prompt")
      code_font: !expr bslib::font_google("JetBrains Mono")
---
```

### Does `{bslib}` work with other Rmd output formats?

In general, `{bslib}` should work with any output format that passes a
`theme` argument through \``rmarkdown::html_document` (or
`rmarkdown::html_document_base`). For example, if you want to use
Bootstrap 4 inside of `my_output_format` from `{mypkg}`, then do:

``` yaml
---
output:
  mypkg::my_output_format:
    theme: 
      version: 4
---
```

That being said, `{bslib}` can’t magically fix additional CSS/JS bundled
with custom output formats to be compatible with Bootstrap 4 and custom
theming, so please [let us
know](https://github.com/rstudio/bslib/issues/new) about output formats
that should work better with `{bslib}`, and we’d be happy to work with
the output author to improve the situation.

### Does `{bslib}` work with `{shinydashboard}`?

No, not at the moment. We currently recommend [using the `{fresh}`
package to accomplish similar theming with
`{shinydashboard}`](https://dreamrs.github.io/fresh/articles/vars-shinydashboard.html).
Also, if you want `{shinydashboard}`-like package build Bootstrap 4, [we
currently recommend using
`{bs4Dash}`](https://dreamrs.github.io/fresh/articles/vars-bs4dash.html).
