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

test_that("breakpoints_columns_widths() has correct classes and structure", {
  bp <- breakpoints_columns(
    lg = c(-2, 2, -1, -2, 3, -2),
    md = c(-1, 2, -2, 3),
    sm = c(1, -1, 1),
    xl = c(1, 2, 3),
    huge = c(1, 2, 3)
  )

  expect_s3_class(bp, "bslib_breakpoints")
  expect_s3_class(bp, "bslib_breakpoints_columns")

  expect_true(is_breakpoints(bp))
  expect_true(is_breakpoints(bp, "columns"))

  # names are ordered, custom breakpoint names are last
  expect_named(bp, c("sm", "md", "lg", "xl", "huge"))

  expect_snapshot(bp)
})

test_that("breakpoints_columns() with negative widths to indicate empty columns", {
  bp <- breakpoints_columns(
    sm = c(1, -1, 1),
    md = c(-1, 2, -2, 3),
    lg = c(-2, 2, -1, -2, 3, -2),
    xl = c(1, 2, 3)
  )

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
  expect_error(breakpoints_columns(1:3))
})

test_that("breakpoints_columns() can be a single NA", {
  bp <- breakpoints_columns(
    sm = NA,
    md = c(-1, 2, -2, 3),
    lg = c(-2, 2, -1, -2, 3, -2),
    xl = NA
  )

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

test_that("breakpoints_columns() throws if NAs are mixed with other column values", {
  expect_snapshot_error(
    breakpoints_columns(sm = c(-1, NA, 1))
  )
})

test_that("bs_css_grid_width_classes() warns when too many column widths", {
  expect_snapshot_warning(
    expect_equal(
      bs_css_grid_width_classes(breakpoints_columns(md = 1:4), 3),
      c("g-col-md-1", "g-col-md-2", "g-col-md-3")
    )
  )
})

test_that("bs_css_grid_width_classes() requires a breakpoints_columns() object", {
  expect_error(
    bs_css_grid_width_classes(breakpoints(md = 1:2), 3)
  )
})

test_that("bs_css_grid_width_classes()", {
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(md = 6), n_kids = 3),
    c("g-col-md-6", "g-col-md-6", "g-col-md-6")
  )

  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(4, 8)), n_kids = 3),
    c("g-col-lg-4", "g-col-lg-8", "g-col-lg-4")
  )

  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(12)), n_kids = 3),
    c("g-col-lg-12", "g-col-lg-12", "g-col-lg-12")
  )

  # accounts for leading and trailing empty columns
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(-1, 4, 6, -1)), n_kids = 3),
    c("g-start-lg-2 g-col-lg-4", "g-col-lg-6", "g-start-lg-2 g-col-lg-4")
  )

  # accounts for trailing empty columns (restarts on first column with class if needed)
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(1, 3, -1, 6, -1)), n_kids = 4),
    c("g-col-lg-1", "g-col-lg-3", "g-start-lg-6 g-col-lg-6", "g-start-lg-1 g-col-lg-1")
  )

  # accounts for trailing empty columns (restarts on first column without class if possible)
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(4, -1, 6, -1)), n_kids = 3),
    c("g-col-lg-4", "g-start-lg-6 g-col-lg-6", "g-col-lg-4")
  )

  # doesn't allow empty columns to cause an empty row due to row break
  # skipping 8 columns would start the second row on column 5, but the next 9
  # column-item would cause a row break, leaving an empty row (which we avoid)
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(8, -8, 9)), n_kids = 4),
    c("g-col-lg-8", "g-col-lg-9", "g-col-lg-8", "g-col-lg-9")
  )

  # Same as above, except that 8 columns *will* fit on next row with an offset
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(8, -8, 8)), n_kids = 4),
    c("g-col-lg-8", "g-start-lg-5 g-col-lg-8", "g-col-lg-8", "g-start-lg-5 g-col-lg-8")
  )

  # recycles the pattern to match number of kids
  expect_equal(
    bs_css_grid_width_classes(breakpoints_columns(lg = c(5, -2, 5, 12)), n_kids = 7),
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
    bs_css_grid_width_classes(breakpoints_columns(lg = c(-1, 5, 5, -1, 12)), n_kids = 7),
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
  expect_error(breakpoint_columns(md = c(-1, 0, 1)))
})

test_that("breakpoint_columns() throws if no columns are positive", {
  expect_error(breakpoints_columns(md = c(-1)))
  expect_error(breakpoints_columns(md = c(-1, -1, -1)))
})

test_that("bs_css_grid_col_spec() auto layout with col_widths = NA", {
  kids_1 <- bs_css_grid_col_spec(NA, 1)

  # bare NA is the same as NA breakpoints at sm and lg
  expect_equal(
    bs_css_grid_col_spec(breakpoints_columns(sm = NA, lg = NA), 1),
    kids_1
  )

  expect_equal(kids_1$n_cols, 1)
  expect_equal(kids_1$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_2 <- bs_css_grid_col_spec(NA, 2)
  expect_equal(kids_2$n_cols, 2)
  expect_equal(kids_2$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_3 <- bs_css_grid_col_spec(NA, 3)
  expect_equal(kids_3$n_cols, 3)
  expect_equal(kids_3$col_widths$sm, list(width = 1, before = 0, after = 0))

  kids_4 <- bs_css_grid_col_spec(NA, 4)
  expect_equal(kids_4$n_cols, 8)
  expect_equal(kids_4$col_widths$sm, list(width = 4, before = 0, after = 0))
  expect_equal(kids_4$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_5 <- bs_css_grid_col_spec(NA, 5)
  expect_equal(kids_5$n_cols, 5 * 2)
  expect_equal(kids_5$col_widths$sm, list(width = 5, before = 0, after = 0))
  expect_equal(kids_5$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_6 <- bs_css_grid_col_spec(NA, 6)
  expect_equal(kids_6$n_cols, 6 * 2)
  expect_equal(kids_6$col_widths$sm, list(width = 6, before = 0, after = 0))
  expect_equal(kids_6$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_7 <- bs_css_grid_col_spec(NA, 7)
  expect_equal(kids_7$n_cols, 7 * 2)
  expect_equal(kids_7$col_widths$sm, list(width = 7, before = 0, after = 0))
  expect_equal(kids_7$col_widths$lg, list(width = 2, before = 0, after = 0))

  kids_8 <- bs_css_grid_col_spec(NA, 8)
  expect_equal(kids_8$n_cols, 12)
  expect_equal(kids_8$col_widths$sm, list(width = 6, before = 0, after = 0))
  expect_equal(kids_8$col_widths$lg, list(width = 3, before = 0, after = 0))
})

test_that("bs_css_grid_col_spec() missing smaller breakpoints inherit from lg+", {
  expect_equal(
    bs_css_grid_col_spec(breakpoints_columns(lg = c(4, -4, 4)), 2)$col_widths,
    breakpoints_columns(
      md = c(4, -4, 4),
      lg = c(4, -4, 4)
    )
  )

  expect_equal(
    bs_css_grid_col_spec(breakpoints_columns(xl = c(4, -4, 4)), 2)$col_widths,
    breakpoints_columns(
      md = c(4, -4, 4),
      xl = c(4, -4, 4)
    )
  )

  expect_equal(
    bs_css_grid_col_spec(breakpoints_columns(xxl = c(4, -4, 4)), 2)$col_widths,
    breakpoints_columns(
      md = c(4, -4, 4),
      xxl = c(4, -4, 4)
    )
  )
})

test_that("bs_css_grid_col_spec() base case", {
  expect_equal(
    bs_css_grid_col_spec(1:3, 6),
    list(n_cols = 12, col_widths = breakpoints_columns(md = 1:3))
  )
})

test_that("bslib_grid_rows_css_vars() assumes fr unless >12", {
  for (i in 1:12) {
    expect_match(
      bslib_grid_rows_css_vars(breakpoints(md = i))$style,
      sprintf("%dfr", i),
      fixed = TRUE
    )
  }

  expect_match(
    bslib_grid_rows_css_vars(breakpoints(md = 13))$style,
    "13px",
    fixed = TRUE
  )
})

test_that("bslib_grid_rows_css_vars() decides fr/px for numeric, passes character", {
  expect_equal(
    bslib_grid_rows_css_vars(breakpoints(md = list(200, 1))),
    bslib_grid_rows_css_vars(breakpoints(md = "200px 1fr"))
  )

  expect_equal(
    bslib_grid_rows_css_vars(breakpoints(md = c(200, 1))),
    bslib_grid_rows_css_vars(breakpoints(md = "200px 1fr"))
  )

  expect_equal(
    bslib_grid_rows_css_vars(breakpoints(md = list("auto", 1))),
    bslib_grid_rows_css_vars(breakpoints(md = "auto 1fr"))
  )
})
