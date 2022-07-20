# remotes::install_github("rstudio/bslib")
# remotes::install_github("rstudio/bsicons")
# remotes::install_github("cpsievert/histoslider")
library(shiny)
library(bslib)
library(dplyr)
library(lubridate)
library(plotly)
library(nycflights13)
library(histoslider)

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

side <- accordion(
  selected = c("Origin", "Destination"),
  # TODO GREG: make this "just work" inside of layout_sidebar()
  class = "accordion-flush",
  accordion_item(
    "Origin", icon = icon("plane-departure"),
    input_check_buttons(
      "origin", c("JFK", "LGA", "EWR"),
      selected = I("none")
    )
  ),
  accordion_item(
    "Destination", icon = icon("plane-arrival"),
    style = css(overflow = "hidden"),
    input_check_search(
      "dest_name", sort(unique(flights$dest_name)),
      width = "100%"
    )
  ),
  accordion_item(
    "Carrier", icon = icon("user-tie"),
    style = css(overflow = "hidden"),
    input_check_search(
      "carrier_name", unique(flights$carrier_name),
      width = "100%"
    )
  ),
  accordion_item(
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
  accordion_item(
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

# TODO: full_screen = TRUE doesn't work (yet) with card_grid()?
#card_grid(
#  card_width = 1/2, style = "height: 375px",
#  flights_card, delay_corr_card
#),
#br(),
#card_grid(
#  card_width = 1, style = "height: 400px",
#  delay_card
#)

main <- tagList(
  uiOutput("value_boxes"),
  br(),
  fluidRow(
    column(6, flights_card), column(6, delay_corr_card)
  ),
  br(),
  fluidRow(column(12, delay_card))
)


ui <- page_navbar(
  theme = bs_theme(
    font_base = font_google("Open Sans"),
    "primary" = PRIMARY,
    "navbar-bg" = PRIMARY,
    # TODO: hopefully we can handle this via CSS variables when we update to Bootstrap 5.2
    "accordion-button-active-bg" = "white",
    "accordion-button-active-color" = "black"
  ),
  title = tags$span(
    tags$img(
      src = "logo.png",
      style = "width:46px;height:auto;margin-right:24px;"
    ),
    "Demo"
  ),
  fluid = TRUE,
  nav(
    "NYC Flights",
    layout_sidebar(side, main, top = "70px")
  ),
  nav(
    "Sales",
    div(
      class = "container",
      uiOutput("sales_value_boxes"),
        navs_tab_card(
          title = "Monthly sales over time",
          height = "500px",
          full_screen = TRUE,
          nav(
            "Plot",
            plotlyOutput("sales_monthly", height = "100%")
          ),
          nav_menu(
            "Table",
            nav("By month", DT::dataTableOutput("sales_monthly_dat", height = "100%")),
            nav("By order", DT::dataTableOutput("sales_raw_dat", height = "100%"))
          )
        )
    )
  ),
  nav_spacer(),
  nav_item(
    tags$a(
      tags$span(
        bsicons::bs_icon("code-slash"), "Source code"
      ),
      href = "https://github.com/rstudio/bslib/tree/dev/inst/examples/demo",
      target = "_blank"
    )
  )
)

server <- function(input, output, session) {
  # --------------------------------------------
  # Flights tab logic
  # --------------------------------------------

  # Mapping from input id name to updating input function
  input_discrete_vars <- list(
    origin = update_check_buttons,
    dest_name = update_check_search,
    carrier_name = update_check_search
  )
  input_numeric_vars <- list(
    sched_dep_time = update_histoslider,
    sched_arr_time = update_histoslider,
    date = update_histoslider,
    precip = update_histoslider,
    wind_gust = update_histoslider,
    wind_speed = update_histoslider
  )

  # Dataset after all filters are applied
  flight_dat <- reactive({
    idx <- rep(TRUE, nrow(flights))
    for (x in names(input_discrete_vars)) {
      idx <- idx & filter_discrete(flights, x)
    }
    for (x in names(input_numeric_vars)) {
      idx <- idx & filter_numeric(flights, x)
    }
    flights[idx & !is.na(idx), ]
  })

  # For each filter, add an event to update every other filter
  # when this filter changes
  input_vars <- c(input_discrete_vars, input_numeric_vars)
  lapply(names(input_vars), function(var) {
    observeEvent(input[[var]], ignoreInit = TRUE, {
      d <- flight_dat()
      if (nrow(d) == 0) return()
      for (x in setdiff(names(input_vars), var)) {
        update_input_func <- input_vars[[x]]
        if (x %in% names(input_discrete_vars)) {
          choices <- unique(d[[x]])
          update_input_func(
            id = x, choices = choices,
            selected = intersect(choices, input[[x]])
          )
        } else {
          breaks <- if (x == "date") "months" else "Sturges"
          # TODO: histoslider should do a better job preserving options
          options <- list(handleLabelFormat = if (x == "date") "%b %e" else "0d", selectedColor = PRIMARY)
          update_input_func(
            id = x, values = d[[x]],
            start = input[[x]][1], end = input[[x]][2],
            breaks = breaks,
            options = options
          )
        }
      }
    })
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
  })


  output$arr_delay <- renderPlotly({
    x <- flight_dat()$arr_delay
    x_mean <- mean(x, na.rm = TRUE)
    end <- quantile(x, probs = 0.99, na.rm = TRUE)
    plot_ly(x = x, hovertemplate = "%{y} flights were %{x} min late", color = I(PRIMARY)) %>%
      config(displayModeBar = FALSE) %>%
      rangeslider(start = min(x, na.rm = TRUE), end = as.numeric(end)) %>%
      # TODO: add annotations for each line?
      layout(shapes = list(vline(x_mean, color = "orange")))
  })

  output$arr_delay_series <- renderPlotly({
    flight_dat() %>%
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
  })


  filter_discrete <- function(d, var) {
    d[[var]] %in% (input[[var]] %||% unique(d[[var]]))
  }

  # N.B. between() will remove NAs, which we probably don't
  # want to remove until the slider is considered 'active'
  filter_numeric <- function(d, var) {
    input_var <- input[[var]]
    vals <- d[[var]]
    # TODO: histoslider to transform date back to a date vector
    if (inherits(vals, "Date")) {
      vals <- as.POSIXct(vals)
      input_var <- as.POSIXct(input_var / 1000, origin = "1970-01-01")
    }
    rng <- range(vals, na.rm = TRUE)
    active <- isTRUE(rng[1] <= input_var[1] || input_var[2] <= rng[2])
    if (active) {
      dplyr::between(vals, input_var[1], input_var[2])
    } else {
      rep(TRUE, length(vals))
    }
  }


  vline <- function(xint, color = "gray", dash = NULL) {
    list(
      type = "line",
      x0 = xint, x1 = xint,
      y0 = 0, y1 = 1,
      yref = "paper",
      line = list(color = color, dash = dash)
    )
  }


  # --------------------------------------------
  # Sales tab logic
  # --------------------------------------------

  sales <- reactive({
    readRDS("sales.rds") %>%
      mutate(
        date = as.Date(order_date),
        date_month = ymd(paste(year(date), month(date), 1, sep = "-"))
      )
  })

  output$sales_value_boxes <- renderUI({

    sales_category <- sales() %>%
      count(category, wt = sales) %>%
      tidyr::spread(category, n)

    furniture <- value_box(
      "In Furniture",
      scales::dollar(sales_category$Furniture),
      "in sales over 4 years",
      showcase = plotlyOutput("furniture", height = "40px", width = "60px"),
      full_screen = TRUE
    )
    office <- value_box(
      "In Office Supplies",
      scales::dollar(sales_category$`Office Supplies`),
      "in sales over 4 years",
      showcase = plotlyOutput("office", height = "40px", width = "60px"),
      full_screen = TRUE
    )
    technology <- value_box(
      "In Technology",
      scales::dollar(sales_category$Technology),
      "in sales over 4 years",
      showcase = plotlyOutput("technology", height = "40px", width = "60px"),
      full_screen = TRUE
    )

    overall <- value_box(
      "Overall",
      scales::dollar(sum(sales()$sales)),
      "in sales over 4 years",
      showcase = plotlyOutput("overall", height = "60px", width = "100px"),
      showcase_layout = "left-center",
      full_screen = TRUE
    )

    yoy_perc <- sales() %>%
      mutate(year = year(order_date)) %>%
      count(year, wt = sales) %>%
      mutate(perc = (n - lag(n)) / n) %>%
      summarise(mean(perc, na.rm = T)) %>%
      as.numeric() %>%
      scales::percent(accuracy = .1)

    yoy <- value_box(
      "Average growth",
      yoy_perc,
      "year over year",
      showcase = plotlyOutput("yoy", height = "60px", width = "100px"),
      class = "bg-success",
      showcase_layout = "left-center",
      full_screen = TRUE
    )

    tagList(
      card_grid(card_width = 1/2, overall, yoy),
      card_grid(card_width = 1/3, furniture, office, technology, class = "my-4")
    )
  })

  output$overall <- renderPlotly({
    d <- count(sales(), date_month, wt = sales, name = "Sales")
    plotly_time_series(
      d, x = ~date_month, y = ~Sales,
      text = ~paste0("Monthly sales\n", scales::dollar(Sales))
    )
  })

  sales_yoy <- reactive({
    sales() %>%
      mutate(year = year(order_date)) %>%
      count(year, wt = sales) %>%
      mutate(perc = (n - lag(n)) / n)
  })

  output$yoy <- renderPlotly({
    plotly_bars(
      sales_yoy(), x = ~as.character(year), y = ~perc,
      hovertext = ~paste("Yearly growth", scales::percent(perc, accuracy = .1))
    )
  })

  sales_date <- reactive({
    count(sales(), category, date_month, wt = sales, name = "Sales")
  })

  output$furniture <- renderPlotly({
    d <- filter(sales_date(), category == "Furniture")
    plotly_time_series(
      d, x = ~date_month, y = ~Sales,
      text = ~paste0("Monthly sales\n", scales::dollar(Sales))
    )
  })

  output$office <- renderPlotly({
    d <- filter(sales_date(), category == "Office Supplies")
    plotly_time_series(
      d, x = ~date_month, y = ~Sales,
      text = ~paste0("Monthly sales\n", scales::dollar(Sales))
    )
  })

  output$technology <- renderPlotly({
    d <- filter(sales_date(), category == "Technology")
    plotly_time_series(
      d, x = ~date_month, y = ~Sales,
      text = ~paste0("Monthly sales\n", scales::dollar(Sales))
    )
  })

  output$sales_monthly <- renderPlotly({
    plot_ly(sales_date()) %>%
      add_lines(
        x = ~date_month, y = ~Sales, color = ~category,
        text = ~scales::dollar(Sales),
        hoverinfo = "text"
      ) %>%
      layout(
        hovermode = "x",
        legend = list(
          orientation = "h", x = 0.5, y = 1,
          xanchor = "center", yanchor = "bottom",
          font = list(size = 16)
        ),
        xaxis = list(title = ""),
        yaxis = list(title = "")
      ) %>%
      config(displayModeBar = FALSE)
  })

  output$sales_monthly_dat <- DT::renderDataTable({
    DT::datatable(sales_date(), fillContainer = TRUE, options = list(pageLength = 50))
  })

  output$sales_raw_dat <- DT::renderDataTable({
    DT::datatable(sales(), fillContainer = TRUE, options = list(pageLength = 50))
  })

  plotly_time_series <- function(d, x, y, ...) {
    plot_minimal() %>%
      add_lines(
        data = d, x = x, y = y,
        fill = 'tozeroy',
        alpha = 0.1,
        ...
      )
  }

  plotly_bars <- function(d, x, y, ...) {
    plot_minimal() %>%
      add_bars(data = d, x = x, y = y, alpha = 0.75, span = I(0), ...)
  }


  plot_minimal <- function(...) {
    info <- getCurrentOutputInfo()
    large <- isTRUE(info$height() > 300)

    plot_ly(
      ...,
      color = I(info$fg()),
      hoverinfo = if (!large) "none" else "text",
      span = I(1)
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
