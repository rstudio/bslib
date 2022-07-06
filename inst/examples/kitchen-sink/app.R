# Do this every so often to get latest bslib stuff
# remotes::install_github("rstudio/bslib@dev")
# remotes::install_github("cpsievert/histoslider")
library(shiny)
library(bslib)
library(sass)
library(ggplot2)
library(plotly)
library(DT)
library(histoslider)
library(GGally)
library(viridis)


# TODO:
# * navs_pill_card() styles are off (Greg)
# * When items wrap, can we make them all wrap (and right align)?
sidebar <- accordion(
  class = "accordion-flush",
  accordion_item(
    "Foo", icon = icon("globe"),
    histoslider::input_histoslider("foo", NULL, rnorm(100))
  ),
  accordion_item(
    "Bar", icon = icon("globe"),
    histoslider::input_histoslider("bar", NULL, rnorm(100))
  )
)

main <- card_grid(
  card_width = 1/2,
  height = "500px",
  navs_tab_card(
    title = "Card with Tabs for Parameters",
    height = "500px",
    full_screen = TRUE,
    nav("Table", dataTableOutput("dt", height = "100%")),
    nav_menu(
      "Plots",
      nav("ggplot2", plotOutput("ggplot2", height = "100%")),
      nav("plotly", plotlyOutput("plotly", height = "100%")),
      nav("base", plotOutput("base", height = "100%")),
    )
  ),
  card(
    card_header("Some other table"),
    card_body(
      stretch = TRUE,
      dataTableOutput("dt2", height = "100%")
    )
  )
)

ui <- page_navbar(
  theme = bs_theme(),
  title = tags$span(
    tags$img(
      src = "shinyhex-white-test.png",
      style = "width:46px;height:auto;margin-right:24px;"
    ),
    "Shiny Demo"
  ),
  nav(
    "Sidebar Example (HTML)",
    layout_sidebar(sidebar, main, top = "70px")
  ),
  nav("Value Boxes (R)", "Coming soon")
)


server <- function(input, output) {

  p <- ggparcoord(
    iris,
    columns = 1:4, groupColumn = 5, order = "anyClass",
    showPoints = TRUE,
    alphaLines = 0.3
  ) +
    scale_color_viridis(discrete = TRUE) +
    theme_bw(base_size = 16)

  output$base <- renderPlot({
    hist(rnorm(100))
  })

  output$ggplot2 <- renderPlot(p)

  output$plotly <- renderPlotly({
    info <- getCurrentOutputInfo()
    plotly::ggplotly(p, height = info$height(), width = info$width())
  })

  output$dt <- renderDataTable({
    datatable(mtcars, fillContainer = TRUE)
  })

  output$dt2 <- renderDataTable({
    datatable(ggplot2::economics, fillContainer = TRUE)
  })

}

shinyApp(ui, server)
