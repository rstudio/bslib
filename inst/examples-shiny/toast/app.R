library(shiny)
library(bslib)

ui <- page_fillable(
  theme = bs_theme(version = 5),
  title = "Toast Notifications Demo",
  padding = 0,
  gap = 0,

  h2("Toast Notifications Demo", class = "p-3 border-bottom mb-0"),
  input_dark_mode(class = "position-absolute top-0 end-0 p-3"),

  layout_column_wrap(
    width = 1 / 2,
    class = "bslib-page-dashboard",
    style = css(
      background = "var(--bslib-dashboard-main-bg)",
      padding = "15px",
      gap = "15px"
    ),

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

        layout_columns(
          div(
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
            sliderInput(
              "duration_s",
              "Duration (seconds, 0 = disabled)",
              min = 0,
              max = 25,
              value = 5,
              step = 1,
              ticks = FALSE
            ),

            # Close button
            input_switch("closable", "Show Close Button", value = TRUE),

            textInput(
              "custom_id",
              "Toast ID",
              placeholder = "Automatically generated"
            )
          ),
          div(
            # Header options
            input_switch("use_header", "Include Header", value = FALSE),
            conditionalPanel(
              "input.use_header",
              textInput("header_title", "Header Title", value = "Notification"),
              selectInput(
                "header_icon",
                "Icon",
                choices = c(
                  "None" = "",
                  "Check" = "check-circle-fill",
                  "Info" = "info-circle-fill",
                  "Warning" = "exclamation-triangle-fill",
                  "Error" = "x-circle-fill",
                  "Star" = "star-fill",
                  "Heart" = "heart-fill",
                  "Bell" = "bell-fill",
                  "User" = "person-fill",
                  "Cog" = "gear-fill"
                ),
                selected = ""
              ),
              textInput(
                "header_status",
                "Custom Status Text",
                placeholder = "'Just now', '2 mins ago'"
              )
            ),
            conditionalPanel(
              "!input.use_header",
              selectInput(
                "icon_body",
                "Icon",
                # A set of bootstrap icon names for the notification body
                choices = c(
                  "None" = "",
                  "Check" = "check-circle-fill",
                  "Info" = "info-circle-fill",
                  "Warning" = "exclamation-triangle-fill",
                  "Error" = "x-circle-fill",
                  "Star" = "star-fill",
                  "Heart" = "heart-fill",
                  "Bell" = "bell-fill",
                  "User" = "person-fill",
                  "Settings" = "gear-fill",
                  "Chat" = "chat-dots-fill",
                  "Envelope" = "envelope-fill",
                  "Lightbulb" = "lightbulb-fill",
                  "Rocket" = "rocket-takeoff-fill",
                  "Shield" = "shield-fill-check",
                  "Thumbs Up" = "hand-thumbs-up-fill",
                  "Download" = "download",
                  "Upload" = "upload",
                  "Calendar" = "calendar-fill",
                  "Clock" = "clock-fill",
                  "Fire" = "fire",
                  "Gift" = "gift-fill",
                  "Trophy" = "trophy-fill",
                  "Flag" = "flag-fill",
                  "Pin" = "pin-fill"
                )
              )
            )
          )
        ),
      ),
      card_footer(
        class = "hstack gap-2 justify-content-end",
        actionButton("show_toast", "Show Toast", class = "btn-primary"),
        actionButton("hide_toast", "Hide Last Toast", class = "btn-secondary")
      )
    ),

    layout_column_wrap(
      width = 1,

      # Advanced Features and Examples
      card(
        card_header("Advanced Features"),
        card_body(
          actionButton(
            "show_persistent",
            "Show Persistent Toast",
            class = "mb-2 w-100"
          ),
          actionButton(
            "hide_persistent",
            "Hide Persistent Toast",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_long_duration",
            "Long Duration (10s)",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_no_close",
            "No Close Button",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_custom_header",
            "Custom Header with Icon & Status",
            class = "mb-2 w-100"
          )
        )
      ),

      card(
        card_header("Interactive Toasts"),
        card_body(
          actionButton(
            "show_action_buttons",
            "Toast with Action Buttons",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_multiple",
            "Show Multiple Toasts",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_all_positions",
            "Test All Positions",
            class = "mb-2 w-100"
          ),
          actionButton(
            "show_dynamic_content",
            "Toast with Dynamic Content",
            class = "mb-2 w-100"
          )
        )
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
      header <- toast_header(
        title = input$header_title,
        icon = if (nzchar(input$header_icon)) {
          bsicons::bs_icon(input$header_icon)
        },
        status = if (nzchar(input$header_status)) input$header_status
      )
    }

    body_icon <- if (!input$use_header && nzchar(input$icon_body)) {
      bsicons::bs_icon(input$icon_body)
    }

    # Build toast
    toast_obj <- toast(
      input$body,
      header = header,
      icon = body_icon,
      id = if (nzchar(input$custom_id)) input$custom_id,
      type = if (nzchar(input$type)) input$type,
      duration_s = input$duration_s,
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
        "This toast won't disappear automatically. Use the 'Hide' button to dismiss it.",
        header = "Persistent Toast",
        type = "info",
        duration_s = 0
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
        "This toast will stay visible for 10 seconds.",
        header = "Long Duration",
        type = "primary",
        duration_s = 10
      )
    )
  })

  observeEvent(input$show_no_close, {
    show_toast(
      toast(
        "This toast has no close button but will auto-hide in 3 seconds.",
        type = "secondary",
        closable = FALSE,
        duration_s = 3
      )
    )
  })

  observeEvent(input$show_custom_header, {
    show_toast(
      toast(
        "Your profile has been updated successfully.",
        header = toast_header(
          title = "Profile Updated",
          icon = icon("check"),
          status = "just now"
        ),
        type = "success"
      )
    )
  })

  # Interactive toasts
  observeEvent(input$show_action_buttons, {
    show_toast(
      toast(
        id = "unsaved_changes_toast",
        p("Would you like to save your changes?"),
        div(
          class = "mt-2",
          actionButton("save_yes", "Save", class = "btn-sm btn-primary me-2"),
          actionButton(
            "save_no",
            "Don't Save",
            class = "btn-sm btn-secondary"
          )
        ),
        header = "Unsaved Changes",
        type = "warning",
        duration_s = 0,
        closable = FALSE
      )
    )
  })

  observeEvent(input$save_yes, {
    hide_toast("unsaved_changes_toast")
    show_toast(toast("Saved changes", type = "success"))
  })

  observeEvent(input$save_no, {
    hide_toast("unsaved_changes_toast")
    show_toast(toast("Changes were not saved", type = "danger"))
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
      "top-left",
      "top-center",
      "top-right",
      "middle-left",
      "middle-center",
      "middle-right",
      "bottom-left",
      "bottom-center",
      "bottom-right"
    )

    types <- c(
      "primary",
      "success",
      "info",
      "warning",
      "danger",
      "secondary",
      "light",
      "dark",
      "primary"
    )

    for (i in seq_along(positions)) {
      pos <- positions[i]
      show_toast(
        toast(
          paste("Toast at", pos),
          type = types[i],
          duration_s = 4,
          position = pos
        )
      )
    }
  })

  # Dynamic content toast
  inserted_time <- reactiveVal(NULL)

  observeEvent(input$show_dynamic_content, {
    show_toast(
      toast(
        id = "dynamic_content_toast",
        div(
          p("Current time:", strong(textOutput("toast_time", inline = TRUE))),
          plotOutput("toast_plot", height = "200px"),
          sliderInput(
            "toast_bins",
            "Number of bins:",
            min = 5,
            max = 50,
            value = 30,
            width = "100%"
          ),
        ),
        header = toast_header(
          title = "Dynamic Toast",
          status = textOutput("toast_status", inline = TRUE)
        ),
        type = "light",
        duration_s = 0
      )
    )
    inserted_time(Sys.time())
  })

  output$toast_time <- renderText({
    invalidateLater(1000)
    format(Sys.time(), "%H:%M:%S")
  })

  output$toast_status <- renderText({
    req(inserted_time())

    invalidateLater(1000)
    elapsed <- as.numeric(difftime(Sys.time(), inserted_time(), units = "secs"))
    if (elapsed < 60) {
      paste0(floor(elapsed), "s ago")
    } else {
      paste0(floor(elapsed / 60), "m ago")
    }
  })

  output$toast_plot <- renderPlot(
    {
      req(input$toast_bins)
      par(
        mar = c(0, 0, 2, 0), # Margins
        mgp = c(1, 0, 0)
      )
      hist(
        faithful$eruptions,
        breaks = input$toast_bins,
        col = "#444",
        border = "transparent",
        main = "Eruption Times",
        xlab = NULL,
        ylab = NULL,
        axes = FALSE
      )
    },
    bg = "transparent"
  )
}

shinyApp(ui, server)
