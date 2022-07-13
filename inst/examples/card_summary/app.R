library(shiny)
library(bslib)
library(plotly)

#thematic::thematic_shiny()

ui <- page_fluid(
  theme = bslib::bs_theme(base_font = font_google("Open Sans")),
  uiOutput("info_boxes")
)

server <- function(input, output) {

  output$info_boxes <- renderUI({

    info1 <- card_summary(
      card_title("Unemployment Rate"),
      card_body_showcase(
        height = "20px",
        plotlyOutput("unemploy"),
        tags$span(icon("arrow-up"), "FROM 1.5% TO 2.7%"),
        "AVERAGED 3%"
      ),
      icon = icon("briefcase"),
      full_screen = TRUE
    )

    info2 <- card_summary(
      "From 1967 to 2015, the",
      card_title("Personal Savings Rate"),
      card_body_showcase(
        height = "20px",
        plotlyOutput("psavert"),
        tags$span(icon("arrow-down"), "FROM 12.6% TO 7.6%"),
        "AVERAGED 8.6%",
        "FOO BAR"
      ),
      icon = icon("money-bill-alt"),
      #icon_layout = "left-center",
      full_screen = TRUE,
      class = "bg-success",
    )

    info3 <- card_summary(
      #"From 1967 to 2015, the",
      card_title("Personal Consumption"),
      card_body_showcase(
        height = "20px",
        plotlyOutput("pce"),
        tags$span(icon("arrow-up"), " FROM $2,550 TO $38,000")
      ),
      icon = icon("cash-register"),
      full_screen = TRUE,
      class = "bg-danger"
    )

    card_grid(card_width = "200px", info1, info2, info3)
  })

  output$unemploy <- renderPlotly({
    plotly_time_series(economics, x = ~date, y = ~unemploy / pop)
  })

  output$psavert <- renderPlotly({
    plotly_time_series(economics, x = ~date, y = ~psavert)
  })

  output$pce <- renderPlotly({
    plotly_time_series(economics, x = ~date, y = ~pce / pop)
  })

  plotly_time_series <- function(d, x, y) {
    info <- getCurrentOutputInfo()
    large <- isTRUE(info$height() > 200)

    plot_ly(d, x = x, y = y) %>%
      add_lines(
        color = I(info$fg()),
        hoverinfo = if (!large) "none",
        fill = 'tozeroy'
      ) %>%
      layout(
        hovermode = "x",
        font = list(color = info$fg()),
        margin = list(t = 0, r = 0, l = 0, b = 0),
        xaxis = list(
          visible = large, title = "", showgrid = FALSE
        ),
        yaxis = list(
          visible = large, title = "", showgrid = FALSE
        ),
        paper_bgcolor = "transparent",
        plot_bgcolor = "transparent"
      ) %>%
      config(displayModeBar = FALSE)
  }
}

shinyApp(ui, server)
