## ---- sidebar-create-contents --------
library(bslib)
library(shiny)
library(crosstalk)
library(plotly)

# SharedData creates the "link" between filter controls and plotly visuals
dat <- SharedData$new(dplyr::sample_n(diamonds, 1000))

# Filter controls for the sidebar
cut <- filter_select("cut", "Cut", dat, ~cut)
clarity <- filter_select("clarity", "Clarity", dat, ~clarity)

# Example "main" content
plot_price <- plot_ly(dat, x = ~price)
plot_carat <- plot_ly(dat, x = ~carat)
