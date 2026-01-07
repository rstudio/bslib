# Dynamically update nav containers

Functions for dynamically updating nav containers (e.g., select, insert,
and remove nav items). These functions require an `id` on the nav
container to be specified and must be called within an active Shiny
session.

## Usage

``` r
nav_select(id, selected = NULL, session = get_current_session())

nav_insert(
  id,
  nav,
  target = NULL,
  position = c("after", "before"),
  select = FALSE,
  session = get_current_session()
)

nav_remove(id, target, session = get_current_session())

nav_show(id, target, select = FALSE, session = get_current_session())

nav_hide(id, target, session = get_current_session())
```

## Arguments

- id:

  a character string used to identify the nav container.

- selected:

  a character string used to identify a particular
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item.

- session:

  a shiny session object (the default should almost always be used).

- nav:

  a
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item.

- target:

  The `value` of an existing
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item, next to which tab will be added. If removing: the `value` of the
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item that you want to remove.

- position:

  Should `nav` be added before or after the target?

- select:

  Should `nav` be selected upon being inserted?

## See also

[Navset
functions](https://rstudio.github.io/bslib/dev/reference/navset.md)
create the navigation container holding the nav panels.

[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
[`nav_panel_hidden()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
create panels of content.

[`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
[`nav_item()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
[`nav_spacer()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
create menus, items, or space in the navset control area.

Other Panel container functions:
[`nav-items`](https://rstudio.github.io/bslib/dev/reference/nav-items.md),
[`navset`](https://rstudio.github.io/bslib/dev/reference/navset.md)

## Examples

``` r

can_browse <- function() rlang::is_interactive() && require("shiny")

# Selecting a tab
if (can_browse()) {
  shinyApp(
    page_fluid(
      radioButtons("item", "Choose", c("A", "B")),
      navset_hidden(
        id = "container",
        nav_panel_hidden("A", "a"),
        nav_panel_hidden("B", "b")
      )
    ),
    function(input, output) {
      observe(nav_select("container", input$item))
    }
  )
}

# Inserting and removing
if (can_browse()) {
  ui <- page_fluid(
    actionButton("add", "Add 'Dynamic' tab"),
    actionButton("remove", "Remove 'Foo' tab"),
    navset_tab(
      id = "tabs",
      nav_panel("Hello", "hello"),
      nav_panel("Foo", "foo"),
      nav_panel("Bar", "bar tab")
    )
  )
  server <- function(input, output) {
    observeEvent(input$add, {
      nav_insert(
        "tabs", target = "Bar", select = TRUE,
        nav_panel("Dynamic", "Dynamically added content")
      )
    })
    observeEvent(input$remove, {
      nav_remove("tabs", target = "Foo")
    })
  }
  shinyApp(ui, server)
}
```
