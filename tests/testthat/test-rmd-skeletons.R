render_skeleton <- function(x) {
  tmp_dir <- withr::local_tempdir()
  tmp_rmd <- file.path(tmp_dir, "tmp.Rmd")

  src <- system.file(
    "rmarkdown/templates", x, "skeleton/skeleton.Rmd",
    package = "bslib"
  )

  # Comment out bs_themer() since that needs a shiny runtime
  txt <- sub("^bslib::bs_themer()", "#bslib::bs_themer()", readLines(src))
  writeLines(txt, tmp_rmd)

  tryCatch(
    {
      expect_snapshot(rmarkdown::render(tmp_rmd, quiet = FALSE))
      expect_true(TRUE)
    },
    error = function(err) {
      rlang::cnd_signal(err)
      expect_true(FALSE, "Rendering threw an error")
    }
  )
}

test_that("Rmd skeletons can be render cleanly", {
  skip_if_not(
    rmarkdown::pandoc_available("1.12.3"),
    "Pandoc 1.12.3 or higher is required"
  )
  render_skeleton("legacy")
  render_skeleton("new")
  withr::with_namespace(
    "shiny",
    render_skeleton("real-time")
  )
})
