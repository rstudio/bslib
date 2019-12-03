"%||%" <- function(x, y) {
  if (is.null(x)) y else x
}


bootstrap_version_normalize <- function(version) {
  version <- as.character(version)
  match.arg(version, c("4-3", "4", "3"))
}
