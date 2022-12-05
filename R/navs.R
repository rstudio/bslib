#' @export
#' @inheritParams card
#' @inheritParams card_body
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, title = NULL,
                          header = NULL, footer = NULL, height = NULL,
                          full_screen = FALSE, wrapper = card_body) {

  items <- collect_nav_items(..., wrapper = wrapper)

  tabs <- navs_tab(
    !!!items, id = id, selected = selected, header = header, footer = footer
  )

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- tagQuery(tabs)$
    find(".nav")$
    addClass("card-header-tabs")$
    selectedTags()

  card(
    height = height,
    full_screen = full_screen,
    if (!is.null(title)) {
      card_header(class = "bslib-navs-card-title", tags$span(title), nav)
    } else {
      card_header(nav)
    },
    navs_card_body(tabs)
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, title = NULL,
                           header = NULL, footer = NULL, height = NULL,
                           placement = c("above", "below"),
                           full_screen = FALSE, wrapper = card_body) {

  items <- collect_nav_items(..., wrapper = wrapper)

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
    list(class = "bslib-navs-card-title", tags$span(title), nav)
  } else {
    list(nav)
  }

  card(
    height = height,
    full_screen = full_screen,
    if (above) card_header(!!!nav_args),
    navs_card_body(pills),
    if (!above) card_footer(!!!nav_args)
  )
}


collect_nav_items <- function(..., wrapper) {
  items <- rlang::list2(...)

  # Wrap any nav() children up into card items
  nav_to_card_item <- function(x) {
    if (isNavbarMenu(x)) {
      x$tabs <- lapply(x$tabs, nav_to_card_item)
    }
    if (isTabPanel(x)) {
      x$children <- as_card_items(x$children, wrapper = wrapper)
    }
    x
  }

  lapply(items, nav_to_card_item)
}

navs_card_body <- function(tabs) {

  tabs <- bindFillRole(tabs, .cssSelector = ".tab-content", container = TRUE, item = TRUE)
  tabs <- bindFillRole(tabs, .cssSelector = ".tab-content > *", container = TRUE, item = TRUE)

  content <- tagQuery(tabs)$find(".tab-content")$selectedTags()

  if (length(content) > 1) {
    stop("Found more than 1 .tab-content CSS class. Please use another name for your CSS classes.")
  }

  as.card_item(content[[1]])
}
