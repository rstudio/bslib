bs3_sass_files <- function(x) {
  bs_sass_files(x, version = 3)
}

bs4_sass_files <- function(x) {
  bs_sass_files(x, version = 4)
}

bs_sass_files <- function(files, version) {
  lapply(files, bs_sass_file, version = version)
}

# Search for one file at a time so we can throw informative errors
bs_sass_file <- function(file, version) {
  if (length(file) != 1) stop("file should be of length 1")
  file <- paste0("_", file, ".scss")
  f <- switch_version(
    version,
    four = lib_file("bs", "scss", file),
    three = lib_file("bs-sass", "assets", "stylesheets", "bootstrap", file)
  )
  if (f == "") stop("The bootstrap stylesheet '", file, "' doesn't exist.", call. = FALSE)
  sass_file(f)
}

bootswatch_sass_file <- function(theme, file, version = version_default()) {
  if (length(file) > 1) stop("file should be of length 1")
  theme <- match.arg(theme, bootswatch_themes(version))
  file <- paste0("_", file, ".scss")
  f <- file.path(bootswatch_dist(version), theme, file)
  if (file.exists(f)) return(sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}


# Given a vector of sass_file()s, create a list of sass_bundles(),
# so each rule may be removed layer (by it's files basename)
rule_bundles <- function(files) {
  paths <- vapply(files, get_sass_file_path, character(1))
  nms <- tools::file_path_sans_ext(basename(paths))
  Map(
    nms, files,
    f = function(nm, f) {
      sass_bundle(!!nm := sass_layer(rules = f))
    }
  )
}

get_sass_file_path <- function(x) {
  path <- attr(x, "sass_file_path")
  if (length(path)) return(path)

  stop("Couldn't find file path")
}
