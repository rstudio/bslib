#' Add a toolbar to a UI element
#'
#' @description
#' Display additional information when focusing (or hovering over) a UI element.
#'
#' @param ... UI elements for the toolbar.
#' @param align A character string.
#' @param size STUFF HERE
#'
#' @return Returns a toolbar container.
#'
#' @export
toolbar <- function(
  ...,
  align = c("right", "left"),
  size = c("sm", "md", "lg")
) {
  align <- rlang::arg_match(align)
  size <- rlang::arg_match(size)

  tag <- htmltools::div(
    class = "bslib-toolbar",
    "data-align" = align,
    "data-size" = size,
    rlang::list2(...),
    component_dependencies()
  )

  as_fragment(
    tag_require(tag, version = 5, caller = "toolbar()")
  )
}
