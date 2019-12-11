context("bs_sass")

test_that("Can compile possible combinations of version and Bootswatch themes", {
  versions <- c("4-3", "3", "4")
  for (version in versions) {
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      output <- bs_sass(bootswatch = theme, version = version)
      expect_true(length(output) > 1)
    }
  }
})

test_that("Using bootswatch arg is equivalent to theme_layer_bootswatch()", {
  output1 <- bs_sass_partial("body{color:$primary;}", bootswatch = "cosmo", version = 4)
  output2 <- bs_sass_partial("body{color:$primary;}", theme_layer_bootswatch("cosmo", 4), version = 4)
  expect_identical(output1, output2)
  # Some downstream dependencies will use $navbar-height
  output1 <- bs_sass_partial("body{padding-top:$navbar-height;}", bootswatch = "paper", version = "4-3")
  output2 <- bs_sass_partial("body{padding-top:$navbar-height;}", theme_layer_bootswatch("paper", "4-3"), version = "4-3")
  expect_identical(output1, output2)
  # make sure it's different from the default
  expect_identical(
    "body{padding-top:80.3;}",
    gsub("\\s+|\\n", "", as.character(output1))
  )
})


