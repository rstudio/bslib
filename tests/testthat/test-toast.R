test_that("toast() creates bslib_toast object", {
  t <- toast("Test message")

  expect_s3_class(t, "bslib_toast")
  expect_equal(t$body, "Test message")
  expect_null(t$id)
  expect_true(t$autohide)
  expect_equal(t$duration, 5000)
  expect_equal(t$position, "top-right")
})

test_that("toast() validates position argument", {
  expect_no_error(toast("Test", position = "bottom-left"))
  expect_no_error(toast("Test", position = "top-center"))
  expect_no_error(toast("Test", position = "middle-center"))
  expect_error(toast("Test", position = "invalid"))
})

test_that("toast() validates type argument", {
  expect_no_error(toast("Test", type = "success"))
  expect_no_error(toast("Test", type = "danger"))
  expect_no_error(toast("Test", type = "info"))
  expect_error(toast("Test", type = "invalid"))
})

test_that("toast() enforces closable for non-autohiding toasts", {
  t <- toast("Test", autohide = FALSE, closable = FALSE)
  expect_true(t$closable)
})

test_that("toast() preserves closable = TRUE when autohide = FALSE", {
  t <- toast("Test", autohide = FALSE, closable = TRUE)
  expect_true(t$closable)
})

test_that("toast() allows closable = FALSE when autohide = TRUE", {
  t <- toast("Test", autohide = TRUE, closable = FALSE)
  expect_false(t$closable)
})

test_that("as.tags.bslib_toast creates proper HTML structure", {
  t <- toast(
    body = "Test message",
    header = "Test",
    type = "success",
    id = "test-toast"
  )

  tag <- as.tags(t)

  expect_s3_class(tag, "shiny.tag")
  html_str <- as.character(tag)
  expect_true(grepl("toast", html_str))
  expect_true(grepl("text-bg-success", html_str))
  expect_true(grepl('id="test-toast"', html_str))
})

test_that("as.tags.bslib_toast generates ID if not provided", {
  t <- toast("Test message")
  tag <- as.tags(t)

  html_str <- as.character(tag)
  expect_true(grepl('id="bslib-toast-', html_str))
})

test_that("as.tags.bslib_toast respects accessibility attributes", {
  # Danger type gets assertive
  t_danger <- toast("Error message", type = "danger")
  tag_danger <- as.tags(t_danger)
  html_danger <- as.character(tag_danger)
  expect_true(grepl('aria-live="assertive"', html_danger))
  expect_true(grepl('role="alert"', html_danger))

  # Info type gets polite
  t_info <- toast("Info message", type = "info")
  tag_info <- as.tags(t_info)
  html_info <- as.character(tag_info)
  expect_true(grepl('aria-live="polite"', html_info))
  expect_true(grepl('role="status"', html_info))

  # NULL type (default) gets polite
  t_default <- toast("Default message")
  tag_default <- as.tags(t_default)
  html_default <- as.character(tag_default)
  expect_true(grepl('aria-live="polite"', html_default))
  expect_true(grepl('role="status"', html_default))
})

test_that("as.tags.bslib_toast includes close button appropriately", {
  # With header, closable
  t_header <- toast("Message", header = "Title", closable = TRUE)
  tag_header <- as.tags(t_header)
  html_header <- as.character(tag_header)
  expect_true(grepl("btn-close", html_header))
  expect_true(grepl("toast-header", html_header))

  # Without header, closable
  t_no_header <- toast("Message", closable = TRUE)
  tag_no_header <- as.tags(t_no_header)
  html_no_header <- as.character(tag_no_header)
  expect_true(grepl("btn-close", html_no_header))
  expect_false(grepl("toast-header", html_no_header))

  # Non-closable with autohide
  t_non_closable <- toast("Message", closable = FALSE, autohide = TRUE)
  tag_non_closable <- as.tags(t_non_closable)
  html_non_closable <- as.character(tag_non_closable)
  expect_false(grepl("btn-close", html_non_closable))
})

test_that("toast_header() creates structured header", {
  # Simple header with just title
  h1 <- toast_header("My Title")
  expect_s3_class(h1, "shiny.tag.list")
  html1 <- as.character(h1)
  expect_true(grepl("My Title", html1))
  expect_true(grepl("me-auto", html1))

  # Header with status
  h2 <- toast_header("Success", status = "success")
  html2 <- as.character(h2)
  expect_true(grepl("badge", html2))
  expect_true(grepl("bg-success", html2))

  # Header validates status
  expect_error(toast_header("Test", status = "invalid"))
})

test_that("toast_header() works with icons", {
  # Mock icon (just a simple span for testing)
  icon <- htmltools::span(class = "test-icon")

  h <- toast_header("Title", icon = icon)
  html <- as.character(h)
  expect_true(grepl("test-icon", html))
  expect_true(grepl("Title", html))
})

test_that("toast() stores additional attributes", {
  t <- toast("Test", `data-test` = "value", class = "extra-class")

  expect_equal(t$attribs$`data-test`, "value")
  expect_equal(t$class, "extra-class")

  tag <- as.tags(t)
  html <- as.character(tag)
  expect_true(grepl('data-test="value"', html))
  expect_true(grepl("extra-class", html))
})

test_that("toast() with custom duration", {
  t <- toast("Test", duration = 10000)
  expect_equal(t$duration, 10000)
})

test_that("toast() with all type options", {
  types <- c("primary", "secondary", "success", "info", "warning", "danger", "light", "dark")

  for (type in types) {
    t <- toast("Test", type = type)
    expect_equal(t$type, type)

    tag <- as.tags(t)
    html <- as.character(tag)
    expect_true(grepl(paste0("text-bg-", type), html))
  }
})

test_that("toast() with all position options", {
  positions <- c(
    "top-left", "top-center", "top-right",
    "middle-left", "middle-center", "middle-right",
    "bottom-left", "bottom-center", "bottom-right"
  )

  for (pos in positions) {
    t <- toast("Test", position = pos)
    expect_equal(t$position, pos)
  }
})

test_that("toast with character header", {
  t <- toast("Body", header = "Simple Header")
  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("toast-header", html))
  expect_true(grepl("Simple Header", html))
  expect_true(grepl("me-auto", html))
})

test_that("toast with toast_header() result", {
  t <- toast(
    "Body",
    header = toast_header("Title", status = "success")
  )
  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("toast-header", html))
  expect_true(grepl("Title", html))
  expect_true(grepl("badge", html))
  expect_true(grepl("bg-success", html))
})
