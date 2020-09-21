test_that("global theme api works", {
  bs_global_theme(version = "4+3", bootswatch = "sketchy")
  on.exit(bs_global_clear(), add = TRUE)

  # Can retrieve theme version/bootswatch
  sketchy_theme <- bs_global_get()
  expect_equal(theme_version(sketchy_theme), "4+3")
  expect_equal(theme_bootswatch(sketchy_theme), "sketchy")

  # Setting a new theme overrides the old one
  bs_global_theme(version = "4", bootswatch = "cosmo")
  cosmo_theme <- bs_global_get()
  expect_equal(theme_version(cosmo_theme), "4")
  expect_equal(theme_bootswatch(cosmo_theme), "cosmo")

  # Can add new variable defaults
  bs_global_add_variables("primary" = "red !default;")
  primary <- bs_sass("body{background:$primary;}")
  expect_css("body{background:red;}", primary)

  # Can clear
  bs_global_clear()
  expect_null(bs_global_get())

  # Adding without a set errors
  expect_error(bs_global_add_layers())

  # Can set a theme object as the current theme
  bs_global_set(cosmo_theme)
  primary <- bs_sass("body{background:$primary;}")
  expect_css("body{background:#2780e3;}", primary)
})


test_that("Theme adding works as intended", {
  bs_global_theme()
  on.exit(bs_global_clear(), add = TRUE)
  # Can override variable defaults
  bs_global_add_variables(primary = "blue !default;")
  bs_global_add_variables(primary = "#fff !default;")
  css <- bs_sass(".foo{color:$primary;}")
  expect_css(".foo{color:#fff;}", css)

  # Also works without default flags and can handle numeric values
  bs_global_add_variables(primary = "blue")
  bs_global_add_variables(primary = "#fff", "font-size" = 0)
  css <- bs_sass(".foo{color:$primary;font-size:0}")
  expect_css(".foo{color:#fff;font-size:0;}", css)

  # Can also override variables via declarations
  bs_global_add_variables(
    .where = "declarations",
    "primary" = "$secondary",
    "body-color" = "color-yiq($primary)"
  )
  css <- bs_sass(".foo{color:$primary;}")
  expect_css(".foo{color:#6c757d;}", css)
})


test_that("rename works as intended", {
  expect_identical(
    rename(list(a=1, b=3, c=4, d=1), c(z="b",y="a",w="f")),
    list(y=1, z=3, c=4, d=1)
  )
})
