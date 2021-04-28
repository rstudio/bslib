test_that("Can retrieve version from theme object", {
  expect_null(theme_bootswatch(bs_theme()))

  theme <- bs_theme(version = "3", bootswatch = "paper")
  expect_equal(
    theme_bootswatch(theme), "paper"
  )

  theme <- bs_theme(version = "4", bootswatch = "materia")
  expect_identical(
    theme_bootswatch(theme), "materia"
  )

  theme <- bs_theme_update(theme, bootswatch = "darkly")
  expect_identical(
    theme_bootswatch(theme), "darkly"
  )

  # Can use default to effectively remove bootswatch
  expect_identical(
    sass::sass(bs_theme_update(theme, bootswatch = "default")),
    sass::sass(bs_theme(version = "4"))
  )

  # Can use default as a way to "explicitly don't use" a Bootswatch theme
  default <- bs_theme(version = "4", bootswatch = "default")
  expect_equal(default, bs_theme(version = "4"), ignore_attr = TRUE)
  expect_equal(theme_bootswatch(default), "default")
})
