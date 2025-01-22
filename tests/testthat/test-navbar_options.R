test_that("navbar_options() validates position", {
  expect_equal(
    navbar_options(position = "fixed-bottom")$position,
    "fixed-bottom"
  )

  expect_error(navbar_options(position = "bad"))
})

test_that("navbar_options() print method", {
  expect_snapshot(navbar_options())
  expect_snapshot(navbar_options(theme = "dark", bg = "red"))
  expect_snapshot(
    navbar_options(position = "static-top", theme = "auto", collapsible = TRUE)
  )

  expect_output(
    print(navbar_options()),
    "<bslib_navbar_options>"
  )
})

test_that("navbar_options() adds named args from ... to `attribs`", {
  expect_equal(navbar_options(foo = "bar")$attribs, list(foo = "bar"))
})

test_that("navbar_options() throws for unnamed args in ...", {
  expect_error(navbar_options("foo", "bar"))
})

test_that("navbar_options() warns `inverse` is used instead of `type`", {
  lifecycle::expect_deprecated(
    navbar_options(inverse = TRUE)
  )
})

test_that("navbar_options_resolve_deprecated() consolidates correctly", {
  # TODO-deprecated: Remove when direction options are deprecated with an error

  # deprecation messages are handled through other tests
  rlang::local_options(lifecycle_verbosity = "quiet")

  expect_equal(
    navbar_options_resolve_deprecated(navbar_options(), bg = "red")$bg,
    "red"
  )

  expect_equal(
    navbar_options_resolve_deprecated(list(), bg = "red")$bg,
    "red"
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        navbar_options(bg = "blue"),
        bg = "red"
      )$bg,
      "blue"
    )
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(list(bg = "blue"), bg = "red")$bg,
      "blue"
    )
  )

  expect_warning(
    expect_null(
      navbar_options_resolve_deprecated(
        navbar_options(bg = NULL),
        bg = "red"
      )$bg
    )
  )

  expect_warning(
    expect_null(
      navbar_options_resolve_deprecated(list(bg = NULL), bg = "red")$bg
    )
  )

  expect_equal(
    attr(navbar_options(underline = FALSE), "is_default"),
    attr(navbar_options_resolve_deprecated(underline = FALSE), "is_default")
  )
})

test_that("navbar_options_resolve_deprecated() upgrades `inverse` to `type`", {
  # TODO-deprecated: Remove when direction options are deprecated with an error

  # deprecation messages are handled through other tests
  rlang::local_options(lifecycle_verbosity = "quiet")

  expect_equal(
    navbar_options_resolve_deprecated(navbar_options(), inverse = TRUE)$theme,
    "dark"
  )

  expect_equal(
    navbar_options_resolve_deprecated(navbar_options(), inverse = FALSE)$theme,
    "light"
  )

  expect_equal(
    navbar_options_resolve_deprecated(navbar_options(), inverse = "auto")$theme,
    "auto"
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        navbar_options(theme = "light"),
        inverse = TRUE
      )$theme,
      "light"
    )
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        navbar_options(theme = "dark"),
        inverse = FALSE
      )$theme,
      "dark"
    )
  )
})

test_that("navbar_options_resolve_deprecated() prefers user options over deprecated direct options", {
  rlang::local_options(lifecycle_verbosity = "quiet")

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        position = "fixed-top",
        options_user = navbar_options(position = "static-top")
      )$position,
      "static-top"
    )
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        bg = "red",
        options_user = navbar_options(bg = "blue")
      )$bg,
      "blue"
    )
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        inverse = TRUE,
        options_user = navbar_options(theme = "light")
      )$theme,
      "light"
    )
  )

  expect_warning(
    expect_equal(
      navbar_options_resolve_deprecated(
        collapsible = FALSE,
        options_user = navbar_options(collapsible = TRUE)
      )$collapsible,
      TRUE
    )
  )
})
