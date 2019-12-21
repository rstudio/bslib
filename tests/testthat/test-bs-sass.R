context("bs_sass")

test_that("Can access the sass behind all versions and Bootswatch themes", {
  versions <- c("4-3", "3", "4")
  for (version in versions) {
    # Can compile CSS against variables (in each version)
    css <- bootstrap_sass("body{background-color:$body-bg}", theme = version)
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can compile each bootswatch theme/version combination
      bs <- bootstrap(theme = paste0(theme, "@", version))
      expect_true(length(bs) > 1)
    }
  }
})

