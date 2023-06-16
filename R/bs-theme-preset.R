resolve_bs_preset <- function(
  name = NULL,
  bootswatch = NULL,
  version = version_default()
) {
  if (is.null(name) && is.null(bootswatch)) return(NULL)

  assert_preset_scalar_string(name)
  assert_preset_scalar_string(bootswatch)
  assert_preset_only_one_name_arg(name, bootswatch)

  version <- switch_version(version, five = "5", four = "4", three = "3")
  preset_name <- name %||% bootswatch

  if (preset_name %in% c("default", "bootstrap")) {
    # "default" means no preset bundle, just bare default Bootstrap
    return(new_bs_preset("default", version))
  }

  builtin_themes <- builtin_themes(version)

  if (length(builtin_themes) > 0 && preset_name %in% builtin_themes) {
    return(new_bs_preset(preset_name, version, type = "builtin"))
  }

  bootswatch_themes <- bootswatch_themes(version)

  if (length(bootswatch_themes) > 0 && preset_name %in% bootswatch_themes) {
    return(new_bs_preset(preset_name, version, type = "bootswatch"))
  }

  abort_preset_unknown_name(preset_name, version)
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

assert_preset_scalar_string <- function(var, .frame = rlang::caller_env()) {
  var_name <- deparse(substitute(var))

  if (is.null(var) || rlang::is_string(var)) {
    return(invisible())
  }

  msg <- c(
    sprintf("The preset theme `%s` must be a single character string.", var_name),
    "x" = sprintf('Bad: `%s = c("flatly", "darkly")`', var_name),
    "v" = sprintf('Good: `%s = "flatly"`', var_name)
  )
  rlang::abort(msg, .frame = .frame)
}

assert_preset_only_one_name_arg <- function(name, bootswatch, .frame = rlang::caller_env()) {
  both_provided <- !is.null(name) && !is.null(bootswatch)

  if (!both_provided) {
    return(invisible())
  }

  msg <- c(
    "Only one of `name` or `bootswatch` may be provided, and `name` is preferred.",
    "i" = "Did you mean one of the following options?",
    "*" = sprintf('`name = "%s"`', name),
    "*" = sprintf('`name = "%s"`', bootswatch),
    "*" = sprintf('`bootswatch = "%s"`', bootswatch)
  )
  rlang::abort(msg, .frame = .frame)
}

abort_preset_unknown_name <- function(name, version, .frame = rlang::caller_env()) {
  msg <- c(
    sprintf("'%s' is not a known preset theme name", name),
    "i" = "You can list available preset themes:",
    "*" = sprintf("Built-in: `builtin_themes(%s)`", version),
    "*" = sprintf("Bootswatch: `bootswatch_themes(%s)`.", version)
  )
  rlang::abort(msg, .frame = .frame)
}
