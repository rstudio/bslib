# Dynamically update accordions

Dynamically update/modify
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)s
in a Shiny app. To be updated programmatically, the
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
must have an `id`. These functions require an active Shiny session and
only work with a running Shiny app.

## Usage

``` r
accordion_panel_set(id, values, session = get_current_session())

accordion_panel_open(id, values, session = get_current_session())

accordion_panel_close(id, values, session = get_current_session())

accordion_panel_insert(
  id,
  panel,
  target = NULL,
  position = c("after", "before"),
  session = get_current_session()
)

accordion_panel_remove(id, target, session = get_current_session())

accordion_panel_update(
  id,
  target,
  ...,
  title = NULL,
  value = NULL,
  icon = NULL,
  session = get_current_session()
)
```

## Arguments

- id:

  an character string that matches an existing
  [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)'s
  `id`.

- values:

  either a character string (used to identify particular
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)s
  by their `value`) or `TRUE` (i.e., all `values`).

- session:

  a shiny session object (the default should almost always be used).

- panel:

  an
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md).

- target:

  The `value` of an existing panel to insert next to. If removing: the
  `value` of the
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  to remove.

- position:

  Should `panel` be added before or after the target? When `target` is
  `NULL` (the default), `"after"` will append after the last panel and
  `"before"` will prepend before the first panel.

- ...:

  Elements that become the new content of the panel.

- title:

  A title to appear in the
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)'s
  header.

- value:

  A character string that uniquely identifies this panel.

- icon:

  A
  [htmltools::tag](https://rstudio.github.io/htmltools/reference/builder.html)
  child (e.g.,
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html))
  which is positioned just before the `title`.

## Functions

- `accordion_panel_set()`: same as `accordion_panel_open()`, except it
  also closes any currently open panels.

- `accordion_panel_open()`: open
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)s.

- `accordion_panel_close()`: close
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)s.

- `accordion_panel_insert()`: insert a new
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)

- `accordion_panel_remove()`: remove
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)s.

- `accordion_panel_update()`: update a
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md).

## See also

[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
and
[`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
create the accordion component.
