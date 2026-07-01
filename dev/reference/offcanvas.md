# Offcanvas panels

An offcanvas is a panel that slides in from an edge of the viewport,
built on [Bootstrap 5's offcanvas
component](https://getbootstrap.com/docs/5.3/components/offcanvas/). It
can be used in three ways:

1.  **With a trigger in the UI.** Pass a `trigger` element (e.g. a
    button); clicking it reveals the panel.

2.  **Controlled from the server.** Give the panel an `id`, place it in
    the UI, then reveal or hide it with
    [`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md),
    [`hide_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md),
    or
    [`toggle_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md).

3.  **Defined and revealed entirely from the server.** Build the panel
    in the server function and pass it to
    [`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md).

## Usage

``` r
offcanvas(
  ...,
  title = NULL,
  footer = NULL,
  id = NULL,
  trigger = NULL,
  placement = c("right", "left", "top", "bottom", "start", "end"),
  width = NULL,
  height = NULL,
  close_button = TRUE,
  backdrop = TRUE,
  scroll = FALSE,
  keyboard = TRUE
)
```

## Arguments

- ...:

  Body content of the offcanvas, making up the scrollable
  `.offcanvas-body`. Named arguments become HTML attributes on the
  offcanvas container.

- title:

  Optional title for the offcanvas header. A string or arbitrary tags. A
  dismiss button is placed alongside it unless `close_button = FALSE`.

- footer:

  Optional content pinned to the bottom of the panel. A string or
  arbitrary tags.

- id:

  Optional unique identifier. Required to (1) reactively respond to the
  panel's visibility via `input[[id]]`, (2) control it from the server
  with
  [`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
  /
  [`hide_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
  /
  [`toggle_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md),
  and (3) keep the panel in the DOM after it is hidden (see Lifecycle).
  If `NULL`, an id is generated when the panel is shown via
  [`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md).

- trigger:

  Optional UI element (e.g. a
  [`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
  or
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html))
  that reveals the offcanvas when clicked; bslib attaches the necessary
  Bootstrap wiring. If `trigger` renders as multiple HTML elements
  (e.g., it's a
  [`tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html)),
  the last HTML element is used for the trigger. If the `trigger` should
  contain all of those elements, wrap the object in a
  [`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
  or
  [`htmltools::span()`](https://rstudio.github.io/htmltools/reference/builder.html).

- placement:

  The edge of the viewport the offcanvas slides in from. One of
  `"right"`, `"left"`, `"top"`, or `"bottom"`. `"start"` and `"end"` are
  accepted as aliases for `"left"` and `"right"`.

- width:

  Width of the offcanvas, used only for `"left"` and `"right"`
  placements. A number (interpreted as pixels) or a valid CSS length
  (e.g. `"400px"`). Defaults to Bootstrap's value.

- height:

  Height of the offcanvas, used only for `"top"` and `"bottom"`
  placements. A number (interpreted as pixels) or a valid CSS length
  (e.g. `"30vh"`). Defaults to Bootstrap's value.

- close_button:

  Whether to include a dismiss button in the header. Defaults to `TRUE`.

- backdrop:

  Whether to include a backdrop while the offcanvas is open. One of
  `TRUE` (default), `FALSE`, or `"static"` (a backdrop that does not
  close the offcanvas when clicked).

- scroll:

  Whether to allow the page body to scroll while the offcanvas is open.
  Defaults to `FALSE`.

- keyboard:

  Whether pressing the Escape key closes the offcanvas. Defaults to
  `TRUE`.

## Value

A `bslib_offcanvas` object that can be added to a UI (when `id` or
`trigger` is set) or passed to
[`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md).

## Lifecycle

The `id` is the switch that governs whether the panel persists:

- **With an `id`**, the panel persists in the DOM after it is hidden, so
  it can be shown again cheaply and any interactive Shiny content inside
  keeps its state. Its open/closed state is reactively available as
  `input[[id]]`.

- **Without an `id`**, a panel shown via
  [`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
  is removed from the DOM when hidden (its inner inputs are unbound).
  This keeps anonymous reveals from accumulating, and means input IDs
  used inside the panel can be reused on later reveals.

Multiple offcanvas panels can be open at the same time.

## References

Based on [Bootstrap's offcanvas
component](https://getbootstrap.com/docs/5.3/components/offcanvas/).

## See also

[`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
/
[`hide_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
/
[`toggle_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)
to control an offcanvas from the server.

Other Offcanvas components:
[`show_offcanvas()`](https://rstudio.github.io/bslib/dev/reference/show_offcanvas.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

# 1. Reveal from a trigger in the UI
offcanvas(
  "Panel content goes here.",
  title = "Settings",
  trigger = actionButton("open", "Open settings")
)

# 2. Control an id'd panel from the server
ui <- page_fluid(
  actionButton("open", "Open"),
  offcanvas("Panel content", title = "Details", id = "details")
)
server <- function(input, output, session) {
  observeEvent(input$open, toggle_offcanvas("details"))
  observeEvent(input$details, message("Panel is open: ", input$details))
}
shinyApp(ui, server)

# 3. Module namespacing: `ns()` is only used in the UI; server verbs and
# `input[[id]]` use the module-local id (see the "Module IDs" section in
# ?show_offcanvas).
demo_offcanvas_ui <- function(id) {
  ns <- NS(id)
  tagList(
    actionButton(ns("open"), "Open panel"),
    actionButton(ns("toggle"), "Toggle panel"),
    offcanvas(
      sliderInput(ns("slider"), "Pick a value", min = 0, max = 100, value = 50),
      verbatimTextOutput(ns("value_output")),
      actionButton(ns("close_panel"), "Close panel"),
      title = "Module panel",
      id = ns("panel")
    )
  )
}
demo_offcanvas_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    observeEvent(input$open, toggle_offcanvas("panel", show = TRUE))
    observeEvent(input$toggle, toggle_offcanvas("panel"))
    observeEvent(input$close_panel, toggle_offcanvas("panel", show = FALSE))

    output$value_output <- renderPrint({
      cat("slider value:", input$slider, "\n")
      cat("panel open:", isTRUE(input$panel), "\n")
    })
  })
}

ui <- page_fluid(
  h4("Module A"),
  demo_offcanvas_ui("a"),
  h4("Module B"),
  demo_offcanvas_ui("b")
)
server <- function(input, output, session) {
  demo_offcanvas_server("a")
  demo_offcanvas_server("b")
}
shinyApp(ui, server)
}
```
