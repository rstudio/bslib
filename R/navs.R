#' @export
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, header = NULL, footer = NULL) {
  navs_card(
    navs_tab(..., id = id, selected = selected, header = header, footer = footer)
  )
}

#' @export
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, header = NULL, footer = NULL) {
  navs_card(
    navs_pill(..., id = id, selected = selected, header = header, footer = footer)
  )
}

#' @export
#' @rdname navs
navs_pill_list_menu <- function(..., id = NULL, selected = NULL, header = NULL, footer = NULL) {
  fragment(
    navtreePanel(..., id = id, selected = selected, header = header, footer = footer)
  )
}

# TODO: A special version of navs_bar() that renders top-level nav_menu()s inline via flex
# similar to this https://www.tracktherecovery.org/ ?
# navs_bar_banner <- function() {}

#' @export
navs_bars <- function(...) {
  # TODO: assert these are navs_bar() objects
  bars <- rlang::list2(...)
  navbars <- lapply(bars, find_first_tag, "navbar")
  idx <- seq_len(length(bars) - 1)
  navbars[idx] <- tag_append_attrs(
    navbars[idx], "navbar",
    style = css(margin_bottom = 0)
  )
  contents <- lapply(bars, find_first_tag, "tab-content")
  fragment(tagList(navbars, contents), page = bs_page)
}


navs_card <- function(x) {
  content <- find_first_tag(x, "tab-content")
  nav <- find_first_tag(x, "nav")
  if (has_class(nav, "nav-tabs")) {
    nav <- tagAppendAttributes(nav, class = "card-header-tabs")
  }
  if (has_class(nav, "nav-pills")) {
    nav <- tagAppendAttributes(nav, class = "card-header-pills")
  }
  card(content, header = nav)
}
