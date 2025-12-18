# Obtain the currently active theme at render time

Intended for advanced use by developers to obtain the currently active
theme *at render time* and primarily for implementing themable widgets
that can't otherwise be themed via
[`bs_dependency_defer()`](https://rstudio.github.io/bslib/reference/bs_dependency.md)
.

## Usage

``` r
bs_current_theme(session = get_current_session(FALSE))
```

## Arguments

- session:

  The current Shiny session (if any).

## Value

Returns a
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
object.

## Details

This function should generally only be called at print/render time. For
example:

- Inside the `preRenderHook` of
  [`htmlwidgets::createWidget()`](https://rdrr.io/pkg/htmlwidgets/man/createWidget.html).

- Inside of a custom [print](https://rdrr.io/r/base/print.html) method
  that generates
  [htmltools::tags](https://rstudio.github.io/htmltools/reference/builder.html).

- Inside of a
  [`htmltools::tagFunction()`](https://rstudio.github.io/htmltools/reference/tagFunction.html)

Calling this function at print/render time is important because it does
different things based on the context in which it's called:

- If a reactive context is active, `session$getCurrentTheme()` is called
  (which is a reactive read).

- If no reactive context is active,
  [`shiny::getCurrentTheme()`](https://rdrr.io/pkg/shiny/man/getCurrentTheme.html)
  is called (which returns the current app's `theme`, if relevant).

- If
  [`shiny::getCurrentTheme()`](https://rdrr.io/pkg/shiny/man/getCurrentTheme.html)
  comes up empty, then
  [`bs_global_get()`](https://rstudio.github.io/bslib/reference/bs_global_theme.md)
  is called, which is relevant for
  [`rmarkdown::html_document()`](https://pkgs.rstudio.com/rmarkdown/reference/html_document.html),
  and possibly other static rendering contexts.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/reference/bs_bundle.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/reference/bs_theme_preview.md)
