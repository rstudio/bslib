#' Obtain Bootstrap and Bootswatch SASS files
#'
#' Useful if you need to import specific SASS files from
#' Bootstrap and/or Bootswatch, but hopefully you won't need
#' this level of control.
#'
#' @param file a scss file path.
#' @param version the major version.
#' @param theme a bootswatch theme name.
#' @noRd

bs_sass_files <- function(files, version = version_default()) {
  version <- version_resolve(version)
  as_sass(lapply(files, bs_sass_file, version = version))
}

# Search for one file at a time so we can throw informative errors
bs_sass_file <- function(file, version) {
  if (length(file) != 1) stop("file should be of length 1")
  file <- paste0("_", file, ".scss")
  f <- if (version %in% "3") {
    lib_file("bootstrap-sass", "assets", "stylesheets", "bootstrap", file)
  } else if (version %in% c("4", "4+3")) {
    lib_file("bootstrap", "scss", file)
  } else {
    stop("Bootstrap version not supported:", version, call. = FALSE)
  }
  if (f == "") stop("The bootstrap stylesheet '", file, "' doesn't exist.", call. = FALSE)
  sass::sass_file(f)
}

bootswatch_sass_file <- function(theme, file, version = version_default()) {
  if (length(file) > 1) stop("file should be of length 1")
  theme <- match.arg(theme, bootswatch_themes(version))
  file <- paste0("_", file, ".scss")
  f <- file.path(bootswatch_dist(version), theme, file)
  if (file.exists(f)) return(sass::sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}
