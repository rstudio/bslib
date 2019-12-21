#' Bootswatch helpers
#'
#' Use `bootswatch_themes()` to obtain a list of all available bootswatch themes.
#' Use `is_bootswatch_theme()` to test if a [bs_theme()] object has a bootswatch theme.
#'
#' @param version the major version of Bootswatch.
#' @param full_path whether to return a path to the installed theme.
#' @rdname bootswatch-helpers
#' @export
bootswatch_themes <- function(version = version_latest(), full_path = FALSE) {
  version <- version_resolve(version)
  list.dirs(bootswatch_dist(version), full.names = full_path, recursive = FALSE)
}

#' @rdname bootswatch-helpers
#' @export
has_bootswatch_theme <- function(theme) {
  is_bs_theme(theme) && any(!theme %in% "bootstrap")
}

bootswatch_dist <- function(version, full_path = TRUE) {
  dist <- if (version %in% "3") {
    file.path("node_modules", "bootswatch3")
  } else if (version %in% c("4", "4-3")) {
    file.path("node_modules", "bootswatch", "dist")
  } else {
    stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
  }
  if (full_path) {
    dist <- system.file(dist, package = "bootstraplib")
  }
  dist
}

bootswatch_theme_resolve <- function(bootswatch, version) {
  if (is.null(bootswatch)) return("bootstrap")
  # because rmarkdown
  if (bootswatch %in% c("default", "bootstrap", "")) return("bootstrap")
  if (version %in% c("4", "4-3")) {
    bootswatch <- switch(bootswatch, paper = "materia", readable = "litera", bootswatch)
  }
  match.arg(bootswatch, bootswatch_themes(version))
}

