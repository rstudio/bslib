#' Navigation items
#'
#' Create nav item(s) for use inside nav containers (e.g., [navset_tab()],
#' [navset_bar()], etc).
#'
#' @param title A title to display. Can be a character string or UI elements
#'   (i.e., [tags]).
#' @param ... Depends on the function:
#'   * For `nav_panel()` and `nav_panel_hidden()`: UI elements (i.e., [tags]) to
#'     display when the item is active.
#'   * For `nav_menu()`: a collection of nav items (e.g., `nav_panel()`,
#'     `nav_item()`).
#'   * For `nav_item()`: UI elements (i.e., [tags]) to place directly in
#'     the navigation panel (e.g., search forms, links to external content, etc).
#' @param value A character string to assign to the nav item. This value may be
#'   supplied to the relevant container's `selected` argument in order to show
#'   particular nav item's content immediately on page load. This value is also
#'   useful for programmatically updating the selected content via
#'   [nav_select()], [nav_hide()], etc (updating selected tabs this way is often
#'   useful for showing/hiding panels of content via other UI controls like
#'   [shiny::radioButtons()] -- in this scenario, consider using
#'   [nav_panel_hidden()] with [navset_hidden()]).
#' @param icon Optional icon to appear next to the nav item's `title`.
#'
#' @return A nav item that may be passed to a nav container (e.g. [navset_tab()]).
#'
#' @seealso [navset_tab()], [nav_select()].
#' @name nav-items
NULL

#' @describeIn nav-items Content to display when the given item is selected.
#' @export
nav_panel <- function(title, ..., value = title, icon = NULL) {
  tabPanel_(title, ..., value = value, icon = icon)
}

#' @describeIn nav-items Create nav content for use inside `navset_hidden()` (for
#'   creating custom navigation controls via `navs_select()`),
#' @export
nav_panel_hidden <- function(value, ..., icon = NULL) {
  tabPanelBody_(value, ..., icon = icon)
}

#' @describeIn nav-items Create a menu of nav items.
#' @param align horizontal alignment of the dropdown menu relative to dropdown toggle.
#' @export
nav_menu <- function(title, ..., value = title, icon = NULL, align = c("left", "right")) {
  align <- match.arg(align)
  navbarMenu_(title, ..., menuName = value, icon = icon, align = align)
}

#' @describeIn nav-items Place arbitrary content in the navigation panel (e.g., search
#'   forms, links to external content, etc.)
#' @export
nav_item <- function(...) {
  # TODO: drop form-inline since BS5 dropped it?
  # If we do that do we need navset_bar() to generate valid BS5 markup?
  tags$li(class = "bslib-nav-item nav-item form-inline", ...)
}

is_nav_item <- function(x) {
  tag_has_class(x, "bslib-nav-item")
}

#' @describeIn nav-items Adding spacing between nav items.
#' @export
nav_spacer <- function() {
  div(class = "bslib-nav-spacer")
}

is_nav_spacer <- function(x) {
  tag_has_class(x, "bslib-nav-spacer")
}

tag_has_class <- function(x, class) {
  if (!inherits(x, "shiny.tag")) {
    return(FALSE)
  }
  tagQuery(x)$hasClass(class)
}
