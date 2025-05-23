#' A Bootstrap card component
#'
#' @description
#' A general purpose container for grouping related UI elements together with a
#' border and optional padding. To learn more about [card()]s, see [the Cards
#' article](https://rstudio.github.io/bslib/articles/cards/index.html) or the
#' other articles listed in the _References_ section below.
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags] (which includes card items such as [card_body()].
#'   Named arguments become HTML attributes on returned UI element.
#' @param full_screen If `TRUE`, an icon will appear when hovering over the card
#'   body. Clicking the icon expands the card to fit viewport size.
#' @param height Any valid [CSS unit][htmltools::validateCssUnit] (e.g.,
#'   `height="200px"`). Doesn't apply when a card is made `full_screen`
#'   (in this case, consider setting a `height` in [card_body()]).
#' @param max_height,min_height Any valid [CSS unit][htmltools::validateCssUnit] (e.g.,
#'   `max_height="200px"`). Doesn't apply when a card is made `full_screen`
#'   (in this case, consider setting a `max_height` in [card_body()]).
#' @param fill Whether or not to allow the card to grow/shrink to fit a
#'   fillable container with an opinionated height (e.g., `page_fillable()`).
#' @param class Additional CSS classes for the returned UI element.
#' @param wrapper A function (which returns a UI element) to call on unnamed
#'   arguments in `...` which are not already card item(s) (like
#'   [card_header()], [card_body()], etc.). Note that non-card items are grouped
#'   together into one `wrapper` call (e.g. given `card("a", "b",
#'   card_body("c"), "d")`, `wrapper` would be called twice, once with `"a"` and
#'   `"b"` and once with `"d"`).
#' @param id Provide a unique identifier for the `card()` or `value_box()` to
#'   report its full screen state to Shiny. For example, using `id = "my_card"`,
#'   you can observe the card's full screen state with
#'   `input$my_card_full_screen`.
#'
#' @return A [htmltools::div()] tag.
#'
#' @export
#' @family Components
#'
#' @seealso [Card item functions][card_body()] create the various parts of a
#'   card.
#' @seealso [navset_card_tab()], [navset_card_pill()] and
#'   [navset_card_underline()] create cards with tabbed navigation.
#' @seealso [layout_columns()] and [layout_column_wrap()] help position multiple
#'   cards into columns and rows and can also be used inside a card.
#' @seealso [layout_sidebar()] adds a sidebar to a card when nested in [card()]
#'   or [card_body()].
#' @seealso [value_box()] uses [card()] to highlight a showcase a key piece of
#'   information.
#'
#' @references Several articles on the bslib website feature the card component:
#'
#'   * [Cards](https://rstudio.github.io/bslib/articles/cards/index.html)
#'   * [Get Started: Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
#'   * [Get Started: Any Project](https://rstudio.github.io/bslib/articles/any-project/index.html)
#'   * [Column-based layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)
#'   * [Filling layouts: Full-screen cards](https://rstudio.github.io/bslib/articles/filling/index.html#full-screen-cards)
#'
#' @examplesIf rlang::is_interactive()
#' library(htmltools)
#'
#' card(
#'   full_screen = TRUE,
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
#'
card <- function(
  ...,
  full_screen = FALSE,
  height = NULL,
  max_height = NULL,
  min_height = NULL,
  fill = TRUE,
  class = NULL,
  wrapper = card_body,
  id = NULL
) {
  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attribs <- args[nzchar(argnames)]
  children <- as_card_items(args[!nzchar(argnames)], wrapper = wrapper)
  children <- card_image_add_classes(children)

  is_shiny_input <- !is.null(id)

  if (full_screen && is.null(id)) {
    # a11y: full screen cards need an ID for aria-controls on the toggle button
    id <- paste0("bslib-card-", p_randomInt(1000, 10000))
  }

  tag <- div(
    id = id,
    class = "card bslib-card bslib-mb-spacing",
    class = if (is_shiny_input) "bslib-card-input",
    style = css(
      height = validateCssUnit(height),
      max_height = validateCssUnit(max_height),
      min_height = validateCssUnit(min_height)
    ),
    "data-bslib-card-init" = NA,
    "data-full-screen" = if (full_screen) "false",
    !!!attribs,
    !!!children,
    if (full_screen) full_screen_toggle(attribs$id),
    card_init_js(),
    component_dependencies()
  )

  tag <- bindFillRole(tag, container = TRUE, item = fill)
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
    start_indices,
    needs_wrap_rle$lengths,
    needs_wrap_rle$values,
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
#' general overview of the [card()] API, see [the Cards
#' article](https://rstudio.github.io/bslib/articles/cards/index.html) or the
#' other articles listed in the _References_ section of the [card()]
#' documentation.
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags]. Named arguments become HTML attributes on returned
#'   UI element.
#' @param min_height,max_height,max_height_full_screen Any valid [CSS length
#'   unit][htmltools::validateCssUnit()].
#' @param fillable Whether or not the card item should be a fillable (i.e.
#'   flexbox) container.
#' @param fill Whether to allow this element to grow/shrink to fit its `card()`
#'   container.
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] defining the
#'   `gap` (i.e., spacing) between elements provided to `...`. This argument is only applicable when `fillable = TRUE`
#' @inheritParams card
#' @inheritParams page_fillable
#'
#' @return An [htmltools::div()] tag.
#'
#' @export
#'
#' @seealso [card()] creates a card component.
#' @seealso [navset_card_tab()], [navset_card_pill()] and
#'   [navset_card_underline()] create cards with tabbed navigation.
#' @seealso [layout_columns()] and [layout_column_wrap()] help position multiple
#'   cards into columns and rows and can also be used inside a card.
#' @seealso [layout_sidebar()] adds a sidebar to a card when nested in [card()]
#'   or [card_body()].
#'
#' @describeIn card_body A general container for the "main content" of a [card()].
card_body <- function(
  ...,
  fillable = TRUE,
  min_height = NULL,
  max_height = NULL,
  max_height_full_screen = max_height,
  height = NULL,
  padding = NULL,
  gap = NULL,
  fill = TRUE,
  class = NULL
) {
  if (fillable) {
    register_runtime_package_check("`card_body()`", "shiny", "1.7.4")
    register_runtime_package_check("`card_body()`", "htmlwidgets", "1.6.0")
  }

  tag <- div(
    class = "card-body",
    class = if (fillable) "bslib-gap-spacing",
    style = css(
      min_height = validateCssUnit(min_height),
      "--bslib-card-body-max-height" = validateCssUnit(max_height),
      "--bslib-card-body-max-height-full-screen" = validateCssUnit(
        max_height_full_screen
      ),
      margin_top = "auto",
      margin_bottom = "auto",
      # .card-body already adds `flex: 1 1 auto` so make sure to override it
      flex = if (fill) "1 1 auto" else "0 0 auto",
      padding = validateCssPadding(padding),
      gap = validateCssUnit(gap),
      height = validateCssUnit(height)
    ),
    ...
  )

  tag <- bindFillRole(tag, item = fill, container = fillable)

  # Make sure user has the opportunity to override the classes added by bindFillRole()
  tag <- tagAppendAttributes(tag, class = class)

  as.card_item(tag)
}

#' @describeIn card_body Similar to `card_header()` but without the border and background color.
#' @param container a function to generate an HTML element.
#' @export
card_title <- function(..., container = htmltools::h5) {
  container(...)
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

#' @describeIn card_body Include static images in a card, for example as an
#'   image cap at the top or bottom of the card.
#'
#' @param file A file path pointing an image. Local images (i.e. not a URI
#'   starting with `https://` or similar) will be base64 encoded and provided to
#'   the `src` attribute of the `<img>`. Alternatively, you may directly set
#'   the image `src`, in which case `file` is ignored.
#' @param alt Alternate text for the image, used by screen readers and assistive
#'   devices. Provide alt text with a description of the image for any images
#'   with important content. If alt text is not provided, the image will be
#'   considered to be decorative and will not be read or announced by screen
#'   readers.
#'
#'   For more information, the Web Accessibility Initiative (WAI) has a
#'   [helpful tutorial on alt text](https://www.w3.org/WAI/tutorials/images/).
#' @param src The `src` attribute of the `<img>` tag. If provided, `file` is
#'   ignored entirely. Use `src` to provide a relative path to a file that will
#'   be served by the Shiny application and should not be base64 encoded.
#' @param href An optional URL to link to when a user clicks on the image.
#' @param border_radius Which side of the image should have rounded corners,
#'   useful when `card_image()` is used as an image cap at the top or bottom of
#'   the card.
#'
#'   The value of `border_radius` determines whether the `card-img-top`
#'   (`"top"`), `card-img-bottom` (`"bottom"`), or `card-img` (`"all"`)
#'   [Bootstrap
#'   classes](https://getbootstrap.com/docs/5.3/components/card/#images) are
#'   applied to the card. The default `"auto"` value will use the image's
#'   position within a `card()` to automatically choose the appropriate class.
#' @param mime_type The mime type of the `file` when it is base64 encoded. This
#'   argument is available for advanced use cases where [mime::guess_type()] is
#'   unable to automatically determine the file type.
#' @param container A function to generate an HTML element to contain the image.
#'   Setting this value to `card_body()` places the image inside the card body
#'   area, otherwise the image will extend to the edges of the card.
#' @param width Any valid [CSS unit][htmltools::validateCssUnit] (e.g.,
#'   `width="100%"`).
#'
#' @export
card_image <- function(
  file,
  ...,
  alt = "",
  src = NULL,
  href = NULL,
  border_radius = c("auto", "top", "bottom", "all", "none"),
  mime_type = NULL,
  class = NULL,
  height = NULL,
  fill = FALSE,
  width = NULL,
  container = NULL
) {
  if (any(!nzchar(rlang::names2(list(...))))) {
    rlang::abort(
      c(
        "Unnamed arguments were included in `...`.",
        i = "All additional arguments to `card_image()` in `...` should be named attributes for the `<img>` tag."
      )
    )
  }

  border_radius <- rlang::arg_match(border_radius)

  if (is.null(src)) {
    if (grepl("^([[:alnum:]]+:)?//|data:", file)) {
      src <- file
    } else {
      if (!file.exists(file)) {
        rlang::abort(
          c(
            sprintf("`file` does not exist: %s", file),
            i = sprintf(
              "If `file` is a remote file or will be served by the Shiny app, use a URL or set `src = \"%s\"`.",
              file
            )
          )
        )
      }
      src <- base64enc::dataURI(
        file = file,
        mime = mime_type %||% mime::guess_type(file)
      )
    }
  }

  image <- tags$img(
    src = src,
    alt = alt,
    class = "img-fluid",
    class = switch(
      border_radius,
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

  image <- bindFillRole(image, item = fill)
  image <- tagAppendAttributes(image, class = class)

  if (!is.null(href)) {
    image <- bindFillRole(
      tags$a(href = href, image),
      container = TRUE,
      item = TRUE
    )
  }

  if (is.function(container)) {
    image <- container(image)
  } else {
    image <- as.card_item(image)
  }

  class(image) <- c(
    if (border_radius == "auto") "card_image_auto",
    "card_image",
    class(image)
  )

  image
}

card_image_add_classes <- function(children) {
  for (idx_child in seq_along(children)) {
    if (inherits(children[[idx_child]], "card_image_auto")) {
      card_img_class <-
        if (length(children) == 1) {
          "card-img"
        } else if (idx_child == 1) {
          "card-img-top"
        } else if (idx_child == length(children)) {
          "card-img-bottom"
        }

      children[[idx_child]] <- tagAppendAttributes(
        children[[idx_child]],
        class = card_img_class
      )
    }
  }

  children
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

full_screen_toggle <- function(id_controls) {
  tooltip(
    tags$button(
      class = "bslib-full-screen-enter",
      class = "badge rounded-pill",
      "aria-expanded" = "false",
      "aria-controls" = id_controls,
      "aria-label" = "Expand card",
      full_screen_toggle_icon()
    ),
    "Expand"
  )
}

card_init_js <- function() {
  tags$script(
    `data-bslib-card-init` = NA,
    HTML("bslib.Card.initializeAllCards();")
  )
}

full_screen_toggle_icon <- function() {
  # https://www.visiwig.com/icons/
  # https://www.visiwig.com/icons-license/
  HTML(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height:1em;width:1em;fill:currentColor;" aria-hidden="true" role="img"><path d="M20 5C20 4.4 19.6 4 19 4H13C12.4 4 12 3.6 12 3C12 2.4 12.4 2 13 2H21C21.6 2 22 2.4 22 3V11C22 11.6 21.6 12 21 12C20.4 12 20 11.6 20 11V5ZM4 19C4 19.6 4.4 20 5 20H11C11.6 20 12 20.4 12 21C12 21.6 11.6 22 11 22H3C2.4 22 2 21.6 2 21V13C2 12.4 2.4 12 3 12C3.6 12 4 12.4 4 13V19Z"/></svg>'
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
