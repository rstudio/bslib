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
  show_label = is.null(icon),
  tooltip = !show_label,
  ...,
  disabled = FALSE,
  border = FALSE
) {
  btn_type <-
    if (is.null(icon)) {
      if (!show_label) {
        rlang::abort(
          "If `show_label` is FALSE, `icon` must be provided."
        )
      }
      "label"
    } else {
      if (show_label) "both" else "icon"
    }

  # Validate that label has text for accessibility
  label_text <- paste(unlist(find_characters(label)), collapse = " ")
  # Verifies the label contains non-empty text
  if (!nzchar(trimws(label_text))) {
    warning(
      "Consider providing a non-empty string label for accessibility."
    )
  }

  label_id <- paste0("btn-label-", p_randomInt(1000, 10000))

  button <- shiny::actionButton(
    id,
    # We hide the label visually if `!show_label` but keep the label field for
    # use with `aria-labelledby`. This ensures that ARIA will always use the
    # label text. We found that screen readers will read out the icon's `aria-
    # label` even if it is a descendent of an element with `aria-hidden=true`.
    label = span(id = label_id, hidden = if (!show_label) NA else NULL, label),
    # And we wrap the icon to ensure that it is always treated as decorative
    icon = span(icon, `aria-hidden` = "true", style = "pointer-events: none"),
    disabled = disabled,
    class = "bslib-toolbar-input-button btn-sm",
    class = if (!border) "border-0" else "border-1",
    "data-type" = btn_type,
    "aria-labelledby" = label_id,
    ...
  )

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

#' @describeIn toolbar Add a spacer or divider to a toolbar
#'
#' @description
#' `toolbar_spacer()` creates flexible space between toolbar elements or adds
#' a visual divider line.
#'
#' @param width The width of the spacer. Defaults to `"1rem"` for a sensible
#'   fixed spacing. Can also be any CSS length unit (e.g., `"10px"`, `"1rem"`).
#' @param divider If `TRUE` (default), displays a 2px vertical dividing line.
#'   Also accepts a CSS length unit to specify the line width (e.g., `"5px"`).
#'   Set to `FALSE` for no divider line.
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
#'   toolbar_spacer(width = "20px", divider = "5px"),
#'   toolbar_input_button(id = "b", label = "B"),
#'   toolbar_spacer(divider = FALSE),
#'   toolbar_input_button(id = "c", label = "C")
#' )
#'
#' @family Toolbar components
#' @export
toolbar_spacer <- function(width = "1rem", divider = TRUE) {
  width <- validateCssUnit(width)

  # Handle divider parameter
  has_divider <- FALSE
  divider_width <- "2px"

  if (isTRUE(divider)) {
    has_divider <- TRUE
  } else if (is.character(divider)) {
    has_divider <- TRUE
    divider_width <- validateCssUnit(divider)
  }

  as_fragment(div(
    class = "bslib-toolbar-spacer",
    class = if (has_divider) "bslib-toolbar-divider",
    style = css(
      width = width,
      `--divider-width` = if (has_divider) divider_width else NULL
    ),
    `aria-hidden` = "true"
  ))
}
