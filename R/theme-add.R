#' Add low-level theming customizations
#'
#' Use [bs_theme_add_variables()] to set Bootstrap Sass
#' [variable defaults](https://getbootstrap.com/docs/4.4/getting-started/theming/#variable-defaults)
#' and [bs_theme_add()] to add arbitrary Sass code (i.e., styling rules, functions,
#' mixins, etc).
#'
#' Compared to higher-level theme customization functions
#' (e.g., [bs_theme_base_colors()], etc), these functions are a more direct interface
#' to Bootstrap Sass, and therefore, do nothing to ensure the theme
#' customization you add are portable between major Bootstrap versions.
#'
#' @param ... For `bs_theme_add_variables()`, these arguments define Sass variables;
#' otherwise, these arguments are passed along to [sass::sass_layer()].
#' @param .where whether to place the variable definitions before other
#' Sass `"defaults"`, after other Sass `"declarations"`, or after other Sass `"rules"`.
#' @param .default_flag whether or not to add a `!default` flag (if missing) to
#' variable expressions. It's recommended to keep this as `TRUE` when
#' `.where = "defaults"`.
#'
#' @family customizations
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/articles/sass.html#layering}
#' @export
#' @examples
#'
#' # Function to preview the styling a (primary) Bootstrap button
#' library(htmltools)
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' preview_button <- function(x) {
#'   browsable(tags$body(x, button))
#' }
#'
#' # To create a custom theme, you must start by calling bs_theme_new()
#' # Here we start with a theme based on a Bootswatch theme,
#' # then override some variable defaults
#' bs_theme_new(bootswatch = "sketchy")
#' bs_theme_add_variables(
#'   primary = "orange",
#'   "body-bg" = "#EEEEEE",
#'   "font-family-base" = "monospace",
#'   "font-size-base" = "1.4rem",
#'   "btn-padding-y" = ".16rem",
#'   "btn-padding-x" = "2rem",
#'   "border-radius" = 0,
#'   "border-radius-lg" = 0,
#'   "border-radius-sm" = 0
#' )
#' preview_button(bootstrap())
#'
#' # If you need to set a variable based on another Bootstrap variable
#' bs_theme_add_variables(
#'   "body-color" = "$success",
#'   .where = "declarations"
#' )
#' preview_button(bootstrap())
#'
#' # Start a new global theme and add some custom rules that
#' # use Bootstrap variables to define a custom styling for a
#' # 'person card'
#' bs_theme_new()
#' bs_theme_add(
#'   rules = sass::sass_file(
#'     system.file("custom", "person.scss", package = "bootstraplib")
#'   )
#' )
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
#'   bootstrap(),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
bs_theme_add_variables <- function(..., .where = "defaults",
                                   .default_flag = identical(.where, "defaults")) {
  vars <- rlang::list2(...)
  if (any(names2(vars) == "")) stop("Variables must be named.", call. = FALSE)
  .where <- match.arg(.where, c("defaults", "declarations", "rules"))

  # Workaround to the problem of 'blue' winning in the scenario of:
  # bs_theme_add_variables("body-bg" = "blue")
  # bs_theme_add_variables("body-bg" = "red")
  if (.default_flag) {
    vars <- ensure_default_flag(vars)
  }

  do.call(bs_theme_add, setNames(list(vars), .where))
}

# Given a named list of variable definitions,
# searches each variable's expression for a !default flag,
# and if missing, adds it.
ensure_default_flag <- function(vars) {
  Map(
    function(key, val) {
      val <- paste(sass::as_sass(val), collapse = "\n")
      if (grepl("!default\\s*;*\\s*$", val)) {
        val
      } else {
        paste(sub(";+$", "", val), "!default")
      }
    }, names(vars), vars
  )
}

#' @rdname bs_theme_add_variables
#' @param defaults Any [sass::as_sass()] `input` to place before Bootstrap's Sass.
#' @param declarations Any [sass::as_sass()] `input` to place after Bootstrap's variables,
#' functions, and mixins, but before Bootstrap's styling rules.
#' @param rules Any [sass::as_sass()] `input` to place after Bootstrap's Sass imports.
#' @export
bs_theme_add <- function(defaults = "", declarations = "", rules = "", ...) {
  old_theme <- bs_theme_get()
  if (is.null(old_theme)) {
    stop("Must call bs_theme_new() before adding to the theme.", call. = FALSE)
  }
  if (inherits(defaults, "sass_layer")) {
    if (!identical(declarations, "") || !identical(rules, "") || length(list(...)) > 0) {
      stop(
        "Not allowed to specify other arguments when the first argument, `defaults`, ",
        "is a sass_layer()", call. = FALSE
      )
    }
    layer <- defaults
  } else {
    layer <- sass_layer(defaults = defaults, declarations = declarations, rules = rules, ...)
  }
  layer <- sass_layer_merge(old_theme, layer)
  bs_theme_set(add_class(layer, "bs_theme"))
}
