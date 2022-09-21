#' A card for displaying a summary of information
#'
#' @param title a [htmltools::tag()] child to display above `value`.
#' @param value a [htmltools::tag()] child to display below `title`.
#' @param ... Unnamed arguments may be any [htmltools::tag()] children
#'   to display below `value` (if these children are not already
#'   [is.card_item()], then they are wrapped in a [card_body()]).
#'   Named arguments become attributes on the containing element.
#' @param showcase a [htmltools::tag()] child to showcase (e.g., a
#'   [bsicons::bs_icon()], a [plotly::plotlyOutput()], etc).
#' @param showcase_layout where to display the showcase relative to the other
#'   content.
#' @param class utility classes for customizing the appearance of the summary
#'   card. Use `bg-*` and `text-*` classes (e.g, `"bg-danger"` and
#'   `"text-light"`) to customize the background/foreground colors.
#' @inheritParams card
#' @export
#' @examples
#'
#' value_box(
#'   "KPI Title",
#'   HTML("$1 <i>Billion</i> Dollars"),
#'   span(
#'     bsicons::bs_icon("arrow-up"),
#'     " 30% VS PREVIOUS 30 DAYS"
#'    ),
#'   showcase = bsicons::bs_icon("piggy-bank"),
#'   class = "bg-success"
#' )
value_box <- function(title, value, ..., showcase = NULL, showcase_layout = c("top-right", "left-center"), full_screen = FALSE, class = NULL) {
  showcase_layout <- match.arg(showcase_layout)

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attribs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  tag <- div(
    class = c(
      "card bslib-value-box-container vfill-item bg-primary",
      paste0("showcase-", showcase_layout),
      class
    ),
    !!!attribs,
    if (!is.null(showcase)) div(class = "value-box-showcase border-end", showcase),
    card(
      class = "bslib-value-box",
      # color:unset so that the color inherits from bg-* on the parent
      # (not the h3/h6 rules set by bootstrap core)
      tags$h6(title, class = "mb-1", style = css(color = "unset")),
      tags$h3(value, class = "mb-2", style = css(color = "unset")),
      !!!children,
      full_screen = full_screen
    )
  )

  tag <- tag_require(
    tag, version = 5, caller = "value_box()"
  )

  as_fragment(tag)
}
