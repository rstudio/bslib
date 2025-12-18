# Navigation items

Create nav item(s) for use inside nav containers (e.g.,
[`navset_tab()`](https://rstudio.github.io/bslib/reference/navset.md),
[`navset_bar()`](https://rstudio.github.io/bslib/reference/navset.md),
etc).

## Usage

``` r
nav_panel(title, ..., value = title, icon = NULL)

nav_panel_hidden(value, ..., icon = NULL)

nav_menu(title, ..., value = title, icon = NULL, align = c("left", "right"))

nav_item(...)

nav_spacer()
```

## Arguments

- title:

  A title to display. Can be a character string or UI elements (i.e.,
  [htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html)).

- ...:

  Depends on the function:

  - For `nav_panel()` and `nav_panel_hidden()`: UI elements (i.e.,
    [htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html))
    to display when the item is active.

  - For `nav_menu()`: a collection of nav items (e.g., `nav_panel()`,
    `nav_item()`).

  - For `nav_item()`: UI elements (i.e.,
    [htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html))
    to place directly in the navigation panel (e.g., search forms, links
    to external content, etc).

- value:

  A character string to assign to the nav item. This value may be
  supplied to the relevant container's `selected` argument in order to
  show particular nav item's content immediately on page load. This
  value is also useful for programmatically updating the selected
  content via
  [`nav_select()`](https://rstudio.github.io/bslib/reference/nav_select.md),
  [`nav_hide()`](https://rstudio.github.io/bslib/reference/nav_select.md),
  etc (updating selected tabs this way is often useful for
  showing/hiding panels of content via other UI controls like
  [`shiny::radioButtons()`](https://rdrr.io/pkg/shiny/man/radioButtons.html)
  – in this scenario, consider using `nav_panel_hidden()` with
  [`navset_hidden()`](https://rstudio.github.io/bslib/reference/navset.md)).

- icon:

  Optional icon to appear next to the nav item's `title`.

- align:

  horizontal alignment of the dropdown menu relative to dropdown toggle.

## Value

A nav item that may be passed to a nav container (e.g.
[`navset_tab()`](https://rstudio.github.io/bslib/reference/navset.md)).

## Functions

- `nav_panel()`: Content to display when the given item is selected.

- `nav_panel_hidden()`: Create nav content for use inside
  [`navset_hidden()`](https://rstudio.github.io/bslib/reference/navset.md)
  (for creating custom navigation controls via `navs_select()`),

- `nav_menu()`: Create a menu of nav items.

- `nav_item()`: Place arbitrary content in the navigation panel (e.g.,
  search forms, links to external content, etc.)

- `nav_spacer()`: Adding spacing between nav items.

## See also

[navset](https://rstudio.github.io/bslib/reference/navset.md) create the
navigation container holding the nav panels.

`nav_menu()`, `nav_item()`, `nav_spacer()` create menus, items, or space
in the navset control area.

[`nav_insert()`](https://rstudio.github.io/bslib/reference/nav_select.md),
[`nav_remove()`](https://rstudio.github.io/bslib/reference/nav_select.md)
programmatically add or remove nav panels.

[`nav_select()`](https://rstudio.github.io/bslib/reference/nav_select.md),
[`nav_show()`](https://rstudio.github.io/bslib/reference/nav_select.md),
[`nav_hide()`](https://rstudio.github.io/bslib/reference/nav_select.md)
change the state of a `nav_panel()` in a navset.

Other Panel container functions:
[`nav_select()`](https://rstudio.github.io/bslib/reference/nav_select.md),
[`navset`](https://rstudio.github.io/bslib/reference/navset.md)
