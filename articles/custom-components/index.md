# Custom components

This article is for Shiny and R Markdown developers who wish to write
custom HTML components that “just work” with . Readers should already
have some basic understanding of the [Sass
language](https://sass-lang.com/) as well as the
[sass](https://rstudio.github.io/sass/) package.

## A basic themeable component

Before going through a full-blown [dynamically
themeable](#dynamically-themeable-component) custom component, let’s
start from a relatively straight-forward example of implementing a
custom [`person()`](https://rdrr.io/r/utils/person.html) component. Say
we have the following R function to generate some HTML with classes that
we’ll write custom Sass/CSS styles for:

``` r

person <- function(name, title, company) {
  div(
    class = "person",
    h3(class = "name", name),
    div(class = "title", title),
    div(class = "company", company)
  )
}
```

And here’s some custom Sass to style those classes. Since these Sass
rules listen to Bootstrap Sass variables like `$gray-600`,
[`person()`](https://rdrr.io/r/utils/person.html) styles works great
with different
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
input:

``` css
.person {
  display: inline-block;
  padding: $spacer;
  border: $border-width solid $border-color;
  @include border-radius;
  @include box-shadow;
  outline: 0;
  width: 300px;
  .title {
    font-weight: bold;
  }
  .title, .company {
    color: $gray-600;
  }
  margin: $grid-gutter-width;
  margin-right: 0;
  // On mobile, span entire width
  @include media-breakpoint-down(sm) {
    display: block;
    width: auto;
    margin-right: $grid-gutter-width;
  }
}
.person:last-of-type {
  margin-right: $grid-gutter-width;
}
```

If we were to save these Sass rules to a file named `person.scss`, then
we can then
[`bs_add_rules()`](https://rstudio.github.io/bslib/reference/bs_bundle.md)
to the
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
and use our themeable [`person()`](https://rdrr.io/r/utils/person.html)
component like so:

``` r

ui <- fluidPage(
  theme = bs_theme(bg = "#002B36", fg = "#EEE8D5") %>%
    bs_add_rules(sass::sass_file("person.scss")),
  person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
  person("John D. Rockefeller", "Chairman", "Standard Oil")
)
shinyApp(ui, function(input, output) {})
```

![Two custom person components, one each for Andrew Carnegie and John D.
Rockefeller.](person.png)

## Dynamically themeable component

To make the custom [`person()`](https://rdrr.io/r/utils/person.html)
component *dynamically* themeable (i.e., make it work with
`session$setCurrentTheme()`), we need an R function that generates an
[`htmltools::htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html)
from a given `theme`. While not required, suppose this function,
`person_dependency`, lives in an R package called `{mypkg}` which
includes the `person.scss` (and pre-compiled `person.css`) file under
the `inst/` directory. Then we could do the following:

``` r

name <- "person"
version <- "1.0.0"
person_dependency <- function(theme) {
  if (is_bs_theme(theme)) {
    scss <- system.file(package = "mypkg", "person.scss")
    bs_dependency(
      input = sass::sass_file(scss),
      theme = theme,
      name = name,
      version = version
    )
  } else {
    htmlDependency(
      name = name,
      version = version,
      stylesheet = "person.css",
      package = "mypkg",
      all_files = FALSE
    )
  }
}

#' @export
person <- function(name, title, company) {
  div(
    class = "person",
    h3(class = "name", name),
    div(class = "title", title),
    div(class = "company", company),
    bs_dependency_defer(person_dependency)
  )
}
```

Note that when `theme` is a
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
object, then `person.scss` is compiled with Bootstrap Sass variables and
mixins included via
[`bs_dependency()`](https://rstudio.github.io/bslib/reference/bs_dependency.md)
(which returns the compiled CSS as an
[`htmlDependency()`](https://rstudio.github.io/htmltools/reference/htmlDependency.html)).
Otherwise, if `theme` is *not* a
[`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
object, then [`person()`](https://rdrr.io/r/utils/person.html) is being
used in a context where [bslib](https://rstudio.github.io/bslib/) is not
relevant, so a pre-compiled CSS file is returned instead. Pre-complied
CSS isn’t necessarily a requirement, but it’s a good idea for increasing
performance and reducing software dependencies for end users.

## HTML widgets

For [htmlwidgets](https://github.com/ramnathv/htmlwidgets) that can be
themed via CSS, we recommend supplying a
[`bs_dependency_defer()`](https://rstudio.github.io/bslib/reference/bs_dependency.md)
to the `dependencies` argument of `createWidget()` (similar to the
[`person()`](https://rdrr.io/r/utils/person.html) component from the
last section), which will make the widget dynamically themeable. For
widgets that can *not* be themed via CSS, the best option may be to
query the active theme inside a `preRenderHook()` via
[`bs_current_theme()`](https://rstudio.github.io/bslib/reference/bs_current_theme.md),
and then translate any relevant information to the widget’s instance
data, for example:

``` r

my_widget <- function(...) {
  createWidget(
    name = "mywidget", ...,
    preRenderHook = my_widget_hook
  )
}
my_widget_hook <- function(instance) {
  theme <- bslib::bs_current_theme()
  if (!bslib::is_bs_theme(theme)) {
    return(instance)
  }
  instance$x$theme <- modifyList(
    instance$x$theme, as.list(
      bslib::bs_get_variables(theme, c("bg", "fg"))
    )
  )
  instance
}
```
