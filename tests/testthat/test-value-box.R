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

test_that("resolve_showcase_layout()", {
  expect_equal(
    resolve_showcase_layout("left center"),
    showcase_left_center()
  )

  expect_equal(
    resolve_showcase_layout("top right"),
    showcase_top_right()
  )

  expect_equal(
    resolve_showcase_layout("bottom"),
    showcase_bottom()
  )

  expect_equal(
    resolve_showcase_layout(showcase_left_center(width = 0.5)),
    showcase_left_center(width = 0.5)
  )

  expect_error(
    resolve_showcase_layout("left"),
  )
})

test_that("resolve_showcase_layout() can resolve all layouts in value_box()", {
  layouts <- eval(rlang::fn_fmls(value_box)$showcase_layout)

  for (layout in layouts) {
    expect_silent(resolve_showcase_layout(layout))
  }
})
