test_that("code_editor_themes returns character vector of themes", {
  themes <- code_editor_themes()

  expect_type(themes, "character")
  expect_true(length(themes) > 0)

  # Check for expected default themes
  expect_true("github-light" %in% themes)
  expect_true("github-dark" %in% themes)
  expect_true("vs-code-light" %in% themes)
  expect_true("vs-code-dark" %in% themes)
})

test_that("input_code_editor() rejects invalid themes", {
  expect_snapshot(error = TRUE, {
    input_code_editor("test", theme_light = "invalid-theme")
  })
})

test_that("arg_match_language rejects invalid languages", {
  expect_snapshot(error = TRUE, {
    input_code_editor("test", language = "fortran")
  })
})

test_that("input_code_editor generates correct HTML structure", {
  editor <- input_code_editor(
    "test_editor",
    value = "SELECT * FROM table",
    language = "sql"
  )

  # Check that dependencies are attached
  deps <- htmltools::findDependencies(editor)
  dep_names <- sapply(deps, function(d) d$name)
  expect_true("prism-code-editor" %in% dep_names)
  expect_true("bslib-code-editor" %in% dep_names)

  html <- as.character(editor)

  # Check for bslib-code-editor custom element tag
  expect_match(html, '<bslib-code-editor')

  # Check for correct ID
  expect_match(html, 'id="test_editor"')

  # Check for attributes
  expect_match(html, 'language="sql"')
  expect_match(html, 'value="SELECT \\* FROM table"')
})

test_that("input_code_editor handles all parameters correctly", {
  editor <- input_code_editor(
    "full_editor",
    value = "print('hello')",
    language = "python",
    height = "500px",
    width = "80%",
    theme_light = "vs-code-light",
    theme_dark = "vs-code-dark",
    read_only = TRUE,
    line_numbers = FALSE,
    word_wrap = TRUE,
    tab_size = 4,
    indentation = "tab"
  )

  html <- as.character(editor)

  # Check all attributes
  expect_match(html, 'language="python"')
  expect_match(html, 'theme-light="vs-code-light"')
  expect_match(html, 'theme-dark="vs-code-dark"')
  expect_match(html, 'readonly="true"')
  expect_match(html, 'line-numbers="false"')
  expect_match(html, 'word-wrap="true"')
  expect_match(html, 'tab-size="4"')
  expect_match(html, 'insert-spaces="false"') # tab indentation

  # Check style attributes
  expect_match(html, 'height:\\s*500px')
  expect_match(html, 'width:\\s*80%')
})

test_that("input_code_editor uses correct defaults", {
  editor <- input_code_editor("default_editor", language = "r")

  html <- as.character(editor)

  expect_match(html, 'language="r"')
  expect_match(html, 'theme-light="github-light"')
  expect_match(html, 'theme-dark="github-dark"')
  expect_match(html, 'readonly="false"')
  expect_match(html, 'line-numbers="true"')
  expect_match(html, 'word-wrap="false"')
  expect_match(html, 'tab-size="2"')
  expect_match(html, 'insert-spaces="true"')
  expect_match(html, 'height:\\s*auto')
  expect_match(html, 'width:\\s*100%')
})

test_that("input_code_editor validates theme names", {
  expect_snapshot(error = TRUE, {
    input_code_editor("test", theme_light = "invalid-theme")
    input_code_editor("test", theme_dark = "invalid-theme")
  })
})

test_that("input_code_editor validates `language`", {
  expect_snapshot(error = TRUE, {
    input_code_editor("test", language = "fortran")
  })
})

test_that("input_code_editor handles empty `value`", {
  editor <- input_code_editor("empty_editor", value = "")

  html <- as.character(editor)
  expect_match(html, 'value=""')
})

test_that("input_code_editor handles character vector `value`", {
  editor <- input_code_editor("empty_editor", value = c("one", "two", "three"))

  html <- as.character(editor)
  expect_match(html, 'value="one&#10;two&#10;three"')
})

test_that("input_code_editor indentation parameter works correctly", {
  editor_spaces <- input_code_editor("test1", indentation = "space")
  editor_tabs <- input_code_editor("test2", indentation = "tab")

  html_spaces <- as.character(editor_spaces)
  html_tabs <- as.character(editor_tabs)

  expect_match(html_spaces, 'insert-spaces="true"')
  expect_match(html_tabs, 'insert-spaces="false"')
})

test_that("update_code_editor validates inputs", {
  expect_snapshot(error = TRUE, {
    update_code_editor("test", language = "fortran", session = NULL)
  })

  expect_snapshot(error = TRUE, {
    update_code_editor("test", theme_light = "invalid", session = NULL)
  })

  expect_snapshot(error = TRUE, {
    update_code_editor("test", theme_dark = "invalid", session = NULL)
  })

  expect_snapshot(error = TRUE, {
    update_code_editor("test", indentation = "invalid", session = NULL)
  })
})

test_that("input_code_editor supports label parameter", {
  editor_with_label <- input_code_editor("test", label = "SQL Query")
  editor_without_label <- input_code_editor("test2")

  html_with <- as.character(editor_with_label)
  html_without <- as.character(editor_without_label)

  # Editor with label should have a label element
  expect_match(html_with, "<label")
  expect_match(html_with, "SQL Query")

  # Editor without label should still have the custom element tag
  expect_true(grepl("<bslib-code-editor", html_without))
})

test_that("input_code_editor attaches dependencies", {
  editor <- input_code_editor("test")

  # The editor should be a tag with the dependencies attached
  expect_s3_class(editor, "shiny.tag")

  # Extract dependencies
  deps <- htmltools::findDependencies(editor)
  expect_true(length(deps) > 0)

  # Check that all expected dependencies are present
  dep_names <- sapply(deps, function(d) d$name)
  expect_true("prism-code-editor" %in% dep_names)
  expect_true("bslib-code-editor" %in% dep_names)
})

test_that("input_code_editor works with different languages", {
  languages <- c("sql", "python", "r", "javascript", "markup", "css", "json")

  for (lang in languages) {
    editor <- input_code_editor(paste0("editor_", lang), language = lang)
    html <- as.character(editor)
    expect_match(html, sprintf('language="%s"', lang))
  }
})

test_that("input_code_editor tab_size validates range", {
  # Valid tab sizes
  expect_silent(input_code_editor("test1", tab_size = 2))
  expect_silent(input_code_editor("test2", tab_size = 4))
  expect_silent(input_code_editor("test3", tab_size = 8))

  expect_error(input_code_editor("test4", tab_size = 0))
})

test_that("input_code_editor warns when value has 1,000 or more lines", {
  # No warning for small values
  expect_silent(input_code_editor("test1", value = "line1\nline2\nline3"))

  # No warning for exactly 999 lines
  value_999 <- paste(rep("line", 999), collapse = "\n")
  expect_silent(input_code_editor("test2", value = value_999))

  # Warning for exactly 1000 lines
  value_1000 <- paste(rep("line", 1000), collapse = "\n")
  expect_warning(
    input_code_editor("test3", value = value_1000),
    "Code editor value contains 1000 lines"
  )
  expect_warning(
    input_code_editor("test3", value = value_1000),
    "performance issues"
  )

  # Warning for more than 1000 lines
  value_2000 <- paste(rep("line", 2000), collapse = "\n")
  expect_warning(
    input_code_editor("test4", value = value_2000),
    "Code editor value contains 2000 lines"
  )
})

test_that("update_code_editor warns when value has 1,000 or more lines", {
  mock_session <- list(sendInputMessage = function(...) invisible())

  # No warning for small values
  expect_silent(update_code_editor(
    "test1",
    value = "line1\nline2",
    session = mock_session
  ))

  # Warning for exactly 1000 lines
  value_1000 <- paste(rep("line", 1000), collapse = "\n")
  expect_warning(
    update_code_editor("test4", value = value_1000, session = mock_session),
    "Code editor value contains 1000 lines"
  )

  # Warning for more than 1000 lines
  value_2000 <- paste(rep("line", 2000), collapse = "\n")
  expect_warning(
    update_code_editor("test4", value = value_1000, session = mock_session),
    "Code editor value contains 1000 lines"
  )
})

test_that("check_value_line_count handles edge cases", {
  # NULL value
  expect_silent(bslib:::check_value_line_count(NULL))

  # Empty string
  expect_silent(bslib:::check_value_line_count(""))

  # Empty character vector
  expect_silent(bslib:::check_value_line_count(character(0)))

  # Single line
  expect_silent(bslib:::check_value_line_count("single line"))

  # Multiple lines below threshold
  value_100 <- paste(rep("line", 100), collapse = "\n")
  expect_silent(bslib:::check_value_line_count(value_100))
})
