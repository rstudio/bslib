library(bootstraplib)
library(shiny)

make_bs3_tabs <- function() {
  list(
    tabPanel("One",
      "One"
    ),
    tabPanel("Two",
      icon = icon("download"),
      "Two"
    ),
    navbarMenu("A submenu",
      tabPanel("Three", "Three"),
      "---",
      tabPanel("Four", "Four"),
      tabPanel("Five", "Five")
    )
  )
}


make_bs4_tabs <- function(id, type = "nav-tabs") {
  ns <- NS(paste0("#", id))
  withTags(
    ul(class = "nav",
      class = type,
      li(class = "nav-item",
        a("data-toggle" = "tab",
          class = "nav-link active",
          href = ns("1"),
          "Link 1"
        )
      ),
      li(class = "nav-item",
        a("data-toggle" = "tab",
          class = "nav-link",
          href = ns("2"),

          icon("download"),
          "Link 2"
        )
      ),
      li(class = "nav-item dropdown",
        a(class = "nav-link dropdown-toggle",
          "data-toggle" = "dropdown",
          href = "#",
          role = "button",
          "aria-haspopup" = "true",
          "aria-expanded" = "false",
          "Dropdown"
        ),
        div(class = "dropdown-menu",
          a("data-toggle" = "tab",
            class = "dropdown-item",
            href = ns("3"),
            "Link 3"
          ),
          a("data-toggle" = "tab",
            class = "dropdown-item",
            href = ns("4"),
            "Link 4"
          ),
          div(class = "dropdown-divider"),
          a("data-toggle" = "tab",
            class = "dropdown-item disabled",
            href = ns("dis-1"),
            tabindex = "-1",
            "aria-disabled" = "true",
            "Disabled Link"
          ),
          a("data-toggle" = "tab",
            class = "dropdown-item disabled",
            href = ns("dis-2"),
            tabindex = "-1",
            "aria-disabled" = "true",
            "Another Disabled Link"
          )
        )
      ),
      li(class = "nav-item",
        a("data-toggle" = "tab",
          class = "nav-link disabled",
          href = ns("dis-3"),
          tabindex = "-1",
          "aria-disabled" = "true",
          "Disabled Link"
        )
      )
    )
  )
}

make_bs4_tab_contents <- function(id) {
  ns <- NS(id)
  div(class = "tab-content",
    div(class = "tab-pane fade show active",
      id = ns("1"),
      "Panel 1"
    ),
    div(class = "tab-pane fade",
      id = ns("2"),
      "Panel 2"
    ),
    div(class = "tab-pane fade",
      id = ns("3"),
      "Panel 3"
    ),
    div(class = "tab-pane fade",
      id = ns("4"),
      "Panel 4"
    )
  )
}


ui <- fluidPage(
  bs_dependencies(),
  tags$style(
    "h4 { margin-top: 120px; }"
  ),

  tags$br(),
  tags$br(),
  tags$br(),
  tags$br(),
  tags$br(),

  h4("bs3 navbarPage"),
  do.call(navbarPage, rlang::list2(
    "bs3 navbarPage", inverse = FALSE,
    !!!make_bs3_tabs()
  )),

  h4("bs3 navbarPage (inverse)"),
  helpText("(Fixed to bottom of page)"),
  do.call(navbarPage, rlang::list2(
    "bs3 navbarPage (inverse)", inverse = TRUE, position = "fixed-bottom",
    !!!make_bs3_tabs()
  )),

  h4("bs4 navbar - default"),
  tags$nav(class="navbar navbar-expand-sm navbar-light bg-light",
    tags$a(class="navbar-brand", href="#", "Navbar"),
    make_bs4_tabs("bs4nav", "navbar-nav mr-auto"),
  ),
  make_bs4_tab_contents("bs4nav"),

  h4("bs4 navbar (dark)"),
  tags$nav(class="navbar navbar-expand-sm navbar-dark bg-dark",
    tags$a(class="navbar-brand", href="#", "Navbar"),
    make_bs4_tabs("bs4navdark", "navbar-nav mr-auto"),
  ),
  make_bs4_tab_contents("bs4navdark"),

  h4("bs4 navbar (.bg-success)"),
  tags$nav(class="navbar navbar-expand-sm navbar-dark bg-success",
    tags$a(class="navbar-brand", href="#", "Navbar"),
    make_bs4_tabs("bs4navsuccess", "navbar-nav mr-auto"),
  ),
  make_bs4_tab_contents("bs4navsuccess"),

  h4("bs3 rmarkdown site navbar"),
  p(class = "text-center", "(pinned to top of page)"),
  includeHTML("navbar-rmdsite.html"),

  h4("bs3 tabsetPanel"),
  do.call(tabsetPanel, rlang::list2(
    !!!make_bs3_tabs()
  )),

  h4("bs4 tabs"),
  make_bs4_tabs("bs4tabs", "nav-tabs"),
  make_bs4_tab_contents("bs4tabs"),

  h4("bs3 tabsetPanel(type=\"pills\")"),
  do.call(tabsetPanel, rlang::list2(
    type = "pills",
    !!!make_bs3_tabs()
  )),

  h4("bs4 pills"),
  make_bs4_tabs("bs4pills", "nav-pills"),
  make_bs4_tab_contents("bs4pills"),

  h4("bs3 navlist panel"),
  do.call(navlistPanel, rlang::list2(
    !!!make_bs3_tabs()
  )),

  tags$br(),
  tags$br(),
  tags$br(),
  tags$br()
)

# .navbar-expand .navbar-nav .nav-link
# .navbar-expand ul.nav.navbar-nav > li > a

server <- function(input, output, session) {

}

shinyApp(ui, server)
