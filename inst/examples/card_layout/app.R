library(shiny)
library(bslib)
library(plotly)
library(leaflet)
library(DT)

card_ui <- function(outputFunc = plotOutput) {
  nm <- deparse(substitute(outputFunc))
  output_func <- function(id) {
    outputFunc(paste0(nm, id))
  }
  tagList(
    card(
      height = "250px",
      full_screen = TRUE,
      card_header("Singular stretchy output"),
      card_body_stretch(output_func("1"))
    ),
    card(
      height = "500px",
      full_screen = TRUE,
      card_header("Multiple rows of stretchy output"),
      card_body_stretch(output_func("2")),
      card_body_stretch(output_func("3"), class = "px-5")
    ),
    card(
      height = "300px",
      full_screen = TRUE,
      card_header("Multiple columns of stretchy output"),
      card_body_inline(
        stretch = TRUE,
        card_body_stretch(output_func("4")),
        card_body_stretch(output_func("5"))
      )
    ),
    card(
      height = "700px",
      full_screen = TRUE,
      card_header("Multiple rows and columns of stretchy output"),
      card_body_stretch(output_func("6")),
      card_body_inline(
        stretch = TRUE,
        card_body_stretch(output_func("7")),
        card_body_stretch(output_func("8"))
      ),
      card_body_stretch(output_func("9"))
    )
  )
}

ui <- page_navbar(
  title = "Card body layout with multiple outputs",
  theme = bslib::bs_theme(bg = "black", fg = "white"),
  nav("Base", card_ui(plotOutput)),
  nav("Plotly", card_ui(plotlyOutput)),
  nav("Leaflet", card_ui(leafletOutput)),
  nav("DT", card_ui(dataTableOutput))
)

server <- function(input, output, session) {

  output$p2 <- renderPlotly(plot_ly())

  lapply(1:9, function(i) {
    output[[paste0("plotOutput", i)]] <- renderPlot(hist(rnorm(100)))
    output[[paste0("plotlyOutput", i)]] <- renderPlotly(plot_ly(x = rnorm(100), type = "histogram"))
    output[[paste0("leafletOutput", i)]] <- renderLeaflet(addTiles(leaflet()))
    output[[paste0("dataTableOutput", i)]] <- renderDataTable(datatable(mtcars))
  })

}

shinyApp(ui, server)
