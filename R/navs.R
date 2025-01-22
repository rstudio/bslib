#' @export
#' @inheritParams card
#' @inheritParams card_body
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @include navs-legacy.R
#' @rdname navset
navset_card_tab <- function(
  ...,
  id = NULL,
  selected = NULL,
  title = NULL,
  sidebar = NULL,
  header = NULL,
  footer = NULL,
  height = NULL,
  full_screen = FALSE,
  wrapper = card_body
) {
  navset_card(
    navset_tab,
    "card-header-tabs",
    ...,
    id = id,
    selected = selected,
    title = title,
    sidebar = sidebar,
    header = header,
    footer = footer,
    height = height,
    full_screen = full_screen,
    wrapper = wrapper
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navset
navset_card_pill <- function(
  ...,
  id = NULL,
  selected = NULL,
  title = NULL,
  sidebar = NULL,
  header = NULL,
  footer = NULL,
  height = NULL,
  placement = c("above", "below"),
  full_screen = FALSE,
  wrapper = card_body
) {
  items <- collect_nav_items(..., wrapper = wrapper)

  pills <- navset_pill(!!!items, id = id, selected = selected)

  above <- match.arg(placement) == "above"

  pillQ <- tagQuery(pills)

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- pillQ$children(".nav")$addClass(
    if (above) "card-header-pills"
  )$selectedTags()[[1]]
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
    header,
    navs_card_body(content, sidebar),
    footer,
    if (!above) card_footer(!!!nav_args)
  )
}

#' @export
#' @rdname navset
navset_card_underline <- function(
  ...,
  id = NULL,
  selected = NULL,
  title = NULL,
  sidebar = NULL,
  header = NULL,
  footer = NULL,
  height = NULL,
  full_screen = FALSE,
  wrapper = card_body
) {
  navset_card(
    navset_underline,
    "nav-underline",
    ...,
    id = id,
    selected = selected,
    title = title,
    sidebar = sidebar,
    header = header,
    footer = footer,
    height = height,
    full_screen = full_screen,
    wrapper = wrapper
  )
}

navset_card <- function(
  navset_func,
  nav_class,
  ...,
  id,
  selected,
  title,
  sidebar,
  header,
  footer,
  height,
  full_screen,
  wrapper
) {
  items <- collect_nav_items(..., wrapper = wrapper)

  tabs <- navset_func(!!!items, id = id, selected = selected)

  tabQ <- tagQuery(tabs)

  # https://getbootstrap.com/docs/5.3/components/card/#navigation
  nav <- tabQ$children(".nav")$addClass(nav_class)$selectedTags()[[1]]
  content <- tabQ$children(".tab-content")$selectedTags()[[1]]

  card(
    height = height,
    full_screen = full_screen,
    if (!is.null(title)) {
      card_header(class = "bslib-navs-card-title", tags$span(title), nav)
    } else {
      card_header(nav)
    },
    header,
    navs_card_body(content, sidebar),
    footer
  )
}

collect_nav_items <- function(..., wrapper) {
  items <- rlang::list2(...)

  # Wrap any nav_panel() children up into card items
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
# option to make the contents fill via card_body(fill = TRUE, fillable = TRUE)
navs_card_body <- function(content, sidebar) {
  content <- makeTabsFillable(content, fillable = TRUE, gap = 0, padding = 0)
  if (!is.null(sidebar)) {
    content <- layout_sidebar(
      sidebar = sidebar,
      fillable = TRUE,
      border = FALSE,
      content
    )
  }
  as.card_item(content)
}

# Given a .tab-content container, mark each relevant .tab-pane as a
# fill container/item.
makeTabsFillable <- function(
  content,
  fillable = TRUE,
  navbar = FALSE,
  gap = NULL,
  padding = NULL
) {
  if (
    !inherits(content, "shiny.tag") ||
      !tagQuery(content)$hasClass("tab-content")
  ) {
    abort("Expected `content` to be a tag with a tab-content class")
  }

  if (isFALSE(fillable)) {
    return(content)
  }

  # Even if only one .tab-pane wants fillable behavior, the .tab-content
  # must to be a fillable container.
  content <- bindFillRole(content, container = TRUE, item = TRUE)

  tagQuery(content)$find(".tab-pane")$each(function(x, i) {
    if (
      isTRUE(fillable) || isTRUE(tagGetAttribute(x, "data-value") %in% fillable)
    ) {
      x <- tagAppendAttributes(
        class = "bslib-gap-spacing",
        style = css(
          # Remove the margin between nav and content (for page_navbar())
          "--bslib-navbar-margin" = if (navbar) 0,
          gap = gap,
          padding = padding
        ),
        bindFillRole(x, container = TRUE, item = TRUE)
      )
    }

    x
  })$allTags()
}
