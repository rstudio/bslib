#' Create a Bootstrap theme
#'
#' `bs_theme_new()` creates a new (global) Bootstrap Sass theme which
#' [bootstrap()] (or [bootstrap_sass()]) can consume (their `theme` argument
#' defaults to `bs_theme_get()`, which get the current global theme). Once a
#' global theme has been created, theme customization may be added via
#' 'high-level' (e.g., [bs_theme_base_colors()])
#' and/or 'low-level' (e.g., [bs_theme_add_variables()]) customizations.
#'
#' @param version The major version of Bootstrap to use. A value of
#' `'4+3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] to list possible names.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/}
#'
#' @seealso [bootstrap()], [bs_theme_preview()], [bs_theme_base_colors()], [bs_theme_add_variables()]
#' @rdname theming
#' @export
#' @examples
#'
#' # Themes are stored globally, and if there is no theme present,
#' # bs_theme_get() returns NULL
#' bs_theme_clear()
#' bs_theme_get()
#'
#' # Use latest Bootstrap version, default theme
#' bs_theme_new()
#'
#' # When a theme is set, bs_theme_get() returns all the Sass code
#' # necessary to compile Bootstrap, plus any theming customizations.
#' class(bs_theme_get())
#'
#' # Helpful if you want to know the Bootstrap version of the current theme
#' theme_version()
#'
#' # Preview the current theme styling in a shiny app
#' if (interactive()) bs_theme_preview()
#'
#' # Latest Bootstrap version, minty theme
#' bs_theme_new(bootswatch = "minty")
#' theme_bootswatch()
#' if (interactive()) bs_theme_preview()
#'
#' # Use Bootstrap 3 with theme customization
#' bs_theme_new(3)
#' bs_theme_base_colors(bg = "#444", fg = "#e4e4e4")
#' bs_theme_accent_colors(primary = "#e39777")
#' if (interactive()) bs_theme_preview(with_themer = FALSE)
#'
#' # Since themes are sass layers, you can work with them
#' # locally as if they were any other Sass layer
#' # (i.e. you don't have to modify global state to add theme customizations)
#' #' # Can create a theme and return the object, instead of setting it globally.
#' bs3 <- bs_theme_create("3")
#' red_default <- sass::sass_layer(defaults = list("brand-primary" = "red !default"))
#' bs3 <- sass::sass_layer_merge(bs3, red_default)
#' bootstrap_sass(".my-class { color: $brand-primary; }", bs3)
#'
bs_theme_new <- function(version = version_default(), bootswatch = NULL) {
  theme <- bs_theme_create(version, bootswatch)
  bs_theme_set(theme)
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

#' @rdname theming
#' @export
bs_theme_create <- function(version = version_default(), bootswatch = NULL) {
  version <- version_resolve(version)

  theme <- sass_layer_merge(
    bootstrap_layer(version),
    if (identical(version, "4+3")) bs3compat_layer()
  )

  theme <- add_class(theme, "bs_theme")

  bs_theme_add_bootswatch(theme, version, bootswatch)
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
