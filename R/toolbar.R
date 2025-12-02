#' Toolbar component
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements in a small
#' form suitable for inclusion in card headers, footers, and other small places.
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   align = "right",
#'   toolbar_input_button(id = "see", icon = icon("eye"), label = "View"),
#'   toolbar_input_button(id = "save", icon = icon("save"), label = "Save"),
#'   toolbar_input_button(id = "edit", icon = icon("pencil"), label = "Edit")
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
#'   `show_label = TRUE`, only the icon will be visible.
#' @param label The button label. Used as button text when `show_label = TRUE`,
#'   or as an accessibility label when hidden. Also used as the default
#'   tooltip text when `tooltip = TRUE`.
#' @param show_label Whether to show the label text in the button. If `FALSE`
#'   (the default), only the icon is shown (if provided). If `TRUE`, the label
#'   text is shown alongside the icon.
#' @param tooltip Tooltip text to display when hovering over the button. Can be:
#'   * `TRUE` (default when `show_label = FALSE`) - shows a tooltip with the `label` text
#'   * `FALSE` (default when `show_label = TRUE`) - no tooltip
#'   * A character string - shows a tooltip with custom text
#'   Defaults to `!show_label`.
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
  label,
  icon = NULL,
  show_label = !is.null(icon),
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

  # For icon-only buttons, validate that label has text for accessibility
  if (!show_label) {
    label_text <- paste(unlist(find_characters(label)), collapse = " ")
    label_text <- trimws(label_text)
    # Verifies the label contains non-empty text
    if (!nzchar(label_text)) {
      warning(
        "When `show_label = FALSE`, consider providing a non-empty string label
        for accessibility."
      )
    }
  }

  # Create hidden label span for icon-only buttons (for aria-labelledby)
  if (!show_label) {
    label_id <- paste0(id, "-label")
    hidden_label <- span(
      id = label_id,
      hidden = NA,
      label
    )
  }

  button <- shiny::actionButton(
    id,
    label = if (btn_type != "icon") label,
    icon = span(icon, `aria-hidden` = "true", style = "pointer-events: none"),
    disabled = disabled,
    class = "bslib-toolbar-input-button btn-sm",
    class = if (!border) "border-0" else "border-1",
    "data-type" = btn_type,
    # Icon-only buttons use aria-labelledby to reference the hidden label
    "aria-labelledby" = if (btn_type == "icon") label_id,
    ...
  )

  # Wrap button with hidden label for icon-only buttons
  if (!show_label) {
    button <- tagList(hidden_label, button)
  }

  # If tooltip is literally TRUE, use the label as the tooltip text.
  if (isTRUE(tooltip)) {
    tooltip <- label
  }
  if (isFALSE(tooltip)) {
    tooltip <- NULL
  }
  if (!is.null(tooltip)) {
    # Default placement is "bottom" for the toolbar case because otherwise the
    # tooltip ends up covering the neighboring buttons in the header/footer.
    button <- tooltip(button, tooltip, placement = "bottom")
  }

  button
}
