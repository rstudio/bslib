test_that("toolbar() basic attributes and defaults", {
    tb <- as.tags(toolbar(htmltools::span("Test")))

    expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")

    expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")
})

test_that("toolbar() assigns correct attributes", {
    tb <- as.tags(toolbar(align = "left"))

    expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")
})

test_that("toolbar() validation of inputs", {
    expect_error(toolbar("x", align = "center"))
})

test_that("toolbar() markup snapshots", {
    show_raw_html <- function(x) {
        cat(format(x))
    }

    # Basic toolbar
    expect_snapshot(
        show_raw_html(
            toolbar("Item 1", "Item 2")
        )
    )

    # Toolbar with alignment options
    expect_snapshot(
        show_raw_html(
            toolbar("Item 1", "Item 2", align = "left")
        )
    )

    # Toolbar with alignment options
    expect_snapshot(
        show_raw_html(
            toolbar("Item 1", "Item 2", align = "right")
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
