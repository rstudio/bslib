# Compile Bootstrap Sass with (optional) theming

`bs_theme_dependencies()` compiles Bootstrap Sass into CSS and returns
it, along with other HTML dependencies, as a list of
[`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html)s.
Most users won't need to call this function directly as Shiny & R
Markdown will perform this compilation automatically when handed a
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md).
If you're here looking to create a themeable component, see
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md).

## Usage

``` r
bs_theme_dependencies(
  theme,
  sass_options = sass::sass_options_get(output_style = "compressed"),
  cache = sass::sass_cache_get(),
  jquery = jquerylib::jquery_core(3),
  precompiled = get_precompiled_option("bslib.precompiled", default = TRUE)
)
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- sass_options:

  a
  [`sass::sass_options()`](https://rstudio.github.io/sass/reference/sass_options.html)
  object.

- cache:

  This can be a directory to use for the cache, a
  [FileCache](https://rstudio.github.io/sass/reference/FileCache.html)
  object created by
  [`sass_file_cache()`](https://rstudio.github.io/sass/reference/sass_file_cache.html),
  or `FALSE` or `NULL` for no caching.

- jquery:

  a
  [`jquerylib::jquery_core()`](https://rdrr.io/pkg/jquerylib/man/jquery_core.html)
  object.

- precompiled:

  Before compiling the theme object, first look for a precompiled CSS
  file for the
  [`theme_version()`](https://rstudio.github.io/bslib/reference/theme_version.md).
  If `precompiled = TRUE` and a precompiled CSS file exists for the
  theme object, it will be fetched immediately and not compiled. At the
  moment, we only provide precompiled CSS for "stock" builds of
  Bootstrap (i.e., no theming additions, Bootswatch themes, or
  non-default `sass_options`).

## Value

Returns a list of HTML dependencies containing Bootstrap CSS, Bootstrap
JavaScript, and `jquery`. This list may contain additional HTML
dependencies if bundled with the `theme`.

## Sass caching and precompilation

If Shiny Developer Mode is enabled (by setting
`options(shiny.devmode = TRUE)` or calling `shiny::devmode(TRUE)`), both
sass caching and bslib precompilation are disabled by default; that is,
a call to `bs_theme_dependencies(theme)` expands to
`bs_theme_dependencies(theme, cache = F, precompiled = F)`). This is
useful for local development as enabling caching/precompilation may
produce incorrect results if local changes are made to bslib's source
files.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/reference/bs_theme_preview.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

# Function to preview the styling a (primary) Bootstrap button
library(htmltools)
button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
preview_button <- function(theme) {
  browsable(tags$body(bs_theme_dependencies(theme), button))
}

# Latest Bootstrap
preview_button(bs_theme())
# Bootstrap 3
preview_button(bs_theme(3))
# Bootswatch 4 minty theme
preview_button(bs_theme(4, bootswatch = "minty"))
# Bootswatch 4 sketchy theme
preview_button(bs_theme(4, bootswatch = "sketchy"))
}
```
