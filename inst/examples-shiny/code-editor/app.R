library(shiny)
library(bslib)

# Load sample code snippets into a named list
sample_code_files <- dir("examples", full.names = TRUE)
names(sample_code_files) <- gsub(
  "\\.[[:alpha:]]+$",
  "",
  basename(sample_code_files)
)
sample_code <- lapply(sample_code_files, readLines)
sample_code <- lapply(sample_code, paste, collapse = "\n")

ui <- page_sidebar(
  title = "Code Editor Demo",
  theme = bs_theme(version = 5),
  class = "bslib-page-dashboard",

  sidebar = sidebar(
    width = 300,
    title = "Editor Controls",
    gap = "0.5rem",

    textInput("label", "Label:", value = "Code Editor"),

    selectInput(
      "language",
      "Language:",
      choices = c("plain", "html", bslib:::code_editor_bundled_languages),
      selected = "r"
    ),
    actionButton(
      "load_sample",
      "Load Sample Code",
      class = "btn-secondary btn-sm w-100 mb-2"
    ),
    actionButton(
      "clear_code",
      "Clear Editor",
      class = "btn-warning btn-sm w-100 mb-2"
    ),

    selectInput(
      "theme_light",
      "Light Theme:",
      choices = bslib:::code_editor_themes(),
      selected = "github-light"
    ),

    selectInput(
      "theme_dark",
      "Dark Theme:",
      choices = bslib:::code_editor_themes(),
      selected = "github-dark"
    ),

    p(
      actionLink(
        inputId = "toggle_dark_mode",
        style = css(text_decoration = "none"),
        label = tagList(
          input_dark_mode(
            id = "dark_mode",
            mode = "light",
            style = css("--vertical-correction" = "5px"),
            style = "color: currentColor"
          ),
          "Toggle Theme"
        )
      ),
      class = "text-end small"
    ),

    checkboxInput("read_only", "Read Only", value = FALSE),
    checkboxInput("line_numbers", "Line Numbers", value = TRUE),
    checkboxInput("word_wrap", "Word Wrap", value = FALSE),

    sliderInput("tab_size", "Tab Size:", min = 2, max = 8, value = 2, step = 1),

    radioButtons(
      "indentation",
      "Indentation:",
      choices = c("Spaces" = "space", "Tabs" = "tab"),
      selected = "space",
      inline = TRUE
    )
  ),

  layout_columns(
    card(
      card_header("Code Editor"),
      card_body(
        p(
          "This editor supports syntax highlighting, line numbers, word wrap, and more. ",
          "Try pressing ",
          tags$kbd("Ctrl/Cmd+Enter"),
          " to submit the code."
        ),
        input_code_editor(
          "code",
          value = "library(tidyverse)\n\n# Sample R code\nmtcars |>\n  group_by(cyl) |>\n  summarise(avg_mpg = mean(mpg)) |>\n  arrange(desc(avg_mpg))",
          label = "Code Editor",
          language = "r",
          line_numbers = TRUE,
          word_wrap = FALSE,
          # height = "400px",
          fill = TRUE
        )
      )
    ),
    layout_columns(
      col_widths = 12,
      navset_card_underline(
        title = "Editor Info",
        nav_panel("Value", verbatimTextOutput("code_output"), ),
        nav_panel("Settings", verbatimTextOutput("editor_info"))
      ),

      card(
        card_header("Features & Keyboard Shortcuts"),
        card_body(
          tags$ul(
            tags$li(
              tags$kbd("Ctrl/Cmd+Enter"),
              " - Submit code to R (triggers reactive update)"
            ),
            tags$li(tags$kbd("Ctrl/Cmd+Z"), " - Undo"),
            tags$li(tags$kbd("Ctrl/Cmd+Shift+Z"), " - Redo"),
            tags$li(tags$kbd("Tab"), " - Indent selection"),
            tags$li(tags$kbd("Shift+Tab"), " - Dedent selection"),
            tags$li("Copy button in top-right corner"),
            tags$li("Automatic light/dark theme switching"),
            tags$li("Update on blur (when editor loses focus)")
          )
        )
      )
    )
  )
)

server <- function(input, output, session) {
  observeEvent(input$label, {
    update_code_editor("code", label = input$label)
  })

  observeEvent(input$language, {
    language <- switch(
      input$language,
      plain = "markdown",
      html = "markup",
      input$language
    )
    updateActionButton(
      session,
      "load_sample",
      disabled = !language %in% names(sample_code)
    )
    update_code_editor("code", language = language)
  })
  observeEvent(input$theme_light, {
    update_code_editor("code", theme_light = input$theme_light)
  })
  observeEvent(input$theme_dark, {
    update_code_editor("code", theme_dark = input$theme_dark)
  })
  observeEvent(input$read_only, {
    update_code_editor("code", read_only = input$read_only)
  })
  observeEvent(input$line_numbers, {
    update_code_editor("code", line_numbers = input$line_numbers)
  })
  observeEvent(input$word_wrap, {
    update_code_editor("code", word_wrap = input$word_wrap)
  })
  observeEvent(input$tab_size, {
    update_code_editor("code", tab_size = input$tab_size)
  })
  observeEvent(input$indentation, {
    update_code_editor("code", indentation = input$indentation)
  })

  # Load sample code for selected language
  observeEvent(input$load_sample, {
    lang <- switch(
      input$language,
      plain = "markdown",
      html = "markup",
      input$language
    )
    sample <- sample_code[[lang]]
    if (!is.null(sample)) {
      update_code_editor(
        "code",
        value = sample,
        language = lang
      )
    }
  })

  # Clear editor
  observeEvent(input$clear_code, {
    update_code_editor("code", value = "")
  })

  observeEvent(input$toggle_dark_mode, {
    bslib::toggle_dark_mode()
  })

  # Display current code
  output$code_output <- renderText({
    code <- input$code
    if (is.null(code) || code == "") {
      "[Editor is empty]"
    } else {
      code
    }
  })

  # Display editor information
  output$editor_info <- renderText({
    code <- input$code
    if (is.null(code)) {
      code <- ""
    }

    lines <- length(strsplit(code, "\n")[[1]])
    chars <- nchar(code)

    paste(
      sprintf("Language: %s", input$language),
      sprintf("Lines: %d", lines),
      sprintf("Characters: %d", chars),
      sprintf("Read Only: %s", input$read_only),
      sprintf("Line Numbers: %s", input$line_numbers),
      sprintf("Word Wrap: %s", input$word_wrap),
      sprintf("Tab Size: %d", input$tab_size),
      sprintf("Indentation: %s", input$indentation),
      sep = "\n"
    )
  })
}

shinyApp(ui = ui, server = server)
