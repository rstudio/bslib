library(shiny)

ui <- navbarPage("Test",
  header = tagList(
    bs4:::bs4_deps_sass()
  ),
  tabPanel("One",
    "One",
    tabsetPanel(
      tabPanel("Three",
        "Three"
      ),
      tabPanel("Four",
        "Four",
        icon = icon("cloud")
      )
    ),
    tags$hr(),
    includeHTML("102-navbar-bs4.html")
  ),
  tabPanel("Two",
    icon = icon("download"),
    "Two"
  ),
  navbarMenu("A submenu",
    tabPanel("Five", "Five"),
    "---",
    tabPanel("Six", "Six")
  )
)

# .navbar-expand .navbar-nav .nav-link
# .navbar-expand ul.nav.navbar-nav > li > a

server <- function(input, output, session) {

}

shinyApp(ui, server)
