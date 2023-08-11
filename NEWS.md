# bslib 0.5.1

## New features

* Added `tooltip()`, `update_tooltip()`, and `toggle_tooltip()` for easy creation (and server-side updating) of [Bootstrap tooltips](https://getbootstrap.com/docs/5.2/components/tooltips/) (a way to display additional information when focusing (or hovering over) a UI element). (#662)
* Added `popover()`, `update_popover()`, and `toggle_popover()` for easy creation (and server-side updating) of [Bootstrap popovers](https://getbootstrap.com/docs/5.2/components/popovers/). Popovers are similar to tooltips, but are more persistent, and should primarily be used with button-like UI elements (e.g., `actionButton()`, `bsicons::bs_icon()`, etc). (#702)
* Added `input_switch()` and `update_switch()` for easy creation (and server-side updating) of a [Bootstrap's switch input](https://getbootstrap.com/docs/5.2/forms/checks-radios/#switches) (an on-off toggle for binary input values). (#483)
* Added two new toggle functions: `toggle_switch()` for toggling the state of an `input_switch()` element and `toggle_sidebar()` for toggling the state of a `sidebar()` element (`sidebar_toggle()` remains as an alias of `toggle_sidebar()`). (#709)

## Improvements

* Closed quarto-dev/quarto-cli#6081: `{bslib}`'s components (e.g., `card()`, `sidebar()`, etc.) now work more sensibly in Quarto docs. (#664)
* Closed #672: `sidebar()` gains `gap` and `padding` arguments to control the vertical gap between items in the sidebar and the padding around the sidebar's content. (#725)

## Bug fixes

* Closed #636: Outputs in sidebars now work as expected when an initially-closed sidebar is opened. (#624)
* Closed #640: `accordion()` no longer errors when an `id` isn't supplied inside a Shiny `session` context. (#646)
* Closed #639: `nav_panel()`'s `icon` argument now supports generic `HTML()`, meaning that things like `bsicons::bs_icon()` and `fontawesome::fa()` can be used as values. (#645)
* Light-styled buttons in bslib-provided Bootswatch themes are now consistent with their design in Bootswatch. Previously, they were inadvertently styled similarly to secondary buttons. (#687)
* Closed #727: `layout_column_wrap()` now enforces equal column widths by avoiding layout issues caused by grid container overflow. (#729)

# bslib 0.5.0

This significant release focuses on making dashboards with filling/responsive layouts easier. See the new [Getting Started with Dashboards article](https://rstudio.github.io/bslib/articles/dashboards.html) to learn more. It also includes new components (`accordion()`) as well as many improvements and bug fixes for existing features and components.

`{bslib}`'s dashboarding features are still experimental at this point, but this release represents a significant step towards being our recommended way to create Shiny dashboards.

## Breaking changes / improvements

* `card_body()` now provides the same behavior as `card_body_fill()` (i.e., it is both a fillable container and fill item) by default. And, now, since `card_body()` can do everything `card_body_fill()` can do, `card_body_fill()` has been deprecated. The main benefit of this change is that `card(full_screen = TRUE, ...)` with output(s) passed to `...` "just works" in an intuitive way. To revert to the previous behavior, set `fillable = FALSE` and `fill = FALSE` in calls to `card_body()` and set `wrapper = function(x) card_body(x, fillable = FALSE, fill = FALSE)` in calls to `card()`. (#498)
* Closed #375: `margin-top` is no longer included on header tags that aren't created via pandoc. If this negatively impacts spacing above headers, consider adding a suitable [utility class](https://rstudio.github.io/bslib/articles/utility-classes.html) (for example, change `shiny::titlePanel("My title")` to `tagAppendAttributes(titlePanel("My title"), class = "mt-3", .selector = "h2")`). (#396)
* `page_fill()` (now called `page_fillable()`) had several breaking changes (listed below) to better accommodate filling layouts. If this breaks existing behavior, consider using `shiny::fillPage(theme = bslib::bs_theme(), ...)` instead of `page_fill()`.
  * `page_fill()` now produces a `<body>` tag with `display:flex` (instead of `display:block`).
  * `page_fill()` no longer fills the windows height on mobile (i.e., narrow screens) by default (set `fillable_mobile = TRUE` to restore the old behavior).
  * `page_fill()` now adds `padding` and `gap` by default, set `padding = 0` and `gap = 0` to restore the old behavior.
* `page_navbar()` (and also `shiny::navbarPage()` with `theme = bs_theme()`) had a couple breaking changes:
  * The container of each page is now `display:flex` (instead of `display:block`). If this breaks existing behavior, set `page_navbar()`'s `fillable` argument to `FALSE`.
  * `header` and `footer` is no longer wrapped in an additional `shiny::fluidRow()` container. If this breaks existing behavior, consider wrapping the `header` and `footer` value(s) with `shiny::fluidRow()`). (#479)
* `layout_column_wrap()`'s `fill` argument now controls whether or not the _layout container_ is allowed to grow/shrink to fit a fillable container (e.g., `page_fillable()`). It also gains a new `fillable` argument for controlling whether _UI elements_ are allowed to fill their row height. This is more consistent with the meaning of `fill` in other functions, like `card()`, `card_body()`, `layout_sidebar()`, etc. (#498)
* Defaults for the following Bootstrap 5 Sass variables were changed to `null`: `$accordion-button-active-bg`, `$accordion-button-active-color`, and `$accordion-icon-active-color`. To restore the old behavior, do `bs_add_variables(theme, "accordion-button-active-bg" = "tint-color($component-active-bg, 90%)", "accordion-button-active-color" = "shade-color($primary, 10%)", "accordion-icon-active-color" = "$accordion-button-active-color", .where = "declarations")`. (#475)

## New features

* Added `page_sidebar()`, for easy dashboard creation. (#588)
* Added a `sidebar()` API for creating sidebar layouts in various contexts. See [the article](https://rstudio.github.io/bslib/articles/sidebars/index.html) to learn more. (#479)
* Added `layout_columns()`, for responsive column-based grid layouts. (#587)
* Adds a new `accordion()` API. See `help(accordion)` for examples and details. Note also `accordion()` is designed to [work well inside a `sidebar()`](https://rstudio.github.io/bslib/articles/sidebars/index.html#sidebar-accordions). (#475)
* `page_navbar()`, `navset_card_tab()`, and ` navset_card_pill()` gain a `sidebar` argument for putting a `sidebar()` on every page/tab/pill. (#479)
* `page_navbar()` gains a `fillable` argument to make the content of particular page(s) fit the window/card. (#479)
* `page_fillable()` (aka, `page_fill()`) is now considered a `fillable` container, meaning that `fill` items like `card()`, `layout_column_wrap()`, and `layout_sidebar()` now grow/shrink to fit the window's height when they appear as a direct child of `page_fillable()`. (#479)
* `page_navbar()` and `page_fillable()` gain `fillable_mobile` arguments to control whether the page should grow/shrink to fit the viewport on mobile. (#479)
* `card()`, `value_box()`, and `card_image()` gain `max_height`/`min_height` and `fill` arguments. (#498)
* `card_body()` gains a `padding` argument. (#587)
* Added new `as_fill()`, `as_fillable()`, `as_fill_carrier()`, `is_fill()`, and `is_fillable()` for testing and coercing potential to fill. (#498)

## Bug fixes

* Closed #558: nested cards with `fullscreen = TRUE` now correctly and individually expand to fill the window. Tab focus behavior while in full screen mode has also been improved. (#557)
* Closed #573: Improved styling when a dynamic result is supplied to `value_box()`'s `title`/`value` (e.g., `value_box("Dynamic value", uiOutput("value"))`). (#605)


## Deprecations

* `card_body_fill()` has been deprecated in favor of `card_body()`. (#498)
* `page_fill()` has been deprecated in favor of `page_fillable()`. (#498)
* `nav()` has been deprecated in favor of `nav_panel()` and `nav_content()` in favor of `nav_panel_hidden()`. (#476)
* The `navs_*()` family of functions have been deprecated in favor of `navset_*()` (#476):
  * `navs_tab()` is now `navset_tab()`
  * `navs_pill()` is now `navset_pill()`
  * `navs_pill_list()` is now `navset_pill_list()`
  * `navs_bar()` is now `navset_bar()`
  * `navs_tab_card()` and `navs_pill_card()` are now `navset_card_tab()` and `navset_card_pill()`, respectively.

# bslib 0.4.2

## Potentially breaking changes

* Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.1.3 to 5.2.2. (#438, #455)

## New features

* Adds a new `card()` API as well as `value_box()` and `layout_column_wrap()`. To learn more about this new functionality, refer to these new pkgdown articles:

  * https://rstudio.github.io/bslib/articles/cards.html
  * https://rstudio.github.io/bslib/articles/value-boxes.html
  * https://rstudio.github.io/bslib/articles/column-layout.html

# bslib 0.4.1

## Bug Fixes

* Closed #458. This release `{bslib}` now requires `{memoise}` 2.0.1 or above.

# bslib 0.4.0

## Breaking changes

* `bs_theme()` now defaults to `version = 5` (i.e., Bootstrap 5). If this change happens to break an existing app, consider specifying `bs_theme(version = 4)` to revert the change in the Bootstrap version. (#374)
* The default coloring on some Bootswatch 4+ theme's `.navbar-default`/`.navbar-inverse` class has changed slightly to better match their Bootswatch 3 coloring. Also, since this coloring is now based solely on [`$navbar-*` variables](https://rstudio.github.io/bslib/articles/bs5-variables.html), Bootswatch themes now work better in combination with custom `$navbar-*` values (e.g., `bs_theme("navbar-bg" = ...)` can be used to provide the background color, and foreground colors will automatically contrast appropriately). (#392)

## New features

* Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.1.0 to 5.1.3 (#378)
* Closed #369: `bs_dependency_defer()` now memoises `func` (by default), reducing the time required to render multiple instances of the same [dynamically themable widget](https://rstudio.github.io/bslib/articles/custom-components.html#dynamically-themeable-component). (#405)

## Bug fixes

* Closed #393: Bootstrap 5's `$form-check-label-*` variables now work as expected with `shiny::radioButtons()`, `shiny::checkboxInput()`, and `shiny::checkboxGroupInput()`. (#395)
* Closed #382: Various fixes for using `shiny::checkboxInput()`, `shiny::checkboxGroupInput()`, and `shiny::radioButton()` with `bs_theme(version = 5, bootswatch = "sketchy")`. (#385)
* Closed #377: make sure `shiny::tabsetPanel(type = "hidden")` (i.e., `bslib::navs_hidden()`) stays hidden when used with `bs_theme()`. (#379)
* Closed #424: fixed an issue with `nav_menu()` appearing first in a `navs_*()` container with Bootstrap 4+.
* Closed #431: Bootstrap 5 navbars no longer have an unwanted "Toggle Navigation" label when collapsed. (#432)
* Closed #400: `nav_menu(align="right")` now works with Bootstrap 5. (#401)
* Closed #390: using `bs_theme(bootswatch = "paper", version = 5)` or `bs_theme(bootswatch = "readable", version = 5)` no longer errors. (#391)

# bslib 0.3.1

## New features

* Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.0.2 to 5.1.0 (#365)

## Bug fixes

* Closed rstudio/shiny#3519: `nav_menu()` (i.e., `shiny::navbarMenu()`) wasn't producing an `.active` class on it's `.dropdown` container properly. (#372)

# bslib 0.3.0

## Breaking changes

* Closed rstudio/rmarkdown#2154: `{magrittr}`'s pipe operator (`%>%`) is no longer re-exported by `{bslib}`. Either `library(magrittr)` to make `%>%` available and/or use use R 4.1's pipe operator (`|>`).

## New features

* Closed #82: Added support for Bootstrap 5 (via `bs_theme(version = 5)`). Bootstrap 4 remains the default in this release, but the next release, the default will likely change to Bootstrap 5.

## Bug fixes

* Closed #6: rmarkdown's .tabset-fade class now works with Bootstrap 4+ since legacy use of .nav .fade is now officially supported in Bootstrap 4+. (#325)

# bslib 0.2.5.1

Small patch release to fix failing test on Solaris.

# bslib 0.2.5

## New features and improvements

* Closed #251: New `bs_theme()` options (`navbar-bg`, `navbar-light-bg`, and `navbar-dark-bg`) for more easily customizing the navbar's background (and foreground) color (#253, #271).
* Closed #281: New `bs_theme()` argument (`font_scale`) for easier scaling of the base font size (#288).
* Closed #256 and #282: Font file importers (`font_google()`, `font_link()`, and `font_face()`) are now re-exported from the `{sass}` package. As a result, they may now be used with any Sass variable (e.g., `bs_theme("input-font-family" = font_google("Pacifico"))`) as well as inside Rmd yaml without `!expr` (e.g., `input-font-family: google: Pacifico` -- see #256 for more details). A new `font_collection()` function was also added for a more convenient way to specify font fallbacks (#291).
* Closed #255: `bs_themer()` now emits sensible `yaml` front matter when used within an Rmd document (#288).
* Closed #227: `bs_themer()` now overlays a spinner during Sass compilation (#243).
* Closed #278: `{bslib}` now includes `rmarkdown::html_document` templates demonstrating example usage with `{bslib}` and `{thematic}` (#288).
* Closed #231: Upgraded from Bootstrap 4.5.3 to 4.6.0 (#254).
* Closed #237: `<blockquote>` tags now have border-left/padding styles with `version = 4` (to mirror the `version = 3` behavior) (#239).
* Closed #279: Warnings about low color contrasts are now suppressed by default, unless `shiny::devmode()` is enabled. To enable/disable these warnings, set the new `options(bslib.color_contrast_warnings = )` to `TRUE`/`FALSE` (#287).
* `bs_theme_dependencies()` now includes Sass source maps when `shiny::devmode()` is enabled (#312).
* Added new `bs_add_functions()`/`bs_add_mixins()` and deprecated `bs_add_declarations()` to reflect `sass::sass_layer()`'s new ability to place `functions` _before_ variable `defaults`. As a result, variable definitions may now use functions defined with `bs_add_functions()`. (#311)

## Bug fixes

* Closed #236, #230, #242, #187, #215, #250: Addressed various cosmetic issues with CSS (#249).
* Closed #289: collapsed navbar toggle now correctly floats to the right (#290).
* Closed [rstudio/flexdashboard#316](https://github.com/rstudio/flexdashboard/issues/316): fixed an issue with navbar nav spacing/alignment (#286).

# bslib 0.2.4

* Initial release of the package, see https://rstudio.github.io/bslib/
