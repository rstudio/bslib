# ----------------------------------------------------------------------------------------
# Base colors
# ----------------------------------------------------------------------------------------

bs_base_colors <- function(theme, bg = NULL, fg = NULL) {
  assert_bs_theme(theme)
  if (is.null(bg) && is.null(fg)) return(theme)
  if (is.null(bg)) stop("Cannot specify bg without fg.")
  if (is.null(fg)) stop("Cannot specify fg without bg.")

  args <- validate_and_normalize_colors(list(bg = bg, fg = fg))
  # In some cases, bg/fg really means $body-bg/$body-color, not $white/$black
  use_body <- has_body_base_colors(theme)
  if (use_body) {
    args <- rename2(args, !!!get_base_color_map(theme))
  }

  # TODO: Bootstrap 5 will be different (no more $yiq-text-light/$yiq-text-dark)
  switch_add_variables(
    theme, args,
    four = if (use_body) identity else bs4_base_colors,
    three = if (use_body) identity else bs3_base_colors
  )
}

switch_add_variables <- function(theme, args, ...) {
  func <- switch_version(theme, ...)
  vars <- do.call(func, list(args))
  bs_add_variables(theme, !!!vars)
}

# Obtain a mapping from (to) fg/bg to (from) relevant Sass vars
get_base_color_map <- function(theme, decode = TRUE) {
  use_body <- has_body_base_colors(theme)
  vars <- switch_version(
    theme,
    three = list("body-bg", if (use_body) "text-color" else "gray-base"),
    default = if (use_body) list("body-bg", "body-color") else list("white", "black")
  )
  if (decode) {
    setNames(vars, c("bg", "fg"))
  } else {
    setNames(c("bg", "fg"), vars)
  }
}

# We've modified these "dark mode" themes to be more themable by cascading
# defaults from $body-bg/$body-color instead of $white/$black
has_body_base_colors <- function(theme) {
  body_themes <- c("darkly", "cyborg", "superhero", "slate")
  # TODO: do the same for BS3? I guess?
  isTRUE(theme_bootswatch(theme) %in% body_themes)
}

bs4_base_colors <- function(args) {
  white <- args$bg
  black <- args$fg

  grays <- grDevices::colorRamp(c(white, black), alpha = TRUE)(0:10/10)

  if (any(grays[,4] != 255)) {
    warning(call. = FALSE,
      "bs_base_colors does not respect alpha in `white` and `black` arguments"
    )
  }

  grays <- sprintf("#%02X%02X%02X",
    round(grays[,1]),
    round(grays[,2]),
    round(grays[,3])
  )

  names(grays) <- c(
    "white",
    paste0("gray-", 1:9 * 100),
    "black"
  )

  as.list(grays)
}

bs3_base_colors <- function(args) {
  white <- args$bg
  black <- args$fg

  ramp <- grDevices::colorRamp(c(black, white))
  gray <- function(level = 255) {
    val <- round(ramp(level / 255))
    sprintf("#%02X%02X%02X", val[1,1], val[1,2], val[1,3])
  }

  result_colors <- list(
    "gray-base" = gray(0x00),
    "gray-darker" = gray(0x22),
    "gray-dark" = gray(0x33),
    "gray" = gray(0x55),
    "gray-light" = gray(0x77),
    "gray-lighter" = gray(0xEE),

    "gray-44" = gray(0x44),
    "gray-88" = gray(0x88),
    "gray-99" = gray(0x99),
    "gray-cc" = gray(0xcc),
    "gray-dd" = gray(0xdd),
    "gray-e5" = gray(0xe5),
    "gray-f5" = gray(0xf5),
    "gray-f8" = gray(0xf8),
    "gray-f9" = gray(0xf9),
    "white" = gray(0xff),
    "black" = gray(0x00)
  )

  # There's code in tools/bs3_theme_base_colors.R for generating this list.
  color_mapping <- list(
    `dropdown-caret-color` = "$gray-base", `tooltip-bg` = "$gray-base",
    `modal-backdrop-bg` = "$gray-base", `close-color` = "$gray-base",
    `navbar-inverse-bg` = "$gray-darker", `btn-default-color` = "$gray-dark",
    `navbar-default-link-hover-color` = "$gray-dark", `navbar-inverse-toggle-hover-bg` = "$gray-dark",
    `navbar-inverse-toggle-border-color` = "$gray-dark", `list-group-link-heading-color` = "$gray-dark",
    `kbd-bg` = "$gray-dark", `navbar-inverse-link-disabled-color` = "$gray-44",
    `navbar-default-link-active-color` = "$gray", `list-group-link-color` = "$gray",
    `navbar-default-color` = "$gray-light", `navbar-default-link-color` = "$gray-light",
    `navbar-default-toggle-icon-bar-bg` = "$gray-88", `input-color-placeholder` = "$gray-99",
    `modal-content-fallback-border-color` = "$gray-99", `btn-default-border` = "$gray-cc",
    `input-border` = "$gray-cc", `dropdown-fallback-border` = "$gray-cc",
    `navbar-default-link-disabled-color` = "$gray-cc", `popover-fallback-border-color` = "$gray-cc",
    `breadcrumb-color` = "$gray-cc", `pre-border-color` = "$gray-cc",
    `table-border-color` = "$gray-dd", `navbar-default-toggle-hover-bg` = "$gray-dd",
    `navbar-default-toggle-border-color` = "$gray-dd", `nav-tabs-border-color` = "$gray-dd",
    `nav-tabs-active-link-hover-border-color` = "$gray-dd", `nav-tabs-justified-link-border-color` = "$gray-dd",
    `pagination-border` = "$gray-dd", `pagination-hover-border` = "$gray-dd",
    `pagination-disabled-border` = "$gray-dd", `list-group-border` = "$gray-dd",
    `panel-inner-border` = "$gray-dd", `panel-default-border` = "$gray-dd",
    `thumbnail-border` = "$gray-dd", `legend-border-color` = "$gray-e5",
    `dropdown-divider-bg` = "$gray-e5", `modal-header-border-color` = "$gray-e5",
    `table-bg-hover` = "$gray-f5", `dropdown-link-hover-bg` = "$gray-f5",
    `progress-bg` = "$gray-f5", `list-group-hover-bg` = "$gray-f5",
    `panel-footer-bg` = "$gray-f5", `panel-default-heading-bg` = "$gray-f5",
    `well-bg` = "$gray-f5", `breadcrumb-bg` = "$gray-f5", `code-bg` = "$gray-f5",
    `pre-bg` = "$gray-f5", `navbar-default-bg` = "$gray-f8",
    `table-bg-accent` = "$gray-f9", `body-bg` = "$white", `btn-default-bg` = "$white",
    `btn-primary-color` = "$white", `btn-success-color` = "$white",
    `btn-info-color` = "$white", `btn-warning-color` = "$white",
    `btn-danger-color` = "$white", `input-bg` = "$white", `dropdown-bg` = "$white",
    `navbar-inverse-link-hover-color` = "$white", `navbar-inverse-brand-hover-color` = "$white",
    `navbar-inverse-toggle-icon-bar-bg` = "$white", `pagination-bg` = "$white",
    `pagination-active-color` = "$white", `pagination-disabled-bg` = "$white",
    `tooltip-color` = "$white", `popover-bg` = "$white", `label-color` = "$white",
    `label-link-hover-color` = "$white", `modal-content-bg` = "$white",
    `progress-bar-color` = "$white", `list-group-bg` = "$white",
    `panel-bg` = "$white", `panel-primary-text` = "$white", `badge-color` = "$white",
    `badge-link-hover-color` = "$white", `badge-active-bg` = "$white",
    `carousel-control-color` = "$white", `carousel-indicator-active-bg` = "$white",
    `carousel-indicator-border-color` = "$white", `carousel-caption-color` = "$white",
    `close-text-shadow` = "$white", `kbd-color` = "$white"
  )

  results <- c(result_colors, color_mapping)

  results
}

# ----------------------------------------------------------------------------------------
# Accent colors
# ----------------------------------------------------------------------------------------

bs_accent_colors <- function(theme, primary = NULL, secondary = NULL,
                             success = NULL, info = NULL, warning = NULL, danger = NULL) {
  assert_bs_theme(theme)

  args <- validate_and_normalize_colors(
    list(
      primary = primary, secondary = secondary, success = success,
      info = info, warning = warning, danger = danger
    )
  )

  switch_add_variables(
    theme, args, three = bs3_accent_colors, default = identity
  )
}


bs3_accent_colors <- function(args) {
  # Warns and filters out unsupported arguments
  supported <- c("primary", "success", "info", "warning", "danger")

  args <- retain_known_vars("Bootstrap 3", "accent color", supported, args)

  # Bootstrap 3 uses brand-primary, brand-danger, etc. as var names
  if (length(args) > 0) {
    names(args) <- paste0("brand-", names(args))
  }

  args
}

# ----------------------------------------------------------------------------------------
# Fonts
# ----------------------------------------------------------------------------------------

bs_fonts <- function(theme, base = NULL, code = NULL, heading = NULL) {
  assert_bs_theme(theme)
  args <- dropNulls(list(
    base = base,
    code = code,
    heading = heading
  ))
  args <- lapply(args, as_font_collection)
  switch_add_variables(theme, args, three = bs3_fonts, default = bs4_fonts)
}

as_font_collection <- function(x) {
  if (sass::is_font_collection(x)) {
    return(x)
  }
  do.call(sass::font_collection, as.list(x))
}


bs4_fonts <- function(args) {
  name_map <- c(
    base = "font-family-base",
    code = "font-family-monospace",
    heading = "headings-font-family",
    # TODO: we don't have a input_font...should we?
    input = "input-btn-font-family"
  )

  names(args) <- name_map[names(args)]
  args
}

bs3_fonts <- function(args) {
  name_map <- c(
    base = "font-family-base",
    code = "font-family-monospace",
    heading = "headings-font-family"
  )

  args <- retain_known_vars("Bootstrap 3", "font", names(name_map), args)

  names(args) <- name_map[names(args)]
  args
}

#' Ensures all arguments are either NULL, or length 1 character vectors with
#' valid CSS color strings; returned is a list with no NULLs and normalized
#' color strings
#' @param args A named list
#' @noRd
validate_and_normalize_colors <- function(args) {
  args <- dropNulls(args)
  if (length(args) == 0) return(args)

  is_char <- vapply(args, is.character, logical(1))
  vec_len <- vapply(args, length, integer(1))
  bad <- !is_char | vec_len != 1
  if (any(bad)) {
    stop(call. = FALSE,
      "Invalid HTML color strings for argument(s) ",
      format_varnames(names(args)[bad]),
      "; single-element character vectors are required")
  }
  args <- lapply(args, htmltools::parseCssColors, mustWork = FALSE)
  bad <- vapply(args, rlang::is_na, logical(1))
  if (any(bad)) {
    stop(
      "Invalid HTML color strings for argument(s) ",
      format_varnames(names(args)[bad]), call. = FALSE
    )
  }
  args
}


#' Remove unsupported arguments, with a nicely formatted warning
#'
#' @param caller_name String naming the calling function; used for error
#'   messages
#' @param arg_name A name for the group of variables (e.g., accent, font); used for error messages
#' @param supported_vars Character vector of known names
#' @param args List of args
#' @return List with unsupported vars removed, possibly warning in the process
#' @noRd
retain_known_vars <- function(caller_name, arg_name = "", supported_vars, args) {
  argnames <- names(args)
  unknown_idx <- !argnames %in% supported_vars

  if (any(unknown_idx)) {
    warning(call. = FALSE,
      caller_name, " doesn't support the following ",
      arg_name, if (nzchar(arg_name)) " ",
      "argument(s), they will be ignored: ",
      format_varnames(argnames[unknown_idx])
    )
  }

  args[!unknown_idx]
}

# Format a vector of variable names
format_varnames <- function(varnames, quot = "`", delim = ", ") {
  between <- paste0(quot, delim, quot)

  paste0(
    quot,
    paste(collapse = between, varnames),
    quot
  )
}
