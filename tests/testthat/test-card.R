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
