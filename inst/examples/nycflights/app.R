# remotes::install_github("rstudio/bslib")
# remotes::install_github("rstudio/bsicons")
# remotes::install_github("cpsievert/histoslider")
library(shiny)
library(bslib)
library(dplyr)
library(plotly)
library(nycflights13)
library(histoslider)

# Data prep
flights <- flights %>%
  left_join(
    airports %>%
      transmute(dest_name = paste0(name, " (", faa, ")"), dest = faa, end_lat = lat, end_lon = lon)
  ) %>%
  left_join(
    airports %>% select(origin = faa, start_lat = lat, start_lon = lon)
  ) %>%
  left_join(airlines, by = "carrier") %>%
  rename(carrier_name = name) %>%
  left_join(weather) %>%
  mutate(
    # The overwhelming majority of precipation is 0 so transform
    # with some help from MASS::boxcox() https://stats.stackexchange.com/a/1452/48604
    precip = scales::rescale(precip^-1.55/-.55),
    date = lubridate::ymd(paste(year, month, day, sep = "-"))
  )

side <- accordion(
  selected = c("Origin", "Destination"),
  # TODO GREG: make this "just work" inside of layout_sidebar()
  class = "accordion-flush",
  accordion_item(
    "Origin", icon = icon("plane-departure"),
    input_check_buttons("origin", c("JFK", "LGA", "EWR"), selected = I("none"))
  ),
  accordion_item(
    "Destination", icon = icon("plane-arrival"),
    input_check_search(
      "dest", sort(unique(flights$dest_name)),
      width = "100%"
    )
  ),
  accordion_item(
    "Carrier", icon = icon("user-tie"),
    input_check_search(
      "carrier", unique(flights$carrier_name),
      width = "100%"
    )
  ),
  accordion_item(
    "Flight time", icon = icon("clock"),
    input_histoslider(
      "sched_dep_time", "Departure time",
      flights$sched_dep_time, height = 125,
      options = list(handleLabelFormat = "0d")
    ),
    input_histoslider(
      "sched_arr_time", "Arrival time",
      flights$sched_arr_time, height = 125,
      options = list(handleLabelFormat = "0d")
    ),
    input_histoslider(
      "date", "Date",
      flights$date, height = 125, breaks = "months",
      options = list(handleLabelFormat = "%b %e")
    )
  ),
  accordion_item(
    "Weather", icon = icon("cloud-rain"),
    input_histoslider(
      "precip", "Precipitation",
      flights$precip, height = 125
    ),
    input_histoslider(
      "wind_speed", "Wind speed",
      flights$wind_speed, height = 125
    ),
    input_histoslider(
      "wind_gust", "Wind gust",
      flights$wind_gust, height = 125
    )
  )
)


flights_card <- card(
  card_header("Flight paths"),
  card_body(
    stretch = TRUE,
    padding = 0,
    plotlyOutput("flight_paths", height = "100%")
  ),
  card_footer("Marker areas are proportional to mean arrival delay"),
  height = "375px",
  full_screen = TRUE
)

delay_corr_card <- card(
  card_header(
    "Arrival vs departure delay",
    input_switch("scatter_summarize", "Summarize", TRUE),
    class = "d-flex justify-content-between"
  ),
  card_body(
    stretch = TRUE,
    plotlyOutput("scatter_delay", height = "100%")
  ),
  height = "375px",
  full_screen = TRUE
)

delay_card <- navs_tab_card(
  title = "Arrival delay",
  stretch = TRUE,
  full_screen = TRUE,
  height = "400px",
  nav(
    "Overall",
    plotlyOutput("arr_delay", height = "100%")
  ),
  nav(
    "Over time",
    plotlyOutput("arr_delay_series", height = "100%")
  )
)

main <- tagList(
  uiOutput("value_boxes"),
  br(),
  fluidRow(
    column(6, flights_card), column(6, delay_corr_card)
  ),
  br(),
  fluidRow(column(12, delay_card))
  # TODO: this doesn't work will full_screen = TRUE
  #card_grid(
  #  card_width = 1/2, style = "height: 375px",
  #  flights_card, delay_corr_card
  #),
  #br(),
  #card_grid(
  #  card_width = 1, style = "height: 400px",
  #  delay_card
  #)
)


ui <- page_navbar(
  theme = bs_theme(
    font_base = font_google("Open Sans"),
    "accordion-button-active-bg" = "white",
    "accordion-button-active-color" = "black"
  ),
  title = "NYC Flights",
  fluid = TRUE,
  nav("Delays", layout_sidebar(side, main)),
  nav_spacer(),
  nav_item(
    tags$a(
      tags$span(
        bsicons::bs_icon("code-slash"), "Source code"
      ),
      href = "https://github.com/rstudio/bslib/tree/main/inst/examples/nycflights",
      target = "_blank"
    )
  )
)

server <- function(input, output, session) {

  origin <- reactive({
    input$origin %||% unique(flights$origin)
  })

  dests <- reactive({
    print(input$dest)
    input$dest %||% unique(flights$dest_name)
  })

  carriers <- reactive({
    input$carrier %||% unique(flights$carrier_name)
  })

  # N.B. between() will remove NAs, which we probably don't
  # want to remove until the slider is considered 'active'
  filter_if_active <- function(d, var, input_var) {
    rng <- summarise(d, range({{ var }}, na.rm = TRUE))[[1]]
    active <- isTRUE(rng[1] <= input_var[1] || input_var[2] <= rng[2])
    if (active) {
      d <- filter(d, between({{ var }}, input_var[1], input_var[2]))
    }
    d
  }

  # TODO: filter by more controls!
  flight_dat <- reactive({

    d <- flights %>%
      filter(
        origin %in% origin(),
        dest_name %in% dests(),
        carrier_name %in% carriers()
      )

    d <- filter_if_active(d, sched_dep_time, input$sched_dep_time)
    d <- filter_if_active(d, sched_arr_time, input$sched_arr_time)
    # TODO: histoslider to transform date back to a date vector
    d <- filter_if_active(d, as.POSIXct(date), as.POSIXct(input$date / 1000, origin = "1970-01-01"))
    d <- filter_if_active(d, precip, input$precip)
    d <- filter_if_active(d, wind_gust, input$wind_gust)
    filter_if_active(d, wind_speed, input$wind_speed)
  })

  output$value_boxes <- renderUI({
    d <- flight_dat()
    n_flights <- value_box(
      "A total of",
      paste(nrow(d), "flights"),
      paste(
        "Across", length(unique(d$dest_name)),
        "destinations"
      ),
      paste(
        "On", length(unique(d$carrier_name)), "different carriers"
      ),
      showcase = bsicons::bs_icon("airplane")
    )

    delay_dep <- value_box(
      HTML("On average, they <b>depart</b>"),
      paste(
        round(mean(d$dep_delay, na.rm = T), 0),
        "mins late"
      ),
      paste0(
        round(100 * sum(d$dep_delay > 0, na.rm = T) / nrow(d), 1),
        "% of flights depart late"
      ),
      style = "background: var(--bs-orange) !important",
      showcase = bsicons::bs_icon("hourglass-split")
    )

    delay_arr <- value_box(
      HTML("On average, they <b>arrive</b>"),
      paste(
        round(mean(d$arr_delay, na.rm = T), 0),
        "mins late"
      ),
      paste0(
        round(100 * sum(d$arr_delay > 0, na.rm = TRUE) / nrow(d), 1),
        "% of flights arrive late"
      ),
      style = "background: var(--bs-orange) !important",
      showcase = bsicons::bs_icon("hourglass-bottom")
    )

    card_grid(card_width = 1/3, n_flights, delay_dep, delay_arr)
  })

  output$flight_paths <- renderPlotly({
    flight_dat() %>%
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

  output$scatter_delay <- renderPlotly({
    d <- flight_dat()

    if (isTRUE(input$scatter_summarize)) {
      p <- plot_ly() %>%
        add_histogram2dcontour(
          data = d,
          x = ~dep_delay,
          y = ~arr_delay,
          hovertemplate = "Number of flights: %{z}<extra></extra>"
        ) %>%
        layout(
          xaxis = list(title = "Departure delay", range = c(-30, 100)),
          yaxis = list(title = "Arrival delay", range = c(-50, 100))
        ) %>%
        colorbar(title = "Number of flights", y = 0.5, yanchor = "middle")

      return(p)
    }

    m <- loess(arr_delay~dep_delay, data = d)
    rng <- range(d$dep_delay, na.rm = TRUE)
    grid <- data.frame(
      dep_delay = seq(rng[1], rng[2], length = 100)
    )
    grid <- modelr::add_predictions(grid, m)

    plot_ly() %>%
      add_markers(
        data = d,
        x = ~dep_delay,
        y = ~arr_delay,
        stroke = I("#2D7DC2"),
        color = I("transparent"),
        span = I(1),
        text = ~paste0(
          origin, " -> ",
          substr(dest_name, nchar(dest_name) - 3, nchar(dest_name) - 1), "\n",
          carrier_name, "\n",
          "Arrival: ", arr_delay, "\n",
          "Departure: ", dep_delay, "\n"
        ),
        hoverinfo = "text",
        name = "Flights"
      ) %>%
      add_lines(
        data = grid,
        x = ~dep_delay,
        y = ~pred,
        text = ~paste0("Given a departure delay of ", round(dep_delay), "\n expect an arrival delay of ", round(pred)),
        hoverinfo = "text",
        name = "Predicted"
      ) %>%
      layout(
        legend = list(
          orientation = "h",
          x = 0.1, xanchor = "left",
          y = 0.95, yanchor = "top",
          bgcolor = "transparent"
        ),
        xaxis = list(title = "Departure delay"),
        yaxis = list(title = "Arrival delay")
      ) %>%
      toWebGL()
  })


  output$arr_delay <- renderPlotly({
    plot_delay(flight_dat()$arr_delay)
  })

  output$arr_delay_series <- renderPlotly({
    flight_dat() %>%
      group_by(date) %>%
      summarise(arr_delay_mean = mean(arr_delay, na.rm = TRUE)) %>%
      plot_ly(
        x = ~date, y = ~arr_delay_mean,
        hovertemplate = "%{y:.1f}<extra></extra>"
      ) %>%
      add_lines() %>%
      layout(
        hovermode = "x",
        xaxis = list(title = "", tickformat = "%b %e"),
        yaxis = list(title = "Average delay")
      )
  })


}

shinyApp(ui, server)
