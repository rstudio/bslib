
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

[Usage with R Markdown](#r-markdown-usage) requires version 2.7 or
higher:

``` r
install.packages("rmarkdown")
```

## Getting started

### Shiny usage

To use `{bslib}` with Shiny, provide a `bs_theme()` object to the
`theme` argument of the relevant page layout function, such as
`navbarPage()` or `fluidPage()`:

``` r
library(shiny)
ui <- navbarPage(
  theme = bs_theme(),
  ...
)
shinyApp(ui, function(...) {})
```

### Bootstrap versioning

`bs_theme()` provides access to multiple Bootstrap versions via the
`version` argument. At the time of writing, there is support for:

-   Bootstrap 4 (`bs_theme(version = 4)`): Intended for new projects.
-   Bootstrap 3 (`bs_theme(version = 3)`): Intended for legacy projects
    that happen to break with `version = 4`.

By not specifying a `version`, `{bslib}` gives you the currently
recommended version of Bootstrap for new projects. Currently Bootstrap 4
is recommended, but that will change to Bootstrap 5 in the near future,
so it’s best practice to “hard code” the version, especially for
sophisticated projects that have custom HTML/CSS/etc.

### R Markdown usage

Any R Markdown output format that uses `rmarkdown::html_document_base`
as a foundation (e.g., `rmarkdown::html_document`,
`flexdashboard::flex_dashboard`, etc) accepts arguments to
`bslib::bs_theme()` via its `theme` parameter. For example, the YAML
below requests the default Bootstrap 4 theme:

``` yaml
---
output:
  html_document:
    theme:
      version: 4
---
```

The sections below have more Rmd `theme` examples, but you may also find
some inside RStudio by going to File -&gt; New File -&gt; R Markdown
-&gt; From Template:

<img src="man/figures/rstudio-templates.png" width="60%" style="display: block; margin: auto;" />

### Bootswatch themes

Any Bootswatch [3](https://bootswatch.com/3/) or
[4](https://bootswatch.com/) theme is available through `bs_theme()`’s
`bootswatch` argument. You may already be familiar with using these
“pre-packaged” themes via the `{shinythemes}` package (or via the
`theme` parameter in R Markdown). Those legacy approaches only provide
Bootswatch 3 themes, but with `{bslib}`, you can use newer themes like
[minty](https://bootswatch.com/minty).

<div style="display:flex; justify-content:space-between">

<div style="flex:1">

``` r
# Shiny usage
navbarPage(
  theme = bs_theme(bootswatch = "minty"),
  ...
)
```

</div>

<div style="flex:1">

``` r
# R Markdown usage
---
output:
  html_document:
    theme:
      bootswatch: minty
---
```

</div>

</div>

<img src="man/figures/minty.png" width="100%" style="display: block; margin: auto;" />

### Custom themes

In addition to `version` and `bootswatch`, `bs_theme()` has some other
named arguments for customizing main colors and fonts. These named
arguments are supported across Bootstrap `version`s, making them useful
for both new and legacy projects. Here’s an example of using a subset of
these named arguments to implement a dark mode with custom fonts
([`font_google()`](https://rstudio.github.io/bslib/reference/font_face.html)
downloads, caches, and serves font files so fonts “just work” anywhere –
even if the end user doesn’t have an internet connection).

<div style="display:flex; justify-content:space-between">

<div style="flex:1">

``` r
# Shiny usage
navbarPage(
  theme = bs_theme(
    bg = "#101010", 
    fg = "#FDF7F7", 
    primary = "#ED79F9", 
    base_font = font_google("Prompt"),
    code_font = font_google("JetBrains Mono")
  ),
  ...
)
```

</div>

<div style="flex:1">

``` r
# R Markdown usage
---
output:
  html_document:
    theme:
      bg: "#101010"
      fg: "#FDF7F7"
      primary: "#ED79F9"
      base_font:
        google: "Prompt"
      code_font:
        google: "JetBrains Mono"
---
```

</div>

</div>

<img src="man/figures/dark-mode.png" width="100%" style="display: block; margin: auto;" />

### Real-time custom themes

Use `bs_theme_preview()` (or `bs_themer()`) to create custom themes in
“real-time” via an interactive theming widget. The former overlays the
widget on a demo Shiny app ([see
here](https://testing-apps.shinyapps.io/themer-demo) for a hosted
version) whereas the latter may be used to themes any Shiny app or R
Markdown document.

``` r
bs_theme_preview()
```

<img src="https://i.imgur.com/KLKy1s0.gif" width="100%" style="display: block; margin: auto;" />

`bs_theme_preview()` and `bs_themer()` also generate `{bslib}` code to
reproduce the interactive. [See
here](https://rstudio.github.io/bslib/articles/real-time.html) to learn
more about the interactive themer.

By the way, the part of the code that powers `bs_themer()` is also
available to Shiny app developers through the `setCurrentTheme()` and
`getCurrentTheme()` [session
methods](https://shiny.rstudio.com/reference/shiny/1.6.0/session.html).
This is useful for implementing a [dark mode
switch](https://rstudio.github.io/bslib/articles/theming.html#dynamic-theming-in-shiny)
for your app, or more generally, your own custom real-time theming
widget.

## More advanced theming

### Targetted themes

`bs_theme()` also provides access to 100s of more specific theming
options by considering anything passed through it’s `...` argument to be
a new [Bootstrap Sass variable
defaults](https://getbootstrap.com/docs/4.6/getting-started/theming/#variable-defaults).
This allows you to do things like set Bootstrap 4’s
[`$progress-bar-bg`](https://rstudio.github.io/bslib/articles/bs4-variables.html#progress-bar-bg)
to `orange`.

<div style="display:flex; justify-content:space-between">

<div style="flex:1">

``` r
# Shiny usage
bs_theme(
  bg = "#002B36", fg = "#EEE8D5", 
  "progress-bar-bg" = "orange"
)
```

</div>

<div style="flex:1">

``` r
# R Markdown usage
output:
  html_document:
    theme:
      bg: "#002B36" 
      fg: "#EEE8D5"
      progress-bar-bg": "orange"
```

</div>

</div>

<img src="man/figures/progress-orange.png" width="100%" style="display: block; margin: auto;" />

[See here](https://rstudio.github.io/bslib/articles/bs4-variables.html)
for a searchable table of all the theming options and
[here](https://rstudio.github.io/bslib/articles/theming.html#theming-variables)
for a more details on customizing Bootstrap Sass variables in `{bslib}`.

### Adding more rules

A fair amount of theming is possible by customizing Bootstrap Sass
variables in `bs_theme()`, but sometimes you may also want to add
additional Sass/CSS rules. The `bs_add_rules()` function makes this easy
for Shiny usage. Here’s an example of adding
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
  )
```

<img src="man/figures/nes.png" width="100%" style="display: block; margin: auto;" />

In the R Markdown case, it’s recommended that additional CSS (or Sass)
rules come through the `css` parameter, but you may also use the `bslib`
engine. As with `bs_add_rules()`, these rules can reference Bootstrap
Sass variables as well as utilize convenient Sass mixins or functions
like
[`color-contrast()`](https://github.com/rstudio/bslib/blob/c95d6b/inst/sass-utils/color-contrast.scss#L9),
[`mix()`](https://sass-lang.com/documentation/modules/color#mix), etc.

    ---
    output:
      html_document:
        theme: 
          version: 4
        css: my-rules.scss
    ---

    ```{bslib}
    $custom-bg: rgba($primary, 0.3);
    .custom {
      background-color: $custom-bg;
      color: color-contrast(opaque($body-bg, $custom-bg))
    }
    ```

    ::: {.custom}
    Hello custom block with custom styles!
    :::

### Utility Classes

Thanks to Bootstrap’s Utility Classes, you can add or subtract styles on
specific elements to handle common UI problems like spacing, border,
colors, and more. [See
here](https://rstudio.github.io/bslib/articles/theming.html#utility-classes-1)
for some useful examples specific to Shiny and R Markdown as well as
[here for the full
list](https://getbootstrap.com/docs/4.4/utilities/borders/) of Bootstrap
4 Utility Classes.

### Developing themable components

Developers of Shiny input and output widgets who wish to make their
custom widgets work seamlessly with custom `{bslib}` themes, [see
here](https://rstudio.github.io/bslib/articles/theming.html#themeable-components).

## Frequently Asked Questions

### Does `{bslib}` work with `{flexdashboard}`?

Yes, but you currently need the development version to use it.

``` r
remotes::install_github("rstudio/flexdashboard")
```

[See
here](https://flexdashboard-pkg.netlify.app/articles/articles/theme.html)
for more details.

### Does `{bslib}` work with `{pkgdown}`?

Yes, but you currently need the development version to use it.

``` r
remotes::install_github("r-lib/pkgdown")
```

[See here](https://pkgdown.r-lib.org/dev/articles/customization.html)
for more details.

### Does `{bslib}` work with `{bookdown}`?

Yes, but you currently need the development version to use it.

``` r
remotes::install_github("rstudio/bookdown")
```

[See here](https://pkgs.rstudio.com/bookdown/reference/bs4_book.html)
for more details.

### Does `{bslib}` work with other Rmd output formats?

In general, `{bslib}` works with any output format that passes a `theme`
argument through `rmarkdown::html_document_base`. For example, if you
want to use Bootstrap 4 inside of `my_output_format` from `{mypkg}`,
then do:

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

No, at least not at the moment. We currently recommend [using `{fresh}`
(and/or `{bs4Dash}`) to accomplish similar theming with
`{shinydashboard}`](https://dreamrs.github.io/fresh/articles/vars-shinydashboard.html);
however, a future version of `{bslib}` (or possibly a new package) will
likely provide similar functionality to `{shinydashboard}`.
