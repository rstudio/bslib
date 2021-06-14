expect_snapshot_tabs <- function(x, cran = TRUE) {
  if (getRversion() < "3.6.0") {
    skip("Skipping snapshots on R < 3.6 because of different RNG method")
  }
  # Need for tabsets to generate BS4+ markup when statically rendered
  # https://github.com/rstudio/shiny/pull/3402
  skip_if_not_installed("shiny", "1.6.0.9002")
  shiny:::withPrivateSeed(set.seed(100))
  expect_snapshot(renderTags(x)$html, cran = cran)
}
