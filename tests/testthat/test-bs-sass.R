test_that("Can access the sass behind all versions and Bootswatch themes", {
  versions <- c("4+3", "3", "4")
  for (version in versions) {
    # Can compile CSS against variables (in each version)
    css <- bs_sass("body{background-color:$body-bg}", theme = version)
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can compile each bootswatch theme/version combination
      bs <- bs_dependencies(theme = paste0(theme, "@", version))
      expect_true(length(bs) > 1)
    }
  }
})


# The internal bootstrap_layer() splits up bootstrap.scss into defaults/declarations/rules,
# and so, has to make assumptions about what's in that file. Thus, everytime this file
# changes, we should check to make sure we've made the appropriate changes in bootstrap_layer()
# (and once we have, then this hash should be updated as well).
test_that("Make sure bootstrap.scss hasn't changed", {
  scss <- lib_file("bootstrap", "scss", "bootstrap.scss")
  hash_new <- digest::digest(readLines(scss))
  hash_old <- testthat::test_path("test-assets", "bootstrap_scss_hash.txt")
  expect_equal(hash_new, readLines(hash_old))
})
