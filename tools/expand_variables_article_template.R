withr::with_dir(
  rprojroot::find_package_root_file("vignettes"), {

    src4 <- knitr::knit_expand(
      file = "_variables-template.Rmd",
      version = 4
    )
    writeLines(src4, "bs4-variables.Rmd")

    src5 <- knitr::knit_expand(
      file = "_variables-template.Rmd",
      version = 5
    )
    invisible(writeLines(src5, "bs5-variables.Rmd"))
  }
)
