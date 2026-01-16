library(shiny)
library(bslib)

ui <- page_navbar(
  title = "Analytics Dashboard",
  theme = bs_theme(preset = "shiny"),
  fillable = TRUE,

  nav_panel(
    "Overview",
    layout_columns(
      col_widths = c(8, 4),

      # Main data table card
      card(
        full_screen = TRUE,
        card_header(
          "Sales Data",
          toolbar(
            align = "right",
            toolbar_input_select(
              id = "filter",
              label = "Filter",
              choices = c("All", "Active", "Inactive"),
              icon = icon("filter")
            ),
            toolbar_input_select(
              id = "sort",
              label = "Sort by",
              choices = c("Date", "Amount", "Customer"),
              icon = icon("sort")
            ),
            toolbar_divider(),
            toolbar_input_button(
              id = "refresh",
              label = "Refresh",
              icon = icon("arrows-rotate")
            ),
            toolbar_input_button(
              id = "export",
              label = "Export",
              icon = icon("download"),
              class = "btn-primary",
              show_label = TRUE
            )
          )
        ),
        card_body(
          tableOutput("sales_table")
        ),
        card_footer(
          toolbar(
            align = "left",
            "Showing 10 of 247 records"
          ),
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "update_filter_btn",
              label = "Update Filter Choices",
              icon = icon("wand-magic-sparkles"),
              show_label = TRUE
            ),
            toolbar_input_button(
              id = "update_export_btn",
              label = "Update Export Button",
              icon = icon("wand-magic-sparkles"),
              show_label = TRUE
            )
          )
        )
      ),

      # Stats card
      card(
        card_header(
          "Quick Stats",
          toolbar(
            align = "right",
            toolbar_input_select(
              id = "period",
              label = "Period",
              choices = c("Today", "Week", "Month", "Year"),
              selected = "Week",
              show_label = TRUE
            ),
            toolbar_divider(),
            toolbar_input_button(
              id = "stats_refresh",
              label = "Refresh",
              icon = icon("arrows-rotate")
            )
          )
        ),
        card_body(
          numericInput(
            "stats_threshold",
            label = toolbar(
              "Sales Threshold",
              toolbar_spacer(),
              toolbar_input_button(
                "threshold_decrease",
                label = "Decrease",
                icon = icon("minus")
              ),
              toolbar_input_button(
                "threshold_increase",
                label = "Increase",
                icon = icon("plus")
              )
            ),
            value = 1000,
            min = 0,
            max = 10000,
            step = 100
          ),
          verbatimTextOutput("stats")
        ),
        card_footer(
          toolbar(
            align = "left",
            toolbar_input_select(
              id = "stats_comparison",
              label = "Compare to",
              choices = c("Previous Period", "Last Year", "Budget"),
              show_label = TRUE
            )
          )
        )
      )
    ),

    layout_columns(
      col_widths = c(6, 6),

      # Chart card with view controls
      card(
        full_screen = TRUE,
        card_header(
          "Revenue Trend",
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "chart_type",
              label = "Bar",
              icon = icon("chart-bar"),
              tooltip = "Switch to Bar Chart"
            ),
            toolbar_divider(),
            popover(
              toolbar_input_button(
                id = "chart_settings",
                label = "Settings",
                icon = icon("sliders"),
                tooltip = FALSE,
                show_label = FALSE,
                title = "Settings"
              ),
              radioButtons(
                "color_scheme",
                "Color Scheme",
                choices = c(
                  "Blue" = "#0d6efd",
                  "Green" = "#198754",
                  "Purple" = "#6f42c1",
                  "Orange" = "#fd7e14",
                  "Red" = "#dc3545"
                ),
                selected = "#0d6efd",
                inline = TRUE
              )
            )
          )
        ),
        card_body(
          plotOutput("revenue_chart", height = "300px")
        )
      ),

      # Activity feed card
      card(
        full_screen = TRUE,
        card_header(
          "Recent Activity",
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "activity_refresh",
              label = "Refresh",
              icon = icon("rotate")
            ),
            toolbar_input_button(
              id = "activity_filter",
              label = "Filter",
              icon = icon("filter")
            )
          )
        ),
        card_body(
          uiOutput("activity_feed")
        ),
        card_footer(
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "view_all",
              label = "View All",
              show_label = TRUE
            )
          )
        )
      )
    )
  ),

  nav_panel(
    "Chat",
    layout_columns(
      col_widths = 12,
      card(
        full_screen = TRUE,
        card_header("Customer Support Chat"),
        card_body(
          min_height = "400px",
          uiOutput("chat_messages")
        ),
        card_footer(
          input_submit_textarea(
            "chat_input",
            placeholder = "Type your message here... (Cmd/Ctrl + Enter to send)",
            toolbar = toolbar(
              toolbar_input_button(
                "attach_file",
                icon = icon("paperclip"),
                label = "Attach"
              ),
              toolbar_input_button(
                "emoji",
                icon = icon("face-smile"),
                label = "Emoji"
              ),
              toolbar_divider(),
              toolbar_input_select(
                "message_format",
                label = "Format",
                choices = c("Plain", "Markdown", "HTML"),
                icon = icon("code")
              )
            )
          )
        )
      )
    )
  ),

  nav_panel(
    "Reports",
    layout_columns(
      col_widths = 12,

      # Monthly Sales Report
      card(
        full_screen = TRUE,
        card_header(
          "Q4 2024 Sales Report",
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "new_report",
              label = "New",
              icon = icon("file"),
              class = "btn-outline-success",
              show_label = TRUE
            ),
            toolbar_input_button(
              id = "open_report",
              label = "Open",
              icon = icon("folder-open")
            ),
            toolbar_divider(),
            toolbar_input_button(
              id = "save_report",
              label = "Save",
              icon = icon("save")
            ),
            toolbar_input_button(
              id = "print_report",
              label = "Print",
              icon = icon("print")
            ),
            toolbar_divider(),
            toolbar_input_button(
              id = "share_report",
              label = "Share",
              icon = icon("share-nodes"),
              show_label = TRUE,
              class = "btn-outline-primary",
              border = TRUE
            )
          )
        ),
        card_body(
          min_height = "500px",
          tags$div(
            style = "padding: 20px;",
            tags$h3("Executive Summary"),
            tags$p(
              "This report provides a comprehensive analysis of sales performance for Q4 2024, highlighting key trends, top-performing products, and regional performance metrics."
            ),

            tags$h4(style = "margin-top: 30px;", "Key Metrics"),
            tags$ul(
              tags$li(tags$strong("Total Revenue:"), " $2,847,392"),
              tags$li(tags$strong("Total Orders:"), " 1,247"),
              tags$li(tags$strong("Average Order Value:"), " $2,283"),
              tags$li(tags$strong("Year-over-Year Growth:"), " +18.5%")
            ),

            tags$h4(style = "margin-top: 30px;", "Top Products"),
            tableOutput("report_products"),

            tags$h4(style = "margin-top: 30px;", "Regional Performance"),
            plotOutput("report_regional_chart", height = "300px"),

            tags$h4(style = "margin-top: 30px;", "Recommendations"),
            tags$ol(
              tags$li(
                "Increase inventory for top-performing products to meet Q1 demand"
              ),
              tags$li("Focus marketing efforts on underperforming regions"),
              tags$li(
                "Implement customer retention programs to maintain growth momentum"
              )
            )
          )
        ),
        card_footer(
          toolbar(
            align = "left",
            tags$span(
              style = "color: #6c757d;",
              "Generated: ",
              format(Sys.time(), "%B %d, %Y at %I:%M %p")
            )
          ),
          toolbar(
            align = "right",
            toolbar_input_button(
              id = "add_chart",
              label = "Add Chart",
              icon = icon("chart-column"),
              class = "btn-info",
              show_label = TRUE
            ),
            toolbar_input_button(
              id = "add_table",
              label = "Add Table",
              icon = icon("table"),
              class = "btn-warning",
              show_label = TRUE
            ),
            toolbar_input_button(
              id = "add_text",
              label = "Add Text",
              icon = icon("paragraph"),
              class = "btn-danger",
              show_label = TRUE
            )
          )
        )
      )
    )
  )
)

server <- function(input, output, session) {
  # Chat messages storage
  chat_messages <- reactiveVal(list(
    list(
      text = "Welcome to customer support! How can we help you today?",
      from = "Agent",
      time = Sys.time()
    )
  ))

  # Sample data - larger dataset for filtering/sorting
  set.seed(123)
  sales_data <- data.frame(
    Date = rep(seq.Date(Sys.Date() - 29, Sys.Date(), by = "day"), each = 3),
    Customer = paste("Customer", rep(1:30, 3)),
    Amount = round(runif(90, 100, 1000), 2),
    Status = sample(
      c("Active", "Inactive"),
      90,
      replace = TRUE,
      prob = c(0.7, 0.3)
    )
  )

  # Chart type and color reactive values
  chart_type <- reactiveVal("line")
  chart_color <- reactiveVal("#0d6efd")

  # Chat message rendering
  output$chat_messages <- renderUI({
    messages <- chat_messages()

    tags$div(
      style = "display: flex; flex-direction: column; gap: 12px; padding: 15px;",
      lapply(messages, function(msg) {
        align <- if (msg$from == "You") "flex-end" else "flex-start"
        bg_color <- if (msg$from == "You") "#0d6efd" else "#6c757d"
        text_color <- "white"

        tags$div(
          style = sprintf("display: flex; justify-content: %s;", align),
          tags$div(
            style = sprintf(
              "max-width: 70%%; padding: 10px 15px; border-radius: 12px; background-color: %s; color: %s;",
              bg_color,
              text_color
            ),
            tags$div(
              style = "font-weight: 500; font-size: 0.85em; margin-bottom: 4px;",
              msg$from
            ),
            tags$div(msg$text),
            tags$div(
              style = "font-size: 0.75em; margin-top: 4px; opacity: 0.8;",
              format(msg$time, "%I:%M %p")
            )
          )
        )
      })
    )
  })

  # Handle chat message submission
  observeEvent(input$chat_input, {
    req(nchar(input$chat_input) > 0)

    # Add user message
    current_messages <- chat_messages()
    current_messages <- c(
      current_messages,
      list(list(text = input$chat_input, from = "You", time = Sys.time()))
    )

    # Simulate agent response
    agent_responses <- c(
      "I understand your concern. Let me help you with that.",
      "That's a great question! Here's what I found...",
      "Thank you for reaching out. I'll look into this right away.",
      "I appreciate your patience. Let me check our records.",
      "Got it! I'll process that for you now."
    )

    current_messages <- c(
      current_messages,
      list(list(
        text = sample(agent_responses, 1),
        from = "Agent",
        time = Sys.time() + 2
      ))
    )

    chat_messages(current_messages)

    # Clear the input
    update_submit_textarea("chat_input", value = "", focus = TRUE)
  })

  # Chat toolbar buttons
  observeEvent(input$attach_file, {
    show_toast(
      toast(
        "File attachment feature would open here",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$emoji, {
    show_toast(
      toast(
        "Emoji picker would open here",
        type = "info",
        duration_s = 2
      )
    )
  })

  # Threshold increment/decrement buttons
  observeEvent(input$threshold_increase, {
    updateNumericInput(
      session,
      "stats_threshold",
      value = input$stats_threshold + 100
    )
  })

  observeEvent(input$threshold_decrease, {
    updateNumericInput(
      session,
      "stats_threshold",
      value = input$stats_threshold - 100
    )
  })

  # Filter and sort sales data
  filtered_sales <- reactive({
    data <- sales_data

    # Apply status filter
    if (!is.null(input$filter) && input$filter != "All") {
      data <- data[data$Status == input$filter, ]
    }

    # Apply sorting
    if (!is.null(input$sort)) {
      data <- switch(
        input$sort,
        "Date" = data[order(data$Date, decreasing = TRUE), ],
        "Amount" = data[order(data$Amount, decreasing = TRUE), ],
        "Customer" = data[order(data$Customer), ],
        data
      )
    }

    data
  })

  output$sales_table <- renderTable({
    head(filtered_sales(), 10)
  })

  # Stats that update based on filter
  output$stats <- renderText({
    data <- filtered_sales()
    total_sales <- sum(data$Amount)
    avg_order <- mean(data$Amount)
    num_customers <- length(unique(data$Customer))

    paste(
      sprintf(
        "Total Sales: $%s",
        format(round(total_sales, 2), big.mark = ",")
      ),
      sprintf("Customers: %d", num_customers),
      sprintf("Avg Order: $%.2f", avg_order),
      sprintf("Records: %d", nrow(data)),
      sep = "\n"
    )
  })

  # Revenue chart with dynamic type and color
  output$revenue_chart <- renderPlot({
    dates <- seq.Date(Sys.Date() - 29, Sys.Date(), by = "day")
    revenue <- cumsum(runif(30, 500, 2000))

    if (chart_type() == "line") {
      plot(
        dates,
        revenue,
        type = "l",
        lwd = 3,
        col = chart_color(),
        xlab = "Date",
        ylab = "Revenue ($)",
        main = "30-Day Revenue Trend (Line)"
      )
      grid()
    } else {
      barplot(
        revenue,
        names.arg = format(dates, "%m/%d"),
        col = chart_color(),
        border = NA,
        xlab = "Date",
        ylab = "Revenue ($)",
        main = "30-Day Revenue Trend (Bar)",
        las = 2,
        cex.names = 0.7
      )
      grid(nx = NA, ny = NULL)
    }
  })

  output$activity_feed <- renderUI({
    activities <- c(
      "New order #1234 received",
      "Customer John Doe registered",
      "Payment processed: $450.00",
      "Report generated: Monthly Summary",
      "User Jane Smith updated profile"
    )

    tags$div(
      lapply(activities, function(activity) {
        tags$div(
          style = "padding: 8px; border-bottom: 1px solid #dee2e6;",
          tags$small(class = "text-muted", format(Sys.time(), "%H:%M")),
          tags$span(style = "margin-left: 10px;", activity)
        )
      })
    )
  })

  # Chart type toggle buttons
  observeEvent(input$chart_type, {
    new_type <- if (input$chart_type %% 2 == 0) "line" else "bar"
    chart_type(new_type)

    update_toolbar_input_button(
      "chart_type",
      label = if (new_type == "line") "Bar Chart" else "Line Chart",
      icon = if (new_type == "line") icon("chart-bar") else icon("chart-line")
    )
    update_tooltip(
      "chart_type-tooltip",
      paste("Switch to", if (new_type == "line") "Bar Chart" else "Line Chart")
    )
  })

  # Data refresh button
  observeEvent(input$refresh, {
    show_toast(
      toast(
        "Data refreshed!",
        type = "info",
        duration_s = 2
      )
    )
  })

  # Update filter select button - changes icon, label, and choices
  observeEvent(input$update_filter_btn, {
    update_toolbar_input_select(
      "filter",
      label = "Status",
      icon = icon("circle-check"),
      choices = c("All", "Approved", "Pending", "Rejected"),
      selected = "All"
    )
    show_toast(
      toast(
        "Filter updated with new icon, label, and choices!",
        type = "success",
        duration_s = 3
      )
    )
  })

  # Update export button - changes icon and label
  observeEvent(input$update_export_btn, {
    update_toolbar_input_button(
      "export",
      label = "Download CSV",
      icon = icon("file-csv")
    )
    show_toast(
      toast(
        "Export button updated with new icon and label!",
        type = "success",
        duration_s = 3
      )
    )
  })

  # Data refresh button
  observeEvent(input$share_data, {
    show_toast(
      toast(
        "Magical sharing button clicked!",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$export, {
    show_toast(
      toast(
        "Exporting data to CSV...",
        type = "info",
        duration_s = 2
      )
    )
  })

  # Pagination
  observeEvent(input$prev_page, {
    show_toast(
      toast(
        "Previous page",
        type = "info",
        duration_s = 1
      )
    )
  })

  observeEvent(input$next_page, {
    show_toast(
      toast(
        "Next page",
        type = "info",
        duration_s = 1
      )
    )
  })

  # Apply settings from popover
  observe({
    chart_color(input$color_scheme)
  })

  # Activity feed controls
  observeEvent(input$activity_refresh, {
    show_toast(
      toast(
        "Activity refreshed!",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$activity_filter, {
    show_toast(
      toast(
        "Opening activity filter...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$view_all, {
    show_toast(
      toast(
        "Opening full activity log...",
        type = "info",
        duration_s = 2
      )
    )
  })

  # Report builder
  observeEvent(input$new_report, {
    show_toast(
      toast(
        "Creating new report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$open_report, {
    show_toast(
      toast(
        "Opening report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$save_report, {
    show_toast(
      toast(
        "Report saved!",
        type = "success",
        duration_s = 2
      )
    )
  })

  observeEvent(input$print_report, {
    show_toast(
      toast(
        "Printing report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$share_report, {
    show_toast(
      toast(
        "This is where you'd add logic to share the report.",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$add_chart, {
    show_toast(
      toast(
        "Adding chart to report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$add_table, {
    show_toast(
      toast(
        "Adding table to report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  observeEvent(input$add_text, {
    show_toast(
      toast(
        "Adding text block to report...",
        type = "info",
        duration_s = 2
      )
    )
  })

  # Report data
  output$report_products <- renderTable(
    {
      data.frame(
        Product = c(
          "Enterprise License",
          "Pro Subscription",
          "Basic Package",
          "Consulting Services",
          "Training Program"
        ),
        Revenue = c("$847,200", "$623,400", "$412,800", "$589,392", "$374,600"),
        Units = c(354, 1247, 2064, 89, 156),
        Growth = c("+23%", "+18%", "+12%", "+31%", "+8%")
      )
    },
    striped = TRUE
  )

  output$report_regional_chart <- renderPlot({
    regions <- c(
      "North America",
      "Europe",
      "Asia Pacific",
      "Latin America",
      "Middle East"
    )
    revenue <- c(1200000, 850000, 620000, 120000, 57392)

    barplot(
      revenue / 1000,
      names.arg = regions,
      col = "#0d6efd",
      border = NA,
      ylab = "Revenue ($1000s)",
      main = "Q4 2024 Revenue by Region",
      las = 2,
      cex.names = 0.8
    )
    grid(nx = NA, ny = NULL)
  })
}

shinyApp(ui = ui, server = server)
