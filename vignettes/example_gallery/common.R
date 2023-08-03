library(bslib)
library(shiny)
library(crosstalk)
library(plotly)
library(leaflet)

# ************************************************
# Setup code to create some input and outputs
# ************************************************

# Creates the "filter link" between the controls and plots
dat <- SharedData$new(dplyr::sample_n(diamonds, 1000))

# Sidebar elements (e.g., filter controls)
filters <- list(
  filter_select("cut", "Cut", dat, ~cut),
  filter_select("color", "Color", dat, ~color),
  filter_select("clarity", "Clarity", dat, ~clarity)
)

# plotly visuals
plots <- list(
  plot_ly(dat) |> add_histogram(x = ~price),
  plot_ly(dat) |> add_histogram(x = ~carat),
  plot_ly(dat) |> add_histogram(x = ~cut, color = ~clarity)
)

# better for smaller displays
plots <- lapply(plots, \(x) {
  x |>
    config(displayModeBar = FALSE) |>
    layout(
      xaxis = list(title = ""),
      margin = list(t = 0, b = 0, l = 0, r = 0)
    )
})

# Wrap each plot up into a card
cards <- list(
  card(
    full_screen = TRUE,
    card_header("Price"),
    plots[[1]]
  ),
  card(
    full_screen = TRUE,
    card_header("Carat"),
    plots[[2]]
  ),
  card(
    full_screen = TRUE,
    card_header("Cut by clarity"),
    plots[[3]]
  )
)
