test_that("grid_item_container()", {
  expect_snapshot(
    grid_item_container(
      div(class = "layout-column-child-element"),
      class = "g-col-md-6 g-col-lg-4",
      fillable = TRUE
    )
  )

  expect_snapshot(
    grid_item_container(
      div(class = "layout-column-child-element"),
      class = "g-col-md-6 g-col-lg-4",
      fillable = FALSE
    )
  )
})

test_that("grid-breakpoints are known", {
  brks <- bs_get_variables(
    bs_add_variables(
      bs_theme(),
      "grid-brk-names" = "map-keys($grid-breakpoints)",
      .where = "declarations"
    ),
    "grid-brk-names"
  )

  # In bslib::breakpoints() we flag these as "known" breakpoints...
  # which mostly means we order them, but also, in the NA case,
  # we use lg/xl/xxl to fill in md
  expect_equal(
    strsplit(brks, ", ")[[1]],
    c("xs", "sm", "md", "lg", "xl", "xxl")
  )
})

test_that("breakpoints() re-orders well-known breaks and test print method", {
  bp <- breakpoints(
    xl = 5,
    sm = 2,
    xs = 1,
    giant = 7,
    lg = 4,
    huge = 8,
    md = 3,
    xxl = 6
  )

  expect_snapshot(bp)
  expect_equal(unclass(unname(unlist(bp))), 1:8)
})

test_that("breakpoints() has correct classes and structure", {
  bp <- breakpoints(
    lg = c(-2, 2, -1, -2, 3, -2),
    md = c(-1, 2, -2, 3),
    sm = c(1, -1, 1),
    xl = c(1, 2, 3, NA),
    huge = list(1, 2, 3, "auto")
  )

  expect_true(is_breakpoints(bp))

  # names are ordered, custom breakpoint names are last
  expect_named(bp, c("sm", "md", "lg", "xl", "huge"))

  expect_snapshot(bp)
})

test_that("breakpoints() with negative widths to indicate empty columns", {
  bp <- breakpoints(
    sm = c(1, -1, 1),
    md = c(-1, 2, -2, 3),
    lg = c(-2, 2, -1, -2, 3, -2),
    xl = c(1, 2, 3)
  )

  bp <- as_column_breakpoints(bp)

  expect_equal(bp$sm$width, c(1, 1), ignore_attr = TRUE)
  expect_equal(bp$md$width, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$lg$width, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$xl$width, c(1, 2, 3), ignore_attr = TRUE)

  expect_equal(bp$sm[["before"]], c(0, 1))
  expect_equal(bp$md[["before"]], c(1, 2))
  expect_equal(bp$lg[["before"]], c(2, 3))
  expect_equal(bp$xl[["before"]], c(0, 0, 0))

  expect_equal(bp$sm[["after"]], c(0, 0))
  expect_equal(bp$md[["after"]], c(0, 0))
  expect_equal(bp$lg[["after"]], c(0, 2))
  expect_equal(bp$xl[["after"]], c(0, 0, 0))
})

test_that("breakpoints() must be named", {
  expect_error(breakpoints(1:3))
})

test_that("breakpoints() can be a single NA", {
  bp <- breakpoints(
    sm = NA,
    md = c(-1, 2, -2, 3),
    lg = c(-2, 2, -1, -2, 3, -2),
    xl = NA
  )

  bp <- as_column_breakpoints(bp)

  expect_equal(bp$sm$width, NA, ignore_attr = TRUE)
  expect_equal(bp$md$width, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$lg$width, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$xl$width, NA, ignore_attr = TRUE)

  expect_equal(bp$sm[["before"]], c(0))
  expect_equal(bp$md[["before"]], c(1, 2))
  expect_equal(bp$lg[["before"]], c(2, 3))
  expect_equal(bp$xl[["before"]], c(0))

  expect_equal(bp$sm[["after"]], c(0))
  expect_equal(bp$md[["after"]], c(0, 0))
  expect_equal(bp$lg[["after"]], c(0, 2))
  expect_equal(bp$xl[["after"]], c(0))
})

test_that("breakpoints() throws if NAs are mixed with other column values", {
  expect_snapshot_error(
    layout_columns(col_widths = breakpoints(sm = c(-1, NA, 1)))
  )
})

test_that("bs_css_grid_width_classes() warns when too many column widths", {
  expect_snapshot_warning(
    expect_equal(
      col_width_grid_classes(breakpoints(md = 1:4), 3),
      c("g-col-md-1", "g-col-md-2", "g-col-md-3")
    )
  )
})

test_that("bs_css_grid_width_classes()", {
  expect_equal(
    col_width_grid_classes(breakpoints(md = 6), 3),
    c("g-col-md-6", "g-col-md-6", "g-col-md-6")
  )

  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(4, 8)), 3),
    c("g-col-lg-4", "g-col-lg-8", "g-col-lg-4")
  )

  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(12)), n_kids = 3),
    c("g-col-lg-12", "g-col-lg-12", "g-col-lg-12")
  )

  # accounts for leading and trailing empty columns
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(-1, 4, 6, -1)), n_kids = 3),
    c("g-start-lg-2 g-col-lg-4", "g-col-lg-6", "g-start-lg-2 g-col-lg-4")
  )

  # accounts for trailing empty columns (restarts on first column with class if needed)
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(1, 3, -1, 6, -1)), n_kids = 4),
    c("g-col-lg-1", "g-col-lg-3", "g-start-lg-6 g-col-lg-6", "g-start-lg-1 g-col-lg-1")
  )

  # accounts for trailing empty columns (restarts on first column without class if possible)
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(4, -1, 6, -1)), n_kids = 3),
    c("g-col-lg-4", "g-start-lg-6 g-col-lg-6", "g-col-lg-4")
  )

  # doesn't allow empty columns to cause an empty row due to row break
  # skipping 8 columns would start the second row on column 5, but the next 9
  # column-item would cause a row break, leaving an empty row (which we avoid)
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(8, -8, 9)), n_kids = 4),
    c("g-col-lg-8", "g-col-lg-9", "g-col-lg-8", "g-col-lg-9")
  )

  # Same as above, except that 8 columns *will* fit on next row with an offset
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(8, -8, 8)), n_kids = 4),
    c("g-col-lg-8", "g-start-lg-5 g-col-lg-8", "g-col-lg-8", "g-start-lg-5 g-col-lg-8")
  )

  # recycles the pattern to match number of kids
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(5, -2, 5, 12)), n_kids = 7),
    c(
      "g-col-lg-5",
      "g-start-lg-8 g-col-lg-5",
      "g-col-lg-12",
      # repeats
      "g-col-lg-5",
      "g-start-lg-8 g-col-lg-5",
      "g-col-lg-12",
      # repeats (partially)
      "g-col-lg-5"
    )
  )

  # variant of previous test where first/last columns are empty
  expect_equal(
    col_width_grid_classes(breakpoints(lg = c(-1, 5, 5, -1, 12)), n_kids = 7),
    c(
      "g-start-lg-2 g-col-lg-5",
      "g-col-lg-5",
      "g-col-lg-12",
      # repeats
      "g-start-lg-2 g-col-lg-5",
      "g-col-lg-5",
      "g-col-lg-12",
      # repeats (partially)
      "g-start-lg-2 g-col-lg-5"
    )
  )
})

test_that("breakpoint_columns() throws if a column is 0", {
  expect_error(
    col_width_grid_classes(breakpoints(md = c(-1, 0, 1)), 3)
  )
})

test_that("breakpoint_columns() throws if no columns are positive", {
  expect_error(
    col_width_grid_classes(breakpoints(md = -1), 1)
  )
  expect_error(
    col_width_grid_classes(breakpoints(md = c(-1, -1, -1)), 3)
  )
})

test_that("impute_col_spec() auto layout with col_widths = NA", {

  get_col_spec <- function(x, n_kids) {
    spec <- impute_col_spec(x, n_kids)
    list(
      n_cols = spec$n_cols,
      col_widths = as_column_breakpoints(spec$col_widths)
    )
  }

  kids_1 <- get_col_spec(NA, 1)

  # bare NA is the same as NA breakpoints at sm and lg
  expect_equal(
    get_col_spec(breakpoints(sm = NA, lg = NA), 1),
    kids_1
  )

  expect_equal(kids_1$n_cols, 1)
  expect_equal(kids_1$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_2 <- get_col_spec(NA, 2)
  expect_equal(kids_2$n_cols, 2)
  expect_equal(kids_2$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_3 <- get_col_spec(NA, 3)
  expect_equal(kids_3$n_cols, 3)
  expect_equal(kids_3$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_4 <- get_col_spec(NA, 4)
  expect_equal(kids_4$n_cols, 8)
  expect_equal(kids_4$col_widths$sm, list(width = 4, before = 0, after = 0))
  expect_equal(kids_4$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_5 <- get_col_spec(NA, 5)
  expect_equal(kids_5$n_cols, 5 * 2)
  expect_equal(kids_5$col_widths$sm, list(width = 5, before = 0, after = 0))
  expect_equal(kids_5$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_6 <- get_col_spec(NA, 6)
  expect_equal(kids_6$n_cols, 6 * 2)
  expect_equal(kids_6$col_widths$sm, list(width = 6, before = 0, after = 0))
  expect_equal(kids_6$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_7 <- get_col_spec(NA, 7)
  expect_equal(kids_7$n_cols, 7 * 2)
  expect_equal(kids_7$col_widths$sm, list(width = 7, before = 0, after = 0))
  expect_equal(kids_7$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_8 <- get_col_spec(NA, 8)
  expect_equal(kids_8$n_cols, 12)
  expect_equal(kids_8$col_widths$sm, list(width = 6, before = 0, after = 0))
  expect_equal(kids_8$col_widths$lg, list(width = 3, before = 0, after = 0))
})

test_that("impute_col_spec() missing smaller breakpoints inherit from lg+", {
  expect_equal(
    impute_col_spec(breakpoints(lg = c(4, -4, 4)), 2)$col_widths,
    breakpoints(
      md = c(4, -4, 4),
      lg = c(4, -4, 4)
    )
  )

  expect_equal(
    impute_col_spec(breakpoints(xl = c(4, -4, 4)), 2)$col_widths,
    breakpoints(
      md = c(4, -4, 4),
      xl = c(4, -4, 4)
    )
  )

  expect_equal(
    impute_col_spec(breakpoints(xxl = c(4, -4, 4)), 2)$col_widths,
    breakpoints(
      md = c(4, -4, 4),
      xxl = c(4, -4, 4)
    )
  )
})

test_that("impute_col_spec() base case", {
  expect_equal(
    impute_col_spec(1:3, 6),
    list(n_cols = 12, col_widths = breakpoints(md = 1:3))
  )
})

test_that("row_heights_css_vars() decides fr/px for numeric, passes character", {
  expect_equal(
    row_heights_css_vars(breakpoints(md = c(2, 1)))$style,
    "--bslib-grid--row-heights--md:2fr 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list(2, 1)))$style,
    "--bslib-grid--row-heights--md:2fr 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list("auto", 1)))$style,
    "--bslib-grid--row-heights--md:auto 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list("10px", 1)))$style,
    "--bslib-grid--row-heights--md:10px 1fr;"
  )
})
