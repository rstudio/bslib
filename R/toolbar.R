#' Toolbar component
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements in a small
#' form suitable for inclusion in card headers, footers, and other small places.
#'
#' @param ... UI elements for the toolbar.
#' @param align Determines if toolbar should be aligned to the `"right"` or
#'   `"left"`.
#' @return Returns a toolbar element.
#'
#' @export
toolbar <- function(
  ...,
  align = c("right", "left")
) {
  align <- rlang::arg_match(align)

  tag <- div(
    class = "bslib-toolbar bslib-gap-spacing",
    "data-align" = align,
    ...,
    component_dependencies()
  )

  tag_require(tag, version = 5, caller = "toolbar()")
  as_fragment(tag)
}

#' Toolbar Input Select
#'
#' @description
#' Create a select list input control that can be used to choose a single item
#' from a list of values, suitable for use within a [toolbar()]. This is a
#' wrapper around [shiny::selectInput()] with `selectize = FALSE` and
#' appropriate styling for toolbar usage.
#'
#' @param id The `input` slot that will be used to access the value.
#' @param label Display label for the control, or `NULL` for no label.
#' @param choices List of values to select from. If elements of the list are
#'   named, then that name - rather than the value - is displayed to the user.
#'   It's also possible to group related inputs by providing a named list whose
#'   elements are (either named or unnamed) lists, vectors, or factors. In this
#'   case, the outermost names will be used as the group labels (leveraging the
#'   `<optgroup>` HTML tag) for the elements in the respective sublist.
#' @param selected The initially selected value. If not specified then defaults
#'   to the first value.
#' @param width The width of the input, e.g. '400px', or '100%'; see `validateCssUnit()`.
#' @param size The size of the select input. Must be one of `"sm"`, `"md"`, or
#'   `"lg"`.
#'
#' @return Returns a select input control suitable for use in a toolbar.
#'
#' @export
toolbar_input_select <- function(
  id,
  label,
  choices,
  selected = NULL,
  width = NULL,
  size = c("sm", "md", "lg")
) {
  size <- rlang::arg_match(size)
  htmltools::div(
    class = "bslib-toolbar-input-select form-select-sm",
    "data-size" = size,
    shiny::selectInput(
      id,
      label,
      choices = choices,
      selected = selected,
      multiple = FALSE,
      selectize = FALSE,
      width = width
    )
  )
}
