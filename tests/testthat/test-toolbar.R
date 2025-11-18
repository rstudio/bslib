test_that("toolbar() basic attributes and defaults", {
  tb <- as.tags(toolbar(htmltools::span("Test")))
  expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")
  expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")

  tb <- as.tags(toolbar(align = "left"))
  expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")

  expect_error(toolbar("x", align = "center"))
})


test_that("toolbar() markup snapshots", {
  # Basic toolbar using defaults
  expect_snapshot_html(
    toolbar("Item 1", "Item 2")
  )

  # Toolbars with alignment options
  expect_snapshot_html(
    toolbar("Item 1", "Item 2", align = "left")
  )
})
