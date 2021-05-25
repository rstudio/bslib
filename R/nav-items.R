#' @inheritParams shiny::navItem
#' @export
nav_item <- function(...) {
  # TODO: drop form-inline since BS5 dropped it?
  # If we do that do we need navs_bar() to generate valid BS5 markup?
  tags$li(class = "bslib-nav-item nav-item form-inline", ...)
}

is_nav_item <- function(x) {
  tag_has_class(x, "bslib-nav-item")
}

#' @export
nav_spacer <- function() {
  div(class = "bslib-nav-spacer")
}

is_nav_spacer <- function(x) {
  tag_has_class(x, "bslib-nav-spacer")
}

tag_has_class <- function(x, class) {
  if (!inherits(x, "shiny.tag")) {
    return(x)
  }
  tagQuery(x)$hasClass(class)
}
