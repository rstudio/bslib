#' Global theming
#'
#' `bs_global_theme()` creates a new (global) Bootstrap Sass theme which
#' [bs_dependencies()] (or [bs_sass()]) can consume (their `theme` argument
#' defaults to `bs_global_get()`, which get the current global theme).
#'
#' @inheritParams bs_theme
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
  old_theme <- options(bootstraplib_theme = theme)
  invisible(old_theme[["bootstraplib_theme"]])
}

#' @rdname bs_global_theme
#' @export
bs_global_get <- function() {
  getOption("bootstraplib_theme")
}

#' @rdname bs_global_theme
#' @export
bs_global_clear <- function() {
  old_theme <- options(bootstraplib_theme = NULL)
  invisible(old_theme[["bootstraplib_theme"]])
}


assert_global_theme <- function(calling_func) {
  theme <- bs_global_get()
  if (is.null(theme)) {
    stop("`", calling_func, "` requires that a global theme is first set (do you want to call `bs_global_theme()`?)")
  }
  theme
}

