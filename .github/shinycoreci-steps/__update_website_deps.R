
installed_packages <- as.data.frame(installed.packages())
base_pkgs <- unname(unlist(subset(installed_packages, Priority == "base", "Package")))
desc_pkgs <- desc::desc_get_deps()$package

set_desc_with_packages <- function(field, known_pkgs) {

  pkgs <- sort(setdiff(known_pkgs, c("R", "bslib", desc_pkgs, base_pkgs)))

  pkg_txt <- paste0(paste0("\n    ", pkgs), collapse = ",")
  desc::desc_set(paste0("Config/Needs/", field), pkg_txt)
}


demo_pkgs <- unique(renv::dependencies("inst/themer-demo", progress = FALSE)$Package)
vig_pkgs <- unique(renv::dependencies("vignettes", progress = FALSE)$Package)

set_desc_with_packages("website", vig_pkgs)
# BH is not picked up for some reason
set_desc_with_packages("deploy", c("BH", demo_pkgs))
