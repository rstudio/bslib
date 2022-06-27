library(shiny)
library(bslib)

items <- lapply(LETTERS[1:2], function(x) {
  accordion_item(paste("Section", x), paste("Some narrative for section", x))
})

ui <- page_fluid(
  navs_pill_list(
    well = FALSE,
    nav("a", "A"),
    nav("b", "B"),
    nav_item(accordion(!!!items, id = "acc", autoclose = FALSE, class = "accordion-flush"))
  ),
  tags$ul(
    class = "list-group",
    tags$li(class="list-group-item", "some item"),
    tags$li(class="list-group-item", "another one"),
    accordion(!!!items)
  )
)

server <- function(input, output) {
  observe(print(input$acc))
}

shinyApp(ui, server)
