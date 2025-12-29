library(shiny)
library(bslib)

ui <- page_sidebar(
  title = "Code Editor Demo",
  theme = bs_theme(version = 5),
  class = "bslib-page-dashboard",

  sidebar = sidebar(
    width = 300,
    title = "Editor Controls",
    gap = "0.5rem",

    selectInput(
      "language",
      "Language:",
      choices = c(
        "markdown",
        "r",
        "sql",
        "python",
        "julia",
        "javascript",
        "html",
        "css",
        "json",
        "yaml",
        "plain"
      ),
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
      choices = code_editor_themes(),
      selected = "github-light"
    ),

    selectInput(
      "theme_dark",
      "Dark Theme:",
      choices = code_editor_themes(),
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
        nav_panel(
          "Value",
          verbatimTextOutput("code_output"),
        ),
        nav_panel(
          "Settings",
          verbatimTextOutput("editor_info")
        )
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
  # Sample code for different languages
  sample_code <- list(
    sql = "SELECT \n  users.id,\n  users.name,\n  COUNT(orders.id) as order_count\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id\nGROUP BY users.id, users.name\nHAVING order_count > 5\nORDER BY order_count DESC;",
    python = "def fibonacci(n):\n    \"\"\"Generate Fibonacci sequence up to n terms\"\"\"\n    fib_sequence = [0, 1]\n    for i in range(2, n):\n        next_num = fib_sequence[i-1] + fib_sequence[i-2]\n        fib_sequence.append(next_num)\n    return fib_sequence\n\n# Example usage\nresult = fibonacci(10)\nprint(f\"First 10 Fibonacci numbers: {result}\")",
    r = "# Load libraries\nlibrary(dplyr)\nlibrary(ggplot2)\n\n# Analyze mtcars dataset\nmtcars %>%\n  group_by(cyl) %>%\n  summarise(\n    avg_mpg = mean(mpg),\n    avg_hp = mean(hp),\n    count = n()\n  ) %>%\n  ggplot(aes(x = factor(cyl), y = avg_mpg)) +\n  geom_col(fill = \"steelblue\") +\n  labs(title = \"Average MPG by Cylinders\",\n       x = \"Cylinders\",\n       y = \"Average MPG\")",
    julia = "# Julia matrix operations and comprehensions\nusing LinearAlgebra\n\n# Create matrices with different methods\nA = rand(3, 3)\nB = [i + j for i in 1:3, j in 1:3]\n\n# Matrix operations\nC = A * B\neigenvalues = eigvals(A)\ndet_A = det(A)\n\n# Type annotations and functions\nfunction matrix_stats(M::Matrix{Float64})::NamedTuple\n    return (mean=mean(M), max=maximum(M), min=minimum(M))\nend\n\n# Comprehension with condition\nfiltered = [x for x in eigenvalues if real(x) > 0.5]\n\n# Display results\nprintln(\"Matrix A:\")\nprintln(A)\nprintln(\"\\nDeterminant: \", det_A)\nprintln(\"\\nEigenvalues: \", eigenvalues)\nprintln(\"\\nStats: \", matrix_stats(A))",
    javascript = "// Async function to fetch data\nasync function fetchUserData(userId) {\n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Failed to fetch user data:', error);\n    return null;\n  }\n}\n\n// Usage\nfetchUserData(123).then(user => {\n  console.log('User data:', user);\n});",
    html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Web Page</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n  <header>\n    <h1>Welcome to My Website</h1>\n    <nav>\n      <ul>\n        <li><a href=\"#home\">Home</a></li>\n        <li><a href=\"#about\">About</a></li>\n        <li><a href=\"#contact\">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main>\n    <p>This is the main content area.</p>\n  </main>\n</body>\n</html>",
    css = "/* Modern CSS with variables */\n:root {\n  --primary-color: #007bff;\n  --secondary-color: #6c757d;\n  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;\n}\n\nbody {\n  font-family: var(--font-family);\n  line-height: 1.6;\n  color: #333;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  padding: 20px;\n  transition: transform 0.2s;\n}\n\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0,0,0,0.15);\n}",
    json = "{\n  \"name\": \"my-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A sample application\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"start\": \"node index.js\",\n    \"test\": \"jest\",\n    \"build\": \"webpack --mode production\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.0\",\n    \"react\": \"^18.2.0\",\n    \"react-dom\": \"^18.2.0\"\n  },\n  \"devDependencies\": {\n    \"jest\": \"^29.0.0\",\n    \"webpack\": \"^5.75.0\"\n  },\n  \"keywords\": [\"example\", \"demo\", \"sample\"],\n  \"author\": \"Your Name\",\n  \"license\": \"MIT\"\n}",
    markdown = "# Project Documentation\n\n## Overview\nThis is a sample project that demonstrates various features and capabilities.\n\n## Installation\n1. Clone the repository\n2. Install dependencies:\n   ```bash\n   npm install\n   ```\n\n## Features\n- **Modern Architecture**: Built with the latest technologies\n- **Responsive Design**: Works on all devices\n- **Performance Optimized**: Fast loading and execution\n\n## Usage Examples\n### Basic Implementation\n```javascript\nconst app = new Application();\napp.initialize();\n```\n\n## Contributing\nWe welcome contributions! Please follow these steps:\n1. Fork the repository\n2. Create your feature branch\n3. Submit a pull request\n\n## License\nThis project is licensed under the MIT License - see the LICENSE file for details.\n\n## Contact\nEmail: example@domain.com\nTwitter: @example",
    yaml = "# Application Configuration\napp:\n  name: sample-application\n  version: 1.0.0\n  environment: production\n\nserver:\n  host: localhost\n  port: 3000\n  ssl:\n    enabled: true\n    cert: /path/to/cert.pem\n    key: /path/to/key.pem\n\ndatabase:\n  primary:\n    host: db.example.com\n    port: 5432\n    name: maindb\n    user: admin\n    max_connections: 100\n  replica:\n    enabled: true\n    hosts:\n      - replica1.example.com\n      - replica2.example.com\n\nlogging:\n  level: info\n  format: json\n  outputs:\n    - type: file\n      path: /var/log/app.log\n    - type: stdout\n\nmonitoring:\n  enabled: true\n  interval: 60\n  endpoints:\n    - /health\n    - /metrics"
  )

  # Update code editor settings
  observeEvent(input$language, {
    language <- input$language
    if (language == "plain") {
      language <- "markdown"
    }
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
    lang <- input$language
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
