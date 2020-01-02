version_resolve <- function(version) {
  version <- as.character(version)
  match.arg(version, c("4-3", "4", "3"))
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
