package_json_version <- function(pkgname) {
  jsonlite::fromJSON(system.file("node_modules", pkgname, "package.json", package = "bootstraplib"))$version
}

version_bs4 <- package_json_version("bootstrap")
version_bootswatch3 <- package_json_version("bootswatch")
version_popperjs <- package_json_version("popper.js")

version_bs3 <- package_json_version("bootstrap-sass")
version_bootswatch3 <- package_json_version("bootswatch3")


