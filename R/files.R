bs3_sass_files <- function(x) {
  bs_sass_files(x, version = 3)
}

bs4_sass_files <- function(x) {
  bs_sass_files(x, version = 4)
}

bs5_sass_files <- function(x) {
  bs_sass_files(x, version = 5)
}

bs_sass_files <- function(files, version) {
  lapply(files, bs_sass_file, version = version)
}

# Search for one file at a time so we can throw informative errors
bs_sass_file <- function(file, version) {
  if (length(file) != 1) {
    stop("file should be of length 1")
  }

  file <- file.path(
    dirname(file),
    paste0("_", basename(file), ".scss")
  )

  f <- switch_version(
    version,
    five = path_lib("bs5", "scss", file),
    four = path_lib("bs4", "scss", file),
    three = path_lib("bs3", "assets", "stylesheets", "bootstrap", file)
  )
  if (f == "") {
    stop("The bootstrap stylesheet '", file, "' doesn't exist.", call. = FALSE)
  }
  sass_file(f)
}

bootswatch_sass_file <- function(theme, file, version = version_default()) {
  if (length(file) > 1) {
    stop("file should be of length 1")
  }
  theme <- match.arg(theme, bootswatch_themes(version))
  file <- paste0("_", file, ".scss")
  f <- file.path(bootswatch_dist(version), theme, file)
  if (file.exists(f)) {
    return(sass_file(f))
  }
  stop(
    "Bootswatch file '",
    file,
    "' doesn't exist for theme '",
    theme,
    "'.",
    call. = FALSE
  )
}

# Given a vector of sass_file()s, create a list of sass_bundles(),
# so each rule may be removed layer (by its files basename)
rule_bundles <- function(files) {
  files <- lapply(files, as_sass_file)
  paths <- vapply(files, get_sass_file_path, character(1))
  nms <- tools::file_path_sans_ext(basename(paths))
  Map(
    nms,
    files,
    f = function(nm, f) {
      sass_bundle(!!nm := sass_layer(rules = f))
    }
  )
}

get_sass_file_path <- function(x) {
  path <- attr(x, "sass_file_path")
  if (length(path)) {
    return(path)
  }

  stop("Couldn't find file path")
}

as_sass_file <- function(x) {
  if (inherits(x, "sass_file")) x else sass_file(x)
}
