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

  args <- separate_arguments(...)
  attribs <- args$attribs
  children <- args$children

  if (length(width) > 1) {
    stop("`width` of length greater than 1 is not currently supported.")
  }

  colspec <- if (!is.null(width)) {
    if (width > 0 && width <= 1) {
      num_cols <- 1 / width
      if (num_cols != as.integer(num_cols)) {
        stop("Could not interpret width argument; see ?layout_column_wrap")
      }
      sprintf("repeat(%s, minmax(0, 1fr))", num_cols)
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
  children <- lapply(children, grid_item_container, fillable = fillable)

  tag <- div(
    class = "bslib-grid bslib-mb-spacing",
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
    children,
    component_dependencies()
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_column_wrap()")
  )
}

#' Responsive column-based grid layouts
#'
#' Create responsive, column-based grid layouts, based on a 12-column grid.
#'
#' @inheritParams layout_column_wrap
#' @param col_widths One of the following:
#'   * `NA` (the default): Automatically determines a sensible number of columns
#'     based on the number of children.
#'   * A numeric vector of integers between 1 and 12, where each element
#'     represents the number of columns for the relevant UI element. Elements
#'     that happen to go beyond 12 columns wrap onto the next row. For example,
#'     `col_widths = c(4, 8, 12)` allocates 4 columns to the first element, 8
#'     columns to the second element, and 12 columns to the third element (which
#'     wraps to the next row). Negative values are also allowed, and are treated
#'     as empty columns. For example, `col_widths = c(-2, 8, -2)` would allocate
#'     8 columns to an element (with 2 empty columns on either side).
#'   * A [breakpoints()] object, where each breakpoint may be either of the
#'     above.
#' @param row_heights One of the following:
#'   * A numeric vector, where each value represents the
#'     [fractional unit](https://css-tricks.com/introduction-fr-css-unit/) (`fr`)
#'     height of the relevant row. If there are more rows than values provided,
#'     the pattern will repeat. For example, `row_heights = c(1, 2)` allows even
#'     rows to take up twice as much space as odd rows.
#'   * A list of numeric and [CSS length units][htmltools::validateCssUnit()],
#'     where each value represents the height of the relevant row. If more rows
#'     are needed than values provided, the pattern will repeat. For example,
#'     `row_heights = list("auto", 1)` allows the height of odd rows to be
#'     driven my it's contents and even rows to be
#'     [`1fr`](https://css-tricks.com/introduction-fr-css-unit/).
#'   * A character vector/string of [CSS length units][htmltools::validateCssUnit()].
#'     In this case, the value is supplied directly to `grid-auto-rows`.
#'   * A [breakpoints()] object, where each breakpoint may be either of the above.
#'
#' @export
#' @seealso [breakpoints()] for more information on breakpoints.
#' @examplesIf interactive()
#'
#'
#' x <- card("A simple card")
#'
#' page_fillable(
#'   layout_columns(x, x, x, x)
#' )
#'
#' page_fillable(
#'   layout_columns(
#'     col_widths = c(6, 6, 12),
#'     x, x, x
#'   )
#' )
#'
#' page_fillable(
#'   layout_columns(
#'     col_widths = c(6, 6, -2, 8),
#'     row_heights = c(1, 3),
#'     x, x, x
#'   )
#' )
#'
#' page_fillable(
#'   fillable_mobile = TRUE,
#'   layout_columns(
#'     col_widths = breakpoints(
#'       sm = c(12, 12, 12),
#'       md = c(6, 6, 12),
#'       lg = c(4, 4, 4)
#'     ),
#'     x, x, x
#'   )
#' )
#'
layout_columns <- function(
  ...,
  col_widths = NA,
  row_heights = NULL,
  fill = TRUE,
  fillable = TRUE,
  gap = NULL,
  class = NULL,
  height = NULL
) {
  args <- separate_arguments(...)
  attribs <- args$attribs
  children <- args$children
  n_kids <- length(children)

  # Resolve missing value(s) for col_widths, etc.
  spec <- impute_col_spec(col_widths, n_kids)

  # Translate col_widths into Bootstrap's .g-col-* classes
  width_classes <- col_width_grid_classes(
    spec$col_widths, n_kids, spec$n_cols
  )

  # Add a class to each item that helps provide "fallback" rules
  width_classes <- paste0(width_classes, " bslib-grid-item")

  # Wrap each child in a container (so fill/flex items can fill the available area)
  children <- Map(
    f = grid_item_container, children,
    class = width_classes,
    fillable = fillable
  )

  tag <- div(
    class = "bslib-grid grid bslib-mb-spacing",
    style = css(
      height = validateCssUnit(height),
      gap = validateCssUnit(gap),
      "--bs-columns" = spec$n_cols
    ),
    !!!row_heights_css_vars(row_heights),
    !!!attribs,
    !!!children,
    component_dependencies()
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_columns()")
  )
}



impute_col_spec <- function(x, n_kids) {
  if (isTRUE(is.na(x))) {
    x <- breakpoints(sm = NA, lg = NA)
  }

  if (!is_breakpoints(x)) {
    x <- breakpoints(md = x)
  }

  # if smallest defined breakpoint is large, fill in gap with 'md'
  if (names(x)[1] %in% c("lg", "xl", "xxl")) {
    x <- breakpoints(md = x[[1]], !!!x)
  }

  has_auto_spec <- vapply(x, function(y) isTRUE(is.na(y)), logical(1))

  if (!any(has_auto_spec)) {
    return(list(n_cols = 12, col_widths = x))
  }

  n_cols <- if (n_kids > 7) 12 else if (n_kids > 3) n_kids * 2 else n_kids

  for (break_name in names(x)[has_auto_spec]) {
    prefer_wider <- break_name %in% c("sm", "md")
    x[[break_name]] <- col_width_best_fit(n_kids, prefer_wider)
  }

  list(n_cols = n_cols, col_widths = x)
}



row_heights_css_vars <- function(x) {
  if (is.null(x)) return(list())

  if (!is_breakpoints(x)) {
    x <- breakpoints(sm = x)
  }

  # creates classes that pair with CSS variables when set
  classes <- paste0("bslib-grid--row-heights--", names(x))

  css_vars <- setNames(x, paste0("--", classes))

  # mobile row height is derived from xs or defaults to auto in the CSS,
  # so we don't need the class to activate it
  classes <- setdiff(classes, "bslib-grid--row-heights--xs")

  # Treat numeric values as fractional units
  css_vars <- rapply(
    css_vars, how = "replace",
    function(x) {
      if (is.numeric(x)) paste0(x, "fr") else x
    }
  )

  list(
    style = css(!!!css_vars),
    class = classes
  )
}



col_width_grid_classes <- function(breaks, n_kids, n_cols = 12) {
  if (!is_breakpoints(breaks)) {
    abort("`breaks` must be a `breakpoints()` object")
  }

  classes <- vector("list", n_kids)
  add_class <- function(idx, new) {
    classes[[idx]] <<- c(classes[[idx]], new)
  }

  breaks <- as_column_breakpoints(breaks)

  for (break_name in names(breaks)) {
    bk <- breaks[[break_name]]

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


col_width_best_fit <- function(kids, prefer_wider = FALSE) {
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



grid_item_container <- function(el, ..., fillable = TRUE) {
  div(
    ...,
    class = "bslib-gap-spacing",
    if (fillable) as_fillable_container(),
    el
  )
}
