#' Obtain Bootstrap and Bootswatch SASS files
#'
#' Useful if you need to import specific SASS files from
#' Bootstrap and/or Bootswatch, but hopefully you won't need
#' this level of control. If you're looking to obtain the SASS
#' behind a theme object, use [bs_theme_sass()].
#'
#' `sass_file_bootstrap()` defaults to the main Bootstrap scss file.
#' `sass_file_bootswatch()` defaults to the variables scss file.
#'
#' @param file a scss file path.
#' @param version the major version.
#' @param theme a bootswatch theme name.
#' @rdname sass_files
#' @seealso [bs_theme_sass()]
#' @export
sass_file_bootstrap <- function(file = NULL, version = 4) {
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
sass_file_bootswatch <- function(theme, file = NULL, version = version_latest()) {
  version <- version_resolve(version)
  if (length(file) > 1) stop("file should be of length 1")
  theme <- match.arg(theme, bootswatch_themes(version))
  f <- file.path(bootswatch_dist(version), theme, file %||% "_variables.scss")
  if (file.exists(f)) return(sass::sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}
