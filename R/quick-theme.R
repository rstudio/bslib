#' @export
bs_quick_theme <- function(bg = "#FFFFFF", fg = "#000000",
  accent = NULL, secondary = NULL) {

  theme <- bs_theme_get()
  if (is.null(theme)) {
    stop(
      "No bootstraplib theme is active (did you forget to call bs_theme_new()?)")
  }

  valid_themes <- c("bootstraplib_version_4", "bootstraplib_version_4+3")
  if (!any(valid_themes %in% theme$tags)) {
    stop("Sorry, bs_quick_theme requires Bootstrap 4 (see ?bs_theme_new to specify version)")
  }

  white <- shiny:::parseCssColor(bg)
  black <- shiny:::parseCssColor(fg)

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
