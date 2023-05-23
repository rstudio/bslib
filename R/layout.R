#' A grid-like, column-first, layout
#'
#' Wraps a 1d sequence of UI elements into a 2d grid. The number of columns (and
#' rows) in the grid dependent on the column `width` as well as the size of the
#' display. For more explanation and illustrative examples, see [here](https://rstudio.github.io/bslib/articles/cards.html#multiple-cards)
#'
#' @param ... Unnamed arguments should be UI elements (e.g., [card()])
#'   Named arguments become attributes on the containing [htmltools::tag] element.
#' @param width The desired width of each card, which can be any of the
#'  following:
#'   * A (unit-less) number between 0 and 1.
#'     * This should be specified as `1/num`, where `num` represents the number
#'       of desired columns.
#'   * A [CSS length unit][htmltools::validateCssUnit()]
#'     * Either the minimum (when `fixed_width=FALSE`) or fixed width
#'       (`fixed_width=TRUE`).
#'   * `NULL`
#'     * Allows power users to set the `grid-template-columns` CSS property
#'       manually, either via a `style` attribute or a CSS stylesheet.
#' @param fixed_width Whether or not to interpret the `width` as a minimum
#'   (`fixed_width=FALSE`) or fixed (`fixed_width=TRUE`) width when it is a CSS
#'   length unit.
#' @param heights_equal If `"all"` (the default), every card in every row of the
#'   grid will have the same height. If `"row"`, then every card in _each_ row
#'   of the grid will have the same height, but heights may vary between rows.
#' @param fill Whether or not to allow the layout to grow/shrink to fit a
#'   fillable container with an opinionated height (e.g., `page_fillable()`).
#' @param fillable Whether or not each element is wrapped in a fillable container.
#' @param height_mobile Any valid CSS unit to use for the height when on mobile
#'   devices (or narrow windows).
#' @inheritParams card
#' @inheritParams card_body
#'
#' @export
#' @examples
#'
#' x <- card("A simple card")
#' # Always has 2 columns (on non-mobile)
#' layout_column_wrap(1/2, x, x, x)
#' # Has three columns when viewport is wider than 750px
#' layout_column_wrap("250px", x, x, x)
#'
layout_column_wrap <- function(
  width,
  ...,
  fixed_width = FALSE,
  heights_equal = c("all", "row"),
  fill = TRUE,
  fillable = TRUE,
  height = NULL,
  height_mobile = NULL,
  gap = NULL,
  class = NULL
) {

  heights_equal <- match.arg(heights_equal)

  args <- list_split_named(rlang::list2(...))
  attribs <- args[["named"]]
  children <- dropNulls(args[["unnamed"]])

  if (length(width) > 1) {
    stop("`width` of length greater than 1 is not currently supported.")
  }

  colspec <- if (!is.null(width)) {
    if (width > 0 && width <= 1) {
      num_cols <- 1 / width
      if (num_cols != as.integer(num_cols)) {
        stop("Could not interpret width argument; see ?layout_column_wrap")
      }
      paste0(rep_len("1fr", num_cols), collapse = " ")
    } else {
      if (fixed_width) {
        paste0("repeat(auto-fit, ", validateCssUnit(width), ")")
      } else {
        paste0("repeat(auto-fit, minmax(", validateCssUnit(width), ", 1fr))")
      }
    }
  }

  # If relevant (i.e., fillable=TRUE), wrap each child in a fillable context
  # (so fill/flex items can fill the available area)
  children <- Map(function(el, f) {
    div(
      class = "bslib-gap-spacing",
      if (f) as_fillable_container(),
      el
    )
  }, children, fillable)

  tag <- div(
    class = "bslib-grid",
    style = css(
      grid_template_columns = colspec,
      grid_auto_rows = if (heights_equal == "all") "1fr",
      # Always provide the `height:auto` default so that the CSS variable
      # doesn't get inherited in a scenario like layout_column_wrap(height=200, ..., layout_column_wrap(...))
      "--bslib-grid-height" = validateCssUnit(height %||% "auto"),
      "--bslib-grid-height-mobile" = validateCssUnit(height_mobile %||% "auto"),
      gap = validateCssUnit(gap)
    ),
    !!!attribs,
    children
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_column_wrap()")
  )
}

#' Bootstrap grid layout
#'
#' TODO: describe me
#'
#' @export
layout_columns <- function(
    ...,
    widths = NA,
    # TODO: add offsets argument?
    gap = "1rem",
    fill = TRUE,
    fillable = TRUE,
    height = NULL,
    height_mobile = NULL,
    class = NULL
  ) {

  args <- list_split_named(rlang::list2(...))
  attribs <- args[["named"]]
  children <- dropNulls(args[["unnamed"]])
  n_kids <- length(children)

  # If no widths info is supplied, define number of columns as the number of elements
  # TODO: maybe it's useful to control n_cols?
  n_cols <- if (all(is.na(widths))) n_kids else 12

  if (!is_breakpoints(widths)) {
    widths <- breakpoints(md = widths)
  }

  width_class <- function(w, breakpoint) {
    if (length(w) > n_kids) {
      rlang::warn("Too many `widths` provided; truncating")
    }

    w <- rep_len(w, n_kids)

    idx_na <- which(is.na(w))
    if (length(idx_na) > 0) {
      remaining <- n_cols - sum(w, na.rm = TRUE)
      w[idx_na] <- max(1, floor(remaining / length(idx_na)))
    }

    paste0("g-col-", breakpoint, "-", w)
  }

  width_classes <- do.call(paste,
    Map(width_class, widths, names(widths))
  )

  children <- Map(
    function(el, w, f) {
      div(
        class = paste0("g-col-", n_cols),
        class = w,
        class = "bslib-gap-spacing",
        if (f) as_fillable_container(),
        el
      )
    }, children, width_classes, fillable
  )

  tag <- div(
    class = "grid bslib-grid",
    style = css(
      "--bs-gap" = gap,
      "--bs-columns" = n_cols,
      # Always provide the `height:auto` default so that the CSS variable
      # doesn't get inherited in a scenario like layout_column_wrap(height=200, ..., layout_column_wrap(...))
      "--bslib-grid-height" = validateCssUnit(height %||% "auto"),
      "--bslib-grid-height-mobile" = validateCssUnit(height_mobile %||% "auto"),
      # For some reason, Bootstrap sets `grid-template-rows: 1fr` by default, which is
      # problematic for a multi-row filling layout. This fixes it...
      # > page_fillable(layout_columns(c(12, 12), plotly::plot_ly(), plotly::plot_ly()))
      grid_auto_rows = "1fr"
    ),
    !!!attribs,
    !!!children
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_column_grid()")
  )
}


#' Define responsive breakpoints
#'
#' TODO: describe me
#'
#' @keywords internal
#' @export
breakpoints <- function(..., sm = NULL, md = NULL, lg = NULL) {
  res <- rlang::list2(...)
  if (!is.null(sm)) res$sm <- sm
  if (!is.null(md)) res$md <- md
  if (!is.null(lg)) res$lg <- lg

  res <- dropNulls(res)
  if (any_unnamed(res)) {
    rlang::abort("All `breakpoints` values must be named")
  }
  structure(res, class = "bslib_breakpoints")
}

#' Define responsive breakpoints
#'
#' TODO: describe me
#'
#' @export
breakpoints_columns <- function(..., sm = NULL, md = NULL, lg = NULL) {
  res <- rlang::list2(...)
  if (!is.null(sm)) res$sm <- sm
  if (!is.null(md)) res$md <- md
  if (!is.null(lg)) res$lg <- lg

  # TODO: check that values are integerish

  if (any_unnamed(res)) {
    rlang::abort("All `breakpoints` values must be named")
  }

  is_na_or_positive <- function(x) is.na(x) | x > 0

  for (break_name in names(res)) {
    breaks <- res[[break_name]]

    if (any(breaks[!is.na(breaks)] == 0)) {
      rlang::abort("Column values must be greater than 0 to indicate width, or negative to indicate a column offset.")
    }

    if (all(is_na_or_positive(breaks))) {
      res[[break_name]] <- list(
        width = breaks,
        before = integer(length(breaks)),
        after = integer(length(breaks))
      )
      next
    }

    if (!any(is_na_or_positive(breaks))) {
      rlang::abort("Column values must include at least one positive integer width.")
    }

    actual <- breaks[is_na_or_positive(breaks)]
    idx_actual <- which(is_na_or_positive(breaks))
    last_actual <- max(idx_actual)

    n_actual <- length(actual)
    before <- integer(n_actual)
    after  <- integer(n_actual)

    i <- 1L
    idx_before <- 1L
    while (i <= length(breaks)) {
      if (is_na_or_positive(breaks[i])) {
        i <- i + 1L
        idx_before <- idx_before + 1L
        next
      }

      if (i > last_actual) {
        # accumulate trailing offsets
        after[length(after)] <- after[length(after)] + abs(breaks[i])
        i <- i + 1L
        next
      }

      # accumulate leading offsets
      before[idx_before] <- before[idx_before] + abs(breaks[i])
      i <- i + 1L
    }

    res[[break_name]] <- list(
      width = actual,
      before = before,
      after = after
    )
  }

  res <- breakpoints(!!!res)
  class(res) <- c("bslib_breakpoints_column_widths", class(res))

  res
}

#' @export
print.bslib_breakpoints <- function(x, ...) {
  cat("<breakpoints>\n")

  break_names <- intersect(c("xs", "sm", "md", "lg", "xl", "xxl"), names(x))
  break_names <- c(break_names, setdiff(names(x), break_names))

  for (bp in break_names) {
    breaks <- paste0(x[[bp]], collapse = ", ")
    cat(" ", bp, ": ", breaks, "\n", sep = "")
  }

  invisible(x)
}

#' @export
print.bslib_breakpoints_column_widths <- function(x, ...) {
  cat("<breakpoints<column_widths>>\n")

  break_names <- intersect(c("xs", "sm", "md", "lg", "xl", "xxl"), names(x))
  break_names <- c(break_names, setdiff(names(x), break_names))

  for (bp in break_names) {
    before <- attr(x[[bp]], "before")
    after <- attr(x[[bp]], "after")

    before <- ifelse(before > 0, paste0("(", before, ") "), "")
    after <- ifelse(after > 0, paste0(" (", after, ")"), "")
    breaks <- paste0(before, x[[bp]], after, collapse = " ")

    cat(" ", bp, ": ", breaks, "\n", sep = "")
  }

  invisible(x)
}

is_breakpoints <- function(x, subclass = NULL) {
  inherits(x, "bslib_breakpoints") &&
    (is.null(subclass) || inherits(x, paste0("bslib_breakpoints_", subclass)))
}
