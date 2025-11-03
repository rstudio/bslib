test_that("toolbar() basic attributes and defaults", {
    tb <- as.tags(toolbar(htmltools::span("Test")))

    expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")

    expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")
    expect_match(htmltools::tagGetAttribute(tb, "data-size"), "sm")
})

test_that("toolbar() assigns correct attributes", {
    tb <- as.tags(toolbar(align = "left", size = "md"))

    expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")
    expect_equal(htmltools::tagGetAttribute(tb, "data-size"), "md")
})

test_that("toolbar() validation of inputs", {
    expect_error(toolbar("x", align = "center"))
    expect_error(toolbar("x", size = "xl"))
})
