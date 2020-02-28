library(shiny)
library(ggplot2)
library(bootstraplib)

shinyOptions(plot.autotheme = TRUE)

tabPanel <- function(...) {
  shiny::tabPanel(..., class = "p-3 border rounded")
}

# TODO: Add pills, renderPlot() autocolors, more inputs, progress, etc
ui <- navbarPage(
  header = bootstraplib::bootstrap(),
  "Theming demo app",
  tabPanel(
    "Main page",
    sidebarLayout(
      sidebarPanel(
        fileInput("file", "fileInput():", placeholder = "upload something..."),
        textInput("text", "textInput():", placeholder = "type something..."),
        selectizeInput(
          "selectize", "selectizeInput():", multiple = TRUE,
          choices = c('Choose something...' = '', state.name)
        ),
        dateRangeInput("dateRange", "dateRangeInput():"),
        p("actionButton():"),
        actionButton("primary", "Primary", icon("product-hunt"), class = "btn-primary"),
        actionButton("secondary", "Secondary (default)"),
        actionButton("success", "Success", icon("check"), class = "btn-success"),
        actionButton("info", "Info", icon("info"),  class = "btn-info"),
        actionButton("warning", "warning", icon("exclamation"), class = "btn-warning"),
        actionButton("danger", "Danger", icon("exclamation-triangle"), class = "btn-danger"),
        sliderInput("slider", "sliderInput():", min = 0, max = 100, value = 30),
        numericInput("numeric", "numericInput():", value = 0),
        checkboxInput("checkbox", "checkboxInput():", value = FALSE),
        checkboxGroupInput("checkboxGroup", "checkboxGroupInput():", c("A", "B", "C"))
      ),
      mainPanel(
        tabsetPanel(type= "pills",
          tabPanel("Tables", DT::dataTableOutput("dt_table")),
          tabPanel("Plots", plotOutput("ggplot")),
          tabPanel(
            "Typography",
              h4("Verbatim text output"),
              verbatimTextOutput("txtout"),
              h1("Header 1"),
              h2("Header 2"),
              h3("Header 3"),
              h4("Header 4"),
              h5("Header 5")
          )
        )
      )
    )
  ),
  tabPanel("About", "This panel is intentionally left blank")
)

shinyApp(
  ui = ui,
  server = function(input, output, session) {
    output$dt_table <- DT::renderDataTable(mtcars)
    output$ggplot <- renderPlot({
      d <- diamonds[sample(nrow(diamonds), 500), ]
      ggplot(diamonds, aes(carat, price)) +
        geom_point(alpha = 0.2) +
        geom_smooth() +
        facet_wrap(~cut) +
        ggtitle("Diamond price by carat and cut")
    })
    output$txtout <- renderPrint(input$txt)
  }
)
