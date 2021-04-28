test_that("bs_theme_update() can update defaults", {
  vars <- c("black", "white", "primary", "danger", "font-family-base", "font-family-monospace")
  pre_theme <- bs_theme("4")
  pre_vars <- bs_get_variables(pre_theme, vars)
  post_theme <- bs_theme_update(pre_theme, bg = "black", fg = "white", primary = "#222222", base_font = "SomeFont")
  post_vars <- bs_get_variables(post_theme, vars)
  # bg/fg has been inverted, primary and base font have been updated
  expect_true(post_vars[["black"]] == "#FFFFFF")
  expect_true(post_vars[["white"]] == "#000000")
  expect_true(post_vars[["primary"]] == "#222222")
  expect_true(post_vars[["font-family-base"]] == "SomeFont")
  # Danger hasn't been set
  expect_true(post_vars[["danger"]] == pre_vars[["danger"]])
  # Neither has monospace
  expect_true(post_vars[["font-family-monospace"]] == pre_vars[["font-family-monospace"]])
})


test_that("Sass bundles work as expected with a theme", {
  theme <- bs_add_variables(bs_theme("4"), primary = "#222222")
  expect_true(bs_get_variables(theme, "primary") == "#222222")
  # declarations can be used in rules
  theme <- bs_add_mixins(theme, list(foo = "bar !default"))
  expect_identical(
    as.character(sass_partial(".foo {color: $foo}", theme)),
    ".foo {\n  color: bar;\n}\n"
  )
  # but declarations come after defaults (so this won't override the value!)
  theme <- bs_add_mixins(theme, list(primary = "#333333 !default"))
  expect_true(bs_get_variables(theme, "primary") == "#222222")
  # Can drop-down to the lower-level bs_bundle()
  theme <- bs_bundle(
    theme, sass::sass_layer(defaults = list(primary = "#333333 !default"))
  )
  expect_true(bs_get_variables(theme, "primary") == "#333333")
})

test_that("bs_theme_update() can update the bootswatch theme", {
  darkly <- bs_theme(bootswatch = "darkly")
  cosmo <- bs_theme(bootswatch = "cosmo")

  expect_false(identical(darkly, cosmo))
  darkly2 <- bs_theme_update(cosmo, bootswatch = "darkly")
  expect_identical(
    sass::sass(darkly),
    sass::sass(darkly2)
  )
  cyborg <- bs_theme(bootswatch = "cyborg")
  cyborg2 <- bs_theme_update(bs_theme(), bootswatch = "cyborg")
  expect_identical(
    sass::sass(cyborg),
    sass::sass(cyborg2)
  )
  default <- bs_theme_update(cosmo, bootswatch = "default")
  expect_identical(
    sass::sass(default),
    sass::sass(bs_theme())
  )
  expect_null(theme_bootswatch(default))
})

test_that("is_bs_theme() works", {
  expect_true(is_bs_theme(bs_theme()))
  expect_true(is_bs_theme(bs_theme(3)))
  expect_true(is_bs_theme(bs_theme(4)))
})
