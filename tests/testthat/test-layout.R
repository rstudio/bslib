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

