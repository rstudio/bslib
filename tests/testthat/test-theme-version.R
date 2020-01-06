context("theme_version")

test_that("Can retrieve version from theme object", {
  bs_theme_new()
  expect_identical(
    theme_version(bs_theme_get()),
    version_default()
  )

  bs_theme_new(version = "3")
  expect_equal(
    theme_version(bs_theme_get()), "3"
  )

  bs_theme_new(version = "4")
  expect_identical(
    theme_version(bs_theme_get()), "4"
  )

  bs_theme_clear()
})
