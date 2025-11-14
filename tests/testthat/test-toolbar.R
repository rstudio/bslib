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
test_that("toolbar_input_button() tests", {
  # Label-only Button
  btn_label <- toolbar_input_button(
    id = "test_btn",
    label = "Click me",
    show_label = TRUE
  )
  expect_match(
    htmltools::tagGetAttribute(btn_label, "class"),
    "bslib-toolbar-input-button"
  )
  expect_match(htmltools::tagGetAttribute(btn_label, "class"), "btn-sm")
  expect_match(htmltools::tagGetAttribute(btn_label, "data-type"), "label")

  expect_snapshot_html(
    toolbar_input_button(
      id = "label_only",
      label = "Click me",
      show_label = TRUE
    )
  )

  btn_icon <- toolbar_input_button(
    id = "test_btn",
    label = "Click me",
    icon = shiny::icon("star"),
  )
  # Button is wrapped in tooltip by default, use tagQuery to extract it
  btn_icon_tag <- tagQuery(as.tags(btn_icon))$find("button")$selectedTags()[[1]]

  expect_match(
    htmltools::tagGetAttribute(btn_icon_tag, "class"),
    "bslib-toolbar-input-button"
  )
  expect_match(htmltools::tagGetAttribute(btn_icon_tag, "class"), "btn-sm")
  expect_match(htmltools::tagGetAttribute(btn_icon_tag, "data-type"), "icon")
  expect_snapshot_html(
    toolbar_input_button(
      id = "test_btn",
      label = "Click me",
      icon = shiny::icon("star"),
    )
  )

  btn_both <- toolbar_input_button(
    id = "test_btn",
    label = "Click me",
    icon = shiny::icon("star"),
    show_label = TRUE
  )
  expect_match(
    htmltools::tagGetAttribute(btn_both, "class"),
    "bslib-toolbar-input-button"
  )
  expect_match(htmltools::tagGetAttribute(btn_both, "class"), "btn-sm")
  expect_match(htmltools::tagGetAttribute(btn_both, "data-type"), "both")
  expect_snapshot_html(
    toolbar_input_button(
      id = "test_btn",
      label = "Click me",
      icon = shiny::icon("star"),
      show_label = TRUE
    )
  )
})


test_that("toolbar_input_button() disabled parameter", {
  expect_snapshot_html(
    toolbar_input_button(
      id = "disabled_btn",
      label = "Disabled",
      disabled = TRUE,
      show_label = TRUE
    )
  )
  expect_snapshot_html(
    toolbar_input_button(
      id = "enabled_btn",
      label = "Enabled",
      disabled = FALSE,
      show_label = TRUE
    )
  )
})

test_that("toolbar_input_button() border parameter", {
  expect_snapshot_html(
    toolbar_input_button(
      id = "no_border",
      label = "No Border",
      border = FALSE,
      show_label = TRUE
    )
  )

  expect_snapshot_html(
    toolbar_input_button(
      id = "with_border",
      label = "With Border",
      border = TRUE,
      show_label = TRUE
    )
  )
})


test_that("toolbar_input_button() tooltip parameter", {
  # Default: show_label = FALSE means tooltip = TRUE (shows label in tooltip)
  expect_snapshot_html(
    toolbar_input_button(
      id = "tooltip_default",
      label = "Help",
      icon = shiny::icon("question")
    )
  )

  # Explicit tooltip = FALSE disables tooltip
  expect_snapshot_html(
    toolbar_input_button(
      id = "tooltip_false",
      label = "No Tooltip",
      icon = shiny::icon("question"),
      tooltip = FALSE
    )
  )

  # Custom tooltip text
  expect_snapshot_html(
    toolbar_input_button(
      id = "tooltip_custom",
      label = "Help",
      icon = shiny::icon("question"),
      tooltip = "Click for assistance"
    )
  )

  # show_label = TRUE means tooltip = FALSE by default
  btn_no_tooltip <- toolbar_input_button(
    id = "label_visible",
    label = "Visible Label",
    show_label = TRUE
  )
  expect_false(inherits(btn_no_tooltip, "bslib_tooltip"))

  # But you can explicitly add tooltip when show_label = TRUE
  expect_snapshot_html(
    toolbar_input_button(
      id = "both_label_tooltip",
      label = "Save",
      icon = shiny::icon("save"),
      show_label = TRUE,
      tooltip = "Save your work"
    )
  )
})

test_that("toolbar_input_button() validates label for accessibility", {
  # Empty label should warn when show_label = FALSE
  expect_warning(
    toolbar_input_button(
      id = "btn",
      label = "",
      icon = shiny::icon("star")
    ),
    "non-empty string label"
  )

  # Whitespace-only label should warn
  expect_warning(
    toolbar_input_button(
      id = "btn",
      label = "   ",
      icon = shiny::icon("star")
    ),
    "non-empty string label"
  )

  # Empty tag label should warn
  expect_warning(
    toolbar_input_button(
      id = "btn",
      label = span(""),
      icon = shiny::icon("star")
    ),
    "non-empty string label"
  )

  # Valid label should not warn
  expect_no_warning(
    toolbar_input_button(
      id = "btn",
      label = "Click me",
      icon = shiny::icon("star")
    )
  )

  # Label with tag containing text should not warn
  expect_no_warning(
    toolbar_input_button(
      id = "btn",
      label = span("Click me"),
      icon = shiny::icon("star")
    )
  )
})


test_that("toolbar() markup snapshots", {
  # Basic toolbar using defaults
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


# Toolbar Input Select Tests #

test_that("toolbar_input_select() basic attributes and defaults", {
  tis <- as.tags(
    toolbar_input_select(
      id = "select",
      choices = c("Option 1", "Option 2", "Option 3"),
      selected = "Option 2"
    )
  )
  expect_match(
    htmltools::tagGetAttribute(tis, "class"),
    "bslib-toolbar-input-select"
  )
  expect_snapshot_html(
    toolbar_input_select(
      id = "select",
      choices = c("Option 1", "Option 2", "Option 3"),
      selected = "Option 2"
    )
  )
})

test_that("toolbar_input_button() creates an actionButton", {
  btn <- toolbar_input_button(id = "test_btn", label = "Click me")

  expect_equal(btn$name, "button")
  expect_match(htmltools::tagGetAttribute(btn, "class"), "btn")
  expect_match(htmltools::tagGetAttribute(btn, "class"), "action-button")
  expect_match(htmltools::tagGetAttribute(btn, "class"), "btn-sm")
  expect_equal(htmltools::tagGetAttribute(btn, "id"), "test_btn")
})

test_that("toolbar_input_button() passes additional arguments", {
  btn <- toolbar_input_button(
    id = "custom_btn",
    label = "Custom",
    class = "custom-class",
    custom = "custom-value"
  )

  expect_match(htmltools::tagGetAttribute(btn, "class"), "custom-class")
  expect_equal(htmltools::tagGetAttribute(btn, "custom"), "custom-value")
})

test_that("toolbar_input_button() disabled argument", {
  btn_disabled <- toolbar_input_button(
    id = "disabled_btn",
    label = "Disabled",
    disabled = TRUE
  )

  expect_true(htmltools::tagHasAttribute(btn_disabled, "disabled"))

  btn_enabled <- toolbar_input_button(
    id = "enabled_btn",
    label = "Enabled",
    disabled = FALSE
  )

  expect_false(htmltools::tagHasAttribute(btn_enabled, "disabled"))
})

test_that("toolbar_input_button() markup snapshots", {
  show_raw_html <- function(x) {
    cat(format(x))
  }

  # Button with label only
  expect_snapshot(
    show_raw_html(
      toolbar_input_button(id = "btn1", label = "Click me")
    )
  )

  # Button with icon only
  expect_snapshot(
    show_raw_html(
      toolbar_input_button(id = "btn2", icon = shiny::icon("star"))
    )
  )

  # Button with label and icon
  expect_snapshot(
    show_raw_html(
      toolbar_input_button(
        id = "btn3",
        label = "Save",
        icon = shiny::icon("save")
      )
    )
  )

  # Button with custom class
  expect_snapshot(
    show_raw_html(
      toolbar_input_button(
        id = "btn4",
        label = "Delete",
        class = "btn-danger"
      )
    )
  )
})
