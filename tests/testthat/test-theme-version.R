test_that("Can retrieve version from theme object", {
  expect_identical(
    theme_version(bs_theme()),
    version_default()
  )
  expect_equal(
    theme_version(bs_theme(version = "3")), "3"
  )
  expect_identical(
    theme_version(bs_theme(version = "4")), "4"
  )
  deps <- bs_theme_dependencies(bs_theme(version = 4))
  # jQuery, Bootstrap, and bs3compat layer
  expect_length(deps, 3)
})
