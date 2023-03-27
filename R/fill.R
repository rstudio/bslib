#' Coerce a UI element to be a fill carrier / item / fillable container
#'
#' TODO:
#'  1. link to filling layout article.
#'  2. Add disclaimer about coercing htmlwidget objects
#'
#' @param x a [htmltools::tag()].
#' @export
as_fill_carrier <- function(x, ..., class = NULL, style = NULL, .selector = NULL) {

  ellipsis::check_dots_empty()

  x <- as_fill(
    as_fillable(x, .selector = .selector),
    .selector = .selector
  )
  tagAppendAttributes(
    x, .cssSelector = .selector,
    class = class,
    style = style
  )
}


#' @rdname as_fill_carrier
#' @export
as_fillable <- function(x, ..., min_height = NULL, max_height = NULL, gap = NULL, class = NULL, style = NULL, .selector = NULL) {

  ellipsis::check_dots_empty()

  x <- bindFillRole(x, container = TRUE, .cssSelector = .selector)

  tagAppendAttributes(
    x, .cssSelector = .selector,
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
as_fill <- function(x, ..., min_height = NULL, max_height = NULL, class = NULL, style = NULL, .selector = NULL) {

  ellipsis::check_dots_empty()

  # TODO: bindFillRole() should actually find this
  # bindFillRole(plotlyOutput("p"), .cssSelector = ".plotly")

  x <- bindFillRole(x, item = TRUE, .cssSelector = .selector)

  tagAppendAttributes(
    x, .cssSelector = .selector,
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
  htmltools::bindFillRole(x, item = FALSE, container = FALSE, overwrite = TRUE)
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
