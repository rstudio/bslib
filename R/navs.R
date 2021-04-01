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
  navbars <- tagQuery(bars)$find(".navbar")
  # TODO: use $selectedLength() instead
  n <- length(navbars$selectedTags())
  res <- tagList(
    navbars$
      filter(function(x, i) i != n)$
      addAttrs(style = "margin-bottom: 0")$
      allTags(),
    tagQuery(bars)$
      find(".tab-content")$
      selectedTags()
  )

  fragment(res, page = bs_page)
}


navs_card <- function(x) {
  # TODO: warn if $selectedLength() > 1?
  content <- tagQuery(x)$find(".tab-content")
  nav <- tagQuery(x)$find(".nav")

  nav <- nav$
    find(".nav-tabs")$
    addClass("card-header-tabs")$
    allTags()

  nav <- nav$
    find(".nav-pills")$
    addClass("card-header-pills")$
    allTags()

  card(content, header = nav)
}
