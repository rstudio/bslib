#' @export
#' @inheritParams card
#' @inheritParams card_body
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, title = NULL,
                          sidebar = NULL, header = NULL, footer = NULL,
                          height = NULL, full_screen = FALSE, wrapper = card_body) {

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
    navs_card_body(content, sidebar)
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, title = NULL,
                           sidebar = NULL, header = NULL, footer = NULL,
                           height = NULL, placement = c("above", "below"),
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
    navs_card_body(content, sidebar),
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

# Always give tab contents the potential to fill since that's akin to the
# normal card() API (i.e. the card() is a fill container) and users have
# option to make the contents fill via card_body(fill = TRUE) and/or card_body_fill()
navs_card_body <- function(content, sidebar) {
  content <- makeTabsFillable(content, fillable = TRUE)
  if (!is.null(sidebar)) {
    content <- card_sidebar(sidebar, content, fillable = TRUE, border = FALSE)
  }
  as.card_item(content)
}


# Given a .tab-content container, mark each relevant .tab-pane as a
# fill container/item.
makeTabsFillable <- function(content, fillable = FALSE, navbar = FALSE) {
  if (!inherits(content, "shiny.tag") || !tagQuery(content)$hasClass("tab-content")) {
    abort("Expected `content` to be a tag with a tab-content class")
  }

  if (isFALSE(fillable)) {
    return(content)
  }

  # Even if only one .tab-pane wants fillable behavior, the .tab-content
  # must to be a fillable container.
  content <- bindFillRole(content, container = TRUE, item = TRUE)

  tagQuery(content)$
    find(".tab-pane")$
    each(function(x, i) {

      if (isTRUE(fillable) || isTRUE(tagGetAttribute(x, "data-value") %in% fillable)) {
        x <- tagAppendAttributes(
          # Remove the margin between nav and content (for page_navbr())
          style = css("--bslib-navbar-margin" = if (navbar) 0),
          bindFillRole(x, container = TRUE, item = TRUE)
        )
      }

      x
    })$
    allTags()
}
