if (!identical(getwd(), rprojroot::find_package_root_file())) {
  stop("This script must be run from the top directory of the bootstraplib package")
}

lapply(c(
  "yarn_install.R",
  "local_bootswatch_fonts.R",
  "update_gfont_info.R"
), function(file) {
  message("Updating: ", file)
  source(file.path("tools", file), local = TRUE)
})
