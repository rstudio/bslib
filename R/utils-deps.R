web_component <- function(tagName, ...) {
  js_dep <- component_js_dependency("webComponents", type = "module")
  args <- c(list(js_dep), rlang::list2(...))
  tag(tagName, args)
}


component_js_dependency <- function(name, ...) {
  minified <- get_shiny_devmode_option("shiny.minified", default = TRUE)

  htmlDependency(
    name = paste0("bslib-", name),
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist", name),
    all_files = TRUE,
    script = list(
      src = paste0(name, if (minified) ".min", ".js"),
      ...
    )
  )
}
