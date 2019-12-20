context("theme-management")

test_that("Can create, set, get, and clear theme", {
  my_theme <- bs_theme(bootswatch = "cosmo", version = 4)
  bs_theme_set(my_theme)
  expect_identical(my_theme, bs_theme_get())
  expect_equal("cosmo", bs_theme_get()$bootswatch)
  bs_theme_clear()
  expect_null(bs_theme_get())

  # Create and set in one step
  bs_theme_set(bootswatch = "cosmo", version = 4)
  expect_identical(my_theme, bs_theme_get())
  bs_theme_clear()
})

red_primary <- bs_theme(list(primary = "red !default;"))
foo_color <- ".foo { color: $primary }"

test_that("bs_theme() influences sass compilation", {
  css <- bs_sass_partial(foo_color, theme = red_primary)
  expect_css(".foo{color:red;}", css)
})

blue_primary <- bs_theme(list(primary = "blue !default;"))

test_that("Can bs_theme_merge() to combine/override", {
  primary <- bs_theme_merge(red_primary, blue_primary)
  css <- bs_sass_partial(foo_color, theme = primary)
  expect_css(".foo{color:blue;}", css)
})






