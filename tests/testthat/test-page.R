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

describe("Navbar page landmarks", {
  skip_if_not_installed("shiny")

  cases <- expand.grid(
    page_type = c("page_navbar", "navbarPage"),
    fluid = c(TRUE, FALSE),
    fillable = c(TRUE, FALSE),
    stringsAsFactors = FALSE
  )

  for (i in seq_len(nrow(cases))) {
    case <- cases[i, ]
    case_name <- sprintf(
      "%s(fluid = %s, fillable = %s)",
      case$page_type,
      case$fluid,
      case$fillable
    )

    it(paste(case_name, "gives the content div a main landmark without a sidebar"), {
      page_fn <- switch(
        case$page_type,
        page_navbar = page_navbar,
        navbarPage = shiny::navbarPage
      )
      ui <- page_fn(
        title = "foo",
        nav_panel("One", "content"),
        theme = bs_theme(),
        fluid = case$fluid,
        fillable = case$fillable,
        navbar_options = navbar_options(class = "sticky-top")
      )
      query <- tagQuery(ui)
      container_class <- if (case$fluid) ".container-fluid" else ".container"

      expect_equal(query$find("header.navbar")$length(), 1)
      expect_equal(query$find("header.navbar.sticky-top")$length(), 1)
      navbar <- query$find("header.navbar")$selectedTags()[[1]]
      expect_null(tagGetAttribute(navbar, "role"))
      expect_equal(
        query$find(paste0("header.navbar > nav", container_class))$length(),
        1
      )

      main_roles <- vapply(
        query$find("div")$selectedTags(),
        function(tag) identical(tagGetAttribute(tag, "role"), "main"),
        logical(1)
      )
      expect_equal(sum(main_roles), 1)
      expect_equal(query$find("main")$length(), 0)
      content <- query$find(paste0("div", container_class))
      expect_equal(content$length(), 1)
      expect_equal(tagGetAttribute(content$selectedTags()[[1]], "role"), "main")
      expect_equal(content$hasClass("html-fill-container"), case$fillable)
      expect_equal(content$hasClass("html-fill-item"), case$fillable)
    })

    it(paste(case_name, "retains the existing main landmark with a sidebar"), {
      page_fn <- switch(
        case$page_type,
        page_navbar = page_navbar,
        navbarPage = shiny::navbarPage
      )
      ui <- page_fn(
        title = "foo",
        nav_panel("One", "content"),
        theme = bs_theme(),
        fluid = case$fluid,
        fillable = case$fillable,
        sidebar = sidebar("side", open = "always"),
        navbar_options = navbar_options(class = "sticky-top")
      )
      query <- tagQuery(ui)
      container_class <- if (case$fluid) ".container-fluid" else ".container"

      expect_equal(query$find("header.navbar")$length(), 1)
      expect_equal(query$find("header.navbar.sticky-top")$length(), 1)
      navbar <- query$find("header.navbar")$selectedTags()[[1]]
      expect_null(tagGetAttribute(navbar, "role"))
      expect_equal(
        query$find(paste0("header.navbar > nav", container_class))$length(),
        1
      )

      main_roles <- vapply(
        query$find("div")$selectedTags(),
        function(tag) identical(tagGetAttribute(tag, "role"), "main"),
        logical(1)
      )
      expect_equal(sum(main_roles), 0)
      expect_equal(query$find("main.bslib-page-main")$length(), 1)
    })
  }
})

test_that("page_navbar() keeps the navbar and content as adjacent siblings", {
  skip_if_not_installed("shiny")

  for (has_sidebar in c(TRUE, FALSE)) {
    html <- renderTags(page_navbar(
      title = "foo",
      sidebar = if (has_sidebar) sidebar("side", open = "always"),
      nav_panel("One", "content")
    ))$html

    # tagQuery() doesn't support adjacent-sibling selectors.
    expect_match(html, "</header>\\s*<div\\b", perl = TRUE)
  }
})

test_that("shiny::navbarPage() has landmarks with its non-fillable default", {
  skip_if_not_installed("shiny")

  themes <- list(NULL, bs_theme(3), bs_theme(4), bs_theme(5))
  for (theme in themes) {
    query <- tagQuery(shiny::navbarPage(
      title = "foo",
      nav_panel("One", "content"),
      theme = theme
    ))

    expect_equal(query$find("header.navbar > nav.container-fluid")$length(), 1)
    content <- query$find("div.container-fluid")
    expect_equal(content$length(), 1)
    expect_equal(tagGetAttribute(content$selectedTags()[[1]], "role"), "main")
    expect_false(content$hasClass("html-fill-container"))
  }
})

test_that("navset_bar() does not introduce page-level landmarks", {
  skip_if_not_installed("shiny")

  query <- tagQuery(div(navset_bar(
    title = "foo",
    nav_panel("One", "content")
  )))

  expect_equal(query$find("nav.navbar > div.container-fluid")$length(), 1)
  navbar <- query$find("nav.navbar")$selectedTags()[[1]]
  expect_equal(tagGetAttribute(navbar, "role"), "navigation")
  expect_equal(query$find("header")$length(), 0)
  expect_equal(query$find("main")$length(), 0)
  main_roles <- vapply(
    query$find("div")$selectedTags(),
    function(tag) identical(tagGetAttribute(tag, "role"), "main"),
    logical(1)
  )
  expect_false(any(main_roles))
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
  withr::with_tempdir({
    withr::local_options(list(htmltools.dir.version = FALSE))
    save_html(
      card("A simple card"),
      "card.html"
    )
    expect_snapshot_file("card.html")
  })

  withr::with_tempdir({
    withr::local_options(list(htmltools.dir.version = FALSE))
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
    page("foo", )
  )
  expect_no_error(
    page_fluid("foo", )
  )
  expect_no_error(
    page_fixed("foo", )
  )
  expect_no_error(
    page_fillable("foo", )
  )
  expect_no_error(
    page_sidebar("foo", )
  )
  expect_no_error(
    page_navbar(nav_panel("foo", "bar"), )
  )
})
