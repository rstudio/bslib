library(shiny)
library(bootstraplib)

# TODO: Add pills, renderPlot() autocolors, more inputs, progress, etc
ui <- navbarPage(
  header = bootstraplib::bootstrap(),
  "Theming demo app",
  tabPanel(
    "Navbar 1",
    sidebarLayout(
      sidebarPanel(
        fileInput("file", "File input:"),
        textInput("txt", "Text input:", "general"),
        sliderInput("slider", "Slider input:", 1, 100, 30),
        tags$h5("Default actionButton:"),
        actionButton("action", "Search"),

        tags$h5("actionButton with CSS class:"),
        actionButton("action2", "Action button", class = "btn-primary")
      ),
      mainPanel(
        tabsetPanel(
          tabPanel("Tab 1",
                   h4("Table"),
                   tableOutput("table"),
                   h4("Verbatim text output"),
                   verbatimTextOutput("txtout"),
                   h1("Header 1"),
                   h2("Header 2"),
                   h3("Header 3"),
                   h4("Header 4"),
                   h5("Header 5")
          ),
          tabPanel("Tab 2", "This panel is intentionally left blank"),
          tabPanel("Tab 3", "This panel is intentionally left blank")
        )
      )
    )
  ),
  tabPanel("Navbar 2", "This panel is intentionally left blank"),
  tabPanel("Navbar 3", "This panel is intentionally left blank")
)

#ui[[3]] <- tagAppendAttributes(ui[[3]], class = "bg-primary")

shinyApp(
  ui = ui,
  server = function(input, output, session) {
    output$txtout <- renderText({
      paste(input$txt, input$slider, format(input$date), sep = ", ")
    })
    output$table <- renderTable({
      head(cars, 4)
    })
  }
)
