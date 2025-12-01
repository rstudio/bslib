#' Toolbar component
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements in a small
#' form suitable for inclusion in card headers, footers, and other small places.
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   align = "right",
#'   toolbar_input_button(id = "see", icon = icon("eye")),
#'   toolbar_input_button(id = "save", icon = icon("save")),
#'   toolbar_input_button(id = "edit", icon = icon("pencil"))
#' )
#'
#' @param ... UI elements for the toolbar.
#' @param align Determines if toolbar should be aligned to the `"right"` or
#'   `"left"`.
#' @param gap A CSS length unit defining the gap (i.e., spacing) between
#'   elements in the toolbar. Defaults to `0` (no gap).
#' @return Returns a toolbar element.
#'
#' @family Toolbar components
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
#' A button designed to fit well in small places such as in a [toolbar()].
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   align = "right",
#'   toolbar_input_button(id = "see", icon = icon("eye"), label = "See"),
#'   toolbar_input_button(id = "save", label = "Save"),
#'   toolbar_input_button(id = "edit", icon = icon("pencil"), label = "Edit", show_label = TRUE)
#' )
#'
#' @param id The input ID.
#' @param icon An icon to display in the button. If provided without
#'   `show_label = TRUE`, only the icon will be visible (label becomes the
#'   tooltip text).
#' @param label The button label. Used as button text when `show_label = TRUE`
#'   or as tooltip text when the label is hidden.
#' @param show_label Whether to show the label text in the button. If `FALSE`
#'   (the default), only the icon is shown and the label becomes tooltip text.
#'   If `TRUE`, the label text is shown alongside the icon (if provided).
#' @param tooltip Whether to show a [tooltip()] with the label text when
#'   hovering over the button. Defaults to `!show_label`, meaning tooltips are
#'   shown when the label is hidden and not shown when the label is visible.
#'   Can be set to `TRUE` or `FALSE` to override the default behavior.
#' @param ... Additional attributes to pass to the button.
#' @param disabled If `TRUE`, the button will not be clickable. Use
#'   [shiny::updateActionButton()] to dynamically enable/disable the button.
#' @param border Whether to show a border around the button.
#'
#' @return Returns a button suitable for use in a toolbar.
#'
#' @family Toolbar components
#' @export

toolbar_input_button <- function(
  id,
  icon = NULL,
  label,
  show_label = FALSE,
  tooltip = !show_label,
  ...,
  disabled = FALSE,
  border = FALSE
) {
  has_icon <- !is.null(icon)

  btn_type <-
    if (has_icon && show_label == FALSE) {
      "icon"
    } else if (show_label && !has_icon) {
      "label"
    } else {
      # Can't both be missing (label is required)
      "both"
    }

  button <- shiny::actionButton(
    id,
    label = label,
    icon = icon,
    disabled = disabled,
    class = "bslib-toolbar-input-button btn-sm",
    class = if (!border) "border-0" else "border-1",
    "data-type" = btn_type,
    ...
  )

  if (tooltip) {
    button <- tooltip(
      button,
      label,
      placement = "bottom"
    )
  }
  button
}
