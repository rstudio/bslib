test_that("sidebar(open =) ensures backwards compatibility of defaults", {
  expect_equal(
    sidebar(open = TRUE, id = "open"),
    sidebar(open = "open", id = "open")
  )

  expect_equal(
    sidebar(open = FALSE, id = "closed"),
    sidebar(open = "closed", id = "closed")
  )

  expect_equal(
    sidebar(open = NA, id = "always"),
    sidebar(open = "always", id = "always")
  )
})

test_that("sidebar(open = 'always') doesn't include the collapse toggle", {
  expect_null(
    sidebar(open = "always")$collapse_tag
  )
})

test_that("sidebar() - assigns input binding class if `id` is provided", {
  expect_match(
    htmltools::tagGetAttribute(sidebar(id = "my-id")$tag, "class"),
    "bslib-sidebar-input"
  )
})

test_that("sidebar() - assigns a random `id` if collapsible and `id` not provided", {
  sidebar_open <- sidebar(open = "open")
  expect_match(
    htmltools::tagGetAttribute(sidebar_open$tag, "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_open$collapse_tag, "aria-controls"),
    htmltools::tagGetAttribute(sidebar_open$tag, "id")
  )

  sidebar_closed <- sidebar(open = "closed")
  expect_match(
    htmltools::tagGetAttribute(sidebar_closed$tag, "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_closed$collapse_tag, "aria-controls"),
    htmltools::tagGetAttribute(sidebar_closed$tag, "id")
  )

  sidebar_desktop <- sidebar(open = "desktop")
  expect_match(
    htmltools::tagGetAttribute(sidebar_desktop$tag, "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_desktop$collapse_tag, "aria-controls"),
    htmltools::tagGetAttribute(sidebar_desktop$tag, "id")
  )

  expect_null(
    htmltools::tagGetAttribute(sidebar(open = "always")$tag, "id")
  )
})

test_that("sidebar() - sets `aria-expanded` correctly on collapse toggle", {
  sidebar_open <- sidebar(open = "open")

  expect_equal(
    htmltools::tagGetAttribute(sidebar_open$collapse_tag, "aria-expanded"),
    "true"
  )

  sidebar_closed <- sidebar(open = "closed")

  expect_equal(
    htmltools::tagGetAttribute(sidebar_closed$collapse_tag, "aria-expanded"),
    "false"
  )
})

test_that("sidebar() - throws an error for invalid `open` values", {
  expect_error(
    sidebar(open = "bad")
  )

  expect_error(
    sidebar(open = c("open", "closed"))
  )

  expect_error(
    sidebar(open = 1)
  )

  expect_error(
    sidebar(open = "OPEN")
  )

  expect_error(
    sidebar(open = character())
  )
})
