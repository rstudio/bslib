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

test_that("sidebar() has neutral markup by default", {
  sidebar_tag <- as.tags(sidebar())[[1]]

  expect_identical(sidebar_tag$name, "div")
  expect_null(htmltools::tagGetAttribute(sidebar_tag, "role"))
})

test_that("sidebar() renders semantic roles and accessible names", {
  complementary <- as.tags(
    sidebar(role = "complementary", title = "Related information")
  )[[1]]
  expect_identical(complementary$name, "aside")
  expect_null(htmltools::tagGetAttribute(complementary, "role"))
  expect_match(
    htmltools::tagGetAttribute(complementary, "aria-labelledby"),
    "bslib-sidebar-\\d+-title"
  )

  form <- as.tags(sidebar(role = "form", title = "Filters"))[[1]]
  expect_identical(form$name, "div")
  expect_identical(htmltools::tagGetAttribute(form, "role"), "form")
  expect_match(
    htmltools::tagGetAttribute(form, "aria-labelledby"),
    "bslib-sidebar-\\d+-title"
  )

  search <- as.tags(sidebar(role = "search", title = "Search"))[[1]]
  expect_identical(search$name, "div")
  expect_identical(htmltools::tagGetAttribute(search, "role"), "search")

  region <- as.tags(
    sidebar(role = "region", `aria-label` = "Filters")
  )[[1]]
  expect_identical(region$name, "div")
  expect_identical(htmltools::tagGetAttribute(region, "role"), "region")
  expect_identical(htmltools::tagGetAttribute(region, "aria-label"), "Filters")

  labelled_region <- as.tags(
    sidebar(role = "region", `aria-labelledby` = "filters-heading")
  )[[1]]
  expect_identical(
    htmltools::tagGetAttribute(labelled_region, "aria-labelledby"),
    "filters-heading"
  )
})

test_that("sidebar() accepts documented roles only", {
  expect_error(sidebar(role = "navigation"), "`role`")
  expect_error(sidebar(role = c("form", "search")), "`role`")
  expect_error(sidebar(role = 1), "`role`")
  expect_error(sidebar(role = ""), "`role`")
})

test_that("sidebar() requires accessible names for landmark roles", {
  for (role in c("form", "search", "complementary", "region")) {
    expect_error(
      as.tags(sidebar(role = role)),
      "requires an accessible name"
    )
    expect_silent(
      as.tags(sidebar(role = role, title = "Filters"))
    )
  }

  expect_silent(
    as.tags(sidebar(role = "form", `aria-label` = "Filters"))
  )
  expect_silent(
    as.tags(sidebar(role = "region", `aria-labelledby` = "filters-heading"))
  )
})

test_that("sidebar() prefers explicit aria labels over the title", {
  with_label <- renderTags(
    sidebar(role = "form", title = "Filters", `aria-label` = "My form")
  )$html
  expect_match(with_label, 'role="form" aria-label="My form"', fixed = TRUE)
  expect_no_match(with_label, "aria-labelledby")
  expect_match(with_label, '<header class="sidebar-title">', fixed = TRUE)

  with_labelledby <- as.tags(
    sidebar(role = "region", title = "Filters", `aria-labelledby` = "h")
  )[[1]]
  expect_identical(
    htmltools::tagGetAttribute(with_labelledby, "aria-labelledby"),
    "h"
  )
})

test_that("sidebar() labels landmarks with custom and HTML() titles", {
  custom <- renderTags(
    sidebar(
      role = "form",
      title = tags$header(id = "mytitle", "Filters", class = "sidebar-title")
    )
  )$html
  expect_match(custom, 'aria-labelledby="mytitle"', fixed = TRUE)
  expect_match(custom, '<header id="mytitle"', fixed = TRUE)

  raw <- renderTags(
    sidebar(role = "form", title = HTML("<b>Filters</b>"))
  )$html
  expect_match(raw, 'aria-labelledby="(bslib-sidebar-\\d+-title)"')
  label_id <- sub(".*aria-labelledby=\"([^\"]+)\".*", "\\1", raw)
  expect_match(
    raw,
    sprintf(
      '<div id="%s" style="display:contents"><b>Filters</b></div>',
      label_id
    ),
    fixed = TRUE
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
    htmltools::tagGetAttribute(
      get_sidebar_collapse_tag(open = "open"),
      "aria-expanded"
    ),
    "true"
  )

  expect_equal(
    htmltools::tagGetAttribute(
      get_sidebar_collapse_tag(open = "closed"),
      "aria-expanded"
    ),
    "false"
  )

  expect_equal(
    htmltools::tagGetAttribute(
      get_sidebar_collapse_tag(open = "desktop"),
      "aria-expanded"
    ),
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

test_that("sidebar() - adds data-resizable attribute by default", {
  sb_default <- as.tags(sidebar(open = "open"))
  expect_identical(
    htmltools::tagGetAttribute(sb_default[[1]], "data-resizable"),
    NA
  )

  sb_true <- as.tags(sidebar(open = "open", resizable = TRUE))
  expect_identical(
    htmltools::tagGetAttribute(sb_true[[1]], "data-resizable"),
    NA
  )

  sb_false <- as.tags(sidebar(open = "open", resizable = FALSE))
  expect_null(
    htmltools::tagGetAttribute(sb_false[[1]], "data-resizable")
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
