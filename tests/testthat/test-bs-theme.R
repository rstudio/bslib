context("theme-management")

test_that("Can set, get, and clear theme", {
  bs_theme_set(bootswatch = "cosmo", version = 4)
  expect_equal("cosmo", attr(bs_theme_get(), "bootswatch"))
  bs_theme_clear()
  expect_null(bs_theme_get())
})

bs_theme_set(list(primary = "red !default;"))
foo_color <- ".foo { color: $primary }"

test_that("bs_theme() influences sass compilation", {
  css <- bootstrap_sass(foo_color)
  expect_css(".foo{color:red;}", css)
})


test_that("Theme adding works as intended", {
  bs_theme_set(list(primary = "blue !default"))
  bs_theme_add(list(primary = "red !default"))
  on.exit(bs_theme_clear(), add = TRUE)
  css <- bootstrap_sass(foo_color)
  expect_css(".foo{color:red;}", css)
})

