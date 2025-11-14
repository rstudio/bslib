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

#' Add toolbar button input
#'
#' @description
#' A button designed to fit well in small places such as toolbars.
#'
#' @param id The `input` slot that will be used to access the value.
#' @param ... UI elements for the button.
#' @param icon An icon to display in the button.
#' (One of icon or label must be supplied.)
#' @param label The label to display in the button.
#' (One of icon or label must be supplied.)
#' @param border Whether to show a border around the button.
#' @param disabled If `TRUE`, the button will not be clickable. Use `updateActionButton()` to dynamically enable/disable the button.
#'
#' @return Returns a button suitable for use in a toolbar.
#'
#' @export
toolbar_input_button <- function(
  id,
  ...,
  icon = NULL,
  label = NULL,
  border = FALSE,
  disabled = FALSE
) {
  if (is.null(icon) && is.null(label)) {
    stop(
      "At least one of 'icon' or 'label' must be provided.",
      call. = TRUE
    )
  }

  shiny::actionButton(
    id,
    label = label,
    icon = icon,
    disabled = disabled,
    class = "bslib-toolbar-input-button btn-sm",
    class = if (!border) "border-0" else NULL,
    ...
  )
}
