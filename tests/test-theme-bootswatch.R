context("theme_bootswatch")

test_that("Can retrieve version from theme object", {
  bs_theme_new()
  expect_identical(
    theme_bootswatch(bs_theme_get()),
    version_default()
  )

  bs_theme_new(version = "3", bootswatch = "paper")
  expect_equal(
    theme_bootswatch(bs_theme_get()), "paper"
  )

  bs_theme_new(version = "4", bootswatch = "materia")
  expect_identical(
    theme_bootswatch(bs_theme_get()), "materia"
  )

  bs_theme_clear()
})
