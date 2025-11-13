# Changelog

## bslib (development version)

### New features

- Added a new
  [`input_submit_textarea()`](https://rstudio.github.io/bslib/dev/reference/input_submit_textarea.md)
  input element, which is similar to
  [`shiny::textAreaInput()`](https://rdrr.io/pkg/shiny/man/textAreaInput.html),
  but includes a submit button to only submit the text changes to the
  server on click. This is especially useful when the input text change
  triggers a long-running operation and/or the user wants to type
  longer-form input and review it before submitting it.

### Improvements and bug fixes

- [`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  is now flex by default and gains a `gap` argument to better support
  complex header layouts.
  ([\#1253](https://github.com/rstudio/bslib/issues/1253))

- [`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md)
  now avoids unnecessarily copying internal package files to R’s
  temporary directory more than once when preparing precompiled theme
  dependencies (e.g. for a standard
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  theme). ([\#1184](https://github.com/rstudio/bslib/issues/1184))

- Fixed an issue where the `<main>` areas of
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  and
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  (with a `sidebar`) were made to be a fillable containers even when
  `fillable = FALSE`.
  ([\#1188](https://github.com/rstudio/bslib/issues/1188))

- Fixed some typos in the documentation.

- When `bs_theme(brand = FALSE)` we now correctly do not apply brand
  theming when a `_brand.yml` file is present in the project.
  ([\#1196](https://github.com/rstudio/bslib/issues/1196))

- Sidebars from
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  and
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  are now resizable on desktop-sized screen widths, allowing users to
  resize the sidebar width as desired.
  ([\#1217](https://github.com/rstudio/bslib/issues/1217))

- [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  gains a `fillable` argument to support vertical fill behavior in
  sidebars. ([\#1226](https://github.com/rstudio/bslib/issues/1226))

- [`sidebar_toggle()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  is now officially deprecated in favor of
  [`toggle_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md).
  ([\#1235](https://github.com/rstudio/bslib/issues/1235))

## bslib 0.9.0

CRAN release: 2025-01-30

### Breaking changes

- The navbar-related style options of
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  and
  [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  have been consolidated into a single `navbar_options` argument that
  pairs with a new
  [`navbar_options()`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  helper. Using the direct `position`, `bg`, `inverse`, `collapsible`,
  and `underline` arguments will continue to work with a deprecation
  message. ([\#1141](https://github.com/rstudio/bslib/issues/1141))

  Related to the above change,
  [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  now defaults to using `underline = TRUE` so that both
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  and
  [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  use the same set of default
  [`navbar_options()`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md).

  In
  [`navbar_options()`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md),
  `inverse` is replaced by `theme`, which takes values `"light"` (dark
  text on a **light** background), `"dark"` (light text on a **dark**
  background), or `"auto"` (follow page settings, the default). This
  change affects that default navbar foreground and background colors
  for Bootswatch preset themes with Bootstrap 5. Detailed instructions
  for customizing the navbar appearance, especially for Bootswatch
  themes, can be found in
  [`?navbar_options`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md).
  ([\#1146](https://github.com/rstudio/bslib/issues/1146))

### New features

- bslib now supports unified theming with
  [brand.yml](https://posit-dev.github.io/brand-yml/). brand.yml lets
  you theme your Shiny apps, Quarto documents and more with a single,
  portable YAML file. Learn more in the new [Unified theming with
  brand.yml](https://rstudio.github.io/bslib/dev/articles/brand-yml/)
  article. ([\#1148](https://github.com/rstudio/bslib/issues/1148))

### Improvements and bug fixes

- `navset_card_pills()`,
  [`navset_card_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md),
  `navset_card_tabs()` fixed to now respect header/footer arguments
  ([@tanho63](https://github.com/tanho63),
  [\#1024](https://github.com/rstudio/bslib/issues/1024))

- Fixed a bug in
  [`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  (and
  [`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md))
  that caused it to stop applying changes if a Sass variable was `NULL`.
  ([@meztez](https://github.com/meztez),
  [\#1112](https://github.com/rstudio/bslib/issues/1112))

- Optimized for better performance the internal functions that compile
  Sass to call the `color-contrast()` algorithm.
  ([\#1140](https://github.com/rstudio/bslib/issues/1140))

- [`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  and
  [`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md)
  can be included in Shiny’s [bookmarking
  feature](https://shiny.posit.co/r/articles/share/bookmarking-state/).
  ([\#1166](https://github.com/rstudio/bslib/issues/1166))

- Fixed an issue with the Shiny preset (`bs_theme(5, "shiny")`) that
  caused a floating underling to appear when a
  [`nav_panel_hidden()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  was used and active.
  ([\#1170](https://github.com/rstudio/bslib/issues/1170))

- bslib now uses navbar markup with Bootstrap 5 that’s closer to the
  expected markup for Bootstrap. We still include the `navbar-default`
  or `navbar-inverse` classes on the `<nav>` element, for backwards
  compatibility, but in apps that use Bootstrap 5 these classes have no
  styles. ([\#1146](https://github.com/rstudio/bslib/issues/1146))

- The following functions are no longer marked “experimental”:
  [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md),
  [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md),
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md),
  [`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md),
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md),
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md),
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md),
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md),
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
  [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
  [`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  and
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md).

## bslib 0.8.0

CRAN release: 2024-07-29

### Breaking changes

- To help reduce the potential for squashed content, the main content
  area of
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  and
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  with a `sidebar` now have a (customizable) minimum height and width on
  a “medium-sized” window. To revert to previous behavior, set
  `theme = bs_theme("bslib-page-main-min-height" = "unset", "bslib-page-main-min-width" = "unset")`.
  ([\#1057](https://github.com/rstudio/bslib/issues/1057),
  [\#1059](https://github.com/rstudio/bslib/issues/1059),
  [\#1084](https://github.com/rstudio/bslib/issues/1084))

- [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  had a couple breaking changes
  ([\#1076](https://github.com/rstudio/bslib/issues/1076)):

  - `fill` now defaults to `FALSE` to avoid stretching/shrinking the
    image vertically (and thus, changing it’s aspect ratio). To restore
    the previous behavior, set `fill = TRUE`.
  - `container` now defaults to `NULL` instead of `card_body`. As a
    result,
    [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
    no longer has padding around it, making it easier to create
    “full-bleed” card images ([for
    example](https://getbootstrap.com/docs/5.3/components/card/#images)).
    To restore the previous behavior, wrap
    [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
    in a
    [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).

### New features

- [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  gains several new features
  ([\#1076](https://github.com/rstudio/bslib/issues/1076)):
  - `alt` is now a formal argument and is set to `""` by default. This
    default value marks images as decorative; please describe the image
    in the `alt` attribute if it is not decorative.
  - `border_radius` now defaults to `"auto"` by default, in which case
    the image’s position in the card will automatically determine
    whether it should receive the `.card-img-top` (first child),
    `.card-img-bottom` (last child) or `.card-img` (only child).
  - `file` is designed to accept a path to a local (server-side) file,
    but now recognizes remote files that start with a protocol prefix,
    e.g. `https://`, or two slashes, e.g. `//`. Local files are
    base64-encoded and embedded in the HTML output, while remote files
    are linked directly. To use a relative path for a file that will be
    served by the Shiny app, use `src` instead of file,
    e.g. `card_image(src = "cat.jpg")` where `cat.jpg` is stored in
    `www/`.
- The `open` argument of
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  now includes the option to place a sidebar that’s always open on
  mobile screens *above the main content* with
  `open = list(mobile = "always-above")`.
  ([\#1088](https://github.com/rstudio/bslib/issues/1088))

### Improvements

- Adjusted the border color of checkbox and radio buttons to match the
  border color of the input group in `bs_theme(preset="shiny")`.
  ([\#1038](https://github.com/rstudio/bslib/issues/1038))

- On mobile, the main and sidebar content areas of a
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  no longer overlap with the sidebar toggle button.
  ([\#1084](https://github.com/rstudio/bslib/issues/1084))

- bslib now re-exports
  [`htmltools::css()`](https://rstudio.github.io/htmltools/reference/css.html)
  to make it easier to specify style declarations.
  ([\#1086](https://github.com/rstudio/bslib/issues/1086))

- Example apps provided with bslib have now moved from `examples` to
  `examples-shiny` to take advantage of the new `package` argument in
  [`shiny::runExample()`](https://rdrr.io/pkg/shiny/man/runExample.html)
  with shiny \>= 1.8.1. For example, try
  `shiny::runExample("build-a-box", package = "bslib")`.
  ([\#1049](https://github.com/rstudio/bslib/issues/1049))

### Bug fixes

- [`toggle_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  once again correctly closes a sidebar.
  ([@fredericva](https://github.com/fredericva),
  [\#1043](https://github.com/rstudio/bslib/issues/1043))

- bslib now avoids re-defining its components when used in a context
  where they are already available, e.g. in a Quarto dashboard.
  ([\#1045](https://github.com/rstudio/bslib/issues/1045))

- Improved the appearance of cards with sidebars and headers in the
  Shiny preset, especially when custom card color themes are used,
  e.g. with `text-bg-primary` or other Bootstrap utility classes.
  ([\#1056](https://github.com/rstudio/bslib/issues/1056))

- When `card_body(fillable = FALSE)`, bslib now preserves flow-layout
  margin bottom settings.
  ([\#1073](https://github.com/rstudio/bslib/issues/1073))

- Fixed a bug in
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  that caused a spurious and confusing error message.
  ([\#1081](https://github.com/rstudio/bslib/issues/1081))

## bslib 0.7.0

CRAN release: 2024-03-29

This large release includes many improvements and bug fixes for newer UI
components like
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md),
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md), and
[`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md).
In addition, the new
[`input_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md)
offers a drop-in replacement for
[`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
(to prevent multiple submissions of the same operation) as well as
pairing nicely with the new
[`shiny::ExtendedTask`](https://rdrr.io/pkg/shiny/man/ExtendedTask.html)
for implementing truly non-blocking operations in Shiny.

### New features

- Added
  [`input_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md),
  a replacement for
  [`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
  that automatically prevents an operation from being submitted multiple
  times. It does this by, upon click, immediately transitioning to a
  “Processing…” visual state that does not let the button be clicked
  again. The button resets to its clickable state automatically after
  the reactive flush it causes is complete; or, for advanced scenarios,
  [`update_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md)
  can be used to manually control when the button resets.

- Both [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)
  and
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  now take an `id` argument that, when provided, is used to report the
  full screen state of the card or value box to the server. For example,
  when using `card(id = "my_card", full_screen = TRUE)` you can
  determine if the card is currently in full screen mode by reading the
  boolean value of `input$my_card_full_screen`.
  ([\#1006](https://github.com/rstudio/bslib/issues/1006),
  [\#1032](https://github.com/rstudio/bslib/issues/1032))

### Changes & improvements

- For
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md):

  - The page-level `sidebar` for
    [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)/[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
    is now always open (and not collapsible) by default on mobile
    screens. To revert to the old behavior, set `open = "desktop"` in
    the `sidebar`.
    ([\#943](https://github.com/rstudio/bslib/issues/943))

  - `open` now accepts a list with `mobile` and `desktop` values to
    control the sidebar’s initial state on each screen size, choosing
    from `"open"`, `"closed"`, or `"always"` (for an always-open sidebar
    that cannot be collapsed).
    ([\#943](https://github.com/rstudio/bslib/issues/943))

  - The collapse toggle now has a high `z-index` value to ensure it
    always appears above elements in the main content area. The sidebar
    overlay also now receives the same high `z-index` on mobile layouts.
    ([\#958](https://github.com/rstudio/bslib/issues/958))

- Improved `card(full_screen = TRUE, ...)` accessibility:

  - Full-screen cards are now supported on mobile devices: the *Expand
    card* button is revealed when a user taps on the card (thanks
    [@Damonsoul](https://github.com/Damonsoul),
    [\#961](https://github.com/rstudio/bslib/issues/961)).

  - The *Expand card* button is now accessible via keyboard navigation
    and appropriate ARIA attributes connect the card with the expand and
    close buttons.

  - For JavaScript-oriented users, the expansion/collapse is now
    accompanied by a custom `bslib.card` event with the full screen
    state reported in the `event.detail.fullScreen` property.
    ([\#959](https://github.com/rstudio/bslib/issues/959))

- Improvements to the default theme (i.e., Shiny preset):

  - In the default theme, cards now use a slightly smaller shadow and
    the same shadow style is also now used by popovers.
    ([\#998](https://github.com/rstudio/bslib/issues/998))

  - Increased spacing between elements. This change is most noticeable
    in the
    [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
    or
    [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
    component. In these and other components, you can use `gap` and
    `padding` arguments to choose your own values, or you can set the
    `$bslib-spacer` (Sass) or `--bslib-spacer` (CSS) variable.
    ([\#998](https://github.com/rstudio/bslib/issues/998))

- For
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md):

  - `col_widths` now sets the `sm` breakpoint by default, rather than
    the `md` breakpoint. For example, `col_widths = c(12, 6, 6)` is now
    equivalent to `breakpoints(sm = c(12, 6, 6))` rather than
    `breakpoints(md = c(12, 6, 6))`.
    ([\#1014](https://github.com/rstudio/bslib/issues/1014))

  - When `col_widths` has a
    [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
    at `lg` or wider, it now uses a better default column width for the
    smaller breakpoints not listed in the `col_widths` value. That said,
    you can always include `sm` or `md` in your
    [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
    definition to have complete control over column widths at those
    sizes. ([\#931](https://github.com/rstudio/bslib/issues/931))

  - When `row_heights` is a
    non-[`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
    object, that value is used for the row heights at all breakpoints.
    Previously, it was used for the row heights from `"sm"` up.
    ([\#931](https://github.com/rstudio/bslib/issues/931))

  - When an integer value for any breakpoint is provided to
    `col_widths`, a 12-unit grid is always used. For example,
    `breakpoints(md = 3, lg = NA)` will pick a best-fitting layout for
    large screen sizes using the 12-column grid. Previously, the best
    fit algorithm might adjust the number of columns as a shortcut to an
    easy solution. That shortcut is only taken when an auto-fit layout
    is requested for every breakpoint,
    e.g. `col_widths = breakpoints(md = NA, lg = NA)` or
    `col_widths = NA`.
    ([\#928](https://github.com/rstudio/bslib/issues/928))

  - Underlying logic moved from R to Typescript to improve the
    portability of the component.
    ([\#931](https://github.com/rstudio/bslib/issues/931))

- [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md),
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
  and
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  now all have `min_height` and `max_height` arguments. These are useful
  in filling layouts, like
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md),
  `page_sidebar(fillable = TRUE)` or `page_navbar(fillable = TRUE)`. For
  example, you can use
  `layout_columns(min_height = 300, max_height = 500)` to ensure that a
  set of items (likely arranged in a row of columns) are always between
  300 and 500 pixels tall.
  ([\#1016](https://github.com/rstudio/bslib/issues/1016))

- [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  now places the `title` element in a `.navbar` container that matches
  the structure of
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md).
  This ensures that the title elements of
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  and
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  have consistent appearance.
  ([\#998](https://github.com/rstudio/bslib/issues/998))

- [`as_fillable_container()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md),
  [`as_fill_item()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  and
  [`as_fill_carrier()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  now always include the htmltools fill CSS dependency. This means that
  they are no longer usable with the `$addAttr()`
  [`htmltools::tagQuery`](https://rstudio.github.io/htmltools/reference/tagQuery.html)
  method; authors should instead pass elements to the
  [`as_fillable_container()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  and `as_fill_*()` functions and use the `css_selector` argument to
  apply fill options to specific elements.
  ([\#946](https://github.com/rstudio/bslib/issues/946))

### Bug fixes

- Fixed an issue where the page might be given a window title of `NA` if
  the primary `title` argument of a page function, such as
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md),
  is `NULL` or a suitable window title could not be inferred.
  ([\#933](https://github.com/rstudio/bslib/issues/933))

- [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)s
  (and
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)s)
  now correctly exit full screen mode when they are removed from the UI.
  If you want to update a card without potentially exiting the
  full-screen mode, update specific parts of the card using
  [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) or
  [`textOutput()`](https://rdrr.io/pkg/shiny/man/textOutput.html).
  ([\#1005](https://github.com/rstudio/bslib/issues/1005))

- Fixed a handful of
  [`update_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  bugs. ([\#747](https://github.com/rstudio/bslib/issues/747),
  [\#1017](https://github.com/rstudio/bslib/issues/1017))

- [`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  and
  [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  now work as expected when inserted into a navbar/navset via
  [`nav_insert()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md).
  ([\#1020](https://github.com/rstudio/bslib/issues/1020))

- [`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) and
  [`conditionalPanel()`](https://rdrr.io/pkg/shiny/man/conditionalPanel.html)
  no longer result in unwanted double padding when their parent
  container uses `gap` for spacing multiple elements (e.g.,
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md),
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md),
  etc). ([\#992](https://github.com/rstudio/bslib/issues/992),
  [\#1031](https://github.com/rstudio/bslib/issues/1031))

- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  and
  [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  now validate and transform `padding` and `gap` arguments into
  appropriate CSS values.
  ([\#991](https://github.com/rstudio/bslib/issues/991))

- Fixed an issue where the `xs` breakpoint in a
  [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
  object used for `row_heights` in
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
  would override all other breakpoints.
  ([\#1014](https://github.com/rstudio/bslib/issues/1014))

## bslib 0.6.2

CRAN release: 2024-03-22

Increased the version requirement on the
[sass](https://rstudio.github.io/sass/) package to 0.4.9. As a result,
`font_google(local=TRUE)` should no longer fail to download font files.

## bslib 0.6.1

CRAN release: 2023-11-28

### Bug fixes

- Fixed the CSS for the `bslib-page-dashboard` class in the Shiny preset
  to correctly support `page_sidebar(class = "bslib-page-dashboard")`
  and `page_navbar(nav_panel(class = "bslib-page-dashboard"))`.
  ([\#917](https://github.com/rstudio/bslib/issues/917))

- Fixed a minor bug to allow the themer demo to be run directly, outside
  of
  [`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md).
  ([\#918](https://github.com/rstudio/bslib/issues/918))

## bslib 0.6.0

CRAN release: 2023-11-21

### Breaking changes

- [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  now defaults to `preset="shiny"`. This provides an additional set of
  theming defaults and rules that make it easier to create Shiny apps
  (in particular, dashboards) that look good out of the box. To revert
  to the previous behavior, set `bs_theme(preset="bootstrap")`.
  ([\#711](https://github.com/rstudio/bslib/issues/711))

- [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  no longer defaults to `theme_color = "primary"`. To restore the
  previous behavior, please use `theme = "primary"`. In addition to the
  default style change, the `theme_color` is now deprecated in favor of
  `theme`. ([\#758](https://github.com/rstudio/bslib/issues/758))

- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  now defaults to `underline = TRUE`, meaning that navigation links in
  the navbar now have underline styling by default (set
  `underline = FALSE` to revert to previous behavior).
  ([\#784](https://github.com/rstudio/bslib/issues/784))

- [`page()`](https://rstudio.github.io/bslib/dev/reference/page.md) now
  returns a `<body>` tag instead of
  [`tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html).
  This change allows
  [`page()`](https://rstudio.github.io/bslib/dev/reference/page.md) to
  treat named arguments as HTML attributes for the `<body>` tag, making
  it possible to add page-level classes or other attributes.
  ([\#809](https://github.com/rstudio/bslib/issues/809))

- The JS/CSS assets behind [bslib](https://rstudio.github.io/bslib/)
  components (e.g.,
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md),
  etc) are all now bundled into one
  [`htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html)
  and included with the return value of
  [`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md)
  (previously they were attached at the component-level).
  ([\#810](https://github.com/rstudio/bslib/issues/810))

- [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  no longer requires `width` and `width` is no longer the first
  argument, meaning that `width` must be named if used. The new default
  is `width = "200px"`, which combines with `fixed_width = FALSE` to
  produce a responsive layout where each column is at least 200px wide.
  This means that, in most cases,
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  can automatically layout an unknown number of items without you having
  to set `width`. ([\#853](https://github.com/rstudio/bslib/issues/853))

### New features

- The default version of Bootstrap is now v5.3.1, upgraded from v5.2.2.
  The most notable thing that comes with the update is the ability to
  toggle between light/dark [color
  modes](https://getbootstrap.com/docs/5.3/customize/color-modes/)
  purely client-side (i.e., no calls to Sass required).
  ([\#749](https://github.com/rstudio/bslib/issues/749),
  [\#764](https://github.com/rstudio/bslib/issues/764))

- Added
  [`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md),
  a new input control that provides a toggle button that can be used to
  switch between the dark and light modes when using Bootstrap 5.3. By
  default, dark mode is applied automatically if the user’s operating
  system is also in dark mode. App authors can toggle dark mode
  programmatically from the server using
  [`toggle_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md),
  and if you provide
  [`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md)
  with an `id`, you can read the current color mode via the
  corresponding input value.
  ([\#787](https://github.com/rstudio/bslib/issues/787))

- Shiny’s Bootstrap theme preset is now used by default in
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  and all related `page_*()` functions in bslib. This theme brings a
  fresh new design to all Shiny apps and dashboards created with bslib.
  This dashboard design anticipates heavy use of cards for organizing
  content, and works best with a gray background for contrast with
  minimalistic white cards. This treatment can be enabled in
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md),
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
  and other `page_*()` functions by adding the `bslib-page-dashboard`
  class to the page container or body tag.

  The preset can also be customized using the `$bslib-dashboard-design`
  and `$bslib-enable-shadows` Sass variables. Set these to `false` to
  disable the dashboard treatment and card shadows, respectively. These
  variables can be set via
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md),
  e.g. `bs_theme("bslib-dashboard-design" = "false")`.
  ([\#897](https://github.com/rstudio/bslib/issues/897),
  [\#906](https://github.com/rstudio/bslib/issues/906))

- [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  has been updated with a number of new features and improvements:

  - [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    now supports many new themes and styles, or fully customizable
    themes using the new
    [`value_box_theme()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    function. To reflect the new capabilities, we’ve replaced
    `theme_color` with a new `theme` argument. The previous argument
    will continue work as expected, but with a deprecation warning.
    ([\#758](https://github.com/rstudio/bslib/issues/758))

    In addition to the Bootstrap theme names (`primary` ,`secondary`,
    etc.), you can now use the main Boostrap colors (`purple`, `blue`,
    `red`, etc.). You can also choose to apply the color to the
    background or foreground by prepending a `bg-` or `text-` prefix to
    the theme or color name. Finally, we’ve also added new gradient
    themes allowing you to pair any two color names as
    `bg-gradient-{from}-{to}` (e.g., `bg-gradient-purple-blue`).

    These named color themes aren’t limited to value boxes: because
    they’re powered by small utility classes, you can use them anywhere
    within your bslib-powered UI.

  - Added
    [`showcase_bottom()`](https://rstudio.github.io/bslib/dev/reference/value_box.md),
    a new
    [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    layout that places the showcase below the value box title and value,
    perfect for a full-bleed plot.
    ([\#758](https://github.com/rstudio/bslib/issues/758))

  - [`showcase_left_center()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    and
    [`showcase_top_right()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    no longer take two values for the `width` argument. Instead, they
    now take a single value (e.g., `width = "30%"`) representing the
    width of the showcase are in the value box. Furthermore, they’ve
    both gained `width_full_screen` arguments that determine the width
    of the showcase area when the value box is expanded to fill the
    screen. ([\#758](https://github.com/rstudio/bslib/issues/758))

  - The `showcase_layout` argument of
    [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
    now accepts one of three character values: `"left center"`,
    `"top right"`, `"bottom"`.
    ([\#758](https://github.com/rstudio/bslib/issues/758))

  - A new [Build a Box app](https://bslib.shinyapps.io/build-a-box/) is
    now available online or via bslib. See `?value_box()` for details.
    The app helps preview a set of value boxes while you configure and
    customize their appearance and provides you with code to copy and
    paste into your app.
    ([\#790](https://github.com/rstudio/bslib/issues/790))

- Added new
  [`navset_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  &
  [`navset_card_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  functions as well as a `underline` argument to
  [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  to leverage the new
  [nav-underline](https://getbootstrap.com/docs/5.3/components/navs-tabs/#underline)
  styling on navigation links.
  ([\#784](https://github.com/rstudio/bslib/issues/784))

### Improvements

- The
  [`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  app now supports previewing the dark mode variant of Bootstrap 5
  themes. ([\#767](https://github.com/rstudio/bslib/issues/767))

- Improved the style and appearance of the button to enter full screen
  in [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md)s
  and
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)es
  to better adapt to Bootstrap’s dark mode.
  ([\#780](https://github.com/rstudio/bslib/issues/780))

- [`htmltools::save_html()`](https://rstudio.github.io/htmltools/reference/save_html.html)
  now works as expected when applied directly to components (e.g.,
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  etc) and pages with a non-default theme.
  ([\#823](https://github.com/rstudio/bslib/issues/823),
  [\#815](https://github.com/rstudio/bslib/issues/815))

- [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  received a new design. The button to collapse and expand the sidebar
  now appears at the top (instead of the bottom) of the sidebar. On
  mobile devices, the sidebar now fills the
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  area as an overlay, rather than expanding from above the main content
  area. **Note** the `max_mobile_height` argument of
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  determines the maximum height of the sidebar area on mobile, but it
  now only applies when `open = "always"`.
  ([\#798](https://github.com/rstudio/bslib/issues/798))

- [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  now uses an `<aside>` element for the sidebar’s container and a
  `<header>` element for the sidebar title. The classes of each element
  remain the same, but the semantic meaning of the elements is now
  better reflected in the HTML markup.
  ([\#580](https://github.com/rstudio/bslib/issues/580))

- In
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md),
  when `width` is a CSS unit – e.g. `width = "400px"` or `width = "25%"`
  – and `fixed_width = FALSE`,
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  will ensure that the columns are at least `width` wide, unless the
  parent container is narrower than `width`.
  ([\#851](https://github.com/rstudio/bslib/issues/851))

- [`bs_global_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  gains a `preset` argument to match the function signature of
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md).
  ([\#896](https://github.com/rstudio/bslib/issues/896))

### Bug fixes

- [`toggle_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  now works correctly when called from within a Shiny module.
  [`update_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  worked as expected, but
  [`toggle_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  didn’t apply the module’s namespace to the `id` of the switch to be
  updated. ([\#769](https://github.com/rstudio/bslib/issues/769))

- Filter controls in the popovers of
  [`DT::datatable()`](https://rdrr.io/pkg/DT/man/datatable.html) tables
  now better match the current Bootstrap theme and are responsive to the
  dark mode setting in Bootstrap 5.3.
  ([\#267](https://github.com/rstudio/bslib/issues/267),
  [\#775](https://github.com/rstudio/bslib/issues/775)).

- A double border no longer appears when an accordion is used inside a
  `sidebar(open="always")` context.
  ([\#795](https://github.com/rstudio/bslib/issues/795))

- [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  no longer gives the sidebar main content area the `role="main"`
  attribute. ([\#580](https://github.com/rstudio/bslib/issues/580))

## bslib 0.5.1

CRAN release: 2023-08-11

### New features

- Added
  [`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
  [`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
  and
  [`toggle_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  for easy creation (and server-side updating) of [Bootstrap
  tooltips](https://getbootstrap.com/docs/5.2/components/tooltips/) (a
  way to display additional information when focusing (or hovering over)
  a UI element). ([\#662](https://github.com/rstudio/bslib/issues/662))
- Added
  [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
  [`update_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
  and
  [`toggle_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  for easy creation (and server-side updating) of [Bootstrap
  popovers](https://getbootstrap.com/docs/5.2/components/popovers/).
  Popovers are similar to tooltips, but are more persistent, and should
  primarily be used with button-like UI elements (e.g.,
  [`actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html),
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html),
  etc). ([\#702](https://github.com/rstudio/bslib/issues/702))
- Added
  [`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  and
  [`update_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  for easy creation (and server-side updating) of a [Bootstrap’s switch
  input](https://getbootstrap.com/docs/5.2/forms/checks-radios/#switches)
  (an on-off toggle for binary input values).
  ([\#483](https://github.com/rstudio/bslib/issues/483))
- Added two new toggle functions:
  [`toggle_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  for toggling the state of an
  [`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  element and
  [`toggle_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  for toggling the state of a
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  element
  ([`sidebar_toggle()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  remains as an alias of
  [`toggle_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)).
  ([\#709](https://github.com/rstudio/bslib/issues/709))

### Improvements

- Closed quarto-dev/quarto-cli#6081:
  [bslib](https://rstudio.github.io/bslib/)’s components (e.g.,
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
  etc.) now work more sensibly in Quarto docs.
  ([\#664](https://github.com/rstudio/bslib/issues/664))
- Closed [\#672](https://github.com/rstudio/bslib/issues/672):
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  gains `gap` and `padding` arguments to control the vertical gap
  between items in the sidebar and the padding around the sidebar’s
  content. ([\#725](https://github.com/rstudio/bslib/issues/725))

### Bug fixes

- Closed [\#636](https://github.com/rstudio/bslib/issues/636): Outputs
  in sidebars now work as expected when an initially-closed sidebar is
  opened. ([\#624](https://github.com/rstudio/bslib/issues/624))
- Closed [\#640](https://github.com/rstudio/bslib/issues/640):
  [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  no longer errors when an `id` isn’t supplied inside a Shiny `session`
  context. ([\#646](https://github.com/rstudio/bslib/issues/646))
- Closed [\#639](https://github.com/rstudio/bslib/issues/639):
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)’s
  `icon` argument now supports generic
  [`HTML()`](https://rstudio.github.io/htmltools/reference/HTML.html),
  meaning that things like
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html)
  and
  [`fontawesome::fa()`](https://rstudio.github.io/fontawesome/reference/fa.html)
  can be used as values.
  ([\#645](https://github.com/rstudio/bslib/issues/645))
- Light-styled buttons in bslib-provided Bootswatch themes are now
  consistent with their design in Bootswatch. Previously, they were
  inadvertently styled similarly to secondary buttons.
  ([\#687](https://github.com/rstudio/bslib/issues/687))
- Closed [\#727](https://github.com/rstudio/bslib/issues/727):
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  now enforces equal column widths by avoiding layout issues caused by
  grid container overflow.
  ([\#729](https://github.com/rstudio/bslib/issues/729))

## bslib 0.5.0

CRAN release: 2023-06-09

This significant release focuses on making dashboards with
filling/responsive layouts easier. See the new [Getting Started with
Dashboards
article](https://rstudio.github.io/bslib/articles/dashboards.html) to
learn more. It also includes new components
([`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md))
as well as many improvements and bug fixes for existing features and
components.

[bslib](https://rstudio.github.io/bslib/)’s dashboarding features are
still experimental at this point, but this release represents a
significant step towards being our recommended way to create Shiny
dashboards.

### Breaking changes / improvements

- [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  now provides the same behavior as
  [`card_body_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  (i.e., it is both a fillable container and fill item) by default. And,
  now, since
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  can do everything
  [`card_body_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  can do,
  [`card_body_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  has been deprecated. The main benefit of this change is that
  `card(full_screen = TRUE, ...)` with output(s) passed to `...` “just
  works” in an intuitive way. To revert to the previous behavior, set
  `fillable = FALSE` and `fill = FALSE` in calls to
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  and set
  `wrapper = function(x) card_body(x, fillable = FALSE, fill = FALSE)`
  in calls to
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md).
  ([\#498](https://github.com/rstudio/bslib/issues/498))
- Closed [\#375](https://github.com/rstudio/bslib/issues/375):
  `margin-top` is no longer included on header tags that aren’t created
  via pandoc. If this negatively impacts spacing above headers, consider
  adding a suitable [utility
  class](https://rstudio.github.io/bslib/articles/utility-classes.html)
  (for example, change `shiny::titlePanel("My title")` to
  `tagAppendAttributes(titlePanel("My title"), class = "mt-3", .selector = "h2")`).
  ([\#396](https://github.com/rstudio/bslib/issues/396))
- [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  (now called
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md))
  had several breaking changes (listed below) to better accommodate
  filling layouts. If this breaks existing behavior, consider using
  `shiny::fillPage(theme = bslib::bs_theme(), ...)` instead of
  [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md).
  - [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    now produces a `<body>` tag with `display:flex` (instead of
    `display:block`).
  - [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    no longer fills the windows height on mobile (i.e., narrow screens)
    by default (set `fillable_mobile = TRUE` to restore the old
    behavior).
  - [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    now adds `padding` and `gap` by default, set `padding = 0` and
    `gap = 0` to restore the old behavior.
- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  (and also
  [`shiny::navbarPage()`](https://rdrr.io/pkg/shiny/man/navbarPage.html)
  with `theme = bs_theme()`) had a couple breaking changes:
  - The container of each page is now `display:flex` (instead of
    `display:block`). If this breaks existing behavior, set
    [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)’s
    `fillable` argument to `FALSE`.
  - `header` and `footer` is no longer wrapped in an additional
    [`shiny::fluidRow()`](https://rdrr.io/pkg/shiny/man/fluidPage.html)
    container. If this breaks existing behavior, consider wrapping the
    `header` and `footer` value(s) with
    [`shiny::fluidRow()`](https://rdrr.io/pkg/shiny/man/fluidPage.html)).
    ([\#479](https://github.com/rstudio/bslib/issues/479))
- [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)’s
  `fill` argument now controls whether or not the *layout container* is
  allowed to grow/shrink to fit a fillable container (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).
  It also gains a new `fillable` argument for controlling whether *UI
  elements* are allowed to fill their row height. This is more
  consistent with the meaning of `fill` in other functions, like
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md),
  etc. ([\#498](https://github.com/rstudio/bslib/issues/498))
- Defaults for the following Bootstrap 5 Sass variables were changed to
  `null`: `$accordion-button-active-bg`,
  `$accordion-button-active-color`, and `$accordion-icon-active-color`.
  To restore the old behavior, do
  `bs_add_variables(theme, "accordion-button-active-bg" = "tint-color($component-active-bg, 90%)", "accordion-button-active-color" = "shade-color($primary, 10%)", "accordion-icon-active-color" = "$accordion-button-active-color", .where = "declarations")`.
  ([\#475](https://github.com/rstudio/bslib/issues/475))

### New features

- Added
  [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md),
  for easy dashboard creation.
  ([\#588](https://github.com/rstudio/bslib/issues/588))
- Added a
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  API for creating sidebar layouts in various contexts. See [the
  article](https://rstudio.github.io/bslib/articles/sidebars/index.html)
  to learn more. ([\#479](https://github.com/rstudio/bslib/issues/479))
- Added
  [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md),
  for responsive column-based grid layouts.
  ([\#587](https://github.com/rstudio/bslib/issues/587))
- Adds a new
  [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  API. See
  [`help(accordion)`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  for examples and details. Note also
  [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  is designed to [work well inside a
  `sidebar()`](https://rstudio.github.io/bslib/articles/sidebars/index.html#sidebar-accordions).
  ([\#475](https://github.com/rstudio/bslib/issues/475))
- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md),
  [`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md),
  and
  [`navset_card_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  gain a `sidebar` argument for putting a
  [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  on every page/tab/pill.
  ([\#479](https://github.com/rstudio/bslib/issues/479))
- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  gains a `fillable` argument to make the content of particular page(s)
  fit the window/card.
  ([\#479](https://github.com/rstudio/bslib/issues/479))
- [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
  (aka,
  [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md))
  is now considered a `fillable` container, meaning that `fill` items
  like
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md),
  and
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  now grow/shrink to fit the window’s height when they appear as a
  direct child of
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md).
  ([\#479](https://github.com/rstudio/bslib/issues/479))
- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  and
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
  gain `fillable_mobile` arguments to control whether the page should
  grow/shrink to fit the viewport on mobile.
  ([\#479](https://github.com/rstudio/bslib/issues/479))
- [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md),
  and
  [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  gain `max_height`/`min_height` and `fill` arguments.
  ([\#498](https://github.com/rstudio/bslib/issues/498))
- [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  gains a `padding` argument.
  ([\#587](https://github.com/rstudio/bslib/issues/587))
- Added new `as_fill()`, `as_fillable()`,
  [`as_fill_carrier()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md),
  `is_fill()`, and `is_fillable()` for testing and coercing potential to
  fill. ([\#498](https://github.com/rstudio/bslib/issues/498))

### Bug fixes

- Closed [\#558](https://github.com/rstudio/bslib/issues/558): nested
  cards with `fullscreen = TRUE` now correctly and individually expand
  to fill the window. Tab focus behavior while in full screen mode has
  also been improved.
  ([\#557](https://github.com/rstudio/bslib/issues/557))
- Closed [\#573](https://github.com/rstudio/bslib/issues/573): Improved
  styling when a dynamic result is supplied to
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)’s
  `title`/`value` (e.g.,
  `value_box("Dynamic value", uiOutput("value"))`).
  ([\#605](https://github.com/rstudio/bslib/issues/605))

### Deprecations

- [`card_body_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  has been deprecated in favor of
  [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md).
  ([\#498](https://github.com/rstudio/bslib/issues/498))
- [`page_fill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  has been deprecated in favor of
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md).
  ([\#498](https://github.com/rstudio/bslib/issues/498))
- [`nav()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  has been deprecated in favor of
  [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  and
  [`nav_content()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  in favor of
  [`nav_panel_hidden()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md).
  ([\#476](https://github.com/rstudio/bslib/issues/476))
- The `navs_*()` family of functions have been deprecated in favor of
  `navset_*()` ([\#476](https://github.com/rstudio/bslib/issues/476)):
  - [`navs_tab()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    is now
    [`navset_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  - [`navs_pill()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    is now
    [`navset_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  - [`navs_pill_list()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    is now
    [`navset_pill_list()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  - [`navs_bar()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    is now
    [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  - [`navs_tab_card()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    and
    [`navs_pill_card()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
    are now
    [`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
    and
    [`navset_card_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md),
    respectively.

## bslib 0.4.2

CRAN release: 2022-12-16

### Potentially breaking changes

- Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.1.3 to
  5.2.2. ([\#438](https://github.com/rstudio/bslib/issues/438),
  [\#455](https://github.com/rstudio/bslib/issues/455))

### New features

- Adds a new
  [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) API
  as well as
  [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  and
  [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md).
  To learn more about this new functionality, refer to these new pkgdown
  articles:

  - <https://rstudio.github.io/bslib/articles/cards.html>
  - <https://rstudio.github.io/bslib/articles/value-boxes.html>
  - <https://rstudio.github.io/bslib/articles/column-layout.html>

## bslib 0.4.1

CRAN release: 2022-11-02

### Bug Fixes

- Closed [\#458](https://github.com/rstudio/bslib/issues/458). This
  release [bslib](https://rstudio.github.io/bslib/) now requires
  [memoise](https://memoise.r-lib.org) 2.0.1 or above.

## bslib 0.4.0

CRAN release: 2022-07-16

### Breaking changes

- [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  now defaults to `version = 5` (i.e., Bootstrap 5). If this change
  happens to break an existing app, consider specifying
  `bs_theme(version = 4)` to revert the change in the Bootstrap version.
  ([\#374](https://github.com/rstudio/bslib/issues/374))
- The default coloring on some Bootswatch 4+ theme’s
  `.navbar-default`/`.navbar-inverse` class has changed slightly to
  better match their Bootswatch 3 coloring. Also, since this coloring is
  now based solely on [`$navbar-*`
  variables](https://rstudio.github.io/bslib/articles/bs5-variables.html),
  Bootswatch themes now work better in combination with custom
  `$navbar-*` values (e.g., `bs_theme("navbar-bg" = ...)` can be used to
  provide the background color, and foreground colors will automatically
  contrast appropriately).
  ([\#392](https://github.com/rstudio/bslib/issues/392))

### New features

- Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.1.0 to
  5.1.3 ([\#378](https://github.com/rstudio/bslib/issues/378))
- Closed [\#369](https://github.com/rstudio/bslib/issues/369):
  [`bs_dependency_defer()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md)
  now memoises `func` (by default), reducing the time required to render
  multiple instances of the same [dynamically themable
  widget](https://rstudio.github.io/bslib/articles/custom-components.html#dynamically-themeable-component).
  ([\#405](https://github.com/rstudio/bslib/issues/405))

### Bug fixes

- Closed [\#393](https://github.com/rstudio/bslib/issues/393): Bootstrap
  5’s `$form-check-label-*` variables now work as expected with
  [`shiny::radioButtons()`](https://rdrr.io/pkg/shiny/man/radioButtons.html),
  [`shiny::checkboxInput()`](https://rdrr.io/pkg/shiny/man/checkboxInput.html),
  and
  [`shiny::checkboxGroupInput()`](https://rdrr.io/pkg/shiny/man/checkboxGroupInput.html).
  ([\#395](https://github.com/rstudio/bslib/issues/395))
- Closed [\#382](https://github.com/rstudio/bslib/issues/382): Various
  fixes for using
  [`shiny::checkboxInput()`](https://rdrr.io/pkg/shiny/man/checkboxInput.html),
  [`shiny::checkboxGroupInput()`](https://rdrr.io/pkg/shiny/man/checkboxGroupInput.html),
  and `shiny::radioButton()` with
  `bs_theme(version = 5, bootswatch = "sketchy")`.
  ([\#385](https://github.com/rstudio/bslib/issues/385))
- Closed [\#377](https://github.com/rstudio/bslib/issues/377): make sure
  `shiny::tabsetPanel(type = "hidden")` (i.e.,
  [`bslib::navs_hidden()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md))
  stays hidden when used with
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md).
  ([\#379](https://github.com/rstudio/bslib/issues/379))
- Closed [\#424](https://github.com/rstudio/bslib/issues/424): fixed an
  issue with
  [`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  appearing first in a `navs_*()` container with Bootstrap 4+.
- Closed [\#431](https://github.com/rstudio/bslib/issues/431): Bootstrap
  5 navbars no longer have an unwanted “Toggle Navigation” label when
  collapsed. ([\#432](https://github.com/rstudio/bslib/issues/432))
- Closed [\#400](https://github.com/rstudio/bslib/issues/400):
  `nav_menu(align="right")` now works with Bootstrap 5.
  ([\#401](https://github.com/rstudio/bslib/issues/401))
- Closed [\#390](https://github.com/rstudio/bslib/issues/390): using
  `bs_theme(bootswatch = "paper", version = 5)` or
  `bs_theme(bootswatch = "readable", version = 5)` no longer errors.
  ([\#391](https://github.com/rstudio/bslib/issues/391))

## bslib 0.3.1

CRAN release: 2021-10-06

### New features

- Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.0.2 to
  5.1.0 ([\#365](https://github.com/rstudio/bslib/issues/365))

### Bug fixes

- Closed rstudio/shiny#3519:
  [`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  (i.e.,
  [`shiny::navbarMenu()`](https://rdrr.io/pkg/shiny/man/navbarPage.html))
  wasn’t producing an `.active` class on it’s `.dropdown` container
  properly. ([\#372](https://github.com/rstudio/bslib/issues/372))

## bslib 0.3.0

CRAN release: 2021-09-02

### Breaking changes

- Closed rstudio/rmarkdown#2154:
  [magrittr](https://magrittr.tidyverse.org)’s pipe operator (`%>%`) is
  no longer re-exported by [bslib](https://rstudio.github.io/bslib/).
  Either [`library(magrittr)`](https://magrittr.tidyverse.org) to make
  `%>%` available and/or use use R 4.1’s pipe operator (`|>`).

### New features

- Closed [\#82](https://github.com/rstudio/bslib/issues/82): Added
  support for Bootstrap 5 (via `bs_theme(version = 5)`). Bootstrap 4
  remains the default in this release, but the next release, the default
  will likely change to Bootstrap 5.

### Bug fixes

- Closed [\#6](https://github.com/rstudio/bslib/issues/6): rmarkdown’s
  .tabset-fade class now works with Bootstrap 4+ since legacy use of
  .nav .fade is now officially supported in Bootstrap 4+.
  ([\#325](https://github.com/rstudio/bslib/issues/325))

## bslib 0.2.5.1

CRAN release: 2021-05-18

Small patch release to fix failing test on Solaris.

## bslib 0.2.5

CRAN release: 2021-05-12

### New features and improvements

- Closed [\#251](https://github.com/rstudio/bslib/issues/251): New
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  options (`navbar-bg`, `navbar-light-bg`, and `navbar-dark-bg`) for
  more easily customizing the navbar’s background (and foreground) color
  ([\#253](https://github.com/rstudio/bslib/issues/253),
  [\#271](https://github.com/rstudio/bslib/issues/271)).
- Closed [\#281](https://github.com/rstudio/bslib/issues/281): New
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  argument (`font_scale`) for easier scaling of the base font size
  ([\#288](https://github.com/rstudio/bslib/issues/288)).
- Closed [\#256](https://github.com/rstudio/bslib/issues/256) and
  [\#282](https://github.com/rstudio/bslib/issues/282): Font file
  importers
  ([`font_google()`](https://rstudio.github.io/bslib/dev/reference/font_face.md),
  [`font_link()`](https://rstudio.github.io/bslib/dev/reference/font_face.md),
  and
  [`font_face()`](https://rstudio.github.io/bslib/dev/reference/font_face.md))
  are now re-exported from the [sass](https://rstudio.github.io/sass/)
  package. As a result, they may now be used with any Sass variable
  (e.g., `bs_theme("input-font-family" = font_google("Pacifico"))`) as
  well as inside Rmd yaml without `!expr` (e.g.,
  `input-font-family: google: Pacifico` – see
  [\#256](https://github.com/rstudio/bslib/issues/256) for more
  details). A new
  [`font_collection()`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  function was also added for a more convenient way to specify font
  fallbacks ([\#291](https://github.com/rstudio/bslib/issues/291)).
- Closed [\#255](https://github.com/rstudio/bslib/issues/255):
  [`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  now emits sensible `yaml` front matter when used within an Rmd
  document ([\#288](https://github.com/rstudio/bslib/issues/288)).
- Closed [\#227](https://github.com/rstudio/bslib/issues/227):
  [`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  now overlays a spinner during Sass compilation
  ([\#243](https://github.com/rstudio/bslib/issues/243)).
- Closed [\#278](https://github.com/rstudio/bslib/issues/278):
  [bslib](https://rstudio.github.io/bslib/) now includes
  [`rmarkdown::html_document`](https://pkgs.rstudio.com/rmarkdown/reference/html_document.html)
  templates demonstrating example usage with
  [bslib](https://rstudio.github.io/bslib/) and
  [thematic](https://rstudio.github.io/thematic/)
  ([\#288](https://github.com/rstudio/bslib/issues/288)).
- Closed [\#231](https://github.com/rstudio/bslib/issues/231): Upgraded
  from Bootstrap 4.5.3 to 4.6.0
  ([\#254](https://github.com/rstudio/bslib/issues/254)).
- Closed [\#237](https://github.com/rstudio/bslib/issues/237):
  `<blockquote>` tags now have border-left/padding styles with
  `version = 4` (to mirror the `version = 3` behavior)
  ([\#239](https://github.com/rstudio/bslib/issues/239)).
- Closed [\#279](https://github.com/rstudio/bslib/issues/279): Warnings
  about low color contrasts are now suppressed by default, unless
  [`shiny::devmode()`](https://rdrr.io/pkg/shiny/man/devmode.html) is
  enabled. To enable/disable these warnings, set the new
  `options(bslib.color_contrast_warnings = )` to `TRUE`/`FALSE`
  ([\#287](https://github.com/rstudio/bslib/issues/287)).
- [`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md)
  now includes Sass source maps when
  [`shiny::devmode()`](https://rdrr.io/pkg/shiny/man/devmode.html) is
  enabled ([\#312](https://github.com/rstudio/bslib/issues/312)).
- Added new
  [`bs_add_functions()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)/[`bs_add_mixins()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  and deprecated
  [`bs_add_declarations()`](https://rstudio.github.io/bslib/dev/reference/deprecated.md)
  to reflect
  [`sass::sass_layer()`](https://rstudio.github.io/sass/reference/sass_layer.html)’s
  new ability to place `functions` *before* variable `defaults`. As a
  result, variable definitions may now use functions defined with
  [`bs_add_functions()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md).
  ([\#311](https://github.com/rstudio/bslib/issues/311))

### Bug fixes

- Closed [\#236](https://github.com/rstudio/bslib/issues/236),
  [\#230](https://github.com/rstudio/bslib/issues/230),
  [\#242](https://github.com/rstudio/bslib/issues/242),
  [\#187](https://github.com/rstudio/bslib/issues/187),
  [\#215](https://github.com/rstudio/bslib/issues/215),
  [\#250](https://github.com/rstudio/bslib/issues/250): Addressed
  various cosmetic issues with CSS
  ([\#249](https://github.com/rstudio/bslib/issues/249)).
- Closed [\#289](https://github.com/rstudio/bslib/issues/289): collapsed
  navbar toggle now correctly floats to the right
  ([\#290](https://github.com/rstudio/bslib/issues/290)).
- Closed
  [rstudio/flexdashboard#316](https://github.com/rstudio/flexdashboard/issues/316):
  fixed an issue with navbar nav spacing/alignment
  ([\#286](https://github.com/rstudio/bslib/issues/286)).

## bslib 0.2.4

CRAN release: 2021-01-25

- Initial release of the package, see <https://rstudio.github.io/bslib/>
