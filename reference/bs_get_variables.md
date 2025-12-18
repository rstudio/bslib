# Retrieve Sass variable values from the current theme

Useful for retrieving a variable from the current theme and using the
value to inform another R function.

## Usage

``` r
bs_get_variables(theme, varnames)

bs_get_contrast(theme, varnames)
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- varnames:

  A character string referencing a Sass variable in the current theme.

## Value

Returns a character string containing a CSS/Sass value. If the
variable(s) are not defined, their value is `NA`.

## References

[Theming: Bootstrap 5
variables](https://rstudio.github.io/bslib/articles/bs5-variables/index.html)
provides a searchable reference of all theming variables available in
Bootstrap 5.

## See also

Other Bootstrap theme utility functions:
[`bootswatch_themes()`](https://rstudio.github.io/bslib/reference/bootswatch_themes.md),
[`builtin_themes()`](https://rstudio.github.io/bslib/reference/builtin_themes.md),
[`theme_bootswatch()`](https://rstudio.github.io/bslib/reference/theme_bootswatch.md),
[`theme_version()`](https://rstudio.github.io/bslib/reference/theme_version.md),
[`versions()`](https://rstudio.github.io/bslib/reference/versions.md)

## Examples

``` r
vars <- c("body-bg", "body-color", "primary", "border-radius")
bs_get_variables(bs_theme(), varnames = vars)
#>       body-bg    body-color       primary border-radius 
#>     "#ffffff"     "#1D1F21"     "#007bc2"         "3px" 
bs_get_variables(bs_theme(bootswatch = "darkly"), varnames = vars)
#>       body-bg    body-color       primary border-radius 
#>        "#222"        "#fff"     "#375a7f"    "0.375rem" 

bs_get_contrast(bs_theme(), c("primary", "dark", "light"))
#>   primary      dark     light 
#> "#FFFFFF" "#FFFFFF" "#000000" 

library(htmltools)
div(
  class = "bg-primary",
  style = css(
    color = bs_get_contrast(bs_theme(), "primary")
  )
)
#> <div class="bg-primary" style="color:#FFFFFF;"></div>
```
