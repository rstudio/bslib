#!/usr/bin/env Rscript

# This script generates precompiled builds of Bootstrap's css. It would be nice
# to do it at binary package build time, but I couldn't get that to work, using
# either src/install.libs.R (because the bootstraplib functions used in this
# script aren't available yet), or by putting this code directly in the R/
# directory (because the R/ files are evaluated only after the inst directory
# is copied over).

library(rprojroot)
pkgload::load_all()

# The versions of Bootstrap to precompile
versions <- c("4", "4+3", "3")

precompiled_dir <- find_package_root_file("inst/css-precompiled")
unlink(precompiled_dir, recursive = TRUE)
dir.create(precompiled_dir, recursive = TRUE)

lapply(versions, function(version) {
  res <- bs_dependencies(bs_theme(version), use_precompiled_css = FALSE)
  # Extract the Bootstrap dependency object (as opposed to, say, jQuery)
  bs_dep <- Filter(res, f = function(x) { identical(x$name, "bootstrap") })[[1]]

  tmp_css <- file.path(bs_dep$src$file, bs_dep$stylesheet)
  dest_dir <- file.path(precompiled_dir, version)
  if (!dir.exists(dest_dir)) {
    dir.create(dest_dir)
  }
  file.copy(tmp_css, dest_dir)
})
