# Packages ---------------------------------------
library(shiny)
library(bslib)

pkgs_extra <- c("plotly", "colourpicker")
pkgs_yes <- vapply(pkgs_extra, rlang::is_installed, logical(1))
if (any(!pkgs_yes)) {
  rlang::abort(paste0(
    "The `build-a-box` app requires additional packages: ",
    paste(pkgs_extra[!pkgs_yes], collapse = ", ")
  ))
}

library(plotly)

# Settings ---------------------------------------
ENABLE_THEMER <- identical(Sys.getenv("ENABLE_THEMER"), "true")

# Functions ---------------------------------------
layout_value_box_options <- function(ui_opts) {
  layout_columns(
    div(h4("Content", class = "border-bottom"), ui_opts$title_value),
    div(h4("Theme", class = "border-bottom"), ui_opts$theme_opts),
    div(h4("Showcase", class = "border-bottom"), ui_opts$showcase)
  )
}

# UI ---------------------------------------
ui <- page_fixed(
  title = "Build a Box | bslib",
  theme = bs_theme(preset = "shiny"),
  h2("Build a Box", class = "mt-4"),
  tags$head(
    tags$link(rel = "stylesheet", href = "build-a-box.css")
  ),
  # Value Box Previews ----
  div(
    id = "preview",
    class = "my-5",
    layout_columns(
      class = "value-box-previews",
      ui_value_box_output("one"),
      ui_value_box_output("two"),
      ui_value_box_output("three")
    )
  ),
  # Settings Panel ----
  navset_card_pill(
    id = "settings",
    title = "Value box settings",
    nav_panel(
      "All",
      value = "all",
      ui_global_controls("all")
    ),
    nav_panel(
      "One",
      value = "one-value_box",
      layout_value_box_options(
        ui_value_box_options("one")
      )
    ),
    nav_panel(
      "Two",
      value = "two-value_box",
      layout_value_box_options(
        ui_value_box_options("two")
      )
    ),
    nav_panel(
      "Three",
      value = "three-value_box",
      layout_value_box_options(
        ui_value_box_options("three")
      )
    ),
    nav_item(
      actionLink(
        "show_code",
        tooltip(icon("code"), "Show code"),
        class = "nav-link"
      ),
    ),
    nav_item(
      input_dark_mode(
        style = htmltools::css(
          "--vertical-correction" = "5px",
          "--text-1" = "var(--bs-nav-link-color)"
        )
      )
    )
  ),
  # Extras ----
  tags$script(src = "build-a-box.js")
)

# Server ---------------------------------------
server <- function(input, output, session) {
  enable_themer <- reactive({
    query <- shiny::getQueryString()
    query_has_themer <- "themer" %in% names(query)

    if (!length(query) || !query_has_themer) return(ENABLE_THEMER)

    query$themer %in% c(1, "true", "") || ENABLE_THEMER
  })

  observeEvent(enable_themer(), {
    # TODO: This only runs on app startup right now
    req(enable_themer())

    insertUI(
      selector = "body",
      where = "beforeEnd",
      ui = tags$script("window.watchForThemer()")
    )
    bs_themer()
  })

  one <- module_value_box("one")
  two <- module_value_box("two")
  three <- module_value_box("three")

  module_global_controls("all", one, two, three)

  observeEvent(input$clicked_value_box, {
    nav_select("settings", input$clicked_value_box)
  })

  observeEvent(input$settings, {
    session$sendCustomMessage("active-value-box", input$settings)
  })

  observeEvent(input$show_code, {
    layout_value_boxes <-
      paste0(
        "layout_columns(\n  ",
        rlang::expr_text(one$code()), ",\n  ",
        rlang::expr_text(two$code()), ",\n  ",
        rlang::expr_text(three$code()), "\n",
        ")"
      )

    code_modal(layout_value_boxes)
  })
}

# BUILD A BOX -----------------------------------------
shinyApp(ui, server)
