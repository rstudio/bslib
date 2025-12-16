#' Toolbar component
#'
#' @description
#' A toolbar which can contain buttons, inputs, and other UI elements in a
#' small form suitable for inclusion in card headers, footers, and other
#' small places.
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
#'   toolbar_input_button(
#'     id = "edit", icon = icon("pencil"), label = "Edit", show_label = TRUE
#'   )
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
#' @param tooltip Tooltip text to display when hovering. Can be:
#'   * `TRUE` (default when `show_label = FALSE`) - shows a tooltip with
#'     the `label` text
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
    # We hide the label visually if `!show_label` but keep the label
    # field for use with `aria-labelledby`. This ensures that ARIA will
    # always use the label text. We found that screen readers will read
    # out the icon's `aria-label` even if it is a descendent of an
    # element with `aria-hidden=true`.
    label = span(
      id = label_id,
      hidden = if (!show_label) NA else NULL,
      label
    ),
    # And we wrap the icon to ensure that it is always treated as
    # decorative
    icon = span(
      icon,
      `aria-hidden` = "true",
      style = "pointer-events: none"
    ),
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
    # Default placement is "bottom" for the toolbar case because
    # otherwise the tooltip ends up covering the neighboring buttons in
    # the header/footer.
    button <- tooltip(button, tooltip, placement = "bottom")
  }

  button
}

#' Toolbar Input Select
#'
#' @description
#' Create a select list input control that can be used to choose a single
#' item from a list of values, suitable for use within a [toolbar()].
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   align = "right",
#'   toolbar_input_select(
#'     id = "select",
#'     label = "Choose option",
#'     choices = c("Option 1", "Option 2", "Option 3"),
#'     selected = "Option 2"
#'   )
#' )
#'
#' # With tooltip
#' toolbar(
#'   align = "right",
#'   toolbar_input_select(
#'     id = "select",
#'     label = "Choose option",
#'     choices = c("Option 1", "Option 2", "Option 3"),
#'     tooltip = "Select your preferred option from the list"
#'   )
#' )
#'
#' # With icon and tooltip
#' toolbar(
#'   align = "right",
#'   toolbar_input_select(
#'     id = "select",
#'     label = "Choose option",
#'     choices = c("Option 1", "Option 2", "Option 3"),
#'     icon = shiny::icon("filter"),
#'     tooltip = "Filter the data"
#'   )
#' )
#'
#' @param id The input ID.
#' @param label The label for the select input. A hidden label is created with
#'   this text and referenced via `aria-labelledby` for accessibility. Must be
#'   a non-empty string.
#' @param choices List of values to select from. If elements of the list
#'   are named, then that name — rather than the value — is displayed to
#'   the user. Grouped choices can be created by providing a named list whose
#'   elements are (either named or unnamed) lists.
#' @param selected The initially selected value. If not provided, the first
#'   choice will be selected by default.
#' @param tooltip Tooltip text to display when hovering over the select
#'   input. Can be: FALSE (default) - no tooltip is shown, TRUE - shows a
#'   tooltip with the `label` text, or a character string - shows a tooltip
#'   with custom text.
#' @param icon An optional icon to display before the select input. When
#'   provided, the icon appears to the left of the select. If `NULL`
#'   (default), no icon is shown.
#' @param ... Additional named arguments passed as attributes to the outer
#'   container div.
#' @return Returns a select input control suitable for use in a toolbar.
#'
#' @family Toolbar components
#' @export
toolbar_input_select <- function(
  id,
  label,
  choices,
  ...,
  selected = NULL,
  tooltip = FALSE,
  icon = NULL
) {
  # Import Shiny's internal choice processing functions
  choicesWithNames <- asNamespace("shiny")[["choicesWithNames"]]
  firstChoice <- asNamespace("shiny")[["firstChoice"]]

  # Restore input for bookmarking
  selected <- shiny::restoreInput(id = id, default = selected)

  # Set selected to the first choice if no default or restored value
  if (is.null(selected)) {
    selected <- firstChoice(choices)
  }

  # Validate that ... contains only named arguments
  dots <- separate_arguments(...)
  if (length(dots$children) > 0) {
    rlang::abort("All arguments in `...` must be named.")
  }

  # Validate that label is a non-empty string
  if (!is.character(label) || length(label) != 1 || !nzchar(trimws(label))) {
    rlang::abort("`label` must be a non-empty string.")
  }

  # Normalize choices using util function imported from Shiny
  choices <- choicesWithNames(choices)

  select_tag <- tags$select(
    id = id,
    class = "form-select form-select-sm",
    selectOptions(choices, selected, inputId = id)
  )

  # Add optional icon before the select
  icon_elem <- NULL
  if (!is.null(icon)) {
    # Remove aria-label from icon if present. Even though the icon is wrapped
    # in a span with aria-hidden="true", screen readers may still read the
    # icon's aria-label. This ensures the icon is treated as purely decorative.
    if (!is.null(icon$attribs$`aria-label`)) {
      icon$attribs$`aria-label` <- NULL
    }

    icon_elem <- span(
      icon,
      style = "pointer-events: none",
      class = "bslib-toolbar-input-select-icon",
      `aria-hidden` = "true",
      tabindex = "-1"
    )
  }

  # Using aria-labelledby on the container (rather than aria-label on the
  # select) ensures screen readers always use the aria-labelled by text and
  # read it only once regardless of if there is a tooltip. Otherwise, the
  # screen reader behavior reads the label twice when there is a tooltip.
  label_id <- paste0("select-label-", p_randomInt(1000, 10000))
  label_elem <- span(
    id = label_id,
    hidden = NA,
    label
  )

  container <- div(
    class = "bslib-toolbar-input-select shiny-input-container",
    !!!dots$attribs,
    label_elem,
    icon_elem,
    select_tag,
    "aria-labelledby" = label_id
  )

  # If tooltip is literally TRUE, use the label as the tooltip text.
  if (isTRUE(tooltip)) {
    tooltip <- label
  }
  if (isFALSE(tooltip)) {
    tooltip <- NULL
  }
  if (!is.null(tooltip)) {
    container <- bslib::tooltip(
      container,
      tooltip,
      placement = "bottom"
    )
  }

  container
}

# This function ported from shiny's `input-select.R` with changes to the
# warning message.
# Create tags for each of the options; use <optgroup> if necessary.
# This returns an HTML string instead of tags for performance.
selectOptions <- function(
  choices,
  selected = NULL,
  inputId,
  perfWarning = FALSE
) {
  if (length(choices) >= 1000) {
    rlang::warn(
      sprintf(
        paste0(
          "Select input `%s` contains a large number of options; ",
          "this may cause performance issues."
        ),
        inputId
      )
    )
  }

  html <- mapply(
    choices,
    names(choices),
    FUN = function(choice, label) {
      if (is.list(choice)) {
        # If sub-list, create an optgroup and recurse into the sublist
        sprintf(
          '<optgroup label="%s">\n%s\n</optgroup>',
          htmlEscape(label, TRUE),
          selectOptions(choice, selected, inputId, perfWarning)
        )
      } else {
        # If single item, just return option string
        sprintf(
          '<option value="%s"%s>%s</option>',
          htmlEscape(choice, TRUE),
          if (choice %in% selected) " selected" else "",
          htmlEscape(label)
        )
      }
    }
  )

  HTML(paste(html, collapse = "\n"))
}

#' Toolbar: Add a divider to a toolbar
#'
#' @description
#' `toolbar_divider()` creates a visual divider line with customizable width
#' and spacing between toolbar elements.
#'
#' @param width A CSS length unit specifying the width of the divider line.
#'   Defaults to `"2px"` for a sensible dividing line. Pass `0px` for no
#'   divider line.
#' @param gap A CSS length unit defining the spacing around the divider.
#'   Defaults to `"1rem"` for sensible fixed spacing.
#'
#' @examplesIf rlang::is_interactive()
#' toolbar(
#'   toolbar_input_button(id = "left1", label = "Left"),
#'   toolbar_divider(),
#'   toolbar_input_button(id = "right1", label = "Right")
#' )
#'
#' toolbar(
#'   toolbar_input_button(id = "a", label = "A"),
#'   toolbar_divider(width = "5px", gap = "20px"),
#'   toolbar_input_button(id = "b", label = "B")
#' )
#'
#' @family Toolbar components
#' @export
toolbar_divider <- function(..., width = NULL, gap = NULL) {
  rlang::check_dots_empty()
  width <- validateCssUnit(width)
  gap <- validateCssUnit(gap)

  div(
    class = "bslib-toolbar-divider",
    style = css(
      # Sets the overall width of divider space
      `--_divider-gap` = gap,
      # Sets the width of the pseudo-element divider line, defaults to 2px
      `--_divider-width` = width
    ),
    `aria-hidden` = "true"
  )
}
