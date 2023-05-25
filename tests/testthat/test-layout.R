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

test_that("breakpoints_columns() with NA widths to indicate space-filling columns", {
  bp <- breakpoints_columns(
    sm = c(1, -1, NA),
    md = c(-1, NA, -2, 3),
    lg = c(-2, 2, -1, -2, NA, -2),
    xl = c(1, 2, NA)
  )

  expect_equal(bp$sm$width, c(1, NA), ignore_attr = TRUE)
  expect_equal(bp$md$width, c(NA, 3), ignore_attr = TRUE)
  expect_equal(bp$lg$width, c(2, NA), ignore_attr = TRUE)
  expect_equal(bp$xl$width, c(1, 2, NA), ignore_attr = TRUE)

  expect_equal(bp$sm[["before"]], c(0, 1))
  expect_equal(bp$md[["before"]], c(1, 2))
  expect_equal(bp$lg[["before"]], c(2, 3))
  expect_equal(bp$xl[["before"]], c(0, 0, 0))

  expect_equal(bp$sm[["after"]], c(0, 0))
  expect_equal(bp$md[["after"]], c(0, 0))
  expect_equal(bp$lg[["after"]], c(0, 2))
  expect_equal(bp$xl[["after"]], c(0, 0, 0))
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

test_that("breakpoint_columns() throws if no columns are positive or NA", {
  expect_error(breakpoints_columns(md = c(-1, -1, -1)))
  expect_silent(breakpoints_columns(md = c(-1, NA, -1)))
})
