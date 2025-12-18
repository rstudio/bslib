# Add low-level theming customizations

These functions provide direct access to the layers of a bslib theme
created with
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md).
Learn more about [composable Sass
layers](https://rstudio.github.io/sass/articles/sass.html#layering) on
the sass website.

## Usage

``` r
bs_add_variables(
  theme,
  ...,
  .where = "defaults",
  .default_flag = identical(.where, "defaults")
)

bs_add_rules(theme, rules)

bs_add_functions(theme, functions)

bs_add_mixins(theme, mixins)

bs_bundle(theme, ...)
```

## Arguments

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
  object.

- ...:

  - `bs_add_variables()`: Should be named Sass variables or values that
    can be passed in directly to the `defaults` argument of a
    [`sass::sass_layer()`](https://rstudio.github.io/sass/reference/sass_layer.html).

  - `bs_bundle()`: Should be arguments that can be handled by
    [`sass::sass_bundle()`](https://rstudio.github.io/sass/reference/sass_layer.html)
    to be appended to the `theme`

- .where:

  Whether to place the variable definitions before other Sass
  `"defaults"`, after other Sass `"declarations"`, or after other Sass
  `"rules"`.

- .default_flag:

  Whether or not to add a `!default` flag (if missing) to variable
  expressions. It's recommended to keep this as `TRUE` when
  `.where = "defaults"`.

- rules:

  Sass rules. Anything understood by
  [`sass::as_sass()`](https://rstudio.github.io/sass/reference/as_sass.html)
  may be provided (e.g., a list, character vector,
  [`sass::sass_file()`](https://rstudio.github.io/sass/reference/sass_import.html),
  etc)

- functions:

  A character vector or
  [`sass::sass_file()`](https://rstudio.github.io/sass/reference/sass_import.html)
  containing functions definitions.

- mixins:

  A character vector or
  [`sass::sass_file()`](https://rstudio.github.io/sass/reference/sass_import.html)
  containing mixin definitions.

## Value

Returns a modified
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
object.

## Details

Compared to higher-level theme customization available in
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
these functions are a more direct interface to Bootstrap Sass, and
therefore, do nothing to ensure theme customizations are portable
between major Bootstrap versions.

## Functions

- `bs_add_variables()`: Add Bootstrap Sass [variable
  defaults](https://rstudio.github.io/bslib/articles/bs5-variables/index.html).

- `bs_add_rules()`: Add additional [Sass
  rules](https://sass-lang.com/documentation/style-rules).

- `bs_add_functions()`: Add additional [Sass
  functions](https://rstudio.github.io/sass/articles/sass.html#functions).

- `bs_add_mixins()`: Add additional [Sass
  mixins](https://rstudio.github.io/sass/articles/sass.html#mixins).

- `bs_bundle()`: Add additional
  [`sass::sass_bundle()`](https://rstudio.github.io/sass/reference/sass_layer.html)
  objects to an existing `theme`.

## References

- bslib's theming capabilities are powered by [the sass
  package](https://rstudio.github.io/sass/).

- Learn more about [composable Sass
  layers](https://rstudio.github.io/sass/articles/sass.html#layering) on
  the sass website.

## See also

[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
creates a Bootstrap theme object, and is the best place to start
learning about bslib's theming capabilities.

Other Bootstrap theme functions:
[`bs_current_theme()`](https://rstudio.github.io/bslib/reference/bs_current_theme.md),
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/reference/bs_theme_preview.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

# Function to preview the styling a (primary) Bootstrap button
library(htmltools)
button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
preview_button <- function(theme) {
  browsable(tags$body(bs_theme_dependencies(theme), button))
}

# Here we start with a theme based on a Bootswatch theme,
# then override some variable defaults
theme <- bs_add_variables(
  bs_theme(bootswatch = "sketchy", primary = "orange"),
  "body-bg" = "#EEEEEE",
  "font-family-base" = "monospace",
  "font-size-base" = "1.4rem",
  "btn-padding-y" = ".16rem",
  "btn-padding-x" = "2rem"
)

preview_button(theme)

# If you need to set a variable based on another Bootstrap variable
theme <- bs_add_variables(theme, "body-color" = "$success", .where = "declarations")
preview_button(theme)

# Start a new global theme and add some custom rules that
# use Bootstrap variables to define a custom styling for a
# 'person card'
person_rules <- system.file("custom", "person.scss", package = "bslib")
theme <- bs_add_rules(bs_theme(), sass::sass_file(person_rules))

# Include custom CSS that leverages bootstrap Sass variables
person <- function(name, title, company) {
  tags$div(
    class = "person",
    h3(class = "name", name),
    div(class = "title", title),
    div(class = "company", company)
  )
}

page_fluid(
  theme = theme,
  person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
  person("John D. Rockefeller", "Chairman", "Standard Oil")
)
}
```
