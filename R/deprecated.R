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

#  Legacy Nav Containers --------------------------------------------------
#' @rdname deprecated
#' @export
nav <- function(...) {
  .Deprecated("nav_panel", old = "nav")
  nav_panel(...)
}

#' @rdname deprecated
#' @export
nav_content <- function(...) {
  .Deprecated("nav_panel_hidden", old = "nav_content")
  nav_panel_hidden(...)
}

#' @rdname deprecated
#' @export
navs_tab <- function(...) {
  .Deprecated("navset_tab", old = "navs_tab")
  navset_tab(...)
}

#' @rdname deprecated
#' @export
navs_pill <- function(...) {
  .Deprecated("navset_pill", old = "navs_pill")
  navset_pill(...)
}

#' @rdname deprecated
#' @export
navs_pill_list <- function(...) {
  .Deprecated("navset_pill_list", old = "navs_pill_list")
  navset_pill_list(...)
}

#' @rdname deprecated
#' @export
navs_hidden <- function(...) {
  .Deprecated("navset_hidden", old = "navs_hidden")
  navset_hidden(...)
}

#' @rdname deprecated
#' @export
navs_bar <- function(...) {
  .Deprecated("navset_bar", old = "navs_bar")
  navset_bar(...)
}

#' @rdname deprecated
#' @export
navs_tab_card <- function(...) {
  .Deprecated("navset_card_tab", old = "navs_tab_card")
  navset_card_tab(...)
}

#' @rdname deprecated
#' @export
navs_pill_card <- function(...) {
  .Deprecated("navset_card_pill", old = "navs_pill_card")
  navset_card_pill(...)
}
