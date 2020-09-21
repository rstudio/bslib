#' Obtain a list of all available bootswatch themes.
#'
#' @param version the major version of Bootswatch.
#' @param full_path whether to return a path to the installed theme.
#' @export
bootswatch_themes <- function(version = version_default(), full_path = FALSE) {
  version <- version_resolve(version)
  list.dirs(bootswatch_dist(version), full.names = full_path, recursive = FALSE)
}

#' Obtain a theme's Bootswatch theme name
#'
#' @inheritParams bs_theme_update
#' @export
theme_bootswatch <- function(theme = bs_global_get()) {
  if (!is_bs_theme(theme)) return(NULL)
  # Search for the tag applied in bootswatch_layer()
  tag <- grep("^bootstraplib_bootswatch_", theme$tags, value = TRUE)
  if (length(tag) == 0) return(NULL)
  sub("bootstraplib_bootswatch_", "", tag)
}

#' Obtain a theme's Bootstrap version
#'
#' @inheritParams bs_theme_update
#' @export
theme_version <- function(theme = bs_global_get()) {
  if (!is_bs_theme(theme)) return(NULL)
  # Get version from the tag applied in bootstrap_layer()
  tag <- grep("^bootstraplib_version_", theme$tags, value = TRUE)
  if (length(tag) == 0) return(NULL)
  sub("bootstraplib_version_", "", tag)
}


bootswatch_dist <- function(version) {
  if (version %in% "3") {
    lib_file("bootswatch3")
  } else if (version %in% c("4", "4+3")) {
    lib_file("bootswatch", "dist")
  } else {
    stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
  }
}

bootswatch_theme_resolve <- function(bootswatch, version) {
  if (is.null(bootswatch)) return("bootstrap")
  # because rmarkdown
  if (bootswatch %in% c("default", "bootstrap", "")) return("bootstrap")
  if (version %in% c("4", "4+3")) {
    bootswatch <- switch(bootswatch, paper = "materia", readable = "litera", bootswatch)
  }
  match.arg(bootswatch, bootswatch_themes(version))
}
