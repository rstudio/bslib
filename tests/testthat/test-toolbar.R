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
                shiny::actionButton("btn1", "Button 1"),
                align = "left"
            )
        )
    )

    # Toolbar with size options
    expect_snapshot(
        show_raw_html(
            toolbar(
                size = "md"
            )
        )
    )

    # Toolbar in card header
    expect_snapshot(
        show_raw_html(
            card(
                card_header(
                    "Card Title",
                    toolbar(
                        tags$button("Settings"),
                        align = "right",
                        size = "sm"
                    )
                ),
                card_body("Card content")
            )
        )
    )

    # Toolbar with Shiny inputs
    expect_snapshot(
        show_raw_html(
            toolbar(
                shiny::selectInput(
                    "select",
                    NULL,
                    choices = c("A", "B", "C"),
                    multiple = FALSE,
                    selectize = FALSE
                ),
                shiny::checkboxInput("check", "Check"),
                align = "right"
            )
        )
    )
})
