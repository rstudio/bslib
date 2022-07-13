#' A card for displaying a summary of information
#'
#' @param ... arguments passed along to [card()].
#' @param icon an icon like [shiny::icon()].
#' @param icon_layout where to display the icon (relative to the summary information).
#' @param class utility classes for customizing the appearance of the summary card. Use `bg-*` and `text-*` classes (e.g, `"bg-danger"` and `"text-light"`) to customize the background/foreground colors.
#' @param opacity amount of opacity (between 0 and 1) to apply to the background color.
#' @param width,height Any valid CSS unit; for example, height="100%".
#' @export
#' @examples
#'
#' card_summary(
#'   "KPI Title",
#'   card_title("KPI Output"),
#'   span(icon("arrow-down"), " 30% VS PREVIOUS 30 DAYS"),
#'   icon = icon("fire-alt")
#' )
card_summary <- function(..., icon = NULL, icon_layout = c("top-right", "left-center"), class = NULL, width = NULL, height = NULL, color = NULL) {

  icon_layout <- match.arg(icon_layout)

  div(
    class = c(
      "card bslib-card-summary-container bg-primary",
      paste0("icon-", icon_layout),
      class
    ),
    style = css(height = height, width = width),
    if (!is.null(icon)) div(class = "card-summary-icon border-end", icon),
    card(class = "bslib-card-summary", ...)
  )
}
