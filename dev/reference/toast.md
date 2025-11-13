# Toast notifications

Toast notifications are lightweight, temporary messages designed to
mimic push notifications from mobile and desktop operating systems. They
are built on [Bootstrap 5's toast
component](https://getbootstrap.com/docs/5.3/components/toasts/).

bslib includes a complete example of toasts and their many configuration
options:

    shiny::runExample("toast", package = "bslib")

## Usage

``` r
toast(
  ...,
  header = NULL,
  icon = NULL,
  id = NULL,
  type = NULL,
  duration_s = 5,
  position = "top-right",
  closable = TRUE
)

toast_header(title, ..., icon = NULL, status = NULL)
```

## Arguments

- ...:

  Body content of the toast. Can be a string, or any HTML elements.
  Named arguments will be treated as HTML attributes for the toast
  container.

- header:

  Optional header content. Can be a string, or the result of
  `toast_header()`. If provided, creates a `.toast-header` with close
  button (if `closable = TRUE`).

- icon:

  Optional icon element, for example from
  [`shiny::icon()`](https://rdrr.io/pkg/shiny/man/icon.html),
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html)
  or
  [`fontawesome::fa()`](https://rstudio.github.io/fontawesome/reference/fa.html).

- id:

  Optional unique identifier for the toast. If `NULL`, an ID will be
  automatically generated when the toast is shown via
  [`show_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md).
  Providing a stable ID allows you to hide the toast later. If a toast
  with `id` is already visible, that toast is automatically hidden
  before showing the new toast with the same `id` so that only one toast
  with a given ID is shown at once.

- type:

  Optional semantic type. One of `NULL`, `"primary"`, `"secondary"`,
  `"success"`, `"info"`, `"warning"`, `"danger"`, `"light"`, or
  `"dark"`. Applies appropriate Bootstrap background utility classes
  (`text-bg-*`).

- duration_s:

  Numeric. Number of seconds after which the toast should automatically
  hide. Use `0`, or `NA` to disable auto-hiding (toast will remain
  visible until manually dismissed). Default is `5` (5 seconds).

- position:

  String or character vector specifying where to position the toast
  container. Can be provided in several formats:

  - Kebab-case: `"top-left"`, `"bottom-right"`, etc.

  - Space-separated: `"top left"`, `"bottom right"`, etc.

  - Character vector: `c("top", "left")`, `c("bottom", "right")`, etc.

  - Any order: `"left top"` is equivalent to `"top left"`

  Valid vertical positions are `"top"`, `"middle"`, or `"bottom"`. Valid
  horizontal positions are `"left"`, `"center"`, or `"right"`. Input is
  case-insensitive. Default is `"bottom-right"`.

- closable:

  Logical. Whether to include a close button. Defaults to `TRUE`. When
  both `duration_s = NA` (or `0` or `NULL`) and `closable = FALSE`, the
  toast will remain visible until manually hidden via
  [`hide_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md).
  This is useful when the toast contains interactive Shiny UI elements
  and you want to manage the toast display programmatically.

- title:

  Header text (required).

- status:

  Optional status text that appears as small, muted text on the right
  side of the header.

## Value

A `bslib_toast` object that can be passed to
[`show_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md).

For `toast_header()`: a toast header object that can be used with the
`header` argument of `toast()`.

## Functions

- `toast()`: Create a toast element.

- `toast_header()`: Create a structured toast header with optional icon
  and status indicator. Returns a data structure that can be passed to
  the `header` argument of `toast()`.

## See also

[`show_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md)
to display a toast,
[`hide_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md)
to dismiss a toast, and `toast_header()` to create structured headers.

Other Toast components:
[`show_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fluid(
  actionButton("show_simple", "Simple Toast"),
  actionButton("show_header", "Toast with Header")
)

server <- function(input, output, session) {
  observeEvent(input$show_simple, {
    show_toast(
      toast(
        "Operation completed successfully!",
        header = "Success",
        type = "success"
      )
    )
  })

  observeEvent(input$show_header, {
    show_toast(
      toast(
        "Your settings have been saved.",
        header = toast_header(
          title = "Settings Updated",
          status = "just now"
        ),
        type = "success"
      )
    )
  })
}

shinyApp(ui, server)
}
```
