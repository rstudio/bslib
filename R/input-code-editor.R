#' Code editor input for Shiny
#'
#' @description
#' Creates an interactive code editor input that can be used in Shiny
#' applications. The editor provides syntax highlighting, line numbers, and
#' other code editing features powered by Prism Code Editor.
#'
#' @section Keyboard shortcuts:
#' The editor supports the following keyboard shortcuts:
#' - `Ctrl/Cmd+Enter`: Submit the current code to R
#' - `Ctrl/Cmd+Z`: Undo
#' - `Ctrl/Cmd+Shift+Z`: Redo
#' - `Tab`: Indent selection
#' - `Shift+Tab`: Dedent selection
#'
#' @section Update triggers:
#' The editor value is sent to R when:
#' - The editor loses focus (blur event)
#' - The user presses `Ctrl/Cmd+Enter`
#'
#' @section Theme switching:
#' The editor automatically switches between `theme_light` and `theme_dark`
#' when used with [bslib::input_dark_mode()].
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   input_code_editor(
#'     "sql_query",
#'     value = "SELECT * FROM table",
#'     language = "sql"
#'   ),
#'   verbatimTextOutput("code_output")
#' )
#'
#' server <- function(input, output, session) {
#'   output$code_output <- renderPrint({
#'     input$sql_query
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @param id Input ID. Access the current value with `input$<id>`.
#' @param value Initial code content. Default is an empty string.
#' @param label Display label for the input. Default is `NULL` for no label.
#' @param ... Must be empty. Prevents accidentally passing unnamed arguments.
#' @param language Programming language for syntax highlighting. Supported
#'   languages include `"r"`, `"python"`, `"julia"`, `"sql"`, `"javascript"`,
#'   `"typescript"`, `"html"`, `"css"`, `"scss"`, `"sass"`, `"json"`,
#'   `"markdown"`, `"yaml"`, `"xml"`, `"toml"`, `"ini"`, `"bash"`, `"docker"`,
#'   `"latex"`, `"cpp"`, `"rust"`, `"diff"`, and `"plain"`. Default is
#'   `"plain"`.
#' @param height CSS height of the editor. Default is `"300px"`.
#' @param width CSS width of the editor. Default is `"100%"`.
#' @param theme_light Theme to use in light mode. See [code_editor_themes()] for
#'   available themes. Default is `"github-light"`.
#' @param theme_dark Theme to use in dark mode. See [code_editor_themes()] for
#'   available themes. Default is `"github-dark"`.
#' @param read_only Whether the editor should be read-only. Default is `FALSE`.
#' @param line_numbers Whether to show line numbers. Default is `TRUE`, except
#'   for markdown and plain text.
#' @param word_wrap Whether to wrap long lines, by default disabled when
#'   `line_numbers` is `FALSE`.
#' @param tab_size Number of spaces per tab. Default is `2`.
#' @param indentation Type of indentation: `"space"` or `"tab"`. Default is
#'   `"space"`.
#' @inheritParams card
#'
#' @return An HTML tag object that can be included in a Shiny UI.
#'
#' @family input controls
#' @export
input_code_editor <- function(
  id,
  value = "",
  label = NULL,
  ...,
  language = "sql",
  height = "auto",
  width = "100%",
  theme_light = "github-light",
  theme_dark = "github-dark",
  read_only = FALSE,
  line_numbers = NULL,
  word_wrap = NULL,
  tab_size = 2,
  indentation = c("space", "tab"),
  fill = TRUE
) {
  # Ensure no extra arguments
  rlang::check_dots_empty()
  stopifnot(rlang::is_bool(fill))

  # Restore input for bookmarking support
  value <- shiny::restoreInput(id, default = value)

  check_value_line_count(value)

  # Validate inputs
  language <- arg_match_language(language)
  theme_light <- arg_match_theme(theme_light, "theme_light")
  theme_dark <- arg_match_theme(theme_dark, "theme_dark")

  if (is.null(line_numbers)) {
    line_numbers <- !language %in%
      c("markdown", "md", "plain", "plaintext", "text", "txt")
  }

  if (is.null(word_wrap)) {
    word_wrap <- !line_numbers
  }

  stopifnot(
    "`line_numbers` must be boolean" = is.logical(line_numbers) &&
      length(line_numbers) == 1,
    "`read_only` must be boolean" = is.logical(read_only) &&
      length(read_only) == 1,
    "`word_wrap` must be boolean" = is.logical(word_wrap) &&
      length(word_wrap) == 1,
    "`tab_size` must be a single positive integer" = is.numeric(tab_size) &&
      length(tab_size) == 1 &&
      tab_size >= 1 &&
      tab_size == as.integer(tab_size)
  )

  indentation <- rlang::arg_match(indentation)
  insert_spaces <- indentation == "space"

  # Create inner container that will hold the actual editor
  editor_inner <- htmltools::tags$div(
    class = "code-editor",
    bslib::as_fill_item(),
    style = htmltools::css(
      display = "grid"
    )
  )

  label_tag <- shiny_input_label(id, label)

  tag <- htmltools::tags$div(
    id = id,
    class = "shiny-input-code-editor",
    style = htmltools::css(
      height = height,
      width = width
    ),
    if (fill) bslib::as_fill_item(),
    bslib::as_fillable_container(),
    `data-language` = language,
    `data-initial-code` = value,
    `data-theme-light` = theme_light,
    `data-theme-dark` = theme_dark,
    `data-read-only` = tolower(as.character(read_only)),
    `data-line-numbers` = tolower(as.character(line_numbers)),
    `data-word-wrap` = tolower(as.character(word_wrap)),
    `data-tab-size` = as.character(tab_size),
    `data-insert-spaces` = tolower(as.character(insert_spaces)),
    label_tag,
    editor_inner,
    code_editor_dependencies()
  )

  tag <- tag_require(tag, version = 5, caller = "input_code_editor()")
  as_fragment(tag, page = page_fillable)
}

#' @rdname input_code_editor
#' @inheritParams nav_insert
#' @export
update_code_editor <- function(
  id,
  value = NULL,
  ...,
  language = NULL,
  theme_light = NULL,
  theme_dark = NULL,
  read_only = NULL,
  line_numbers = NULL,
  word_wrap = NULL,
  tab_size = NULL,
  indentation = NULL,
  session = get_current_session()
) {
  # Ensure no extra arguments
  rlang::check_dots_empty()

  # Validate inputs if provided
  if (!is.null(language)) {
    language <- arg_match_language(language, "language")
  }
  if (!is.null(theme_light)) {
    theme_light <- arg_match_theme(theme_light, "theme_light")
  }
  if (!is.null(theme_dark)) {
    theme_dark <- arg_match_theme(theme_dark, "theme_dark")
  }

  # Build message with only non-NULL values
  message <- dropNulls(list(
    code = if (!is.null(value)) {
      check_value_line_count(value)
      value
    },
    language = language,
    theme_light = theme_light,
    theme_dark = theme_dark,
    read_only = read_only,
    line_numbers = line_numbers,
    word_wrap = word_wrap,
    tab_size = tab_size,
    indentation = if (!is.null(indentation)) {
      rlang::arg_match(indentation, c("space", "tab"))
    }
  ))

  # Send message to JavaScript binding
  session$sendInputMessage(id, message)

  invisible(NULL)
}

#' @rdname input_code_editor
#' @export
code_editor_themes <- function() {
  themes_dir <- path_inst("lib", "prism-code-editor", "themes")

  if (!dir.exists(themes_dir)) {
    return(character(0))
  }

  theme_files <- list.files(themes_dir, pattern = "\\.css$")
  sub("\\.css$", "", theme_files)
}

# Internal dependency functions ------------------------------------------------

code_editor_dependencies <- function() {
  list(
    code_editor_dependency_prism(),
    code_editor_dependency_js(),
    code_editor_dependency_css()
  )
}

code_editor_dependency_prism <- function() {
  htmltools::htmlDependency(
    name = "prism-code-editor",
    version = version_prism_code_editor,
    package = "bslib",
    src = "lib/prism-code-editor",
    script = list(src = "index.js", type = "module"),
    stylesheet = c("layout.css", "copy.css"),
    all_files = TRUE
  )
}

code_editor_dependency_js <- function() {
  minified <- get_shiny_devmode_option("shiny.minified", default = TRUE)
  htmltools::htmlDependency(
    name = "bslib-code-editor-js",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components/dist",
    script = list(
      list(
        src = paste0("code-editor", if (minified) ".min", ".js"),
        type = "module"
      )
    )
  )
}

code_editor_dependency_css <- function() {
  htmltools::htmlDependency(
    name = "bslib-code-editor-css",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components/dist",
    stylesheet = "code-editor.css"
  )
}

# Validation helpers -----------------------------------------------------------

arg_match_theme <- function(theme, arg_name = "theme") {
  if (is.null(theme)) {
    return(invisible(NULL))
  }

  available_themes <- code_editor_themes()

  rlang::arg_match(
    theme,
    values = available_themes,
    error_arg = arg_name,
    error_call = rlang::caller_env()
  )
}

arg_match_language <- function(language, arg_name = "language") {
  if (is.null(language)) {
    return(invisible(NULL))
  }

  # Language aliases (user-friendly names → prism grammar names)
  language_aliases <- c(
    "md" = "markdown",
    "html" = "markup",
    "plain" = "plain",
    "plaintext" = "plain",
    "text" = "plain",
    "txt" = "plain"
  )

  # All supported languages: bundled prism grammars + aliases
  supported_languages <- c(
    code_editor_bundled_languages,
    names(language_aliases)
  )

  language <- rlang::arg_match(
    language,
    values = supported_languages,
    error_arg = arg_name,
    error_call = rlang::caller_env()
  )

  # Resolve aliases to their actual grammar names
  if (language %in% names(language_aliases)) {
    language <- language_aliases[[language]]
  }

  language
}

check_value_line_count <- function(value) {
  if (is.null(value) || !is.character(value) || length(value) == 0) {
    return(invisible(NULL))
  }

  line_count <- length(strsplit(value, "\n", fixed = TRUE)[[1]])

  if (line_count >= 750) {
    rlang::warn(c(
      sprintf("Code editor value contains %d lines.", line_count),
      "i" = "The editor may experience performance issues with 750 or more lines."
    ))
  }

  invisible(NULL)
}
