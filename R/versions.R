package_json_version <- function(pkgname) {
  jsonlite::fromJSON(system.file("node_modules", pkgname, "package.json", package = "bootstraplib"))$version
}

version_bootstrap <- package_json_version("bootstrap")
version_bootswatch <- package_json_version("bootswatch")
version_jquery <- package_json_version("jquery")
version_popperjs <- package_json_version("popper.js")
