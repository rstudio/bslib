library(shiny)
library(bslib)
library(plotly)

ENABLE_THEMER <- identical(Sys.getenv("ENABLE_THEMER"), "true")

ui_one <- ui_value_box_options("one")
ui_two <- ui_value_box_options("two")
ui_three <- ui_value_box_options("three")

layout_value_box_options <- function(ui_opts) {
  layout_columns(
    gap = "1rem",
    div(h4("Content", class = "border-bottom"), ui_opts$title_value),
    div(h4("Theme", class = "border-bottom"), ui_opts$theme_opts),
    div(h4("Showcase", class = "border-bottom"), ui_opts$showcase)
  )
}

ui <- page_fixed(
  title = "Build a Box | bslib",
  theme = bs_theme(preset = "shiny"),
  h2("Build a Box", class = "mt-4"),
  tags$head(
    tags$script(src = "clipboard.min.js"),
    tags$link(rel = "stylesheet", href = "build-a-box.css")
  ),
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
  navset_card_pill(
    id = "settings",
    title = "Value box settings",
    nav_panel(
      "All",
      value = "all",
      layout_columns(
        class = "align-items-end",
        selectizeInput(
          "all_theme_style",
          "Theme style",
          list(
            "All" = "all",
            "Background" = list(
              "Semantic" = "semantic-bg",
              "Main Colors" = "colors-bg",
              "Gradient" = "gradient"
            ),
            "Text" = list(
              "Semantic" = "semantic-fg",
              "Main Colors" = "colors-fg"
            )
          )
        ),
        div(
          class = "btn-group",
          role = "group",
          "aria-label" = "Theme actions",
          shuffleButton("all_random_theme", "Theme"),
          shuffleButton("all_random_stat", "Stats"),
          actionButton("all_reset_theme", "Reset")
        )
      ),
      layout_columns(
        class = "align-items-start",
        div(
          selectInput("all_showcase_item", "Showcase Item", c("", "plot", "icon"), "plot"),
          conditionalPanel(
            "input.all_showcase_item == 'icon'",
            shuffleButton("all_random_icon", "Icons")
          )
        ),
        selectInput(
          "all_showcase_layout",
          "Showcase Layout",
          c("", "left center", "top right", "bottom"),
          "left center"
        )
      )
    ),
    nav_panel(
      "One",
      value = "one-value_box",
      layout_value_box_options(ui_one)
    ),
    nav_panel(
      "Two",
      value = "two-value_box",
      layout_value_box_options(ui_two)
    ),
    nav_panel(
      "Three",
      value = "three-value_box",
      layout_value_box_options(ui_three)
    ),
    nav_item(
      actionLink(
        "show_code",
        tooltip(icon("code"), "Show code"),
        class = "nav-link"
      ),
    )
  ),
  tags$script(src = "build-a-box.js"),
  if (ENABLE_THEMER) tags$script("window.watchForThemer()")
)


server <- function(input, output, session) {
  if (ENABLE_THEMER) bs_themer()

  one <- module_value_box("one")
  two <- module_value_box("two")
  three <- module_value_box("three")

  observeEvent(input$clicked_value_box, {
    nav_select("settings", input$clicked_value_box)
  })

  observeEvent(input$settings, {
    session$sendCustomMessage("active-value-box", input$settings)
  })

  observeEvent(input$all_random_theme, {
    new_values <- switch(
      input$all_theme_style,
      all = {
        one$theme$shuffle()
        two$theme$shuffle()
        three$theme$shuffle()
        NULL
      },
      "semantic-bg" = sample(setdiff(theme_colors, c("light", "dark")), 3),
      "semantic-fg" = paste0("text-", sample(setdiff(theme_colors, c("light", "dark")), 3)),
      "colors-bg" = sample(named_colors, 3, replace = TRUE),
      "colors-fg" = paste0("text-", sample(named_colors, 3, replace = TRUE)),
      gradient = sample(gradient_classes, 3)
    )

    if (is.null(new_values)) return()

    one$theme$set(new_values[[1]])
    two$theme$set(new_values[[2]])
    three$theme$set(new_values[[3]])
  })

  observeEvent(input$all_random_stat, {
    one$random_stat()
    two$random_stat()
    three$random_stat()
  })

  observeEvent(input$all_random_icon, {
    one$showcase_icon$shuffle()
    two$showcase_icon$shuffle()
    three$showcase_icon$shuffle()
  })

  observeEvent(input$all_reset_theme, {
    one$theme$set("Default")
    two$theme$set("Default")
    three$theme$set("Default")
  })

  observeEvent(input$all_showcase_item, {
    one$set_showcase_item(input$all_showcase_item)
    two$set_showcase_item(input$all_showcase_item)
    three$set_showcase_item(input$all_showcase_item)
  }, ignoreInit = TRUE)

  observeEvent(input$all_showcase_layout, {
    one$set_showcase_layout(input$all_showcase_layout)
    two$set_showcase_layout(input$all_showcase_layout)
    three$set_showcase_layout(input$all_showcase_layout)
  }, ignoreInit = TRUE)

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

shinyApp(ui, server)
