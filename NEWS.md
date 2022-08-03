# bslib 0.4.0.9000

## Potentially breaking changes

* Upgraded Bootstrap 5 (i.e., `bs_theme(version = 5)`) from 5.1.3 to 5.2.0. (#438)


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
