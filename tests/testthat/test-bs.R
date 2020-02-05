context("bootswatch")


test_that("Using bootswatch arg is equivalent to theme_layer_bootswatch()", {
  cosmo_primary <- bootstrap_sass("body{color:$primary;}", theme = "cosmo@4")
  expect_css("body{color:#2780E3;}", cosmo_primary)
  # Some downstream dependencies will use $navbar-height
  paper_navbar <- bootstrap_sass("body{padding-top:$navbar-height;}", theme = "paper@4+3")
  # make sure it's different from the default
  expect_css("body{padding-top:80.3;}", paper_navbar)
})


