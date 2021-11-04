demo_pkgs <- unique(renv::dependencies("inst/themer-demo", progress = FALSE)$Package)
vig_pkgs <- unique(renv::dependencies("vignettes", progress = FALSE)$Package)


known_pkgs <- c(
    "rstudio/quillt",
    "BH", # it is not picked up for some reason
    vig_pkgs,
    demo_pkgs
)

installed_packages <- as.data.frame(installed.packages())
base_pkgs <- unname(unlist(subset(installed_packages, Priority == "base", "Package")))

desc_pkgs <- desc::desc_get_deps()$package

pkgs <- sort(setdiff(known_pkgs, c("R", "bslib", desc_pkgs, base_pkgs)))

pkg_txt <- paste0(paste0("\n    ", pkgs), collapse = "")
desc::desc_set("Config/Needs/website", pkg_txt)
