context("bs_sass")

test_that("Can access the sass behind all versions and Bootswatch themes", {
  versions <- c("4-3", "3", "4")
  for (version in versions) {
    # Can compile CSS against variables (in each version)
    css <- bs_sass_partial("body{background-color:$body-bg}", theme = version)
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can access sass files behind each bootswatch theme/version combination
      output <- bs_theme_sass(theme = paste0(theme, "@", version), before_only = FALSE)
      expect_true(any(grepl(theme, output$before)))
      expect_true(any(grepl(theme, output$after)))

      # Using theme without specifying is same as specifying 4-3
      if (version == "4-3") {
        output1 <- bs_theme_sass(theme = theme, before_only = FALSE)
        output2 <- bs_theme_sass(theme = paste0(theme, "@", version), before_only = FALSE)
        expect_identical(output1, output2)
      }
    }
  }
})

