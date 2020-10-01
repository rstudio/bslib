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
})
