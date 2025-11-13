# Sidebar layouts

Sidebar layouts place UI elements, like input controls or additional
context, next to the main content area which often holds output elements
like plots or tables.

There are several page, navigation, and layout functions that allow you
to create a sidebar layout. In each case, you can create a collapsing
sidebar layout by providing a `sidebar()` object to the `sidebar`
argument the following functions.

- [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  creates a "page-level" sidebar.

- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  creates a multi-panel app with an (optional, page-level) sidebar that
  is shown on every panel.

- `layout_sidebar()` creates a "floating" sidebar layout component which
  can be used inside any
  [`page()`](https://rstudio.github.io/bslib/dev/reference/page.md)
  and/or
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)
  context.

- [`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  and
  [`navset_card_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  create multi-tab cards with a shared sidebar that is accessible from
  every panel.

See [the Sidebars
article](https://rstudio.github.io/bslib/articles/sidebars.html) on the
bslib website to learn more.

## Usage

``` r
sidebar(
  ...,
  width = 250,
  position = c("left", "right"),
  open = NULL,
  id = NULL,
  title = NULL,
  bg = NULL,
  fg = NULL,
  class = NULL,
  max_height_mobile = NULL,
  gap = NULL,
  padding = NULL,
  fillable = FALSE
)

layout_sidebar(
  ...,
  sidebar = NULL,
  fillable = TRUE,
  fill = TRUE,
  bg = NULL,
  fg = NULL,
  border = NULL,
  border_radius = NULL,
  border_color = NULL,
  padding = NULL,
  gap = NULL,
  height = NULL
)

toggle_sidebar(id, open = NULL, session = get_current_session())
```

## Arguments

- ...:

  Unnamed arguments can be any valid child of an [htmltools
  tag](https://rstudio.github.io/htmltools/reference/builder.html) and
  named arguments become HTML attributes on returned UI element. In the
  case of `layout_sidebar()`, these arguments are passed to the main
  content tag (not the sidebar+main content container).

- width:

  A valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  used for the width of the sidebar.

- position:

  Where the sidebar should appear relative to the main content.

- open:

  The initial state of the sidebar, choosing from the following options:

  - `"desktop"`: The sidebar starts open on desktop screen, closed on
    mobile. This is default sidebar behavior.

  - `"open"` or `TRUE`: The sidebar starts open.

  - `"closed"` or `FALSE`: The sidebar starts closed.

  - `"always"` or `NA`: The sidebar is always open and cannot be closed.

  Alternatively, you can use a list with `desktop` or `mobile` items to
  set the initial sidebar state independently for `desktop` and `mobile`
  screen sizes. In this case, `desktop` or `mobile` can use any of the
  above options except `"desktop"`, which is equivalent to
  `list(desktop = "open", mobile = "closed")`. You can also choose to
  place an always open sidebar above the main content on mobile devices
  by setting `mobile = "always-above"`.

  In
  [`sidebar_toggle()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md),
  `open` indicates the desired state of the sidebar, where the default
  of `open = NULL` will cause the sidebar to be toggled open if closed
  or vice versa. Note that
  [`sidebar_toggle()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  can only open or close the sidebar, so it does not support the
  `"desktop"` and `"always"` options.

- id:

  A character string. Required if wanting to re-actively read (or
  update) the `collapsible` state in a Shiny app.

- title:

  A character title to be used as the sidebar title, which will be
  wrapped in a `<header>` element with class `sidebar-title`. You can
  also provide a custom
  [`htmltools::tag()`](https://rstudio.github.io/htmltools/reference/builder.html)
  for the title element, in which case you'll likely want to give this
  element `class = "sidebar-title"`.

- bg, fg:

  A background or foreground color. If only one of either is provided,
  an accessible contrasting color is provided for the opposite color,
  e.g. setting `bg` chooses an appropriate `fg` color.

- class:

  CSS classes for the sidebar container element, in addition to the
  fixed `.sidebar` class.

- max_height_mobile:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the maximum height of the horizontal sidebar when viewed on
  mobile devices. Only applies to always-open sidebars that use
  `open = "always"`, where by default the sidebar container is placed
  below the main content container on mobile devices.

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the vertical `gap` (i.e., spacing) between adjacent elements
  provided to `...`.

- padding:

  Padding within the sidebar itself. This can be a numeric vector (which
  will be interpreted as pixels) or a character vector with valid CSS
  lengths. `padding` may be one to four values. If one, then that value
  will be used for all four sides. If two, then the first value will be
  used for the top and bottom, while the second value will be used for
  left and right. If three, then the first will be used for top, the
  second will be left and right, and the third will be bottom. If four,
  then the values will be interpreted as top, right, bottom, and left
  respectively.

- fillable:

  Whether or not the `main` content area should be considered a fillable
  (i.e., flexbox) container.

- sidebar:

  A `sidebar()` object.

- fill:

  Whether or not to allow the layout container to grow/shrink to fit a
  fillable container with an opinionated height (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).

- border:

  Whether or not to add a border.

- border_radius:

  Whether or not to add a border radius.

- border_color:

  The border color that is applied to the entire layout (if
  `border = TRUE`) and the color of the border between the sidebar and
  the main content area.

- height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `height` in
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)).

- session:

  A Shiny session object (the default should almost always be used).

## Functions

- `toggle_sidebar()`: Toggle a `sidebar()` state during an active Shiny
  user session. To use this function, the `sidebar()` you want to open
  or close must have an `id` value.

## References

Sidebar layouts are featured in a number of pages on the bslib website:

- [Sidebars](https://rstudio.github.io/bslib/articles/sidebars.html)

- [Cards:
  Sidebars](https://rstudio.github.io/bslib/articles/cards/index.html#sidebars)

- [Getting Started:
  Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
