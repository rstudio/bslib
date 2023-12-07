#' Column-first uniform grid layouts
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' Wraps a 1d sequence of UI elements into a 2d grid. The number of columns (and
#' rows) in the grid dependent on the column `width` as well as the size of the
#' display. For more explanation and illustrative examples, see the _References_
#' section below.
#'
#' @param ... Unnamed arguments should be UI elements (e.g., [card()]). Named
#'   arguments become attributes on the containing [htmltools::tag] element.
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
#' @param fixed_width When `width` is greater than 1 or is a CSS length unit,
#'   e.g. `"200px"`, `fixed_width` indicates whether that `width` value
#'   represents the absolute size of each column (`fixed_width=TRUE`) or the
#'   minimum size of a column (`fixed_width=FALSE`). When `fixed_width=FALSE`,
#'   new columns are added to a row when `width` space is available and columns
#'   will never exceed the container or viewport size. When `fixed_width=TRUE`,
#'   all columns will be exactly `width` wide, which may result in columns
#'   overflowing the parent container.
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
#' @family Column layouts
#'
#' @references The bslib website features `layout_column_wrap()` in two places:
#'   * [Column-based layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)
#'   * [Cards: Multiple cards](https://rstudio.github.io/bslib/articles/cards/index.html#multiple-cards)
#'
#' @examplesIf rlang::is_interactive()
#' x <- card("A simple card")
#'
#' # Always has 2 columns (on non-mobile)
#' layout_column_wrap(width = 1/2, x, x, x)
#'
#' # Automatically lays out three cards into columns
#' # such that each column is at least 200px wide:
#' layout_column_wrap(x, x, x)
#'
#' # To use larger column widths by default, set `width`.
#' # This example has 3 columns when the screen is at least 900px wide:
#' layout_column_wrap(width = "300px", x, x, x)
#'
#' @export
layout_column_wrap <- function(
  ...,
  width = "200px",
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

  if (missing(width)) {
    first_is_width <-
      is.null(children[[1]]) ||
      is_probably_a_css_unit(children[[1]])

    if (first_is_width) {
      # Assume an unnamed first argument that matches our expectations for
      # `width` is actually the width argument, with a warning
      lifecycle::deprecate_warn(
        "0.6.0",
        "layout_column_wrap(width = 'must be named')"
      )
      width <- children[[1]]
      children <- children[-1]
    }
  }

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
        sprintf(
          "repeat(auto-fit, minmax(min(%s, 100%%), 1fr))",
          validateCssUnit(width)
        )
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

is_probably_a_css_unit <- function(x) {
  if (length(x) != 1) return(FALSE)
  if (is.numeric(x)) return(TRUE)
  if (!is.character(x)) return(FALSE)
  tryCatch(
    { validateCssUnit(x); TRUE },
    error = function(e) FALSE
  )
}

#' Responsive 12-column grid layouts
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
#'     [fractional unit](https://css-tricks.com/introduction-fr-css-unit/)
#'     (`fr`) height of the relevant row. If there are more rows than values
#'     provided, the pattern will repeat. For example, `row_heights = c(1, 2)`
#'     allows even rows to take up twice as much space as odd rows.
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
#' @family Column layouts
#'
#' @references [Column-based layouts](https://rstudio.github.io/bslib/articles/column-layout/index.html)
#'   on the bslib website.
#'
#' @seealso [breakpoints()] for more information on specifying column widths at
#'   responsive breakpoints.
#'
#' @examplesIf rlang::is_interactive()
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

  # Check for spec problems so we can stop early
  col_spec <- as_col_spec(col_widths, n_kids)

  # Wrap each child in a container (so fill/flex items can fill the available area)
  children <- Map(
    f = grid_item_container, children,
    fillable = fillable
  )

  tag <- web_component(
    "bslib-layout-columns",
    class = "bslib-grid grid bslib-mb-spacing",
    "col-widths" = json_col_spec(col_spec),
    style = css(
      height = validateCssUnit(height),
      gap = validateCssUnit(gap),
    ),
    # We don't enable the next option by default, but users could add this
    # attribute to hide the internal elements until after the custom element
    # adds classes to all of the elements. We don't think this is needed but
    # it's here if we find there are cases where rendering the children and
    # adding classes takes longer than we've anticipated in our testing.
    # "hidden-until-init" = NA,
    !!!row_heights_css_vars(row_heights),
    !!!attribs,
    !!!children
  )

  tag <- bindFillRole(tag, item = fill)
  tag <- tagAppendAttributes(tag, class = class)

  as_fragment(
    tag_require(tag, version = 5, caller = "layout_columns()")
  )
}

as_col_spec <- function(col_widths, n_kids) {
  if (is.null(col_widths)) return(NULL)

  if (!is_breakpoints(col_widths)) {
    col_widths <- breakpoints(md = col_widths)
  }

  for (break_name in names(col_widths)) {
    bk <- col_widths[[break_name]]

    if (rlang::is_na(bk)) {
      next
    }

    if (isTRUE(any(bk == 0))) {
      abort("Column values must be greater than 0 to indicate width, or negative to indicate a column offset.")
    }

    if (length(bk) > 1 && anyNA(bk)) {
      abort("Cannot mix widths and `NA` values. All column widths must be specified, or choose auto widths using a single `NA` value.")
    }

    if (!any(bk > 0)) {
      abort("Column values must include at least one positive integer width.")
    }

    if (length(bk) > n_kids) {
      rlang::warn(
        sprintf(
          "More column widths than children at breakpoint '%s', extra widths will be ignored.",
          break_name
        )
      )
    }
  }

  col_widths
}

json_col_spec <- function(col_widths) {
  if (is.null(col_widths)) return(NULL)

  jsonlite::toJSON(
    unclass(col_widths),
    null = "null",
    na = "null",
    auto_unbox = FALSE
  )
}

maybe_fr_unit <- function(x) {
  if (is.numeric(x)) sprintf("%0.0ffr", x) else x
}

row_heights_css_vars <- function(x) {
  if (is.null(x)) return(list())

  if (!is_breakpoints(x)) {
    # Setting the `xs` breakpoint is equivalent to setting all breaks
    x <- breakpoints(xs = x)
  }

  # creates classes that pair with CSS variables when set
  classes <- paste0("bslib-grid--row-heights--", names(x))

  css_vars <- setNames(x, paste0("--", classes))
  if ("xs" %in% names(x)) {
    # xs doesn't get a specific breakpoint, we just set the parent CSS variable
    names(css_vars)[which(names(x) == "xs")] <- "--bslib-grid--row-heights"
  }

  # mobile row height is derived from xs or defaults to auto in the CSS,
  # so we don't need the class to activate it
  classes <- setdiff(classes, "bslib-grid--row-heights--xs")

  # Treat numeric values as fractional units
  css_vars <- rapply(css_vars, how = "replace", maybe_fr_unit)

  list(
    style = css(!!!css_vars),
    class = classes
  )
}

grid_item_container <- function(el, ..., fillable = TRUE) {
  div(
    ...,
    class = "bslib-grid-item bslib-gap-spacing",
    if (fillable) as_fillable_container(),
    el
  )
}
