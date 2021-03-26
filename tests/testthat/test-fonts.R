# Expect that a font input overrides the relevant Sass default
expect_font_defaults <- function(input, output = input) {
  base <- bs_theme(version = "4", base_font = input)
  expect_equal(unname(bs_get_variables(base, "font-family-base")), output)
  code <- bs_theme(version = "4", code_font = input)
  expect_equal(unname(bs_get_variables(code, "font-family-monospace")), output)
  heading <- bs_theme(version = "4", heading_font = input)
  expect_equal(unname(bs_get_variables(heading, "headings-font-family")), output)
}
# Expect that a font input adds some number (n) of HTML dependencies
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
  if (n_default + n != length(base)) browser()
  expect_equal(n_default + n, length(base))
  expect_equal(n_default + n, length(code))
  expect_equal(n_default + n, length(heading))
}

test_that("Strings are quoted, if needed", {
  expect_font_defaults('"foo-bar"')
  expect_font_defaults("foo bar", '"foo bar"')
  expect_font_defaults('"foo bar"')
  expect_font_defaults('"foo bar", "baz"')
})

test_that("Lists are collapsed into quoted strings", {
  expect_font_defaults(list("foo-bar"), "foo-bar")
  expect_font_defaults(list("foo-bar", "foo bar"), 'foo-bar, "foo bar"')
  expect_font_defaults(list("foo-bar", '"foo bar", baz'), 'foo-bar, "foo bar", baz')
})

test_that("Single font objects set defaults and add dependencies", {
  cg <- font_google("Crimson Pro", local = FALSE)
  cl <- font_link("Crimson Pro", href = "foo")
  cf <- font_face("Crimson Pro", src = "foo")
  expect_font_defaults(cg, '"Crimson Pro"')
  expect_font_defaults(cl, '"Crimson Pro"')
  expect_font_defaults(cf, '"Crimson Pro"')
  expect_new_dependencies(cg)
  expect_new_dependencies(cl)
  expect_new_dependencies(cf)
})


test_that("Mix of font objects and character strings", {
  font <- font_collection(font_google("Pacifico", local = FALSE), "Sans Serif")
  expect_font_defaults(font, 'Pacifico, "Sans Serif"')
  expect_new_dependencies(font)

  font <- font_collection(font, font_link("foo", "bar"))
  expect_font_defaults(font, 'Pacifico, "Sans Serif", foo')
  expect_new_dependencies(font, n = 2)

  font <- font_collection(font, font_face("foo bar", "baz"))
  expect_font_defaults(font, 'Pacifico, "Sans Serif", foo, "foo bar"')
  expect_new_dependencies(font, n = 3)
})


# Note, we don't really test local google fonts here, but that code path
# will be tested in shinycoreci-apps
