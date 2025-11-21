#' Toolbar component
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements in a small
#' form suitable for inclusion in card headers, footers, and other small places.
#'
#' @param ... UI elements for the toolbar.
#' @param align Determines if toolbar should be aligned to the `"right"` or
#'   `"left"`.
#' @param gap A CSS length unit defining the gap (i.e., spacing) between
#'   elements in the toolbar. Defaults to `0` (no gap).
#' @return Returns a toolbar element.
#'
#' @export
toolbar <- function(
  ...,
  align = c("right", "left"),
  gap = NULL
) {
  align <- rlang::arg_match(align)
  gap <- validateCssUnit(gap)

  tag <- div(
    class = "bslib-toolbar bslib-gap-spacing",
    "data-align" = align,
    style = css(gap = gap),
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
#' @param id The input ID.
#' @param icon An icon to display in the button.
#' (One of icon or label must be supplied.)
#' @param label The label to display in the button.
#' (One of icon or label must be supplied.)
#' @param tooltip An optional tooltip to display when hovering over the button.
#' @param disabled If `TRUE`, the button will not be clickable.
#' Use [shiny::updateActionButton()] to dynamically enable/disable the button.
#' @param border Whether to show a border around the button.
#' @param ... UI elements for the button.
#'
#' @return Returns a button suitable for use in a toolbar.
#'
#' @export
toolbar_input_button <- function(
  id,
  icon = NULL,
  label = NULL,
  tooltip = NULL,
  ...,
  disabled = FALSE,
  border = FALSE
) {
  if (is.null(icon) && is.null(label)) {
    stop(
      "At least one of 'icon' or 'label' must be provided.",
      call. = TRUE
    )
  }
has_icon <- !is.null(icon)
has_label <- !is.null(label)

btn_type <- 
  if (has_icon && !has_label) {
    "icon"
  } else if (has_label && !has_icon) {
    "label"
  } else {
    # Can't both be missing (checked above)
    "both"
  }
  # Determine if this is an icon-only button
  is_icon_only <- !is.null(icon) && is.null(label)

  button <- shiny::actionButton(
    id,
    label = label,
    icon = icon,
    disabled = disabled,
    class = "bslib-toolbar-input-button btn-sm",
    class = if (!border) "border-0" else "border-1",
    "data-type" = if (is_icon_only) "icon",
    ...
  )

  if (!is.null(tooltip)) {
    button <- tooltip(button, tooltip, placement = "bottom")
  }
  button
}
