#' Remove or retrieve Sass code from a theme
#'
#' @inheritParams bs_theme_update
#' @param ids a character vector of ids
#' @export
#' @examples
#'
#' # Remove CSS rules for print and carousels
#' bs_theme(version = 4) %>%
#'   bs_remove(c("_print", "_carousel"))
#'
#' # Remove BS3 compatibility layer
#' bs_theme(version = 4) %>%
#'   bs_remove("bs3compat")
#'
#' bs_theme(version = 4) %>%
#'   bs_retrieve("_print") %>%
#'   file.edit()
#'
bs_remove <- function(theme, ids = character(0)) {
  ids <- retain_valid_ids(theme, ids)
  sass_bundle_remove(theme, ids)
}

#' @rdname bs_remove
#' @export
bs_retrieve <- function(theme, ids = character(0)) {
  ids <- retain_valid_ids(theme, ids)
  sass_bundle(
    !!!theme$layers[names(theme$layers) %in% ids]
  )
}


retain_valid_ids <- function(theme, ids) {
  assert_bs_theme(theme)
  stopifnot(is.character(ids))

  bundle_ids <- names(theme$layers)
  if (!length(ids)) {
    stop(
      "Provide one or more of the following `ids`: ",
      paste(bundle_ids, collapse = ", ")
    )
  }

  missing_ids <- setdiff(ids, bundle_ids)
  if (length(missing_ids)) {
    warning(
      "The following `ids` weren't found in `theme`: ",
      paste(missing_ids, collapse = ", "), ".\n\n",
      "Possible `ids` include: ",
      paste(bundle_ids[nzchar(bundle_ids)], collapse = ", ")
    )
  }

  intersect(ids, bundle_ids)
}
