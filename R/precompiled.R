# List which precompiled CSS files are available.
.precompiled_css_versions <- local({
  versions <- NULL
  function() {
    if (is.null(versions)) {
      versions <<- dir(system.file("css-precompiled", package = "bslib"))
    }
    versions
  }
})

.precompiled_css_themes <- new.env(parent = emptyenv())

# Precompiled themes are created for base `bs_theme()`, changing only the
# Bootstrap version number. To decide if we can use the precompiled theme, we
# hash `bs_theme(version)`, which we'll compare with a hash of the user's theme.
precompiled_bs_theme_hash <- function(version) {
  theme_hash <- get0(version, .precompiled_css_themes)

  if (is.null(theme_hash)) {
    theme_hash <- rlang::hash(bs_theme(version = version, brand = FALSE))
    assign(version, theme_hash, envir = .precompiled_css_themes)
  }

  return(theme_hash)
}

#' Get the path to a precompiled CSS file
#'
#' This function is meant for development and debugging purposes. It can be used
#' to test if a precompiled CSS file exists for a given theme object.
#'
#' @inheritParams bs_theme_update
#'
#' @return The path to the precompiled CSS file, if it exists, or `NULL`, if
#'   not.
#' @keywords internal
#' @export
precompiled_css_path <- function(theme = bs_theme()) {
  version <- theme_version(theme)
  theme_hash <- rlang::hash(theme)
  version_precompiled <- NULL

  if (is.null(version)) {
    for (v in .precompiled_css_versions()) {
      if (identical(theme_hash, precompiled_bs_theme_hash(v))) {
        version_precompiled <- v
        break
      }
    }
  } else if (version %in% .precompiled_css_versions()) {
    if (identical(theme_hash, precompiled_bs_theme_hash(version))) {
      version_precompiled <- version
    }
  }

  if (is.null(version_precompiled)) {
    return(NULL)
  }

  system_file(
    package = "bslib",
    "css-precompiled",
    version_precompiled,
    "bootstrap.min.css"
  )
}
