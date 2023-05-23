test_that("breakpoints() with negative widths to indicate empty columns", {
  bp <- breakpoints(
    sm = c(1, -1, 1),
    md = c(-1, 2, -2, 3),
    lg = c(-2, 2, -1, -2, 3, -2),
    xl = c(1, 2, 3)
  )

  expect_equal(bp$sm, c(1, 1), ignore_attr = TRUE)
  expect_equal(bp$md, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$lg, c(2, 3), ignore_attr = TRUE)
  expect_equal(bp$xl, c(1, 2, 3), ignore_attr = TRUE)

  expect_equal(attr(bp$sm, "before"), c(0, 1))
  expect_equal(attr(bp$md, "before"), c(1, 2))
  expect_equal(attr(bp$lg, "before"), c(2, 3))
  expect_equal(attr(bp$xl, "before"), c(0, 0, 0))

  expect_equal(attr(bp$sm, "after"), c(0, 0))
  expect_equal(attr(bp$md, "after"), c(0, 0))
  expect_equal(attr(bp$lg, "after"), c(0, 2))
  expect_equal(attr(bp$xl, "after"), c(0, 0, 0))
})

test_that("breakpoints() with NA widths to indicate space-filling columns", {
  bp <- breakpoints(
    sm = c(1, -1, NA),
    md = c(-1, NA, -2, 3),
    lg = c(-2, 2, -1, -2, NA, -2),
    xl = c(1, 2, NA)
  )

  expect_equal(bp$sm, c(1, NA), ignore_attr = TRUE)
  expect_equal(bp$md, c(NA, 3), ignore_attr = TRUE)
  expect_equal(bp$lg, c(2, NA), ignore_attr = TRUE)
  expect_equal(bp$xl, c(1, 2, NA), ignore_attr = TRUE)

  expect_equal(attr(bp$sm, "before"), c(0, 1))
  expect_equal(attr(bp$md, "before"), c(1, 2))
  expect_equal(attr(bp$lg, "before"), c(2, 3))
  expect_equal(attr(bp$xl, "before"), c(0, 0, 0))

  expect_equal(attr(bp$sm, "after"), c(0, 0))
  expect_equal(attr(bp$md, "after"), c(0, 0))
  expect_equal(attr(bp$lg, "after"), c(0, 2))
  expect_equal(attr(bp$xl, "after"), c(0, 0, 0))
})

