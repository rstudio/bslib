# Get the path to a precompiled CSS file

This function is meant for development and debugging purposes. It can be
used to test if a precompiled CSS file exists for a given theme object.

## Usage

``` r
precompiled_css_path(theme = bs_theme())
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object.

## Value

The path to the precompiled CSS file, if it exists, or `NULL`, if not.
