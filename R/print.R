as_fragment <- function(x, page = page_fluid) {
  stopifnot(is.function(page) && "theme" %in% names(formals(page)))
  attr(x, "bslib_page") <- page
  class(x) <- c("bslib_fragment", class(x))
  x
}

as_page <- function(x, theme = bs_theme()) {
  class(x) <- c("bslib_page", class(x))
  attr(x, "bs_theme") <- theme
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

#' @export
save_html.bslib_fragment <- function(html, file, ...) {
  html <- attr(html, "bslib_page")(html)
  save_html(html, file, ...)
}

#' @rdname html-browse
#' @export
print.bslib_page <- function(x, ...) {
  old_global <- bs_global_get()
  bs_global_set(attr(x, "bs_theme", exact = TRUE))
  on.exit(bs_global_set(old_global))

  if (interactive()) {
    x <- htmltools::browsable(x)
  }

  invisible(NextMethod())
}

#' @export
save_html.bslib_page <- function(html, file, ...) {
  old_theme <- bs_global_get()
  bs_global_set(attr(html, "bs_theme", exact = TRUE))
  on.exit(bs_global_set(old_theme), add = TRUE)

  NextMethod()
}
