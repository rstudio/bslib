# ----------------------------------------------------------------------------------------
# Base colors
# ----------------------------------------------------------------------------------------

bs_base_colors <- function(theme = bs_theme(), bg = NULL, fg = NULL) {
  theme <- assert_bs_theme(theme)
  if (is.null(bg) && is.null(fg)) {
    return(theme)
  }
  if (is.null(bg)) stop("Cannot specify bg without fg.")
  if (is.null(fg)) stop("Cannot specify fg without bg.")
  args <- list(bg = bg, fg = fg)
  args <- validate_and_normalize_colors(args)
  funcs <- list(
    "4+3" = bs4_base_colors,
    "4" = bs4_base_colors,
    "3" = bs3_base_colors
  )
  dispatch_theme_modifier(theme, funcs, args, "bs_base_colors")
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

# ----------------------------------------------------------------------------------------
# Accent colors
# ----------------------------------------------------------------------------------------

bs_accent_colors <- function(theme = bs_theme(), primary = NULL, secondary = NULL,
                             success = NULL, info = NULL, warning = NULL, danger = NULL) {
  theme <- assert_bs_theme(theme)

  args <- validate_and_normalize_colors(
    list(
      primary = primary, secondary = secondary, success = success,
      info = info, warning = warning, danger = danger
    )
  )

  funcs <- list(
    "4+3" = bs43_accent_colors,
    "4" = identity,
    "3" = bs3_accent_colors
  )

  dispatch_theme_modifier(theme, funcs, args, "bs_accent_colors")
}


bs43_accent_colors <- function(args) {
  if (!is.null(args$secondary)) {
    args$default <- args$secondary
  }
  args
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

bs_fonts <- function(theme = bs_theme(), base = NULL, code = NULL, heading = NULL) {
  theme <- assert_bs_theme(theme)

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

  funcs <- list(
    "4+3" = bs4_fonts,
    "4" = bs4_fonts,
    "3" = bs3_fonts
  )

  dispatch_theme_modifier(theme, funcs, args, "bs_fonts")
}


bs4_fonts <- function(args) {
  name_map <- c(
    base = "font-family-base",
    code = "font-family-monospace",
    heading = "headings-font-family",
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

#' @param caller_name String naming the calling function; used for error
#'   messages
#' @param funcs_by_version List of functions, where the names are Bootstrap
#'   version strings (see theme_version()), and values are functions. These
#'   functions must take a single argument: a named list, which represents the
#'   arguments passed by the user; and return a list of variables to set as
#'   defaults.
#' @noRd
dispatch_theme_modifier <- function(theme, funcs_by_version, args, caller_name) {
  theme <- assert_bs_theme(theme)

  results <- NULL
  for (version in names(funcs_by_version)) {
    if (version %in% theme_version(theme)) {
      results <- do.call(funcs_by_version[[version]], list(args))
      break
    }
  }

  if (is.null(results)) {
    stop(call. = FALSE,
      caller_name, " doesn't recognize the active version of Bootstrap (",
      paste(collapse = "/", theme_version()), ")")
  }

  results <- sass::sass_layer(
    lapply(dropNulls(results), paste, "!default")
  )

  bs_add_layers(theme, results)
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
