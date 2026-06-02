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

test_that("card() only registers as Shiny input when full_screen=TRUE", {
  card_no_fs <- card(id = "my_card", "content")
  card_with_fs <- card(id = "my_card", full_screen = TRUE, "content")
  card_fs_no_id <- card(full_screen = TRUE, "content")

  classes_no_fs <- htmltools::tagGetAttribute(card_no_fs, "class")
  classes_with_fs <- htmltools::tagGetAttribute(card_with_fs, "class")
  classes_fs_no_id <- htmltools::tagGetAttribute(card_fs_no_id, "class")

  expect_no_match(classes_no_fs, "bslib-card-input")
  expect_match(classes_with_fs, "bslib-card-input")
  expect_no_match(classes_fs_no_id, "bslib-card-input")
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
