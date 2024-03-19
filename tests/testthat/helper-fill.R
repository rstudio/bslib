tag_simple <- function(...) {
  htmltools::div(class = "test", id = "test", ...)
}

tag_nested <- function(...) {
  htmltools::withTags(
    div(
      div(class = "inner"),
      div(
        class = "nested",
        div(class = "inner deep")
      ),
      div(class = "inner"),
      ...
    )
  )
}

expect_equal_html <- function(actual, expected, ...) {
  expect_equal(
    format(actual),
    format(expected),
    ...
  )
}
