version_resolve <- function(version) {
  version <- as.character(version)
  if (identical(version, "4-3")) {
    warning("Version '4-3' has been renamed to '4+3'. Please use '4+3' instead")
    version <- "4+3"
  }
  match.arg(version, c("4+3", "4", "3"))
}

add_class <- function(x, y) {
  structure(x, class = unique(c(y, oldClass(x))))
}

is_string <- function(x) {
  is.character(x) && length(x) == 1
}

dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE=logical(1))]
}

names2 <- function(x) {
  names(x) %||% rep.int("", length(x))
}

"%||%" <- function(x, y) {
  if (is.null(x)) y else x
}

#' Rename a named list
#'
#' @param x a named list to be renamed
#' @param nms a named character vector defining the renaming
#' @noRd
#' @examples
#' rename(list(a = 1, b = 3), c(z = "b", y = "a"))
rename <- function(x, nms) {
  nms_idx <- match(nms, names(x))
  nms_idx <- nms_idx[!is.na(nms_idx)]
  for (i in nms_idx) {
    nm <- nms[i]
    names(x)[names(x) %in% nm] <- names(nm)
  }
  x
}

# Calculate the yiq value, given the (0-255) red/green/blue values
color_yiq <- function(r, g, b) {
  ((r * 299) + (g * 587) + (b * 114)) / 1000
}

# Determine if the given (0-255) red/green/blue values represent a light color,
# relative to the given yiq threshold
color_yiq_islight <- function(r, g, b, threshold = 150) {
  color_yiq(r, g, b) >= threshold
}
