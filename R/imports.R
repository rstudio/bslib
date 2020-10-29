#' @import htmltools
#' @import sass
#' @importFrom utils modifyList packageVersion download.file URLencode
#' @importFrom stats setNames na.omit
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
NULL

utils::globalVariables("!!")
