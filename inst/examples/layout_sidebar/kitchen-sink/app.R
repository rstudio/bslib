library(shiny)
library(bslib)
library(plotly)


lorem_ipsum_dolor_sit_amet <- "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl. Adipiscing at in tellus integer feugiat. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Cursus sit amet dictum sit amet justo. Sit amet consectetur adipiscing elit. Vestibulum mattis ullamcorper velit sed ullamcorper. Enim facilisis gravida neque convallis a. Elit duis tristique sollicitudin nibh sit amet. Magna eget est lorem ipsum. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Mauris in aliquam sem fringilla ut morbi. Id semper risus in hendrerit gravida rutrum quisque non tellus. At erat pellentesque adipiscing commodo elit at imperdiet dui. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Duis convallis convallis tellus id interdum velit laoreet id. Aliquet lectus proin nibh nisl. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Bibendum enim facilisis gravida neque convallis a."

side <- sidebar(
  id = "sidebar",
  selectInput("var", "Choose a variable", names(diamonds)),
  selectInput("var2", "Choose a variable", names(diamonds)),
  selectInput("var3", "Choose a variable", names(diamonds)),
  selectInput("var4", "Choose a variable", names(diamonds)),
  selectInput("var5", "Choose a variable", names(diamonds)),
  actionButton("toggle", "Toggle sidebar")
)

i <- 1
next_plot <- function() {
  on.exit(i <<- i + 1)
  plotlyOutput(paste0("plt", i))
}

ui <- page_navbar(
  title = "All the Sidebars!!",
  fluid = FALSE, #TODO: maybe this should also accept values?
  fill = paste0("global-", c("basic", "fill", "scroll")),
  # Not needed since there isn't a singular sidebar
  #fillable = paste0("global-", c("basic", "fill", "scroll")),
  nav_menu(
    "Local",
    nav(
      "Basic",
      markdown(c(
        "```r",
        "layout_sidebar(sidebar(), plot)",
        "```"
      )),
      layout_sidebar(side, next_plot())
    ),
    nav(
      "Fill",
      markdown(c(
        "```r",
        "layout_sidebar(sidebar(), plot, fillable = TRUE)",
        "```"
      )),
      layout_sidebar(side, next_plot(), fillable = TRUE)
    ),
    nav(
      "Card fill",
      markdown(c(
        "```r",
        "card(
           full_screen = TRUE,
           card_header('A card title'),
           card_sidebar(sidebar(), plot, fillable = TRUE)
         )",
        "```"
      )),
      card(
        full_screen = TRUE,
        card_header("A card title"),
        card_sidebar(side, next_plot(), fillable = TRUE)
      )
    ),
    nav(
      "Card fill",
      markdown(c(
        "```r",
        "card(
           full_screen = TRUE,
           card_header('A card title'),
           card_sidebar(side, plot, fillable = TRUE)
         )",
        "```"
      )),
      card(
        full_screen = TRUE,
        card_header("A card title"),
        card_sidebar(side, next_plot(), fillable = TRUE)
      )
    )
  ),
  nav_menu(
    "Global",
    nav(
      "Basic", value = "global-basic",
      layout_sidebar(side, next_plot())
    ),
    nav(
      "Fill", value = "global-fill",
      layout_sidebar(side, next_plot(), fillable = TRUE)
    ),
    nav(
      "Scrolling", value = "global-scroll",
      layout_sidebar(
        side,
        layout_column_wrap(
          width = 1/2, class = "mb-3",
          card(
            card_header("Plot 1"),
            next_plot()
          ),
          card(
            card_header("Plot 2"),
            next_plot()
          )
        ),
        card(
          card_header("Plot 3"),
          next_plot()
        ),
        card(
          card_header("Plot 10"),
          next_plot()
        )
      )
    )
  )
)


server <- function(input, output, session) {

  lapply(paste0("plt", 1:100), function(x) {
    output[[x]] <- renderPlotly(plot_ly(x = diamonds[[input$var]]))
  })

  observe({
    print(input$sidebar)
  })

  observeEvent(input$toggle, {

    if (input$sidebar) {
      sidebar_close("sidebar")
    } else {
      sidebar_open("sidebar")
    }
  })
}

shinyApp(ui, server)
