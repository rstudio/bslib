
expect_font_defaults <- function(input, output = input) {
  base <- bs_theme(version = "4", base_font = input)
  expect_equal(unname(bs_get_variables(base, "font-family-base")), output)
  code <- bs_theme(version = "4", code_font = input)
  expect_equal(unname(bs_get_variables(code, "font-family-monospace")), output)
  heading <- bs_theme(version = "4", heading_font = input)
  expect_equal(unname(bs_get_variables(heading, "headings-font-family")), output)
}

expect_new_dependencies <- function(input, n = 1) {
  theme <- bs_theme()
  n_default <- length(bs_theme_dependencies(theme))
  base <- bs_theme_dependencies(
    bs_theme_update(theme, base_font = input)
  )
  code <- bs_theme_dependencies(
    bs_theme_update(theme, code_font = input)
  )
  heading <- bs_theme_dependencies(
    bs_theme_update(theme, heading_font = input)
  )
  expect_equal(n_default + n, length(base))
  expect_equal(n_default + n, length(code))
  expect_equal(n_default + n, length(heading))
}

test_that("String quoting works", {
  expect_font_defaults("foo-bar")
  expect_font_defaults("foo bar", '"foo bar"')
  expect_font_defaults('"foo bar"')
  expect_font_defaults('"foo bar", baz')
})

test_that("List definitions work", {
  expect_font_defaults(list("foo-bar"), "foo-bar")
  expect_font_defaults(list("foo-bar", "foo bar"), 'foo-bar, "foo bar"')
  expect_font_defaults(list("foo-bar", '"foo bar", baz'), 'foo-bar, "foo bar", baz')
})

test_that("Single font objects", {
  expect_font_defaults(font_google("Pacifico"), "Pacifico")
  expect_font_defaults(font_link("Pacifico", href = "foo"), "Pacifico")
  expect_font_defaults(font_face("Pacifico", src = "foo"), "Pacifico")
  expect_new_dependencies(font_google("Pacifico"))
  expect_new_dependencies(font_link("Pacifico", href = "foo"))
  expect_new_dependencies(font_face("Pacifico", src = "foo"))
})

test_that("Mix of font objects and character strings", {
  font <- list(font_google("Pacifico"), "Sans Serif")
  expect_font_defaults(font, 'Pacifico, "Sans Serif"')
  expect_new_dependencies(font)
})
