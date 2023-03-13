library(shiny)
library(bslib)
library(plotly)

side <- sidebar(
  id = "sidebar",
  selectInput("var", "Choose a variable", names(diamonds))
)

ui <- page_navbar(
  title = "All the Sidebars!!",
  fill = "Fill",
  id = "navbar",
  sidebar = side,
  footer = actionButton("toggle", "Toggle sidebar"),
  nav("Basic", plotlyOutput("p1")),
  nav("Fill", plotlyOutput("p2"))
)


server <- function(input, output, session) {
  output$p1 <- renderPlotly({
    plot_ly(x = diamonds[[input$var]])
  })
  output$p2 <- renderPlotly({
    plot_ly(x = diamonds[[input$var]])
  })

  observeEvent(input$toggle, ignoreInit = TRUE, {
    if (input$sidebar) {
      sidebar_close("sidebar")
    } else {
      sidebar_open("sidebar")
    }
  })

}

shinyApp(ui, server)
