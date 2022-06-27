library(bslib)
library(shiny)
library(htmltools)
library(plotly)

lorem_ipsum_dolor_sit_amet <- "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl. Adipiscing at in tellus integer feugiat. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Cursus sit amet dictum sit amet justo. Sit amet consectetur adipiscing elit. Vestibulum mattis ullamcorper velit sed ullamcorper. Enim facilisis gravida neque convallis a. Elit duis tristique sollicitudin nibh sit amet. Magna eget est lorem ipsum. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Mauris in aliquam sem fringilla ut morbi. Id semper risus in hendrerit gravida rutrum quisque non tellus. At erat pellentesque adipiscing commodo elit at imperdiet dui. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Duis convallis convallis tellus id interdum velit laoreet id. Aliquet lectus proin nibh nisl. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Bibendum enim facilisis gravida neque convallis a."



ui <- page_fluid(
  card(
    class = "w-auto",
    # TODO: headers and footers should have .d-flex?
    card_header(
      "Now showing chart",
      selectInput("chart", NULL, c("a", "b", "c"), width = "fit-content", selectize = FALSE),
      "; isn't that neat?",
      "Now see",
      selectInput("chart", NULL, c("a", "b", "c"), width = "fit-content"),
      "!",
      class = "d-flex justify-content-center align-items-center lead",
      style = "gap: 0.5rem"
    ),
    card_body(padding = NULL, plotlyOutput("p", height = 250)),
    card_footer(
      "This is the footer", class = "text-muted d-flex justify-content-end"
    )
  )
)

server <- function(input, output) {
  output$p <- renderPlotly({
    plot_ly()
  })
}

shinyApp(ui, server)
