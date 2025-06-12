#' Obtain a list of all available built-in \pkg{bslib} themes.
#'
#' @param version the major version of Bootstrap.
#' @param full_path whether to return a path to the installed theme.
#'
#' @return Returns a character vector of built-in themes provided by
#'   \pkg{bslib}.
#'
#' @family Bootstrap theme utility functions
#' @export
builtin_themes <- function(version = version_default(), full_path = FALSE) {
  path_builtins <- path_builtin_theme(version = version)
  if (is.null(path_builtins)) {
    return(NULL)
  }

  list.dirs(path_builtins, full.names = full_path, recursive = FALSE)
}

builtin_bundle <- function(name = "shiny", version = version_default()) {
  name <- validate_builtin_preset_name(name, version = version)

  font_css <- path_builtin_theme(name, "font.css", version = version)
  attachments <- if (file.exists(font_css)) {
    c(
      "font.css" = font_css,
      fonts = system_file("fonts", package = "bslib")
    )
  }

  sass_parts <- rlang::set_names(c("variables", "mixins", "rules"))

  sass_files <- lapply(sass_parts, function(part) {
    path <- path_builtin_theme(
      name,
      paste0("_", part, ".scss"),
      version = version
    )
    if (file.exists(path)) sass_file(path)
  })

  sass_bundle(
    "builtin" = sass_layer(
      file_attachments = attachments,
      defaults = list(
        "bslib-preset-type" = "builtin",
        "bslib-preset-name" = name,
        '$web-font-path: "font.css" !default;',
        sass_files$variables
      ),
      mixins = list(sass_files$mixins),
      rules = list(sass_files$rules)
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
        paste0(builtin_themes(version), collapse = "', '")
      )
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
