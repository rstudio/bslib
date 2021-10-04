#' Available Bootstrap versions
#'
#' @return A list of the Bootstrap versions available.
#'
#' @export
versions <- function() {
  rlang::set_names(
    list("5", "4", "3"),
    c(version_bs5, version_bs4, version_bs3)
  )
}

#' @export
#' @rdname versions
version_default <- function() {
  versions()[[1]]
}

# TODO: make this a getter/setter?
