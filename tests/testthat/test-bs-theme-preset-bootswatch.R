test_that("theme_version() is up to date", {
  bs_versions <- dir(
    system.file("lib", package = "bslib"),
    pattern = "bs\\d+"
  )
  bs_versions <- sub("bs", "", bs_versions)

  LATEST_SUPPORTED <- 5
  bs_next <- LATEST_SUPPORTED + 1

  if (bs_next %in% bs_versions) {
    expect_equal(
      try(theme_version(bs_theme(!!bs_next)), silent = TRUE),
      !!as.character(bs_next),
      label = "Bootstrap 6 was added, please update theme_version()."
    )
  }

  for (bs_v in bs_versions) {
    expect_equal(theme_version(bs_theme(!!bs_v)), !!bs_v)
  }
})
