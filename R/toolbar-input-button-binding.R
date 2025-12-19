#' Update toolbar button input
#'
#' @description
#' Change the value or appearance of a toolbar button input on the client.
#'
#' @rdname toolbar_input_button
#' @inheritParams toolbar_input_button
#' @param session The `session` object passed to function given to `shinyServer`.
#'   Default is `getDefaultReactiveDomain()`.
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
  # Validate that label has text for accessibility
  label_text <- paste(unlist(find_characters(label)), collapse = " ")
  # Verifies the label contains non-empty text
  if (!nzchar(trimws(label_text))) {
    warning(
      "Consider providing a non-empty string label for accessibility."
    )
  }

  # Process label - wrap it in the same structure as toolbar_input_button()
  # The label content will be updated within the existing .bslib-toolbar-label span
  label_processed <- if (!is.null(label)) {
    processDeps(label, session)
  } else {
    NULL
  }

  # Process icon - wrap it in the same structure as toolbar_input_button()
  # The icon content will be updated within the existing .bslib-toolbar-icon span
  icon_processed <- if (!is.null(icon)) {
    processDeps(validateIcon(icon), session)
  } else {
    NULL
  }

  message <- dropNulls(list(
    label = label_processed,
    showLabel = show_label,
    icon = icon_processed,
    disabled = disabled
  ))

  session$sendInputMessage(id, message)
}

# Input handler for toolbar_input_button
toolbar_input_button_input_handler <- function(value, shinysession, name) {
  # Match shinyActionButtonValue class so it behaves
  # like a standard action button for event handlers and input validation
  class(value) <- c("shinyActionButtonValue", class(value))
  value
}
