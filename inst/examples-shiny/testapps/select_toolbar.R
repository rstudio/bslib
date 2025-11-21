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
        actionButton(
          "edit",
          NULL,
          icon = icon("pencil"),
          class = "btn-sm border-0"
        ),
        toolbar_input_select(
          id = "select",
          choices = c("Option 1", "Option 2", "Option 3"),
          selected = "Option 2"
        ),
        toolbar_input_select(
          id = "select_state",
          choices = list(
            `East Coast` = list("NY", "NJ", "CT"),
            `West Coast` = list("WA", "OR", "CA"),
            `Midwest` = list("MN", "WI", "IA")
          ),
          selected = "NY"
        ),
        input_dark_mode(id = "togglesm", class = "btn-sm border-0")
      )
    ),
    p("Card 1 body"),
    sliderInput("slider", "Slider", 0, 10, 5),
    max_height = "500px",
    card_footer(
      toolbar(
        align = "left",
        toolbar_input_select(
          id = "select_footer",
          choices = c("A" = "a", "B" = "b", "C" = "c"),
          selected = "B"
        )
      )
    )
  ),
  toolbar(
    align = "right",
    actionButton("test", NULL, icon = icon("calendar"), class = "btn-sm"),
    actionButton("test2", NULL, icon = icon("pencil"), class = "btn-sm")
  )
)

server <- function(input, output) {}


shinyApp(ui = ui, server = server)
