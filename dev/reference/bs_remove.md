# Remove or retrieve Sass code from a theme

A Bootstrap theme created with
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
is comprised of [many Sass
layers](https://rstudio.github.io/sass/articles/sass.html#layering).
`bs_remove()` and `bs_retrieve()` allow you to remove or retrieve an
individual layer, either to reduce the size of the compiled CSS or to
extract styles from a theme.

## Usage

``` r
bs_remove(theme, ids = character(0))

bs_retrieve(theme, ids = character(0), include_unnamed = TRUE)
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object.

- ids:

  a character vector of ids

- include_unnamed:

  whether or not to include unnamed
  [`sass::sass_layer()`](https://rstudio.github.io/sass/reference/sass_layer.html)s
  (e.g., Bootstrap Sass variables, functions, and mixins).

## Value

Returns a modified
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
object.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md),
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md)

## Examples

``` r
bs4 <- bs_theme(version = 4)

# Retrieve sass bundle for print styles
bs_retrieve(bs4, "_print", include_unnamed = FALSE)
#> /* Sass Bundle: _print */
#> @import "/home/runner/work/_temp/Library/bslib/lib/bs4/scss/_print.scss";
#> /* *** */

# Remove CSS rules for print and carousels
bs4_no_print <- bs_remove(bs4, c("_print", "_carousel"))
suppressWarnings(
  bs_retrieve(bs4_no_print, "_print", include_unnamed = FALSE)
)
#> /* Sass Bundle: (empty) *** */

# Remove BS3 compatibility layer
bs4_no_compat <- bs_remove(bs4, "bs3compat")
```
