component_dependencies <- function() {
  list(
    component_dependency_js(),
    web_component_dependency_js(),
    bs_dependency_defer(component_dependency_sass)
  )
}

component_dependency_js <- function() {
  minified <- get_shiny_devmode_option("shiny.minified", default = TRUE)

  htmlDependency(
    name = "bslib-component-js",
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist"),
    script = paste0("components", if (minified) ".min", ".js")
  )
}

web_component_dependency_js <- function() {
  minified <- get_shiny_devmode_option("shiny.minified", default = TRUE)

  htmlDependency(
    name = "bslib-web-component-js",
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist"),
    script = list(
      src = paste0("web-components", if (minified) ".min", ".js"),
      type = "module"
    )
  )
}

# Pre-compiled component styles
component_dependency_css <- function() {
  htmlDependency(
    name = "bslib-component-css",
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist"),
    stylesheet = "components.css"
  )
}

# Run-time (Sass) component styles
component_dependency_sass <- function(theme) {
  precompiled <- isTRUE(get_precompiled_option())
  default_theme <- !is_bs_theme(theme) || identical(theme, bs_theme())
  if (precompiled && default_theme) {
    component_dependency_css()
  } else {
    component_dependency_sass_(theme)
  }
}

component_dependency_sass_ <- function(theme) {
  scss_dir <- path_inst("components", "scss")
  scss_files <- c(
    file.path(scss_dir, "mixins", "_mixins.scss"),
    dir(scss_dir, pattern = "\\.scss$", full.names = TRUE)
  )

  bs_dependency(
    input = lapply(scss_files, sass_file),
    # At least currently, when statically rendering a component,
    # bs_dependency_defer() passes along a NULL theme. We should
    # eventually fix that, but for now, fall back to the default theme
    theme = theme %||% bs_theme(),
    name = "bslib-component-css",
    version = get_package_version("bslib"),
    cache_key_extra = get_package_version("bslib"),
    .sass_args = list(options = sass_options(output_style = "compressed"))
  )
}


web_component <- function(tagName, ...) {
  htmltools::tag(tagName, rlang::list2(...))
}
