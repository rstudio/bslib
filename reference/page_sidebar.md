# A sidebar page (i.e., dashboard)

Create a dashboard layout with a full-width header (`title`) and
[`sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md).

## Usage

``` r
page_sidebar(
  ...,
  sidebar = NULL,
  title = NULL,
  fillable = TRUE,
  fillable_mobile = FALSE,
  theme = bs_theme(),
  window_title = NA,
  lang = NULL
)
```

## Arguments

- ...:

  UI elements to display in the 'main' content area (i.e., next to the
  `sidebar`). These arguments are passed to
  [`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md),
  which has more details.

- sidebar:

  A [`sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
  object.

- title:

  A string, number, or
  [`htmltools::tag()`](https://rstudio.github.io/htmltools/reference/builder.html)
  child to display as the title (just above the `sidebar`).

- fillable:

  Whether or not the `main` content area should be considered a fillable
  (i.e., flexbox) container.

- fillable_mobile:

  Whether or not the page should fill the viewport's height on mobile
  devices (i.e., narrow windows).

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- window_title:

  the browser window title. The default value, `NA`, means to use any
  character strings that appear in `title` (if none are found, the host
  URL of the page is displayed by default).

- lang:

  ISO 639-1 language code for the HTML page, such as "en" or "ko". This
  will be used as the lang in the `<html>` tag, as in
  `<html lang="en">`. The default (NULL) results in an empty string.

## References

[Getting Started with
Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
on the bslib website.

## See also

[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md)
and
[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md)
for laying out content into rows and columns.

[`accordion()`](https://rstudio.github.io/bslib/reference/accordion.md)
for grouping related input controls in the `sidebar`.

[`card()`](https://rstudio.github.io/bslib/reference/card.md) for
wrapping outputs in the 'main' content area.

[`value_box()`](https://rstudio.github.io/bslib/reference/value_box.md)
for highlighting values.

Other Dashboard page layouts:
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md),
[`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

library(shiny)
library(ggplot2)
library(bslib)

ui <- page_sidebar(
  title = "Example dashboard",
  sidebar = sidebar(
    varSelectInput("var", "Select variable", mtcars)
  ),
  card(
    full_screen = TRUE,
    card_header("My plot"),
    plotOutput("p")
  )
)

server <- function(input, output) {
  output$p <- renderPlot({
    ggplot(mtcars) + geom_histogram(aes(!!input$var))
  })
}

shinyApp(ui, server)
}
```
