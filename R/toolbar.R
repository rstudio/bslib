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
#' @param icon An icon. If provided without `show_label = TRUE`, only the icon
#'   will be visible.
#' @param label The input label. By default, `label` is not shown but is used by
#'   `tooltip`. Set `show_label = TRUE` to show the label (see `tooltip` for
#'   details on how this affects the tooltip behavior).
#' @param show_label Whether to show the label text. If `FALSE` (the default),
#'   only the icon is shown (if provided). If `TRUE`, the label text is shown
#'   alongside the icon.
#' @param tooltip Tooltip text to display when hovering over the input. Can be:
#'   * `TRUE` (default when `show_label = FALSE`) - shows a tooltip with the
#'     `label` text
#'   * `FALSE` (default when `show_label = TRUE`) - no tooltip
#'   * A character string - shows a tooltip with custom text Defaults to
#'     `!show_label`.
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

  # We hide the label visually if `!show_label` but keep the label field for
  # use with `aria-labelledby`. This ensures that ARIA will always use the
  # label text. We found that screen readers will read out the icon's `aria-
  # label` even if it is a descendent of an element with `aria-hidden=true`.
  label_elem <- span(
    id = label_id,
    class = "bslib-toolbar-label",
    hidden = if (!show_label) NA else NULL,
    label
  )

  # And we wrap the icon to ensure that it is always treated as decorative
  icon_elem <- span(
    class = "bslib-toolbar-icon",
    `aria-hidden` = "true",
    style = "pointer-events: none",
    icon,
  )

  button <- shiny::actionButton(
    id,
    label = label_elem,
    icon = icon_elem,
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
#' # With custom tooltip
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
#' @param selected The initially selected value. If not provided, the first
#'   choice will be selected by default.
#' @param ... Additional named arguments passed as attributes to the outer
#'   container div.
#' @inheritParams toolbar_input_button
#' @inheritParams shiny::selectInput
#'
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
  icon = NULL,
  show_label = FALSE,
  tooltip = !show_label
) {
  # Validate that ... contains only named arguments
  dots <- separate_arguments(...)
  if (length(dots$children) > 0) {
    rlang::abort("All arguments in `...` must be named.")
  }

  # Validate that label is a non-empty string
  # TODO: Use `check_string()`
  if (!is.character(label) || length(label) != 1 || !nzchar(trimws(label))) {
    rlang::abort("`label` must be a non-empty string.")
  }

  # Restore input for bookmarking
  selected <- shiny::restoreInput(id = id, default = selected)

  # Set selected to the first choice if no default or restored value
  firstChoice <- asNamespace("shiny")[["firstChoice"]]
  if (is.null(selected)) {
    selected <- firstChoice(choices)
  }

  # Normalize choices using util function imported from Shiny
  choicesWithNames <- asNamespace("shiny")[["choicesWithNames"]]
  choices <- choicesWithNames(choices)

  select_tag <- tags$select(
    id = id,
    class = "form-select form-select-sm",
    selectOptions(choices, selected, inputId = id)
  )

  # Add optional icon before the select
  icon_elem <- span(
    icon,
    style = "pointer-events: none",
    class = "bslib-toolbar-icon",
    `aria-hidden` = "true",
    `role` = "none",
    tabindex = "-1"
  )

  label_elem <- tags$label(
    # shiny::selectInput() append `-label` to id for the label `for` attribute
    id = sprintf("%s-label", id),
    class = "control-label",
    `for` = id,
    icon_elem,
    tags$span(
      class = "bslib-toolbar-label",
      class = if (!show_label) "visually-hidden",
      label
    )
  )

  if (isTRUE(tooltip)) {
    # If tooltip is literally TRUE, use the label as the tooltip text, but hide
    # it from screen readers since it repeats the label content.
    tooltip <- tags$span(label, `aria-hidden` = "true")
  }
  if (isFALSE(tooltip)) {
    tooltip <- NULL
  }
  if (!is.null(tooltip)) {
    select_tag <- bslib::tooltip(
      select_tag,
      tooltip,
      placement = "bottom"
    )
  }

  div(
    class = "bslib-toolbar-input-select shiny-input-container",
    !!!dots$attribs,
    label_elem,
    select_tag
  )
}

# This function was copied from shiny's `input-select.R` with a small change
selectOptions <- function(
  choices,
  selected = NULL,
  inputId,
  perfWarning = FALSE
) {
  if (length(choices) >= 1000) {
    # CHANGED: This warning differs to remove mention of sever-side options
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
