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
theme_bootswatch <- function(theme) {
  retrieve_theme_version(theme, "bootswatch")
}

#' Obtain a theme's Bootstrap version
#'
#' @inheritParams bs_theme_update
#' @export
theme_version <- function(theme) {
  retrieve_theme_version(theme, "bootstrap")
}

retrieve_theme_version <- function(theme, name) {
  if (!is_bs_theme(theme)) return(NULL)

  # Get version from the tag applied in bootstrap_layer()
  layer_names <- rlang::names2(theme$layers)
  matching_pos <- grep(paste0("^", name, "@([^~#]+)$"), layer_names)
  if (length(matching_pos) == 0) return(NULL)
  if (length(matching_pos) > 1) stop("Found multiple ", name, " versions.")
  sub(paste0(name, "@"), "", layer_names[matching_pos])
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
    if (identical(bootswatch, "paper")) {
      message("Bootswatch 3 theme paper has been renamed to materia in version 4 (using that theme instead)")
      bootswatch <- "materia"
    }
    if (identical(bootswatch, "readable")) {
      message("Bootswatch 3 theme readable has been renamed to litera in version 4 (using that theme instead)")
      bootswatch <- "litera"
    }
  }
  match.arg(bootswatch, bootswatch_themes(version))
}
