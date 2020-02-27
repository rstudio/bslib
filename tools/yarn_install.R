if (Sys.which("yarn") == "") {
  stop("The yarn CLI must be installed and in your PATH")
}

withr::with_dir("inst", system("yarn install"))

# I don't think we'll need these special builds of popper (at least for now)
unlink("inst/node_modules/popper.js/dist/umd", recursive = TRUE)
unlink("inst/node_modules/popper.js/dist/esm", recursive = TRUE)

# Avoiding bootstrap's distributed CSS saves us another 1.5 Mb
unlink("inst/node_modules/bootstrap/dist/css", recursive = TRUE)

# For now we're just using the main JS bundle
unlink("inst/node_modules/bootstrap/js", recursive = TRUE)
file.remove(file.path(
  "inst/node_modules/bootstrap/dist/js",
  c("bootstrap.js", "bootstrap.js.map", "bootstrap.min.js", "bootstrap.min.js.map")
))

# Each Bootswatch theme bundles Bootstrap
file.remove(c(
  Sys.glob("inst/node_modules/bootswatch/dist/*/bootstrap.css"),
  Sys.glob("inst/node_modules/bootswatch/dist/*/bootstrap.min.css")
))

# To fully support Bootstrap+Bootswatch 3 and 4, we need to bundle
# multiple versions of Bootswatch...this downloads Bootswatch 3
tmp_dir <- tempdir()
withr::with_dir(tmp_dir, system("yarn add bootswatch@3.4.1"))
source <- file.path(tmp_dir, "node_modules", "bootswatch")
target <- "inst/node_modules/bootswatch3"
if (!file.exists(target)) dir.create(target)
file.rename(source, target)

# Again, Bootswatch loves to bundle Bootstrap with each theme
file.remove(c(
  Sys.glob("inst/node_modules/bootswatch3/*/bootstrap.css"),
  Sys.glob("inst/node_modules/bootswatch3/*/bootstrap.min.css"),
  Sys.glob("inst/node_modules/bootswatch3/*/thumbnail.png"),
  # I don't think we'll need less files
  Sys.glob("inst/node_modules/bootswatch3/*/*.less")
))

# :eye_roll:
unlink("inst/node_modules/bootswatch3/docs", recursive = TRUE)
unlink("inst/node_modules/bootswatch3/.github", recursive = TRUE)
# we already got fonts via tools/download_fonts.R
unlink("inst/node_modules/bootswatch3/fonts", recursive = TRUE)

# Rename node_modules to lib to avoid the stupiest CRAN note ever
# https://www.r-bloggers.com/the-most-annoying-warning-for-cran-submission/
pkgs <- Sys.glob("inst/node_modules/*")
file.rename(pkgs, sub("node_modules/", "lib/", pkgs))
unlink("inst/node_modules/", recursive = TRUE)

# GitHub reports security issues of devDependencies, but that's irrelevant to us
remove_dev_dependencies <- function(pkg_file) {
  if (!file.exists(pkg_file)) return()
  json <- jsonlite::fromJSON(pkg_file)
  json <- json[setdiff(names(json), "devDependencies")]
  jsonlite::write_json(json, pkg_file, pretty = TRUE, auto_unbox = TRUE)
}

invisible(lapply(
  Sys.glob("inst/lib/*/package.json"),
  remove_dev_dependencies
))

# Create the LICENSE file
LICENSE <- c(
  "The bootstraplib package as a whole is distributed under MIT.",
  "",
  "The bootstraplib package includes other open source software components.",
  "The following is a list of these components (full copies of the license",
  "agreements used by these components are included below):",
  "",
  "- Bootstrap, https://github.com/twbs/bootstrap",
  "- bootstrap-colorpicker, https://github.com/itsjavi/bootstrap-colorpicker",
  "- Bootswatch, https://github.com/thomaspark/bootswatch",
  "- popper.js, https://github.com/popperjs/popper-core",
  rep("", 2),
  readLines("inst/lib/bootstrap/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootstrap-colorpicker/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootswatch/LICENSE"),
  rep("", 2),
  readLines("https://raw.githubusercontent.com/popperjs/popper-core/master/LICENSE.md")
)
writeLines(LICENSE, "LICENSE")
