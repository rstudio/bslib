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
  my_sidebar <- sidebar(id = "my-id")

  expect_match(
    htmltools::tagGetAttribute(my_sidebar$tag, "class"),
    "bslib-sidebar-input"
  )

  expect_equal(
    htmltools::tagGetAttribute(my_sidebar$tag, "id"),
    "my-id"
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
  expect_equal(
    htmltools::tagGetAttribute(sidebar(open = "open")$collapse_tag, "aria-expanded"),
    "true"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar(open = "closed")$collapse_tag, "aria-expanded"),
    "false"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar(open = "desktop")$collapse_tag, "aria-expanded"),
    "true"
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
test_that("layout_sidebar() - errors with unexpected border, border_radius input values", {
  expect_error(
    layout_sidebar(sidebar(), border = "1px solid blue")
  )
  expect_error(
    layout_sidebar(sidebar(), border = c(TRUE, FALSE))
  )
  expect_error(
    layout_sidebar(sidebar(), border_radius = c(TRUE, FALSE))
  )
  expect_error(
    layout_sidebar(sidebar(), border = c(TRUE, NA))
  )
  expect_error(
    layout_sidebar(sidebar(), border_radius = c(TRUE, NA))
  )
})

test_that("layout_sidebar() - NA border, border_radius is treated like NULL", {
  expect_silent(
    layout_sidebar(sidebar(), border = NA)
  )
  expect_silent(
    layout_sidebar(sidebar(), border_radius = NA)
  )
})
