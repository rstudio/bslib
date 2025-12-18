# Define breakpoint values

A generic constructor for responsive breakpoints.

## Usage

``` r
breakpoints(..., xs = NULL, sm = NULL, md = NULL, lg = NULL)
```

## Arguments

- ...:

  Other breakpoints (e.g., `xl`).

- xs:

  The default value to apply to the `xs` breakpoint. Note that this
  breakpoint is generally equivalent to "all sizes" and is typically
  treated as the base case or a value to apply by default across all
  breakpoints unless overridden by a larger breakpoint.

- sm:

  Values to apply at the `sm` breakpoint.

- md:

  Values to apply at the `md` breakpoint.

- lg:

  Values to apply at the `lg` breakpoint.

## References

Bootstrap's [Breakpoints
article](https://getbootstrap.com/docs/5.3/layout/breakpoints/) provides
more detail on breakpoints and how they are used and customized.

## See also

`breakpoints()` is used by
[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md).

## Examples

``` r
breakpoints(sm = c(4, 4, 4), md = c(3, 3, 6), lg = c(-2, 8, -2))
#> <breakpoints>
#>  sm:  4  4  4
#>  md:  3  3  6
#>  lg: -2  8 -2
```
