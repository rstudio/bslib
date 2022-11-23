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
    class = "card bslib-card",
    style = css(height = validateCssUnit(height)),
    !!!attribs,
    !!!children,
    if (full_screen) full_screen_toggle()
  )

  tag <- bindFillRole(tag, container = TRUE, item = TRUE)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "card()")
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
#' Components designed to be provided as direct children of a [card()]. For a
#' general overview of the [card()] API, see [this
#' article](https://rstudio.github.io/bslib/articles/cards.html).
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags]. Named arguments become HTML attributes on returned
#'   UI element.
#' @param fill whether to allow the `card_body()` to grow and shrink to fit its
#'   `card()`.
#' @inheritParams card
#'
#' @return An [htmltools::div()] tag.
#'
#' @export
#' @seealso [card()] for creating a card component.
#' @seealso [navs_tab_card()] for cards with multiple tabs.
#' @seealso [layout_column_wrap()] for laying out multiple cards (or multiple
#'   columns inside a card).
#'
#' @describeIn card_body A general container for the "main content" of a [card()].
card_body <- function(..., fill = FALSE, height = NULL, class = NULL) {
  card_body_(
    fill_item = fill,
    height = height,
    class = class,
    ...
  )
}

#' @describeIn card_body Similar to `card_body(fill = TRUE)`, but also marks the
#'   return element as a "fill container" (via [htmltools::bindFillRole()]) so
#'   that its immediate children are allowed to grow and shrink to fit.
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] defining the
#'   `gap` (i.e., spacing) between elements provided to `...`.
#' @param max_height,max_height_full_screen,min_height Any valid [CSS length unit][htmltools::validateCssUnit()].
#' @export
card_body_fill <- function(..., gap = NULL, max_height = NULL, max_height_full_screen = max_height, min_height = NULL, class = NULL) {

  register_runtime_package_check("`card_body_fill()`", "shiny", "1.7.3.9001")
  register_runtime_package_check("`card_body_fill()`", "htmlwidgets", "1.5.4.9001")

  card_body_(
    fill_item = TRUE,
    fill_container = TRUE,
    class = class,
    style = htmltools::css(
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

#' @describeIn card_body Similar to `card_header()` but without the border and background color.
#' @param container a function to generate an HTML element.
#' @export
card_title <- function(..., container = htmltools::h5) {
  as.card_item(
    container(style = css(margin_bottom = 0), class = "bslib-card-title", ...)
  )
}

card_body_ <- function(..., fill_item = FALSE, fill_container = FALSE, height = NULL, class = NULL, container = htmltools::div) {

  tag <- container(
    class = "card-body",
    style = css(
      height = validateCssUnit(height),
      # .card-body already adds `flex: 1 1 auto` so make sure to override it
      flex = if (fill_item) "1 1 auto" else "0 0 auto"
    ),
    ...
  )

  tag <- bindFillRole(tag, item = fill_item, container = fill_container)

  # Make sure user has the opportunity to override the classes added by bindFillRole()
  tag <- tagAppendAttributes(tag, class = class)

  as.card_item(tag)
}


#' @describeIn card_body A header (with border and background color) for the `card()`. Typically appears before a `card_body()`.
#' @param container a function that generates an [htmltools tag][htmltools::tags].
#' @export
card_header <- function(..., class = NULL, container = htmltools::div) {
  as.card_item(
    container(class = "card-header", class = class, ...)
  )
}

#' @describeIn card_body A header (with border and background color) for the `card()`. Typically appears after a `card_body()`.
#' @export
card_footer <- function(..., class = NULL) {
  as.card_item(
    div(class = "card-footer", class = class, ...)
  )
}

#' @describeIn card_body Include static (i.e., pre-generated) images.
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

  image <- bindFillRole(image, item = TRUE)
  image <- tagAppendAttributes(image, class = class)

  if (!is.null(href)) {
    image <- bindFillRole(tags$a(href = href, image), container = TRUE, item = TRUE)
  }

  if (is.function(container)) {
    image <- container(image)
  }

  image
}

#' @describeIn card_body Mark an object as a card item. This will prevent the
#'   [card()] from putting the object inside a `wrapper` (i.e., a
#'   `card_body()`).
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
  tags$span(
    class = "bslib-full-screen-enter",
    class = "badge rounded-pill bg-dark",
    "data-bs-toggle" = "tooltip",
    "data-bs-placement" = "bottom",
    title = "Expand",
    full_screen_toggle_icon(),
    htmlDependency(
      name = "bslib-card-full-screen",
      version = get_package_version("bslib"),
      package = "bslib",
      src = "components",
      script = "card-full-screen.js"
    ),
    tags$script(HTML(
      "
        var card = $(document.currentScript).parents('.card').last();

        // Let Shiny know to trigger resize when the card size changes
        // TODO: shiny could/should do this itself (rstudio/shiny#3682)
        var resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
        ro.observe(card[0]);

        // Enable tooltips (for the expand icon)
        var tooltipList = card[0].querySelectorAll('[data-bs-toggle=\"tooltip\"]');
        tooltipList.forEach(function(x) { new bootstrap.Tooltip(x); });

        // In some complex fill-based layouts with multiple outputs (e.g., plotly),
        // shiny initializes with the correct sizing, but in-between the 1st and last
        // renderValue(), the size of the output containers can change, meaning every
        // output but the 1st gets initialized with the wrong size during their
        // renderValue(); and then after the render phase, shiny won't know trigger a
        // resize since all the widgets will return to their original size
        // (and thus, Shiny thinks there isn't any resizing to do).
        // We workaround that situation by manually triggering a resize on the binding
        // when the output container changes (this way, if the size is different during
        // the render phase, Shiny will know about it)
        $(document).on('shiny:value', function(x) {
          var el = x.binding.el;
          if (card[0].contains(el) && !$(el).data('bslib-output-observer')) {
            var roo = new ResizeObserver(x.binding.onResize);
            roo.observe(el);
            $(el).data('bslib-output-observer', true);
          }
        });
        "
    ))
  )
}


# via bsicons::bs_icon("arrows-fullscreen")
full_screen_toggle_icon <- function() {
  HTML('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen " style="height:1em;width:1em;fill:currentColor;" aria-hidden="true" role="img" ><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path></svg>')
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
