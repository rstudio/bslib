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
