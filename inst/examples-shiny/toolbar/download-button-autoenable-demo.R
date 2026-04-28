library(shiny)
library(bslib)

# Demonstrates the three enabled modes for toolbar_download_button().
#
# enabled = "auto"  (default): starts disabled; Shiny auto-enables once
#                              downloadHandler initializes. User can re-disable
#                              via update_toolbar_download_button().
# enabled = TRUE:              starts enabled immediately (before server connects).
# enabled = FALSE:             starts disabled; Shiny never auto-enables.
#                              update_toolbar_download_button() has full control.

ui <- page_fluid(
  theme = bs_theme(preset = "shiny"),
  h2("toolbar_download_button() — enabled modes"),
  layout_columns(
    col_widths = c(4, 4, 4),

    card(
      card_header(
        "enabled = \"auto\" (default)",
        toolbar(
          align = "right",
          toolbar_download_button("dl_auto", label = "Download")
        )
      ),
      card_body(
        p("Starts disabled. Shiny auto-enables once the server initializes."),
        p("The toggle button re-disables/re-enables via ",
          code("update_toolbar_download_button()"), "."),
        actionButton("toggle_auto", "Disable", class = "btn-sm btn-secondary mt-1")
      )
    ),

    card(
      card_header(
        "enabled = TRUE",
        toolbar(
          align = "right",
          toolbar_download_button("dl_true", label = "Download", enabled = TRUE)
        )
      ),
      card_body(
        p("Starts enabled immediately — before the server connects."),
        p("Useful when the download is always available.")
      )
    ),

    card(
      card_header(
        "enabled = FALSE",
        toolbar(
          align = "right",
          toolbar_download_button("dl_false", label = "Download", enabled = FALSE)
        )
      ),
      card_body(
        p("Starts disabled. Shiny will ", strong("never"), " auto-enable it."),
        p(code("update_toolbar_download_button()"), " has full control."),
        actionButton("enable_false",  "Enable",  class = "btn-sm btn-primary mt-1"),
        actionButton("disable_false", "Disable", class = "btn-sm btn-secondary mt-1")
      )
    )
  )
)

server <- function(input, output, session) {
  make_handler <- function(id) {
    downloadHandler(
      filename = function() paste0(id, ".csv"),
      content  = function(file) write.csv(iris, file, row.names = FALSE)
    )
  }

  output$dl_auto  <- make_handler("dl_auto")
  output$dl_true  <- make_handler("dl_true")
  output$dl_false <- make_handler("dl_false")

  auto_disabled <- reactiveVal(FALSE)
  observeEvent(input$toggle_auto, {
    auto_disabled(!auto_disabled())
    update_toolbar_download_button("dl_auto", disabled = auto_disabled())
    updateActionButton(session, "toggle_auto",
      label = if (auto_disabled()) "Enable" else "Disable")
  })

  observeEvent(input$enable_false,  {
    update_toolbar_download_button("dl_false", disabled = FALSE)
  })
  observeEvent(input$disable_false, {
    update_toolbar_download_button("dl_false", disabled = TRUE)
  })
}

shinyApp(ui, server)
