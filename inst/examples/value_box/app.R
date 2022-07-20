library(shiny)
library(bslib)
library(bsicons)
library(plotly)

ui <- page_fluid(
  theme = bslib::bs_theme(
    base_font = font_google("Open Sans")
  ),
  uiOutput("info_boxes")
)

server <- function(input, output) {

  output$info_boxes <- renderUI({

    info1 <- value_box(
      title = "Unemployment Rate",
      value = "2.7%",
      "Started at 1.5%",
      "Averaged 3% over that period",
      "Peaked at 5.2% in Dec 1982",
      showcase = plotlyOutput("unemploy", height = "50px", width = "100px"),
      full_screen = TRUE
    )

    info2 <- value_box(
      "Personal Savings Rate",
      "7.6%",
      "Started at 12.6%",
      "Averaged 8.6% over that period",
      "Peaked 15% in Feb 1992",
      showcase = plotlyOutput("psavert", height = "50px", width = "100px"),
      showcase_layout = "left-center",
      full_screen = TRUE,
      class = "bg-success"
    )

    info3 <- value_box(
      "Personal Consumption",
      "7.6%",
      "Started at 12.6%",
      "Averaged 8.6% over that period",
      "Peaked 15% in Feb 1992",
      showcase = bsicons::bs_icon("piggy-bank"),
      showcase_layout = "left-center",
      #full_screen = TRUE,
      class = "bg-danger"
    )

    card_grid(card_width = "200px", info1, info2, info3)
  })

  output$unemploy <- renderPlotly({
    plotly_time_series(
      economics, x = ~date, y = ~100 * unemploy / pop
    )
  })

  output$psavert <- renderPlotly({
    plotly_time_series(
      economics, x = ~date, y = ~ 100 * psavert
    )
  })

  output$pce <- renderPlotly({
    plotly_time_series(
      economics, x = ~date, y = ~ 100 * pce / pop
    )
  })

  plotly_time_series <- function(d, x, y) {
    info <- getCurrentOutputInfo()
    large <- isTRUE(info$height() > 200)

    plot_ly(d, x = x, y = y) %>%
      add_lines(
        color = I(info$fg()),
        span = I(1),
        #hoverinfo = if (!large) "none",
        fill = 'tozeroy',
        alpha = 0.2
      ) %>%
      layout(
        hovermode = "x",
        margin = list(t = 0, r = 0, l = 0, b = 0),
        font = list(color = info$fg()),
        paper_bgcolor = "transparent",
        plot_bgcolor = "transparent",
        xaxis = list(
          title = "",
          visible = large,
          showgrid = FALSE
        ),
        yaxis = list(
          title = "",
          visible = large,
          showgrid = FALSE
        )
      ) %>%
      config(displayModeBar = FALSE)
  }
}

shinyApp(ui, server)
