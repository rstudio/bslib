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

  code_one <- module_value_box("one")
  code_two <- module_value_box("two")
  code_three <- module_value_box("three")

  observeEvent(input$clicked_value_box, {
    nav_select("settings", input$clicked_value_box)
  })

  observeEvent(input$settings, {
    session$sendCustomMessage("active-value-box", input$settings)
  })

  observeEvent(input$show_code, {
    code <- paste0(
      "layout_columns(\n  ",
      rlang::expr_text(code_one()), ",\n  ",
      rlang::expr_text(code_two()), ",\n  ",
      rlang::expr_text(code_three()), "\n",
      ")"
    )

    if (requireNamespace("styler", quietly = TRUE)) {
      code <- styler::style_text(code)
    }

    code <- paste(code, collapse = "\n")

    showModal(
      modalDialog(
        HTML(sprintf(
          '<pre><code id="value-box-code">%s</code></pre>',
          code
        )),
        p(
          id = "copy-clipboard-not-supported",
          class = "text-muted",
          HTML("Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> to copy the value box example code."),
          tags$script(HTML("checkCopyPermissions()"))
        ),
        tags$button(
          id = "copy-code-to-clipboard",
          class = "btn btn-outline-primary",
          onclick = "copyValueBoxCode()",
          "Copy to clipboard"
        ),
        footer = modalButton("Done"),
        easyClose = TRUE
      )
    )
  })
}

shinyApp(ui, server)
