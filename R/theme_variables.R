#' Sets SASS variables globally
#'
#' Set SASS variables that will be respected by [bs4_sass()] (by default).
#'
#' @param ... Variables to be set, using `name = value`; or, a single unnamed
#'   argument which is a named list of variables to set. To specify a name that
#'   uses characters that aren't valid for R identifiers, wrap that name in
#'   quotes, double quotes, or backticks (see examples section below).
#'
#' @return If no arguments are passed, a list of all set options is returned. If
#'   arguments are passed, a list containing the previous values of the newly
#'   set options is returned invisibly.
#'
#' @include globals.R
#' @examples
#' library(htmltools)
#'
#' theme_variables(primary = "orange", "body-bg" = "#EEEEEE")
#' theme_variables("font-family-base" = "monospace", "font-size-base" = "1.4rem")
#' theme_variables("btn-padding-y" = ".16rem")
#' theme_variables("btn-padding-x" = "2rem")
#' theme_variables("border-radius" = 0, "border-radius-lg" = 0, "border-radius-sm" = 0)
#'
#' browsable(tags$body(
#'   bs4_sass(),
#'   tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' ))
#'
#' @importFrom stats setNames
#' @rdname theme_variables
#' @export
theme_variables <- function(...) {
  args <- list(...)
  arg_names <- names(args)

  # If called without args, this is just a read operation.
  if (length(args) == 0) {
    # Getter
    return(globals$sass_vars)
  }

  # If called with a single unnamed argument that's a list, then act
  # like it was a do.call.
  if (length(args) == 1 && is.null(arg_names) && is.list(args[[1]])) {
    args <- args[[1]]
    arg_names <- names(args)
  }

  if (is.null(arg_names) || !isTRUE(all(nzchar(arg_names), na.rm = FALSE))) {
    stop("All arguments to theme_variables() must be named")
  }

  old_opts <- globals$sass_vars

  globals$sass_vars[arg_names] <- args

  invisible(setNames(old_opts[arg_names], arg_names))
}

#' @rdname theme_variables
#' @export
theme_variables_clear <- function() {
  old_opts <- globals$sass_vars
  globals$sass_vars <- list()
  invisible(old_opts)
}
