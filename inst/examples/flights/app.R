library(shiny)
library(bslib)
library(dplyr)
library(lubridate)
library(plotly)
library(nycflights13)
library(histoslider)
library(rlang)

# Data prep
flights <- flights %>%
  left_join(
    airports %>%
      transmute(dest_name = paste0(name, " (", faa, ")"), dest = faa, end_lat = lat, end_lon = lon)
  ) %>%
  filter(!is.na(dest_name)) %>%
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

PRIMARY <- "#0675DD"

sidebar_acc <- accordion(
  open = c("Origin", "Destination"),
  accordion_panel(
    "Origin", icon = icon("plane-departure"),
    uiOutput("origin_reset"),
    checkboxGroupInput(
      "origin", NULL,
      choices = sort(unique(flights$origin)),
      inline = TRUE
    )
  ),
  accordion_panel(
    "Destination", icon = icon("plane-arrival"),
    selectInput(
      "dest_name", NULL,
      sort(unique(flights$dest_name)),
      multiple = TRUE,
      width = "100%"
    )
  ),
  accordion_panel(
    "Carrier", icon = icon("user-tie"),
    selectInput(
      "carrier_name", NULL,
      unique(flights$carrier_name),
      multiple = TRUE,
      width = "100%"
    )
  ),
  accordion_panel(
    "Flight time", icon = icon("clock"),
    input_histoslider(
      "sched_dep_time", "Departure time",
      flights$sched_dep_time, height = 125,
      options = list(
        handleLabelFormat = "0d",
        selectedColor = PRIMARY
      )
    ),
    input_histoslider(
      "sched_arr_time", "Arrival time",
      flights$sched_arr_time, height = 125,
      options = list(
        handleLabelFormat = "0d",
        selectedColor = PRIMARY
      )
    ),
    input_histoslider(
      "date", "Date",
      flights$date, height = 125, breaks = "months",
      options = list(
        handleLabelFormat = "%b %e",
        selectedColor = PRIMARY
      )
    )
  ),
  accordion_panel(
    "Weather", icon = icon("cloud-rain"),
    input_histoslider(
      "precip", "Precipitation",
      flights$precip, height = 125,
      options = list(selectedColor = PRIMARY)
    ),
    input_histoslider(
      "wind_speed", "Wind speed",
      flights$wind_speed, height = 125,
      options = list(selectedColor = PRIMARY)
    ),
    input_histoslider(
      "wind_gust", "Wind gust",
      flights$wind_gust, height = 125,
      options = list(selectedColor = PRIMARY)
    )
  )
)


flights_card <- card(
  full_screen = TRUE,
  card_header("Flight paths"),
  plotlyOutput("flight_paths"),
  card_footer("Marker areas are proportional to mean arrival delay")
)

delay_corr_card <- card(
  full_screen = TRUE,
  card_header(
    "Arrival vs departure delay",
    checkboxInput("scatter_summarize", "Summarize", TRUE, width = "fit-content"),
    class = "d-flex justify-content-between"
  ),
  plotlyOutput("scatter_delay")
)

delay_card <- navset_card_pill(
  title = "Arrival delay",
  full_screen = TRUE,
  nav_panel(
    "Overall",
    plotlyOutput("arr_delay")
  ),
  nav_panel(
    "Over time",
    plotlyOutput("arr_delay_series")
  )
)


ui <- page_navbar(
  theme = bs_theme(
    base_font = font_google(
      "Open Sans", wght = c(300, 400, 500, 600, 700, 800),
      ital = c(0, 1)
    ),
    "primary" = PRIMARY,
    "navbar-bg" = PRIMARY
  ),
  title = tags$span(
    tags$img(src = "logo.png", width = "46px", height = "auto", class = "me-3"),
    "NYC Flights"
  ),
  fillable = TRUE,
  sidebar = sidebar(sidebar_acc),
  nav_panel(
    "Delays",
    uiOutput("value_boxes"),
    layout_column_wrap(
      width = "200px", class = "my-3",
      flights_card, delay_corr_card
    ),
    delay_card
  ),
  nav_panel(
    "Durations",
    "Coming soon"
  ),
  nav_spacer(),
  nav_item(
    tags$a(
      tags$span(
        bsicons::bs_icon("code-slash"), "Source code"
      ),
      href = "https://github.com/rstudio/bslib/tree/main/inst/examples/flights",
      target = "_blank"
    )
  )
)

server <- function(input, output, session) {
  # ---------------------------------------------------------
  # Flights tab logic
  #
  # WARNING: this server-side filtering logic is VERY experimental
  # at this point and won't be easily adapt to different use cases.
  # If you feel tempted to use it, use with caution.
  # ---------------------------------------------------------

  # Mapping from input id name to updating input function
  input_discrete_vars <- list(
    origin = function(...) updateCheckboxGroupInput(..., inline = TRUE),
    dest_name = updateSelectInput,
    carrier_name = updateSelectInput
  )
  input_numeric_vars <- list(
    sched_dep_time = update_histoslider,
    sched_arr_time = update_histoslider,
    date = update_histoslider
  )
  input_vars <- c(
    input_discrete_vars,
    input_numeric_vars
  )

  filter_index <- function(d) {
    idx <- rep(TRUE, nrow(d))
    for (var in names(d)) {
      idx <- idx & filter_col(d, var)
    }
    idx & !is.na(idx)
  }

  filter_col <- function(d, var) {
    vals <- d[[var]]
    input_val <- input[[var]]
    if (is.null(input_val)) {
      return(TRUE)
    }

    if (is.character(vals) || is.factor(vals) || is.logical(vals)) {
      return(d[[var]] %in% input_val)
    }

    # N.B. between() will remove NAs, which we probably don't
    # want to remove until the slider is considered 'active'
    rng <- range(vals, na.rm = TRUE)
    active <- isTRUE(rng[1] <= input_val[1] || input_val[2] <= rng[2])

    if (!active) {
      return(TRUE)
    }

    dplyr::between(vals, input_val[1], input_val[2])
  }

  # When a particular input filter changes, we need to update every other filter
  # with data
  lapply(names(input_vars), function(var) {

    index <- reactive({
      filter_index(flights[, setdiff(names(input_vars), var)])
    })

    observeEvent(index(), ignoreInit = TRUE, ignoreNULL = FALSE, {

      d <- flights[index(), ]
      if (nrow(d) == 0) return()
      input_val <- input[[var]]
      update_input_func <- input_vars[[var]]

      if (var %in% names(input_discrete_vars)) {
        choices <- sort(unique(d[[var]]))
        update_input_func(
          inputId = var, choices = choices, selected = input_val %||% character(0)
        )
      } else {
        update_input_func(
          id = var,
          values = d[[var]],
          start = input_val[1],
          end = input_val[2]
        )
      }

    })
  })

  output$origin_reset <- renderUI({
    actionLink(
      "origin_reset", "Reset",
      style = htmltools::css(
        text_decoration = "none",
        font_weight = 700,
        font_size = ".875rem",
        float = "right",
        visibility = if (length(input$origin) > 0) "visible" else "hidden",
        margin_top = "-7px"
      )
    )
  })

  observeEvent(input$origin_reset, {
    updateCheckboxGroupInput(
      inputId = "origin",
      choices = sort(unique(flights$origin)),
      selected = character(0)
    )
  })

  # Flights with all filters applied (i.e., data used for value boxes/plots)
  flight_dat <- reactive({
    flights[filter_index(flights), ]
  })

  output$value_boxes <- renderUI({
    d <- flight_dat()
    n_flights <- value_box(
      "A TOTAL OF",
      paste(nrow(d), "flights"),
      paste(
        "Across", length(unique(d$dest_name)),
        "destinations"
      ),
      tags$p(paste(
        "On", length(unique(d$carrier_name)), "different carriers"
      )),
      showcase = bsicons::bs_icon("airplane")
    )

    delay_dep <- value_box(
      "AVERAGE DEPARTURE",
      paste(
        round(mean(d$dep_delay, na.rm = T), 0),
        "mins late"
      ),
      paste0(
        round(100 * sum(d$dep_delay > 0, na.rm = T) / nrow(d), 1),
        "% of flights depart late"
      ),
      showcase = bsicons::bs_icon("hourglass-split")
    )

    delay_arr <- value_box(
      "AVERAGE ARRIVAL",
      paste(
        round(mean(d$arr_delay, na.rm = T), 0),
        "mins late"
      ),
      paste0(
        round(100 * sum(d$arr_delay > 0, na.rm = TRUE) / nrow(d), 1),
        "% of flights arrive late"
      ),
      showcase = bsicons::bs_icon("hourglass-bottom")
    )

    layout_column_wrap(width = 1/3, n_flights, delay_dep, delay_arr)
  }) %>%
    bindCache(flight_dat())

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
  }) %>%
    bindCache(flight_dat())

  output$scatter_delay <- renderPlotly({
    d <- flight_dat()
    req(nrow(d) > 0)

    if (isTRUE(input$scatter_summarize)) {
      x <- d$dep_delay
      y <- d$arr_delay
      p <- plot_ly() %>%
        add_histogram2dcontour(
          x = x, y = y, hovertemplate = "Number of flights: %{z}<extra></extra>"
        ) %>%
        layout(
          xaxis = list(
            title = "Departure delay",
            range = c(-30, 100)
          ),
          yaxis = list(
            title = "Arrival delay",
            range = c(-50, 100)
          )
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
        stroke = I(PRIMARY),
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
  }) %>%
    bindCache(flight_dat(), input$scatter_summarize)


  output$arr_delay <- renderPlotly({
    x <- flight_dat()$arr_delay
    req(length(x) > 0)

    x_mean <- mean(x, na.rm = TRUE)
    end <- quantile(x, probs = 0.99, na.rm = TRUE)
    plot_ly(x = x, hovertemplate = "%{y} flights were %{x} min late <extra></extra>", color = I(PRIMARY)) %>%
      config(displayModeBar = FALSE) %>%
      rangeslider(start = min(x, na.rm = TRUE), end = as.numeric(end)) %>%
      # TODO: add annotations for each line?
      layout(
        shapes = list(
          type = "line",
          x0 = x_mean, x1 = x_mean,
          y0 = 0, y1 = 1,
          yref = "paper",
          line = list(color = "orange", dash = "solid")
        )
      )
  }) %>%
    bindCache(flight_dat())

  output$arr_delay_series <- renderPlotly({
    d <- flight_dat()
    req(nrow(d) > 0)

    d %>%
      group_by(date) %>%
      summarise(arr_delay_mean = mean(arr_delay, na.rm = TRUE)) %>%
      plot_ly(
        x = ~date, y = ~arr_delay_mean,
        hovertemplate = "%{y:.1f}<extra></extra>",
        color = I(PRIMARY)
      ) %>%
      add_lines() %>%
      layout(
        hovermode = "x",
        xaxis = list(title = "", tickformat = "%b %e"),
        yaxis = list(title = "Average delay")
      )
  }) %>%
    bindCache(flight_dat())

}

shinyApp(ui, server)
