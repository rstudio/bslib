# Append or prepend nav item to a dropdown menu

Exported for use by
[`shiny::prependTab()`](https://rdrr.io/pkg/shiny/man/insertTab.html)/[`shiny::appendTab()`](https://rdrr.io/pkg/shiny/man/insertTab.html).
These functions have been superseded by
[`nav_insert()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
(i.e.,
[`shiny::insertTab()`](https://rdrr.io/pkg/shiny/man/insertTab.html)),
since it can do everything these functions do (i.e., add a
[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
to the start or end of a
[`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md))
and more (i.e., insert a
[`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
anywhere inside a nav container).

## Usage

``` r
nav_prepend(
  id,
  nav,
  menu_title,
  select = FALSE,
  session = get_current_session()
)

nav_append(
  id,
  nav,
  menu_title,
  select = FALSE,
  session = get_current_session()
)
```

## Arguments

- id:

  a character string used to identify the nav container.

- nav:

  a
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  item.

- menu_title:

  The title of a
  [`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md).

- select:

  Should `nav` be selected upon being inserted?

- session:

  a shiny session object (the default should almost always be used).
