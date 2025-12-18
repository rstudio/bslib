# Show or hide a toast notification

Displays a toast notification in a Shiny application.

## Usage

``` r
show_toast(toast, ..., session = shiny::getDefaultReactiveDomain())

hide_toast(id, ..., session = shiny::getDefaultReactiveDomain())
```

## Arguments

- toast:

  A [`toast()`](https://rstudio.github.io/bslib/reference/toast.md), or
  a string that will be automatically converted to a toast with default
  settings.

- ...:

  Reserved for future extensions (currently ignored).

- session:

  Shiny session object.

- id:

  String with the toast ID returned by `show_toast()` or a `toast`
  object provided that the `id` was set when created/shown.

## Value

`show_toast()` Invisibly returns the toast ID (string) that can be used
with `hide_toast()`.

## Functions

- `show_toast()`: Show a toast notification.

- `hide_toast()`: Hide a toast notification by ID.

## See also

Other Toast components:
[`toast()`](https://rstudio.github.io/bslib/reference/toast.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fluid(
  actionButton("show_persistent", "Show Persistent Toast"),
  actionButton("hide_persistent", "Hide Toast")
)

server <- function(input, output, session) {
  toast_id <- reactiveVal(NULL)

  observeEvent(input$show_persistent, {
    id <- show_toast(
      toast(
        body = "This toast won't disappear automatically.",
        autohide = FALSE
      )
    )
    toast_id(id)
  })

  observeEvent(input$hide_persistent, {
    req(toast_id())
    hide_toast(toast_id())
    toast_id(NULL)
  })
}

shinyApp(ui, server)
}
```
