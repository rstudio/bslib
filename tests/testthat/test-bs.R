test_that("Using bootswatch arg is equivalent to theme_layer_bootswatch()", {
  cosmo_primary <- sass_partial("body{color:$primary;}", as_bs_theme("cosmo@4"))
  expect_css("body{color:#2780e3;}", cosmo_primary)
  # Some downstream dependencies will use $navbar-height
  paper_navbar <- sass_partial("body{padding-top:$navbar-height;}", as_bs_theme("paper@4+3"))
  # make sure it's different from the default
  expect_css("body{padding-top:80.3;}", paper_navbar)
})
