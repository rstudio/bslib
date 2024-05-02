withr::local_temp_libpaths()
install.packages("shiny")

rsconnect::deployApp(
  rprojroot::find_package_root_file("inst/examples/build-a-box"),
  appName = "build-a-box",
  account = "bslib",
  forceUpdate = TRUE
)
