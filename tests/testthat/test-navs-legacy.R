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
      navbar_options = navbar_options(theme = "light")
    )
  )

  expect_warning(
    navset_bar(
      collapsible = FALSE,
      navbar_options = navbar_options(collapsible = TRUE)
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

show_navbar_markup <- function(navbar) {
  nb <- navbar[[1]]
  nb$children <- NULL
  cat(format(nb))
}

test_that("navbar markup snapshots", {
  expect_snapshot(
    show_navbar_markup(navs_bar_(theme = bs_theme(version = 3)))
  )

  expect_snapshot(
    show_navbar_markup(navs_bar_(theme = bs_theme(version = 4)))
  )

  expect_snapshot(
    show_navbar_markup(navs_bar_(theme = bs_theme(version = 5)))
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 4),
        navbar_options = navbar_options(theme = "dark")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 4),
        navbar_options = navbar_options(theme = "light")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 4),
        navbar_options = navbar_options(bg = "#000")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 5),
        navbar_options = navbar_options(theme = "dark")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 5),
        navbar_options = navbar_options(theme = "light")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 5),
        navbar_options = navbar_options(bg = "#000")
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 5),
        navbar_options = navbar_options(
          theme = "light",
          `data-bs-theme` = "dark"
        )
      )
    )
  )

  expect_snapshot(
    show_navbar_markup(
      navs_bar_(
        theme = bs_theme(version = 5),
        navbar_options = navbar_options(class = "bg-primary", theme = "dark")
      )
    )
  )
})


# tabset ids -------------------------------------------------------------------

tabset_ids_of <- function(x) {
  html <- as.character(htmltools::renderTags(x)$html)
  matches <- regmatches(html, gregexpr('data-tabsetid="[^"]*"', html))[[1]]
  sub('^data-tabsetid="(.*)"$', "\\1", matches)
}

test_that("tabset_id() uses a selector-safe id", {
  expect_equal(tabset_id("tabs"), "tabs")
  expect_equal(tabset_id("my_tabs"), "my_tabs")
  # `-` is what shiny::NS() uses to join module namespaces
  expect_equal(tabset_id("mod-tabs"), "mod-tabs")

  # No id to key off, so nothing to report -- just a random id
  expect_silent(res <- tabset_id(NULL))
  expect_match(res, "^[0-9]+$")
})

test_that("tabset_id() warns and falls back for an unsafe id", {
  # Shiny doesn't restrict input id characters, so ids that would break the
  # `#tab-<id>-<index>` selector fall back to the random integer
  expect_unsafe_id <- function(id) {
    expect_warning(res <- tabset_id(id), class = "bslib_tabset_id_unsafe")
    expect_match(res, "^[0-9]+$")
  }

  expect_unsafe_id("my.tabs")
  expect_unsafe_id("my tabs")
  expect_unsafe_id("tabs[1]")
  expect_unsafe_id("tabs:x")
  expect_unsafe_id(NA_character_)
  expect_unsafe_id(character(0))
})

test_that("the unsafe id warning names the id and is classed", {
  cnd <- rlang::catch_cnd(tabset_id("my.tabs"), classes = "warning")

  expect_s3_class(cnd, "bslib_tabset_id_unsafe")
  expect_match(rlang::cnd_message(cnd), "my.tabs", fixed = TRUE)
})

test_that("a tabset with an id uses it as the tabset id", {
  x <- navset_tab(nav_panel("a", "a"), nav_panel("b", "b"), id = "my_tabs")
  html <- as.character(htmltools::renderTags(x)$html)

  # Both the <ul> and the <div class="tab-content"> share the id
  expect_equal(tabset_ids_of(x), c("my_tabs", "my_tabs"))
  expect_true(grepl('id="tab-my_tabs-1"', html, fixed = TRUE))
  expect_true(grepl('href="#tab-my_tabs-1"', html, fixed = TRUE))
})

test_that("a tabset with an id renders identically every time", {
  render_once <- function() {
    as.character(
      htmltools::renderTags(
        navset_tab(nav_panel("a", "a"), nav_panel("b", "b"), id = "my_tabs")
      )$html
    )
  }

  expect_identical(render_once(), render_once())
})

test_that("a tabset without an id still gets a random tabset id", {
  first <- tabset_ids_of(navset_tab(nav_panel("a", "a")))
  second <- tabset_ids_of(navset_tab(nav_panel("a", "a")))

  expect_length(first, 2)
  expect_equal(first[[1]], first[[2]])
  expect_match(first[[1]], "^[0-9]+$")
  # ...but separate renders do not agree, since there is no id to key off
  expect_false(identical(first[[1]], second[[1]]))
})

test_that("a nav_menu() keeps its own random tabset id", {
  ids <- tabset_ids_of(
    navset_tab(
      nav_panel("a", "a"),
      nav_menu("Menu", nav_panel("c", "c")),
      id = "my_tabs"
    )
  )

  # <ul>, the dropdown <ul>, and the tab content <div>
  expect_equal(ids[[1]], "my_tabs")
  expect_match(ids[[2]], "^[0-9]+$")
  expect_equal(ids[[3]], "my_tabs")
})

test_that("a tabset with an unsafe id falls back to a random tabset id", {
  expect_warning(
    ids <- tabset_ids_of(navset_tab(nav_panel("a", "a"), id = "my.tabs")),
    class = "bslib_tabset_id_unsafe"
  )
  expect_match(ids[[1]], "^[0-9]+$")

  # The `id` attribute itself is still whatever the user asked for
  expect_warning(
    html <- as.character(
      htmltools::renderTags(navset_tab(nav_panel("a", "a"), id = "my.tabs"))$html
    ),
    class = "bslib_tabset_id_unsafe"
  )
  expect_true(grepl('id="my.tabs"', html, fixed = TRUE))
})
