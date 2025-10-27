test_that("toast() creates bslib_toast object", {
  t <- toast("Test message")

  expect_s3_class(t, "bslib_toast")
  expect_equal(t$body, list("Test message"))
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

test_that("toast() autohide_s = 0 disables autohiding", {
  t <- toast("Test", autohide_s = 0, closable = FALSE)
  expect_false(t$autohide)
  expect_true(t$closable) # Always true when autohide disabled
})

test_that("toast() autohide_s = NA disables autohiding", {
  t <- toast("Test", autohide_s = NA, closable = FALSE)
  expect_false(t$autohide)
  expect_true(t$closable) # Always true when autohide disabled
})

test_that("toast() autohide_s = NULL disables autohiding", {
  t <- toast("Test", autohide_s = NULL, closable = FALSE)
  expect_false(t$autohide)
  expect_true(t$closable) # Always true when autohide disabled
})

test_that("toast() autohide_s > 0 enables autohiding", {
  t <- toast("Test", autohide_s = 10)
  expect_true(t$autohide)
  expect_equal(t$duration, 10000) # Converted to milliseconds
})

test_that("toast() autohide_s throws for invalid values", {
  expect_snapshot(error = TRUE, {
    toast("Test", autohide_s = -5)
    toast("Test", autohide_s = "invalid")
    toast("Test", autohide_s = c(5, 10))
  })
})

test_that("toast() allows closable = FALSE when autohiding", {
  t <- toast("Test", autohide_s = 5, closable = FALSE)
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

  # Header with status text
  h2 <- toast_header("Success", status = "11 mins ago")
  html2 <- as.character(h2)
  expect_true(grepl("11 mins ago", html2))
  expect_true(grepl("text-muted", html2))
  expect_true(grepl("<small", html2))
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
  expect_equal(t$attribs$class, "extra-class")

  tag <- as.tags(t)
  html <- as.character(tag)
  expect_true(grepl('data-test="value"', html))
  expect_true(grepl('class="toast[^"]+extra-class"', html))
})

test_that("toast() with custom autohide_s converts to milliseconds", {
  t <- toast("Test", autohide_s = 10)
  expect_equal(t$duration, 10000)
  expect_true(t$autohide)
})

test_that("toast() with all type options", {
  types <- c(
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark"
  )

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
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right"
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
    header = toast_header("Title", status = "just now")
  )
  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("toast-header", html))
  expect_true(grepl("Title", html))
  expect_true(grepl("just now", html))
  expect_true(grepl("text-muted", html))
})

# Tests for normalize_toast_position() helper
test_that("normalize_toast_position() handles standard kebab-case format", {
  expect_equal(bslib:::normalize_toast_position("top-left"), "top-left")
  expect_equal(bslib:::normalize_toast_position("bottom-right"), "bottom-right")
  expect_equal(
    bslib:::normalize_toast_position("middle-center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles space-separated format", {
  expect_equal(bslib:::normalize_toast_position("top left"), "top-left")
  expect_equal(bslib:::normalize_toast_position("bottom right"), "bottom-right")
  expect_equal(
    bslib:::normalize_toast_position("middle center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles reversed order", {
  expect_equal(bslib:::normalize_toast_position("left top"), "top-left")
  expect_equal(bslib:::normalize_toast_position("right bottom"), "bottom-right")
  expect_equal(
    bslib:::normalize_toast_position("center middle"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles vector input", {
  expect_equal(bslib:::normalize_toast_position(c("top", "left")), "top-left")
  expect_equal(
    bslib:::normalize_toast_position(c("bottom", "right")),
    "bottom-right"
  )
  expect_equal(bslib:::normalize_toast_position(c("left", "top")), "top-left")
  expect_equal(
    bslib:::normalize_toast_position(c("right", "bottom")),
    "bottom-right"
  )
})

test_that("normalize_toast_position() is case-insensitive", {
  expect_equal(bslib:::normalize_toast_position("TOP LEFT"), "top-left")
  expect_equal(bslib:::normalize_toast_position("Bottom Right"), "bottom-right")
  expect_equal(
    bslib:::normalize_toast_position("MIDDLE center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles default NULL or empty", {
  expect_equal(bslib:::normalize_toast_position(NULL), "bottom-right")
  expect_equal(bslib:::normalize_toast_position(character(0)), "bottom-right")
})

test_that("normalize_toast_position() defaults to bottom-right when unspecified", {
  expect_equal(bslib:::normalize_toast_position(), "bottom-right")
})

test_that("normalize_toast_position() handles all valid combinations", {
  vertical <- c("top", "middle", "bottom")
  horizontal <- c("left", "center", "right")

  for (v in vertical) {
    for (h in horizontal) {
      expected <- paste0(v, "-", h)
      # Space-separated
      expect_equal(
        bslib:::normalize_toast_position(paste(v, h)),
        expected,
        label = paste("space-separated:", v, h)
      )
      # Reversed order
      expect_equal(
        bslib:::normalize_toast_position(paste(h, v)),
        expected,
        label = paste("reversed:", h, v)
      )
      # Vector
      expect_equal(
        bslib:::normalize_toast_position(c(v, h)),
        expected,
        label = paste("vector:", v, h)
      )
    }
  }
})

test_that("normalize_toast_position() errors on missing components", {
  expect_error(
    bslib:::normalize_toast_position("top"),
    "Must specify one vertical position.*and.*one horizontal position"
  )
  expect_error(
    bslib:::normalize_toast_position("left"),
    "Must specify one vertical position.*and.*one horizontal position"
  )
  expect_error(
    bslib:::normalize_toast_position("center"),
    "Must specify one vertical position.*and.*one horizontal position"
  )
})

test_that("normalize_toast_position() errors on duplicate components", {
  expect_error(
    bslib:::normalize_toast_position("top bottom left"),
    "Invalid toast position"
  )
  expect_error(
    bslib:::normalize_toast_position("top left right"),
    "Invalid toast position"
  )
  expect_error(
    bslib:::normalize_toast_position(c("top", "bottom", "left")),
    "Invalid toast position"
  )
})

test_that("normalize_toast_position() errors on invalid components", {
  expect_error(
    bslib:::normalize_toast_position("top invalid"),
    "Invalid toast position.+?'top invalid'"
  )
  expect_error(
    bslib:::normalize_toast_position("foo bar"),
    "Invalid toast position.+?'foo bar'"
  )
  expect_error(
    bslib:::normalize_toast_position("top-left-extra"),
    "Invalid toast position.+?'top-left-extra'"
  )
})

test_that("normalize_toast_position() handles extra whitespace", {
  expect_equal(bslib:::normalize_toast_position("  top   left  "), "top-left")
  expect_equal(
    bslib:::normalize_toast_position("bottom  right"),
    "bottom-right"
  )
})

test_that("toast() works with new position formats", {
  # Space-separated
  t1 <- toast("Test", position = "top left")
  expect_equal(t1$position, "top-left")

  # Reversed order
  t2 <- toast("Test", position = "right bottom")
  expect_equal(t2$position, "bottom-right")

  # Vector
  t3 <- toast("Test", position = c("middle", "center"))
  expect_equal(t3$position, "middle-center")
})

test_that("show_toast() returns the toast id", {
  local_mocked_bindings(
    toast_random_id = function() "bslib-toast-1234"
  )

  session <- list(sendCustomMessage = function(type, message) {
    expect_equal(type, "bslib.show-toast")
    expect_equal(message$id, !!exp_toast_id)
  })

  t <- toast("Test message")
  exp_toast_id <- "bslib-toast-1234"
  toast_id <- show_toast(t, session = session)
  expect_equal(toast_id, exp_toast_id)

  exp_toast_id <- "custom-id"
  t2 <- toast("Another message", id = exp_toast_id)
  toast_id2 <- show_toast(t2, session = session)
  expect_equal(toast_id2, exp_toast_id)
})

test_that("hide_toast() works", {
  session <- list(sendCustomMessage = function(type, message) {
    expect_equal(type, "bslib.hide-toast")
    expect_equal(message$id, !!exp_toast_id)
  })

  exp_toast_id <- "bslib-toast-1234"
  t_id <- hide_toast(exp_toast_id, session = session)
  expect_equal(t_id, exp_toast_id)

  exp_toast_id <- "custom-id"
  t_id2 <- hide_toast(toast("Test", id = exp_toast_id), session = session)
  expect_equal(t_id2, exp_toast_id)

  expect_snapshot(error = TRUE, {
    hide_toast(toast())
  })
})
