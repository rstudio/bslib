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
  col_widths = NA,
  row_heights = 1,
  gap = "1rem",
  fill = TRUE,
  fillable = TRUE,
  class = NULL,
  height = NULL,
  width = NULL
) {
  args <- list_split_named(rlang::list2(...))
  attribs <- args[["named"]]
  children <- dropNulls(args[["unnamed"]])
  n_kids <- length(children)

  spec <- bs_css_grid_col_spec(col_widths, n_kids)
  n_cols <- spec$n_cols
  col_widths <- spec$col_widths

  if (!is_breakpoints(row_heights)) {
    row_heights <- breakpoints(sm = row_heights)
  }

  width_classes <- bs_css_grid_width_classes(col_widths, n_kids, n_cols)

  children <- Map(f = bs_grid_wrapper, children, width_classes, fillable)

  tag <- div(
    class = "grid bslib-grid",
    style = css(
      height = validateCssUnit(height),
      width = validateCssUnit(width),
      gap = validateCssUnit(gap),
      "--bs-columns" = n_cols
    ),
    !!!bslib_grid_rows_css_vars(row_heights),
    !!!attribs,
    !!!children
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_column_grid()")
  )
}

bs_css_grid_col_spec <- function(col_widths, n_kids) {
  if (isTRUE(is.na(col_widths))) {
    col_widths <- breakpoints_columns(sm = NA, lg = NA)
  }

  if (!is_breakpoints(col_widths, "columns")) {
    col_widths <- breakpoints_columns(md = col_widths)
  }

  # auto-layout when single NA or all breakpoints are NA
  has_auto_spec <- vapply(col_widths, function(x) isTRUE(is.na(x$width)), logical(1))

  if (any(names(col_widths)[1] %in% c("lg", "xl", "xxl"))) {
    # smallest first defined breakpoint is large, so we fill in gap with 'md'
    col_widths[["md"]] <- col_widths[[names(col_widths)[1]]]
    col_widths <- col_widths[c("md", setdiff(names(col_widths), "md"))]
    col_widths <- as_breakpoints(col_widths, "columns")
  }

  if (!any(has_auto_spec)) {
    return(list(n_cols = 12, col_widths = col_widths))
  }

  n_cols <- if (n_kids > 7) 12 else if (n_kids > 3) n_kids * 2 else n_kids

  for (break_name in names(col_widths)[has_auto_spec]) {
    prefer_wider <- break_name %in% c("sm", "md")
    col_widths[[break_name]]$width <- bs_best_col_width_fit(n_kids, prefer_wider)
  }

  list(n_cols = n_cols, col_widths = col_widths)
}

bs_grid_wrapper <- function(el, bs_grid_classes = NULL, fillable = TRUE) {
  div(
    class = bs_grid_classes,
    class = "bslib-grid-item",
    class = "bslib-gap-spacing",
    if (fillable) as_fillable_container(),
    el
  )
}

bslib_grid_rows_css_vars <- function(row_heights) {
  if (!is_breakpoints(row_heights)) return(NULL)

  # creates classes that pair with CSS variables when set
  classes <- sprintf("bslib-grid--row-heights--%s", names(row_heights))

  css_vars <- row_heights
  names(css_vars) <- paste0("--", classes)

  # mobile row height is derived from xs or defaults to auto in the CSS,
  # so we don't need the class to activate it
  classes <- setdiff(classes, "bslib-grid--row-heights--xs")

  as_grid_value <- function(x) {
    if (is.list(x)) {
      x <- vapply(x, as_grid_value, character(1))
      return(paste(x, collapse = " "))
    }
    if (is.character(x)) return(x)
    paste0(x, ifelse(x <= 12, "fr", "px"))
  }

  css_vars <- lapply(css_vars, as_grid_value)

  styles <- css(!!!css_vars)
  list(class = classes, style = styles)
}

bs_css_grid_width_classes <- function(breakpoints, n_kids, n_cols = 12) {
  stopifnot(
    "`breakpoints` must be a breakpoints_columns() object" =
      is_breakpoints(breakpoints, "columns")
  )

  classes <- vector("list", n_kids)

  add_class <- function(idx, new) {
    classes[[idx]] <<- c(classes[[idx]], new)
  }

  for (break_name in names(breakpoints)) {
    bk <- breakpoints[[break_name]]

    if (length(bk$width) > n_kids) {
      msg <- sprintf(
        "Truncating number of widths at '%s' breakpoint to match number of elements.",
        break_name
      )
      rlang::warn(c(
        msg,
        "*" = paste("widths:", length(bk$width)),
        "*" = paste("elements:", n_kids)
      ))
    }

    widths <- rep_len(bk$width, n_kids)
    before <- rep_len(bk$before, n_kids)
    after <- rep_len(bk$after, n_kids)

    # This next section implements a content-layout algorithm, motivated by
    # supporting empty columns. In particular, we need to know two things about
    # the content item:
    #
    # 1. How wide is the content item?
    # 2. What is its starting column position?
    #
    # The following example illustrates a few layout cases (. = empty column):
    # > breakpoint_columns(md = c(-1, 4, 5, -4, 3, 9, -3, 2))
    #
    # | . | 4 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | . |
    # | . | . | . | 3 | 3 | 3 |   |   |   |   |   |
    # | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | . | . | . |
    # | 2 | 2 | . | 4 | 4 | 4 | 4 |   |   |   |   | ...
    #
    # Because we recycle column widths to match the number of kids, we can't
    # guarantee that the pattern repeats by row. To quickly summarize:
    #
    # * Each content item has a width (`widths[idx]`) and empty space before
    #   the item: `before[idx]` + `after[idx - 1]` (the space before this item
    #   plus the space _after_ the previous item).
    # * We maintain a cursor that knows the 0-indexed column position. At each
    #   step we:
    #   * Move the cursor forward by the empty space before the item
    #   * Decide if we require a starting class (`g-start-{break}-{cursor + 1}`)
    #   * Add starting class and content width class (`g-start-{break}-{width}`)
    #     for the item
    #   * Move the cursor forward by the width of the item.
    #
    # We take into account a few edge cases:
    #
    # * We *don't need* a starting class if the item would naturally reflow to the
    #   next row.
    # * We *do need* a starting class if the item would fit into the empty space
    #   of the current row, but there isn't enough room for the item _after_
    #   accounting for blocked empty space.
    # * If adding empty space causes a new row, but adding the content item
    #   would cause _another row break_, we skip the empty row.

    cursor <- 0L
    update_cursor <- function(incr, is_empty = FALSE) {
      cursor <<- abs(cursor)
      new <- cursor + incr
      if (new == n_cols) {
        # we reached the final column, allow for a natural break
        new <- 0L
      }
      if (new > n_cols) {
        # this row is full, empty columns can break (with <0 cursor to signal)
        # and content columns fit on the next row
        new <- if (is_empty) -1 * new %% n_cols else incr
      }
      # message("cursor: ", cursor, " -> ", new, " (+", incr, if (is_empty) " empty", ")")
      cursor <<- new
    }

    add_start_class <- FALSE
    for (idx in seq_len(n_kids)) {
      move_ahead <- before[idx] + if (idx > 1) after[idx - 1] else 0L
      this_width <- min(widths[idx], n_cols)

      # when we move ahead, we need a start class unless the current item
      # wouldn't fit on the row anyway (ignoring empty cols)
      row_remaining <- n_cols - cursor

      if (move_ahead > 0) {
        update_cursor(move_ahead, is_empty = TRUE)
        if (cursor < 0) {
          cursor <- abs(cursor)
          # adding empty cols caused a row wrap, so we need a start class if
          # 1. we're not at the beginning of the row
          # 2. But: if the current item is wider than the remaining space after
          #    accounting for empty columns, reset cursor to start of the row
          #    rather than causing an empty row.
          if (widths[idx] > (n_cols - cursor)) {
            cursor <- 0L
          }
          row_remaining <- 0L
        }
        add_start_class <- row_remaining >= widths[idx] || cursor > 0
      }

      if (add_start_class) {
        add_class(idx, sprintf("g-start-%s-%s", break_name, cursor + 1L))
        add_start_class <- FALSE
      }

      add_class(idx, sprintf("g-col-%s-%s", break_name, this_width))
      update_cursor(this_width, is_empty = FALSE)
    }
  }

  vapply(classes, paste, character(1), collapse = " ")
}

bs_best_col_width_fit <- function(kids, prefer_wider = FALSE) {
  if (kids < 4) return(1)
  if (kids <= 7) {
    # sizes 4-7 are special cased to use (2 * kids) columns
    return(if (prefer_wider) kids else 2)
  }

  fctrs <- c(if (!prefer_wider) 2, 3, 4, if (prefer_wider) 6)

  col_units <- kids * fctrs
  rows <- ceiling(col_units / 12)
  total_units <- rows * 12
  empty_units <- total_units - col_units

  if (prefer_wider) {
    fctrs <- rev(fctrs)
    empty_units <- rev(empty_units)
  }

  fctrs[which.min(empty_units)]
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

  # TODO: can we get breakpoint names from the breakpoint map to validate?
  # Sort well-known breakpoints first (in order), then custom breakpoint names.
  # This uses the fact that `intersect` preserves order of the first arg.
  break_names <- intersect(c("xs", "sm", "md", "lg", "xl", "xxl"), names(res))
  break_names <- c(break_names, setdiff(names(res), break_names))

  as_breakpoints(res[break_names])
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

  for (break_name in names(res)) {
    breaks <- res[[break_name]]

    if (isTRUE(any(breaks == 0))) {
      rlang::abort("Column values must be greater than 0 to indicate width, or negative to indicate a column offset.")
    }

    if (length(breaks) > 1 && any(is.na(breaks))) {
      rlang::abort("Cannot mix widths and `NA` values. All column widths must be specified, or choose auto widths using a single `NA` value.")
    }

    if (isTRUE(is.na(breaks)) || all(breaks > 0)) {
      res[[break_name]] <- list(
        width = breaks,
        before = integer(length(breaks)),
        after = integer(length(breaks))
      )
      next
    }

    if (!any(breaks > 0)) {
      rlang::abort("Column values must include at least one positive integer width.")
    }

    idx_actual <- which(breaks > 0)
    last_actual <- max(idx_actual)
    n_actual <- length(idx_actual)

    actual <- breaks[idx_actual]
    before <- integer(n_actual)
    after  <- integer(n_actual)

    i <- 1L
    idx_before <- 1L
    while (i <= length(breaks)) {
      if (breaks[i] > 0) {
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
  class(res) <- c("bslib_breakpoints_columns", class(res))

  res
}

#' @export
print.bslib_breakpoints <- function(x, ...) {
  cat("<breakpoints>\n")

  for (bp in names(x)) {
    breaks <- paste0(x[[bp]], collapse = ", ")
    cat(" ", bp, ": ", breaks, "\n", sep = "")
  }

  invisible(x)
}

#' @export
print.bslib_breakpoints_columns <- function(x, ...) {
  cat("<breakpoints<column_widths>>\n")

  for (bp in names(x)) {
    before <- x[[bp]][["before"]]
    after <- x[[bp]][["after"]]

    before <- ifelse(before > 0, paste0("(", before, ") "), "")
    after <- ifelse(after > 0, paste0(" (", after, ")"), "")
    breaks <- paste0(before, x[[bp]][["width"]], after, collapse = " ")

    cat(" ", bp, ": ", breaks, "\n", sep = "")
  }

  invisible(x)
}

as_breakpoints <- function(x, subclass = NULL) {
  if (!is.null(subclass)) subclass <- paste0("bslib_breakpoints_", subclass)
  structure(x, class = c(subclass, "bslib_breakpoints"))
}

is_breakpoints <- function(x, subclass = NULL) {
  inherits(x, "bslib_breakpoints") &&
    (is.null(subclass) || inherits(x, paste0("bslib_breakpoints_", subclass)))
}
