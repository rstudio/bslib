## ---- sidebar-create-contents --------
library(bslib)
library(shiny)
library(crosstalk)
library(plotly)

# For creating the "filter" between the controls and plots
dat <- SharedData$new(dplyr::sample_n(diamonds, 1000))

# Sidebar elements (e.g., filter controls)
cut <- filter_select("cut", "Cut", dat, ~cut)
clarity <- filter_select("clarity", "Clarity", dat, ~clarity)
color <- filter_select("color", "Color", dat, ~color)

# Main elements (e.g., plots)
plot_price <- plot_ly(dat, x = ~price)
plot_carat <- plot_ly(dat, x = ~carat)
plot_depth <- plot_ly(dat, x = ~depth)
