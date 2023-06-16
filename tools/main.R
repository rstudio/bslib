if (!identical(getwd(), rprojroot::find_package_root_file())) {
  stop("This script must be run from the top directory of the bslib package")
}

pkgload::load_all()

lapply(c(
  "yarn_install.R",
  "download_preset_fonts.R",
  "update_gfont_info.R",
  "expand_variables_article_template.R"
), function(file) {
  message("Updating: ", file)
  source(file.path("tools", file), local = TRUE)
})
