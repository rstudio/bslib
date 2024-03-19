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

test_that("sidebar() - assigns input binding class if `id` is provided", {
  my_sidebar <- as.tags(sidebar(id = "my-id", open = sidebar_open_on()))

  expect_match(
    htmltools::tagGetAttribute(my_sidebar[[1]], "class"),
    "bslib-sidebar-input"
  )

  expect_equal(
    htmltools::tagGetAttribute(my_sidebar[[1]], "id"),
    "my-id"
  )
})

test_that("sidebar() - assigns a random `id` if collapsible and `id` not provided", {
  sidebar_open <- as.tags(sidebar(open = "open"))

  expect_match(
    htmltools::tagGetAttribute(sidebar_open[[1]], "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_open[[2]], "aria-controls"),
    htmltools::tagGetAttribute(sidebar_open[[1]], "id")
  )

  sidebar_closed <- as.tags(sidebar(open = "closed"))
  expect_match(
    htmltools::tagGetAttribute(sidebar_closed[[1]], "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_closed[[2]], "aria-controls"),
    htmltools::tagGetAttribute(sidebar_closed[[1]], "id")
  )

  sidebar_desktop <- as.tags(sidebar(open = "desktop"))
  expect_match(
    htmltools::tagGetAttribute(sidebar_desktop[[1]], "id"),
    "bslib-sidebar-\\d+"
  )

  expect_equal(
    htmltools::tagGetAttribute(sidebar_desktop[[2]], "aria-controls"),
    htmltools::tagGetAttribute(sidebar_desktop[[1]], "id")
  )

  expect_null(
    htmltools::tagGetAttribute(sidebar(open = "always")[[1]], "id")
  )
})

test_that("sidebar() - sets `aria-expanded` correctly on collapse toggle", {
  get_sidebar_collapse_tag <- function(...) {
    as.tags(sidebar(...))[[2]]
  }

  expect_equal(
    htmltools::tagGetAttribute(get_sidebar_collapse_tag(open = "open"), "aria-expanded"),
    "true"
  )

  expect_equal(
    htmltools::tagGetAttribute(get_sidebar_collapse_tag(open = "closed"), "aria-expanded"),
    "false"
  )

  expect_equal(
    htmltools::tagGetAttribute(get_sidebar_collapse_tag(open = "desktop"), "aria-expanded"),
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

test_that("sidebar() - warns if `max_height_mobile` used with `open != 'always'", {
  expect_warning(
    as.tags(sidebar(open = "open", max_height_mobile = "100px"))
  )

  expect_silent(
    as.tags(sidebar(open = "always", max_height_mobile = "100px"))
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
  expect_error(
    layout_sidebar(sidebar(), border = NA)
  )
  expect_error(
    layout_sidebar(sidebar(), border_radius = NA)
  )
})
