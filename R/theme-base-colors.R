#' Customize the Bootstrap theme based on two to four key colors
#'
#' `bs_theme_base_colors` uses a background color and a foreground color to
#' rewrite the basic palette of the current Bootstrap theme, affecting almost
#' every built-in Bootstrap component.
#'
#' @param bg A color string for the background, in any format
#'   [htmltools::parseCssColors()] can understand.
#' @param fg A color string for the background.
#'
#' @section Implementation notes:
#'
#' `bs_theme_base_colors` supports both Bootstrap 3 and 4 (and 4+3), but the
#' implementation differs greatly.
#'
#' For Bootstrap 4, the vast majority of default colors are directly or
#' indirectly based on the `$black`, `$white`, and `$gray-100` through
#' `$gray-900` variables; or on the theme colors (primary, secondary, danger,
#' warning, info, etc.). `bs_theme_base_colors` sets `$white` to the `bg` color,
#' `$black` to the `fg` color, and interpolates the grays between them.
#'
#' For Bootstrap 3, a similar set of `$black`, `$white`, and `$gray-darker`
#' through `$gray-lighter` variables exist, and these are populated using the
#' same strategy as with Bootstrap 4. However, unlike Bootstrap 4, in Bootstrap
#' 3 many of the default colors are hard-coded hex colors, that also happen to
#' be shades of gray. `bs_theme_base_colors` overrides these hard-coded values
#' with colors interpolated between `bg` and `fg`.
#'
#' @family customizations
#'
#' @examples
#'
#' bs_theme_new("4+3")
#' bs_theme_base_colors(bg = "#000060", fg = "skyblue")
#'
#' # You can apply further customizations here if desired, e.g.:
#' bs_theme_accent_colors(primary = "orange", secondary = "silver")
#'
#' if (interactive()) {
#'   bs_theme_preview(with_themer = FALSE)
#' }
#'
#' @export
bs_theme_base_colors <- function(bg = "#FFFFFF", fg = "#000000") {
  if (is.null(bg)) {
    stop("`bg` argument must not be NULL")
  }
  if (is.null(fg)) {
    stop("`fg` argument must not be NULL")
  }

  args <- list(bg = bg, fg = fg)
  args <- validate_and_normalize_colors(args)

  dispatch_theme_setter("bs_theme_base_colors", list(
    "4+3" = bs4_theme_base_colors,
    "4" = bs4_theme_base_colors,
    "3" = bs3_theme_base_colors), args)
}

bs4_theme_base_colors <- function(args) {
  white <- args$bg
  black <- args$fg

  grays <- grDevices::colorRamp(c(white, black), alpha = TRUE)(0:10/10)

  if (any(grays[,4] != 255)) {
    warning(call. = FALSE,
      "bs_theme_base_colors does not respect alpha in `white` and `black` arguments"
    )
  }

  white_yiq <- color_yiq(grays[1,1], grays[1,2], grays[1,3])
  black_yiq <- color_yiq(grays[11,1], grays[11,2], grays[11,3])

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

  results <- as.list(grays)

  if (white_yiq < black_yiq) {
    # Invert yiq colors
    results <- c(results, list(
      "yiq-text-light" = grays[["gray-900"]],
      "yiq-text-dark" = grays[["white"]]
    ))
  }

  results
}

bs3_theme_base_colors <- function(args) {
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
    "white" = gray(0xff)
  )

  # There's code in tools/bs3_theme_base_colors.R for generating this list.
  color_mapping <- list(`dropdown-caret-color` = "$gray-base", `tooltip-bg` = "$gray-base",
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
    `well-bg` = "$gray-f5", `breadcrumb-bg` = "$gray-f5", `pre-bg` = "$gray-f5",
    `navbar-default-bg` = "$gray-f8", `table-bg-accent` = "$gray-f9",
    `body-bg` = "$white", `component-active-color` = "$white",
    `btn-default-bg` = "$white", `btn-primary-color` = "$white",
    `btn-success-color` = "$white", `btn-info-color` = "$white",
    `btn-warning-color` = "$white", `btn-danger-color` = "$white",
    `input-bg` = "$white", `dropdown-bg` = "$white", `navbar-inverse-link-hover-color` = "$white",
    `navbar-inverse-brand-hover-color` = "$white", `navbar-inverse-toggle-icon-bar-bg` = "$white",
    `pagination-bg` = "$white", `pagination-active-color` = "$white",
    `pagination-disabled-bg` = "$white", `tooltip-color` = "$white",
    `popover-bg` = "$white", `label-color` = "$white", `label-link-hover-color` = "$white",
    `modal-content-bg` = "$white", `progress-bar-color` = "$white",
    `list-group-bg` = "$white", `panel-bg` = "$white", `panel-primary-text` = "$white",
    `badge-color` = "$white", `badge-link-hover-color` = "$white",
    `badge-active-bg` = "$white", `carousel-control-color` = "$white",
    `carousel-indicator-active-bg` = "$white", `carousel-indicator-border-color` = "$white",
    `carousel-caption-color` = "$white", `close-text-shadow` = "$white",
    `kbd-color` = "$white")

  results <- c(result_colors, color_mapping)

  results
}

#' Customize Bootstrap accent colors
#'
#' Set accent colors (referred to as "brand" colors in the Bootstrap 3 docs, and
#' "theme" colors in the Bootstrap 4 docs) for the current Bootstrap theme.
#' Values must be `NULL` or a color string in a format
#' [htmltools::parseCssColors()] can understand.
#'
#' @param primary A color to be used for hyperlinks, to indicate primary/default
#'   actions, and to show active selection state in some Bootstrap components.
#'   Generally a bold, saturated color that contrasts with the theme's base
#'   colors.
#' @param secondary A color for components and messages that don't need to stand
#'   out. (Not supported in Bootstrap 3.)
#' @param success A color for messages that indicate an operation has succeeded.
#'   Typically green.
#' @param info A color for messages that are informative but not critical. Typically a
#'   shade of blue-green.
#' @param warning A color for warning messages. Typically yellow.
#' @param danger A color for errors. Typically red.
#'
#' @family customizations
#'
#' @examples
#' bs_theme_new("4+3")
#' bs_theme_accent_colors(primary = "maroon", secondary = "gray")
#' if (interactive()) {
#'   bs_theme_preview(with_themer = FALSE)
#' }
#'
#' @export
bs_theme_accent_colors <- function(primary = NULL, secondary = NULL,
  success = NULL, info = NULL, warning = NULL, danger = NULL) {

  args <- list(primary = primary, secondary = secondary, success = success,
    info = info, warning = warning, danger = danger
  )
  args <- validate_and_normalize_colors(args)

  dispatch_theme_setter("bs_theme_accent_colors", list(
    "4+3" = bs43_theme_accent_colors,
    "4" = identity,
    "3" = bs3_theme_accent_colors
  ), args)
}

bs43_theme_accent_colors <- function(args) {
  if (!is.null(args$secondary)) {
    args$default <- args$secondary
  }
  args
}

bs3_theme_accent_colors <- function(args) {
  # Warns and filters out unsupported arguments
  supported <- c("primary", "success", "info", "warning", "danger")
  matches <- match(names(args), supported)
  bad_names <- names(args)[is.na(matches)]
  if (length(bad_names) > 0) {
    warning(call. = FALSE, "Bootstrap 3 doesn't support the following accent ",
      "color argument(s), they will be ignored: ", format_varnames(bad_names)
    )
  }
  args <- args[!is.na(matches)]

  # Bootstrap 3 uses brand-primary, brand-danger, etc. as var names
  if (length(args) > 0) {
    names(args) <- paste0("brand-", names(args))
  }

  args
}


#' @export
bs_theme_fonts <- function(base = NULL, code = NULL, heading = NULL,
  input = NULL) {

  args <- list(
    base = base,
    code = code,
    heading = heading,
    input = input
  )

  dispatch_theme_setter("bs_theme_fonts", list(
    "4+3" = bs4_theme_fonts,
    "4" = bs4_theme_fonts
  ), args)
}

bs4_theme_fonts <- function(args) {
  name_map <- c(
    base = "font-family-base",
    code = "font-family-monospace",
    heading = "headings-font-family",
    input = "input-btn-font-family"
  )

  names(args) <- name_map[names(args)]
  args
}

bs3_theme_fonts <- function(args) {
  name_map <- c(
    base = "font-family-base",
    code = "font-family-monospace",
    heading = "headings-font-family"
  )

  matches <- match(names(args), names(name_map))
  bad_names <- names(args)[is.na(matches)]
  if (length(bad_names) > 0) {
    warning(call. = FALSE, "Bootstrap 3 doesn't support the following font ",
      "argument(s), they will be ignored: ", format_varnames(bad_names)
    )
  }
  args <- args[!is.na(matches)]

  names(args) <- name_map[names(args)]
  args
}

#' @param caller_name String naming the calling function; used for error
#'   messages
#' @param funcs_by_version List of functions, where the names are Bootstrap
#'   version strings (see theme_version()), and values are functions. These
#'   functions must take a single argument: a named list, which represents the
#'   arguments passed by the user; and return a list of variables to set as
#'   defaults.
#' @noRd
dispatch_theme_setter <- function(caller_name, funcs_by_version, args) {
  theme <- bs_theme_get()
  if (is.null(theme)) {
    stop(call. = FALSE,
      "No bootstraplib theme is active; did you forget to call bs_theme_new()?")
  }

  results <- NULL
  for (version in names(funcs_by_version)) {
    if (version %in% theme_version()) {
      results <- do.call(funcs_by_version[[version]], list(args))
      break
    }
  }

  if (is.null(results)) {
    stop(call. = FALSE,
      caller_name, " doesn't recognize the active version of Bootstrap (",
      paste(collapse = "/", theme_version()), ")")
  }

  results <- dropNulls(results)
  results <- lapply(results, paste, "!default")
  results <- sass::sass_layer(results)

  bs_theme_add(results)
}

#' Ensures all arguments are either NULL, or length 1 character vectors with
#' valid CSS color strings; returned is a list with no NULLs and normalized
#' color strings
#' @param args A named list
#' @noRd
validate_and_normalize_colors <- function(args) {
  args <- dropNulls(args)

  is_char <- vapply(args, is.character, logical(1))
  vec_len <- vapply(args, length, integer(1))
  bad <- !is_char | vec_len != 1
  if (any(bad)) {
    stop(call. = FALSE,
      "Invalid HTML color strings for argument(s) ",
      format_varnames(names(args)[bad]),
      "; single-element character vectors are required")
  }
  normalized_values <- htmltools::parseCssColors(args, mustWork = FALSE)
  if (anyNA(normalized_values)) {
    stop(call. = FALSE,
      "Invalid HTML color strings for argument(s) ",
      format_varnames(names(args)[is.na(normalized_values)])
    )
  }
  args[] <- normalized_values
  args
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
