
installed_packages <- as.data.frame(installed.packages())
base_pkgs <- unname(unlist(subset(installed_packages, Priority == "base", "Package")))
desc_pkgs <- desc::desc_get_deps()$package

set_desc_with_packages <- function(field, known_pkgs) {

  config_field <- paste0("Config/Needs/", field)
  config_pkgs <- strsplit(desc::desc_get_field(config_field), "[[:space:],]+")[[1]]
  pkgs <- sort(setdiff(known_pkgs, c("R", "bslib", desc_pkgs, base_pkgs, config_pkgs)))

  all_pkgs <- sort(c(config_pkgs, pkgs))
  pkg_txt <- paste0(paste0("\n    ", all_pkgs), collapse = ",")
  desc::desc_set(config_field, pkg_txt)
}


demo_pkgs <-renv::dependencies(
  c("inst/themer-demo", list.dirs("inst/examples")), 
  progress = FALSE
)$Package
# BH/cpp11 is not picked up for some reason
set_desc_with_packages("deploy", unique(c("BH", "cpp11", demo_pkgs)))

vig_pkgs <- renv::dependencies("vignettes", progress = FALSE)$Package
set_desc_with_packages("website", unique(vig_pkgs))