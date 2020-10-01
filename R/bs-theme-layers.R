#' Add low-level theming customizations
#'
#' Use [bs_add_variables()] to add Bootstrap Sass [variable
#' defaults](https://getbootstrap.com/docs/4.4/getting-started/theming/#variable-defaults),
#' [bs_add_rules()] to add additional [Sass
#' rules](https://sass-lang.com/documentation/style-rules), and
#' [bs_add_declarations()] to add Sass
#' [functions](https://sass-lang.com/documentation/at-rules/function) and
#' [mixins](https://sass-lang.com/documentation/at-rules/mixin). Compared to
#' higher-level theme customization available in [bs_theme()], these functions
#' are a more direct interface to Bootstrap Sass, and therefore, do nothing to
#' ensure the theme customization you add are portable between major Bootstrap
#' versions.
#'
#' @inheritParams bs_theme_update
#' @param ... For `bs_add_variables()`, these arguments should contain Sass
#'   variables; otherwise, these arguments should contain [sass::sass_layer()]s.
#' @param .where whether to place the variable definitions before other Sass
#'   `"defaults"`, after other Sass `"declarations"`, or after other Sass
#'   `"rules"`.
#' @param .default_flag whether or not to add a `!default` flag (if missing) to
#'   variable expressions. It's recommended to keep this as `TRUE` when `.where
#'   = "defaults"`.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/articles/sass.html#layering}
#' @examples
#'
#' # Function to preview the styling a (primary) Bootstrap button
#' library(htmltools)
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' preview_button <- function(theme) {
#'   browsable(tags$body(bs_dependencies(theme), button))
#' }
#'
#' # Here we start with a theme based on a Bootswatch theme,
#' # then override some variable defaults
#' theme <- bs_theme(bootswatch = "sketchy", primary = "orange") %>%
#'   bs_add_variables(
#'     "body-bg" = "#EEEEEE",
#'     "font-family-base" = "monospace",
#'     "font-size-base" = "1.4rem",
#'     "btn-padding-y" = ".16rem",
#'     "btn-padding-x" = "2rem",
#'     "border-radius" = 0,
#'     "border-radius-lg" = 0,
#'     "border-radius-sm" = 0
#'   )
#'
#' preview_button(theme)
#'
#' # If you need to set a variable based on another Bootstrap variable
#' theme %>%
#'   bs_add_variables("body-color" = "$success", .where = "declarations") %>%
#'   preview_button()
#'
#' # Start a new global theme and add some custom rules that
#' # use Bootstrap variables to define a custom styling for a
#' # 'person card'
#' person_rules <- system.file("custom", "person.scss", package = "bootstraplib")
#' theme <- bs_add_rules(bs_theme(), rules = sass::sass_file(person_rules))
#' # Include custom CSS that leverages bootstrap Sass variables
#' person <- function(name, title, company) {
#'   tags$div(
#'     class = "person",
#'     h3(class = "name", name),
#'     div(class = "title", title),
#'     div(class = "company", company)
#'   )
#' }
#' browsable(tags$body(
#'   bs_dependencies(theme),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
#' @export
bs_add_defaults <- function(theme, ...) {
  bs_add_variables(theme, ...)
}

#' @rdname bs_add_defaults
#' @export
bs_add_variables <- function(theme, ..., .where = "defaults", .default_flag = identical(.where, "defaults")) {
  assert_bs_theme(theme)

  vars <- rlang::list2(...)
  if (any(names2(vars) == "")) stop("Variables must be named.", call. = FALSE)
  .where <- match.arg(.where, c("defaults", "declarations", "rules"))

  # Workaround to the problem of 'blue' winning in the scenario of:
  # bs_add_variables("body-bg" = "blue")
  # bs_add_variables("body-bg" = "red")
  if (.default_flag) {
    vars <- ensure_default_flag(vars)
  }

  bs_add_layers(
    theme, do.call(sass_layer, setNames(list(vars), .where))
  )
}



# Given a named list of variable definitions,
# searches each variable's expression for a !default flag,
# and if missing, adds it.
ensure_default_flag <- function(x) {
  lapply(x, function(val) {
    val <- paste(sass::as_sass(val), collapse = "\n")
    if (grepl("!default\\s*;*\\s*$", val)) {
      val
    } else {
      paste(sub(";+$", "", val), "!default")
    }
  })
}

#' @rdname bs_add_defaults
#' @export
bs_add_layers <- function(theme, ...) {
  assert_bs_theme(theme)
  is_layer <- vapply(rlang::list2(...), inherits, logical(1), "sass_layer")
  if (!any(is_layer)) {
    stop("`...` must contain a `sass::sass_layer()` object(s)")
  }
  add_class(sass_layer_merge(theme, ...), "bs_theme")
}

#' @rdname bs_global_theme
#' @export
bs_global_add_layers <- function(...) {
  theme <- assert_global_theme("bs_global_add_layer()")
  theme <- bs_add_layers(theme, ...)
  bs_global_set(theme)
}

#' @rdname bs_add_defaults
#' @param rules Sass rules.
#' @export
bs_add_rules <- function(theme, rules) {
  bs_add_layers(theme, sass_layer(rules = rules))
}

#' @rdname bs_add_defaults
#' @param declarations Sass functions and mixins.
#' @export
bs_add_declarations <- function(theme, declarations) {
  bs_add_layers(theme, sass_layer(declarations = declarations))
}
