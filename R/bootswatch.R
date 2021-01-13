#' Obtain a list of all available bootswatch themes.
#'
#' @param version the major version of Bootswatch.
#' @param full_path whether to return a path to the installed theme.
#' @export
bootswatch_themes <- function(version = version_default(), full_path = FALSE) {
  list.dirs(bootswatch_dist(version), full.names = full_path, recursive = FALSE)
}

#' Obtain a theme's Bootswatch theme name
#'
#' @inheritParams bs_theme_update
#' @return the Bootswatch theme named used (if any) in the `theme`.
#' @export
theme_bootswatch <- function(theme) {
  if (!is_bs_theme(theme)) return(NULL)

  swatch <- grep("^bs_bootswatch_", class(theme), value = TRUE)
  if (!length(swatch)) return(NULL)

  sub("^bs_bootswatch_", "", swatch)
}

#' Obtain a theme's Bootstrap version
#'
#' @inheritParams bs_theme_update
#' @return the major version of Bootstrap used in the `theme`.
#' @export
theme_version <- function(theme) {
  if (!is_bs_theme(theme)) return(NULL)

  version <- grep("^bs_version_", class(theme), value = TRUE)
  sub("^bs_version_", "", version)
}


bootswatch_dist <- function(version) {
  switch_version(
    version,
    four = lib_file("bsw", "dist"),
    three = lib_file("bsw3")
  )
}
