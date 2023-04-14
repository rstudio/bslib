#' Test and/or coerce fill behavior
#'
#' @description Filling layouts in bslib are built on the foundation of fillable
#' containers and fill items (fill carriers are both fillable and
#' fill). This is why most bslib components (e.g., [card()], [card_body()],
#' [layout_sidebar()]) possess both `fillable` and `fill` arguments (to control
#' their fill behavior). However, sometimes it's useful to add, remove, and/or
#' test fillable/fill properties on arbitrary [htmltools::tag()], which these
#' functions are designed to do.
#'
#' @references <https://rstudio.github.io/bslib/articles/filling.html>
#'
#' @details Although `as_fill()`, `as_fillable()`, and `as_fill_carrier()`
#' can work with non-tag objects that have a [as.tags] method (e.g., htmlwidgets),
#' they return the "tagified" version of that object
#'
#' @return
#'   * For `as_fill()`, `as_fillable()`, and `as_fill_carrier()`: the _tagified_
#'     version `x`, with relevant tags modified to possess the relevant fill
#'     properties.
#'   * For `is_fill()`, `is_fillable()`, and `is_fill_carrier()`: a logical vector,
#'     with length matching the number of top-level tags that possess the relevant
#'     fill properties.
#'
#' @param x a [htmltools::tag()].
#' @param ... currently ignored.
#' @param min_height,max_height Any valid [CSS unit][htmltools::validateCssUnit]
#'   (e.g., `150`).
#' @param gap Any valid [CSS unit][htmltools::validateCssUnit].
#' @param class A character vector of class names to add to the tag.
#' @param style A character vector of CSS properties to add to the tag.
#' @param css_selector A character string containing a CSS selector for
#'   targeting particular (inner) tag(s) of interest. For more details on what
#'   selector(s) are supported, see [tagAppendAttributes()].
#' @export
as_fill_carrier <- function(x, ..., min_height = NULL, max_height = NULL, gap = NULL, class = NULL, style = NULL, css_selector = NULL) {

  rlang::check_dots_empty()

  x <- as_fillable(
    x, min_height = min_height,
    max_height = max_height,
    gap = gap,
    class = class,
    style = style,
    css_selector = css_selector
  )

  bindFillRole(x, item = TRUE, .cssSelector = css_selector)
}


#' @rdname as_fill_carrier
#' @export
as_fillable <- function(x, ..., min_height = NULL, max_height = NULL, gap = NULL, class = NULL, style = NULL, css_selector = NULL) {

  rlang::check_dots_empty()

  x <- bindFillRole(x, container = TRUE, .cssSelector = css_selector)

  tagAppendAttributes(
    x, .cssSelector = css_selector,
    style = css(
      min_height = validateCssUnit(min_height),
      max_height = validateCssUnit(max_height),
      gap = validateCssUnit(gap)
    ),
    class = class,
    style = style
  )
}

#' @rdname as_fill_carrier
#' @export
as_fill <- function(x, ..., min_height = NULL, max_height = NULL, class = NULL, style = NULL, css_selector = NULL) {

  rlang::check_dots_empty()

  x <- bindFillRole(x, item = TRUE, .cssSelector = css_selector)

  tagAppendAttributes(
    x, .cssSelector = css_selector,
    style = css(
      min_height = validateCssUnit(min_height),
      max_height = validateCssUnit(max_height)
    ),
    class = class,
    style = style
  )
}


#' @rdname as_fill_carrier
#' @export
undo_fill <- function(x) {
  htmltools::bindFillRole(
    x, item = FALSE, container = FALSE,
    overwrite = TRUE
  )
}


#' @rdname as_fill_carrier
#' @export
is_fill_carrier <- function(x) {
  classes <- paste0("html-fill-", c("container", "item"))
  renders_to_tag_class(x, classes)
}

#' @rdname as_fill_carrier
#' @export
is_fillable <- function(x) {
  UseMethod("is_fillable")
}

#' @export
is_fillable.htmlwidget <- function(x) {
  # won't actually work until (htmltools#334) gets fixed
  renders_to_tag_class(x, "html-fill-container", ".html-widget")
}

#' @export
is_fillable.default <- function(x) {
  renders_to_tag_class(x, "html-fill-container")
}

#' @rdname as_fill_carrier
#' @export
is_fill <- function(x) {
  UseMethod("is_fill")
}

#' @export
is_fill.htmlwidget <- function(x) {
  # won't actually work until (htmltools#334) gets fixed
  renders_to_tag_class(x, "html-fill-item", ".html-widget")
}

#' @export
is_fill.default <- function(x) {
  renders_to_tag_class(x, "html-fill-item")
}


renders_to_tag_class <- function(x, class, selector = NULL) {
  x <- try(as.tags(x), silent = TRUE)
  if (inherits(x, "try-error")) {
    return(FALSE)
  }
  xq <- tagQuery(x)
  if (length(selector)) {
    xq <- xq$find(selector)
  }
  vapply(
    xq$selectedTags(),
    function(y) tagQuery(y)$hasClass(class),
    logical(1),
    USE.NAMES = FALSE
  )
}

is_tag <- function(x) {
  inherits(x, "shiny.tag")
}
