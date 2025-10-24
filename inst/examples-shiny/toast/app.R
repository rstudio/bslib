library(shiny)
library(bslib)

ui <- page_fluid(
  theme = bs_theme(version = 5),
  h2("Toast Notifications Demo"),

  layout_column_wrap(
    width = 1 / 2,
    card(
      card_header("Basic Toasts"),
      card_body(
        actionButton("show_basic", "Show Basic Toast", class = "mb-2 w-100"),
        actionButton("show_success", "Show Success", class = "mb-2 w-100"),
        actionButton("show_error", "Show Error", class = "mb-2 w-100"),
        actionButton("show_warning", "Show Warning", class = "mb-2 w-100"),
        actionButton("show_info", "Show Info", class = "mb-2 w-100")
      )
    ),

    card(
      card_header("Position Options"),
      card_body(
        actionButton("show_top_left", "Top Left", class = "mb-2 w-100"),
        actionButton("show_top_center", "Top Center", class = "mb-2 w-100"),
        actionButton("show_top_right", "Top Right", class = "mb-2 w-100"),
        actionButton("show_bottom_left", "Bottom Left", class = "mb-2 w-100"),
        actionButton("show_bottom_right", "Bottom Right", class = "mb-2 w-100")
      )
    ),

    card(
      card_header("Advanced Features"),
      card_body(
        actionButton("show_persistent", "Show Persistent Toast", class = "mb-2 w-100"),
        actionButton("hide_persistent", "Hide Persistent Toast", class = "mb-2 w-100"),
        actionButton("show_long_duration", "Long Duration (10s)", class = "mb-2 w-100"),
        actionButton("show_no_close", "No Close Button", class = "mb-2 w-100"),
        actionButton("show_custom_header", "Custom Header with Status", class = "mb-2 w-100")
      )
    ),

    card(
      card_header("Interactive Toasts"),
      card_body(
        actionButton("show_action_buttons", "Toast with Action Buttons", class = "mb-2 w-100"),
        actionButton("show_multiple", "Show Multiple Toasts", class = "mb-2 w-100"),
        actionButton("show_all_positions", "Test All Positions", class = "mb-2 w-100")
      )
    )
  )
)

server <- function(input, output, session) {
  # Store persistent toast ID
  persistent_toast_id <- reactiveVal(NULL)

  # Basic toasts
  observeEvent(input$show_basic, {
    show_toast("This is a basic toast notification!")
  })

  observeEvent(input$show_success, {
    show_toast(
      toast(
        body = "Operation completed successfully!",
        header = "Success",
        type = "success"
      )
    )
  })

  observeEvent(input$show_error, {
    show_toast(
      toast(
        body = "An error occurred while processing your request.",
        header = "Error",
        type = "danger"
      )
    )
  })

  observeEvent(input$show_warning, {
    show_toast(
      toast(
        body = "Please save your work before continuing.",
        header = "Warning",
        type = "warning"
      )
    )
  })

  observeEvent(input$show_info, {
    show_toast(
      toast(
        body = "This is an informational message.",
        header = "Info",
        type = "info"
      )
    )
  })

  # Position options
  observeEvent(input$show_top_left, {
    show_toast(
      toast("Toast at top-left", type = "primary", position = "top-left")
    )
  })

  observeEvent(input$show_top_center, {
    show_toast(
      toast("Toast at top-center", type = "secondary", position = "top-center")
    )
  })

  observeEvent(input$show_top_right, {
    show_toast(
      toast("Toast at top-right (default)", type = "success", position = "top-right")
    )
  })

  observeEvent(input$show_bottom_left, {
    show_toast(
      toast("Toast at bottom-left", type = "info", position = "bottom-left")
    )
  })

  observeEvent(input$show_bottom_right, {
    show_toast(
      toast("Toast at bottom-right", type = "warning", position = "bottom-right")
    )
  })

  # Advanced features
  observeEvent(input$show_persistent, {
    id <- show_toast(
      toast(
        body = "This toast won't disappear automatically. Use the 'Hide' button to dismiss it.",
        header = "Persistent Toast",
        type = "info",
        autohide = FALSE
      )
    )
    persistent_toast_id(id)
  })

  observeEvent(input$hide_persistent, {
    req(persistent_toast_id())
    hide_toast(persistent_toast_id())
    persistent_toast_id(NULL)
  })

  observeEvent(input$show_long_duration, {
    show_toast(
      toast(
        body = "This toast will stay visible for 10 seconds.",
        header = "Long Duration",
        type = "primary",
        duration = 10000
      )
    )
  })

  observeEvent(input$show_no_close, {
    show_toast(
      toast(
        body = "This toast has no close button but will auto-hide in 3 seconds.",
        type = "secondary",
        closable = FALSE,
        duration = 3000
      )
    )
  })

  observeEvent(input$show_custom_header, {
    show_toast(
      toast(
        body = "Your profile has been updated successfully.",
        header = toast_header(
          title = "Profile Updated",
          status = "success"
        ),
        type = "success"
      )
    )
  })

  # Interactive toasts
  observeEvent(input$show_action_buttons, {
    show_toast(
      toast(
        body = tagList(
          p("Would you like to save your changes?"),
          div(
            class = "mt-2",
            actionButton("save_yes", "Save", class = "btn-sm btn-primary me-2"),
            actionButton("save_no", "Don't Save", class = "btn-sm btn-secondary")
          )
        ),
        header = "Unsaved Changes",
        type = "warning",
        autohide = FALSE
      )
    )
  })

  observeEvent(input$save_yes, {
    showNotification("Changes saved!", type = "message")
  })

  observeEvent(input$save_no, {
    showNotification("Changes discarded.", type = "message")
  })

  observeEvent(input$show_multiple, {
    show_toast(toast("First notification", type = "primary"))
    Sys.sleep(0.2)
    show_toast(toast("Second notification", type = "success"))
    Sys.sleep(0.2)
    show_toast(toast("Third notification", type = "info"))
  })

  observeEvent(input$show_all_positions, {
    positions <- c(
      "top-left", "top-center", "top-right",
      "bottom-left", "bottom-center", "bottom-right"
    )

    for (i in seq_along(positions)) {
      pos <- positions[i]
      show_toast(
        toast(
          body = paste("Toast at", pos),
          type = c("primary", "success", "info", "warning", "danger", "secondary")[i],
          duration = 3000,
          position = pos
        )
      )
    }
  })
}

shinyApp(ui, server)
