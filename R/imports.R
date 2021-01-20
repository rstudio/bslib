#' @import htmltools
#' @import sass
#' @importFrom utils modifyList packageVersion download.file URLencode getFromNamespace
#' @importFrom stats setNames na.omit
#' @importFrom tools file_path_sans_ext
#' @importFrom jquerylib jquery_core
#' @importFrom jsonlite fromJSON
#' @importFrom rlang :=
NULL

#' Pipe operator
#'
#' See \code{magrittr::\link[magrittr:pipe]{\%>\%}} for details.
#'
#' @name %>%
#' @rdname pipe
#' @keywords internal
#' @export
#' @importFrom magrittr %>%
#' @usage lhs \%>\% rhs
#' @returns the result of calling `lhs(rhs)`.
NULL

utils::globalVariables("!!")
