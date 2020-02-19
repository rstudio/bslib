#' @export
bs_quick_theme <- function(bg = "#FFFFFF", fg = "#000000",
  accent = NULL, secondary = NULL) {

  theme <- bs_theme_get()
  if (is.null(theme)) {
    stop("No bootstraplib theme is active (did you forget to call bs_theme_new()?)")
  }

  bs4_tags <- c("bootstraplib_version_4", "bootstraplib_version_4+3")
  bs3_tags <- c("bootstraplib_version_3")

  if (any(bs4_tags %in% theme$tags)) {
    bs4_quick_theme(bg, fg, accent, secondary)
  } else if (any(bs3_tags %in% theme$tags)) {
    bs3_quick_theme(bg, fg, accent, secondary)
  } else {
    stop("bs_quick_theme doesn't recognize the active version of Bootstrap")
  }
}

bs4_quick_theme <- function(bg, fg, accent, secondary) {
  white <- htmltools:::parseCssColors(bg)
  black <- htmltools:::parseCssColors(fg)

  grays <- colorRamp(c(white, black), alpha = TRUE)(0:10/10)

  if (any(grays[,4] != 255)) {
    warning(call. = FALSE,
      "bs_quick_theme does not respect alpha in `white` and `black` arguments"
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

  grays <- as.list(grays)

  bs_theme_add_variables(!!!grays)

  if (!is.null(accent)) {
    bs_theme_add_variables(primary = accent)
  }
  if (!is.null(secondary)) {
    bs_theme_add_variables(
      secondary = secondary,
      default = secondary
    )
  }
  if (white_yiq < black_yiq) {
    # Invert yiq colors
    bs_theme_add_variables(
      "yiq-text-light" = grays[["gray-900"]],
      "yiq-text-dark" = grays[["white"]]
    )
  }

  invisible()
}

bs3_quick_theme <- function(bg, fg, accent, secondary) {
  # TODO: normalize bg and fg into #RRGGBB
  white <- htmltools:::parseCssColors(bg)
  black <- htmltools:::parseCssColors(fg)

  if (!is.null(secondary)) {
    warning(call. = FALSE,
      "bs_quick_theme's `secondary` argument is not currently supported for ",
      "Bootstrap 3"
    )
  }

  gray <- function(level = 255) {
    val <- round(colorRamp(c(black, white))(level / 255))
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

  # There's code in tools/bs3_quick_theme.R for generating this list.
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

  bs_theme_add_variables(
    !!!result_colors,
    !!!color_mapping
  )

  if (!is.null(accent)) {
    bs_theme_add_variables("brand-primary" = accent)
  }

  invisible()
}
