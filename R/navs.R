#' @export
#' @inheritParams card
#' @inheritParams card_body
#' @inheritParams page_navbar
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, title = NULL,
                          sidebar = NULL, fill = FALSE,
                          header = NULL, footer = NULL, height = NULL,
                          full_screen = FALSE, wrapper = card_body) {

  items <- collect_nav_items(..., wrapper = wrapper)

  tabs <- navs_tab(
    !!!items, id = id, selected = selected, header = header, footer = footer
  )

  tabQ <- tagQuery(tabs)

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- tabQ$children(".nav")$addClass("card-header-tabs")$selectedTags()[[1]]
  content <- tabQ$children(".tab-content")$selectedTags()[[1]]

  card(
    height = height,
    full_screen = full_screen,
    if (!is.null(title)) {
      card_header(class = "bslib-navs-card-title", tags$span(title), nav)
    } else {
      card_header(nav)
    },
    navs_card_body(content, sidebar, fill)
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, title = NULL,
                           sidebar = NULL, fill = FALSE,
                           header = NULL, footer = NULL, height = NULL,
                           placement = c("above", "below"),
                           full_screen = FALSE, wrapper = card_body) {

  items <- collect_nav_items(..., wrapper = wrapper)

  pills <- navs_pill(
    !!!items, id = id, selected = selected,
    header = header, footer = footer
  )

  above <- match.arg(placement) == "above"

  pillQ <- tagQuery(pills)

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- pillQ$children(".nav")$addClass(if (above) "card-header-pills")$selectedTags()[[1]]
  content <- pillQ$children(".tab-content")$selectedTags()[[1]]

  nav_args <- if (!is.null(title)) {
    list(class = "bslib-navs-card-title", tags$span(title), nav)
  } else {
    list(nav)
  }

  card(
    height = height,
    full_screen = full_screen,
    if (above) card_header(!!!nav_args),
    navs_card_body(content, sidebar, fill),
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

navs_card_body <- function(content, sidebar, fill) {
  content <- fill_tab_content(content, fill)
  if (!is.null(sidebar)) {
    content <- layout_sidebar(sidebar, content, fill = !isFALSE(fill), border = FALSE)
  }
  as.card_item(content)
}


# Given a .tab-content container, mark each relevant .tab-pane as a
# fill container/item.
fill_tab_content <- function(content, fill = FALSE, navbar_margin = FALSE) {
  if (!inherits(content, "shiny.tag") || !tagQuery(content)$hasClass("tab-content")) {
    abort("Expected `content` to be a tag with a tab-content class")
  }

  if (isFALSE(fill)) {
    return(content)
  }

  # Even if only one .tab-pane wants fill behavior, the .tab-content
  # must to be a fill container.
  content <- bindFillRole(content, container = TRUE, item = TRUE)

  tagQuery(content)$
    find(".tab-pane")$
    each(function(x, i) {
      if (isTRUE(fill) || isTRUE(fill == tagGetAttribute(x, "data-value"))) {
        x <- bindFillRole(x, container = TRUE, item = TRUE)
        # Only relevant for page_navbar()/navs_bar()
        if (navbar_margin) {
          x <- tagAppendAttributes(x, style = css("--bslib-navbar-margin" = 0))
        }
      }
      x
    })$
    allTags()
}
