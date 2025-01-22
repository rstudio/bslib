local_disable_cache()

test_that("Can access the sass behind all versions and Bootswatch themes", {
  skip_on_cran()

  for (version in versions()) {
    # Can compile CSS against variables (in each version)
    css <- sass_partial("body{background-color:$body-bg}", as_bs_theme(version))
    css <- sub("#ffffff", "#fff", css)
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can compile each bootswatch theme/version combination
      bs <- bs_theme_dependencies(
        theme = as_bs_theme(paste0(theme, "@", version))
      )
      expect_true(length(bs) > 1)
    }
  }
})

# The internal bootstrap_bundle() splits up bootstrap.scss into defaults/declarations/rules,
# and so, has to make assumptions about what's in that file. Thus, everytime this file
# changes, we should check to make sure we've made the appropriate changes in bootstrap_bundle()
# (and once we have, then this hash should be updated as well).
test_that("bootstrap.scss hasn't changed", {
  expect_snapshot_file(
    path_lib("bs4", "scss", "bootstrap.scss"),
    name = "bs4-imports"
  )
  expect_snapshot_file(
    path_lib("bs5", "scss", "bootstrap.scss"),
    name = "bs5-imports"
  )
})

# If Bootstrap changes their %heading placeholder, then we'll likely
# need to update our bootstrap-heading() mixin to replicate those changes
# https://github.com/twbs/bootstrap/blob/2c7f88/scss/_reboot.scss#L83-L96
# https://github.com/rstudio/bslib/tree/main/inst/components/scss/mixins/_mixins.scss
test_that("bootstrap-heading() mixin approximates %heading placeholder", {
  reboot <- readLines(path_lib("bs5", "scss", "_reboot.scss"))
  idx_start <- which(reboot == "%heading {")
  idx_end <- NA
  for (idx in which(reboot == "}")) {
    if (idx > idx_start) {
      idx_end <- idx
      break
    }
  }
  heading_placeholder <- reboot[seq.int(idx_start, idx_end)]
  expect_snapshot(heading_placeholder)
})
