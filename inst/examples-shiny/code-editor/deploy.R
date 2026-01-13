withr::local_temp_libpaths()
install.packages("shiny")

rsconnect::deployApp(
  rprojroot::find_package_root_file("inst/examples-shiny/code-editor"),
  appName = "code-editor",
  account = "bslib",
  forceUpdate = TRUE
)
