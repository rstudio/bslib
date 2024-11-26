test_that("navbar_options() validates position", {
  expect_equal(
    navbar_options(position = "fixed-bottom")$position,
    "fixed-bottom"
  )

  expect_error(navbar_options(position = "bad"))
})

test_that("navbar_options() print method", {
  expect_snapshot(
    navbar_options(position = "static-top", inverse = FALSE, collapsible = TRUE)
  )

  expect_output(
    print(navbar_options()),
    "<bslib_navbar_options>"
  )
})

test_that("navset_bar() warns if using deprecated args", {
  lifecycle::expect_deprecated(
    navset_bar(position = "fixed-top")
  )
  lifecycle::expect_deprecated(
    navset_bar(bg = "red")
  )
  lifecycle::expect_deprecated(
    navset_bar(inverse = TRUE)
  )
  lifecycle::expect_deprecated(
    navset_bar(collapsible = FALSE)
  )
})

test_that("navset_bar() warns if `navbar_options()` collide with direct deprecated options", {
  rlang::local_options(lifecycle_verbosity = "quiet")

  expect_warning(
    navset_bar(
      position = "fixed-top",
      navbar_options = navbar_options(position = "static-top")
    )
  )

  expect_warning(
    navset_bar(
      bg = "red",
      navbar_options = navbar_options(bg = "blue")
    )
  )

  expect_warning(
    navset_bar(
      inverse = TRUE,
      navbar_options = navbar_options(inverse = FALSE)
    )
  )

  expect_warning(
    navset_bar(
      collapsible = FALSE,
      navbar_options = navbar_options(collapsible = TRUE)
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
        options_user = navbar_options(inverse = FALSE)
      )$inverse,
      FALSE
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

test_that("shiny:navbarPage() is unaffected", {
  rlang::local_options(lifecycle_verbosity = "warning")

  expect_silent(
    shiny::navbarPage(title = "test")
  )

  expect_silent(
    shiny::navbarPage(
      title = "test",
      bg = "red",
      collapsible = TRUE,
      inverse = TRUE,
      position = "fixed-top"
    )
  )
})
