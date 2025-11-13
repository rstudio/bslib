# Create a Bootstrap theme

Creates a Bootstrap theme object, where you can:

- Choose a (major) Bootstrap `version`.

- Choose a [Bootswatch theme](https://bootswatch.com) (optional).

- Customize main colors and fonts via explicitly named arguments (e.g.,
  `bg`, `fg`, `primary`, etc).

- Customize other, lower-level, Bootstrap Sass variable defaults via
  `...`.

To learn more about how to implement custom themes, as well as how to
use them inside Shiny and R Markdown, [see
here](https://rstudio.github.io/bslib/articles/theming.html).

## Usage

``` r
bs_theme(
  version = version_default(),
  preset = NULL,
  ...,
  brand = NULL,
  bg = NULL,
  fg = NULL,
  primary = NULL,
  secondary = NULL,
  success = NULL,
  info = NULL,
  warning = NULL,
  danger = NULL,
  base_font = NULL,
  code_font = NULL,
  heading_font = NULL,
  font_scale = NULL,
  bootswatch = NULL
)

bs_theme_update(
  theme,
  ...,
  preset = NULL,
  bg = NULL,
  fg = NULL,
  primary = NULL,
  secondary = NULL,
  success = NULL,
  info = NULL,
  warning = NULL,
  danger = NULL,
  base_font = NULL,
  code_font = NULL,
  heading_font = NULL,
  font_scale = NULL,
  bootswatch = NULL
)

is_bs_theme(x)
```

## Arguments

- version:

  The major version of Bootstrap to use (see
  [`versions()`](https://rstudio.github.io/bslib/dev/reference/versions.md)
  for possible values). Defaults to the currently recommended version
  for new projects (currently Bootstrap 5).

- preset:

  The name of a theme preset, either a built-in theme provided by bslib
  or a Bootswatch theme (see
  [`builtin_themes()`](https://rstudio.github.io/bslib/dev/reference/builtin_themes.md)
  and
  [`bootswatch_themes()`](https://rstudio.github.io/bslib/dev/reference/bootswatch_themes.md)
  for possible values). This argument takes precedence over the
  `bootswatch` argument and only one `preset` or `bootswatch` can be
  provided. When no `bootswatch` theme is specified, and `version` is 5
  or higher, `preset` defaults to `"shiny"`. To remove the `"shiny"`
  preset, provide a value of `"bootstrap"` (this value will also work in
  `bs_theme_update()` to remove a `preset` or `bootswatch` theme).

- ...:

  arguments passed along to
  [`bs_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md).

- brand:

  Specifies how to apply branding to your theme using
  [brand.yml](https://posit-dev.github.io/brand-yml/), a simple YAML
  file that defines key brand elements like colors, fonts, and logos.
  Valid options:

  - `NULL` (default): Automatically looks for a `_brand.yml` file in the
    current directory or in `_brand/` or `brand/` in the current
    directory. If not found, it searches parent project directories for
    a `_brand.yml` file (also possibly in `_brand/` or `brand/`). If a
    `_brand.yml` file is found, it is applied to the Bootstrap theme.

  - `TRUE` (default): Automatically looks for a `_brand.yml` file in the
    current or app directory as described above. If a `_brand.yml` file
    *is not found*, `bs_theme()` will throw an error.

  - `FALSE`: Disables any brand.yml usage, even if a `_brand.yml` file
    is present.

  - A file path that directly points to a specific brand.yml file (with
    any file name) that you want to use.

  - Use a list to directly provide brand settings directly in R,
    following the brand.yml structure.

  Learn more about creating and using brand.yml files at the [brand.yml
  homepage](https://posit-dev.github.io/brand-yml/) or run
  `shiny::runExample("brand.yml", package = "bslib")` to try brand.yml
  in a demo app.

- bg:

  A color string for the background.

- fg:

  A color string for the foreground.

- primary:

  A color to be used for hyperlinks, to indicate primary/default
  actions, and to show active selection state in some Bootstrap
  components. Generally a bold, saturated color that contrasts with the
  theme's base colors.

- secondary:

  A color for components and messages that don't need to stand out. (Not
  supported in Bootstrap 3.)

- success:

  A color for messages that indicate an operation has succeeded.
  Typically green.

- info:

  A color for messages that are informative but not critical. Typically
  a shade of blue-green.

- warning:

  A color for warning messages. Typically yellow.

- danger:

  A color for errors. Typically red.

- base_font:

  The default typeface.

- code_font:

  The typeface to be used for code. Be sure this is monospace!

- heading_font:

  The typeface to be used for heading elements.

- font_scale:

  A scalar multiplier to apply to the base font size. For example, a
  value of `1.5` scales font sizes to 150% and a value of `0.8` scales
  to 80%. Must be a positive number.

- bootswatch:

  The name of a bootswatch theme (see
  [`bootswatch_themes()`](https://rstudio.github.io/bslib/dev/reference/bootswatch_themes.md)
  for possible values). When provided to `bs_theme_update()`, any
  previous Bootswatch theme is first removed before the new one is
  applied (use `bootswatch = "bootstrap"` to effectively remove the
  Bootswatch theme).

- theme:

  A `bs_theme()` object.

- x:

  an object.

## Value

Returns a
[`sass::sass_bundle()`](https://rstudio.github.io/sass/reference/sass_layer.html)
(list-like) object.

## Colors

Colors may be provided in any format that
[`htmltools::parseCssColors()`](https://rstudio.github.io/htmltools/reference/parseCssColors.html)
can understand. To control the vast majority of the ('grayscale') color
defaults, specify both the `fg` (foreground) and `bg` (background)
colors. The `primary` and `secondary` theme colors are also useful for
accenting the main grayscale colors in things like hyperlinks, tabset
panels, and buttons.

## Fonts

Use `base_font`, `code_font`, and `heading_font` to control the main
typefaces. These arguments set new defaults for the relevant
`font-family` CSS properties, but don't necessarily import the relevant
font files. To both set CSS properties *and* import font files, consider
using the various
[`font_face()`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
helpers.

Each `*_font` argument may be a single font or a
[`font_collection()`](https://rstudio.github.io/bslib/dev/reference/font_face.md).
A font can be created with
[`font_google()`](https://rstudio.github.io/bslib/dev/reference/font_face.md),
[`font_link()`](https://rstudio.github.io/bslib/dev/reference/font_face.md),
or
[`font_face()`](https://rstudio.github.io/bslib/dev/reference/font_face.md),
or it can be a character vector of font names in the following format:

- A single unquoted name (e.g., `"Source Sans Pro"`).

- A single quoted name (e.g., `"'Source Sans Pro'"`).

- A comma-separated list of names w/ individual names quoted as
  necessary. (e.g.
  `c("Open Sans", "'Source Sans Pro'", "'Helvetica Neue', Helvetica, sans-serif")`)

[`font_google()`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
sets `local = TRUE` by default, which ensures that the font files are
downloaded from [Google Fonts](https://fonts.google.com/) when your
document or app is rendered. This guarantees that the client has access
to the font family, making it relatively safe to specify just one font
family:

    bs_theme(base_font = font_google("Pacifico", local = TRUE))

That said, we recommend you specify multiple "fallback" font families,
especially when relying on remote and/or system fonts being available.
Fallback fonts are useful not only for handling missing fonts, but also
ensure that your users don't experience a Flash of Invisible Text (FOIT)
which can be quite noticeable with remote web fonts on a slow internet
connection.

    bs_theme(base_font = font_collection(font_google("Pacifico", local = FALSE), "Roboto", "sans-serif"))

## References

- [Get Started:
  Theming](https://rstudio.github.io/bslib/articles/theming/index.html)
  introduces theming with bslib in Shiny apps and R Markdown documents.

- [Theming: Bootstrap 5
  variables](https://rstudio.github.io/bslib/articles/bs5-variables/index.html)
  provides a searchable reference of all theming variables available in
  Bootstrap 5.

- [Theming: Custom
  components](https://rstudio.github.io/bslib/articles/custom-components/index.html)
  gives a tutorial on creating a dynamically themable custom component.

- bslib's theming capabilities are powered by [the sass
  package](https://rstudio.github.io/sass/).

- [Bootstrap's utility
  classes](https://rstudio.github.io/bslib/articles/utility-classes/index.html)
  can be helpful when you want to change the appearance of an element
  without writing CSS or customizing your `bs_theme()`.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/dev/reference/bs_remove.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

theme <- bs_theme(
  # Controls the default grayscale palette
  bg = "#202123", fg = "#B8BCC2",
  # Controls the accent (e.g., hyperlink, button, etc) colors
  primary = "#EA80FC", secondary = "#48DAC6",
  base_font = c("Grandstander", "sans-serif"),
  code_font = c("Courier", "monospace"),
  heading_font = "'Helvetica Neue', Helvetica, sans-serif",
  # Can also add lower-level customization
  "input-border-color" = "#EA80FC"
)

bs_theme_preview(theme)

# Lower-level bs_add_*() functions allow you to work more
# directly with the underlying Sass code
theme <- bs_add_variables(theme, "my-class-color" = "red")
theme <- bs_add_rules(theme, ".my-class { color: $my-class-color }")
}
```
