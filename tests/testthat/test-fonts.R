expect_base_font <- function(input, output = input) {
  theme <- bs_theme(version = "4", base_font = input)
  expect_equal(
    unname(bs_get_variables(theme, "font-family-base")),
    output
  )
}

test_that("String quoting works", {
  expect_base_font("foo-bar")
  expect_base_font("foo bar", '"foo bar"')
  expect_base_font('"foo bar"')
  expect_base_font('"foo bar", baz')
})

test_that("List definitions work", {
  expect_base_font(list("foo-bar"), "foo-bar")
  expect_base_font(list("foo-bar", "foo bar"), 'foo-bar, "foo bar"')
  expect_base_font(list("foo-bar", '"foo bar", baz'), 'foo-bar, "foo bar", baz')
})

test_that("Single font_google() works", {
  expect_base_font(font_google("Pacifico"), "Pacifico")
  theme <- bs_theme()
  theme_font <- bs_theme_update(theme, base_font = font_google("Pacifico"))
  expect_equal(
    length(bs_theme_dependencies(theme)) + 1,
    length(bs_theme_dependencies(theme_font))
  )
})

test_that("Mix of font_google() and character strings", {
  font <- list(font_google("Pacifico"), "Sans Serif")
  expect_base_font(font, 'Pacifico, "Sans Serif"')
  theme <- bs_theme()
  theme_font <- bs_theme_update(theme, base_font = font)
  expect_equal(
    length(bs_theme_dependencies(theme)) + 1,
    length(bs_theme_dependencies(theme_font))
  )
})
