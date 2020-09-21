
# This figures out which precompiled CSS files are available.
# This is memoized - it runs once per R session.
precompiled_css <- local({
  themes <- NULL

  function() {
    if (is.null(themes)) {
      versions <- dir(system.file("css-precompiled", package = "bootstraplib"))
      themes <<- lapply(versions, function(version) {
        list(
          version = version,
          theme = bs_theme_create(version)
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
#' @param theme A theme object.
#'
#' @return The path to the precompiled CSS file, if it exists, or `NULL`, if
#'   not.
#'
#' @examples
#' # The path to a precompiled CSS file for a theme
#' precompiled_css_path(bs_theme_create("4"))
#'
#' # Attempting to get the path to a theme that is not precompiled will return NULL
#' precompiled_css_path(bs_theme_create(bootswatch = "sketchy"))
#' @keywords internal
#' @export
precompiled_css_path <- function(theme) {
  version <- precompiled_css_version(theme)
  if (is.null(version)) {
    return(NULL)
  }

  system_file(package = "bootstraplib", "css-precompiled", version, "bootstrap.min.css")
}
