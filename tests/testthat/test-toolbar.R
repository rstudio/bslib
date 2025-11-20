# Tests for toolbar container #
test_that("toolbar() basic attributes and defaults", {
  tb <- as.tags(toolbar(htmltools::span("Test")))
  expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")
  expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")
  expect_snapshot_html(
    toolbar("Item 1", "Item 2")
  )
  expect_snapshot_html(
    toolbar("Item 1", "Item 2", gap = "10px")
  )
})

test_that("toolbar() aligns correctly", {
  tb <- as.tags(toolbar(align = "left"))
  expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")
  expect_snapshot_html(
    toolbar("Item 1", "Item 2", align = "left")
  )
  expect_snapshot_html(
    toolbar("Item 1", "Item 2", align = "right")
  )
  expect_error(toolbar("x", align = "center"))
})


# Tests for toolbar_input_button() #
test_that("toolbar_input_button() has correct attributes", {
  btn_label <- toolbar_input_button(id = "test_btn", label = "Click me")
  expect_match(
    htmltools::tagGetAttribute(btn_label, "class"),
    "bslib-toolbar-input-button"
  )
  expect_match(htmltools::tagGetAttribute(btn_label, "class"), "btn-sm")

  expect_snapshot_html(
    toolbar_input_button(id = "label_only", label = "Click me")
  )

  btn_icon <- toolbar_input_button(id = "icon_only", icon = shiny::icon("star"))
  expect_equal(htmltools::tagGetAttribute(btn_icon, "data-type"), "icon")

  expect_snapshot_html(
    toolbar_input_button(id = "icon_only", icon = shiny::icon("star"))
  )
  expect_snapshot_html(
    toolbar_input_button(
      id = "both",
      label = "Save",
      icon = shiny::icon("save")
    )
  )
})

test_that("toolbar_input_button() requires icon or label", {
  expect_error(
    toolbar_input_button(id = "empty"),
    "At least one of 'icon' or 'label' must be provided"
  )
})

test_that("toolbar_input_button() disabled parameter", {
  expect_snapshot_html(
    toolbar_input_button(
      id = "disabled_btn",
      label = "Disabled",
      disabled = TRUE
    )
  )
  expect_snapshot_html(
    toolbar_input_button(
      id = "enabled_btn",
      label = "Enabled",
      disabled = FALSE
    )
  )
})

test_that("toolbar_input_button() border parameter", {
  expect_snapshot_html(
    toolbar_input_button(
      id = "no_border",
      label = "No Border",
      border = FALSE
    )
  )
  expect_snapshot_html(
    toolbar_input_button(
      id = "with_border",
      label = "With Border",
      border = TRUE
    )
  )
})


test_that("toolbar_input_button() tooltip parameter", {
  expect_snapshot_html(
    toolbar_input_button(
      id = "tooltip_icon",
      icon = shiny::icon("question"),
      tooltip = "Help"
    )
  )
})
