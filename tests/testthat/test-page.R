library(htmltools)

# All page_*() functions are very thin wrappers around
# shiny::*Page() at the moment (except for page_navbar(), which
# which why we only have tests for page_navbar())

test_that("page_navbar()", {

  expect_snapshot(
    renderTags(
      page_navbar(
        title = div(h1("foo"), h2("bar"))
      )
    )$head,
    cran = TRUE
  )

  expect_snapshot(
    renderTags(
      page_navbar(
        title = "foo",
        window_title = "bar"
      )
    )$head,
    cran = TRUE
  )

})
