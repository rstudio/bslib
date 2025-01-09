
# This figures out which precompiled CSS files are available.
# This is memoized - it runs once per R session.
precompiled_css <- local({
  themes <- NULL

  function() {
    if (is.null(themes)) {
      versions <- dir(system.file("css-precompiled", package = "bslib"))
      themes <<- lapply(versions, function(version) {
        list(
          version = version,
          theme = bs_theme(version, brand = FALSE)
        )
      })
    }
    themes
  }
})


precompiled_css_version <- function(theme) {
  for (precompiled in precompiled_css()) {
    if (identical(theme, precompiled$theme)) {
      return(theme_version(theme))
    }
  }

  return(NULL)
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
  version <- precompiled_css_version(theme)
  if (is.null(version)) {
    return(NULL)
  }

  system_file(package = "bslib", "css-precompiled", version, "bootstrap.min.css")
}
