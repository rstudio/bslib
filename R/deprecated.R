#' Deprecated functions
#'
#' These functions have been deprecated but remain for backwards compatibility.
#'
#' @keywords internal
#' @rdname deprecated
#' @export
bs_theme_new <- function(...) {
  .Deprecated("bs_global_theme")
  bs_global_theme(...)
}

#' @rdname deprecated
#' @export
bs_theme_clear <- function(...) {
  .Deprecated("bs_global_clear")
  bs_global_clear(...)
}

#' @rdname deprecated
#' @export
bs_theme_get <- function(...) {
  .Deprecated("bs_global_get")
  bs_global_get(...)
}

#' @rdname deprecated
#' @export
bs_theme_set <- function(...) {
  .Deprecated("bs_global_set")
  bs_global_set(...)
}

#' @rdname deprecated
#' @export
bs_theme_base_colors <- function(...) {
  .Deprecated("bs_global_base_colors")
  bs_global_base_colors(...)
}

bs_global_base_colors <- function(bg = "#FFFFFF", fg = "#000000") {
  theme <- assert_global_theme("bs_global_base_colors()")
  theme <- bs_base_colors(theme, bg = bg, fg = fg)
  bs_global_set(theme)
}

#' @rdname deprecated
#' @export
bs_theme_accent_colors <- function(...) {
  .Deprecated("bs_global_accent_colors")
  bs_global_accent_colors(...)
}

bs_global_accent_colors <- function(primary = NULL, secondary = NULL, success = NULL,
                                    info = NULL, warning = NULL, danger = NULL) {
  theme <- assert_global_theme("bs_global_accent_colors()")
  theme <- bs_accent_colors(
    theme, primary = primary, secondary = secondary, success = success,
    info = info, warning = warning, danger = danger
  )
  bs_global_set(theme)
}

#' @rdname deprecated
#' @export
bs_theme_fonts <- function(...) {
  .Deprecated("bs_global_fonts")
  bs_global_fonts(...)
}

bs_global_fonts <- function(base = NULL, code = NULL, heading = NULL) {
  theme <- assert_global_theme("bs_global_fonts()")
  theme <- bs_fonts(theme, base = base, code = code, heading = heading)
  bs_global_set(theme)
}

#' @rdname deprecated
#' @export
bs_theme_add_variables <- function(...) {
  .Deprecated("bs_global_add_variables")
  bs_global_add_variables(...)
}

bs_global_add_variables <- function(..., .where = "defaults",
                                    .default_flag = identical(.where, "defaults")) {
  theme <- assert_global_theme("bs_global_add_variables()")
  theme <- bs_add_variables(theme, ..., .where = .where, .default_flag = .default_flag)
  bs_global_set(theme)
}

#' @rdname deprecated
#' @export
bs_theme_add <- function(...) {
  .Deprecated("bs_global_add_layers")
  bs_global_add_layers(sass::sass_layer(...))
}

bs_global_add_layers <- function(theme = bs_theme(), ...) {
  theme <- assert_global_theme("bs_global_add_layer()")
  theme <- bs_add_layers(theme, ...)
  bs_global_set(theme)
}

#' @rdname deprecated
#' @export
bs_theme_get_variables <- function(...) {
  .Deprecated("bs_global_get_variables")
  bs_global_get_variables(...)
}

bs_global_get_variables <- function(varnames) {
  theme <- assert_global_theme("bs_global_get_variables()")
  bs_get_variables(theme, varnames)
}

#' @rdname deprecated
#' @export
bootstrap <- function(...) {
  .Deprecated("bs_dependencies")
  bs_dependencies(...)
}

#' @rdname deprecated
#' @export
bootstrap_sass <- function(...) {
  .Deprecated("bs_sass")
  bs_sass(...)
}
