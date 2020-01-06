#' Create a Bootstrap theme
#'
#' `bs_theme_new()` creates a new (global) Bootstrap SASS theme which
#' [bootstrap()] (or [bootstrap_sass()]) can consume (their `theme` argument
#' defaults to `bs_theme_get()`, which get the current global theme). Once a
#' global theme has been created, use [bs_theme_add_variables()] to set
#' SASS variable defaults and [bs_theme_add()] to add arbitrary SASS
#' (via [sass::sass_layer()]s).
#'
#' @param version The major version of Bootstrap to use. A value of
#' `'4-3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] to list possible names.
#' @param defaults Any [sass::as_sass()] `input` to place before Bootstrap's SASS imports.
#' @param rules Any [sass::as_sass()] `input` to place after Bootstrap's SASS imports.
#' @param ... For `bs_theme_add_variables()`, these arguments define SASS variables;
#' otherwise, these arguments are passed along to [sass::sass_layer()].
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#'
#' @rdname theming
#' @export
#' @examples
#'
#' # Theming by overriding Bootstrap variable defaults
#' bs_theme_add_variables(primary = "red !default;")
#' foo_color <- ".foo { color: rgba($primary, 0.3) }"
#' bootstrap_sass(foo_color)
#' bootstrap_sass(foo_color, theme = NULL)
#'
#' # Generate CSS using Bootstrap variables/function/mixins
#' primary_contrast <- list("primary-contrast" = "color-yiq($primary) !default;")
#' bs_theme_add(rules = primary_contrast)
#' bs_sass_partial(
#'   ".bar { color: $primary-contrast }"
#' )
#'
#' # For complex theming projects, it may be useful to combine
#' # individually packaged themes via bs_theme_merge() which
#' # combines several theme into one by layering them
#' # together like an onion -- the pre sass for latter themes
#' # (e.g., blue_primary) is placed _before_ pre sass for former
#' # themes (e.g., red_primary) and post sass for latter themes
#' # is placed _after_ the post sass for former themes
#' bs_theme_add_variables(primary = "blue !default;")
#' bs_theme_add_variables(primary = "red !default;")
#' # The red theme wins out
#' bs_sass_partial(foo_color, theme = primary)
#'
bs_theme_new <- function(version = version_default(), bootswatch = NULL) {
  theme <- bs_theme_create(version)
  theme <- bs_theme_add_bootswatch(theme, version, bootswatch)
  bs_theme_set(theme)
}


#' @rdname theming
#' @export
bs_theme_add_variables <- function(...) {
  vars <- rlang::list2(...)
  if (any(names2(vars) == "")) stop("Variables must be named.", call. = FALSE)
  bs_theme_add(vars)
}

#' @rdname theming
#' @inheritParams sass::sass_layer
#' @export
bs_theme_add <- function(defaults = "", rules = "", ...) {
  old_theme <- bs_theme_get()
  if (is.null(old_theme)) {
    stop("Must call bs_theme_new() before adding to the theme.", call. = FALSE)
  }
  layer <- if (inherits(defaults, "sass_layer")) {
    defaults
  } else {
    sass_layer(defaults = defaults, rules = rules, ...)
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
  if (!is.null(theme) && !is_bs_theme(theme)) {
    stop("`theme` must be a bs_theme object", call. = FALSE)
  }
  old_theme <- options(bootstraplib_theme = theme)
  invisible(old_theme[["bootstraplib_theme"]])
}


bs_theme_create <- function(version = version_default()) {
  version <- version_resolve(version)

  theme <- sass_layer_merge(
    bootstrap_layer(version),
    if (identical(version, "4-3")) bs3compat_layer()
  )

  add_class(theme, "bs_theme")
}

bs_theme_add_bootswatch <- function(theme, version = version_default(), bootswatch = NULL) {
  version <- version_resolve(version)
  bootswatch <- bootswatch_theme_resolve(bootswatch, version)

  theme <- sass_layer_merge(
    theme,
    # This will set a $navbar-height SASS var, even if no bootswatch is used
    # TODO: maybe make navbar adjustment via jQuery instead? https://stackoverflow.com/a/46021836/1583084
    navbar_height_layer(bootswatch, version),
    bootswatch_layer(bootswatch, version)
  )

  add_class(theme, "bs_theme")
}

as_bs_theme <- function(theme) {
  if (is_bs_theme(theme)) return(theme)

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
      if (theme %in% c("4", "4-3", "3")) {
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
