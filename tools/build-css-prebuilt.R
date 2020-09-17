#!/usr/bin/env Rscript

# This script generates prebuilt builds of Bootstrap's css. It would be nice to
# do it at build-time, but
library(rprojroot)
pkgload::load_all()

# The versions of Bootstrap to prebuild
versions <- c("4", "4+3", "3")

prebuilt_dir <- find_package_root_file("inst/css-prebuilt")
unlink(prebuilt_dir, recursive = TRUE)
dir.create(prebuilt_dir, recursive = TRUE)

lapply(versions, function(version) {
  res <- bootstrap(bs_theme_create(version), use_prebuilt_css = FALSE)
  # Extract the Bootstrap dependency object (as opposed to, say, jQuery)
  bs_dep <- Filter(res, f = function(x) { identical(x$name, "bootstrap") })[[1]]

  tmp_css <- file.path(bs_dep$src$file, bs_dep$stylesheet)
  dest_dir <- file.path(prebuilt_dir, version)
  if (!dir.exists(dest_dir)) {
    dir.create(dest_dir)
  }
  file.copy(tmp_css, dest_dir)
})
