#' @export
#' @inheritParams card
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @param padding Whether vertical and/or horizontal padding should be included
#'   around contents. Use `NULL` for neither, `"x"` for horizontal only,
#'   `"y"` for vertical only, or `c("x", "y")` for both (the default).
#' @param stretch If `TRUE`, the contents will stretch to fit remaining space
#'   in the card body.
#' @param full_screen If `TRUE`, a icon will appear when hovering over the card body
#'   to expand the contents to the entire viewport size.
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, title = NULL,
                          header = NULL, footer = NULL, height = NULL, width = NULL,
                          padding = c("x", "y"), stretch = full_screen,
                          full_screen = FALSE) {

  items <- rlang::list2(...)

  tabs <- navs_tab(
    !!!items, id = id, selected = selected, header = header, footer = footer
  )

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- tagQuery(tabs)$
    find(".nav")$
    addClass("card-header-tabs")$
    selectedTags()

  card(
    height = height, width = width, full_screen = full_screen,
    if (!is.null(title)) {
      card_header(class = "bslib-card-title", tags$span(title), nav)
    } else {
      card_header(nav)
    },
    navs_card_body(tabs, padding, stretch)
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, title = NULL,
                           header = NULL, footer = NULL, height = NULL, width = NULL,
                           padding = c("x", "y"), stretch = full_screen,
                           full_screen = FALSE, placement = c("above", "below")) {

  items <- rlang::list2(...)

  pills <- navs_pill(
    !!!items, id = id, selected = selected,
    header = header, footer = footer
  )

  above <- match.arg(placement) == "above"

  nav <- tagQuery(pills)$
    find(".nav")$
    addClass(if (above) "card-header-pills")$
    selectedTags()

  nav_args <- if (!is.null(title)) {
    list(class = "bslib-card-title", tags$span(title), nav)
  } else {
    list(nav)
  }

  card(
    height = height, width = width, full_screen = full_screen,
    if (above) card_header(!!!nav_args),
    navs_card_body(pills, padding, stretch),
    if (!above) card_footer(!!!nav_args)
  )
}

navs_card_body <- function(tabs, padding, stretch) {

  content <- tagQuery(tabs)$find(".tab-content")$selectedTags()

  if (length(content) > 1) {
    stop("Found more than 1 .tab-content CSS class. Please use another name for your CSS classes.")
  }

  content <- content[[1]]

  if (stretch) {
    # TODO: maybe this should be display:flex; flex-direction: column?
    content <- tagAppendAttributes(content, style = "height:100%")
    content <- tagAppendAttributes(content, .cssSelector = ".tab-pane", style = "height:100%")
  }

  card_body(content, padding = padding, stretch = stretch)
}
