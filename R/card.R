#' A Bootstrap card component
#'
#' A general purpose container for grouping related UI elements together with a
#' border and optional padding. To learn more about [card()]s, see [this
#' article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags] (which includes card items such as [card_body()].
#'   Named arguments become HTML attributes on returned UI element.
#' @param full_screen If `TRUE`, an icon will appear when hovering over the card
#'   body. Clicking the icon expands the card to fit viewport size. Consider
#'   pairing this feature with [card_body_fill()] to get output that responds to
#'   changes in the size of the card.
#' @param height Any valid [CSS unit][htmltools::validateCssUnit] (e.g.,
#'   `height="200px"`).
#' @param class Additional CSS classes for the returned UI element.
#' @param wrapper A function (which returns a UI element) to call on unnamed
#'   arguments in `...` which are not already card item(s) (like
#'   [card_header()], [card_body()], etc.). Note that non-card items are grouped
#'   together into one `wrapper` call (e.g. given `card("a", "b",
#'   card_body("c"), "d")`, `wrapper` would be called twice, once with `"a"` and
#'   `"b"` and once with `"d"`). Consider setting `wrapper` to [card_body_fill]
#'   if the entire card wants responsive sizing or `NULL` to avoid wrapping
#'   altogether
#'
#' @return A [htmltools::div()] tag.
#'
#' @export
#' @seealso [card_body()] for putting stuff inside the card.
#' @seealso [navs_tab_card()] for cards with multiple tabs.
#' @seealso [layout_column_wrap()] for laying out multiple cards (or multiple
#'   columns inside a card).
#' @examples
#'
#' library(htmltools)
#'
#' if (interactive()) {
#'   card(
#'     full_screen = TRUE,
#'     card_header(
#'       "This is the header"
#'     ),
#'     card_body(
#'       p("This is the body."),
#'       p("This is still the body.")
#'     ),
#'     card_footer(
#'       "This is the footer"
#'     )
#'   )
#' }
#'
card <- function(..., full_screen = FALSE, height = NULL, class = NULL, wrapper = card_body) {

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attribs <- args[nzchar(argnames)]
  children <- as_card_items(args[!nzchar(argnames)], wrapper = wrapper)

  tag <- div(
    class = "card",
    class = vfill_classes,
    class = class,
    style = css(height = validateCssUnit(height)),
    !!!attribs,
    !!!children,
    if (full_screen) full_screen_toggle()
  )

  as_fragment(
    tag_require(tag, version = 4, caller = "card()")
  )
}


as_card_items <- function(children, wrapper) {
  # We don't want NULLs creating empty card bodys
  children <- children[vapply(children, function(x) length(x) > 0, logical(1))]

  if (!is.function(wrapper)) {
    return(children)
  }

  # Any children that are `is.card_item` should be included verbatim. Any
  # children that are not, should be wrapped in card_body(). Consecutive children
  # that are not card_item, should be wrapped in a single card_body().
  needs_wrap <- !vapply(children, is.card_item, logical(1))
  needs_wrap_rle <- rle(needs_wrap)
  start_indices <- c(1, head(cumsum(needs_wrap_rle$lengths) + 1, -1))
  children <- mapply(
    start_indices, needs_wrap_rle$lengths, needs_wrap_rle$values,
    FUN = function(start, length, wrap) {
      these_children <- children[start:(start + length - 1)]
      if (wrap) {
        list(wrapper(these_children))
      } else {
        these_children
      }
    },
    SIMPLIFY = FALSE
  )
  unlist(children, recursive = FALSE)
}

#' Card items
#'
#' Components designed to be provided as direct children of a [card()]. To learn
#' about [card()]s, see [this
#' article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags]. Named arguments become HTML attributes on returned
#'   UI element.
#' @inheritParams card
#'
#' @return An [htmltools::div()] tag.
#'
#' @export
#' @seealso [card()] for creating a card component.
#' @seealso [navs_tab_card()] for cards with multiple tabs.
#' @seealso [layout_column_wrap()] for laying out multiple cards (or multiple
#'   columns inside a card).
card_body <- function(..., height = NULL, class = NULL) {
  card_body_(
    fill = FALSE,
    height = height,
    class = class,
    ...
  )
}

#' @rdname card_body
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] defining the
#'   `gap` (i.e., spacing) between elements provided to `...`.
#' @param max_height,max_height_full_screen,min_height Any valid [CSS length unit][htmltools::validateCssUnit()].
#' @export
card_body_fill <- function(..., gap = NULL, max_height = NULL, max_height_full_screen = max_height, min_height = NULL, class = NULL) {

  card_body_(
    fill = TRUE,
    class = class,
    style = htmltools::css(
      padding = 0,
      gap = validateCssUnit(gap),
      min_height = validateCssUnit(min_height),
      "--bslib-card-body-max-height" = validateCssUnit(max_height),
      "--bslib-card-body-max-height-full-screen" = validateCssUnit(max_height_full_screen),
      margin_top = "auto",
      margin_bottom = "auto"
    ),
    ...
  )
}

#' @rdname card_body
#' @param container a function to generate an HTML element.
#' @export
card_title <- function(..., container = htmltools::h5) {
  card_body(container(style = css(margin_bottom = 0), ...))
}

card_body_ <- function(..., fill = TRUE, height = NULL, class = NULL, container = htmltools::div) {

  res <- container(
    class = "card-body",
    class = if (fill) vfill_classes,
    class = class,
    style = css(
      height = validateCssUnit(height),
      flex = if (fill) "1 1 auto" else "0 0 auto"
    ),
    ...
  )

  as.card_item(res)
}


#' @rdname card_body
#' @param container a function that generates an [htmltools tag][htmltools::tags].
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
#' @param file a file path pointing an image. The image will be base64 encoded
#' and provided to the `src` attribute of the `<img>`. Alternatively, you may
#' set this value to `NULL` and provide the `src` yourself.
#' @param href an optional URL to link to.
#' @param border_radius where to apply `border-radius` on the image.
#' @param mime_type the mime type of the `file`.
#' @param container a function to generate an HTML element to contain the image.
#' @param width Any valid [CSS unit][htmltools::validateCssUnit] (e.g., `width="100%"`).
#' @export
card_image <- function(
  file, ..., href = NULL, border_radius = c("top", "bottom", "all", "none"),
  mime_type = NULL, class = NULL, height = NULL, width = NULL, container = card_body_fill) {

  src <- NULL
  if (length(file) > 0) {
    src <- base64enc::dataURI(
      file = file, mime = mime_type %||% mime::guess_type(file)
    )
  }

  image <- tags$img(
    src = src,
    class = "img-fluid",
    class = "vfill-item",
    class = class,
    class = switch(
      match.arg(border_radius),
      all = "card-img",
      top = "card-img-top",
      bottom = "card-img-bottom",
      NULL
    ),
    style = css(
      height = validateCssUnit(height),
      width = validateCssUnit(width)
    ),
    ...
  )

  if (!is.null(href)) {
    image <- tags$a(
      href = href,
      class = vfill_classes,
      image
    )
  }

  if (is.function(container)) {
    image <- container(image)
  }

  image
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
        "var resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
        var card = $(document.currentScript).parents('.card').last();
        ro.observe(card[0]);"
      ))
    )
  )
}


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
