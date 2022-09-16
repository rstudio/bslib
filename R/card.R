#' Card grid layout
#'
#' @description Layout a collection of cards into a responsive grid. By default,
#'   cards will have the same height/width, but optionally, the heights of each
#'   row (and column) may be different.
#'
#'   To learn more about [card()]s and card layout options, see [this
#'   article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @param ... Named arguments become attributes on the containing
#'   [htmltools::tag] element. Unnamed arguments are children, and should be
#'   instances of [card()] (and/or [navs_tab_card()]/[navs_pill_card()]).
#' @param class Additional CSS classes to include on the grid div.
#' @param card_width The desired width of each card, which can be any of the
#'  following:
#'   * A (unit-less) number between 0 and 1.
#'     * This should be specified as `1/num`, where `num` represents the number
#'       of desired columns.
#'   * A [CSS length unit][htmltools::validateCssUnit()]
#'     * Either the minimum (when `fixed_width=FALSE`) or fixed width
#'       (`fixed_width=TRUE`).
#'   * `NULL`
#'     * Allows power users to set the `grid-template-columns` CSS property
#'       manually, either via a `style` attribute or a CSS stylesheet.
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] that sets the
#'   amount of spacing between cards. If `NULL`, the value of Bootstrap's
#'   `$spacer` Sass variable is used.
#' @param heights_equal If `"all"` (the default), every card in every row of the
#'   grid will have the same height. If `"row"`, then every card in _each_ row
#'   of the grid will have the same height, but heights may vary between rows.
#' @param fixed_width Whether or not to interpret the `card_width` as a minimum
#'   (`fixed_width=FALSE`) or fixed (`fixed_width=TRUE`) width when it is a CSS
#'   length unit.
#'
#' @export
#' @seealso [card()] for creating a card container.
#' @seealso [as.card_item()] for putting stuff inside the card.
#' @seealso [navs_tab_card()] [navs_pill_card()] for placing navigation in cards.
card_grid <- function(..., class = NULL, card_width = 1/4, gap = NULL,
  heights_equal = c("all", "row"), fixed_width = FALSE) {

  heights_equal <- match.arg(heights_equal)

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

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
      if (fixed_width) {
        paste0("repeat(auto-fit, ", validateCssUnit(card_width), ")")
      } else {
        paste0("repeat(auto-fit, minmax(", validateCssUnit(card_width), ", 1fr))")
      }
    }
    # TODO: Support length(card_width) > 1?
  }

  tag <- div(class = "bslib-card-grid", class = class,
    style = css(
      grid_template_columns = colspec,
      grid_auto_rows = if (heights_equal == "all") "1fr",
      gap = validateCssUnit(gap)
    ),
    !!!attribs,
    children
  )

  as_fragment(
    tag_require(tag, version = 4, caller = "card_grid()")
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
#'   To learn more about [card()]s and card layout options, see [this
#'   article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @param ... Named arguments become attributes on the `<div class="card">`
#'   element. Unnamed arguments become card items, and can be any valid child of
#'   an [htmltools tag][htmltools::tags].
#' @param class Additional CSS classes to include on the card div.
#' @param width,height Any valid [CSS unit][htmltools::validateCssUnit]; for
#'   example, `height="100%"`.
#' @param full_screen If `TRUE`, an icon will appear when hovering over the card
#'   body. Clicking the icon expands the card to fit viewport size. When using this option, consider explicitly wrapping card items in `card_body(x, stretch = TRUE)` and setting output containers to `height="100%"` (e.g., `card_body(plotlyOutput('id', height="100%"), stretch = TRUE)`).
#' @param autowrap The Bootstrap card is designed to contain only a few specific
#'   types of elements: `div.card-header`, `div.card-body`, etc. If `autowrap`
#'   is `TRUE`, any unnamed arguments to `card()` are checked to see if they are
#'   known card items (like [card_header()], [card_body_stretch()], etc.) and if
#'   not, they are automatically wrapped in [card_body()]. If `autowrap` is
#'   `FALSE`, then all unnamed arguments are nested directly within the card
#'   element with no further processing.
#'
#' @export
#' @seealso [as.card_item()] for putting stuff inside the card.
#' @seealso [card_grid()] for laying out multiple cards.
#' @seealso [navs_tab_card()] [navs_pill_card()] for placing navigation in
#'   cards.
#' @examples
#'
#' card(class = "w-50", height = "300px",
#'   card_header(
#'     "This is the header"
#'   ),
#'   card_body(
#'     p("This is the body."),
#'     p("This is still the body.")
#'   ),
#'   card_footer(
#'     "This is the footer"
#'   )
#' )
card <- function(..., class = NULL, width = NULL, height = NULL,
  full_screen = FALSE, autowrap = TRUE) {

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attribs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  if (isTRUE(autowrap)) {
    # Any children that are `is.card_item` should be included verbatim. Any
    # children that are not, should be wrapped in card_body(). Consecutive children
    # that are not card_item, should be wrapped in a single card_body().
    needs_wrap <- !vapply(children, is.card_item, logical(1))
    needs_wrap_rle <- rle(needs_wrap)
    start_indices <- c(1, head(cumsum(needs_wrap_rle$lengths) + 1, -1))
    children <- mapply(start_indices, needs_wrap_rle$lengths, needs_wrap_rle$values,
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

  tag <- div(
    class = "card",
    class = class,
    style = css(
      width = validateCssUnit(width),
      height = validateCssUnit(height)
    ),
    !!!attribs,
    !!!children,
    if (full_screen) full_screen_toggle()
  )

  as_fragment(
    tag_require(tag, version = 4, caller = "card()")
  )
}

#' Card item components
#'
#' @description This topic describes various components that are intended to go
#'   directly inside of a [card()]. These components can be used in combination;
#'   for example, a single card could contain a `card_header()`, a
#'   `card_footer()`, and multiple `card_body()`s.
#'
#'   To learn more about [card()]s and card layout options, see [this
#'   article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @section Stretchy card items (TODO: put me in pkgdown article)
#'   * Stretchy card items only work sensibly if it has a parent element (e.g. [card()] and/or [card_grid()]) which has a fixed height _and_ any elements in-between the fixed height element and the stretchy element are also stretchy.
#'   * Stretchy items `card_body_stretch()` is similar to `card_body(stretch =
#'   TRUE)`, but additionally `unset`s the height of it's immediate children,
#'   making it a convenient shortcut for creating stretchy outputs (e.g.,
#'   [shiny::plotOutput()]) without having to set `height="100%"`.
#'   * By default, stretchy items stretch vertically, but they can also stretch horizontally
#'
#' @param ... Named arguments become attributes on the `<div class="card">`
#'   element. Unnamed arguments become card items, and can be any valid child of
#'   an [htmltools tag][htmltools::tags].
#' @param stretch Set to `TRUE` if this `card_body` is eager to use any extra
#'   vertical space is available in the card.
#' @param class Additional CSS classes.
#' @param padding A valid CSS `padding` value.

#'
#' @export
#' @seealso [card()] for creating a card component.
#' @seealso [card_grid()] for laying out multiple cards.
#' @seealso [navs_tab_card()] [navs_pill_card()] for placing navigation in
#'   cards.
card_body <- function(..., stretch = FALSE, class = NULL, padding = NULL) {
  card_body_(
    stretch = stretch,
    class = class,
    padding = padding,
    ...
  )
}

#' @rdname card_body
#' @param height Any valid [CSS unit][htmltools::validateCssUnit]; for
#'   example, `height="100%"`.
#' @export
card_body_scroll <- function(..., height = NULL, class = NULL, padding = NULL) {
  card_body_(
    style = css(flex_basis = validateCssUnit(height)),
    class = c("card-body-scroll", class),
    padding = padding,
    ...
  )
}

#' @rdname card_body
#' @param ... Unnamed arguments should contain UI elements whose height (or width, if used within `card_body_inline()`) should be stretched, even if they already have a fixed height (e.g., [shiny::plotOutput()], etc. default to a fixed height of `400px`). Named arguments are treated as attributes on the stretchy container.
#' @param flex a value of the `flex` CSS property.
#' @export
card_body_stretch <- function(..., flex = 1, class = NULL, padding = 0) {
  card_body_(
    class = c("bslib-card-body-stretch", class),
    style = htmltools::css("--bslib-card-body-stretch-flex" = flex),
    stretch = TRUE,
    padding = padding,
    ...
  )
}


#' @rdname card_body
#' @export
card_body_inline <- function(..., stretch = FALSE, class = NULL, padding = NULL) {
  card_body_(
    class = c("bslib-card-body-inline", class),
    style = htmltools::css("--bslib-card-body-inline-flex" = if (!stretch) "0"),
    stretch = stretch,
    padding = padding,
    ...
  )
}


#' @rdname card_body
#' @param container a function to generate an HTML element.
#' @export
card_title <- function(..., class = NULL, padding = NULL, container = htmltools::h5) {
  card_body_(
    class = c("card-title", class),
    stretch = FALSE,
    container = container,
    padding = padding,
    ...
  )
}

card_body_ <- function(..., stretch = FALSE, class = NULL, padding = NULL, container = htmltools::div) {
  res <- container(
    class = "card-body",
    class = class,
    style = if (!stretch) css(flex = "0"),
    style = css(padding = padding), # TODO: validate?
    ...
  )
  as.card_item(res)
}


#' @rdname card_body
#' @param container a function to generate an HTML element (used for the `.card-header` element)
#' @export
card_header <- function(..., class = NULL, container = htmltools::div) {
  as.card_item(
    container(class = "card-header", class = class, ...)
  )
}

#' @rdname card_body
#' @export
card_footer <- function(..., class = NULL) {
  as.card_item(
    div(class = "card-footer mt-auto", class = class, ...)
  )
}

#' @rdname card_body
#' @export
card_spacer <- function(...) {
  res <- div(style = css(flex = "1 0 0"))
  as.card_item(res)
}

#' @rdname card_body
#' @param x an object to test (or coerce to) a card item.
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


full_screen_toggle <- function() {
    tags$a(
      tags$span(class = "badge rounded-pill bg-dark m-2", style="padding:0.55rem !important;",
      class = "bslib-full-screen-enter",
      "data-bs-toggle" = "tooltip",
      "data-bs-placement" = "bottom",
      title = "Expand",
      bsicons::bs_icon("arrows-fullscreen", class = "null"),
      htmlDependency(
        name = "bslib-card-full-screen",
        version = get_package_version("bslib"),
        package = "bslib",
        src = "components",
        script = "card-full-screen.js"
      ),
      # TODO: shiny should probably use ResizeObserver() itself (i.e., we
      # shouldn't need to trigger a resize on the window)
      # https://github.com/rstudio/shiny/pull/3682
      tags$script(HTML(
        "var ro = new ResizeObserver(() => $(window).trigger('resize'));
        document.querySelectorAll('.card').forEach(function(x) { ro.observe(x); })"
      ))
    )
  )
}


# cpsievert 2022-06-06: this showcase idea is probably still worth considering (for general use inside a card), but we're punting for now since value_box(showcase_layout="left-center") is effectively the same/similar thing (you could probably put it inside a card()?)

# #' @rdname card_body
# #' @param width a number between 0 and 1 defining # proportion of width to dedicate to `x`
# #' @param height any valid CSS unit defining the height # of `x`.
# #' @param width_full a number between 0 and 1 defining # proportion of width to dedicate to `x` when `full_screen # = TRUE`.
# #' @param height_full any valid CSS unit defining the # height of `x` when `full_screen = TRUE`.
# #' @export
# card_body_showcase <- function(x, ..., height = NULL, # width = 1/5, width_full = 4/5, height_full = "100%") {
#   if (!is.numeric(width) || width > 1 || width < 0) {
#     stop("width must be a number between 0 and 1")
#   }
#
#   card_body(
#     class = "bslib-card-showcase",
#     style = css(
#       "--showcase-width-1" = paste0(100 * width, "%"),
#       "--showcase-width-2" = paste0(100 * (1 - width), # "%"),
#       "--showcase-full-width-1" = paste0(100 * width_full# , "%"),
#       "--showcase-full-width-2" = paste0(100 * (1 - # width_full), "%"),
#       "--showcase-height" = validateCssUnit(height),
#       "--showcase-full-height" = validateCssUnit# (height_full),
#     ),
#     x, tags$ul(!!!lapply(rlang::list2(...), tags$li))
#   )
# }



# jcheng 2022-06-06: Removing for now; list items have more features than I'm
# ready to design an API for right now
#
# #' @rdname card_body
# #' @export
# card_list <- function(...) {
#   res <- tags$ul(class = "list-group list-group-flush", ...)
#   as.card_item(res)
# }
#
# #' @export
# card_list_item <- function(...) {
#   tags$li(class = "list-group-item", ...)
# }
