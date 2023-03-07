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

# Main elements (e.g., plots)
plot_price <- plot_ly(dat, x = ~price)
plot_carat <- plot_ly(dat, x = ~carat)
plot_depth <- plot_ly(dat, x = ~depth)
