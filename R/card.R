#' Card grid
#'
#' Use to create a grid of cards, giving every card in the entire grid the same
#' height/width (or optionally, every card in _each row_ of the grid).
#'
#' @param ... Named arguments become attributes on the `<div class="card">`
#'   element. Unnamed arguments are children, and should be instances of
#'   [card()].
#' @param class Additional CSS classes to include on the grid div.
#' @param card_width The desired width of each card. This can be any [CSS length
#'   unit][htmltools::validateCssUnit()], in which case `card_grid` will fit as
#'   many cards into each row without being smaller than that width.
#'   Alternatively, you can specify a number of cards per row by passing
#'   `1/num`, for example `card_width = 1/3` for three cards per row. You can
#'   also set this to `NULL` and set the `grid-template-columns` CSS property
#'   manually, either via a `style` attribute or a CSS stylesheet.
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] that sets the
#'   amount of spacing between cards. If `NULL`, the value of Bootstrap's
#'   `$spacer` Sass variable is used.
#' @param heights_equal If `"all"` (the default), every card in every row of the
#'   grid will have the same height. If `"row"`, then every card in _each_ row
#'   of the grid will have the same height, but heights may vary between rows.
#'
#' @export
card_grid <- function(..., class = NULL, card_width = 1/4, gap = NULL,
  heights_equal = c("all", "row")) {

  # TODO: Allow cards not to stretch

  heights_equal <- match.arg(heights_equal)

  args <- rlang::list2(...)
  argnames <- names(args)
  if (is.null(argnames) && length(args) > 0) {
    argnames <- rep_len("", length(args))
  }

  attribs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  colspec <- if (!is.null(card_width)) {
    if (length(card_width) == 1 && card_width > 0 && card_width <= 1) {
      num_cols <- 1 / card_width
      if (num_cols != as.integer(num_cols)) {
        stop("Could not interpret card_width argument; see ?card_grid")
      }
      paste0(rep_len("1fr", num_cols), collapse = " ")
    } else {
      # This version is if we don't want to allow growth
      # paste0("repeat(auto-fill, ", validateCssUnit(card_width), ")")
      # This version is if we do
      paste0("repeat(auto-fill, minmax(", validateCssUnit(card_width), ", 1fr))")
    }
    # TODO: Support length(card_width) > 1?
  }

  div(class = "bslib-card-grid", class = class,
    style = css(
      grid_template_columns = colspec,
      grid_auto_rows = if (heights_equal == "all") "1fr",
      gap = validateCssUnit(gap)
    ),
    !!!attribs,
    children
  )
}

#' Create a card component
#'
#' @description Cards are general purpose containers for grouping UI elements
#'   together inside of a simple border. A basic card might just have a title
#'   and a plot, while a complicated one might contain an image, title,
#'   subtitle, text, button, and a footer.
#'
#'   Cards are often arranged in a row or grid, with every card in a row having
#'   the same height. To facilitate this, the `card()` and `card_*()` family of
#'   functions have options for specifying the vertical stretching behavior of
#'   card items.
#'
#' @param ... Named arguments become attributes on the `<div class="card">`
#'   element. Unnamed arguments become card items, and can be any valid child of
#'   an [htmltools tag][htmltools::tags].
#' @param class Additional CSS classes to include on the card div.
#' @param width,height Any valid [CSS unit][htmltools::validateCssUnit]; for
#'   example, `height="100%"`.
#' @param autowrap The Bootstrap card is designed to contain only a few specific
#'   types of elements: `div.card-header`, `div.card-body`, etc. If `autowrap`
#'   is `TRUE`, any unnamed arguments to `card()` are checked to see if they are
#'   known card items (like [card_header()], [card_plot()], etc.) and if not,
#'   they are automatically wrapped in [card_body()]. If `autowrap` is `FALSE`,
#'   then all unnamed arguments are nested directly within the card element with
#'   no further processing.
#'
#' @export
card <- function(..., class = NULL, width = NULL, height = NULL,
  autowrap = TRUE) {

  width <- htmltools::validateCssUnit(width)
  height <- htmltools::validateCssUnit(height)

  args <- rlang::list2(...)
  argnames <- names(args)
  if (is.null(argnames) && length(args) > 0) {
    argnames <- rep_len("", length(args))
  }

  attribs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  if (isTRUE(autowrap)) {
    # Any children that are `is.card_item` should be included verbatim. Any
    # children that are not, should be wrapped in card_body(). Consecutive children
    # that are not card_item, should be wrapped in a single card_body().
    needs_wrap <- !vapply(children, is.card_item, logical(1))
    needs_wrap_rle <- rle(needs_wrap)
    start_indices <- c(1, head(cumsum(needs_wrap_rle$length) + 1, -1))
    children <- mapply(start_indices, needs_wrap_rle$length, needs_wrap_rle$values,
      FUN = function(start, length, wrap) {
        these_children <- children[start:(start + length - 1)]
        if (wrap) {
          list(card_body(stretch = FALSE, these_children))
        } else {
          these_children
        }
      }, SIMPLIFY = FALSE)
    children <- unlist(children, recursive = FALSE)
  }

  tag <- htmltools::tags$div(
    class = "card",
    class = class,
    style = htmltools::css(width = width, height = height),
    !!!attribs,
    !!!children
  )
  as_fragment(
    tag_require(tag, version = 4, caller = "card()")
  )
}

#' @rdname card_body
#' @export
as.card_item <- function(x) {
  class(x) <- c("card_item", class(x))
  x
}

#' @rdname card_body
#' @export
is.card_item <- function(x) {
  inherits(x, "card_item")
}

#' Card components
#'
#' @description This topic describes various components that are intended to go
#'   directly inside of a [card()]. These components can be used in combination;
#'   for example, a single card could contain a `card_header()`, multiple
#'   `card_body()`s, a `card_list()`, and finally a `card_footer()`.
#' @export
card_body <- function(..., class = NULL, padding = c("x", "y"), stretch = FALSE) {
  res <- htmltools::tags$div(class = "card-body",
    class = if (!"x" %in% padding) "px-0",
    class = if (!"y" %in% padding) "py-0",
    class = class,
    ...,
    style = if (!stretch) css(
      flex = "0",
      `_webkit_flex` = "0"
    ),
  )
  as.card_item(res)
}

#' @export
card_body_scroll <- function(..., class = NULL, height = NULL, padding = c("x", "y")) {
  res <- htmltools::tags$div(class = "card-body card-body-scroll",
    class = if (!"x" %in% padding) "px-0",
    class = if (!"y" %in% padding) "py-0",
    class = class,
    style = css(
      # May be NULL
      flex_basis = validateCssUnit(height),
      `-webkit-flex-basis` = validateCssUnit(height)
    ),
    ...
  )
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_header <- function(..., class = NULL) {
  res <- htmltools::tags$div(class = "card-header", class = class,
    ...
  )
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_heading <- function(..., class = NULL, container = htmltools::tags$h6) {
  res <- container(class = "card-header mt-0", class = class,
    ...
  )
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_title <- function(..., class = NULL) {
  res <- htmltools::tags$h5(class = "card-header", class = class,
    ...
  )
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_footer <- function(..., class = NULL) {
  res <- htmltools::tags$div(class = "card-footer mt-auto", class = class,
    ...
  )
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_spacer <- function(...) {
  res <- htmltools::tags$div(style = css(flex = "1 0 0"))
  as.card_item(res)
}

#' @rdname card_body
#' @export
card_list <- function(...) {
  res <- htmltools::tags$ul(class = "list-group list-group-flush", ...)
  as.card_item(res)
}

#' @export
card_list_item <- function(...) {
  htmltools::tags$li(class = "list-group-item", ...)
}

#' @rdname card_body
#' @export
card_plot_output <- function(outputId,
  click = NULL,
  dblclick = NULL,
  hover = NULL,
  brush = NULL,
  height = NULL,
  stretch = TRUE
) {
  plot_div <- plotOutput(outputId, height = NULL, click = click, dblclick = dblclick, hover = hover,
    brush = brush)

  # TODO: card-img-* needs to go on the <img> itself, not the containing <div>
  plot_div <-
    tagAppendAttributes(plot_div,
      style = css(
        flex = if (stretch) "1 1",
        `-webkit-flex` = if (stretch) "1 1",
        # May be NULL
        `flex-basis` = validateCssUnit(height),
        `-webkit-flex-basis` = validateCssUnit(height),
      )
    )

  as.card_item(plot_div)
}
