withr::local_temp_libpaths()
install.packages("shiny")

rsconnect::deployApp(
  rprojroot::find_package_root_file("inst/examples-shiny/brand"),
  appName = "brand",
  account = "bslib",
  forceUpdate = TRUE
)
