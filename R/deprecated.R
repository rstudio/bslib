#' Deprecated functions
#'
#' These functions have been deprecated but remain for backwards compatibility.
#'
#' @section v0.9.1:
#'   The function `sidebar_toggle()` is now deprecated in v0.9.1. Please use
#'   [toggle_sidebar()] instead.
#'
#' @section Navigation Containers:
#'
#'   Several functions for navigation containers were renamed in version 0.5.0:
#'
#'   - `nav()` was renamed [nav_panel()]
#'   - `nav_content()` was renamed [nav_panel_hidden()]
#'   - `navs_tab()` was renamed [navset_tab()]
#'   - `navs_pill()` was renamed [navset_pill()]
#'   - `navs_pill_list()` was renamed [navset_pill_list()]
#'   - `navs_hidden()` was renamed [navset_hidden()]
#'   - `navs_bar()` was renamed [navset_bar()]
#'   - `navs_tab_card()` was renamed [navset_card_tab()]
#'   - `navs_pill_card()` was renamed [navset_card_pill()]
#'
#' @keywords internal
#' @name deprecated
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

bs_global_accent_colors <- function(
  primary = NULL,
  secondary = NULL,
  success = NULL,
  info = NULL,
  warning = NULL,
  danger = NULL
) {
  theme <- assert_global_theme("bs_global_accent_colors()")
  theme <- bs_accent_colors(
    theme,
    primary = primary,
    secondary = secondary,
    success = success,
    info = info,
    warning = warning,
    danger = danger
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

#' @rdname deprecated
#' @export
sidebar_toggle <- function(id, open = NULL, session = get_current_session()) {
  lifecycle::deprecate_warn(
    "0.9.1",
    "sidebar_toggle()",
    "toggle_sidebar()"
  )
  toggle_sidebar(id = id, open = open, session = session)
}

#  Legacy Nav Containers --------------------------------------------------
# This is needed since some shiny functions like `tabPanel()` call
# `nav()` underneath the hood. In a future release of shiny, we
# could/should require bslib > 0.4.2, update it to use the new version
# (`nav_panel()`), then we won't need this fancy deprecation
deprecate_if_not_called_from_shiny <- function(old_name, new, version) {
  new_name <- deparse(substitute(new))

  function(...) {
    caller_fn_env <- environment(rlang::caller_fn())
    if (!is.null(caller_fn_env) && rlang::is_environment(caller_fn_env)) {
      caller_fn_env <- rlang::env_name(caller_fn_env)
    }
    if (!identical(caller_fn_env, "namespace:shiny")) {
      msg <- sprintf(
        "`%s()` was deprecated in {bslib} version %s, use `%s()` instead.",
        old_name,
        version,
        new_name
      )
      .Deprecated(msg = msg)
    }
    new(...)
  }
}

#' @rdname deprecated
#' @export
nav <- deprecate_if_not_called_from_shiny(
  old_name = "nav",
  new = nav_panel,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
nav_content <- deprecate_if_not_called_from_shiny(
  old_name = "nav_content",
  new = nav_panel_hidden,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_tab <- deprecate_if_not_called_from_shiny(
  old_name = "navs_tab",
  new = navset_tab,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_pill <- deprecate_if_not_called_from_shiny(
  old_name = "navs_pill",
  new = navset_pill,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_pill_list <- deprecate_if_not_called_from_shiny(
  old_name = "navs_pill_list",
  new = navset_pill_list,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_hidden <- deprecate_if_not_called_from_shiny(
  old_name = "navs_hidden",
  new = navset_hidden,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_bar <- deprecate_if_not_called_from_shiny(
  old_name = "navs_bar",
  new = navset_bar,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_tab_card <- deprecate_if_not_called_from_shiny(
  old_name = "navs_tab_card",
  new = navset_card_tab,
  version = "0.5.0"
)

#' @rdname deprecated
#' @export
navs_pill_card <- deprecate_if_not_called_from_shiny(
  old_name = "navs_pill_card",
  new = navset_card_pill,
  version = "0.5.0"
)
