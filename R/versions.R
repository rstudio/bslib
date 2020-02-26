lib_file <- function(...) {
  file <- system.file("lib", ..., package = "bootstraplib")
  if (file != "") return(file)
  stop(
    "bootstraplib file not found: '", file.path(...), "'",
    call. = FALSE
  )
}

package_json_version <- function(pkgname) {
  jsonlite::fromJSON(lib_file(pkgname, "package.json"))$version
}

version_bs4 <- package_json_version("bootstrap")
version_bootswatch3 <- package_json_version("bootswatch")
version_popperjs <- package_json_version("popper.js")

version_bs3 <- package_json_version("bootstrap-sass")
version_bootswatch3 <- package_json_version("bootswatch3")

#' Bootstrap major version default
#' @export
version_default <- function() "4+3"

# TODO: make this a getter/setter?
