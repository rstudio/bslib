resolve_bs_preset <- function(
  name = NULL,
  bootswatch = NULL,
  version = version_default()
) {
  if (is.null(name) && is.null(bootswatch)) return(NULL)

  if (!is.null(name) && !is.null(bootswatch)) {
    # TODO [preset] better error message
    rlang::abort("Can't specify both `name` and `bootswatch`")
  }

  preset_name <- name %||% bootswatch

  if (!rlang::is_string(preset_name)) {
    # TODO [preset] better error message
    rlang::abort("The preset built-in or Bootswatch theme name must be a single character string.")
  }

  if (preset_name %in% c("default", "bootstrap")) {
    # "default" means no preset bundle, just bare default Bootstrap
    return(new_bs_preset("default", version))
  }

  builtin_themes <- builtin_themes(version)
  bootswatch_themes <- bootswatch_themes(version)

  if (length(builtin_themes) > 0 && preset_name %in% builtin_themes) {
    return(new_bs_preset(preset_name, version, type = "builtin"))
  }

  if (length(bootswatch_themes) > 0 && preset_name %in% bootswatch_themes) {
    return(new_bs_preset(preset_name, version, type = "bootswatch"))
  }

  # TODO [preset] better error message
  rlang::abort(sprintf("Unknown theme: '%s'", preset_name))
}

new_bs_preset <- function(name, version, type = NULL) {
  subclass <- if (!is.null(type)) paste0("bs_preset_", type)

  preset_class <- if (!is.null(type)) {
    name_safe <- gsub("[^[:alnum:]]", "_", name)
    paste("bs", type, name_safe, sep = "_")
  }

  preset <- list(
    version = version,
    name = name,
    type = type,
    class = preset_class
  )

  structure(dropNulls(preset), class = c(subclass, "bs_preset"))
}

# The `bs_preset_bundle()` function is the main entry point for creating a
# SASS bundle for a theme preset. This currently dispatches to create a
# bundle for a built-in theme or for a Bootswatch theme.
bs_preset_bundle <- function(preset, ...) {
  UseMethod("bs_preset_bundle", preset)
}

#' @export
bs_preset_bundle.default <- function(preset, ...) {
  # Sub-classes are used to create a bundle for a specific type of preset; this
  # default case is used for "bare" Bootstrap, or an empty preset bundle.
  NULL
}

#' @export
bs_preset_bundle.bs_preset <- function(preset, ...) {
  switch(
    preset$type %||% "",
    builtin = builtin_bundle(preset$name, version = preset$version),
    bootswatch = bootswatch_bundle(preset$name, version = preset$version),
    NextMethod()
  )
}
