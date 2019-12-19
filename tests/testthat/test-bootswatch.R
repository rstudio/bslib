context("bs_sass")

test_that("Can access the sass behind all versions and Bootswatch themes", {
  versions <- c("4-3", "3", "4")
  for (version in versions) {
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      output <- bs_theme_sass(theme = paste0(theme, "@", version), pre_only = FALSE)
      expect_true(any(grepl(theme, output$pre)))
      expect_true(any(grepl(theme, output$post)))
    }
  }
})


test_that("Using bootswatch arg is equivalent to theme_layer_bootswatch()", {
  cosmo_primary <- bs_sass_partial("body{color:$primary;}", theme = "cosmo@4")
  expect_css("body{color:#2780E3;}", cosmo_primary)
  # Some downstream dependencies will use $navbar-height
  paper_navbar <- bs_sass_partial("body{padding-top:$navbar-height;}", theme = "paper@4-3")
  # make sure it's different from the default
  expect_css("body{padding-top:80.3;}", paper_navbar)
})


