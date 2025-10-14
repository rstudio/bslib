
test_that("input_submit_textarea() markup snapshots", {
  expect_snapshot(input_submit_textarea("test"))

  expect_snapshot(
    input_submit_textarea(
      "test",
      label = "Enter text",
      placeholder = "Type here...",
      value = "Initial value",
      width = 300,
      rows = 3,
      button = tags$button(
        id = "custom_submit",
        class = "btn btn-primary",
        "Send"
      ),
      toolbar = tagList(
        tags$span("Press"),
        tags$kbd("Enter"),
        tags$span("to submit")
      ),
      submit_key = "enter",
      spellcheck = "false",
      autocomplete = "off",
    )
  )
})

test_that("input_submit_textarea() validation errors", {
  expect_snapshot(
    error = TRUE,
    input_submit_textarea("test", "With Children", div())
  )

  expect_snapshot(
    error = TRUE,
    input_submit_textarea("test", value = 123)
  )

  expect_snapshot(
    error = TRUE,
    input_submit_textarea("test", value = c("a", "b"))
  )

  expect_snapshot(
    error = TRUE,
    input_submit_textarea("test", button = tags$div("Not a button"))
  )

  expect_snapshot(
    error = TRUE,
    input_submit_textarea("test", submit_key = "invalid")
  )
})
