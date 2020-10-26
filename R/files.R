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
  lapply(files, bs_sass_file, version = version)
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



# Creates a sass_bundle with MANY layers.
# All rules will be separated into named layers, defaults, declarations, and tags will be moved to a initial layer
bs_sass_file_bundle <- function(
  name,
  version,
  defaults = NULL,
  declarations = NULL,
  rules = NULL,
  html_deps = NULL,
  file_attachments = character(0)
) {

  if (!is.null(defaults)) {
    defaults <- bs_sass_files(defaults, version = version)
  }
  if (!is.null(declarations)) {
    declarations <- bs_sass_files(declarations, version = version)
  }

  core <- sass_layer(
    defaults = defaults,
    declarations = declarations,
    html_deps = html_deps,
    file_attachments = file_attachments
  )

  rule_bundles <-
    rules %>%
    bs_sass_files(version = version) %>%
    lapply(function(bs_file) {
      sass_layer(rules = list(bs_file))
    }) %>%
    # Ex: bootstraplib@4#dropdown
    setNames(bs_sass_bundle_version(name, version, file = rules))

  sass_bundle(
    !!bs_sass_bundle_version(name, version) := core,
    sass_bundle(!!!rule_bundles)
  )
}
# have names be consistenly created / found
bs_sass_bundle_version <- function(name, version, file = NULL, subname = NULL) {
  paste0(
    name, "@", version,
    if(!is.null(file)) paste0("#", file),
    if(!is.null(subname)) paste0("~", subname)
  )
}
