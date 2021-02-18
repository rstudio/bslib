#' Global theming
#'
#' `bs_global_theme()` creates a new (global) Bootstrap Sass theme which
#' [bs_theme_dependencies()] (or [sass_partial()]) can consume (their `theme`
#' argument defaults to `bs_global_get()`, which get the current global theme).
#'
#' @inheritParams bs_theme
#'
#' @return functions that modify the global theme (e.g., `bs_global_set()`)
#'   invisibly return the previously set theme. `bs_global_get()` returns the
#'   current global theme.
#'
#' @seealso [bs_theme()], [bs_theme_preview()]
#' @examples
#'
#' # Remember the global state now (so we can restore later)
#' theme <- bs_global_get()
#' # Use Bootstrap 3 (globally) with some theme customization
#' bs_global_theme(3, bg = "#444", fg = "#e4e4e4", primary = "#e39777")
#' if (interactive()) bs_theme_preview(with_themer = FALSE)
#' # If no global theme is active, bs_global_get() returns NULL
#' bs_global_clear()
#' bs_global_get()
#' # Restore the original state
#' bs_global_set(theme)
#'
#' @export
bs_global_theme <- function(version = version_default(), bootswatch = NULL, bg = NULL, fg = NULL,
                            primary = NULL, secondary = NULL, success = NULL, info = NULL, warning = NULL,
                            danger = NULL, base_font = NULL, code_font = NULL, heading_font = NULL, ...) {
  bs_global_set(bs_theme(
    version, bootswatch,
    bg = bg, fg = fg,
    primary = primary,
    secondary = secondary,
    success = success,
    info = info,
    warning = warning,
    danger = danger,
    base_font = base_font,
    code_font = code_font,
    heading_font = heading_font,
    ...
  ))
}


#' @rdname bs_global_theme
#' @inheritParams bs_theme_update
#' @export
bs_global_set <- function(theme = bs_theme()) {
  if (!is.null(theme)) {
    assert_bs_theme(theme)
  }
  # In addition to setting a bslib global option, also set shiny's
  # current theme if this code is running in an `runtime: shiny` doc
  if (is_shiny_runtime() && is_available("shiny", "1.6")) {
    warning(
      "bs_global_set() may not work as expected inside runtime: shiny documents.",
      "To update the document's theme, use `session$setCurrentTheme()` instead."
    )
  }
  old_theme <- options(bslib_theme = theme)
  invisible(old_theme[["bslib_theme"]])
}

#' @rdname bs_global_theme
#' @export
bs_global_get <- function() {
  getOption("bslib_theme")
}

#' @rdname bs_global_theme
#' @export
bs_global_clear <- function() {
  old_theme <- options(bslib_theme = NULL)
  invisible(old_theme[["bslib_theme"]])
}

#' @rdname bs_global_theme
#' @inheritParams bs_add_variables
#' @export
bs_global_add_variables <- function(..., .where = "defaults",
                                    .default_flag = identical(.where, "defaults")) {
  theme <- assert_global_theme("bs_global_add_variables()")
  theme <- bs_add_variables(theme, ..., .where = .where, .default_flag = .default_flag)
  bs_global_set(theme)
}

#' @rdname bs_global_theme
#' @export
bs_global_add_rules <- function(...) {
  theme <- assert_global_theme("bs_global_add_rules()")
  theme <- bs_add_rules(theme, ...)
  bs_global_set(theme)
}

#' @rdname bs_global_theme
#' @export
bs_global_bundle <- function(...) {
  theme <- assert_global_theme("bs_global_bundle()")
  theme <- bs_bundle(theme, ...)
  bs_global_set(theme)
}




assert_global_theme <- function(calling_func) {
  theme <- bs_global_get()
  if (is.null(theme)) {
    stop("`", calling_func, "` requires that a global theme is first set (do you want to call `bs_global_theme()`?)")
  }
  theme
}
