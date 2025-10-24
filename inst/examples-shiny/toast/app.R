library(shiny)
library(bslib)

ui <- page_fluid(
  theme = bs_theme(version = 5),
  h2("Toast Notifications Demo"),

  layout_column_wrap(
    width = 1 / 2,

    # Toast Builder Card
    card(
      card_header("Toast Builder"),
      card_body(
        # Body content
        textAreaInput(
          "body",
          "Body Content",
          value = "This is a toast notification!",
          rows = 3,
          width = "100%"
        ),

        # Header options
        input_switch("use_header", "Include Header", value = FALSE),
        conditionalPanel(
          "input.use_header",
          textInput("header_title", "Header Title", value = "Notification"),
          input_switch("use_header_icon", "Include Icon", value = FALSE),
          conditionalPanel(
            "input.use_header_icon",
            selectInput(
              "header_icon",
              "Icon",
              choices = c(
                "None" = "",
                "Check" = "check",
                "Info" = "info-circle",
                "Warning" = "exclamation-triangle",
                "Error" = "times-circle",
                "Star" = "star",
                "Heart" = "heart",
                "Bell" = "bell",
                "User" = "user",
                "Cog" = "cog"
              ),
              selected = ""
            )
          ),
          input_switch("use_header_status", "Include Status Indicator", value = FALSE),
          conditionalPanel(
            "input.use_header_status",
            selectInput(
              "header_status",
              "Status",
              choices = c(
                "Primary" = "primary",
                "Secondary" = "secondary",
                "Success" = "success",
                "Info" = "info",
                "Warning" = "warning",
                "Danger" = "danger",
                "Light" = "light",
                "Dark" = "dark"
              ),
              selected = "primary"
            )
          )
        ),

        # Type
        selectInput(
          "type",
          "Type (Background Color)",
          choices = c(
            "None (default)" = "",
            "Primary" = "primary",
            "Secondary" = "secondary",
            "Success" = "success",
            "Info" = "info",
            "Warning" = "warning",
            "Danger" = "danger",
            "Light" = "light",
            "Dark" = "dark"
          ),
          selected = ""
        ),

        # Position
        selectInput(
          "position",
          "Position",
          choices = c(
            "Top Left" = "top-left",
            "Top Center" = "top-center",
            "Top Right" = "top-right",
            "Middle Left" = "middle-left",
            "Middle Center" = "middle-center",
            "Middle Right" = "middle-right",
            "Bottom Left" = "bottom-left",
            "Bottom Center" = "bottom-center",
            "Bottom Right" = "bottom-right"
          ),
          selected = "top-right"
        ),

        # Auto-hide options
        input_switch("autohide", "Auto-hide", value = TRUE),
        conditionalPanel(
          "input.autohide",
          sliderInput(
            "duration",
            "Duration (milliseconds)",
            min = 1000,
            max = 15000,
            value = 5000,
            step = 500,
            width = "100%"
          )
        ),

        # Close button
        input_switch("closable", "Show Close Button", value = TRUE),

        # Custom ID
        input_switch("use_custom_id", "Use Custom ID", value = FALSE),
        conditionalPanel(
          "input.use_custom_id",
          textInput("custom_id", "Toast ID", value = "my-toast")
        ),

        # Action buttons
        div(
          class = "mt-3 d-grid gap-2",
          actionButton("show_toast", "Show Toast", class = "btn-primary"),
          actionButton("hide_toast", "Hide Last Toast", class = "btn-secondary")
        )
      )
    ),

    # Advanced Features and Examples
    card(
      card_header("Advanced Features"),
      card_body(
        actionButton("show_persistent", "Show Persistent Toast", class = "mb-2 w-100"),
        actionButton("hide_persistent", "Hide Persistent Toast", class = "mb-2 w-100"),
        actionButton("show_long_duration", "Long Duration (10s)", class = "mb-2 w-100"),
        actionButton("show_no_close", "No Close Button", class = "mb-2 w-100"),
        actionButton("show_custom_header", "Custom Header with Icon & Status", class = "mb-2 w-100")
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
  # Store last toast ID
  last_toast_id <- reactiveVal(NULL)
  persistent_toast_id <- reactiveVal(NULL)

  # Show toast from builder
  observeEvent(input$show_toast, {
    # Build header if needed
    header <- NULL
    if (input$use_header) {
      if (input$use_header_icon || input$use_header_status) {
        # Use toast_header() for structured header
        icon <- if (input$use_header_icon && nzchar(input$header_icon)) {
          icon(input$header_icon)
        } else {
          NULL
        }

        status <- if (input$use_header_status) {
          input$header_status
        } else {
          NULL
        }

        header <- toast_header(
          title = input$header_title,
          icon = icon,
          status = status
        )
      } else {
        # Simple text header
        header <- input$header_title
      }
    }

    # Build toast
    toast_obj <- toast(
      body = input$body,
      header = header,
      id = if (input$use_custom_id) input$custom_id else NULL,
      type = if (nzchar(input$type)) input$type else NULL,
      autohide = input$autohide,
      duration = input$duration,
      position = input$position,
      closable = input$closable
    )

    # Show and store ID
    id <- show_toast(toast_obj)
    last_toast_id(id)
  })

  # Hide last toast
  observeEvent(input$hide_toast, {
    req(last_toast_id())
    hide_toast(last_toast_id())
    last_toast_id(NULL)
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
          icon = icon("check"),
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
      "middle-left", "middle-center", "middle-right",
      "bottom-left", "bottom-center", "bottom-right"
    )

    types <- c("primary", "success", "info", "warning", "danger", "secondary", "light", "dark", "primary")

    for (i in seq_along(positions)) {
      pos <- positions[i]
      show_toast(
        toast(
          body = paste("Toast at", pos),
          type = types[i],
          duration = 4000,
          position = pos
        )
      )
    }
  })
}

shinyApp(ui, server)
