#' Add low-level theming customizations
#'
#' Compared to higher-level theme customization available in [bs_theme()], these functions
#' are a more direct interface to Bootstrap Sass, and therefore, do nothing to
#' ensure theme customizations are portable between major Bootstrap versions.
#'
#' @inheritParams bs_theme_update
#' @param ...
#'  * `bs_add_variables()`: Should be named Sass variables or values that can be passed in directly to the `defaults` argument of a [sass::sass_layer()].
#'  * `bs_bundle()`: Should be arguments that can be handled by [sass::sass_bundle()] to be appended to the `theme`
#' @param .where Whether to place the variable definitions before other Sass
#'   `"defaults"`, after other Sass `"declarations"`, or after other Sass
#'   `"rules"`.
#' @param .default_flag Whether or not to add a `!default` flag (if missing) to
#'   variable expressions. It's recommended to keep this as `TRUE` when `.where
#'   = "defaults"`.
#'
#' @return a modified [bs_theme()] object.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/articles/sass.html#layering}
#' @examples
#'
#' # Function to preview the styling a (primary) Bootstrap button
#' library(htmltools)
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' preview_button <- function(theme) {
#'   if (interactive()) {
#'     browsable(tags$body(bs_theme_dependencies(theme), button))
#'   }
#' }
#'
#' # Here we start with a theme based on a Bootswatch theme,
#' # then override some variable defaults
#' theme <- bs_add_variables(
#'   bs_theme(bootswatch = "sketchy", primary = "orange"),
#'   "body-bg" = "#EEEEEE",
#'   "font-family-base" = "monospace",
#'   "font-size-base" = "1.4rem",
#'   "btn-padding-y" = ".16rem",
#'   "btn-padding-x" = "2rem"
#' )
#'
#' preview_button(theme)
#'
#' # If you need to set a variable based on another Bootstrap variable
#' theme <- bs_add_variables(theme, "body-color" = "$success", .where = "declarations")
#' preview_button(theme)
#'
#' # Start a new global theme and add some custom rules that
#' # use Bootstrap variables to define a custom styling for a
#' # 'person card'
#' person_rules <- system.file("custom", "person.scss", package = "bslib")
#' theme <- bs_add_rules(bs_theme(), sass::sass_file(person_rules))
#' # Include custom CSS that leverages bootstrap Sass variables
#' person <- function(name, title, company) {
#'   tags$div(
#'     class = "person",
#'     h3(class = "name", name),
#'     div(class = "title", title),
#'     div(class = "company", company)
#'   )
#' }
#' if (interactive()) {
#'   browsable(shiny::fluidPage(
#'     theme = theme,
#'     person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'     person("John D. Rockefeller", "Chairman", "Standard Oil")
#'   ))
#' }
#'
#' @export
#' @describeIn bs_bundle Add Bootstrap Sass [variable defaults](https://getbootstrap.com/docs/4.4/getting-started/theming/#variable-defaults)
bs_add_variables <- function(theme, ..., .where = "defaults", .default_flag = identical(.where, "defaults")) {
  assert_bs_theme(theme)

  vars <- rlang::list2(...)
  if (any(names2(vars) == "")) stop("Variables must be named.", call. = FALSE)

  # Workaround to the problem of 'blue' winning in the scenario of:
  # bs_add_variables("body-bg" = "blue")
  # bs_add_variables("body-bg" = "red")
  if (.default_flag) {
    vars <- ensure_default_flag(vars)
  }

  bs_bundle(
    theme, do.call(sass_layer, rlang::list2(!!.where := vars))
  )
}

# Given a named list of variable definitions,
# searches each variable's expression for a !default flag,
# and if missing, adds it.
ensure_default_flag <- function(x) {
  Map(
    x, rlang::names2(x),
    f = function(val, nm) {
      # sass::font_collection() has its own default_flag, so warn if they conflict
      if (sass::is_font_collection(val)) {
        if (identical(val$default_flag, FALSE)) {
          message(
            "Ignoring `bs_add_variables()`'s `.default_flag = TRUE` for ",
            "the ", nm, " variable (since it has it's own `default_flag`)."
          )
        }
        return(val)
      }
      val <- paste(as_sass(val), collapse = "\n")
      if (grepl("!default\\s*;*\\s*$", val)) {
        val
      } else {
        paste(sub(";+$", "", val), "!default")
      }
    }
  )
}

#' @describeIn bs_bundle Add additional [Sass rules](https://sass-lang.com/documentation/style-rules)
#' @param rules Sass rules. Anything understood by [sass::as_sass()] may be
#'   provided (e.g., a list, character vector, [sass::sass_file()], etc)
#' @export
bs_add_rules <- function(theme, rules) {
  bs_bundle(theme, sass_layer(rules = rules))
}

#' @describeIn bs_bundle Add additional [Sass
#'   functions](https://rstudio.github.io/sass/articles/sass.html#functions-1)
#' @param functions A character vector or [sass::sass_file()] containing
#'   functions definitions.
#' @export
bs_add_functions <- function(theme, functions) {
  bs_bundle(theme, sass_layer(functions = functions))
}

#' @describeIn bs_bundle Add additional [Sass
#'   mixins](https://rstudio.github.io/sass/articles/sass.html#mixins-1)
#' @param mixins A character vector or [sass::sass_file()] containing
#'   mixin definitions.
#' @export
bs_add_mixins <- function(theme, mixins) {
  bs_bundle(theme, sass_layer(mixins = mixins))
}

#' @describeIn bs_bundle Add additional [sass::sass_bundle()] objects to an existing `theme`.
#' @export
bs_bundle <- function(theme, ...) {
  assert_bs_theme(theme)
  structure(
    sass_bundle(theme, ...),
    class = class(theme)
  )
}
