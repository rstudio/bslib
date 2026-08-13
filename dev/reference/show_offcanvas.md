# Show, hide, or toggle an offcanvas from the server

Control an
[`offcanvas()`](https://rstudio.github.io/bslib/dev/reference/offcanvas.md)
panel from a Shiny server function. `show_offcanvas()` can either reveal
a panel already in the UI by **id**, or take an offcanvas **object**
(rendering it into the page if it isn't already there);
`hide_offcanvas()` and `toggle_offcanvas()` act on a panel already in
the UI, by **id**.

If a panel with the same `id` is already present in the page,
`show_offcanvas()` simply reveals it; the object's content is not
re-rendered or updated. To change the content of a persistent panel,
update the inputs and outputs it contains rather than calling
`show_offcanvas()` again.

## Usage

``` r
show_offcanvas(offcanvas, ..., session = get_current_session())

hide_offcanvas(id, ..., session = get_current_session())

toggle_offcanvas(id, show = NULL, ..., session = get_current_session())
```

## Arguments

- offcanvas:

  One of: the `id` (a single string) of an
  [`offcanvas()`](https://rstudio.github.io/bslib/dev/reference/offcanvas.md)
  panel already in the UI, which is revealed; list-like or tag content
  (e.g.
  [`htmltools::HTML()`](https://rstudio.github.io/htmltools/reference/HTML.html)
  or a
  [`htmltools::tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html)),
  which is wrapped into a new anonymous offcanvas with default settings;
  or an
  [`offcanvas()`](https://rstudio.github.io/bslib/dev/reference/offcanvas.md)
  object, which is rendered into the page (if needed) and shown. Note
  that a bare string used to be treated as body content for a new
  anonymous panel; it is now treated as an `id` lookup instead, and
  errors if it looks like body text (e.g. it contains whitespace or is
  empty).

- ...:

  Reserved for future extensions (currently ignored).

- session:

  A Shiny session object (the default should almost always be used).

- id:

  The `id` of an offcanvas in the UI. `hide_offcanvas()` also accepts an
  [`offcanvas()`](https://rstudio.github.io/bslib/dev/reference/offcanvas.md)
  object whose `id` was set.

- show:

  Whether to show (`TRUE`) or hide (`FALSE`) the offcanvas. The default
  (`NULL`) shows it if hidden and hides it if shown.

## Value

Invisibly returns the offcanvas `id` (the generated id when
`show_offcanvas()` is given an object without one).

## Functions

- `show_offcanvas()`: Render (if needed) and show an offcanvas.

- `hide_offcanvas()`: Hide an offcanvas by `id` (or object).

- `toggle_offcanvas()`: Toggle an offcanvas by `id`.

## Module IDs

When controlling an offcanvas from a Shiny module, pass the
**module-local** id to `show_offcanvas()` / `hide_offcanvas()` /
`toggle_offcanvas()` — the same bare id you would use with
`input[[id]]`. [`shiny::NS()`](https://rdrr.io/pkg/shiny/man/NS.html) /
`session$ns()` is only applied when *creating* the panel's `id` in the
UI. `show_offcanvas()` returns the local id, so it round-trips cleanly
to `hide_offcanvas()` / `toggle_offcanvas()`. Do not pass a UI object
whose id was already namespaced back to a server verb — it would
double-namespace.

## See also

Other Offcanvas components:
[`offcanvas()`](https://rstudio.github.io/bslib/dev/reference/offcanvas.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fluid(
  actionButton("show", "Show"),
  actionButton("hide", "Hide")
)
server <- function(input, output, session) {
  # Defined and revealed entirely from the server
  observeEvent(input$show, {
    show_offcanvas(
      offcanvas("Revealed from the server.", title = "Notice", id = "note")
    )
  })
  observeEvent(input$hide, hide_offcanvas("note"))
}
shinyApp(ui, server)

# Reveal an existing id'd panel already declared in the UI
ui <- page_fluid(
  actionButton("show", "Show"),
  offcanvas("Panel content", title = "Notice", id = "note")
)
server <- function(input, output, session) {
  observeEvent(input$show, show_offcanvas("note"))
}
shinyApp(ui, server)
}
```
