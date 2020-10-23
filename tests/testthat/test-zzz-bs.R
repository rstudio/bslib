test_that("Using bootswatch arg is equivalent to theme_layer_bootswatch()", {
  cosmo_primary <- sass_partial("body{color:$primary;}", as_bs_theme("cosmo@4"))
  expect_css("body{color:#2780e3;}", cosmo_primary)
})
