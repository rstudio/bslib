# Multi-page app with a top navigation bar

Create a page that contains a top level navigation bar that can be used
to toggle a set of
[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
elements. Use this page layout to create the effect of a multi-page app,
where your app's content is broken up into multiple "pages" that can be
navigated to via the top navigation bar.

## Usage

``` r
page_navbar(
  ...,
  title = NULL,
  id = NULL,
  selected = NULL,
  sidebar = NULL,
  fillable = TRUE,
  fillable_mobile = FALSE,
  gap = NULL,
  padding = NULL,
  header = NULL,
  footer = NULL,
  navbar_options = NULL,
  fluid = TRUE,
  theme = bs_theme(),
  window_title = NA,
  lang = NULL,
  position = deprecated(),
  bg = deprecated(),
  inverse = deprecated(),
  underline = deprecated(),
  collapsible = deprecated()
)
```

## Arguments

- ...:

  a collection of
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  items.

- title:

  A (left-aligned) title to place in the card header/footer. If
  provided, other nav items are automatically right aligned.

- id:

  a character string used for dynamically updating the container (see
  [`nav_select()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)).

- selected:

  a character string matching the `value` of a particular
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item to selected by default.

- sidebar:

  A
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  component to display on every
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  page.

- fillable:

  Whether or not to allow `fill` items to grow/shrink to fit the browser
  window. If `TRUE`, all
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  pages are `fillable`. A character vector, matching the `value` of
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)s
  to be filled, may also be provided. Note that, if a `sidebar` is
  provided, `fillable` makes the main content portion fillable.

- fillable_mobile:

  Whether or not `fillable` pages should fill the viewport's height on
  mobile devices (i.e., narrow windows).

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the `gap` (i.e., spacing) between elements provided to `...`.

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

- header:

  UI element(s)
  ([htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html))
  to display *above* the nav content. For `card`-based navsets, these
  elements are implicitly wrapped in a
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).
  To control things like `padding`, `fill`, etc., wrap the elements in
  an explicit
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).

- footer:

  UI element(s)
  ([htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html))
  to display *below* the nav content. For `card`-based navsets, these
  elements are implicitly wrapped in a
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).
  To control things like `padding`, `fill`, etc., wrap the elements in
  an explicit
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).

- navbar_options:

  Options to control the appearance and behavior of the navbar. Use
  [`navbar_options()`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  to create the list of options.

- fluid:

  `TRUE` to use fluid layout; `FALSE` to use fixed layout.

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object.

- window_title:

  the browser window title. The default value, `NA`, means to use any
  character strings that appear in `title` (if none are found, the host
  URL of the page is displayed by default).

- lang:

  ISO 639-1 language code for the HTML page, such as "en" or "ko". This
  will be used as the lang in the `<html>` tag, as in
  `<html lang="en">`. The default (NULL) results in an empty string.

- position:

  **\[deprecated\]** Please use
  [`navbar_options = navbar_options(position=)`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  instead.

- bg:

  **\[deprecated\]** Please use
  [`navbar_options = navbar_options(bg=)`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  instead.

- inverse:

  **\[deprecated\]** Please use
  [`navbar_options = navbar_options(inverse=)`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  instead.

- underline:

  **\[deprecated\]** Please use
  [`navbar_options = navbar_options(underline=)`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  instead.

- collapsible:

  **\[deprecated\]** Please use
  [`navbar_options = navbar_options(collapsible=)`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  instead.

## References

[Getting Started with
Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
on the bslib website.

## See also

[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
[`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
and
[`nav_item()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
for adding content sections and organizing or creating items in the
navigation bar.

[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
and
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
for laying out content into rows and columns.

[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) for
wrapping outputs in the 'main' content area.

[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
for highlighting values.

[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
for grouping related input controls in the `sidebar`.

Other Dashboard page layouts:
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md),
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

link_shiny <- tags$a(
  shiny::icon("github"), "Shiny",
  href = "https://github.com/rstudio/shiny",
  target = "_blank"
)
link_posit <- tags$a(
  shiny::icon("r-project"), "Posit",
  href = "https://posit.co",
  target = "_blank"
)

ui <- page_navbar(
  title = "My App",
  nav_panel(title = "One", p("First page content.")),
  nav_panel(title = "Two", p("Second page content.")),
  nav_panel("Three", p("Third page content.")),
  nav_spacer(),
  nav_menu(
    title = "Links",
    align = "right",
    nav_item(link_shiny),
    nav_item(link_posit)
  )
)

server <- function(...) { } # not used in this example

shinyApp(ui, server)
}
```
