library(shiny)
library(bslib)
library(plotly)
library(leaflet)
library(DT)
library(gt)

theme_set(theme_minimal(base_size = 16))
thematic::thematic_shiny()

card_ui <- function(outputFunc = plotOutput) {
  nm <- deparse(substitute(outputFunc))
  output_func <- function(id, ...) {
    outputFunc(paste0(nm, id), ...)
  }

  layout_column_wrap(
    width = 1/3,
    heights_equal = "row",
    height = "calc(100vh - 80px)",
    card(
      full_screen = TRUE,
      card_header("Single output"),
      card_body_fill(output_func("1")),
      p("some text")
    ),
    card(
      full_screen = TRUE,
      card_header("Multiple rows of stretchy output"),
      card_body_fill(
        output_func("2"),
        output_func("3")
      ),
      p("Some other text")
    ),
    card(
      full_screen = TRUE,
      wrapper = card_body_fill,
      card_header("Multiple columns of stretchy output"),
      layout_column_wrap(
        1/2,
        output_func("4"),
        output_func("5")
      ),
      output_func("6")
    ),
    card(
      full_screen = TRUE,
      card_header("Shiny devs"),
      tags$p("Current status"),
      tags$ul(
        tags$li("Carson"),
        tags$li("Barret"),
      )
    )
  )
}

ui_output <- function(...) uiOutput(..., fill = TRUE)

ui <- page_navbar(
  title = "Card body layout with multiple outputs",
  theme = bslib::bs_theme(bg = "black", fg = "white"),
  nav("Base", card_ui(plotOutput)),
  nav("Plotly", card_ui(plotlyOutput)),
  nav("Leaflet", card_ui(ui_output)),
  nav("DT", card_ui(dataTableOutput)),
  nav("gt", card_ui(gt_output))
)

server <- function(input, output, session) {

  output$p2 <- renderPlotly(plot_ly())

  lapply(1:10, function(i) {
    output[[paste0("plotOutput", i)]] <- renderPlot(qplot(x = 1:10) + labs(x = "x label", y = "y label"))
    output[[paste0("plotlyOutput", i)]] <- renderPlotly(plot_ly(x = rnorm(100), type = "histogram"))
    output[[paste0("ui_output", i)]] <- renderUI({
      leaflet() %>%
        addTiles() %>%
        fitBounds(0, 40, 10, 50) %>%
        setView(-93.65, 42.0285, zoom = 17) %>%
        addPopups(-93.65, 42.0285, "Here is the <b>Department of Statistics</b>, ISU")
    })
    output[[paste0("dataTableOutput", i)]] <- renderDataTable(datatable(mtcars, fillContainer = F))
    output[[paste0("gt_output", i)]] <- render_gt(gt(mtcars[1:5, ]))
  })

}

shinyApp(ui, server)
