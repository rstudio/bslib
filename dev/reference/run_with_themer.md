# Theme customization UI

A 'real-time' theme customization UI that you can use to easily make
common tweaks to Bootstrap variables and immediately see how they would
affect your app's appearance. There are two ways you can launch the
theming UI. For most Shiny apps, just use `run_with_themer()` in place
of [`shiny::runApp()`](https://rdrr.io/pkg/shiny/man/runApp.html); they
should take the same arguments and work the same way. Alternatively, you
can call the `bs_themer()` function from inside your server function (or
in an R Markdown app that is using `runtime: shiny`, you can call this
from any code chunk). Note that this function is only intended to be
used for development!

## Usage

``` r
run_with_themer(appDir = getwd(), ..., gfonts = TRUE, gfonts_update = FALSE)

bs_themer(gfonts = TRUE, gfonts_update = FALSE)
```

## Arguments

- appDir:

  The application to run. This can be a file or directory path, or a
  [`shiny::shinyApp()`](https://rdrr.io/pkg/shiny/man/shinyApp.html)
  object. See
  [`shiny::runApp()`](https://rdrr.io/pkg/shiny/man/runApp.html) for
  details.

- ...:

  Additional parameters to pass through to
  [`shiny::runApp()`](https://rdrr.io/pkg/shiny/man/runApp.html).

- gfonts:

  whether or not to detect Google Fonts and wrap them in
  [`font_google()`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  (so that their font files are automatically imported).

- gfonts_update:

  whether or not to update the internal database of Google Fonts.

## Value

nothing. These functions are called for their side-effects.

## Details

To help you utilize the changes you see in the preview, this utility
prints
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
code to the R console.

## Limitations

- Doesn't work with Bootstrap 3.

- Doesn't work with IE11.

- Only works inside Shiny apps and `runtime: shiny` R Markdown
  documents.

  - Can't be used with static R Markdown documents.

  - Can be used to some extent with `runtime: shiny_prerendered`, but
    only UI rendered through a `context="server"` may update in
    real-time.

- Doesn't work with '3rd party' custom widgets that don't make use of
  [`bs_dependency_defer()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md)
  or
  [`bs_current_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_current_theme.md).

## Examples

``` r
library(shiny)
library(bslib)

ui <- fluidPage(
  theme = bs_theme(bg = "black", fg = "white"),
  h1("Heading 1"),
  h2("Heading 2"),
  p(
    "Paragraph text;",
    tags$a(href = "https://www.rstudio.com", "a link")
  ),
  p(
    actionButton("cancel", "Cancel"),
    actionButton("continue", "Continue", class = "btn-primary")
  ),
  tabsetPanel(
    tabPanel("First tab",
      "The contents of the first tab"
    ),
    tabPanel("Second tab",
      "The contents of the second tab"
    )
  )
)

if (interactive()) {
  run_with_themer(shinyApp(ui, function(input, output) {}))
}
```
