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
        toolbar_input_button(id = "see", icon = icon("eye")),
        toolbar_input_button(id = "save", icon = icon("save")),
        toolbar_input_button(id = "edit", icon = icon("pencil")),
        toolbar_input_button(
          id = "calendar",
          label = "Schedule",
          icon = icon("calendar"),
          disabled = TRUE
        )
      )
    ),
    p("Card 1 body"),
    actionButton("activate_schedule", "Activate Schedule"),
    max_height = "500px",
    card_footer(
      toolbar(
        align = "left",
        toolbar_input_button(id = "go", label = "Go"),
        toolbar_input_button(id = "Exit", label = "Exit")
      )
    )
  ),
  toolbar(
    align = "left",
    toolbar_input_button(
      id = "test2",
      icon = icon("star"),
      tooltip = "Favorite"
    ),
    toolbar_input_button(id = "love2", icon = icon("heart"), tooltip = "Like"),
    toolbar_input_button(
      id = "comment2",
      icon = icon("comment"),
      tooltip = "Comment"
    )
  ),
  card(
    card_header(
      "Card 2 header",
      toolbar(
        align = "right",
        downloadLink(
          "download2",
          "Download",
        )
      ),
    ),
    p("Card 2 body"),
    actionButton("activate_schedule2", "Activate Schedule"),
    max_height = "500px",
    card_footer(
      toolbar(
        align = "right",
        toolbar_input_button(
          id = "paragraph2",
          icon = icon("paragraph")
        )
      )
    )
  ),
  toolbar(
    align = "left",
    gap = "10",
    toolbar_input_button(id = "test", icon = icon("star")),
    toolbar_input_button(id = "love", icon = icon("heart")),
    toolbar_input_button(id = "comment", icon = icon("comment"))
  )
)

server <- function(input, output) {
  observeEvent(input$activate_schedule, {
    updateActionButton(
      inputId = "calendar",
      disabled = FALSE
    )
  })
}


shinyApp(ui = ui, server = server)
