# Themeable HTML components

Themeable HTML components use Sass to generate CSS rules from Bootstrap
Sass variables, functions, and/or mixins (i.e., stuff inside of
`theme`). `bs_dependencies()` makes it a bit easier to create themeable
components by compiling
[`sass::sass()`](https://rstudio.github.io/sass/reference/sass.html)
(`input`) together with Bootstrap Sass inside of a `theme`, and
packaging up the result into an
[`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html).

Themable components can also be *dynamically* themed inside of Shiny
(i.e., they may be themed in 'real-time' via
[`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md),
and more generally, update their styles in response to
[shiny::session](https://rdrr.io/pkg/shiny/man/session.html)'s
`setCurrentTheme()` method). Dynamically themeable components provide a
"recipe" (i.e., a function) to `bs_dependency_defer()`, describing how
to generate new CSS stylesheet(s) from a new `theme`. This function is
called when the HTML page is first rendered, and may be invoked again
with a new `theme` whenever
[shiny::session](https://rdrr.io/pkg/shiny/man/session.html)'s
`setCurrentTheme()` is called.

## Usage

``` r
bs_dependency(
  input = list(),
  theme,
  name,
  version,
  cache_key_extra = NULL,
  .dep_args = list(),
  .sass_args = list()
)

bs_dependency_defer(func, memoise = TRUE)
```

## Arguments

- input:

  Sass rules to compile, using `theme`.

- theme:

  A
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object.

- name:

  Library name

- version:

  Library version

- cache_key_extra:

  Extra information to add to the sass cache key. It is useful to add
  the version of your package.

- .dep_args:

  A list of additional arguments to pass to
  [`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html).
  Note that `package` has no effect and `script` must be absolute
  path(s).

- .sass_args:

  A list of additional arguments to pass to
  [`sass::sass_partial()`](https://rstudio.github.io/sass/reference/sass_partial.html).

- func:

  a *non-anonymous* function, with a *single* argument. This function
  should accept a
  [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  object and return a single
  [`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html),
  a list of them, or `NULL`.

- memoise:

  whether or not to memoise (i.e., cache) `func` results for a short
  period of time. The default, `TRUE`, can have large performance
  benefits when many instances of the same themable widget are rendered.
  Note that you may want to avoid memoisation if `func` relies on
  side-effects (e.g., files on-disk) that need to change for each
  themable widget instance.

## Value

`bs_dependency()` returns an
[`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html)
and `bs_dependency_defer()` returns an
[`htmltools::tagFunction()`](https://rstudio.github.io/htmltools/reference/tagFunction.html)

## References

- [Theming: Custom
  components](https://rstudio.github.io/bslib/articles/custom-components/index.html)
  gives a tutorial on creating a dynamically themable custom component.

## See also

Other Bootstrap theme functions:
[`bs_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md),
[`bs_current_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_current_theme.md),
[`bs_global_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md),
[`bs_remove()`](https://rstudio.github.io/bslib/dev/reference/bs_remove.md),
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md),
[`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md),
[`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
myWidgetVersion <- "1.2.3"

myWidgetDependency <- function() {
  list(
    bs_dependency_defer(myWidgetCss),
    htmlDependency(
      name = "mywidget-js",
      version = myWidgetVersion,
      src = system.file(package = "mypackage", "js"),
      script = "mywidget.js"
    )
  )
}

myWidgetCSS <- function(theme) {
  if (!is_bs_theme(theme)) {
    return(
      htmlDependency(
        name = "mywidget-css",
        version = myWidgetVersion,
        src = system.file(package = "mypackage", "css"),
        stylesheet = "mywidget.css"
      )
    )
  }

  # Compile mywidget.scss using the variables and defaults from the theme
  # object.
  sass_input <- sass::sass_file(system.file(package = "mypackage", "scss/mywidget.scss"))

  bs_dependency(
    input = sass_input,
    theme = theme,
    name = "mywidget",
    version = myWidgetVersion,
    cache_key_extra = utils::packageVersion("mypackage")
  )
}

# Note that myWidgetDependency is not defined inside of myWidget. This is so
# that, if `myWidget()` is called multiple times, Shiny can tell that the
# function objects are identical and deduplicate them.
myWidget <- function(id) {
  div(
    id = id,
    span("myWidget"),
    myWidgetDependency()
  )
}
}
```
