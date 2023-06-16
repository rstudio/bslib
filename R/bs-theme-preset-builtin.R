#' Obtain a list of all available built-in \pkg{bslib} themes.
#'
#' @param version the major version of Bootstrap.
#' @param full_path whether to return a path to the installed theme.
#' @export
#' @return a character vector of built-in themes provided by \pkg{bslib}.
builtin_themes <- function(version = version_default(), full_path = FALSE) {
  path_builtins <- path_builtin_theme(version = version)
  if (is.null(path_builtins)) return(NULL)

  list.dirs(path_builtins, full.names = full_path, recursive = FALSE)
}

builtin_bundle <- function(name = "shiny", version = version_default()) {
  theme <- validate_builtin_preset_name(name, version = version)

  switch_version(
    version,
    five = switch(
      theme,
      shiny = sass_bundle(
        "builtin" = sass_layer(
          defaults = sass_file(path_builtin_theme("shiny", "shiny.scss", version = version))
        )
      )
    )
  )
}

validate_builtin_preset_name <- function(name, version = version_default()) {
  builtin_names <- builtin_themes(version)

  if (name %in% builtin_names) {
    return(name)
  }

  msg <- "'%s' is not a valid built-in theme preset provided by {bslib}."

  info <-
    if (length(builtin_names)) {
      sprintf(
        "Available Bootstrap %s themes are: '%s'",
        version,
        paste0(builtin_themes(version), collapse = "', '"))
    } else {
      "No built-in theme presets are available for this version of Bootstrap."
    }

  rlang::abort(c(sprintf(msg, name), "i" = info))
}

path_builtin_theme <- function(..., version = version_default()) {
  switch_version(
    version,
    five = system.file("builtin", "bs5", ..., package = "bslib")
  )
}
