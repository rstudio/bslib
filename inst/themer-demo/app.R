library(shiny)
library(ggplot2)
library(bootstraplib)
library(rlang)

source("global.R")

if (!is.null(bs_global_get()) && !identical(version_default(), theme_version())) {
  stop("This example app requires version = '", version_default(), "'", call. = FALSE)
}

tabPanel <- function(...) {
  shiny::tabPanel(..., class = "p-3 border rounded")
  # For tabs
  #shiny::tabPanel(..., class = "p-3 border border-top-0 rounded-bottom")
}

gradient <- function(theme_color = "primary") {
  bg_color <- paste0("bg-", theme_color)
  bgg_color <- paste0("bg-gradient-", theme_color)
  text_color <- if (theme_color == "light") "text-dark" else "text-light"
  bg_div <- function(color_class, ...) {
    div(
      class = text_color, class = "p-3", class = color_class,
      paste0(".", color_class), ...
    )
  }
  fluidRow(
    column(6, bg_div(bg_color)),
    column(6, bg_div(bgg_color))
  )
}

theme_colors <- c("primary", "secondary", "default", "success", "info", "warning", "danger", "dark")
gradients <- lapply(theme_colors, gradient)

progressBar <- div(
  class="progress",
  div(
    class="progress-bar w-25",
    role="progressbar",
    "aria-valuenow"="25",
    "aria-valuemin"="0",
    "aria-valuemax"="100"
  )
)




# TODO: more shiny inputs
ui <- navbarPage(
  header = bootstraplib::bs_dependencies(),
  "Theming demo app",
  tabPanel(
    "Main page",
    sidebarLayout(
      sidebarPanel(
        fileInput("file", "fileInput():", placeholder = "upload something..."),
        textInput("text", "textInput():", placeholder = "type something..."),
        selectizeInput(
          "selectize", "selectizeInput():", multiple = TRUE,
          choices = c('Choose something...' = '', state.name)
        ),
        dateRangeInput("dateRange", "dateRangeInput():"),
        p("actionButton():"),
        actionButton("primary", "Primary", icon("product-hunt"), class = "btn-primary"),
        actionButton("secondary", "Secondary (default)"),
        actionButton("success", "Success", icon("check"), class = "btn-success"),
        actionButton("info", "Info", icon("info"),  class = "btn-info"),
        actionButton("warning", "warning", icon("exclamation"), class = "btn-warning"),
        actionButton("danger", "Danger", icon("exclamation-triangle"), class = "btn-danger"),
        sliderInput("slider", "sliderInput():", min = 0, max = 100, value = 30),
        numericInput("numeric", "numericInput():", value = 0),
        checkboxInput("checkbox", "checkboxInput():", value = FALSE),
        checkboxGroupInput("checkboxGroup", "checkboxGroupInput():", c("A", "B", "C"))
      ),
      mainPanel(
        tabsetPanel(
          type = "pills",
          tabPanel(
            "Plots",
            selectizeInput(
              "plot_example", "Choose an example",
              selected = "GeomSmooth",
              choices = list(
                ggplot2 = names(ggplot2_examples),
                lattice = names(lattice_examples),
                base = names(base_examples)
              )
            ),
            plotOutput("plot")
          ),
          tabPanel("Tables", DT::dataTableOutput("dt_table")),
          tabPanel(
            "Typography",
            h4("Verbatim text output"),
            verbatimTextOutput("txtout"),
            h1("Header 1"),
            h2("Header 2"),
            h3("Header 3"),
            h4("Header 4"),
            h5("Header 5")
          ),
          tabPanel(
            "Options",
            p(
              "Background color gradients are disabled by default.",
              "Enable them to see the difference here.",
              "If enabled, gradients automatically apply buttons and progress bars, ",
              "but you may also add to a .bg-gradient-* modified class to arbitrary elements."
            ),
            !!!gradients,
            br(),
            p(
              "With the default settings, enabling of box shadows adds a very subtle and
              barely noticable inner box-shadow to most input widgets. The difference is
              a little more obvious in a progress bar:"
            ),
            progressBar,
            br(),
            p(
              "Rounded corners are enabled by default and apply to numerous components (e.g., ",
              code("tabsetPanel()"), ",", code("wellPanel()"), ", and ", code("actionButton()"), "):",
              actionButton("progress", "Show progress")
            ),
            br(),
            p(
              "Smooth transitions are enabled by default, but if you disable them, progress updating",
              "in ", code("fileInput()"), "and ", code("Progress"), " will appear more staggered",
              "(e.g., click button above)."
            )
          )
        )
      )
    )
  ),
  tabPanel("About", "This panel is intentionally left blank")
)

shinyApp(
  ui = ui,
  server = function(input, output, session) {
    output$dt_table <- DT::renderDataTable(mtcars)

    output$plot <- renderPlot({
      ggplot2_examples[[input$plot_example]] %||%
        eval(lattice_examples[[input$plot_example]]) %||%
        eval(base_examples[[input$plot_example]])
    })

    output$txtout <- renderPrint(input$txt)

    observeEvent(input$progress, {
      withProgress(
        message = "Here's a progress bar",
        detail = "Disable the transition option for 'staggered' progress.",
        value = 0,
        {
          for (i in 1:15) {
            incProgress(1/15)
            Sys.sleep(0.25)
          }
        }
      )
    })
  }
)
