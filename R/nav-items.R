#' Navigation items
#'
#' Create nav item(s) for use inside nav containers (e.g., [navs_tab()],
#' [navs_bar()], etc).
#'
#' @param title A title to display. Can be a character string or UI elements
#'   (i.e., [tags]).
#' @param ... Depends on the function:
#'   * For `nav()` and `nav_content()`: UI elements (i.e., [tags]) to display
#'     when the item is active.
#'   * For `nav_menu()`: a collection of nav items (e.g., `nav()`, `nav_item()`).
#'   * For `nav_item()`: UI elements (i.e., [tags]) to place directly in
#'     the navigation panel (e.g., search forms, links to external content, etc).
#' @param value A character string to assign to the nav item. This value may be
#'   supplied to the relevant container's `selected` argument in order to show
#'   particular nav item's content immediately on page load. This value is also
#'   useful for programmatically updating the selected content via
#'   [nav_select()], [nav_hide()], etc (updating selected tabs this way is often
#'   useful for showing/hiding panels of content via other UI controls like
#'   [shiny::radioButtons()] -- in this scenario, consider using [nav_content()]
#'   with [navs_hidden()]).
#' @param icon Optional icon to appear next to the nav item's `title`.
#' @return A nav item that may be passed to a nav container (e.g. [navs_tab()]).
#' @export
#' @seealso [navs_tab()], [nav_select()].
#' @describeIn nav Content to display when the given item is selected.
nav <- function(title, ..., value = title, icon = NULL) {
  # TODO: how to handle icons?
  Tag("Nav", value = value, title = html_attr(title), ...)
}



#' @describeIn nav Create a menu of nav items.
#' @param align horizontal alignment of the dropdown menu relative to dropdown toggle.
#' @export
nav_menu <- function(title, ..., value = title, icon = NULL, align = c("left", "right")) {
  # TODO:
  # 1. Validate that ... is sensible?
  # 2. How to handle icons?
  Tag("NavMenu", value = value, title = html_attr(title), align = match.arg(align), ...)
}

#' @describeIn nav Create nav content for use inside `navs_hidden()` (for
#'   creating custom navigation controls via `navs_select()`),
#' @export
nav_content <- function(value, ..., icon = NULL) {
  # TODO: implement the JS!
  stop("Implement me!")
}

#' @describeIn nav Place arbitrary content in the navigation panel (e.g., search
#'   forms, links to external content, etc.)
#' @export
nav_item <- function(...) {
  Tag("NavItem", ...)
}

#' @describeIn nav Adding spacing between nav items.
#' @export
nav_spacer <- function() {
  Tag("NavSpacer")
}



html_attr <- function(x) {
  if (inherits(x, c("shiny.tag", "shiny.tag.list"))) {
    x <- renderTags(x)$html
  }
  if (isHTML(x)) {
    x <- HTML(paste0("{", x, "}"))
  }
  x
}

isHTML <- function(x) {
  isTRUE(attr(x, "html", exact = TRUE))
}
