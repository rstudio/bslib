ui_global_controls <- function(id) {
  ns <- shiny::NS(id)

  tagList(
    layout_columns(
      class = "align-items-end",
      selectizeInput(
        ns("theme_style"),
        "Theme style",
        list(
          "All" = "all",
          "Semantic Colors" = list(
            "Background" = "semantic-bg",
            "Text" = "semantic-fg"
          ),
          "Theme Colors" = list(
            "Background" = "colors-bg",
            "Text" = "colors-fg"
          ),
          "Vibrant" = list(
            "Gradient" = "gradient"
          )
        )
      ),
      div(
        class = "btn-group",
        role = "group",
        "aria-label" = "Theme actions",
        shuffleButton(ns("random_theme"), "Theme"),
        shuffleButton(ns("random_stat"), "Stats"),
        actionButton(ns("reset_theme"), "Reset")
      )
    ),
    layout_columns(
      class = "align-items-start",
      div(
        selectInput(
          ns("showcase_item"),
          "Showcase Item",
          c("", "plot", "icon"),
          "plot"
        ),
        conditionalPanel(
          "input.showcase_item == 'icon'",
          ns = ns,
          shuffleButton(ns("random_icon"), "Icons")
        )
      ),
      selectInput(
        ns("showcase_layout"),
        "Showcase Layout",
        c("", "left center", "top right", "bottom"),
        "left center"
      )
    )
  )
}

server_global_controls <- function(input, output, sessions, one, two, three) {
  observeEvent(input$random_theme, {
    new_values <- switch(
      input$theme_style,
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

  observeEvent(input$random_stat, {
    one$random_stat()
    two$random_stat()
    three$random_stat()
  })

  observeEvent(input$random_icon, {
    one$showcase_icon$shuffle()
    two$showcase_icon$shuffle()
    three$showcase_icon$shuffle()
  })

  observeEvent(input$reset_theme, {
    one$theme$set("Default")
    two$theme$set("Default")
    three$theme$set("Default")
  })

  observeEvent(input$showcase_item, {
    one$set_showcase_item(input$showcase_item)
    two$set_showcase_item(input$showcase_item)
    three$set_showcase_item(input$showcase_item)
  }, ignoreInit = TRUE)

  observeEvent(input$showcase_layout, {
    one$set_showcase_layout(input$showcase_layout)
    two$set_showcase_layout(input$showcase_layout)
    three$set_showcase_layout(input$showcase_layout)
  }, ignoreInit = TRUE)
}

module_global_controls <- function(id, one, two, three) {
  callModule(server_global_controls, id, one = one, two = two, three = three)
}
