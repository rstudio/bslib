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

# We'll need a copy of the `bs_theme()` object representing each precompiled
# theme so we can compare with the user theme to only use the precompiled theme
# if the two are identical. Base themes are hashed and cached.
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
  built_version <- NULL

  if (is.null(version)) {
    for (v in .precompiled_css_versions()) {
      if (identical(theme_hash, precompiled_bs_theme_hash(v))) {
        built_version <- v
        break
      }
    }
  } else if (version %in% .precompiled_css_versions()) {
    if (identical(theme_hash, precompiled_bs_theme_hash(version))) {
      built_version <- version
    }
  }

  if (is.null(built_version)) {
    return(NULL)
  }

  system_file(
    package = "bslib",
    "css-precompiled",
    built_version,
    "bootstrap.min.css"
  )
}
