library(shiny)
library(bslib)

ui <- page_fillable(
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "styles.css")
  ),
  card(
    card_header(
      icon("star"),
      "Card 1 header",
      toolbar(
        align = "right",
        actionButton("go", label = "Go", class = "btn-sm"),
        actionButton(
          "edit",
          NULL,
          icon = icon("pencil"),
          class = "btn-sm"
        ),
        actionButton(
          "calendar",
          label = "Schedule",
          icon = icon("calendar"),
          class = "btn-sm"
        )
      )
    ),
    p("Card 1 body"),
    sliderInput("slider", "Slider", 0, 10, 5),
    max_height = "500px",
    card_footer(
      toolbar(
        align = "left",
        actionButton(
          "paragraph",
          NULL,
          icon = icon("paragraph"),
          class = "btn-sm"
        )
      ),
    )
  ),
  toolbar(
    align = "left",
    actionButton("test2", NULL, icon = icon("star"), class = "btn-sm"),
    actionButton("love2", NULL, icon = icon("heart"), class = "btn-sm"),
    actionButton("comment2", NULL, icon = icon("comment"), class = "btn-sm")
  ),
  card(
    card_header(
      "Card 2 header",
    ),
    p("Card 2 body"),
    sliderInput("slider2", "Slider", 0, 10, 5),
    max_height = "500px",
    card_footer(
      toolbar(
        align = "right",
        actionButton(
          "paragraph2",
          NULL,
          icon = icon("paragraph"),
          class = "btn-sm"
        )
      )
    )
  ),
  toolbar(
    align = "left",
    actionButton("test", NULL, icon = icon("star"), class = "btn-sm"),
    actionButton("love", NULL, icon = icon("heart"), class = "btn-sm"),
    actionButton("comment", NULL, icon = icon("comment"), class = "btn-sm")
  ),
)

server <- function(input, output) {}


shinyApp(ui = ui, server = server)
