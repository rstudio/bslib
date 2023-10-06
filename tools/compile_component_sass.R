if (!identical(getwd(), rprojroot::find_package_root_file())) {
  stop("This script must be run from the top directory of the bslib package")
}

pkgload::load_all()

# TODO: save a CSS file for every version >= 5?
dep <- component_dependency_sass_(bs_theme())
css <- file.path(dep$src, dep$stylesheet)
target_dir <- path_inst("components", "dist")
target_css <- file.path(target_dir, "components.css")
file.copy(css, target_css, overwrite = TRUE)
