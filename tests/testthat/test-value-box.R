test_that("value_box(theme_color=) is deprecated", {
  lifecycle::expect_deprecated(
    value_box("title", "value", theme_color = "primary")
  )

  lifecycle::expect_deprecated(
    expect_equal(
      value_box("title", "value", theme_color = "primary"),
      value_box("title", "value", theme = "primary")
    )
  )

  lifecycle::expect_deprecated(
    expect_equal(
      value_box("title", "value", theme = "primary", theme_color = "secondary"),
      value_box("title", "value", theme = "primary")
    )
  )
})
