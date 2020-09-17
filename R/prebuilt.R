
# Memoized
prebuilt_css <- local({
  themes <- NULL

  function() {
    if (is.null(themes)) {
      versions <- dir(system.file("css-prebuilt", package = "bootstraplib"))
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


prebuilt_css_version <- function(theme) {
  for (prebuilt in prebuilt_css()) {
    if (identical(theme, prebuilt$theme)) {
      return(theme_version(theme))
    }
  }

  return(NULL)
}


#' Get the path to a pre-built CSS file
#'
#' @param theme A theme object.
#'
#' @return The path to the pre-build CSS file, if it exists, or `NULL`, if not.
#'
#' @examples
#' # The path to a pre-built CSS file for a theme
#' prebuilt_css_path(bs_theme_create("4"))
#'
#' # Attempting to get the path to a theme that is not pre-built will return NULL
#' prebuilt_css_path(bs_theme_create(bootswatch = "sketchy"))
#' @export
prebuilt_css_path <- function(theme) {
  version <- prebuilt_css_version(theme)
  if (is.null(version)) {
    return(NULL)
  }

  system_file(package = "bootstraplib", "css-prebuilt", version, "bootstrap.min.css")
}
