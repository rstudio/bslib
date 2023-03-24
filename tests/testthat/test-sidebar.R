test_that("layout_sidebar() - errors with unexpected border, border_radius input values", {
  expect_error(
    layout_sidebar(sidebar(), border = "1px solid blue")
  )
  expect_error(
    layout_sidebar(sidebar(), border = c(TRUE, FALSE))
  )
  expect_error(
    layout_sidebar(sidebar(), border_radius = c(TRUE, FALSE))
  )
  expect_error(
    layout_sidebar(sidebar(), border = c(TRUE, NA))
  )
  expect_error(
    layout_sidebar(sidebar(), border_radius = c(TRUE, NA))
  )
})

test_that("layout_sidebar() - NA border, border_radius is treated like NULL", {
  expect_silent(
    layout_sidebar(sidebar(), border = NA)
  )
  expect_silent(
    layout_sidebar(sidebar(), border_radius = NA)
  )
})
