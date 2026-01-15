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
#'   alongside the icon. Note that `show_label` can be dynamically updated using
#'   [update_toolbar_input_button()].
#' @param tooltip Tooltip text to display when hovering over the input. Can be:
#'   * `TRUE` (default when `show_label = FALSE`) - shows a tooltip with the
#'     `label` text
#'   * `FALSE` (default when `show_label = TRUE`) - no tooltip
#'   * A character string - shows a tooltip with custom text
#'
#'   Defaults to `!show_label`. When a tooltip is created, it will have an ID of
#'   `"{id}-tooltip"` which can be used to update the tooltip text dynamically
#'   via [update_tooltip()].
#' @param ... Additional attributes to pass to the button.
#' @param disabled If `TRUE`, the button will not be clickable. Use
#'   [update_toolbar_input_button()] to dynamically enable/disable the button.
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
    button <- tooltip(
      button,
      tooltip,
      id = sprintf("%s-tooltip", id),
      placement = "bottom"
    )
  }

  button
}

#' Update toolbar button input
#'
#' @description
#' Change the value or appearance of a toolbar button input on the client.
#'
#' @rdname toolbar_input_button
#' @inheritParams toolbar_input_button
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @details
#' This update function works similarly to [shiny::updateActionButton()], but
#' is specifically designed for [toolbar_input_button()]. It allows you to
#' update the button's label, icon, and disabled state from the server.
#'
#' Note that you cannot change the `tooltip` or `border` parameters
#' after the button has been created, as these affect the button's structure
#' and ARIA attributes.
#' Please use [update_tooltip()] to update the text of the tooltip if one is present.
#'
#' @examplesIf interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   toolbar(
#'     align = "right",
#'     toolbar_input_button("btn", label = "Click me", icon = icon("play"))
#'   ),
#'   verbatimTextOutput("count")
#' )
#'
#' server <- function(input, output, session) {
#'   output$count <- renderPrint({
#'     input$btn
#'   })
#'
#'   observeEvent(input$btn, {
#'     if (input$btn == 1) {
#'       update_toolbar_input_button(
#'         "btn",
#'         label = "Clicked!",
#'         icon = icon("check")
#'       )
#'       # Update the tooltip text
#'       update_tooltip("btn-tooltip", "Button was clicked!")
#'     }
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @seealso [toolbar_input_button()], [shiny::updateActionButton()]
#' @export
update_toolbar_input_button <- function(
  id,
  label = NULL,
  show_label = NULL,
  icon = NULL,
  disabled = NULL,
  session = get_current_session()
) {
  label_text <- paste(unlist(find_characters(label)), collapse = " ")
  if (!nzchar(trimws(label_text))) {
    rlang::warn(
      "Consider providing a non-empty string label for accessibility."
    )
  }

  icon <- validateIcon(icon)
  icon_processed <- if (!is.null(icon)) processDeps(icon, session)
  label_processed <- if (!is.null(label)) processDeps(label, session)

  message <- dropNulls(list(
    label = label_processed,
    showLabel = show_label,
    icon = icon_processed,
    disabled = disabled
  ))

  session$sendInputMessage(id, message)
}

toolbar_input_button_input_handler <- function(value, shinysession, name) {
  # Treat like a standard action button for event handlers and input validation
  class(value) <- c("shinyActionButtonValue", class(value))
  value
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
#' @details
#' When a tooltip is created for the select input, it will have an ID of
#' `"{id}-tooltip"` which can be used to update the tooltip text dynamically
#' via [update_tooltip()].
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

  # use_first_choice = TRUE for initial creation so that if the user does not
  # provide an initial selected value, we select the first choice
  processed <- process_choices_selected(
    choices,
    selected,
    id,
    use_first_choice = TRUE
  )

  if (!is.null(processed$error)) {
    rlang::abort(processed$error)
  }

  select_tag <- tags$select(
    id = id,
    class = "form-select form-select-sm",
    `data-shiny-no-bind-input` = NA,
    processed$options
  )

  # Add optional icon before the select
  icon_elem <- span(
    icon,
    class = "bslib-toolbar-icon",
    `aria-hidden` = "true",
    style = "pointer-events: none",
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
      id = sprintf("%s-tooltip", id),
      placement = "bottom"
    )
  }

  div(
    id = id,
    class = "bslib-toolbar-input-select shiny-input-container",
    !!!dots$attribs,
    label_elem,
    select_tag
  )
}

#' Update toolbar select input
#'
#' @description
#' Change the value or appearance of a toolbar select input. This update
#' function works similarly to [shiny::updateSelectInput()], but is
#' specifically designed for [toolbar_input_select()]. It allows you to update
#' the select's label, icon, choices, selected value(s), and label visibility
#' from the server.
#'
#' @rdname toolbar_input_select
#' @inheritParams toolbar_input_select
#' @param selected The new selected value. If `NULL`, the selection is not
#'   changed.
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @details
#' Note that you cannot enable or disable the `tooltip` parameter after the
#' select has been created, as it affects the structure and ARIA attributes.
#' You can, however, use [update_tooltip()] to update the text of the tooltip.
#'
#' @examplesIf interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   toolbar(
#'     align = "right",
#'     toolbar_input_select(
#'       "select",
#'       label = "Choose",
#'       choices = c("A", "B", "C")
#'     )
#'   ),
#'   verbatimTextOutput("value")
#' )
#'
#' server <- function(input, output, session) {
#'   output$value <- renderPrint({
#'     input$select
#'   })
#'
#'   observeEvent(input$select, {
#'     if (input$select == "A") {
#'       update_toolbar_input_select(
#'         "select",
#'         label = "Pick one",
#'         choices = c("X", "Y", "Z"),
#'         selected = "Y"
#'       )
#'       # Update the tooltip text
#'       update_tooltip("select-tooltip", "Choose your option")
#'     }
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @seealso [toolbar_input_select()], [shiny::updateSelectInput()]
#' @export
update_toolbar_input_select <- function(
  id,
  label = NULL,
  show_label = NULL,
  choices = NULL,
  selected = NULL,
  icon = NULL,
  session = get_current_session()
) {
  # Label can be null if there is no update, but if supplied it must be valid
  if (!(is.null(label) || (rlang::is_string(label) && nzchar(trimws(label))))) {
    rlang::abort("`label` must be a non-empty string.")
  }
  icon <- validateIcon(icon)
  icon_processed <- if (!is.null(icon)) processDeps(icon, session)
  label_processed <- if (!is.null(label)) processDeps(label, session)

  # Process and validate choices and selected
  processed <- process_choices_selected(
    choices,
    selected,
    id,
    use_first_choice = FALSE
  )

  if (!is.null(processed$error)) {
    rlang::warn(processed$error)
  }

  message <- dropNulls(list(
    label = label_processed,
    showLabel = show_label,
    icon = icon_processed,
    options = processed$options,
    value = processed$value
  ))

  session$sendInputMessage(id, message)
}

# Helper function to normalize choices using Shiny's choicesWithNames
normalize_choices <- function(choices) {
  choicesWithNames <- asNamespace("shiny")[["choicesWithNames"]]
  choicesWithNames(choices)
}

# Helper function to extract all choice values from normalized choices
# Note: expects choices to already be normalized via normalize_choices()
extract_choice_values <- function(choices_normalized) {
  # If it's a list of lists (grouped choices), flatten it and extract the values
  if (
    is.list(choices_normalized) &&
      any(vapply(choices_normalized, is.list, logical(1)))
  ) {
    values <- unlist(
      lapply(choices_normalized, function(group) {
        if (is.list(group)) {
          unname(group)
        } else {
          group
        }
      }),
      use.names = FALSE
    )
  } else {
    # Flat choices - extract values
    values <- unname(choices_normalized)
  }

  as.character(values)
}

# Helper function to process and validate choices and selected
# Returns a list with:
#   - options: HTML string for <option> elements (or NULL)
#   - value: selected value as character (or NULL)
#   - error: error message if validation failed (NULL if no error)
# @param use_first_choice If TRUE and selected is NULL, use firstChoice().
#   If FALSE, leave selected as NULL (for updates where we want to keep current value)
process_choices_selected <- function(
  choices,
  selected,
  inputId,
  use_first_choice = TRUE
) {
  if (is.null(choices) && is.null(selected)) {
    return(list(options = NULL, value = NULL, error = NULL))
  }

  # Normalize choices once if provided
  choices_normalized <- NULL
  if (!is.null(choices)) {
    choices_normalized <- normalize_choices(choices)
  }

  # If selected is NULL and choices are provided, optionally select the first choice
  if (is.null(selected) && !is.null(choices_normalized) && use_first_choice) {
    firstChoice <- asNamespace("shiny")[["firstChoice"]]
    selected <- firstChoice(choices_normalized)
  }

  # Validate selected if provided
  error_msg <- NULL
  selected_validated <- selected

  if (!is.null(selected)) {
    if (length(selected) != 1) {
      error_msg <- "`selected` must be a single value, not a vector."
      selected_validated <- NULL
    } else if (is.null(choices)) {
      error_msg <- "`selected` cannot be set without `choices`."
      selected_validated <- NULL
    } else {
      # Extract all valid choice values from normalized choices
      choice_values <- extract_choice_values(choices_normalized)
      if (!as.character(selected) %in% choice_values) {
        error_msg <- sprintf(
          "`selected` value '%s' is not in `choices`.",
          as.character(selected)
        )
        selected_validated <- NULL
      }
    }
  }

  options_html <- NULL
  value <- NULL

  # Process choices into HTML options
  if (!is.null(choices_normalized)) {
    options_html <- HTML(as.character(selectOptions(
      choices_normalized,
      selected_validated,
      inputId = inputId
    )))
  }

  # Process selected value
  if (!is.null(selected_validated)) {
    value <- as.character(selected_validated)
  }

  list(
    options = options_html,
    value = value,
    error = error_msg
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

#' Toolbar: Add a divider or spacer to a toolbar
#'
#' @description
#' `toolbar_divider()` creates a visual divider line with customizable width
#' and spacing between toolbar elements. `toolbar_spacer()` creates empty space
#' that expands to push adjacent toolbar elements apart as much as possible.
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
#' toolbar(
#'   toolbar_input_button(id = "previous", label = "Previous"),
#'   toolbar_spacer(),
#'   toolbar_input_button(id = "next", label = "Next")
#' )
#'
#' @family Toolbar components
#' @describeIn toolbar_divider Create a dividing line between toolbar elements.
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

#' @describeIn toolbar_divider Create empty space between toolbar elements.
#' @export
toolbar_spacer <- function() {
  div(class = "bslib-toolbar-spacer")
}
