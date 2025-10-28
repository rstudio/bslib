# toast() constructor tests ----

test_that("toast() creates bslib_toast object with defaults", {
  t <- toast("Test message")

  expect_s3_class(t, "bslib_toast")
  expect_null(t$id)
  expect_true(t$autohide)
  expect_equal(t$duration, 5000) # Default 5 seconds in milliseconds
  expect_true(t$closable)
  expect_null(t$header)
  expect_equal(t$position, "top-right")
})

test_that("toast() validates position argument", {
  expect_no_error(toast("Test", position = "bottom-left"))
  expect_no_error(toast("Test", position = "top-center"))
  expect_no_error(toast("Test", position = "middle-center"))
  expect_snapshot(error = TRUE, toast("Test", position = "invalid"))
})

test_that("toast() validates type argument", {
  expect_no_error(toast("Test", type = "success"))
  expect_no_error(toast("Test", type = "danger"))
  expect_no_error(toast("Test", type = "info"))
  expect_snapshot(error = TRUE, toast("Test", type = "invalid"))
})

test_that("toast() type 'error' is aliased to 'danger'", {
  t <- toast("Test", type = "error")
  expect_equal(t$type, "danger")
})

test_that("toast() autohide disabled (0, NA, NULL)", {
  # When autohide is disabled, closable is forced to TRUE for accessibility
  t1 <- toast("Test", autohide_s = 0, closable = FALSE)
  expect_false(t1$autohide)
  expect_true(t1$closable) # Always true when autohide disabled

  t2 <- toast("Test", autohide_s = NA, closable = FALSE)
  expect_false(t2$autohide)
  expect_true(t2$closable)

  t3 <- toast("Test", autohide_s = NULL, closable = FALSE)
  expect_false(t3$autohide)
  expect_true(t3$closable)
})

test_that("toast() `closable` when autohide enabled", {
  # When autohide is enabled, user can control closable
  t_closable <- toast("Test", autohide_s = 10, closable = TRUE)
  expect_true(t_closable$autohide)
  expect_equal(t_closable$duration, 10000) # Converted to milliseconds
  expect_true(t_closable$closable)

  t_not_closable <- toast("Test", autohide_s = 5, closable = FALSE)
  expect_true(t_not_closable$autohide)
  expect_equal(t_not_closable$duration, 5000)
  expect_false(t_not_closable$closable)
})

test_that("toast() autohide_s throws for invalid values", {
  expect_snapshot(error = TRUE, {
    toast("Test", autohide_s = -5)
    toast("Test", autohide_s = "invalid")
    toast("Test", autohide_s = c(5, 10))
  })
})


# toast() rendering tests ----

test_that("as.tags.bslib_toast creates proper HTML structure", {
  t <- toast(
    body = "Test message",
    header = "Test",
    type = "success",
    id = "test-toast"
  )

  tag <- as.tags(t)
  expect_s3_class(tag, "shiny.tag")
  expect_snapshot(cat(format(tag)))
})

test_that("as.tags.bslib_toast generates ID if not provided", {
  t <- toast("Test message")
  tag <- as.tags(t)

  html_str <- as.character(tag)
  # Verify an auto-generated ID is present
  expect_match(html_str, 'id="bslib-toast-[0-9]+"')
})

test_that("as.tags.bslib_toast respects accessibility attributes", {
  # Danger type gets assertive role
  t_danger <- toast("Error message", type = "danger", id = "danger-toast")
  html_danger <- as.character(as.tags(t_danger))
  expect_match(html_danger, 'role="alert"')
  expect_match(html_danger, 'aria-live="assertive"')
  expect_snapshot(cat(format(as.tags(t_danger))))

  # Info type gets polite role
  t_info <- toast("Info message", type = "info", id = "info-toast")
  html_info <- as.character(as.tags(t_info))
  expect_match(html_info, 'role="status"')
  expect_match(html_info, 'aria-live="polite"')
  expect_snapshot(cat(format(as.tags(t_info))))

  # NULL type (default) gets polite role
  t_default <- toast("Default message", id = "default-toast")
  html_default <- as.character(as.tags(t_default))
  expect_match(html_default, 'role="status"')
  expect_match(html_default, 'aria-live="polite"')
  expect_snapshot(cat(format(as.tags(t_default))))
})

test_that("as.tags.bslib_toast includes close button appropriately", {
  # With header, closable
  t_header <- toast(
    "Message",
    header = "Title",
    closable = TRUE,
    id = "header-toast"
  )
  expect_snapshot(cat(format(as.tags(t_header))))

  # Without header, closable
  t_no_header <- toast("Message", closable = TRUE, id = "no-header-toast")
  expect_snapshot(cat(format(as.tags(t_no_header))))

  # Non-closable with autohide
  t_non_closable <- toast(
    "Message",
    closable = FALSE,
    autohide_s = 5,
    id = "non-closable-toast"
  )
  expect_snapshot(cat(format(as.tags(t_non_closable))))
})

# toast_header() tests ----

test_that("toast_header() creates structured header data", {
  # Simple header with just title
  h1 <- toast_header("My Title")
  expect_s3_class(h1, "bslib_toast_header")
  expect_equal(as.character(h1$title), "My Title")
  expect_null(h1$icon)
  expect_null(h1$status)

  # Header with status text
  h2 <- toast_header("Success", status = "11 mins ago")
  expect_s3_class(h2, "bslib_toast_header")
  expect_equal(as.character(h2$title), "Success")
  expect_equal(h2$status, "11 mins ago")
})

test_that("toast_header() works with icons", {
  icon <- span(class = "test-icon")

  h <- toast_header("Title", icon = icon)
  expect_s3_class(h, "bslib_toast_header")
  expect_equal(as.character(h$title), "Title")
  expect_s3_class(h$icon, "shiny.tag")
  expect_equal(h$icon$attribs$class, "test-icon")
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


test_that("toast() type is reflected in rendered HTML", {
  t_success <- toast("Test", type = "success")
  expect_equal(t_success$type, "success")

  tag_success <- as.tags(t_success)
  html_success <- as.character(tag_success)
  expect_true(grepl("text-bg-success", html_success))

  t_danger <- toast("Test", type = "danger")
  expect_equal(t_danger$type, "danger")

  tag_danger <- as.tags(t_danger)
  html_danger <- as.character(tag_danger)
  expect_true(grepl("text-bg-danger", html_danger))
})

test_that("toast() position is stored correctly", {
  t1 <- toast("Test", position = "top-left")
  expect_equal(t1$position, "top-left")

  t2 <- toast("Test", position = "middle-center")
  expect_equal(t2$position, "middle-center")

  t3 <- toast("Test", position = "bottom-right")
  expect_equal(t3$position, "bottom-right")
})

# toast() header integration tests ----

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

test_that("toast with list(title = ...) pattern", {
  # Bare list with title should work like toast_header()
  t <- toast(
    "Body",
    header = list(title = "Title", status = "just now")
  )
  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("toast-header", html))
  expect_true(grepl("Title", html))
  expect_true(grepl("just now", html))
  expect_true(grepl("text-muted", html))
})

test_that("toast header can be modified after creation", {
  # Create toast with toast_header()
  t <- toast(
    "Body",
    header = toast_header("Original Title", status = "1 min ago")
  )

  # Modify the header
  t$header$title <- "Updated Title"
  t$header$status <- "just now"

  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("Updated Title", html))
  expect_true(grepl("just now", html))
  expect_false(grepl("Original Title", html))
  expect_false(grepl("1 min ago", html))
})

test_that("toast header can be replaced with list pattern", {
  # Create toast with simple character header
  t <- toast("Body", header = "Simple")

  # Replace with list pattern
  t$header <- list(
    title = "New Title",
    status = "now",
    icon = span(class = "icon")
  )

  tag <- as.tags(t)
  html <- as.character(tag)

  expect_true(grepl("New Title", html))
  expect_true(grepl("now", html))
  expect_true(grepl("icon", html))
  expect_false(grepl("Simple", html))
})

# normalize_toast_position() helper tests ----

test_that("normalize_toast_position() handles standard kebab-case format", {
  expect_equal(normalize_toast_position("top-left"), "top-left")
  expect_equal(normalize_toast_position("bottom-right"), "bottom-right")
  expect_equal(
    normalize_toast_position("middle-center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles space-separated format", {
  expect_equal(normalize_toast_position("top left"), "top-left")
  expect_equal(normalize_toast_position("bottom right"), "bottom-right")
  expect_equal(
    normalize_toast_position("middle center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles reversed order", {
  expect_equal(normalize_toast_position("left top"), "top-left")
  expect_equal(normalize_toast_position("right bottom"), "bottom-right")
  expect_equal(
    normalize_toast_position("center middle"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles vector input", {
  expect_equal(normalize_toast_position(c("top", "left")), "top-left")
  expect_equal(
    normalize_toast_position(c("bottom", "right")),
    "bottom-right"
  )
  expect_equal(normalize_toast_position(c("left", "top")), "top-left")
  expect_equal(
    normalize_toast_position(c("right", "bottom")),
    "bottom-right"
  )
})

test_that("normalize_toast_position() is case-insensitive", {
  expect_equal(normalize_toast_position("TOP LEFT"), "top-left")
  expect_equal(normalize_toast_position("Bottom Right"), "bottom-right")
  expect_equal(
    normalize_toast_position("MIDDLE center"),
    "middle-center"
  )
})

test_that("normalize_toast_position() handles default NULL or empty", {
  expect_equal(normalize_toast_position(NULL), "bottom-right")
  expect_equal(normalize_toast_position(character(0)), "bottom-right")
})

test_that("normalize_toast_position() defaults to bottom-right when unspecified", {
  expect_equal(normalize_toast_position(), "bottom-right")
})

test_that("normalize_toast_position() handles all valid combinations", {
  # Space-separated
  expect_equal(normalize_toast_position("top left"), "top-left")
  expect_equal(normalize_toast_position("middle center"), "middle-center")
  expect_equal(normalize_toast_position("bottom right"), "bottom-right")

  # Reversed order
  expect_equal(normalize_toast_position("left top"), "top-left")
  expect_equal(normalize_toast_position("center middle"), "middle-center")
  expect_equal(normalize_toast_position("right bottom"), "bottom-right")

  # Vector input
  expect_equal(normalize_toast_position(c("top", "left")), "top-left")
  expect_equal(normalize_toast_position(c("center", "middle")), "middle-center")
  expect_equal(normalize_toast_position(c("bottom", "right")), "bottom-right")
})

test_that("normalize_toast_position() errors on invalid input", {
  expect_snapshot(error = TRUE, {
    # Missing components
    normalize_toast_position("top")
    normalize_toast_position("left")

    # Duplicate components
    normalize_toast_position("top bottom left")
    normalize_toast_position(c("top", "bottom", "left"))

    # Invalid components
    normalize_toast_position("top invalid")
    normalize_toast_position("foo bar")
  })
})

test_that("normalize_toast_position() handles extra whitespace", {
  expect_equal(normalize_toast_position("  top   left  "), "top-left")
  expect_equal(
    normalize_toast_position("bottom  right"),
    "bottom-right"
  )
})

# show_toast() and hide_toast() tests ----

test_that("toast() works with flexible position formats", {
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

test_that("show_toast() converts string to toast automatically", {
  local_mocked_bindings(
    toast_random_id = function() "bslib-toast-auto"
  )

  message_sent <- FALSE
  session <- list(sendCustomMessage = function(type, message) {
    expect_equal(type, "bslib.show-toast")
    expect_equal(message$id, "bslib-toast-auto")
    message_sent <<- TRUE
  })

  # Pass a plain string instead of a toast object
  toast_id <- show_toast("Simple message", session = session)
  expect_true(message_sent)
  expect_equal(toast_id, "bslib-toast-auto")
})

test_that("show_toast() and hide_toast() warn if nothing to show/hide", {
  session <- list(sendCustomMessage = function(type, message) {
    stop("sendCustomMessage should not be called")
  })

  expect_snapshot({
    hide_toast(show_toast(toast(), session = session), session = session)
  })
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
