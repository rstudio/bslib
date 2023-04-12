#' @include nav-items.R navs-legacy.R navs.R

# nav-items Aliases for future deprecation ----------------------------------

# TODO: Deprecate `nav()`` in a future version of {bslib}
#' @describeIn nav An alias for `nav_panel()`.
#' @export
nav <- nav_panel

# TODO: Deprecate `nav_content()` in a future version of {bslib}
#' @describeIn nav An alias for `nav_panel_hidden()`.
#' @export
nav_content <- nav_panel_hidden


# navs_*() Aliases for future deprecation -----------------------------------

# TODO: Deprecate `navs_tab()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_tab()`.
#' @export
navs_tab <- navset_tab

# TODO: Deprecate `navs_pill()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_pill()`.
#' @export
navs_pill <- navset_pill

# TODO: Deprecate `navs_pill_list()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_pill_list()`.
#' @export
navs_pill_list <- navset_pill_list

# TODO: Deprecate `navs_hidden()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_hidden()`.
#' @export
navs_hidden <- navset_hidden

# TODO: Deprecate `navs_bar()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_bar()`.
#' @export
navs_bar <- navset_bar

# TODO: Deprecate `navs_tab_card()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_card_tab()`.
#' @export
navs_tab_card <- navset_card_tab

# TODO: Deprecate `navs_pill_card()` in a future version of {bslib}
#' @describeIn navs An alias for `navset_card_pill()`.
#' @export
navs_pill_card <- navset_card_pill
