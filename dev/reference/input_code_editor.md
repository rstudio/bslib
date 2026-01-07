# Code editor input

Creates an interactive light-weight code editor input that can be used
in Shiny applications. The editor provides syntax highlighting, line
numbers, and other basic code editing features powered by Prism Code
Editor. For a complete example, run
`shiny::runExample("code-editor", package = "bslib")`.

The editor value is not sent to R on every keystroke. Instead, updates
are reflected on the server when the user moves away from the editor or
when they press `Ctrl/Cmd` + `Enter`.

Note that this input is not designed for editing or rendering large
files. Displaying files with 1,000 lines or more may lead to performance
issues.

## Usage

``` r
input_code_editor(
  id,
  label = NULL,
  value = "",
  ...,
  language = "plain",
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
)

update_code_editor(
  id,
  ...,
  value = NULL,
  label = NULL,
  language = NULL,
  theme_light = NULL,
  theme_dark = NULL,
  read_only = NULL,
  line_numbers = NULL,
  word_wrap = NULL,
  tab_size = NULL,
  indentation = NULL,
  session = get_current_session()
)
```

## Arguments

- id:

  Input ID. Access the current value with `input$<id>`.

- label:

  Display label for the input. Default is `NULL` for no label.

- value:

  Code content. Default is an empty string.

- ...:

  Named arguments, e.g. `class` and `style`, that will be added to the
  outer container of the input.

- language:

  Programming language for syntax highlighting. Supported languages
  include `"r"`, `"python"`, `"julia"`, `"sql"`, `"javascript"`,
  `"typescript"`, `"html"`, `"css"`, `"scss"`, `"sass"`, `"json"`,
  `"markdown"`, `"yaml"`, `"xml"`, `"toml"`, `"ini"`, `"bash"`,
  `"docker"`, `"latex"`, `"cpp"`, `"rust"`, `"diff"`, and `"plain"`.
  Default is `"plain"`.

- height:

  CSS height of the editor. Default is `"300px"`.

- width:

  CSS width of the editor. Default is `"100%"`.

- theme_light, theme_dark:

  Theme to use in light or dark mode. Defaults to `"github-light"` and
  `"github-dark"`, respectively. See the Theme section for more details.

- read_only:

  Whether the editor should be read-only. Default is `FALSE`.

- line_numbers:

  Whether to show line numbers. Default is `TRUE`, except for markdown
  and plain text.

- word_wrap:

  Whether to wrap long lines, by default disabled when `line_numbers` is
  `FALSE`.

- tab_size:

  Number of spaces per tab. Default is `2`.

- indentation:

  Type of indentation: `"space"` or `"tab"`. Default is `"space"`.

- fill:

  Whether or not to allow the card to grow/shrink to fit a fillable
  container with an opinionated height (e.g.,
  [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)).

- session:

  a shiny session object (the default should almost always be used).

## Value

An HTML tag object that can be included in a Shiny UI.

## Keyboard shortcuts

The editor supports the following keyboard shortcuts:

- `Ctrl/Cmd+Enter`: Submit the current code to R

- `Ctrl/Cmd+Z`: Undo

- `Ctrl/Cmd+Shift+Z`: Redo

- `Tab`: Indent selection

- `Shift+Tab`: Dedent selection

## Themes

The editor automatically switches between `theme_light` and `theme_dark`
when used with
[`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md).
Otherwise, the editor will use `theme_light` by default.

A variety of themes are available for use. The full list of bundled
themes is: `"atom-one-dark"`, `"dracula"`, `"github-dark-dimmed"`,
`"github-dark"`, `"github-light"`, `"night-owl-light"`, `"night-owl"`,
`"prism-okaidia"`, `"prism-solarized-light"`, `"prism-tomorrow"`,
`"prism-twilight"`, `"prism"`, `"vs-code-dark"`, `"vs-code-light"`.

## See also

Other input controls:
[`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md),
[`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
library(shiny)
library(bslib)

ui <- page_fluid(
  input_code_editor(
    "sql_query",
    value = "SELECT * FROM table",
    language = "sql"
  ),
  verbatimTextOutput("code_output")
)

server <- function(input, output, session) {
  output$code_output <- renderPrint({
    input$sql_query
  })
}

shinyApp(ui, server)
}
```
