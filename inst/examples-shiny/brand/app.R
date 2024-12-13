library(shiny)
pkgload::load_all()
# library(bslib)
library(ggplot2)

options(bslib.color_contrast_warnings = FALSE)

if (!file.exists("Monda.ttf")) {
	download.file(
		"https://github.com/google/fonts/raw/48db77e32954f6f5e65a7122ecbe8a2093c4f5d7/ofl/monda/Monda%5Bwght%5D.ttf",
		"Monda.ttf"
	)
	download.file(
		"https://github.com/google/fonts/raw/48db77e32954f6f5e65a7122ecbe8a2093c4f5d7/ofl/monda/OFL.txt",
		"Monda-OFL.txt"
	)
}

theme_brand <- bs_theme(brand = TRUE)

brand <- attr(theme_brand, "brand")

theme_set(theme_minimal())

if (requireNamespace("thematic", quietly = TRUE)) {
	if (!is.null(brand)) {
		thematic::thematic_shiny(font = bslib:::b_get(brand, "typography", "base", "family"))
	} else {
		thematic::thematic_shiny()
	}
}

ui <- page_navbar(
	theme = bs_add_rules(theme_brand, readLines("_colors.scss")),

	nav_panel(
		"Input Output Demo",
		layout_sidebar(
			sidebar = sidebar(
				sliderInput("slider1", "Numeric Slider Input", 0, 11, 11),
				numericInput("numeric1", "Numeric Input Widget", 30),
				dateInput("date1", "Date Input Component", value = "2024-01-01"),
				input_switch("switch1", "Binary Switch Input", value = TRUE),
				radioButtons(
					"radio1",
					"Radio Button Group",
					choices = c("Option A", "Option B", "Option C", "Option D")
				),
				actionButton("action1", "Action Button")
			),
			shiny::useBusyIndicators(),
			layout_column_wrap(
				value_box(
					title = "Metric 1",
					value = "100",
					theme = "primary",
					id = "value_box_one"
				),
				value_box(
					title = "Metric 2",
					value = "200",
					theme = "secondary",
					id = "value_box_two"
				),
				value_box(
					title = "Metric 3",
					value = "300",
					theme = "info",
					id = "value_box_three"
				)
			),
			card(
				card_header("Plot Output"),
				plotOutput("out_plot")
			),
			card(
				card_header("Text Output"),
				verbatimTextOutput("out_text")
			)
		)
	),

	nav_panel(
		"Widget Gallery",
		layout_column_wrap(
			width = 300,
			heights_equal = "row",
			card(
				card_header("Button Variants"),
				actionButton("btn_default", "Default"),
				actionButton("btn_primary", "Primary", class = "btn-primary"),
				actionButton("btn_secondary", "Secondary", class = "btn-secondary"),
				actionButton("btn_success", "Success", class = "btn-success"),
				actionButton("btn_danger", "Danger", class = "btn-danger"),
				actionButton("btn_warning", "Warning", class = "btn-warning"),
				actionButton("btn_info", "Info", class = "btn-info")
			),
			card(
				card_header("Radio Button Examples"),
				radioButtons(
					"radio2",
					"Standard Radio Group",
					choices = c("Selection 1", "Selection 2", "Selection 3")
				),
				radioButtons(
					"radio3",
					"Inline Radio Group",
					choices = c("Option 1", "Option 2", "Option 3"),
					inline = TRUE
				)
			),
			card(
				card_header("Checkbox Examples"),
				checkboxGroupInput(
					"check1",
					"Standard Checkbox Group",
					choices = c("Item 1", "Item 2", "Item 3")
				),
				checkboxGroupInput(
					"check2",
					"Inline Checkbox Group",
					choices = c("Choice A", "Choice B", "Choice C"),
					inline = TRUE
				)
			),
			card(
				card_header("Select Input Widgets"),
				selectizeInput(
					"select1",
					"Selectize Input",
					choices = c("Selection A", "Selection B", "Selection C")
				),
				selectInput(
					"select2",
					"Multiple Select Input",
					choices = c("Item X", "Item Y", "Item Z"),
					multiple = TRUE
				)
			),
			card(
				card_header("Text Input Widgets"),
				textInput("text1", "Text Input"),
				textAreaInput(
					"textarea1",
					"Text Area Input",
					value = "Default text content for the text area widget"
				),
				passwordInput("password1", "Password Input")
			)
		)
	),

	nav_panel(
		"Colors",
		div(
			class = "container-sm overflow-y-auto",
			uiOutput("ui_colors")
		)
	),

	nav_panel(
		"Documentation",
		div(
			class = "container-sm overflow-y-auto",
			includeMarkdown("documentation.md") # Assuming you've saved the markdown in a file
		)
	),

	nav_spacer(),
	nav_item(
		input_dark_mode(id = "color_mode")
	),

	title = "brand.yml Demo",
	fillable = TRUE
)


server <- function(input, output, session) {
	output$out_plot <- renderPlot({
		x <- seq(0, debounce(reactive(input$numeric1), 500)(), length.out = 100)
		y <- sin(x) * debounce(reactive(input$slider1), 500)()
		
		Sys.sleep(3)

		df <- data.frame(x = x, y = y)

		ggplot(df, aes(x = x, y = y)) +
			geom_col(width = 1, position = "identity") +
			labs(title = "Sine Wave Output", x = "", y = "")
	})

	output$out_text <- renderText({
		"example_function <- function() {\n  return(\"Function output text\")\n}"
	})

	output$ui_colors <- renderUI({
		bootstrap_colors <- c(
			"blue",
			"indigo",
			"purple",
			"pink",
			"red",
			"orange",
			"yellow",
			"green",
			"teal",
			"cyan"
		)
		colors <- c("gray", bootstrap_colors)

		tagList(
			layout_columns(
				col_widths = 3,
				class = "font-monospace",
				!!!lapply(
					c(
						"primary",
						"secondary",
						"dark",
						"light",
						"info",
						"success",
						"warning",
						"danger"
					),
					function(color) {
						div(
							color,
							class = paste0("p-3 mb-2 position-relative text-bg-", color)
						)
					}
				)
			),
			layout_columns(
				col_widths = 3,
				class = "font-monospace",
				!!!lapply(
					c("black", "white", "foreground", "background"),
					function(color) {
						div(
							color,
							class = paste0("p-3 mb-2 position-relative bd-", color)
						)
					}
				)
			),
			layout_column_wrap(
				width = 200,
				!!!lapply(colors, function(color) {
					if (!color %in% c("white", "black")) {
						div(
							class = "mb-3",
							div(
								color,
								class = paste0("p-3 mb-2 position-relative bd-", color, "-500")
							),
							lapply(seq(100, 900, 100), function(r) {
								div(
									paste0(color, "-", r),
									class = paste0("p-3 bd-", color, "-", r)
								)
							})
						)
					}
				})
			)
		)
	})
}

shinyApp(ui, server)
