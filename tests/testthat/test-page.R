library(htmltools)

# All page_*() functions are very thin wrappers around
# shiny::*Page() at the moment (except for page_navbar(), which
# which why we only have tests for page_navbar())

test_that("page_navbar()", {
  skip_if_not_installed("shiny")
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

  expect_snapshot(
    renderTags(
      page_sidebar(title = "foo")
    )$head,
    cran = TRUE
  )
})

test_that("page_sidebar()", {

  with_private_seed()

  expect_snapshot(
    renderTags(
      page_sidebar(
        title = "foo",
        window_title = "bar"
      )
    )$head,
    cran = TRUE
  )

  with_private_seed()

  expect_snapshot(
    renderTags(
      page_sidebar(
        "main",
        title = "Title",
        # Removes the {bsicons} icon
        sidebar = sidebar(open = "always")
      )
    )$html,
    cran = TRUE
  )

  with_private_seed()

  expect_snapshot(
    renderTags(
      page_sidebar(
        "main",
        title = "Title",
        sidebar = "side"
      )
    )$html,
    # Don't run on CRAN since the output depends on {bsicons}
    cran = FALSE
  )

})
