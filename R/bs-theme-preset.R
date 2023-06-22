resolve_bs_preset <- function(
  preset = NULL,
  bootswatch = NULL,
  version = version_default()
) {
  if (is.null(preset) && is.null(bootswatch)) return(NULL)

  assert_preset_scalar_string(preset)
  assert_preset_scalar_string(bootswatch)
  assert_preset_only_one_name_arg(preset, bootswatch)

  version <- switch_version(version, five = "5", four = "4", three = "3")
  preset_name <- preset %||% bootswatch

  if (preset_name %in% c("default", "bootstrap")) {
    # "bootstrap" means no preset bundle, just bare default Bootstrap
    return(new_bs_preset("bootstrap", version))
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
  preset <- list(
    version = version, # bootstrap version
    name = name,       # preset name
    type = type        # preset type (e.g. "builtin", "bootswatch")
  )

  structure(dropNulls(preset), class = "bs_preset")
}

# The `bs_preset_bundle()` function is the main entry point for creating a SASS
# bundle for a theme preset. This calls out to the appropriate functions to
# create a bundle for a built-in theme or for a Bootswatch theme.
bs_preset_bundle <- function(preset) {
  if (!inherits(preset, "bs_preset")) return(NULL)
  if (is.null(preset$type)) return(NULL)

  switch(
    preset$type,
    bootswatch = bootswatch_bundle(preset$name, version = preset$version),
    builtin = builtin_bundle(preset$name, version = preset$version),
    stop("Unknown preset type: ", preset$type)
  )
}

theme_preset_info <- function(theme) {
  if (!is_bs_theme(theme)) return(NULL)

  info <- bs_get_variables(theme, c("bslib-preset-type", "bslib-preset-name", "bootstrap-version"))

  name <- info[["bslib-preset-name"]]
  type <- info[["bslib-preset-type"]]

  new_bs_preset(
    name = if (!is.na(name)) name else "bootstrap",
    version = info[["bootstrap-version"]],
    type = if (!is.na(type)) type
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

assert_preset_only_one_name_arg <- function(preset, bootswatch, .frame = rlang::caller_env()) {
  both_provided <- !is.null(preset) && !is.null(bootswatch)

  if (!both_provided) {
    return(invisible())
  }

  msg <- c(
    "Only one of `preset` or `bootswatch` may be provided, and `name` is preferred.",
    "i" = "Did you mean one of the following options?",
    "*" = sprintf('`preset = "%s"`', preset),
    "*" = sprintf('`preset = "%s"`', bootswatch),
    "*" = sprintf('`bootswatch = "%s"`', bootswatch)
  )
  rlang::abort(msg, .frame = .frame)
}

abort_preset_unknown_name <- function(name, version, .frame = rlang::caller_env()) {
  msg <- c(
    sprintf("'%s' is not a known preset theme name for Bootstrap version %s.", name, version),
    "i" = "You can list available preset themes:",
    "*" = sprintf("Built-in: `builtin_themes(%s)`", version),
    "*" = sprintf("Bootswatch: `bootswatch_themes(%s)`.", version)
  )
  rlang::abort(msg, .frame = .frame)
}
