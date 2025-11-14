test_that("toolbar() basic attributes and defaults", {
  tb <- as.tags(toolbar(htmltools::span("Test")))

  expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")

  expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")
})

test_that("toolbar() assigns correct attributes", {
  tb <- as.tags(toolbar(align = "left"))

  expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")
})

test_that("toolbar() validation of inputs", {
  expect_error(toolbar("x", align = "center"))
})

test_that("toolbar() markup snapshots", {
  show_raw_html <- function(x) {
    cat(format(x))
  }

  # Basic toolbar using defaults
  expect_snapshot(
    show_raw_html(
      toolbar("Item 1", "Item 2")
    )
  )

  # Toolbars with alignment options
  expect_snapshot(
    show_raw_html(
      toolbar("Item 1", "Item 2", align = "left")
    )
  )

  expect_snapshot(
    show_raw_html(
      toolbar("Item 1", "Item 2", align = "right")
    )
  )
})
