test_that("sidebar_border_classes()", {
  expect_null(sidebar_border_classes())

  expect_equal(
    sidebar_border_classes(border = TRUE),
    "sidebar-border-enabled"
  )
  expect_equal(
    sidebar_border_classes(border = FALSE),
    "sidebar-border-disabled"
  )

  expect_equal(
    sidebar_border_classes(border_radius = TRUE),
    "sidebar-border-radius-enabled"
  )
  expect_equal(
    sidebar_border_classes(border_radius = FALSE),
    "sidebar-border-radius-disabled"
  )

  expect_equal(
    sidebar_border_classes(border = TRUE, border_radius = FALSE),
    "sidebar-border-enabled sidebar-border-radius-disabled"
  )
  expect_equal(
    sidebar_border_classes(border = FALSE, border_radius = TRUE),
    "sidebar-border-disabled sidebar-border-radius-enabled"
  )

  expect_error(
    sidebar_border_classes(border = "1px solid blue")
  )
  expect_error(
    sidebar_border_classes(border_radius = c(TRUE, FALSE))
  )
  expect_error(
    layout_sidebar(sidebar(), border = c(TRUE, FALSE))
  )
})
