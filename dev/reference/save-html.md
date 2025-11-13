# Save a bslib page/fragment as HTML

Save a bslib page/fragment as HTML

## Usage

``` r
# S3 method for class 'bslib_fragment'
save_html(html, file, ...)

# S3 method for class 'bslib_page'
save_html(html, file, ...)
```

## Arguments

- html:

  a bslib page/fragment.

- ...:

  passed along to an underlying
  [`htmltools::save_html()`](https://rstudio.github.io/htmltools/reference/save_html.html)
  method.
