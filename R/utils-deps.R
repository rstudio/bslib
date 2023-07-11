component_js_dependency <- function(name, minified = NULL) {
  minified <-
    minified %||%
    get_shiny_devmode_option("shiny.minified", default = TRUE)

  htmlDependency(
    name = paste0("bslib-", name),
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist", name),
    all_files = TRUE,
    script = paste0(name, if (minified) ".min", ".js")
  )
}
