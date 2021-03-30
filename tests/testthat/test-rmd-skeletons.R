render_clean <- function(rmd_file, shiny = FALSE) {
  tmp <- tempfile()
  dir.create(tmp)
  on.exit(unlink(tmp, recursive = TRUE), add = TRUE)
  file.copy(rmd_file, tmp)
  if (shiny) rmarkdown::run(dir(tmp)) else rmarkdown::render(dir(tmp))
}

test_that("Rmd skeletons can be render/run cleanly", {
  templates <- system.file("rmarkdown/templates", package = "bslib")
  bs3 <- file.path(templates, "bs3/skeleton.Rmd")
  bs4 <- file.path(templates, "bs4/skeleton.Rmd")
  theming <- file.path(templates, "real-time/skeleton.Rmd")

  expect_error(render_clean(bs3), NA)
  expect_error(render_clean(bs4), NA)
  expect_error(render_clean(theming, shiny = TRUE), NA)
})
