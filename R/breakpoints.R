#' Define breakpoint values
#'
#' @description
#' A generic constructor for responsive breakpoints.
#'
#' @param xs The default value to apply to the `xs` breakpoint. Note that this
#'   breakpoint is generally equivalent to "all sizes" and is typically treated
#'   as the base case or a value to apply by default across all breakpoints
#'   unless overridden by a larger breakpoint.
#' @param sm Values to apply at the `sm` breakpoint.
#' @param md Values to apply at the `md` breakpoint.
#' @param lg Values to apply at the `lg` breakpoint.
#' @param ... Other breakpoints (e.g., `xl`).
#'
#' @seealso `breakpoints()` is used by [layout_columns()].
#' @references Bootstrap's
#'   [Breakpoints article](https://getbootstrap.com/docs/5.3/layout/breakpoints/)
#'   provides more detail on breakpoints and how they are used and customized.
#'
#' @examples
#' breakpoints(sm = c(4, 4, 4), md = c(3, 3, 6), lg = c(-2, 8, -2))
#'
#' @export
breakpoints <- function(..., xs = NULL, sm = NULL, md = NULL, lg = NULL) {
  breaks <- dropNulls(
    rlang::list2(..., xs = xs, sm = sm, md = md, lg = lg)
  )

  if (any_unnamed(breaks)) {
    abort("All `breakpoints` values must be named")
  }

  # Ensure that breakpoints are in the increasing order
  break_nms <- sort(
    factor(
      names(breaks),
      ordered = TRUE,
      levels = unique(c(bs_breakpoints(), names(breaks)))
    )
  )

  structure(
    breaks[as.character(break_nms)],
    class = "bslib_breakpoints"
  )
}

#' @export
print.bslib_breakpoints <- function(x, ...) {
  cat("<breakpoints>\n")

  width_vals <- max(nchar(unlist(x)), na.rm = TRUE)
  width_nms <- max(nchar(names(x)), na.rm = TRUE)

  for (bp in names(x)) {
    vals <- format(x[[bp]], width = width_vals, justify = "right")
    cat(
      " ",
      format(bp, width = width_nms, justify = "right"),
      ": ",
      paste0(vals, collapse = " "),
      "\n",
      sep = ""
    )
  }

  invisible(x)
}

is_breakpoints <- function(x) {
  inherits(x, "bslib_breakpoints")
}

bs_breakpoints <- function() {
  c("xs", "sm", "md", "lg", "xl", "xxl")
}
