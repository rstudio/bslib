#' Create a Bootstrap Card Component
#'
#' A wrapper for Bootstrap 4+'s `card` component.
#'
#' @param ... UI elements for the `card()`'s body.
#' @param header A character string or UI element for the header.
#' @param footer A character string or UI element for the footer.
#' @param lead A character string or UI element for the body's main text.
#' @param title A character string or UI element for the body's title.
#' @param subtitle A character string or UI element for the body's subtitle.
#' @return The newly created card container.
#' @export
#' @family Component
#' @examples
#'
#' library(htmltools)
#'
#' card1 <- bs_card("This is some text within a card body.")
#'
#' card2 <- bs_card(
#'   header = "Featured",
#'   title = "Special title treatment",
#'   lead = "With supporting text below as a natural lead-in to additional content.",
#'   tags$a("Go somewhere", href = "#", class = "btn btn-primary")
#' )
#'
#' bs_cards_group(card1, card2)
#' bs_cards_grid(card1, card2)
#' bs_cards_grid(card1, card2, equal_height = TRUE)
#'
#' bs_card(
#'   header = "Look, a cool plot!",
#'   plotTag(image(volcano), "A volcano")
#' )
#'
#'
#' bs_card(
#'   title = "Look, a cool plot!",
#'   plotTag(image(volcano), "A volcano")
#' )
bs_card <- function(..., header = NULL, footer = NULL, lead = NULL,
                    height = NULL, width = NULL,
                    title = NULL, subtitle = NULL) {

  # TODO: add a collapsible = FALSE arg?
  body_args <- dropNulls(list2(
    coerce_to_tag(title, class = "mt-0 mb-1", .tag_func = tags$h5),
    coerce_to_tag(subtitle, class = "text-muted", .tag_func = tags$h6),
    coerce_to_tag(lead, class = "lead", .tag_func = tags$p),
    ...
  ))
  body <- div(class = "card-body", !!!body_args)

  card_args <- dropNulls(list2(
    style = css(
      width = validateCssUnit(width),
      height = validateCssUnit(height)
    ),
    coerce_to_tag(header, class = "card-header"),
    body,
    coerce_to_tag(footer, class = "card-footer")
  ))

  new_card(
    !!!card_args, caller = "card()"
  )
}

#' @param src a character string suitable for a `src` attribute
#' @export
bs_card_image <- function(src, ..., href = NULL,
                          position = c("top", "bottom"),
                          responsive = TRUE) {

  # TODO: allow src to be a shiny.tag as well so this works like
  # card_image(plotOutput())?
  image <- if (responsive) {
    # a la flexdashboard
    # TODO: how to fix relative positioning with ...?
    tags$p(
      style = css(
        background = paste0('url("', utils::URLencode(src), '")'),
        background_size = 'contain',
        background_repeat = 'no-repeat',
        background_position = 'center',
        position = "absolute", margin = 0,
        top = 0, left = 0, right = 0, bottom = 0
      )
    )
  } else {
    img(src = src)
  }

  position <- match.arg(position)
  image <- tagAppendAttributes(image, class = paste0("card-img-", position))

  if (!is.null(href)) {
    image <- a(href = href, image)
  }

  args <- if (position == "bottom") {
    list2(..., image)
  } else {
    list2(image, ...)
  }

  card(!!!args)
}


#' @param ... a collection of [card()]s.
#' @export
#' @rdname card
bs_cards_group <- function(...) {
  cards <- assert_bs_cards(..., caller = "bs_cards_group()")
  fragment(div(class = "card-group", !!!cards))
}

#' @export
#' @rdname card
bs_cards_grid <- function(..., ncols = 2, equal_height = FALSE) {
  cards <- assert_bs_cards(..., caller = "bs_cards_grid()")
  stopifnot(is.numeric(ncols))
  # https://getbootstrap.com/docs/4.6/components/card/#grid-cards
  # TODO: when we add BS5, add a gutter argument to control the gutter
  # https://getbootstrap.com/docs/5.0/components/card/#using-grid-markup

  if (isTRUE(equal_height)) {
    cards <- lapply(cards, tagAppendAttributes, class = "h-100")
  }

  fragment(div(
    class = "row row-cols-1",
    class = paste0("row-cols-md-", as.integer(ncols)),
    !!!lapply(cards, div, class = "col")
  ))
}

# --------------------------------------------------------
# Utility functions
# --------------------------------------------------------

new_card <- function(..., caller) {
  fragment(
    tag_require(
      div(class = "card", ...),
      version = 4, caller = caller
    ),
    class = "bs_card"
  )
}

is_bs_card <- function(x) {
  inherits(x, "bs_card")
}

assert_bs_cards <- function(..., caller) {
  cards <- list2(...)
  if (!all(vapply(cards, is_bs_card, logical(1)))) {
    stop(caller, " expects a collection of bs_card()s", call. = FALSE)
  }
  cards
}
