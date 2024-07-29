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
        sidebar = sidebar(open = "always"),
        "data-attr" = "here"
      )
    )$html,
    cran = TRUE
  )

  with_private_seed()

  skip_if_not_installed("bsicons", "0.1.0.9000")

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

test_that("save_html() works on components and pages with a custom theme", {
  withr::local_options(list(htmltools.dir.version = FALSE))

  withr::with_tempdir({
    save_html(
      card("A simple card"),
      "card.html"
    )
    expect_snapshot_file("card.html")
  })

  withr::with_tempdir({
    save_html(
      page(
        theme = bs_remove(bs_theme(), "bs3compat"),
        "A simple page without bs3compat dependencies"
      ),
      "modern-page.html"
    )
    expect_snapshot_file("modern-page.html")
  })
})


test_that("page_*() functions can handle trailing commas", {
  expect_no_error(
    page("foo",)
  )
  expect_no_error(
    page_fluid("foo",)
  )
  expect_no_error(
    page_fixed("foo",)
  )
  expect_no_error(
    page_fillable("foo",)
  )
  expect_no_error(
    page_sidebar("foo",)
  )
  expect_no_error(
    page_navbar(nav_panel("foo", "bar"),)
  )
})
