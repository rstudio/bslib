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
    sprintf("#%02X%02X%02X !default", val[1,1], val[1,2], val[1,3])
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
  color_mapping <- list(
    `dropdown-caret-color` = "$gray-base !default", `tooltip-bg` = "$gray-base !default",
    `modal-backdrop-bg` = "$gray-base !default", `close-color` = "$gray-base !default",
    `navbar-inverse-bg` = "$gray-darker !default", `btn-default-color` = "$gray-dark !default",
    `navbar-default-link-hover-color` = "$gray-dark !default",
    `navbar-inverse-toggle-hover-bg` = "$gray-dark !default",
    `navbar-inverse-toggle-border-color` = "$gray-dark !default",
    `list-group-link-heading-color` = "$gray-dark !default",
    `kbd-bg` = "$gray-dark !default", `navbar-inverse-link-disabled-color` = "$gray-44 !default",
    `navbar-default-link-active-color` = "$gray !default", `list-group-link-color` = "$gray !default",
    `navbar-default-color` = "$gray-light !default", `navbar-default-link-color` = "$gray-light !default",
    `navbar-default-toggle-icon-bar-bg` = "$gray-88 !default",
    `input-color-placeholder` = "$gray-99 !default", `modal-content-fallback-border-color` = "$gray-99 !default",
    `btn-default-border` = "$gray-cc !default", `input-border` = "$gray-cc !default",
    `dropdown-fallback-border` = "$gray-cc !default", `navbar-default-link-disabled-color` = "$gray-cc !default",
    `popover-fallback-border-color` = "$gray-cc !default", `breadcrumb-color` = "$gray-cc !default",
    `pre-border-color` = "$gray-cc !default", `table-border-color` = "$gray-dd !default",
    `navbar-default-toggle-hover-bg` = "$gray-dd !default", `navbar-default-toggle-border-color` = "$gray-dd !default",
    `nav-tabs-border-color` = "$gray-dd !default", `nav-tabs-active-link-hover-border-color` = "$gray-dd !default",
    `nav-tabs-justified-link-border-color` = "$gray-dd !default",
    `pagination-border` = "$gray-dd !default", `pagination-hover-border` = "$gray-dd !default",
    `pagination-disabled-border` = "$gray-dd !default", `list-group-border` = "$gray-dd !default",
    `panel-inner-border` = "$gray-dd !default", `panel-default-border` = "$gray-dd !default",
    `thumbnail-border` = "$gray-dd !default", `legend-border-color` = "$gray-e5 !default",
    `dropdown-divider-bg` = "$gray-e5 !default", `modal-header-border-color` = "$gray-e5 !default",
    `table-bg-hover` = "$gray-f5 !default", `dropdown-link-hover-bg` = "$gray-f5 !default",
    `progress-bg` = "$gray-f5 !default", `list-group-hover-bg` = "$gray-f5 !default",
    `panel-footer-bg` = "$gray-f5 !default", `panel-default-heading-bg` = "$gray-f5 !default",
    `well-bg` = "$gray-f5 !default", `breadcrumb-bg` = "$gray-f5 !default",
    `pre-bg` = "$gray-f5 !default", `navbar-default-bg` = "$gray-f8 !default",
    `table-bg-accent` = "$gray-f9 !default", `body-bg` = "$white !default",
    `component-active-color` = "$white !default", `btn-default-bg` = "$white !default",
    `btn-primary-color` = "$white !default", `btn-success-color` = "$white !default",
    `btn-info-color` = "$white !default", `btn-warning-color` = "$white !default",
    `btn-danger-color` = "$white !default", `input-bg` = "$white !default",
    `dropdown-bg` = "$white !default", `navbar-inverse-link-hover-color` = "$white !default",
    `navbar-inverse-brand-hover-color` = "$white !default", `navbar-inverse-toggle-icon-bar-bg` = "$white !default",
    `pagination-bg` = "$white !default", `pagination-active-color` = "$white !default",
    `pagination-disabled-bg` = "$white !default", `tooltip-color` = "$white !default",
    `popover-bg` = "$white !default", `label-color` = "$white !default",
    `label-link-hover-color` = "$white !default", `modal-content-bg` = "$white !default",
    `progress-bar-color` = "$white !default", `list-group-bg` = "$white !default",
    `panel-bg` = "$white !default", `panel-primary-text` = "$white !default",
    `badge-color` = "$white !default", `badge-link-hover-color` = "$white !default",
    `badge-active-bg` = "$white !default", `carousel-control-color` = "$white !default",
    `carousel-indicator-active-bg` = "$white !default", `carousel-indicator-border-color` = "$white !default",
    `carousel-caption-color` = "$white !default", `close-text-shadow` = "$white !default",
    `kbd-color` = "$white !default"
  )

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

  args <- retain_known_vars("Bootstrap 3", "accent color", supported, args)

  # Bootstrap 3 uses brand-primary, brand-danger, etc. as var names
  if (length(args) > 0) {
    names(args) <- paste0("brand-", names(args))
  }

  args
}

#' Customize Bootstrap typefaces
#'
#' Set the typefaces used by Bootstrap for various purposes. Each argument
#' can be `NULL` (no change), or a character vector of one or more elements.
#'
#' Each argument is a character vector, and each element of that vector can a
#' single unquoted font family name, a single quoted font family name, or a
#' comma-separated list of font families (with individual font family names
#' quoted as necessary).
#'
#' For example, each example below is valid:
#'
#' ```
#' # Single, unquoted
#' bs_theme_fonts(base = "Source Sans Pro")
#'
#' # Single, quoted
#' bs_theme_fonts(base = "'Source Sans Pro'")
#'
#' # Multiple, quoted
#' bs_theme_fonts(base = "'Source Sans Pro', sans-serif")
#'
#' # Combining all of the above
#' bs_theme_fonts(base = c("Open Sans", "'Source Sans Pro'",
#'   "'Helvetica Neue', Helvetica, sans-serif"))
#' ```
#'
#' But the following is _technically_ not valid:
#'
#' ```
#' # Incorrect--because multiple font families are being
#' # provided in a single string, names with spaces must
#' # be surrounded by quotes!
#' bs_theme_fonts(base = "Source Sans Pro, sans-serif")
#' ```
#'
#' The resulting CSS will contain `font-family: Source Sans Pro, sans-serif;`
#' which is technically out of spec, but in fact is likely to still work with
#' most browsers.
#'
#' @param base The default typeface.
#' @param code The typeface to be used for code. Be sure this is monospace!
#' @param heading The typeface to be used for heading elements.
#' @family customizations
#' @examples
#'
#' bs_theme_new()
#' bs_theme_fonts(
#'   base = "Times",
#'   code = c("Courier", "monospace"),
#'   heading = "'Helvetica Neue', Helvetica, sans-serif"
#' )
#'
#' if (interactive()) {
#'   bs_theme_preview(with_themer = FALSE)
#' }
#'
#' @export
bs_theme_fonts <- function(base = NULL, code = NULL, heading = NULL) {

  args <- list(
    base = base,
    code = code,
    heading = heading
  )

  mapply(function(name, value) {
    if (is.null(value)) {
      return()
    }
    if (!is.character(value)) {
      stop(call. = FALSE,
        "Invalid ", format_varnames(name), " argument to bs_theme_fonts(): must be character vector")
    }
    if (anyNA(value) || any(!nzchar(value))) {
      stop(call. = FALSE,
        "Invalid ", format_varnames(name), " argument to bs_theme_fonts(): must be character vector")
    }
  }, names(args), args)

  args <- lapply(args, quote_css_font_families)

  dispatch_theme_setter("bs_theme_fonts", list(
    "4+3" = bs4_theme_fonts,
    "4" = bs4_theme_fonts,
    "3" = bs3_theme_fonts
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

  args <- retain_known_vars("Bootstrap 3", "font", names(name_map), args)

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

quote_css_font_families <- function(str) {
  # This is pretty quick and dirty. I'd much prefer to do a full parse and I
  # generally hate using heuristics to decide on matters of encoding, but
  # both completely unquoted and fully quoted cases will be so common.

  if (is.null(str)) {
    return(NULL)
  }

  # Are there non-alpha, non-dash characters? If so, we may need to quote...
  needs_quote <- grepl("[^A-Za-z\\-]", str, perl = TRUE)
  # ...but don't quote if there's even a hit of quoting, or that an element
  # might contain multiple font families already. We explicitly want to
  # allow things like:
  # c("Source Sans Pro", "-apple-system, BlinkMacSystemFont, \"Segoe UI\""),
  # where the first element would be quoted but not the second. Of course this
  # would be a problem if a single font family's name contained a quote, comma,
  # or backslash, but that seems very unlikely.
  is_quoted <- grepl("[,'\"\\\\]", str, perl = TRUE)

  str <- ifelse(needs_quote & !is_quoted,
    paste0("'", str, "'"),
    str
  )

  paste(str, collapse = ", ")
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
