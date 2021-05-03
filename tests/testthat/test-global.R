test_that("global theme api works", {
  bs_global_theme(version = 4, bootswatch = "sketchy")
  on.exit(bs_global_clear(), add = TRUE)

  # Can retrieve theme version/bootswatch
  sketchy_theme <- bs_global_get()
  expect_equal(theme_version(sketchy_theme), "4")
  expect_equal(theme_bootswatch(sketchy_theme), "sketchy")

  # Setting a new theme overrides the old one
  bs_global_theme(version = 4, bootswatch = "cosmo")
  cosmo_theme <- bs_global_get()
  expect_equal(theme_version(cosmo_theme), "4")
  expect_equal(theme_bootswatch(cosmo_theme), "cosmo")

  # Can add new variable defaults
  bs_global_add_variables("primary" = "red !default;")
  primary <- sass_partial("body{background:$primary;}", bs_global_get())
  expect_css("body{background:red;}", primary)

  # Can clear
  bs_global_clear()
  expect_null(bs_global_get())

  # Adding without a set errors
  expect_error(bs_global_bundle())

  # Can set a theme object as the current theme
  bs_global_set(cosmo_theme)
  primary <- sass_partial("body{background:$primary;}", bs_global_get())
  expect_css("body{background:#2780e3;}", primary)
})


test_that("Theme adding works as intended", {
  bs_global_theme()
  on.exit(bs_global_clear(), add = TRUE)
  # Can override variable defaults
  bs_global_add_variables(primary = "blue !default;")
  bs_global_add_variables(primary = "#fff !default;")
  css <- sass_partial(".foo{color:$primary;}", bs_global_get())
  expect_css(".foo{color:#fff;}", css)

  # Also works without default flags and can handle numeric values
  bs_global_add_variables(primary = "blue")
  bs_global_add_variables(primary = "#fff", "font-size" = 0)
  css <- sass_partial(".foo{color:$primary;font-size:0}", bs_global_get())
  expect_css(".foo{color:#fff;font-size:0;}", css)

  # Can also override variables via declarations
  bs_global_add_variables(
    .where = "mixins",
    "primary" = "$secondary",
    "body-color" = "color-contrast($primary)"
  )
  css <- sass_partial(".foo{color:$primary;}", bs_global_get())
  expect_css(".foo{color:#6c757d;}", css)
})


test_that("rename works as intended", {
  expect_identical(
    rename2(list(a=1, b=3, c=4, a=2), b="z", f="w", a="y"),
    list(y = 1, z = 3, c = 4, y = 2)
  )
  expect_identical(
    rename2(c("a", "b", "c", "a"), b="z", f="w", a="y"),
    c("y", "z", "c", "y")
  )
})
