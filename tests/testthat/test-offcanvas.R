# offcanvas() constructor ----

test_that("offcanvas() returns a bslib_offcanvas object with defaults", {
  oc <- offcanvas("body content", placement = "right")

  expect_s3_class(oc, "bslib_offcanvas")
  expect_equal(oc$body, list("body content"))
  expect_null(oc$id)
  expect_null(oc$trigger)
  expect_equal(oc$placement, "right")
  expect_true(oc$backdrop)
  expect_false(oc$scroll)
  expect_true(oc$keyboard)
  expect_true(oc$close_button)
  expect_null(oc$title)
  expect_null(oc$footer)
})

test_that("offcanvas() stores named ... as attribs", {
  oc <- offcanvas(
    "content",
    placement = "right",
    `data-foo` = "bar",
    class = "my-class"
  )

  expect_equal(oc$attribs$`data-foo`, "bar")
  expect_equal(oc$attribs$class, "my-class")
})


# offcanvas(placement=) ----

test_that("offcanvas() placement maps aliases and passes through canonical values", {
  expect_equal(offcanvas(placement = "start")$placement, "left")
  expect_equal(offcanvas(placement = "end")$placement, "right")
  expect_equal(offcanvas(placement = "left")$placement, "left")
  expect_equal(offcanvas(placement = "right")$placement, "right")
  expect_equal(offcanvas(placement = "top")$placement, "top")
  expect_equal(offcanvas(placement = "bottom")$placement, "bottom")
})

test_that("offcanvas() errors on invalid placement value", {
  expect_error(offcanvas(placement = "center"))
})


# Size warnings ----

test_that("offcanvas() warns and drops width when placement is top or bottom", {
  expect_warning(
    offcanvas("x", placement = "top", width = 300, id = "a"),
    "width"
  )
  expect_warning(
    oc <- offcanvas("x", placement = "bottom", width = 300, id = "a"),
    "width"
  )
  expect_null(oc$width)
})

test_that("offcanvas() warns and drops height when placement is left or right", {
  expect_warning(
    offcanvas("x", placement = "left", height = 200, id = "a"),
    "height"
  )
  expect_warning(
    oc <- offcanvas("x", placement = "right", height = 200, id = "a"),
    "height"
  )
  expect_null(oc$height)
})


# as.tags() errors and warnings ----

test_that("as.tags() errors without id or trigger", {
  oc <- offcanvas("content", placement = "right")
  expect_error(suppressWarnings(as.tags(oc)), "id.*trigger|trigger.*id")
})

test_that("as.tags() succeeds with an id", {
  oc <- offcanvas("content", placement = "right", id = "oc1", title = "Panel")
  expect_no_error(as.tags(oc))
})

test_that("as.tags() succeeds with a trigger", {
  oc <- offcanvas(
    "content",
    placement = "right",
    trigger = shiny::actionButton("b", "Open"),
    title = "Panel"
  )
  expect_no_error(as.tags(oc))
})

test_that("as.tags() warns when title and aria-label are both absent", {
  oc <- offcanvas("content", placement = "right", id = "oc1")
  expect_warning(as.tags(oc), "[Aa]ccessib")
})

test_that("as.tags() does not warn when title is provided", {
  oc <- offcanvas(
    "content",
    placement = "right",
    id = "oc1",
    title = "My Panel"
  )
  expect_no_warning(as.tags(oc))
})

test_that("as.tags() does not warn when aria-label is provided in ...", {
  oc <- offcanvas(
    "content",
    placement = "right",
    id = "oc1",
    `aria-label` = "My Panel"
  )
  expect_no_warning(as.tags(oc))
})

test_that("as.tags() does not warn when aria-labelledby is provided in ...", {
  oc <- offcanvas(
    "content",
    placement = "right",
    id = "oc1",
    `aria-labelledby` = "some-heading"
  )
  expect_no_warning(as.tags(oc))
})


# Placement -> CSS class ----

test_that("as.tags() maps placement to the correct offcanvas-* class", {
  check_class <- function(placement, expected_class) {
    oc <- offcanvas("x", placement = placement, id = "t", title = "T")
    html <- as.character(as.tags(oc))
    expect_match(html, expected_class, fixed = TRUE)
  }

  check_class("right", "offcanvas-end")
  check_class("left", "offcanvas-start")
  check_class("top", "offcanvas-top")
  check_class("bottom", "offcanvas-bottom")
})


# Accessible name wiring ----

test_that("title is wired to aria-labelledby and gets offcanvas-title class", {
  oc <- offcanvas(
    "content",
    placement = "right",
    id = "oc1",
    title = "My Panel"
  )
  html <- as.character(as.tags(oc))

  expect_match(html, 'aria-labelledby="oc1-title"')
  expect_match(html, 'class="offcanvas-title"')
})


# Trigger wiring ----

test_that("trigger gets data-bs-toggle, data-bs-target, and aria-controls", {
  btn <- shiny::actionButton("btn", "Open")
  oc <- offcanvas(
    "content",
    placement = "right",
    id = "oc1",
    trigger = btn,
    title = "T"
  )
  html <- as.character(as.tags(oc))

  expect_match(html, 'data-bs-toggle="offcanvas"')
  expect_match(html, 'data-bs-target="#oc1"')
  expect_match(html, 'aria-controls="oc1"')
})


# data-bs-* attributes ----

test_that("backdrop='static' emits data-bs-backdrop='static'", {
  oc <- offcanvas(
    "x",
    placement = "right",
    id = "t",
    title = "T",
    backdrop = "static"
  )
  html <- as.character(as.tags(oc))
  expect_match(html, 'data-bs-backdrop="static"')
})

test_that("backdrop=FALSE emits data-bs-backdrop='false'", {
  oc <- offcanvas(
    "x",
    placement = "right",
    id = "t",
    title = "T",
    backdrop = FALSE
  )
  html <- as.character(as.tags(oc))
  expect_match(html, 'data-bs-backdrop="false"')
})

test_that("scroll=TRUE emits data-bs-scroll='true'", {
  oc <- offcanvas(
    "x",
    placement = "right",
    id = "t",
    title = "T",
    scroll = TRUE
  )
  html <- as.character(as.tags(oc))
  expect_match(html, 'data-bs-scroll="true"')
})

test_that("keyboard=FALSE emits data-bs-keyboard='false'", {
  oc <- offcanvas(
    "x",
    placement = "right",
    id = "t",
    title = "T",
    keyboard = FALSE
  )
  html <- as.character(as.tags(oc))
  expect_match(html, 'data-bs-keyboard="false"')
})

test_that("defaults emit none of the data-bs-backdrop/scroll/keyboard attributes", {
  oc <- offcanvas("x", placement = "right", id = "t", title = "T")
  html <- as.character(as.tags(oc))

  expect_false(grepl("data-bs-backdrop", html))
  expect_false(grepl("data-bs-scroll", html))
  expect_false(grepl("data-bs-keyboard", html))
})


# Server verbs ----

mock_session <- function() {
  env <- new.env(parent = emptyenv())
  env$messages <- list()
  env$input_messages <- list()
  env$ns <- function(id) id

  env$sendCustomMessage <- function(type, message) {
    env$messages <- c(env$messages, list(list(type = type, message = message)))
  }

  env$onFlush <- function(callback, once = TRUE) {
    callback()
  }

  env$sendInputMessage <- function(id, message) {
    env$input_messages <- c(
      env$input_messages,
      list(list(id = id, message = message))
    )
  }

  env
}

test_that("show_offcanvas() sends bslib.show-offcanvas and returns local id", {
  local_mocked_bindings(
    offcanvas_random_id = function() "bslib-offcanvas-0001"
  )

  session <- mock_session()

  oc <- offcanvas("Panel content", placement = "right", title = "Notice")
  returned_id <- show_offcanvas(oc, session = session)

  expect_equal(returned_id, "bslib-offcanvas-0001")
  expect_length(session$messages, 1)
  expect_equal(session$messages[[1]]$type, "bslib.show-offcanvas")
  expect_equal(session$messages[[1]]$message$id, "bslib-offcanvas-0001")
})

test_that("show_offcanvas() with an id'd panel returns the local id", {
  session <- mock_session()

  oc <- offcanvas("content", placement = "right", id = "my-panel", title = "T")
  returned_id <- show_offcanvas(oc, session = session)

  expect_equal(returned_id, "my-panel")
  expect_equal(session$messages[[1]]$message$id, "my-panel")
})

test_that("hide_offcanvas() sends hide input message", {
  session <- mock_session()

  hide_offcanvas("my-panel", session = session)

  expect_length(session$input_messages, 1)
  expect_equal(session$input_messages[[1]]$id, "my-panel")
  expect_equal(session$input_messages[[1]]$message$method, "hide")
})

test_that("toggle_offcanvas() sends toggle input message", {
  session <- mock_session()

  toggle_offcanvas("my-panel", session = session)

  expect_length(session$input_messages, 1)
  expect_equal(session$input_messages[[1]]$id, "my-panel")
  expect_equal(session$input_messages[[1]]$message$method, "toggle")
})

test_that("toggle_offcanvas() with show=TRUE sends value='show'", {
  session <- mock_session()

  toggle_offcanvas("my-panel", show = TRUE, session = session)

  msg <- session$input_messages[[1]]$message
  expect_equal(msg$method, "toggle")
  expect_equal(msg$value, "show")
})

test_that("toggle_offcanvas() with show=FALSE sends value='hide'", {
  session <- mock_session()

  toggle_offcanvas("my-panel", show = FALSE, session = session)

  msg <- session$input_messages[[1]]$message
  expect_equal(msg$method, "toggle")
  expect_equal(msg$value, "hide")
})

test_that("hide_offcanvas() accepts a bslib_offcanvas object with an id", {
  session <- mock_session()

  oc <- offcanvas("content", placement = "right", id = "panel-id", title = "T")
  hide_offcanvas(oc, session = session)

  expect_equal(session$input_messages[[1]]$id, "panel-id")
  expect_equal(session$input_messages[[1]]$message$method, "hide")
})

test_that("hide_offcanvas() errors when given an offcanvas without an id", {
  session <- mock_session()
  oc <- offcanvas("content", placement = "right")
  expect_error(hide_offcanvas(oc, session = session), "id")
})
