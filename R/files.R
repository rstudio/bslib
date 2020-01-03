#' Obtain Bootstrap and Bootswatch SASS files
#'
#' Useful if you need to import specific SASS files from
#' Bootstrap and/or Bootswatch, but hopefully you won't need
#' this level of control.
#'
#' @param file a scss file path.
#' @param version the major version.
#' @param theme a bootswatch theme name.
#' @rdname sass_files
#' @export
bootstrap_sass_files <- function(files = NULL, version = version_default()) {
  as_sass(lapply(files, bootstrap_sass_file, version))
}

bootstrap_sass_file <- function(file = NULL, version) {
  version <- version_resolve(version)
  if (length(file) > 1) stop("file should be of length 1")

  f <- if (version %in% "3") {
    file <- file %||% "_bootstrap.scss"
    system.file("node_modules", "bootstrap-sass", "assets", "stylesheets", file, package = "bootstraplib")
  } else if (version %in% c("4", "4-3")) {
    file <- file %||% "bootstrap.scss"
    system.file("node_modules", "bootstrap", "scss", file, package = "bootstraplib")
  } else {
    stop("Bootstrap version not supported:", version, call. = FALSE)
  }
  if (f == "") stop("The bootstrap stylesheet '", file, "' doesn't exist.", call. = FALSE)
  sass::sass_file(f)
}

#' @rdname sass_files
#' @export
bootswatch_sass_files <- function(theme, files = NULL, version = version_default()) {
  as_sass(lapply(files, bootswatch_sass_file, theme = theme, version = version))
}

bootswatch_sass_file <- function(theme, file = NULL, version = version_default()) {
  version <- version_resolve(version)
  if (length(file) > 1) stop("file should be of length 1")
  theme <- match.arg(theme, bootswatch_themes(version))
  f <- file.path(bootswatch_dist(version), theme, file %||% "_variables.scss")
  if (file.exists(f)) return(sass::sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}
