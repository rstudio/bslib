if (!identical(getwd(), rprojroot::find_package_root_file())) {
  stop("This script must be run from the top directory of the bslib package")
}

pkgload::load_all()

components <- fs::dir_ls(path_components("scss"), type = "file")
components <- basename(tools::file_path_sans_ext(components))

# TODO: save a CSS file for every version >= 5?
lapply(components, function(x) {
  dep <- component_dependency_sass_(bs_theme(), x)
  css <- file.path(dep$src, dep$stylesheet)
  target_dir <- file.path(path_components("dist"), x)
  if (!dir.exists(target_dir)) dir.create(target_dir)
  target_css <- file.path(target_dir, paste0(x, ".css"))
  file.copy(css, target_css, overwrite = TRUE)
})
