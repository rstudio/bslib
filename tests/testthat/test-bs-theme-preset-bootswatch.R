test_that("theme_version() works for current versions", {
  bs_versions <- versions()

  for (bs_v in bs_versions) {
    expect_equal(theme_version(bs_theme(!!bs_v)), !!bs_v)
  }
})

test_that("theme_version() uses class first, then sass bundle", {
  theme <- theme_unclassed <- bs_theme(version = 5)
  class(theme_unclassed) <- setdiff(class(theme), "bs_version_5")
  theme_99 <- add_class(theme_unclassed, "bs_version_99")

  # These should use the class information
  expect_equal(theme_version(theme), "5")
  expect_equal(theme_version(theme_99), "99")

  # These should consult the sass bundle
  expect_equal(theme_version(add_class(theme, "bs_version_99")), "5")
  expect_equal(theme_version(theme_unclassed), "5")
})
