#' @inheritParams shiny::navItem
#' @export
nav_item <- function(...) {
  # TODO: revisit these comments
  # https://github.com/rstudio/shiny/pull/3331/files#r605926297
  item <- tags$li(class = "nav-item form-inline", ...)
  class(item) <- c("shiny_nav_item", class(item))
  item
}

is_nav_item <- function(x) {
  inherits(x, "shiny_nav_item")
}

#' @export
nav_spacer <- function() {
  div(class = "nav-spacer")
}

is_nav_spacer <- function(x) {
  tagHasClass(x, "nav-spacer")
}
