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
        size = "sm",
        input_switch("check", "Pick me!"),
      )
    ),
    p("Card 1 body"),
    sliderInput("slider", "Slider", 0, 10, 5),
    max_height = "500px",
    card_footer()
  ),
  toolbar(
    align = "left",
    actionButton("test", NULL, icon = icon("calendar"))
  )
)

server <- function(input, output) {
  observe({
    print(input$bgc)
  })
}


shinyApp(ui = ui, server = server)
