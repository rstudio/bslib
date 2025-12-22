render_skeleton <- function(x) {
  tmp_dir <- withr::local_tempdir()
  tmp_rmd <- file.path(tmp_dir, "tmp.Rmd")

  src <- system.file(
    "rmarkdown/templates",
    x,
    "skeleton/skeleton.Rmd",
    package = "bslib"
  )

  # Comment out bs_themer() since that needs a shiny runtime
  txt <- sub("^bslib::bs_themer()", "#bslib::bs_themer()", readLines(src))
  writeLines(txt, tmp_rmd)

  rmarkdown::render(tmp_rmd, quiet = TRUE)
}

test_that("Rmd skeletons can be render cleanly", {
  skip_on_cran()
  skip_if_not_installed("rmarkdown")

  skip_if_not(
    rmarkdown::pandoc_available("1.12.3"),
    "Pandoc 1.12.3 or higher is required"
  )

  expect_no_error(render_skeleton("legacy"))
  expect_no_error(render_skeleton("new"))
  withr::with_namespace(
    "shiny",
    expect_no_error(render_skeleton("real-time"))
  )
})
