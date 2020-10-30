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
  expect_equal(n_default + n, length(base))
  expect_equal(n_default + n, length(code))
  expect_equal(n_default + n, length(heading))
}

# Expect that font_google() generates an expect URL param (and it can be requested)
expect_gfont_url <- function(..., param, request = TRUE) {
  href <- font_google(...)$href
  expect_equal(
    URLencode(href),
    URLencode(paste0("https://fonts.googleapis.com/css2?", param))
  )
  if (!request) return()
  skip_if_offline()
  skip_on_cran()
  expect_error(read_gfont_url(href), NA)
}
# Expect an HTML dependency renders a certain way
expect_dependency <- function(font, regex, fixed = TRUE) {
  dep <- font_dep(font, version = "1.0")
  expect_match(
    htmltools::renderDependencies(list(dep)),
    regex, fixed = fixed
  )
}
# Expect CSS output (for font_face() tests)
expect_dependency_css <- function(font, output) {
  dep <- font_dep(font, version = "1.0")
  css <- readLines(file.path(dep$src, dep$stylesheet))
  expect_equal(
    gsub("\\s*", "", paste(css, collapse = "")), output
  )
}

test_that("Strings are quoted, if needed", {
  expect_font_defaults("foo-bar")
  expect_font_defaults("foo bar", '"foo bar"')
  expect_font_defaults('"foo bar"')
  expect_font_defaults('"foo bar", baz')
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

test_that("Remote font HTML dependencies are rendered properly", {
  expect_dependency(
    font_google("foo", local = FALSE),
    '<link href="https://fonts.googleapis.com/css2?family=foo&amp;display=swap" rel="stylesheet"/>'
  )
  expect_dependency(
    font_link("foo", "bar"),
    '<link href="bar" rel="stylesheet"/>'
  )
  expect_dependency(
    font_face("foo", "bar"), fixed = FALSE,
    '<link href=".*font\\.css" rel="stylesheet" />'
  )
  expect_dependency_css(
    font_face("foo", "bar"),
    "@font-face{font-family:foo;src:bar;font-display:swap;}"
  )
  expect_dependency_css(
    font_face(
      "foo", src = c("bar", "baz"),
      weight = c(400, 600), display = "auto",
      style = c("oblique", "30deg", "50deg"),
      stretch = c("75%", "125%"),
      unicode_range = c("U+0025-00FF", "U+4??")
    ),
    "@font-face{font-family:foo;src:bar,baz;font-weight:400600;font-style:oblique30deg50deg;font-display:auto;font-stretch:75%125%;unicode_range:U+0025-00FF,U+4??;}"
  )
})

test_that("Google Font URL construction", {
  expect_gfont_url(
    family = "Pacifico",
    param = "family=Pacifico&display=swap"
  )
  expect_gfont_url(
    family = "Pacifico", display = "auto",
    param = "family=Pacifico&display=auto"
  )
  expect_gfont_url(
    family = "Crimson Pro", wght = "200..900",
    param = "family=Crimson Pro:wght@200..900&display=swap"
  )
  expect_gfont_url(
    family = "Crimson Pro", wght = "200..900", ital = 1,
    param = "family=Crimson Pro:ital,wght@1,200..900&display=swap"
  )
  expect_gfont_url(
    family = "Crimson Pro", wght = c(400, 500), ital = 1,
    param = "family=Crimson Pro:ital,wght@1,400;1,500&display=swap"
  )
  expect_gfont_url(
    family = "Crimson Pro", wght = c(400, 500), ital = c(0, 1),
    param = "family=Crimson Pro:ital,wght@0,400;0,500;1,400;1,500&display=swap"
  )
  expect_gfont_url(
    family = "Crimson Pro", wght = c(600, 400, 500), ital = c(1, 0),
    param = "family=Crimson Pro:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
  )
})

test_that("Mix of font objects and character strings", {
  font <- list(font_google("Pacifico", local = FALSE), "Sans Serif")
  expect_font_defaults(font, 'Pacifico, "Sans Serif"')
  expect_new_dependencies(font)

  font <- c(font, list(font_link("foo", "bar")))
  expect_font_defaults(font, 'Pacifico, "Sans Serif", foo')
  expect_new_dependencies(font, n = 2)

  font <- c(font, list(font_face("foo bar", "baz")))
  expect_font_defaults(font, 'Pacifico, "Sans Serif", foo, "foo bar"')
  expect_new_dependencies(font, n = 3)
})


# Note, we don't really test local google fonts here, but that code path
# will be tested in shinycoreci-apps
