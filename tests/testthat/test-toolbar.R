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

# Tests for toolbar_divider() #
test_that("toolbar_divider() creates divider element", {
  expect_snapshot_html(
    toolbar_divider()
  )
  expect_snapshot_html(
    toolbar_divider(gap = "20px")
  )
  expect_snapshot_html(
    toolbar_divider(width = "5px", gap = "2rem")
  )
})

test_that("toolbar_divider() validates dots are empty", {
  expect_error(
    toolbar_divider("fake"),
    "must be empty"
  )
})

# Additional Toolbar Input Select Tests #

test_that("toolbar_input_select() accepts named attributes in ...", {
  tis <- toolbar_input_select(
    id = "select",
    label = "Choose option",
    choices = c("Option 1", "Option 2", "Option 3"),
    class = "bg-success-subtle",
    `data-test` = "custom",
    tooltip = FALSE
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

test_that("toolbar_input_select() has aria-labelledby with hidden label", {
  tis <- as.tags(
    toolbar_input_select(
      id = "select",
      label = "Choose option",
      choices = c("Option 1", "Option 2", "Option 3"),
      tooltip = FALSE
    )
  )

  # The container is the root div element
  container_elem <- tis
  aria_labelledby <- htmltools::tagGetAttribute(
    container_elem,
    "aria-labelledby"
  )

  # Check that aria-labelledby exists on container
  expect_true(!is.null(aria_labelledby))

  # Find the hidden label element by looking for spans with id that starts with "select-label-"
  all_spans <- tagQuery(tis)$find("span")$selectedTags()
  label_elem <- NULL
  for (span in all_spans) {
    span_id <- htmltools::tagGetAttribute(span, "id")
    if (!is.null(span_id) && grepl("^select-label-", span_id)) {
      label_elem <- span
      break
    }
  }

  expect_true(!is.null(label_elem))
  label_id <- htmltools::tagGetAttribute(label_elem, "id")
  label_text <- as.character(label_elem$children[[1]])

  # Check that the hidden label has the correct id and text
  expect_equal(label_id, aria_labelledby)
  expect_equal(label_text, "Choose option")
})

test_that("toolbar_input_select() markup snapshots", {
  expect_snapshot_html(
    toolbar_input_select(
      id = "select1",
      label = "Basic select",
      choices = c("A", "B", "C"),
      tooltip = FALSE
    )
  )

  expect_snapshot_html(
    toolbar_input_select(
      id = "select2",
      label = "Select with selected",
      choices = c("Option 1", "Option 2", "Option 3"),
      selected = "Option 2",
      tooltip = FALSE
    )
  )

  expect_snapshot_html(
    toolbar_input_select(
      id = "select3",
      label = "Select with custom class",
      choices = c("X", "Y", "Z"),
      class = "bg-success-subtle",
      "style" = "width: 400px",
      tooltip = FALSE
    )
  )
})

test_that("toolbar_input_select() handles grouped choices", {
  grouped_select <- toolbar_input_select(
    id = "grouped",
    label = "Grouped select",
    choices = list(
      "Group A" = c("A1", "A2"),
      "Group B" = c("B1", "B2")
    ),
    tooltip = FALSE
  )

  expect_snapshot_html(grouped_select)
})

test_that("toolbar_input_select() handles named choices", {
  named_select <- toolbar_input_select(
    id = "named",
    label = "Named choices",
    choices = c("Label 1" = "val1", "Label 2" = "val2"),
    tooltip = FALSE
  )

  html_output <- as.character(as.tags(named_select))
  expect_match(html_output, "Label 1")
  expect_match(html_output, "val1")
  expect_match(html_output, "Label 2")
  expect_match(html_output, "val2")
})

test_that("toolbar_input_select() respects selected parameter", {
  select_with_default <- as.tags(
    toolbar_input_select(
      id = "default",
      label = "With default",
      choices = c("A", "B", "C"),
      selected = "B",
      tooltip = FALSE
    )
  )

  html_output <- as.character(select_with_default)
  expect_match(html_output, '<option value="B" selected>B</option>')
})

test_that("toolbar_input_select() selects first choice by default", {
  select_no_default <- as.tags(
    toolbar_input_select(
      id = "no_default",
      label = "No default",
      choices = c("X", "Y", "Z"),
      tooltip = FALSE
    )
  )

  html_output <- as.character(select_no_default)
  expect_match(html_output, '<option value="X" selected>X</option>')
})

test_that("toolbar_input_select() validates label parameter", {
  expect_error(
    toolbar_input_select(
      id = "test",
      label = "",
      choices = c("A", "B"),
      tooltip = FALSE
    ),
    "`label` must be a non-empty string"
  )

  expect_error(
    toolbar_input_select(
      id = "test",
      label = c("A", "B"),
      choices = c("A", "B"),
      tooltip = FALSE
    ),
    "`label` must be a non-empty string"
  )

  expect_error(
    toolbar_input_select(
      id = "test",
      label = 123,
      choices = c("A", "B"),
      tooltip = FALSE
    ),
    "`label` must be a non-empty string"
  )
})

test_that("toolbar_input_select() has correct classes", {
  select <- as.tags(
    toolbar_input_select(
      id = "test",
      label = "Test",
      choices = c("A", "B"),
      tooltip = FALSE
    )
  )

  # Check outer div has correct classes
  expect_match(
    htmltools::tagGetAttribute(select, "class"),
    "bslib-toolbar-input-select"
  )
  expect_match(
    htmltools::tagGetAttribute(select, "class"),
    "shiny-input-container"
  )

  # Check select element has Bootstrap classes
  select_elem <- tagQuery(select)$find("select")$selectedTags()[[1]]
  expect_match(htmltools::tagGetAttribute(select_elem, "class"), "form-select")
  expect_match(
    htmltools::tagGetAttribute(select_elem, "class"),
    "form-select-sm"
  )
})

test_that("toolbar_input_select() tooltip parameter", {
  # Default has tooltip=TRUE, uses label text for tooltip text
  select_default <- as.tags(
    toolbar_input_select(
      id = "default",
      label = "Has label as tooltip",
      choices = c("A", "B")
    )
  )
  html_output <- as.character(select_default)
  expect_true(grepl("bslib-tooltip", html_output))

  # With tooltip = FALSE explicitly - no bslib-tooltip wrapper
  select_tooltip_false <- as.tags(
    toolbar_input_select(
      id = "tooltip_false",
      label = "Explicitly no tooltip",
      choices = c("A", "B"),
      tooltip = FALSE
    )
  )
  html_output_false <- as.character(select_tooltip_false)
  expect_false(grepl("bslib-tooltip", html_output_false))

  # With tooltip = TRUE - uses label as tooltip text
  expect_snapshot_html(
    toolbar_input_select(
      id = "tooltip_true",
      label = "My Select Label",
      choices = c("A", "B"),
      tooltip = TRUE
    )
  )

  # With tooltip - wrapped in bslib-tooltip
  expect_snapshot_html(
    toolbar_input_select(
      id = "with_tooltip",
      label = "With tooltip",
      choices = c("A", "B"),
      tooltip = "This is helpful information"
    )
  )
})

test_that("toolbar_input_select() icon parameter", {
  # Without icon - no icon element
  select_no_icon <- as.tags(
    toolbar_input_select(
      id = "no_icon",
      label = "No icon",
      choices = c("A", "B"),
      tooltip = FALSE
    )
  )
  html_output <- as.character(select_no_icon)
  expect_false(grepl("bslib-toolbar-input-select-icon", html_output))

  # With icon
  expect_snapshot_html(
    toolbar_input_select(
      id = "with_icon",
      label = "With icon",
      choices = c("A", "B"),
      icon = shiny::icon("filter"),
      tooltip = FALSE
    )
  )

  # With both icon and tooltip
  expect_snapshot_html(
    toolbar_input_select(
      id = "icon_tooltip",
      label = "Icon and tooltip",
      choices = c("A", "B"),
      icon = shiny::icon("star"),
      tooltip = "Select an option"
    )
  )
})
