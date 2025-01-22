utils::globalVariables("!!")

#' @keywords internal
"_PACKAGE"

## usethis namespace: start
#' @import htmltools
#' @import sass
#' @importFrom grDevices col2rgb
#' @importFrom jquerylib jquery_core
#' @importFrom jsonlite fromJSON
#' @importFrom lifecycle deprecated
#' @importFrom rlang := list2 abort
#' @importFrom stats setNames na.omit
#' @importFrom tools file_path_sans_ext
#' @importFrom utils modifyList packageVersion download.file URLencode getFromNamespace head
## usethis namespace: end
NULL

#' @export
#' @importFrom htmltools css
htmltools::css

# For usethis::use_release_issue()
release_bullets <- function() {
  c(
    "Update static imports: `staticimports::import()`"
  )
}
