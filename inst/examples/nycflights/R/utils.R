library(plotly)

plot_delay <- function(x) {
  x_mean <- mean(x, na.rm = TRUE)
  x_med <- median(x, na.rm = TRUE)
  end <- quantile(x, probs = 0.99, na.rm = TRUE)
  plot_ly(x = x) %>%
    config(displayModeBar = FALSE) %>%
    rangeslider(start = min(x, na.rm = TRUE), end = as.numeric(end)) %>%
    layout(
      # TODO: add annotations for each line?
      shapes = list(
        vline(x_med, color = "darkgray", dash = "dash"),
        vline(x_mean, color = "orange")
      )
    )
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
