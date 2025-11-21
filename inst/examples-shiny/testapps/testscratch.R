library(shiny)
library(bslib)

ui <- page_fillable(
    tags$head(
        tags$link(rel = "stylesheet", type = "text/css", href = "styles.css")
    ),
    card(
        card_header(
            tags$nav(
                class = "nav",
                icon("star"),
                "Card 1 header",
                nav_spacer(),
                actionButton("go", "Go", class = "btn-sm"),
                actionButton("edit", "Edit", class = "btn-sm"),
            ),
            actionButton("Test", "test", class = "btn-sm"),
        ),
        p("Card 1 body"),
        sliderInput("slider", "Slider", 0, 10, 5),
        max_height = "500px",
        card_footer(
            p(
                "lots of text here, texting text, real text that makes you think, text that texts, but doesn't text
            because it does not possess fingers, text that sits on the page and doesn't really do more than that,
            text that thwarts autocomplete because it is unexpected. Text."
            )
        ),
    )
)

server <- function(input, output) {}


shinyApp(ui = ui, server = server)
