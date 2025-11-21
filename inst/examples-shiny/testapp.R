library(shiny)
library(bslib)

ui <- page_fillable(
    tags$head(
        tags$link(rel = "stylesheet", type = "text/css", href = "styles.css")
    ),
    navset_card_tab(
        nav_panel(
            title = "One",
            p("Card 1 body"),
            sliderInput("slider", "Slider", 0, 10, 5),
            max_height = "500px",
            card_footer(
                checkboxInput("chkbox", "Checkbox"),
            )
        ),
        nav_panel(title = "Two", p("Second tab content.")),
        nav_panel(title = "Three", p("Third tab content")),
        nav_spacer(),
        nav_menu(
            title = "Links",
            nav_item("link_shiny"),
            nav_item("link_posit")
        )
    )
)


server <- function(input, output) {}


shinyApp(ui = ui, server = server)
