test_that("toolbar() basic attributes and defaults", {
    tb <- as.tags(toolbar(htmltools::span("Test")))

    expect_match(htmltools::tagGetAttribute(tb, "class"), "bslib-toolbar")

    expect_match(htmltools::tagGetAttribute(tb, "data-align"), "right")
    expect_match(htmltools::tagGetAttribute(tb, "data-size"), "sm")
})

test_that("toolbar() assigns correct attributes", {
    tb <- as.tags(toolbar(align = "left", size = "md"))

    expect_equal(htmltools::tagGetAttribute(tb, "data-align"), "left")
    expect_equal(htmltools::tagGetAttribute(tb, "data-size"), "md")
})

test_that("toolbar() validation of inputs", {
    expect_error(toolbar("x", align = "center"))
    expect_error(toolbar("x", size = "xl"))
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
            toolbar(
                "Item 1",
                "Item 2",
                align = "left"
            )
        )
    )

    # Toolbar with size options
    expect_snapshot(
        show_raw_html(
            toolbar(
                "Item 1",
                "Item 2",
                size = "md"
            )
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
