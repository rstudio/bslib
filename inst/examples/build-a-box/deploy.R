rsconnect::deployApp(
  rprojroot::find_package_root_file("inst/examples/build-a-box"),
  appName = "build-a-box",
  account = "testing-apps",
  forceUpdate = TRUE,
  envVars = c(ENABLE_THEMER = "true")
)
