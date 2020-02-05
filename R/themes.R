#' Create a Bootstrap theme
#'
#' `bs_theme_new()` creates a new (global) Bootstrap Sass theme which
#' [bootstrap()] (or [bootstrap_sass()]) can consume (their `theme` argument
#' defaults to `bs_theme_get()`, which get the current global theme). Once a
#' global theme has been created, use [bs_theme_add_variables()] to set
#' Sass variable defaults and [bs_theme_add()] to add arbitrary Sass
#' (via [sass::sass_layer()]s).
#'
#' @param version The major version of Bootstrap to use. A value of
#' `'4+3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] to list possible names.
#' @param defaults Any [sass::as_sass()] `input` to place before Bootstrap's Sass.
#' @param declarations Any [sass::as_sass()] `input` to place after Bootstrap's variables,
#' functions, and mixins, but before Bootstrap's styling rules.
#' @param rules Any [sass::as_sass()] `input` to place after Bootstrap's Sass imports.
#' @param ... For `bs_theme_add_variables()`, these arguments define Sass variables;
#' otherwise, these arguments are passed along to [sass::sass_layer()].
#' @param .where whether to place the variable definitions before other
#' Sass `"defaults"`, after other Sass `"declarations"`, or after other Sass `"rules"`.
#' @param .default_flag whether or not to add a `!default` flag (if missing) to
#' variable expressions. It's recommended to keep this as `TRUE` when
#' `.where = "defaults"`.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/}
#'
#' @rdname theming
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
#'
#' # Once a theme has been set, you can get it, and see which
#' # version/bootswatch was specified
#' bs_theme_new(bootswatch = "cosmo")
#' theme <- bs_theme_get()
#' theme_version(theme)
#' theme_bootswatch(theme)
#'
#' # Themes are just sass_layer(), so you can work with them locally
#' # just like any other sass layer
#' # https://rstudio.github.io/sass/articles/sass.html#layers
#' class(theme)
#' layer <- sass::sass_layer("$primary: red")
#' theme <- sass::sass_layer_merge(theme, layer)
#' bs_theme_set(theme)
#'
bs_theme_new <- function(version = version_default(), bootswatch = NULL) {
  theme <- bs_theme_create(version)
  theme <- bs_theme_add_bootswatch(theme, version, bootswatch)
  bs_theme_set(theme)
}


#' @rdname theming
#' @export
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

#' @rdname theming
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


#' @rdname theming
#' @export
bs_theme_get <- function() {
  getOption("bootstraplib_theme")
}

#' @rdname theming
#' @export
bs_theme_clear <- function() {
  old_theme <- options(bootstraplib_theme = NULL)
  invisible(old_theme[["bootstraplib_theme"]])
}

#' @rdname theming
#' @param theme a theme object (i.e., the return value of `bs_theme_get()`).
#' @export
bs_theme_set <- function(theme) {
  if (!is.null(theme)) {
    theme <- as_bs_theme(theme)
  }
  old_theme <- options(bootstraplib_theme = theme)
  invisible(old_theme[["bootstraplib_theme"]])
}


bs_theme_create <- function(version = version_default()) {
  version <- version_resolve(version)

  theme <- sass_layer_merge(
    bootstrap_layer(version),
    if (identical(version, "4+3")) bs3compat_layer()
  )

  add_class(theme, "bs_theme")
}

bs_theme_add_bootswatch <- function(theme, version = version_default(), bootswatch = NULL) {
  version <- version_resolve(version)
  bootswatch <- bootswatch_theme_resolve(bootswatch, version)

  theme <- sass_layer_merge(
    theme,
    # This will set a $navbar-height Sass var, even if no bootswatch is used
    # TODO: maybe make navbar adjustment via jQuery instead? https://stackoverflow.com/a/46021836/1583084
    navbar_height_layer(bootswatch, version),
    bootswatch_layer(bootswatch, version)
  )

  add_class(theme, "bs_theme")
}

as_bs_theme <- function(theme) {
  if (is_bs_theme(theme)) return(theme)

  # Allow users to do something like
  # bootstrap(theme = sass_layer_merge(bs_theme_get(), my_layer()))
  if (inherits(theme, "sass_layer")) {
    theme <- add_class(theme, "bs_theme")
    if (is.null(theme_version(theme))) {
      stop("Wasn't able to figure out the Bootstrap version.")
    }
    return(theme)
  }

  # NULL means default Bootstrap
  if (is.null(theme)) return(bs_theme_create())

  # For example, `bootstrap(theme = 4)`
  if (is.numeric(theme)) return(bs_theme_create(version = theme))

  # For example, `bootstrap(theme = 'bootswatch@version')`
  if (is_string(theme)) {
    theme <- strsplit(theme, "@", fixed = TRUE)[[1]]
    if (length(theme) == 2) {
      theme_obj <- bs_theme_create(version = theme[2])
      theme_obj <- bs_theme_add_bootswatch(
        theme_obj, version = theme[2], bootswatch = theme[1]
      )
      return(theme_obj)
    }
    # Also support `bootstrap(version = '4')` and `bootstrap(theme = 'bootswatch')`
    if (length(theme) == 1) {
      if (theme %in% c("4", "4-3", "4+3", "3")) {
        return(bs_theme_create(version = theme))
      } else {
        return(bs_theme_add_bootswatch(bs_theme_create(), bootswatch = theme))
      }
    }
    stop("If `theme` is a string, it can't contain more than one @")
  }

  stop(
    "`theme` must be one of the following: (1) `NULL`, ",
    "(2) a `'bootswatch@version'` string, ",
    "(3) the result of `bs_theme_get()`."
  )
}


is_bs_theme <- function(x) {
  inherits(x, "bs_theme")
}
