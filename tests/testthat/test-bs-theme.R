context("theme-api")

test_that("theme api works", {
  bs_theme_new(version = "4-3", bootswatch = "sketchy")
  on.exit(bs_theme_clear(), add = TRUE)

  # Can retrieve theme version/bootswatch
  sketchy_theme <- bs_theme_get()
  expect_equal(theme_version(sketchy_theme), "4-3")
  expect_equal(theme_bootswatch(sketchy_theme), "sketchy")

  # Setting a new theme overrides the old one
  bs_theme_new(version = "4", bootswatch = "cosmo")
  cosmo_theme <- bs_theme_get()
  expect_equal(theme_version(cosmo_theme), "4")
  expect_equal(theme_bootswatch(cosmo_theme), "cosmo")

  # Can add new variable defaults
  bs_theme_add_variables("primary" = "red !default;")
  primary <- bootstrap_sass("body{background:$primary;}")
  expect_css("body{background:red;}", primary)

  # Can clear
  bs_theme_clear()
  expect_null(bs_theme_get())

  # Adding without a set errors
  expect_error(bs_theme_add())

  # Can set a theme object as the current theme
  bs_theme_set(cosmo_theme)
  primary <- bootstrap_sass("body{background:$primary;}")
  expect_css("body{background:#2780E3;}", primary)
})


test_that("Theme adding works as intended", {
  bs_theme_new()
  on.exit(bs_theme_clear(), add = TRUE)
  # Can override variable defaults
  bs_theme_add_variables(primary = "blue !default;")
  bs_theme_add_variables(primary = "#fff !default;")
  css <- bootstrap_sass(".foo{color:$primary;}")
  expect_css(".foo{color:#fff;}", css)

  # Also works without default flags and can handle numeric values
  bs_theme_add_variables(primary = "blue")
  bs_theme_add_variables(primary = "#fff", "font-size" = 0)
  css <- bootstrap_sass(".foo{color:$primary;font-size:0}")
  expect_css(".foo{color:#fff;font-size:0;}", css)

  # Can also override variables via declarations
  bs_theme_add_variables(
    .where = "declarations",
    "primary" = "$secondary",
    "body-color" = "color-yiq($primary)"
  )
  css <- bootstrap_sass(".foo{color:$primary;}")
  expect_css(".foo{color:#6c757d;}", css)
})

