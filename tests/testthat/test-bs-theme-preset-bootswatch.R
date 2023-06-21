test_that("theme_version() works for current versions", {
  bs_versions <- versions()

  for (bs_v in bs_versions) {
    expect_equal(theme_version(bs_theme(!!bs_v)), !!bs_v)
  }
})
