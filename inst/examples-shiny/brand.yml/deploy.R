withr::local_temp_libpaths()
install.packages(c("shiny", "ggplot2", "yaml", "thematic", "markdown"))

rsconnect::deployApp(
  rprojroot::find_package_root_file("inst/examples-shiny/brand.yml"),
  appName = "brand-yml",
  account = "bslib",
  forceUpdate = TRUE
)
