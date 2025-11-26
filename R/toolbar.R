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
#'   toolbar_input_button(id = "see", icon = icon("eye")),
#'   toolbar_input_button(id = "save", label = "Save")),
#'   toolbar_input_button(id = "edit", icon = icon("pencil"), label="Edit")
#' )
#'
#' @param id The input ID.
#' @param icon An icon to display in the button. (One of icon or label must be
#'   supplied.)
#' @param label The label to display in the button. (One of icon or label must
#'   be supplied.)
#' @param tooltip An optional [tooltip()] to display when hovering over the
#'   button.
#' @param disabled If `TRUE`, the button will not be clickable. Use
#'   [shiny::updateActionButton()] to dynamically enable/disable the button.
#' @param border Whether to show a border around the button.
#' @param ... UI elements for the button.
#'
#' @return Returns a button suitable for use in a toolbar.
#'
#' @family Toolbar components
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

  if (!is.null(tooltip)) {
    button <- tooltip(button, tooltip, placement = "bottom")
  }
  button
}

#' @describeIn toolbar Add a spacer or divider to a toolbar
#'
#' @description
#' `toolbar_spacer()` creates flexible space between toolbar elements or adds
#' a visual divider line.
#'
#' @param width The width of the spacer. Can be:
#'   - `"auto"` (default): Flexible space that pushes subsequent items
#'   - A CSS length unit (e.g., `"10px"`, `"1rem"`): Fixed-width space
#' @param rule If `TRUE`, displays a vertical dividing line instead of empty space.
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   toolbar_input_button(id = "left1", label = "Left"),
#'   toolbar_spacer(),
#'   toolbar_input_button(id = "right1", label = "Right")
#' )
#'
#' toolbar(
#'   toolbar_input_button(id = "a", label = "A"),
#'   toolbar_spacer(width = "20px"),
#'   toolbar_input_button(id = "b", label = "B"),
#'   toolbar_spacer(rule = TRUE),
#'   toolbar_input_button(id = "c", label = "C")
#' )
#'
#' @export
toolbar_spacer <- function(width = "auto", rule = FALSE) {
  width <- if (identical(width, "auto")) "auto" else validateCssUnit(width)

  tag <- div(
    class = "bslib-toolbar-spacer",
    class = if (rule) "bslib-toolbar-divider",
    style = css(width = if (!identical(width, "auto")) width),
    `aria-hidden` = "true"
  )

  as_fragment(tag)
}
