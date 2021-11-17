.onLoad <- function(libname, pkgname) {
  register_upgrade_message("shiny", "1.6.0")
  register_upgrade_message("rmarkdown", "2.7")
  .dependency_cache <<- cachem::cache_mem(max_age = 1)
}

.dependency_cache <- NULL
