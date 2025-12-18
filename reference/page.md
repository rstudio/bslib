# Modern Bootstrap page layouts

These functions are small wrappers around shiny's page constructors
(i.e.,
[`shiny::fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html),
[`shiny::navbarPage()`](https://rdrr.io/pkg/shiny/man/navbarPage.html),
etc) that differ in two ways:

- The `theme` parameter defaults bslib's recommended version of
  Bootstrap (for new projects).

- The return value is rendered as an static HTML page when printed
  interactively at the console.

## Usage

``` r
page(..., title = NULL, theme = bs_theme(), lang = NULL)

page_fluid(..., title = NULL, theme = bs_theme(), lang = NULL)

page_fixed(..., title = NULL, theme = bs_theme(), lang = NULL)
```

## Arguments

- ...:

  UI elements for the page. Named arguments become HTML attributes.

- title:

  The browser window title (defaults to the host URL of the page)

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- lang:

  ISO 639-1 language code for the HTML page, such as "en" or "ko". This
  will be used as the lang in the `<html>` tag, as in
  `<html lang="en">`. The default (NULL) results in an empty string.

## Functions

- `page()`: A bslib wrapper for
  [`shiny::bootstrapPage()`](https://rdrr.io/pkg/shiny/man/bootstrapPage.html),
  a basic Boostrap page where the content is added directly to the page
  body.

- `page_fluid()`: A bslib wrapper for
  [`shiny::fluidPage()`](https://rdrr.io/pkg/shiny/man/fluidPage.html),
  a fluid Bootstrap-based page layout that extends to the full viewport
  width.

- `page_fixed()`: A bslib wrapper for
  [`shiny::fixedPage()`](https://rdrr.io/pkg/shiny/man/fixedPage.html),
  a fixed Bootstrap-based page layout where the page content container
  is centered horizontally and its width is constrained.

## See also

Dashboard-style pages:
[`page_sidebar()`](https://rstudio.github.io/bslib/reference/page_sidebar.md),
[`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md),
[`page_fillable()`](https://rstudio.github.io/bslib/reference/page_fillable.md).
