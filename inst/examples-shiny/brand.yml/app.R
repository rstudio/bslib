rlang::check_installed("shiny", version = "1.8.1")
rlang::check_installed("bslib", version = "0.8.0.9000")
rlang::check_installed("future")
rlang::check_installed("ggplot2")
rlang::check_installed("markdown")

library(shiny)
library(bslib)
library(ggplot2)

library(future)
plan(multisession)

options(
  bslib.color_contrast_warnings = FALSE
  # shiny.autoreload.pattern = "_brand[.]yml|app[.]R|[.]s?css" ## TODO: Enable after fixing autoreload
)

if (!file.exists("Monda.ttf")) {
  download.file(
    "https://github.com/google/fonts/raw/48db77e32954f6f5e65a7122ecbe8a2093c4f5d7/ofl/monda/Monda%5Bwght%5D.ttf",
    "Monda.ttf"
  )
  download.file(
    "https://github.com/google/fonts/raw/48db77e32954f6f5e65a7122ecbe8a2093c4f5d7/ofl/monda/OFL.txt",
    "Monda-OFL.txt"
  )
}

theme_brand <- bs_theme(brand = TRUE)

brand <- attr(theme_brand, "brand")

theme_set(theme_minimal())

if (requireNamespace("thematic", quietly = TRUE)) {
  if (!is.null(brand)) {
    # TODO: Update plot fonts dynamically
    thematic::thematic_shiny(
      font = bslib:::brand_pluck(brand, "typography", "base", "family")
    )
  } else {
    thematic::thematic_shiny()
  }
}

is_app_hosted <-
  Sys.getenv("R_CONFIG_ACTIVE") %in%
    c("shinylive", "shinyapps", "rsconnect", "rstudio_cloud")
is_app_packaged <-
  getwd() != system.file("examples-shiny/brand.yml", package = "bslib")

ui <- page_navbar(
  theme = bs_add_rules(theme_brand, sass::sass_file("_colors.scss")),
  title = "brand.yml Demo",
  fillable = TRUE,

  sidebar = sidebar(
    id = "sidebar_editor",
    position = "right",
    open = "closed",
    width = "40%",
    bg = "var(--bs-dark)",
    fg = "var(--bs-light)",

    card(
      card_header(
        class = "text-bg-secondary hstack",
        div("Edit", code("brand.yml")),
        div(
          class = "ms-auto",
          tooltip(
            tags$a(
              class = "btn btn-link p-0",
              href = "https://posit-dev.github.io/brand-yml/brand/",
              target = "_blank",
              bsicons::bs_icon(
                "question-square-fill",
                title = "About brand.yml",
                size = "1.25rem"
              )
            ),
            "About brand.yml"
          )
        )
      ),
      htmltools::tagAppendAttributes(
        textAreaInput(
          "txt_brand_yml",
          label = NULL,
          value = paste(readLines("_brand.yml", warn = FALSE), collapse = "\n"),
          width = "100%",
          height = "80%",
          rows = 20
        ),
        class = "font-monospace",
        .cssSelector = "textarea"
      ),
      card_body(
        padding = 0,
        div(
          id = "editor_brand_yml",
          style = "overflow: auto;",
          as_fill_item()
        )
      )
    ),

    tags$script(
      type = "module",
      HTML(
        '
import { basicEditor } from "https://esm.sh/prism-code-editor@3.4.0/setups";
import "https://esm.sh/prism-code-editor@3.4.0/prism/languages/yaml";

const shinyInput = document.getElementById("txt_brand_yml");

function initBrandEditor() {
  if (typeof Shiny.setInputValue !== "function") {
    setTimeout(initBrandEditor, 100);
    return;
  }
  window.brandEditor = basicEditor(
    "#editor_brand_yml",
    {
      language: "yml",
      theme: "github-dark",
      value: shinyInput.value,
      onUpdate: (value) => {
        Shiny.setInputValue("txt_brand_yml", value);
      },
    },
    () => shinyInput.parentElement.parentElement.remove()
  );
}

initBrandEditor();
'
      )
    ),

    tags$style(
      HTML(
        '
.bslib-sidebar-layout .sidebar-title { margin-bottom: 0 }
#sidebar_editor .sidebar-content { height: max(600px, 100%) }'
      )
    ),

    if (is_app_hosted || is_app_packaged) {
      shiny::downloadButton(
        "download",
        label = span("Download", code("_brand.yml"), "file"),
        class = "btn-outline-light"
      )
    } else {
      actionButton(
        "save",
        label = span("Save", code("_brand.yml"), "file"),
        class = "btn-outline-light"
      )
    }
  ),

  nav_panel(
    "Input Output Demo",
    value = "dashboard",
    layout_sidebar(
      sidebar = sidebar(
        sliderInput("slider1", "Numeric Slider Input", 0, 11, 11),
        numericInput("numeric1", "Numeric Input Widget", 30),
        dateInput("date1", "Date Input Component", value = "2024-01-01"),
        input_switch("switch1", "Binary Switch Input", value = TRUE),
        radioButtons(
          "radio1",
          "Radio Button Group",
          choices = c("Option A", "Option B", "Option C", "Option D")
        ),
        actionButton("action1", "Action Button")
      ),
      shiny::useBusyIndicators(),
      layout_column_wrap(
        value_box(
          title = "Metric 1",
          value = "100",
          theme = "primary",
          id = "value_box_one"
        ),
        value_box(
          title = "Metric 2",
          value = "200",
          theme = "secondary",
          id = "value_box_two"
        ),
        value_box(
          title = "Metric 3",
          value = "300",
          theme = "info",
          id = "value_box_three"
        )
      ),
      card(
        card_header("Plot Output"),
        plotOutput("out_plot")
      ),
      card(
        card_header("Text Output"),
        verbatimTextOutput("out_text")
      )
    )
  ),

  nav_panel(
    "Widget Gallery",
    layout_column_wrap(
      width = 300,
      heights_equal = "row",
      card(
        card_header("Button Variants"),
        actionButton("btn_default", "Default"),
        actionButton("btn_primary", "Primary", class = "btn-primary"),
        actionButton("btn_secondary", "Secondary", class = "btn-secondary"),
        actionButton("btn_success", "Success", class = "btn-success"),
        actionButton("btn_danger", "Danger", class = "btn-danger"),
        actionButton("btn_warning", "Warning", class = "btn-warning"),
        actionButton("btn_info", "Info", class = "btn-info")
      ),
      card(
        card_header("Radio Button Examples"),
        radioButtons(
          "radio2",
          "Standard Radio Group",
          choices = c("Selection 1", "Selection 2", "Selection 3")
        ),
        radioButtons(
          "radio3",
          "Inline Radio Group",
          choices = c("Option 1", "Option 2", "Option 3"),
          inline = TRUE
        )
      ),
      card(
        card_header("Checkbox Examples"),
        checkboxGroupInput(
          "check1",
          "Standard Checkbox Group",
          choices = c("Item 1", "Item 2", "Item 3")
        ),
        checkboxGroupInput(
          "check2",
          "Inline Checkbox Group",
          choices = c("Choice A", "Choice B", "Choice C"),
          inline = TRUE
        )
      ),
      card(
        card_header("Select Input Widgets"),
        selectizeInput(
          "select1",
          "Selectize Input",
          choices = c("Selection A", "Selection B", "Selection C")
        ),
        selectInput(
          "select2",
          "Multiple Select Input",
          choices = c("Item X", "Item Y", "Item Z"),
          multiple = TRUE
        )
      ),
      card(
        card_header("Text Input Widgets"),
        textInput("text1", "Text Input"),
        textAreaInput(
          "textarea1",
          "Text Area Input",
          value = "Default text content for the text area widget"
        ),
        passwordInput("password1", "Password Input")
      )
    )
  ),

  nav_panel(
    "Colors",
    div(
      class = "container-sm overflow-y-auto",
      uiOutput("ui_colors")
    )
  ),

  nav_panel(
    "Documentation",
    div(
      class = "container-sm overflow-y-auto",
      if (FALSE) library(markdown), # for shinyapps.io
      includeMarkdown("documentation.md")
    )
  ),

  nav_spacer(),
  nav_item(input_dark_mode(id = "color_mode")),
  nav_item(
    actionLink(
      "show_editor",
      bsicons::bs_icon(
        "pencil-fill",
        size = "1rem",
        title = "Show/hide editor"
      ),
      class = "nav-link"
    )
  ),
)

errors <- rlang::new_environment()

error_notification <- function(context) {
  function(err) {
    time <- as.character(Sys.time())

    msg <- conditionMessage(err)
    # Strip ANSI color sequences from error messages
    msg <- gsub(
      pattern = "\u001b\\[.*?m",
      replacement = "",
      msg
    )
    # Wrap at 40 characters
    msg <- paste(strwrap(msg, width = 60), collapse = "\n")

    err_id <- rlang::hash(list(time, msg))
    assign(err_id, list(message = msg, context = context), envir = errors)

    showNotification(
      markdown(context),
      action = tags$button(
        class = "btn btn-outline-danger pull-right",
        onclick = sprintf(
          "event.preventDefault(); Shiny.setInputValue('show_error', '%s')",
          err_id
        ),
        "Show details"
      ),
      duration = 10,
      type = "error",
      id = err_id
    )
  }
}

server <- function(input, output, session) {
  brand_yml_text <- debounce(reactive(input$txt_brand_yml), 1000)
  brand_yml <- reactiveVal()

  observeEvent(input$show_editor, sidebar_toggle("sidebar_editor"))

  observeEvent(input$show_error, {
    req(input$show_error)
    err <- get0(input$show_error, errors)

    if (is.null(err)) {
      message("Could not find error with id ", input$show_error)
      return()
    }

    removeNotification(input$show_error)
    rm(list = input$show_error, envir = errors)

    showModal(
      modalDialog(
        size = "l",
        easyClose = TRUE,
        markdown(err$context),
        pre(err$message)
      )
    )
  })

  observeEvent(brand_yml_text(), {
    req(brand_yml_text())

    tryCatch(
      {
        b <- yaml::yaml.load(brand_yml_text())
        b$path <- normalizePath("_brand.yml")
        brand_yml(b)
      },
      error = error_notification(
        "Could not parse `_brand.yml` file. Check for syntax errors."
      )
    )
  })

  observeEvent(brand_yml(), {
    req(brand_yml())

    tryCatch(
      {
        theme <- bs_theme(brand = brand_yml())
        theme <- bs_add_rules(theme, sass::sass_file("_colors.scss"))
        session$setCurrentTheme(theme)
      },
      error = error_notification(
        "Could not compile branded theme. Please check your `_brand.yml` file."
      )
    )
  })

  observeEvent(input$save, {
    validate(
      need(input$txt_brand_yml, "_brand.yml file contents cannot be empty.")
    )

    tryCatch(
      {
        writeLines(input$txt_brand_yml, "_brand.yml")
        showNotification(markdown("Saved `_brand.yml`!"))
      },
      error = error_notification("Could not save `_brand.yml`.")
    )
  })

  output$download <- downloadHandler(
    filename = "_brand.yml",
    content = function(file) {
      validate(
        need(input$txt_brand_yml, "_brand.yml file contents cannot be empty.")
      )
      writeLines(input$txt_brand_yml, file)
    }
  )

  PlotTask <- ExtendedTask$new(function(x_max, y_factor) {
    x <- seq(0, x_max, length.out = 100)
    y <- sin(x) * y_factor

    future({
      Sys.sleep(3)

      df <- data.frame(x = x, y = y)

      ggplot(df, aes(x = x, y = y)) +
        geom_col(width = 1, position = "identity") +
        labs(title = "Sine Wave Output", x = "", y = "")
    })
  })

  observe({
    x_max <- debounce(reactive(input$numeric1), 500)()
    y_factor <- debounce(reactive(input$slider1), 500)()

    PlotTask$invoke(x_max = x_max, y_factor = y_factor)
  })

  output$out_plot <- renderPlot({
    PlotTask$result()
  })

  output$out_text <- renderText({
    "example_function <- function() {\n  return(\"Function output text\")\n}"
  })

  output$ui_colors <- renderUI({
    bootstrap_colors <- c(
      "blue",
      "indigo",
      "purple",
      "pink",
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "cyan"
    )
    colors <- c("gray", bootstrap_colors)

    tagList(
      layout_columns(
        col_widths = 3,
        class = "font-monospace",
        !!!lapply(
          c(
            "primary",
            "secondary",
            "dark",
            "light",
            "info",
            "success",
            "warning",
            "danger"
          ),
          function(color) {
            div(
              color,
              class = paste0("p-3 mb-2 position-relative text-bg-", color)
            )
          }
        )
      ),
      layout_columns(
        col_widths = 3,
        class = "font-monospace",
        !!!lapply(
          c("black", "white", "foreground", "background"),
          function(color) {
            div(
              color,
              class = paste0("p-3 mb-2 position-relative bd-", color)
            )
          }
        )
      ),
      layout_column_wrap(
        width = 200,
        !!!lapply(colors, function(color) {
          if (!color %in% c("white", "black")) {
            div(
              class = "mb-3",
              div(
                color,
                class = paste0("p-3 mb-2 position-relative bd-", color, "-500")
              ),
              lapply(seq(100, 900, 100), function(r) {
                div(
                  paste0(color, "-", r),
                  class = paste0("p-3 bd-", color, "-", r)
                )
              })
            )
          }
        })
      )
    )
  })
}

shinyApp(ui, server)
