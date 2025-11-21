library(shiny)
library(bslib)

ui <- page_fillable(
    tags$head(
        tags$link(rel = "stylesheet", type = "text/css", href = "styles.css")
    ),
    card(
        card_header(
            "Card 1 header",
            toolbar(
                align = "right",
                size = "md",
                selectInput(
                    "select",
                    NULL,
                    choices = c("Option 1", "Option 2", "Option 3"),
                    selected = "Option 2",
                ),
                downloadLink(
                    "download",
                    "Download",
                    class = "btn-sm"
                ),
                actionButton(
                    "test_btn",
                    NULL,
                    label = "Click me",
                    class = "btn-sm"
                ),
                actionButton(
                    "edit_btn",
                    NULL,
                    icon = icon("pencil"),
                    class = "btn-sm"
                )
            )
        ),
        p("Card 1 body"),
        sliderInput("slider", "Slider", 0, 10, 5),
        max_height = "500px",
        card_footer(
            toolbar(
                checkboxInput("chkbox", "Checkbox"),
                align = "left"
            )
        )
    )
)

server <- function(input, output) {}

shinyApp(ui = ui, server = server)
