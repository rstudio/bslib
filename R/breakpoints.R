#' Define breakpoint values
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' A generic constructor for responsive breakpoints.
#' @param sm Values to apply at the `sm` breakpoint.
#' @param md Values to apply at the `md` breakpoint.
#' @param lg Values to apply at the `lg` breakpoint.
#' @param ... Other breakpoints (e.g., `xl`).
#'
#' @seealso [layout_columns()]
#' @references <https://getbootstrap.com/docs/5.3/layout/breakpoints/>
#'
#' @examples
#' breakpoints(sm = c(4, 4, 4), md = c(3, 3, 6), lg = c(-2, 8, -2))
#'
#' @export
breakpoints <- function(..., sm = NULL, md = NULL, lg = NULL) {
  breaks <- dropNulls(
    rlang::list2(..., sm = sm, md = md, lg = lg)
  )

  if (any_unnamed(breaks)) {
    abort("All `breakpoints` values must be named")
  }

  # Ensure that breakpoints are in the increasing order
  break_nms <- sort(factor(
    names(breaks), ordered = TRUE,
    levels = unique(c(bs_breakpoints(), names(breaks)))
  ))

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
      " ", format(bp, width = width_nms, justify = "right"), ": ",
      paste0(vals, collapse = " "), "\n",
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

# breakpoints() passed to layout_columns(col_widths = ) is special in the sense
# that negative values are supported
as_column_breakpoints <- function(breaks) {
  if (!is_breakpoints(breaks)) {
    abort("`breaks` must be a `breakpoints()` object")
  }

  for (break_name in names(breaks)) {
    bk <- breaks[[break_name]]

    if (isTRUE(any(bk == 0))) {
      abort("Column values must be greater than 0 to indicate width, or negative to indicate a column offset.")
    }

    if (length(bk) > 1 && anyNA(bk)) {
      abort("Cannot mix widths and `NA` values. All column widths must be specified, or choose auto widths using a single `NA` value.")
    }

    if (isTRUE(is.na(bk)) || all(bk > 0)) {
      breaks[[break_name]] <- list(
        width = bk,
        before = integer(length(bk)),
        after = integer(length(bk))
      )
      next
    }

    if (!any(bk > 0)) {
      abort("Column values must include at least one positive integer width.")
    }

    idx_actual <- which(bk > 0)
    last_actual <- max(idx_actual)
    n_actual <- length(idx_actual)

    actual <- bk[idx_actual]
    before <- integer(n_actual)
    after  <- integer(n_actual)

    i <- 1L
    idx_before <- 1L
    while (i <= length(bk)) {
      if (bk[i] > 0) {
        idx_before <- idx_before + 1L
      } else if (i > last_actual) {
        # accumulate trailing offsets
        after[length(after)] <- after[length(after)] + abs(bk[i])
      } else {
        # accumulate leading offsets
        before[idx_before] <- before[idx_before] + abs(bk[i])
      }
      i <- i + 1L
    }

    breaks[[break_name]] <- list(
      width = actual,
      before = before,
      after = after
    )
  }

  breaks
}

