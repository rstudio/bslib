# Render a sidebar as HTML tags

Renders the sidebar element and collapse toggle elements for a
[`sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md) in a
[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
context.

## Usage

``` r
# S3 method for class 'bslib_sidebar'
as.tags(x, ...)
```

## Arguments

- x:

  A [`sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
  object.

- ...:

  Additional arguments passed to
  [`htmltools::as.tags()`](https://rstudio.github.io/htmltools/reference/as.tags.html).
