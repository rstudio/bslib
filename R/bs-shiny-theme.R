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

#' @export
bs_preset_bundle.bs_preset_builtin <- function(
  preset = new_theme_preset("shiny"),
  ...
) {
  name <- preset$name
  version <- preset$version

  theme <- validate_builtin_theme_name(name, version = version)

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

validate_builtin_theme_name <- function(name, version = version_default()) {
  if (!name %in% builtin_themes(version)) {
    msg <- "'%s' is not a valid bslib-provided theme."
    info <- "Available Bootstrap %s themes are: '%s'"
    rlang::abort(c(
      sprintf(msg, name),
      i = sprintf(info, version, paste0(builtin_themes(version), collapse = "', '"))
    ))
  }

  name
}

path_builtin_theme <- function(..., version = version_default()) {
  switch_version(
    version,
    five = system.file("custom-themes", "bs5", ..., package = "bslib")
  )
}
