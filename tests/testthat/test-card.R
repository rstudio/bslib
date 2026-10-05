test_that("card_image()", {
  show_raw_html <- function(x) {
    cat(format(x))
  }

  expect_snapshot(
    show_raw_html(
      card(
        card_image("https://example.com/image.jpg"),
        card_body("image cap on top of card")
      )
    )
  )

  expect_snapshot(
    show_raw_html(
      card(
        card_body("image cap on bottom of card"),
        card_image("https://example.com/image.jpg")
      )
    )
  )

  expect_snapshot(
    show_raw_html(
      card(
        card_header("header"),
        card_image("https://example.com/image.jpg"),
        card_body("image not a cap")
      )
    )
  )

  expect_snapshot(
    show_raw_html(
      card(
        card_image("https://example.com/image.jpg", alt = "card-img")
      )
    )
  )
})

test_that("card_image() input validation", {
  expect_snapshot(
    error = TRUE,
    card_image("cat.jpg")
  )

  expect_snapshot(
    error = TRUE,
    card_image("foo", "bar")
  )

  expect_snapshot(
    error = TRUE,
    card_image("foo", border_radius = "guess")
  )
})

test_that("full-screen cards stack in the offcanvas tier, below modals", {
  skip_on_cran()
  local_disable_cache()

  theme <- bs_theme(5)
  dep <- component_dependency_sass_(theme)
  css <- paste(readLines(file.path(dep$src, dep$stylesheet)), collapse = "\n")

  count_matches <- function(x, pattern) {
    m <- gregexpr(pattern, x, fixed = TRUE)[[1]]
    if (m[1] == -1) 0L else length(m)
  }

  z <- bs_get_variables(
    theme,
    c("zindex-offcanvas", "zindex-offcanvas-backdrop", "zindex-modal")
  )

  # The full-screen card and its enter button share the card's z-index
  # variable, defaulting to Bootstrap's offcanvas tier
  card_z <- sprintf("z-index:var(--bslib-card-full-screen-z-index, %s)", z[["zindex-offcanvas"]])
  expect_identical(count_matches(css, card_z), 2L)

  # The full-screen backdrop sits one tier below the card, mirroring the
  # offcanvas/backdrop relationship
  backdrop_z <- sprintf(
    "z-index:var(--bslib-card-full-screen-backdrop-z-index, %s)",
    z[["zindex-offcanvas-backdrop"]]
  )
  expect_identical(count_matches(css, backdrop_z), 1L)

  # The card now stacks below modals, so modal dialogs (including those from
  # Shiny's showModal()) paint above an expanded card
  expect_true(as.numeric(z[["zindex-modal"]]) > as.numeric(z[["zindex-offcanvas"]]))

  # While a nested offcanvas (a DOM descendant of the card) is open, the
  # enter button must stay hidden so it doesn't paint through the panel's
  # backdrop (the button sits one tier above it)
  expect_true(
    grepl(
      ":has(bslib-offcanvas.show,bslib-offcanvas.showing,bslib-offcanvas.hiding) .bslib-full-screen-enter",
      css, fixed = TRUE
    )
  )
})
