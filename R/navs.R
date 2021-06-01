#' @export
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL,
                          header = NULL, footer = NULL) {
  tabs <- tagQuery(
    navs_tab(..., id = id, selected = selected, header = header, footer = footer)
  )

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- tabs$
    find(".nav")$
    addClass("card-header-tabs")$
    selectedTags()

  content <- tabs$find(".tab-content")$selectedTags()

  card(header = nav, content, caller = "navs_tab_card()")
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL,
                           header = NULL, footer = NULL,
                           placement = c("above", "below")) {

  pills <- tagQuery(
    navs_pill(..., id = id, selected = selected, header = header, footer = footer)
  )

  above <- match.arg(placement) == "above"

  nav <- pills$
    find(".nav")$
    addClass(if (above) "card-header-pills")$
    selectedTags()

  content <- pills$find(".tab-content")$selectedTags()

  args <- list(nav, content, caller = "navs_pill_card()")

  names(args)[1] <- if (above) "header" else "footer"

  do.call(card, args)
}

card <- function(..., header = NULL, footer = NULL, caller) {
  tag <- div(
    class = "card",
    if (!is.null(header)) div(class = "card-header", header),
    div(class = "card-body", ...),
    if (!is.null(footer)) div(class = "card-footer", footer)
  )
  as_fragment(
    tag_require(tag, version = 4, caller = caller)
  )
}
