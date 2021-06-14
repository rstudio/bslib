local_disable_cache()

test_that("Can access the sass behind all versions and Bootswatch themes", {
  skip_on_cran()

  for (version in versions()) {
    # Can compile CSS against variables (in each version)
    css <- sass_partial("body{background-color:$body-bg}", as_bs_theme(version))
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can compile each bootswatch theme/version combination
      bs <- bs_theme_dependencies(theme = as_bs_theme(paste0(theme, "@", version)))
      expect_true(length(bs) > 1)
    }
  }
})


# The internal bootstrap_bundle() splits up bootstrap.scss into defaults/declarations/rules,
# and so, has to make assumptions about what's in that file. Thus, everytime this file
# changes, we should check to make sure we've made the appropriate changes in bootstrap_bundle()
# (and once we have, then this hash should be updated as well).
test_that("Make sure bootstrap.scss hasn't changed", {
  expect_snapshot_file(
    lib_file("bs4", "scss", "bootstrap.scss"),
    name = "bs4-imports"
  )
  expect_snapshot_file(
    lib_file("bs5", "scss", "bootstrap.scss"),
    name = "bs5-imports"
  )
})
