
as_fragment <- function(x, page = page_fluid) {
  stopifnot(is.function(page) && "theme" %in% names(formals(page)))
  attr(x, "bslib_page") <- page
  class(x) <- c("bslib_fragment", class(x))
  x
}

as_page <- function(x) {
  class(x) <- c("bslib_page", class(x))
  x
}

#' Make HTML browsable by default
#'
#' @param x a [tag()] object.
#' @param ... passed along to an underlying print method
#' @export
#' @keywords internal
#' @rdname html-browse
print.bslib_fragment <- function(x, ...) {
  x <- attr(x, "bslib_page")(x)
  invisible(print(x, ...))
}

#' @rdname html-browse
#' @export
print.bslib_page <- function(x, ...) {
  if (interactive()) {
    x <- htmltools::browsable(x)
  }
  invisible(NextMethod())
}
