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
    button <- tooltip(
      button,
      tooltip,
      id = sprintf("%s_tooltip", id),
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
#' Note that you cannot change `show_label`, `tooltip`, or `border` parameters
#' after the button has been created, as these affect the button's structure
#' and ARIA attributes.
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

  # Validate selected value if provided
  if (!is.null(selected)) {
    if (length(selected) != 1) {
      rlang::abort("`selected` must be a single value, not a vector.")
    }
    choice_values <- get_choice_values(choices)
    if (!as.character(selected) %in% choice_values) {
      rlang::abort(
        sprintf(
          "`selected` value '%s' is not in `choices`.",
          as.character(selected)
        )
      )
    }
  }

  # Restore input for bookmarking
  selected <- shiny::restoreInput(id = id, default = selected)

  # Set selected to the first choice if no default or restored value
  firstChoice <- asNamespace("shiny")[["firstChoice"]]
  if (is.null(selected)) {
    selected <- firstChoice(choices)
  }

  # Normalize choices and generate select options
  choices <- normalize_choices(choices)

  select_tag <- tags$select(
    id = id,
    class = "form-select form-select-sm",
    `data-shiny-no-bind-input` = NA,
    selectOptions(choices, selected, inputId = id)
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
      id = paste0(id, "-tooltip"),
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
  # Label can be null if there is no update, but if it is supplied it must be
  # valid
  if (!(is.null(label) || (rlang::is_string(label) && nzchar(trimws(label))))) {
    rlang::abort("`label` must be a non-empty string.")
  }
  icon <- validateIcon(icon)
  icon_processed <- if (!is.null(icon)) processDeps(icon, session)
  label_processed <- if (!is.null(label)) processDeps(label, session)

  current_value <- session$input[[id]]
  validation_result <- validate_update_selected(
    selected,
    choices,
    current_value
  )

  if (!is.null(validation_result$warning)) {
    rlang::warn(validation_result$warning)
  }

  # Determine which value to use for rendering options HTML
  # If validation returned NULL, use current_value for HTML
  # Otherwise use the validated selected value
  value_for_html <- if (is.null(validation_result$value)) {
    current_value
  } else {
    validation_result$value
  }

  # Process choices with the appropriate selected value for HTML rendering
  choices_processed <- process_select_choices(choices, value_for_html, id)

  # Use the validated/processed selected value for the message
  selected_processed <- validation_result$value

  message <- dropNulls(list(
    label = label_processed,
    showLabel = show_label,
    icon = icon_processed,
    options = choices_processed,
    value = selected_processed
  ))

  session$sendInputMessage(id, message)
}

# Helper function to normalize choices using Shiny's choicesWithNames
normalize_choices <- function(choices) {
  choicesWithNames <- asNamespace("shiny")[["choicesWithNames"]]
  choicesWithNames(choices)
}

# Helper function to extract all choice values from a choices structure
# Handles both flat and grouped choices
get_choice_values <- function(choices) {
  choices <- normalize_choices(choices)

  # If it's a list of lists (grouped choices), flatten it
  if (is.list(choices) && any(vapply(choices, is.list, logical(1)))) {
    # Extract values from each group
    values <- unlist(
      lapply(choices, function(group) {
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
    values <- unname(choices)
  }

  as.character(values)
}

# Helper function to validate and process selected value for updates
# Returns a list with:
#   - value: the value to send (character value, or NULL to keep current)
#   - warning: warning message if validation failed (NULL if no warning)
validate_update_selected <- function(selected, choices, current_value) {
  # Helper to return NULL (don't update value) with warning
  keep_with_warning <- function(msg) {
    list(value = NULL, warning = msg)
  }

  # If no selected value provided, don't change the value
  # Even if current value is not in new choices, we leave it as-is
  if (is.null(selected)) {
    return(list(value = NULL, warning = NULL))
  }

  if (length(selected) != 1) {
    return(keep_with_warning(
      "`selected` must be a single value, not a vector."
    ))
  }

  if (is.null(choices)) {
    return(keep_with_warning(
      "`selected` cannot be set without `choices`."
    ))
  }

  if (!as.character(selected) %in% get_choice_values(choices)) {
    return(keep_with_warning(sprintf(
      "`selected` value '%s' is not in `choices`.",
      as.character(selected)
    )))
  }

  # Valid selected value
  list(value = as.character(selected), warning = NULL)
}

# Helper function to process select choices into HTML options
process_select_choices <- function(choices, selected = NULL, inputId) {
  if (is.null(choices)) {
    return(NULL)
  }
  choices <- normalize_choices(choices)
  options_html <- selectOptions(choices, selected, inputId = inputId)
  as.character(options_html)
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
