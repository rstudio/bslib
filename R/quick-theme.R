#' Customize the Bootstrap theme based on two to four key colors
#'
#' `bs_theme_base_colors` generates a complete Bootstrap theme from just a small
#' handful of user-specified colors: a background color, a foreground color, and
#' optionally, primary and secondary accent colors.
#'
#' @param bg A color string for the background, in any format
#'   [htmltools::parseCssColors()] can understand.
#' @param fg A color string for the background.
#' @param accent A color string for the accent color; if not `NULL`, this will
#'   be assigned to the `$primary` (BS4) or `$brand-primary` (BS3) Sass
#'   variables.
#' @param secondary A color string for the secondary color; if not `NULL`, this
#'   will be assigned to the `$secondary` and `$default` Bootstrap 4 Sass
#'   variables. (This argument is not currently supported for Bootstrap 3.)
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
#' `$black` to the `fg` color, and interpolates the grays between them. If
#' provided, the `accent` argument is used to set the `$primary` variable, and
#' the `secondary` argument is used to set `$secondary` and `$default`
#' variables.
#'
#' For Bootstrap 3, a similar set of `$black`, `$white`, and `$gray-darker`
#' through `$gray-lighter` variables exist, and these are populated using the
#' same strategy as with Bootstrap 4. However, unlike Bootstrap 4, in Bootstrap
#' 3 many of the default colors are hard-coded hex colors, that also happen to
#' be shades of gray. `bs_theme_base_colors` overrides these hard-coded values
#' with colors interpolated between `bg` and `fg`.
#'
#' @examples
#'
#' bs_theme_new("4+3")
#' bs_theme_base_colors(bg = "#000060", fg = "skyblue",
#'   accent = "orange", secondary = "silver")
#'
#' # You can apply further customizations here if desired, e.g.:
#' bs_theme_add_variables("success" = "#1D7732")
#'
#' if (interactive()) {
#'   bs_theme_preview()
#' }
#'
#' @export
bs_theme_base_colors <- function(bg = "#FFFFFF", fg = "#000000",
  accent = NULL, secondary = NULL) {

  theme <- bs_theme_get()
  if (is.null(theme)) {
    stop("No bootstraplib theme is active (did you forget to call bs_theme_new()?)")
  }

  results <- if (any(c("4", "4+3") %in% theme_version())) {
    bs4_theme_base_colors(bg, fg, accent, secondary)
  } else if ("3" %in% theme_version()) {
    bs3_theme_base_colors(bg, fg, accent, secondary)
  } else {
    stop("bs_theme_base_colors doesn't recognize the active version of Bootstrap")
  }
  bs_theme_add(results)
}

bs4_theme_base_colors <- function(bg, fg, accent, secondary) {
  white <- htmltools:::parseCssColors(bg)
  black <- htmltools:::parseCssColors(fg)

  grays <- colorRamp(c(white, black), alpha = TRUE)(0:10/10)

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

  if (!is.null(accent)) {
    results <- c(results, list(primary = accent))
  }
  if (!is.null(secondary)) {
    results <- c(results, list(
      secondary = secondary,
      default = secondary
    ))
  }
  if (white_yiq < black_yiq) {
    # Invert yiq colors
    results <- c(results, list(
      "yiq-text-light" = grays[["gray-900"]],
      "yiq-text-dark" = grays[["white"]]
    ))
  }

  results <- lapply(results, paste, "!default")

  sass::sass_layer(results)
}

bs3_theme_base_colors <- function(bg, fg, accent, secondary) {
  white <- htmltools:::parseCssColors(bg)
  black <- htmltools:::parseCssColors(fg)

  if (!is.null(secondary)) {
    warning(call. = FALSE,
      "bs_theme_base_colors's `secondary` argument is not currently supported for ",
      "Bootstrap 3"
    )
  }

  ramp <- colorRamp(c(black, white))
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

  if (!is.null(accent)) {
    results <- c(results, list("brand-primary" = accent))
  }

  results <- lapply(results, paste, "!default")

  sass::sass_layer(results)
}
