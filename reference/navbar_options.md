# Create a set of navbar options

A `navbar_options()` object captures options specific to the appearance
and behavior of the navbar, independent from the content displayed on
the page. This helper should be used to create the list of options
expected by `navbar_options` in
[`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md)
and
[`navset_bar()`](https://rstudio.github.io/bslib/reference/navset.md).

## Usage

``` r
navbar_options(
  ...,
  position = c("static-top", "fixed-top", "fixed-bottom"),
  bg = NULL,
  theme = c("auto", "light", "dark"),
  collapsible = TRUE,
  underline = TRUE
)
```

## Arguments

- ...:

  Additional attributes that will be passed directly to the navbar
  container element.

- position:

  Determines whether the navbar should be displayed at the top of the
  page with normal scrolling behavior (`"static-top"`), pinned at the
  top (`"fixed-top"`), or pinned at the bottom (`"fixed-bottom"`). Note
  that using `"fixed-top"` or `"fixed-bottom"` will cause the navbar to
  overlay your body content, unless you add padding, e.g.:
  `tags$style(type="text/css", "body {padding-top: 70px;}")`

- bg:

  a CSS color to use for the navbar's background color.

- theme:

  Either `"dark"` for a light text color (on a **dark** background) or
  `"light"` for a dark text color (on a **light** background). If
  `"auto"` (the default) and `bg` is provided, the best contrast to `bg`
  is chosen.

- collapsible:

  `TRUE` to automatically collapse the navigation elements into an
  expandable menu on mobile devices or narrow window widths.

- underline:

  Whether or not to add underline styling to page or navbar links when
  active or focused.

## Value

Returns a list of navbar options.

## Details

### Navbar style with Bootstrap 5 and Bootswatch themes

In bslib v0.9.0, the default navbar colors for Bootswatch themes with
Bootstrap 5 changed. Prior to v0.9.0, bslib pre-selected navbar
background colors in light and dark mode; after v0.9.0 the default
navbar colors are less opinionated by default and follow light or dark
mode (see
[`input_dark_mode()`](https://rstudio.github.io/bslib/reference/input_dark_mode.md)).

You can use `navbar_options()` to adjust the colors of the navbar when
using a Bootswatch preset theme with Bootstrap 5. For example, the
[Bootswatch documentation for the Flatly
theme](https://bootswatch.com/flatly/) shows 4 navbar variations.
Inspecting the source code for the first example reveals the following
markup:

    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <!-- all of the navbar html -->
    </nav>

Note that this navbar uses the `bg-primary` class for a dark navy
background. The navbar's white text is controlled by the
`data-bs-theme="dark"` attribute, which is used by Bootstrap for light
text on a *dark* background. In bslib, you can achieve this look with:

    ui <- page_navbar(
      theme = bs_theme(5, "flatly"),
      navbar_options = navbar_options(class = "bg-primary", theme = "dark")
    )

This particular combination of `class = "bg-primary"` and
`theme = "dark"` works well for most Bootswatch presets.

Another variation from the Flatly documentation features a navar with
dark text on a light background:

    ui <- page_navbar(
      theme = bs_theme(5, "flatly"),
      navbar_options = navbar_options(class = "bg-light", theme = "light")
    )

The above options set navbar foreground and background colors that are
always the same in both light and dark modes. To customize the navbar
colors used in light or dark mode, you can use the `$navbar-light-bg`
and `$navbar-dark-bg` Sass variables. When provided, bslib will
automatically choose to use light or dark text as the foreground color.

    ui <- page_navbar(
      theme = bs_theme(
        5,
        preset = "flatly",
        navbar_light_bg = "#18BC9C", # flatly's success color (teal)
        navbar_dark_bg = "#2C3E50"   # flatly's primary color (navy)
      )
    )

Finally, you can also use the `$navbar-bg` Sass variable to set the
navbar background color for both light and dark modes:

    ui <- page_navbar(
      theme = bs_theme(
        5,
        preset = "flatly",
        navbar_bg = "#E74C3C" # flatly's danger color (red)
      )
    )

## Changelog

This function was introduced in bslib v0.9.0, replacing the `position`,
`bg`, `inverse`, `collapsible` and `underline` arguments of
[`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md)
and
[`navset_bar()`](https://rstudio.github.io/bslib/reference/navset.md).
Those arguments are deprecated with a warning and will be removed in a
future version of bslib. Note that the deprecated `inverse` argument of
[`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md)
and
[`navset_bar()`](https://rstudio.github.io/bslib/reference/navset.md)
was replaced with the `theme` argument of `navbar_options()`.

## Examples

``` r
navbar_options(position = "static-top", bg = "#2e9f7d", underline = FALSE)
#> <bslib_navbar_options>
#>    position: static-top
#>          bg: #2e9f7d
#>       theme: (auto)
#> collapsible: (TRUE)
#>   underline: FALSE
```
