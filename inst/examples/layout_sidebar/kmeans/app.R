library(shiny)
library(bslib)
library(ggplot2)
library(thematic)
library(palmerpenguins)

thematic_shiny(font = font_spec("auto", scale = 1.5))
theme_set(theme_bw(base_size = 16))

#numeric_vars <- c(
#  "bill_length_mm",
#  "bill_depth_mm",
#  "flipper_length_mm",
#  "body_mass_g"
#)



side <-
  card(
    card_header("X marks the center of each cluster"),
    card_sidebar(
      sidebar = sidebar(
        selectInput("ycol", "Response variable", numeric_vars, selected = "body_mass_g"),
        selectInput("xcol", "Explanatory variable", numeric_vars, selected = "flipper_length_mm"),
        numericInput("clusters", "Number of clusters", min = 1, max = 10, value = 3)
      ),
      plotOutput("scatter")
    )
  )

ui <- page_navbar(
  theme = bs_theme(
    base_font = font_google("Jost"),
    primary = "#437597",
    secondary = "#C6FFF5"
  ),
  title = tags$span(
    tags$img(src = "palmer-penguins.png", height = "35px"),
    "Palmer Penguins"
  ),
  sidebar = sidebar(
    selectInput("island", "Island", unique(penguins_raw$Island), multiple = TRUE)
  ),
  nav(
    "Explore",
    "Coming soon"
  ),
  nav(
    "Model",
    "Very soon"
  )
)

server <- function(input, output, session) {

  input_data <- reactive({
    na.omit(penguins[, c(input$xcol, input$ycol)])
  })

  clusters <- reactive({
    kmeans(input_data(), input$clusters)
  })

  output$scatter <- renderPlot({

    d <- transform(
      input_data(),
      cluster = factor(clusters()$cluster)
    )

    ggplot(mapping = aes_string(input$xcol, input$ycol)) +
      geom_point(data = d, aes(color = cluster)) +
      geom_point(
        data = as.data.frame(clusters()$centers),
        size = 10,
        pch = 3
      ) +
      labs(x = NULL, y = NULL)
  })
}

shinyApp(ui, server)
