component_dependency_js <- function(name) {
  minified <- get_shiny_devmode_option("shiny.minified", default = TRUE)

  htmlDependency(
    name = paste0("bslib-", name, "-js"),
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist", name),
    script = paste0(name, if (minified) ".min", ".js"),
    all_files = TRUE
  )
}

# Pre-compiled component styles
component_dependency_css <- function(name) {
  htmlDependency(
    name = paste0("bslib-", name, "-styles"),
    version = get_package_version("bslib"),
    package = "bslib",
    src = file.path("components", "dist", name),
    stylesheet = paste0(name, ".css")
  )
}

# Run-time (Sass) component styles
component_dependency_sass <- function(theme, name) {
  precompiled <- isTRUE(get_precompiled_option())
  default_theme <- !is_bs_theme(theme) || identical(theme, bs_theme())
  if (precompiled && default_theme) {
    component_dependency_css(name)
  } else {
    component_dependency_sass_(theme, name)
  }
}

component_dependency_sass_ <- function(theme, name) {
  scss_files <- list(
    path_components("scss", "mixins", "_mixins.scss"),
    path_components("scss", paste0(name, ".scss"))
  )

  bs_dependency(
    input = lapply(scss_files, sass_file),
    theme = theme,
    name = paste0("bslib-", name, "-styles"),
    version = get_package_version("bslib"),
    cache_key_extra = get_package_version("bslib"),
    .sass_args = list(options = sass_options(output_style = "compressed"))
  )
}
