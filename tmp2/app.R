library(shiny)
library(bslib)
library(magrittr)

## Component functions ================

#' Add a tooltip to an existing tag
#' 
#' @param x An htmltools tag object to add a tooltip to
#' @param tooltip A string to display as the tooltip
#' @param placement Direction where the tooltip should be shown
#' @param options Any additional options from Bootstrap; see https://getbootstrap.com/docs/5.0/components/tooltips/#options
add_tooltip <- function(x, tooltip,
  placement = c("top", "right", "bottom", "left"),
  options = list()) {
  
  placement <- match.arg(placement)
  
  names(options) <- paste0("data-bs-", names(options))
  options <- lapply(options, function(value) {
    if (isTRUE(value)) {
      "true"
    } else if (isFALSE(value)) {
      "false"
    } else {
      value
    }
  })
  
  htmltools::tagAppendAttributes(
    x,
    "data-bs-toggle" = "tooltip",
    "data-bs-placement" = placement,
    title = tooltip,
    !!!options
  )
}

#' @param animation Apply a CSS fade transition to the tooltip. Defaults to true.
opts_tooltip <- function(
    animation = TRUE,
    container = FALSE,
    ...
  ) {
  
  list(animation = animation, container = container, ...)
}


## Example app ========================

ui <- function(req) {
  theme <- bs_theme(
    version = 5,
    `gray-100` = "#f8f8f8",
    `gray-600` = "#7c7c7c",
    `gray-700` = "#606060",
    `gray-800` = "#404040",
    `gray-900` = "#202020",
    `blue` = "#0d6efd",
    `indigo` = "#4e159b",
    `purple` = "#74149c",
    `pink` = "#c71274",
    `red` = "#EA2B1F",
    `orange` = "#fc9628",
    `yellow` = "#FFE74C",
    `green` = "#008471",
    `teal` = "#3bdfc6",
    `nav-link-padding-x` = "1.1rem",
    `form-check-padding-start` = "1.4rem"
    ) %>%
    bslib::bs_add_rules(sass::sass_file("styles.scss"))
  
  fluidPage(theme = theme,
    # add_tooltip(actionButton("go", "Go"), "Hello!", placement = "bottom", options = opts_tooltip(
    #   animation = FALSE,
    #   delay = 2000
    # )),
    htmlTemplate(
      "ui-editor.html"
    )
  )
}

# Define server logic required to draw a histogram
server <- function(input, output) {
  
  output$distPlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    
    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'darkgray', border = 'white')
  })
}

# Run the application 
shinyApp(ui = ui, server = server)

