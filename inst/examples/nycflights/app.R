library(shiny)
library(bslib)
library(dplyr)
library(plotly)
library(nycflights13)

# Data prep
flights <- flights %>%
  left_join(
    airports %>%
      transmute(dest_name = paste0(name, " (", faa, ")"), dest = faa, end_lat = lat, end_lon = lon)
  )
flights <- flights %>%
  left_join(
    airports %>% select(origin = faa, start_lat = lat, start_lon = lon)
  )
flights <- left_join(flights, airlines, by = "carrier") %>%
  rename(carrier_name = name)
flights <- left_join(flights, weather)


precip <- range(weather$precip)
wind_speed <- range(weather$wind_speed, na.rm = TRUE)
wind_gust <- range(weather$wind_gust, na.rm = TRUE)

side <- accordion(
  selected = c("Origin", "Destination", "Carrier"),
  # TODO GREG: make this "just work" inside of layout_sidebar()
  class = "accordion-flush",
  accordion_item(
    "Origin", icon = icon("plane-departure"),
    input_radio_buttons("origin", c("JFK", "LGA", "EWR"))
  ),
  accordion_item(
    "Destination", icon = icon("plane-arrival"),
    input_check_search("dest", sort(unique(flights$dest_name)))
  ),
  accordion_item(
    "Carrier", icon = icon("user-tie"),
    input_check_search("carrier", unique(flights$carrier_name))
  ),
  accordion_item(
    "Weather", icon = icon("cloud-rain"),
    input_slider("precip", "Precipation", precip),
    input_slider("wind_speed", "Wind speed", wind_speed),
    input_slider("wind_gust", "Wind gust", wind_gust)
  ),
  accordion_item(
    "Plane info", icon = icon("plane"),
    "Maybe not that interesting"
  )
)


arr_delay_card <- card(
  card_header("Arrival delay (in minutes)"),
  card_body(padding = 0, plotlyOutput("arr_delay"))
)

dep_delay_card <- card(
  card_header("Departure delay (in minutes)"),
  card_body(padding = 0, plotlyOutput("dep_delay"))
)

flights_card <- card(
  card_header("Flight paths"),
  card_body(padding = 0, plotlyOutput("flight_paths")),
  card_footer("Marker areas are proportional to mean arrival delay")
)

main <- tagList(
  fluidRow(column(6, arr_delay_card), column(6, dep_delay_card)),
  fluidRow(column(12, flights_card))
)


shinyApp(
  page_navbar(
    theme = bs_theme(
      font_base = font_google("Open Sans"),
      "accordion-button-active-bg" = "white",
      "accordion-button-active-color" = "black"
    ),
    title = "NYC Flights",
    fluid = TRUE,
    nav("Sidebar", layout_sidebar(side, main)),
    nav("Value Boxes", "Coming soon")
  ),
  function(input, output) {

    dests <- reactive({
      input$dest %||% unique(flights$dest_name)
    })

    carriers <- reactive({
      input$carrier %||% unique(flights$carrier_name)
    })

    # TODO: filter by more controls!
    flight_dat <- reactive({
      flights %>%
        filter(
          origin %in% input$origin,
          dest_name %in% dests(),
          carrier_name %in% carriers()
        )
    })

    output$arr_delay <- renderPlotly({
      plot_delay(flight_dat()$arr_delay)
    })

    output$dep_delay <- renderPlotly({
      plot_delay(flight_dat()$dep_delay)
    })

    output$flight_paths <- renderPlotly({
      flight_dat() %>%
        # TODO: maybe scale the width/marker area to the arrival delay?
        group_by(start_lon, start_lat, end_lon, end_lat, origin, dest) %>%
        summarise(mean_delay = mean(arr_delay, na.rm = TRUE)) %>%
        plot_geo(color = I("#0D6EFD"), showlegend = FALSE) %>%
        add_segments(
          x = ~start_lon, xend = ~end_lon,
          y = ~start_lat, yend = ~end_lat,
          alpha = 0.5, size = I(1), hoverinfo = "none"
        ) %>%
        add_markers(
          x = ~end_lon, y = ~end_lat, size = ~mean_delay,
          hoverinfo = "text", alpha = 0.1,
          text = ~paste0(
            origin, " -> ", dest, "<br>",
            "Average delay: ", round(mean_delay, 1)
          )
        ) %>%
        config(displayModeBar = FALSE) %>%
        layout(
          geo = list(
            projection = list(
              type = 'orthographic',
              rotation = list(lon = -100, lat = 40, roll = 0)
            ),
            showland = TRUE,
            landcolor = toRGB("gray95"),
            countrycolor = toRGB("gray80")
          )
        )
    })
  }
)
