#' Add a toolbar to a UI element
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements
#' in a small form suitable for inclusion in card headers,
#' footers, and other small places.
#'
#' @param ... UI elements for the toolbar.
#' @param align Determines if toolbar should be aligned to the right or left.
#' Must be one of "right" or "left".
#' @param size The size of the toolbar. Must be one of "sm", "md", or "lg".
#'
#' @return Returns a toolbar.
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
