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

test_that("toolbar_input_select() has proper label structure", {
  tis <- as.tags(
    toolbar_input_select(
      id = "select",
      label = "Choose option",
      choices = c("Option 1", "Option 2", "Option 3"),
      tooltip = FALSE
    )
  )

  # Check that a <label> element exists with proper attributes
  label_elem <- tagQuery(tis)$find("label")$selectedTags()[[1]]
  expect_true(!is.null(label_elem))

  # Label should have id matching pattern "{id}-label"
  label_id <- htmltools::tagGetAttribute(label_elem, "id")
  expect_equal(label_id, "select-label")

  # Label should have for attribute pointing to select
  label_for <- htmltools::tagGetAttribute(label_elem, "for")
  expect_equal(label_for, "select")

  # Find the label text span
  label_spans <- tagQuery(label_elem)$find(
    "span.bslib-toolbar-label"
  )$selectedTags()
  expect_true(length(label_spans) > 0)

  label_text_span <- label_spans[[1]]
  # With show_label=FALSE (default), label should be visually hidden
  expect_match(
    htmltools::tagGetAttribute(label_text_span, "class"),
    "visually-hidden"
  )

  # Check label text content
  label_text <- as.character(label_text_span$children[[1]])
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

# Tests to detect if the functions we import from Shiny have changed #
test_that("Shiny's firstChoice() function maintains expected behavior", {
  # These tests verify that Shiny's internal firstChoice() function
  # continues to work as expected for toolbar_input_select()
  # Note we don't test on vectors here because choicesWithNames() ensures we
  # only have lists when passed to firstChoice()

  firstChoice <- asNamespace("shiny")[["firstChoice"]]

  # Simple vector - should return first element
  expect_equal(firstChoice(c("A", "B", "C")), "A")

  # Named vector - should return first value (not name)
  expect_equal(firstChoice(c("Label 1" = "val1", "Label 2" = "val2")), "val1")

  # Nested list - should recursively find first non-list element
  nested <- list(
    "Group A" = list("A1", "A2"),
    "Group B" = list("B1", "B2")
  )
  expect_equal(firstChoice(nested), "A1")

  # Nested list with named choices
  nested_named <- list(
    "Group A" = list("Label A1" = "valA1", "Label A2" = "valA2"),
    "Group B" = list("Label B1" = "valB1")
  )
  expect_equal(firstChoice(nested_named), "valA1")

  # Empty choices should return NULL or empty
  expect_true(
    is.null(firstChoice(character(0))) ||
      identical(firstChoice(character(0)), character(0))
  )
})

test_that("Shiny's choicesWithNames() function maintains expected behavior", {
  # These tests verify that Shiny's internal choicesWithNames() function
  # continues to work as expected for toolbar_input_select()

  choicesWithNames <- asNamespace("shiny")[["choicesWithNames"]]

  # Unnamed list - names should equal values
  result1 <- choicesWithNames(list("A", "B", "C"))
  expect_equal(names(result1), c("A", "B", "C"))
  expect_equal(as.character(result1), c("A", "B", "C"))

  # Named list - preserve names and values
  result2 <- choicesWithNames(list("Label 1" = "val1", "Label 2" = "val2"))
  expect_equal(names(result2), c("Label 1", "Label 2"))
  expect_equal(as.character(result2), c("val1", "val2"))

  # Partially named list - use value as name where missing
  result3 <- choicesWithNames(list("Label 1" = "val1", "val2"))
  expect_equal(names(result3), c("Label 1", "val2"))
  expect_equal(as.character(result3), c("val1", "val2"))

  # Grouped choices (list) - should preserve structure
  grouped <- list(
    "Group A" = c("A1", "A2"),
    "Group B" = c("B1", "B2")
  )
  result4 <- choicesWithNames(grouped)
  expect_true(is.list(result4))
  expect_equal(names(result4), c("Group A", "Group B"))
  expect_equal(names(result4[["Group A"]]), c("A1", "A2"))
  expect_equal(as.character(result4[["Group A"]]), c("A1", "A2"))

  # Grouped with named choices
  grouped_named <- list(
    "Group A" = c("Label A1" = "valA1", "Label A2" = "valA2")
  )
  result5 <- choicesWithNames(grouped_named)
  expect_equal(names(result5[["Group A"]]), c("Label A1", "Label A2"))
  expect_equal(as.character(result5[["Group A"]]), c("valA1", "valA2"))
})

test_that("bslib::selectOptions() matches shiny::selectOptions() output", {
  # These tests verify that bslib's selectOptions() function produces
  # the same HTML output as Shiny's selectOptions() function
  # NOTE: All choices are preprocessed (as if by choicesWithNames())

  bslib_selectOptions <- asNamespace("bslib")[["selectOptions"]]
  shiny_selectOptions <- asNamespace("shiny")[["selectOptions"]]

  # Simple unnamed choices (preprocessed)
  choices1 <- list(A = "A", B = "B", C = "C")
  bslib_out1 <- as.character(bslib_selectOptions(choices1, inputId = "test1"))
  shiny_out1 <- as.character(shiny_selectOptions(choices1, inputId = "test1"))
  expect_equal(bslib_out1, shiny_out1)

  # Named choices (preprocessed)
  choices2 <- list(`Label A` = "valA", `Label B` = "valB", `Label C` = "valC")
  bslib_out2 <- as.character(bslib_selectOptions(choices2, inputId = "test2"))
  shiny_out2 <- as.character(shiny_selectOptions(choices2, inputId = "test2"))
  expect_equal(bslib_out2, shiny_out2)

  # With selected value
  bslib_out3 <- as.character(bslib_selectOptions(
    choices1,
    selected = "B",
    inputId = "test3"
  ))
  shiny_out3 <- as.character(shiny_selectOptions(
    choices1,
    selected = "B",
    inputId = "test3"
  ))
  expect_equal(bslib_out3, shiny_out3)

  # Grouped choices (preprocessed)
  grouped <- list(
    `Group 1` = list(A1 = "A1", A2 = "A2", A3 = "A3"),
    `Group 2` = list(B1 = "B1", B2 = "B2")
  )
  bslib_out5 <- as.character(bslib_selectOptions(grouped, inputId = "test5"))
  shiny_out5 <- as.character(shiny_selectOptions(grouped, inputId = "test5"))
  expect_equal(bslib_out5, shiny_out5)

  # Grouped with named choices (preprocessed)
  grouped_named <- list(
    `Group A` = list(`Label A1` = "valA1", `Label A2` = "valA2"),
    `Group B` = list(`Label B1` = "valB1", `Label B2` = "valB2")
  )
  bslib_out6 <- as.character(bslib_selectOptions(
    grouped_named,
    inputId = "test6"
  ))
  shiny_out6 <- as.character(shiny_selectOptions(
    grouped_named,
    inputId = "test6"
  ))
  expect_equal(bslib_out6, shiny_out6)

  # Grouped with selected value
  bslib_out7 <- as.character(bslib_selectOptions(
    grouped,
    selected = "A2",
    inputId = "test7"
  ))
  shiny_out7 <- as.character(shiny_selectOptions(
    grouped,
    selected = "A2",
    inputId = "test7"
  ))
  expect_equal(bslib_out7, shiny_out7)

  # Special characters that need escaping (preprocessed)
  choices_special <- list(
    `Label <with> HTML` = "val1",
    `Label & ampersand` = "val2"
  )
  bslib_out8 <- as.character(bslib_selectOptions(
    choices_special,
    inputId = "test8"
  ))
  shiny_out8 <- as.character(shiny_selectOptions(
    choices_special,
    inputId = "test8"
  ))
  expect_equal(bslib_out8, shiny_out8)
})

# Tests for update functions #

test_that("update_toolbar_input_select() validates label parameter", {
  session <- list(sendInputMessage = function(id, message) {
    stop("sendInputMessage should not be called")
  })

  # Empty string label should error (validation happens before session is used)
  expect_snapshot(error = TRUE, {
    update_toolbar_input_select("test_id", label = "", session = session)
  })

  # Whitespace-only label should error
  expect_snapshot(error = TRUE, {
    update_toolbar_input_select("test_id", label = "   ", session = session)
  })

  # Non-character label should error
  expect_snapshot(error = TRUE, {
    update_toolbar_input_select("test_id", label = 123, session = session)
  })

  # Multiple strings should error
  expect_snapshot(error = TRUE, {
    update_toolbar_input_select("test_id", label = c("A", "B"), session = session)
  })
})

test_that("toolbar_input_select() validates selected is in choices", {
  # Invalid selected value should error
  expect_snapshot(error = TRUE, {
    toolbar_input_select(
      id = "test",
      label = "Test",
      choices = c("A", "B", "C"),
      selected = "D",
      tooltip = FALSE
    )
  })

  # Valid selected value should not error
  expect_no_error(
    toolbar_input_select(
      id = "test",
      label = "Test",
      choices = c("A", "B", "C"),
      selected = "B",
      tooltip = FALSE
    )
  )

  # Works with named choices
  expect_snapshot(error = TRUE, {
    toolbar_input_select(
      id = "test",
      label = "Test",
      choices = c("Label A" = "val_a", "Label B" = "val_b"),
      selected = "Label A",  # Should use value, not label
      tooltip = FALSE
    )
  })

  # Works with grouped choices
  expect_snapshot(error = TRUE, {
    toolbar_input_select(
      id = "test",
      label = "Test",
      choices = list(
        "Group 1" = c("A", "B"),
        "Group 2" = c("C", "D")
      ),
      selected = "E",
      tooltip = FALSE
    )
  })
})

test_that("update_toolbar_input_select() validates selected is in choices", {
  session <- list(
    sendInputMessage = function(id, message) {
      session$last_message <<- message
    },
    input = list()
  )

  # Invalid selected value should warn and clear when updating
  expect_snapshot({
    update_toolbar_input_select(
      "test_id",
      choices = c("A", "B", "C"),
      selected = "D",
      session = session
    )
  })
  expect_equal(session$last_message$value, "")  # Should clear selection

  # Valid selected value should not warn
  expect_no_warning(
    update_toolbar_input_select(
      "test_id",
      choices = c("A", "B", "C"),
      selected = "B",
      session = session
    )
  )
  expect_equal(session$last_message$value, "B")  # Should set to B
})

test_that("update_toolbar_input_select() clears invalid current value", {
  # Mock session with a current input value
  session <- list(
    sendInputMessage = function(id, message) {
      # Capture the message to verify behavior
      session$last_message <<- message
    },
    input = list(test_select = "B")
  )

  # Update choices - current value "B" is still valid, should be kept
  update_toolbar_input_select(
    "test_select",
    choices = c("A", "B", "C"),
    session = session
  )
  expect_null(session$last_message$value)  # NULL means keep current

  # Update choices - current value "B" is no longer valid, should be cleared
  session$input$test_select <- "B"
  update_toolbar_input_select(
    "test_select",
    choices = c("X", "Y", "Z"),
    session = session
  )
  expect_equal(session$last_message$value, "")  # Empty string clears value
})

test_that("validate_update_selected() handles all cases correctly", {
  # Case 1: Valid selected value with choices
  result <- validate_update_selected("B", c("A", "B", "C"), NULL)
  expect_equal(result$value, "B")
  expect_null(result$warning)

  # Case 2: Invalid selected value with choices
  result <- validate_update_selected("D", c("A", "B", "C"), NULL)
  expect_equal(result$value, "")
  expect_match(result$warning, "not in `choices`")

  # Case 3: selected is a vector (invalid)
  result <- validate_update_selected(c("A", "B"), c("A", "B", "C"), NULL)
  expect_equal(result$value, "")
  expect_match(result$warning, "single value")

  # Case 4: No selected, no choices, no current value - keep current
  result <- validate_update_selected(NULL, NULL, NULL)
  expect_null(result$value)
  expect_null(result$warning)

  # Case 5: No selected, no choices, has current value - keep current
  result <- validate_update_selected(NULL, NULL, "B")
  expect_null(result$value)
  expect_null(result$warning)

  # Case 6: No selected, new choices, current value still valid - keep current
  result <- validate_update_selected(NULL, c("A", "B", "C"), "B")
  expect_null(result$value)
  expect_null(result$warning)

  # Case 7: No selected, new choices, current value no longer valid - clear
  result <- validate_update_selected(NULL, c("X", "Y", "Z"), "B")
  expect_equal(result$value, "")
  expect_null(result$warning)

  # Case 8: Valid selected with named choices
  result <- validate_update_selected("val_a", c("Label A" = "val_a", "Label B" = "val_b"), NULL)
  expect_equal(result$value, "val_a")
  expect_null(result$warning)

  # Case 9: Invalid selected (using label instead of value)
  result <- validate_update_selected("Label A", c("Label A" = "val_a", "Label B" = "val_b"), NULL)
  expect_equal(result$value, "")
  expect_match(result$warning, "not in `choices`")

  # Case 10: Valid selected with grouped choices
  result <- validate_update_selected(
    "B",
    list("Group 1" = c("A", "B"), "Group 2" = c("C", "D")),
    NULL
  )
  expect_equal(result$value, "B")
  expect_null(result$warning)

  # Case 11: Invalid selected with grouped choices
  result <- validate_update_selected(
    "E",
    list("Group 1" = c("A", "B"), "Group 2" = c("C", "D")),
    NULL
  )
  expect_equal(result$value, "")
  expect_match(result$warning, "not in `choices`")

  # Case 12: Selected without choices (invalid - warn and clear)
  result <- validate_update_selected("B", NULL, NULL)
  expect_equal(result$value, "")
  expect_match(result$warning, "cannot be set without `choices`")
})

test_that("update_toolbar_input_button() warns for blank label", {
  # Note: We can't fully test these functions without a Shiny session,
  # but we can test that the warning is issued before the session error occurs.

  # Empty string label should warn
  expect_warning(
    expect_error(
      update_toolbar_input_button(
        "test_id",
        label = ""
      )
    ),
    "non-empty string label"
  )

  # Whitespace-only label should warn
  expect_warning(
    expect_error(
      update_toolbar_input_button(
        "test_id",
        label = "   "
      )
    ),
    "non-empty string label"
  )

  # Empty tag label should warn
  expect_warning(
    expect_error(
      update_toolbar_input_button(
        "test_id",
        label = span("")
      )
    ),
    "non-empty string label"
  )
})
