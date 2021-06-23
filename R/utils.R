switch_version <- function(version, five = default, four = default, three = default, default = NULL) {
  if (is_bs_theme(version)) {
    version <- theme_version(version)
  }
  version <- as.character(version)
  if (isTRUE(version %in% c("4-3", "4+3"))) {
    warning("Version ", version, " has been renamed to 4. Please use 4 instead")
    version <- "4"
  }
  switch(
    version, `5` = five, `4` = four, `3` = three,
    stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
  )
}

get_exact_version <- function(version) {
  switch_version(version, five = version_bs5, four = version_bs4, three = version_bs3)
}

lib_file <- function(...) {
  files <- system_file("lib", ..., package = "bslib")
  files_found <- files != ""
  if (all(files_found)) return(files)

  files_not_found <- file.path(...)[!files_found]
  stop(
    "bslib file not found: '", files_not_found, "'",
    call. = FALSE
  )
}

# copy of shiny:::is_available
is_available <- function(package, version = NULL) {
  installed <- nzchar(system.file(package = package))
  if (is.null(version)) {
    return(installed)
  }
  installed && isTRUE(fastPackageVersion(package) >= version)
}

# Since I/O can be expensive, only utils::packageVersion() if the package isn't already loaded
fastPackageVersion <- function(pkg) {
  ns <- .getNamespace(pkg)
  if (is.null(ns)) {
    utils::packageVersion(pkg)
  } else {
    as.package_version(ns$.__NAMESPACE__.$spec[["version"]])
  }
}

is_shiny_app <- function() {
  # Make sure to not load shiny as a side-effect of calling this function.
  isNamespaceLoaded("shiny") && shiny::isRunning()
}

is_hosted_app <- function() {
  nzchar(Sys.getenv("SHINY_SERVER_VERSION")) && is_shiny_app()
}

is_shiny_runtime <- function() {
  isTRUE(grepl("^shiny", knitr::opts_knit$get("rmarkdown.runtime")))
}

add_class <- function(x, y) {
  class(x) <- unique(c(y, oldClass(x)))
  x
}

is_string <- function(x) {
  is.character(x) && length(x) == 1
}

dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE=logical(1))]
}

names2 <- function(x) {
  names(x) %||% rep.int("", length(x))
}

"%||%" <- function(x, y) {
  if (is.null(x)) y else x
}

#' Rename a named list
#'
#' @param x a named list to be renamed
#' @param nms a named character vector defining the renaming
#' @noRd
#' @examples
#' rename2(list(a=1, b=3, c=4, a=2), b="z", f="w", a="y")
#' #> list(y = 1, z = 3, c = 4, y = 2)
#' rename2(c("a", "b", "c", "a"), b="z", f="w", a="y")
#' #> c("y", "z", "c", "y")
rename2 <- function(x, ...) {
  defs <- rlang::list2(...)
  nms <- names(x) %||% as.character(x)
  matches <- intersect(nms, names(defs))
  map <- match(nms, names(defs))
  mapidxNA <- is.na(map)
  replacement <- as.character(defs)[map[!mapidxNA]]
  if (is.null(names(x))) {
    x[!mapidxNA] <- replacement
  } else {
    names(x)[!mapidxNA] <- replacement
  }
  x
}


# Wrapper around base::system.file. In base::system.file, the package directory
# lookup is a bit slow. This caches the package directory, so it is much faster.
system_file <- local({
  package_dir_cache <- character()

  function(..., package = "base") {
    if (!is.null(names(list(...)))) {
      stop("All arguments other than `package` must be unnamed.")
    }

    if (package %in% names(package_dir_cache)) {
      package_dir <- package_dir_cache[[package]]
    } else {
      package_dir <- system.file(package = package)
      package_dir_cache[[package]] <<- package_dir
    }

    file.path(package_dir, ...)
  }
})
