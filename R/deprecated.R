#' Deprecated functions
#'
#' These functions have been deprecated but remain for backwards compatibility.
#'
#' @keywords internal
#' @rdname deprecated
#' @returns a [bs_theme()] object.
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

#' @rdname deprecated
#' @export
bs_theme_add <- function(...) {
  .Deprecated("bs_global_bundle")
  bs_global_bundle(sass::sass_layer(...))
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
bootstrap <- function(theme = bs_theme_get(), ...) {
  .Deprecated("bs_theme_dependencies")
  bs_theme_dependencies(theme, ...)
}

#' @rdname deprecated
#' @export
bootstrap_sass <- function(rules = list(), theme = bs_theme_get(), ...) {
  .Deprecated("sass::sass_partial")
  theme <- as_bs_theme(theme)
  theme$rules <- ""
  sass_partial(rules, theme)
}

#' @rdname deprecated
#' @export
bs_add_declarations <- function(theme, declarations) {
  .Deprecated("bs_add_mixins")
  bs_bundle(theme, sass_layer(declarations = declarations))
}


#' @rdname deprecated
#' @export
card_body_fill <- function(...) {
  .Deprecated("card_body", old = "card_body_fill")
  card_body(...)
}

#' @rdname deprecated
#' @export
page_fill <- function(...) {
  .Deprecated("page_fillable", old = "page_fill")
  page_fillable(...)
}
