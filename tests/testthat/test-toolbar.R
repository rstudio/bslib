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


# Additional Toolbar Input Select Tests #

test_that("toolbar_input_select() accepts named attributes in ...", {
  tis <- toolbar_input_select(
    id = "select",
    label = "Choose option",
    choices = c("Option 1", "Option 2", "Option 3"),
    class = "bg-success-subtle",
    `data-test` = "custom"
  )

  # Check that the outer div (with bslib-toolbar-input-select class) has the custom attributes
  expect_match(htmltools::tagGetAttribute(tis, "class"), "bg-success-subtle")
  expect_equal(htmltools::tagGetAttribute(tis, "data-test"), "custom")
})

test_that("toolbar_input_select() rejects unnamed arguments in ...", {
  expect_error(
    toolbar_input_select(
      id = "select",
      label = "Choose option",
      choices = c("Option 1", "Option 2", "Option 3"),
      "bad"
    ),
    "All arguments in `...` must be named"
  )
})

test_that("toolbar_input_select() has aria-label", {
  tis <- as.tags(
    toolbar_input_select(
      id = "select",
      label = "Choose option",
      choices = c("Option 1", "Option 2", "Option 3")
    )
  )

  # Find the select element
  select_elem <- tagQuery(tis)$find("select")$selectedTags()[[1]]
  aria_label <- htmltools::tagGetAttribute(select_elem, "aria-label")

  # Check that aria-label exists and has the correct value
  expect_equal(aria_label, "Choose option")
})

test_that("toolbar_input_select() markup snapshots", {
  expect_snapshot_html(
    toolbar_input_select(
      id = "select1",
      label = "Basic select",
      choices = c("A", "B", "C")
    )
  )

  expect_snapshot_html(
    toolbar_input_select(
      id = "select2",
      label = "Select with selected",
      choices = c("Option 1", "Option 2", "Option 3"),
      selected = "Option 2"
    )
  )

  expect_snapshot_html(
    toolbar_input_select(
      id = "select3",
      label = "Select with custom class",
      choices = c("X", "Y", "Z"),
      class = "bg-success-subtle",
      "style" = "width: 400px"
    )
  )
})

# Tests for toolbar_choices_is_grouped() helper function #

test_that("toolbar_choices_is_grouped() detects grouped structures", {
  # Grouped structure with named list containing vectors
  grouped_choices <- list(
    "East Coast" = c("NY", "NJ", "CT"),
    "West Coast" = c("WA", "OR", "CA")
  )
  expect_true(bslib:::toolbar_choices_is_grouped(grouped_choices))

  # Grouped structure with nested lists
  grouped_list <- list(
    "Group A" = list("a", "b", "c"),
    "Group B" = list("d", "e", "f")
  )
  expect_true(bslib:::toolbar_choices_is_grouped(grouped_list))

  # Grouped structure with factors
  grouped_factors <- list(
    "Category 1" = factor(c("A", "B")),
    "Category 2" = factor(c("C", "D"))
  )
  expect_true(bslib:::toolbar_choices_is_grouped(grouped_factors))
})

test_that("toolbar_choices_is_grouped() rejects non-grouped structures", {
  # Simple unnamed vector
  simple_vector <- c("A", "B", "C")
  expect_false(bslib:::toolbar_choices_is_grouped(simple_vector))

  # Simple named vector (not grouped, just labeled options)
  named_vector <- c("New York" = "NY", "New Jersey" = "NJ", "Connecticut" = "CT")
  expect_false(bslib:::toolbar_choices_is_grouped(named_vector))

  # NULL choices
  expect_false(bslib:::toolbar_choices_is_grouped(NULL))

  # Empty list
  expect_false(bslib:::toolbar_choices_is_grouped(list()))

  # List without names
  # Note: hasGroups() considers lists with vector elements as grouped
  unnamed_list <- list(c("A", "B"), c("C", "D"))
  expect_true(bslib:::toolbar_choices_is_grouped(unnamed_list))

  # List with empty names
  # Note: hasGroups() considers lists with vector elements as grouped
  empty_names <- list(c("A", "B"), c("C", "D"))
  names(empty_names) <- c("", "")
  expect_true(bslib:::toolbar_choices_is_grouped(empty_names))
})
