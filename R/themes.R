#' Create a Bootstrap theme
#'
#' Use [bs_theme_set()] to set a global Bootstrap SASS which
#' [bootstrap()] (or [bootstrap_sass()]) can consume (their `theme` argument
#' defaults to `bs_theme_get()`, which get the current global theme). Use
#' [bs_theme_add()] to add additional SASS to the existing global theme.
#' Use [bs_theme_add_variables()] to add SASS variable to the existing global
#' theme. Use [bs_theme_set_theme()] to set a theme object (i.e., the return value)
#' of [bs_theme_get()] to the current theme.
#'
#' @param defaults Any [sass::as_sass()] `input` to place before Bootstrap's SASS imports.
#' @param rules Any [sass::as_sass()] `input` to place after Bootstrap's SASS imports.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] for a list of possible names.
#' @param version The major version of Bootstrap to use. A value of
#' `'4-3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
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
bs_theme_add_variables <- function(...) {
  vars <- rlang::list2(...)
  if (any(names2(vars) == "")) stop("Variables must be named.", call. = FALSE)
  bs_theme_add(vars)
}

#' @rdname theming
#' @export
bs_theme_add <- function(defaults = "", rules = "", bootswatch = NULL,
                         version = version_default(), ...) {
  bs_theme_set(bs_theme_merge(
    theme = bs_theme_get(),
    bootswatch = bootswatch, version = version,
    defaults = defaults, rules = rules, ...
  ))
}

#' @rdname theming
#' @export
bs_theme_set <- function(theme) {
  old_theme <- options(bootstraplib_theme = theme)
  invisible(old_theme[["bootstraplib_theme"]])
}

#' @rdname theming
#' @export
bs_theme_get <- function() {
  getOption("bootstraplib_theme") %||% bs_theme_merge()
}

#' @rdname theming
#' @export
bs_theme_clear <- function() {
  invisible(options(bootstraplib_theme = NULL)[["bootstraplib_theme"]])
}


bs_theme_merge <- function(theme = NULL, bootswatch = NULL,
                           version = version_default(), ...) {
  version <- version_resolve(version)
  bootswatch <- bootswatch_theme_resolve(bootswatch, version)

  # Not allowed to use two different major versions
  old_version <- theme_version(theme)
  if (!is.null(old_version) &&
      any(substr(old_version, 1, 1) != substr(version, 1, 1))) {
    stop(
      "Don't know how to merge two different major Bootstrap versions. ",
      "Old version:", old_version, ".",
      "New version:", version
    )
  }

  # TODO: maybe make navbar adjustment via jQuery instead? https://stackoverflow.com/a/46021836/1583084
  theme <- navbar_height_layer_merge(theme, bootswatch, version)
  theme <- bs3compat_layer_merge(theme, version)
  theme <- bootswatch_layer_merge(theme, bootswatch, version)
  theme <- sass_layer_merge(
    theme, sass_layer(...),
    sass_layer(tags = paste0("bootstraplib_version_", version))
  )
  structure(theme, class = unique(c("bs_theme", oldClass(theme))))
}

is_bs_theme <- function(x) {
  inherits(x, "bs_theme")
}

as_bs_theme <- function(theme) {
  # NULL/empty string means vanilla Bootstrap
  if (is.null(theme)) return(bs_theme_merge())

  # Support bootstrap(theme = 4)
  if (is.numeric(theme)) return(bs_theme_merge(version = theme))

  # Support `bootstrap(theme = 'bootswatch@version')`
  if (is_string(theme)) {
    theme <- strsplit(theme, "@", fixed = TRUE)[[1]]
    if (length(theme) == 2) {
      return(bs_theme_merge(bootswatch = theme[1], version = theme[2]))
    }
    # Also support `bootstrap(version = '4')` and `bootstrap(theme = 'bootswatch')`
    if (length(theme) == 1) {
      if (theme %in% c("4", "4-3", "3")) {
        return(bs_theme_merge(version = theme))
      } else {
        return(bs_theme_merge(bootswatch = theme))
      }
    }
    stop("If `theme` is a string, it can't contain more than one @")
  }

  if (is_bs_theme(theme)) return(theme)

  stop(
    "`theme` must be one of the following: (1) `NULL`, ",
    "(2) a bootswatch@version string, ",
    "(3) the result of `bs_theme_get()`, "
  )
}
