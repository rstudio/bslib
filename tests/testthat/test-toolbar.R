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


# Tests for toolbar_spacer() #
test_that("toolbar_spacer() creates spacer element", {
  expect_snapshot_html(
    toolbar_spacer()
  )
  expect_snapshot_html(
    toolbar_spacer(width = "20px")
  )
  expect_snapshot_html(
    toolbar_spacer(divider = FALSE)
  )
  expect_snapshot_html(
    toolbar_spacer(width = "2rem", divider = "3px")
  )
})

test_that("toolbar_spacer() in toolbar context", {
  expect_snapshot_html(
    toolbar(
      toolbar_input_button(id = "left", label = "Left"),
      toolbar_spacer(),
      toolbar_input_button(id = "right", label = "Right")
    )
  )
  expect_snapshot_html(
    toolbar(
      toolbar_input_button(id = "a", label = "A"),
      toolbar_spacer(width = "10px", divider = FALSE),
      toolbar_input_button(id = "b", label = "B"),
      toolbar_spacer(),
      toolbar_input_button(id = "c", label = "C")
    )
  )
})

# Tests for use case 2: Fixed-width spacers
test_that("toolbar_spacer() with fixed width (use case 2)", {
  # Basic fixed-width spacer with no divider
  expect_snapshot_html(
    toolbar_spacer(width = "20px", divider = FALSE)
  )

  # Multiple fixed-width spacers in toolbar
  expect_snapshot_html(
    toolbar(
      toolbar_input_button(id = "a", label = "Star", icon = shiny::icon("star")),
      toolbar_spacer(width = "20px", divider = FALSE),
      toolbar_input_button(id = "b", label = "Heart", icon = shiny::icon("heart")),
      toolbar_spacer(width = "20px", divider = FALSE),
      toolbar_input_button(id = "c", label = "Comment", icon = shiny::icon("comment"))
    )
  )

  # Fixed-width spacer with different units
  expect_snapshot_html(
    toolbar_spacer(width = "1rem", divider = FALSE)
  )
  expect_snapshot_html(
    toolbar_spacer(width = "50px", divider = FALSE)
  )
})

# Tests for use case 3: Dividers
test_that("toolbar_spacer() with divider (use case 3)", {
  # Basic divider (uses default divider = TRUE)
  expect_snapshot_html(
    toolbar_spacer()
  )

  # Dividers in toolbar
  expect_snapshot_html(
    toolbar(
      toolbar_input_button(id = "save", label = "Save", icon = shiny::icon("save")),
      toolbar_input_button(id = "edit", label = "Edit", icon = shiny::icon("pencil")),
      toolbar_spacer(),
      toolbar_input_button(id = "delete", label = "Delete", icon = shiny::icon("trash"))
    )
  )

  # Divider with custom divider width
  expect_snapshot_html(
    toolbar_spacer(width = "1rem", divider = "5px")
  )

  # Mixed spacers and dividers
  expect_snapshot_html(
    toolbar(
      toolbar_input_button(id = "undo", label = "Undo", icon = shiny::icon("undo")),
      toolbar_input_button(id = "redo", label = "Redo", icon = shiny::icon("redo")),
      toolbar_spacer(width = "1rem"),
      toolbar_input_button(id = "save", label = "Save", icon = shiny::icon("save")),
      toolbar_input_button(id = "paragraph", label = "Paragraph", icon = shiny::icon("paragraph")),
      toolbar_spacer(divider = FALSE),
      toolbar_input_button(id = "settings", label = "Settings", icon = shiny::icon("gear"))
    )
  )
})

