# Global theming

`bs_global_theme()` creates and sets the global Bootstrap Sass theme.
This theme is typically found by
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/reference/bs_theme_dependencies.md)
in the app or document where the global theme is being used. You can
obtain the current global theme with `bs_global_get()` or directly set
the global theme with `bs_global_set()`.

## Usage

``` r
bs_global_theme(
  version = version_default(),
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
  ...,
  bootswatch = NULL
)

bs_global_set(theme = bs_theme())

bs_global_get()

bs_global_clear()

bs_global_add_variables(
  ...,
  .where = "defaults",
  .default_flag = identical(.where, "defaults")
)

bs_global_add_rules(...)

bs_global_bundle(...)

bs_global_theme_update(
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
  bootswatch = NULL
)
```

## Arguments

- version:

  The major version of Bootstrap to use (see
  [`versions()`](https://rstudio.github.io/bslib/reference/versions.md)
  for possible values). Defaults to the currently recommended version
  for new projects (currently Bootstrap 5).

- preset:

  The name of a theme preset, either a built-in theme provided by bslib
  or a Bootswatch theme (see
  [`builtin_themes()`](https://rstudio.github.io/bslib/reference/builtin_themes.md)
  and
  [`bootswatch_themes()`](https://rstudio.github.io/bslib/reference/bootswatch_themes.md)
  for possible values). This argument takes precedence over the
  `bootswatch` argument and only one `preset` or `bootswatch` can be
  provided. When no `bootswatch` theme is specified, and `version` is 5
  or higher, `preset` defaults to `"shiny"`. To remove the `"shiny"`
  preset, provide a value of `"bootstrap"` (this value will also work in
  [`bs_theme_update()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  to remove a `preset` or `bootswatch` theme).

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

- ...:

  arguments passed along to
  [`bs_add_variables()`](https://rstudio.github.io/bslib/reference/bs_bundle.md).

- bootswatch:

  The name of a bootswatch theme (see
  [`bootswatch_themes()`](https://rstudio.github.io/bslib/reference/bootswatch_themes.md)
  for possible values). When provided to
  [`bs_theme_update()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
  any previous Bootswatch theme is first removed before the new one is
  applied (use `bootswatch = "bootstrap"` to effectively remove the
  Bootswatch theme).

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- .where:

  Whether to place the variable definitions before other Sass
  `"defaults"`, after other Sass `"declarations"`, or after other Sass
  `"rules"`.

- .default_flag:

  Whether or not to add a `!default` flag (if missing) to variable
  expressions. It's recommended to keep this as `TRUE` when
  `.where = "defaults"`.

## Value

Functions that modify the global theme (e.g., `bs_global_set()`)
invisibly return the previously set theme. `bs_global_get()` returns the
current global theme.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md),
[`bs_remove()`](https://rstudio.github.io/bslib/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/reference/bs_theme_preview.md)

## Examples

``` r
# Remember the global state now (so we can restore later)
theme <- bs_global_get()

# Use Bootstrap 3 (globally) with some theme customization
bs_global_theme(3, bg = "#444", fg = "#e4e4e4", primary = "#e39777")
if (rlang::is_interactive()) {
  bs_theme_preview(with_themer = FALSE)
}

# If no global theme is active, bs_global_get() returns NULL
bs_global_clear()
bs_global_get()
#> NULL

# Restore the original state
bs_global_set(theme)
```
