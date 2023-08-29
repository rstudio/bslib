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

test_that("print.bslib_showcase_layout()", {
  expect_snapshot(showcase_left_center())
  expect_snapshot(showcase_top_right())
  expect_snapshot(showcase_bottom())
})

test_that("value_box_theme() basic usage", {
  expect_equal(
    value_box_theme(),
    new_value_box_theme("default")
  )

  # class and style are used be value_box(), but theme keeps original values
  expect_equal(
    value_box_theme("primary")[c("class", "style")],
    value_box_theme("bg-primary")[c("class", "style")]
  )

  expect_null(value_box_theme("orange")$style)
  expect_null(value_box_theme(bg = "orange")$class)

  expect_error(value_box_theme(c("text-primary", "bg-dark")))
})

test_that("value_box_theme() fills in `fg` when only `bg` is provided", {
  # fills in foreground
  expect_equal(
    value_box_theme(bg = "black")[c("class", "style")],
    value_box_theme(bg = "#000000", fg = "#FFFFFF")[c("class", "style")]
  )

  # doesn't fill in foreground because `name` was used
  expect_equal(
    value_box_theme("text-yellow", bg = "black")$style,
    "background-color:#000000;"
  )
})

test_that("value_box_theme() print method", {
  expect_snapshot(value_box_theme("bg-gradient-blue-purple"))
  expect_snapshot(value_box_theme("red", fg = "white"))
  expect_snapshot(value_box_theme(bg = "black"))
  # Can set `name` and `bg` but not `fg` without automatic contrast calculation
  expect_snapshot(value_box_theme("text-red", bg = "#FFE8E8"))
})

test_that("value_box_theme() includes the user's original values", {
  expect_equal(value_box_theme("orange")$name, "orange")
  expect_equal(value_box_theme("orange")$class, "bg-orange")
  expect_equal(value_box_theme(bg = "orange")$bg, "orange")
  expect_equal(value_box_theme(fg = "orange")$fg, "orange")
})

test_that("value_box_auto_border_class() returns NULL if border* is in `class`", {
  expect_null(
    value_box_auto_border_class(NULL, class = "border")
  )

  expect_null(
    value_box_auto_border_class(NULL, class = "bg-primary border")
  )

  expect_null(
    value_box_auto_border_class(NULL, class = "border-2")
  )
})

test_that("value_box_auto_border_class() adds border-auto to default themes", {
  expect_equal(
    value_box_auto_border_class(value_box_theme(NULL)),
    "border-auto"
  )
})

test_that("value_box_auto_border_class() adds border-auto if only foreground is set", {
  expect_equal(
    value_box_auto_border_class(value_box_theme("text-primary")),
    "border-auto"
  )

  expect_equal(
    value_box_auto_border_class(value_box_theme(), "text-primary"),
    "border-auto"
  )

  expect_equal(
    value_box_auto_border_class(value_box_theme(fg = "yellow")),
    "border-auto"
  )

  expect_null(
    value_box_auto_border_class(value_box_theme("purple"))
  )

  expect_null(
    value_box_auto_border_class(value_box_theme(bg = "purple"))
  )

  expect_null(
    value_box_auto_border_class(value_box_theme(bg = "purple", fg = "yellow"))
  )

  expect_null(
    value_box_auto_border_class(value_box_theme(), "bg-purple")
  )
})