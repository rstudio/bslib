## ---- sidebar-create-contents --------
library(bslib)
library(shiny)
library(crosstalk)
library(plotly)

# For creating the "filter" between the controls and plots
dat <- SharedData$new(dplyr::sample_n(ggplot2::diamonds, 1000))

# Sidebar elements (e.g., filter controls)
filter_cut <- filter_select("cut", "Cut", dat, ~cut)
filter_color <- filter_select("color", "Color", dat, ~color)
filter_clarity <- filter_select("clarity", "Clarity", dat, ~clarity)

# A function to create histograms with plotly
plot_hist <- function(data, x) {
  plot_ly(data, x = x) |>
    config(displayModeBar = FALSE) |>
    layout(margin = list(t = 0, b = 0, l = 0, r = 0))
}

# Main elements (e.g., plots)
plot_price <- plot_hist(dat, x = ~price)
plot_carat <- plot_hist(dat, x = ~carat)
plot_depth <- plot_hist(dat, x = ~depth)

# An unrelated map
library(leaflet)
map_quakes <- leaflet(quakes, height = 350) |> addTiles() |> addCircleMarkers()
