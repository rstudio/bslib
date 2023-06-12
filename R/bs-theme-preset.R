new_theme_preset <- function(
  name = NULL,
  bootswatch = NULL,
  version = version_default()
) {
  if (is.null(name) && is.null(bootswatch)) return(NULL)

  if (!is.null(name) && !is.null(bootswatch)) {
    # TODO [preset] better error message
    rlang::abort("Can't specify both `name` and `bootswatch`")
  }

  preset <- list(
    version = version,
    name = name %||% bootswatch
  )

  if (!rlang::is_string(preset$name)) {
    # TODO [preset] better error message
    rlang::abort("The preset built-in or Bootswatch theme name must be a single character string.")
  }

  as_preset <- function(preset, subclass = NULL) {
    structure(preset, class = c(subclass, "bs_theme_preset"))
  }

  if (preset$name %in% c("default", "bootstrap")) {
    # "default" means no preset bundle, just bare default Bootstrap
    # note that `preset` doesn't include a `class` item
    preset$name <- "default"
    return(as_preset(preset))
  }

  preset_class <- function(type, name) {
    name_safe <- gsub("[^[:alnum:]]", "_", name)
    paste("bs", type, name_safe, sep = "_")
  }

  builtin_themes <- builtin_themes(version)
  bootswatch_themes <- bootswatch_themes(version)

  if (length(builtin_themes) > 0 && preset$name %in% builtin_themes) {
    preset$class <- preset_class("builtin", preset$name)
    return(as_preset(preset, "bs_preset_builtin"))
  }

  if (length(bootswatch_themes) > 0 && preset$name %in% bootswatch_themes) {
    preset$class <- preset_class("bootswatch", preset$name)
    return(as_preset(preset, "bs_preset_bootswatch"))
  }

  # TODO [preset] better error message
  rlang::abort(sprintf("Unknown theme: '%s'", preset$name))
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
