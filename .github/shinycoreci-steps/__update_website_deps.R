vig_pkgs <- unique(renv::dependencies("vignettes", progress = FALSE)$Package)

known_pkgs <- c(
    "rstudio/quillt",
    "BH", # it is not picked up for some reason
    vig_pkgs
)

desc_pkgs <- desc::desc_get_deps()$package
pkgs <- setdiff(known_pkgs, c("R", "bslib", desc_pkgs))

pkg_txt <- paste0(paste0("\n    ", pkgs), collapse = "")
desc::desc_set("Config/Needs/website", pkg_txt)
