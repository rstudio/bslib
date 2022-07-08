library(shiny)
library(bslib)

ui <- page_fluid(
  htmlTemplate(
    "index.html"
  )
)

shinyApp(ui, function(input, output) {})
