# Preview a Bootstrap theme

Launches an example shiny app that can be used to get a quick preview of
a [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
as well as an interactive GUI for tweaking some of the main theme
settings. Calling `bs_theme_preview()` with no arguments starts the
theme preview app with the default theme, which is a great way to see
the available theme presets or to start creating your own theme.

## Usage

``` r
bs_theme_preview(theme = bs_theme(), ..., with_themer = TRUE)
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- ...:

  passed along to
  [`shiny::runApp()`](https://rdrr.io/pkg/shiny/man/runApp.html).

- with_themer:

  whether or not to run the app with
  [`run_with_themer()`](https://rstudio.github.io/bslib/reference/run_with_themer.md).

## Value

nothing, this function is called for its side-effects (launching an
application).

## Details

The app that this launches is subject to change as new features are
developed in bslib and shiny.

## See also

Use
[`run_with_themer()`](https://rstudio.github.io/bslib/reference/run_with_themer.md)
or
[`bs_themer()`](https://rstudio.github.io/bslib/reference/run_with_themer.md)
to add the theming UI to an existing shiny app.

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/reference/bs_theme_dependencies.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
theme <- bs_theme(bg = "#6c757d", fg = "white", primary = "orange")
bs_theme_preview(theme)
}
```
