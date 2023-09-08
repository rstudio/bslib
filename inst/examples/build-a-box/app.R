# Packages ---------------------------------------
library(shiny)
library(bslib)

pkgs_extra <- c("plotly", "colourpicker")
pkgs_yes <- vapply(pkgs_extra, rlang::is_installed, logical(1))
if (any(!pkgs_yes)) {
  rlang::abort(paste0(
    "The `build-a-box` app requires additional packages: ",
    paste(pkgs_extra[!pkgs_yes], collapse = ", "),
  ))
}

library(plotly)

# Settings ---------------------------------------
ENABLE_THEMER <- identical(Sys.getenv("ENABLE_THEMER"), "true")

# Functions ---------------------------------------
layout_value_box_options <- function(ui_opts) {
  layout_columns(
    gap = "1rem",
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
    tags$script(src = "clipboard.min.js"),
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
    )
  ),
  # Extras ----
  tags$script(src = "build-a-box.js"),
  if (ENABLE_THEMER) tags$script("window.watchForThemer()")
)

# Server ---------------------------------------
server <- function(input, output, session) {
  if (ENABLE_THEMER) bs_themer()

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
        rlang::expr_text(two$code()), ",\n  ",
        rlang::expr_text(one$code()), ",\n  ",
        rlang::expr_text(three$code()), "\n",
        ")"
      )

    code_modal(layout_value_boxes)
  })
}

# BUILD A BOX -----------------------------------------
shinyApp(ui, server)
