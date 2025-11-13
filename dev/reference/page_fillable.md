# A screen-filling page layout

A Bootstrap-based page layout whose contents fill the full height and
width of the browser window.

## Usage

``` r
page_fillable(
  ...,
  padding = NULL,
  gap = NULL,
  fillable_mobile = FALSE,
  title = NULL,
  theme = bs_theme(),
  lang = NULL
)
```

## Arguments

- ...:

  UI elements for the page. Named arguments become HTML attributes.

- padding:

  Padding to use for the body. This can be a numeric vector (which will
  be interpreted as pixels) or a character vector with valid CSS
  lengths. The length can be between one and four. If one, then that
  value will be used for all four sides. If two, then the first value
  will be used for the top and bottom, while the second value will be
  used for left and right. If three, then the first will be used for
  top, the second will be left and right, and the third will be bottom.
  If four, then the values will be interpreted as top, right, bottom,
  and left respectively.

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the `gap` (i.e., spacing) between elements provided to `...`.

- fillable_mobile:

  Whether or not the page should fill the viewport's height on mobile
  devices (i.e., narrow windows).

- title:

  The browser window title (defaults to the host URL of the page)

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object.

- lang:

  ISO 639-1 language code for the HTML page, such as "en" or "ko". This
  will be used as the lang in the `<html>` tag, as in
  `<html lang="en">`. The default (NULL) results in an empty string.

## References

- [Filling
  Layouts](https://rstudio.github.io/bslib/articles/filling/index.html)
  on the bslib website.

- [Getting Started with
  Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
  on the bslib website.

## See also

[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
and
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
for laying out content into rows and columns.

[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
for 'floating' sidebar layouts.

[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
for grouping related input controls in the `sidebar`.

[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) for
wrapping outputs in the 'main' content area.

[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
for highlighting values.

Other Dashboard page layouts:
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md),
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

library(shiny)
library(ggplot2)
library(bslib)

ui <- page_fillable(
  h1("Example", code("mtcars"), "dashboard"),
  layout_columns(
    card(
      full_screen = TRUE,
      card_header("Number of forward gears"),
      plotOutput("gear")
    ),
    card(
      full_screen = TRUE,
      card_header("Number of carburetors"),
      plotOutput("carb")
    )
  ),
  card(
    full_screen = TRUE,
    card_header("Weight vs. Quarter Mile Time"),
    layout_sidebar(
      sidebar = sidebar(
        varSelectInput("var_x", "Compare to qsec:", mtcars[-7], "wt"),
        varSelectInput("color", "Color by:", mtcars[-7], "cyl"),
        position = "right"
      ),
      plotOutput("var_vs_qsec")
    )
  )
)

server <- function(input, output) {
  for (var in c("cyl", "vs", "am", "gear", "carb")) {
    mtcars[[var]] <- as.factor(mtcars[[var]])
  }

  output$gear <- renderPlot({
    ggplot(mtcars, aes(gear)) + geom_bar()
  })

  output$carb <- renderPlot({
    ggplot(mtcars, aes(carb)) + geom_bar()
  })

  output$var_vs_qsec <- renderPlot({
    req(input$var_x, input$color)

    ggplot(mtcars) +
      aes(y = qsec, x = !!input$var_x, color = !!input$color) +
      geom_point()
  })
}

shinyApp(ui, server)
}
```
