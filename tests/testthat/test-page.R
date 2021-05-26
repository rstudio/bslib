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

  expect_snapshot2 <- function(...) {
    if (getRversion() < "3.6.0") {
      skip("Skipping snapshots on R < 3.6 because of different RNG method")
    }
    expect_snapshot(...)
  }

  page_navbar2 <- function(...) {
    shiny:::withPrivateSeed(set.seed(100))
    page_navbar(...)
  }

  expect_snapshot2(
    renderTags(
      page_navbar2(
        bg = "red",
        nav("a", "A")
      )
    )$html,
    cran = TRUE
  )

})
