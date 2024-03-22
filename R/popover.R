#' Add a popover to a UI element
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' Display additional information when clicking on a UI element (typically a
#' button).
#'
#' @param trigger The UI element to serve as the popover trigger (typically a
#'   [shiny::actionButton()] or similar). If `trigger` renders as multiple HTML
#'   elements (e.g., it's a `tagList()`), the last HTML element is used for the
#'   trigger. If the `trigger` should contain all of those elements, wrap the
#'   object in a [div()] or [span()].
#' @param ... UI elements for the popover's body. Character strings are
#'   [automatically escaped][htmlEscape()] unless marked as [HTML()].
#' @param title A title (header) for the popover. To remove a header
#'   with `update_popover()`, provide a either an empty string or `character(0)`.
#' @param id A character string. Required to re-actively respond to the
#'   visibility of the popover (via the `input[[id]]` value) and/or update the
#'   visibility/contents of the popover.
#' @param placement The placement of the popover relative to its trigger.
#' @param options A list of additional
#'   [options](https://getbootstrap.com/docs/5.3/components/popovers/#options).
#'
#' @section Closing popovers:
#'
#'   In addition to clicking the `close_button`, popovers can be closed by
#'   pressing the Esc/Space key when the popover (and/or its trigger) is
#'   focused.
#'
#' @section Theming/Styling:
#'
#'   ```{r child="man/fragments/tooltip-popover_theming.Rmd", el = "popover"}
#'   ```
#'
#'   ```
#'   popover(
#'     "Trigger", "Popover message",
#'     options = list(customClass = "my-pop")
#'   )
#'   ```
#'
#'   And then add relevant rules to [bs_theme()] via [bs_add_rules()]:
#'
#'   ```
#'   bs_theme() |> bs_add_rules(".my-pop { max-width: none; }")
#'   ```
#'
#' @section Accessibility of Popover Triggers:
#'
#'   ```{r child="man/fragments/tooltip-popover_a11y-trigger.Rmd", el = "popover"}
#'   ```
#'
#'   ```r
#'   popover(
#'     bsicons::bs_icon("gear", title = "Settings"),
#'     title = "Settings",
#'     sliderInput("n", "Number of points", 1, 100, 50)
#'   )
#'   ```
#'
#'   ```r
#'   popover(
#'     fontawesome::fa("gear", a11y = "sem", title = "Settings"),
#'     title = "Settings",
#'     sliderInput("n", "Number of points", 1, 100, 50)
#'   )
#'   ```
#'
#' @describeIn popover Add a popover to a UI element
#'
#' @export
#' @family Components
#'
#' @references Popovers are based on [Bootstrap's Popover
#'   component](https://getbootstrap.com/docs/5.3/components/popovers/). See the
#'   bslib website for an [interactive introduction to tooltips and
#'   popovers](https://rstudio.github.io/bslib/articles/tooltips-popovers/index.html).
#'
#' @seealso [tooltip()] provides an alternative way to display informational
#'   text on demand, typically when focusing or hovering over a trigger element.
#'
#' @examplesIf rlang::is_interactive()
#'
#' popover(
#'   shiny::actionButton("btn", "A button"),
#'   "Popover body content...",
#'   title = "Popover title"
#' )
#'
#' library(shiny)
#'
#' ui <- page_fixed(
#'   card(class = "mt-5",
#'     card_header(
#'       popover(
#'         uiOutput("card_title", inline = TRUE),
#'         title = "Provide a new title",
#'         textInput("card_title", NULL, "An editable title")
#'       )
#'     ),
#'     "The card body..."
#'   )
#' )
#'
#' server <- function(input, output) {
#'   output$card_title <- renderUI({
#'     list(input$card_title, bsicons::bs_icon("pencil-square"))
#'   })
#' }
#'
#' shinyApp(ui, server)
popover <- function(
  trigger,
  ...,
  title = NULL,
  id = NULL,
  placement = c("auto", "top", "right", "bottom", "left"),
  options = list()
) {

  args <- separate_arguments(...)
  children <- args$children
  attribs <- args$attribs

  if (length(children) == 0) {
    abort("At least one value must be provided to `...`.")
  }

  bad_opts <- intersect(c("content", "title", "placement"), names(options))
  if (length(bad_opts) > 0) {
    rlang::abort(
      sprintf("The `%s` option cannot be specified directly.", bad_opts[1])
    )
  }

  res <- web_component(
    "bslib-popover",
    id = id,
    placement = rlang::arg_match(placement),
    bsOptions = to_json(options),
    !!!attribs,
    # Use <template> as a way to protect these children from potentially being
    # pulled outside this element (the browser's parser does this to, for
    # example, block elements inside a <p> tag)
    tags$template(
      div(!!!children, style = "display:contents;"),
      div(title, style = "display:contents;")
    ),
    trigger
  )

  res <- tag_require(res, version = 5, caller = "popover()")
  as_fragment(res)
}

#' @describeIn popover Programmatically show/hide a popover.
#'
#' @param show Whether to show (`TRUE`) or hide (`FALSE`) the popover. The
#'   default (`NULL`) will show if currently hidden and hide if currently shown.
#'   Note that a popover will not be shown if the trigger is not visible (e.g.,
#'   it's hidden behind a tab).
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @export
toggle_popover <- function(id, show = NULL, session = get_current_session()) {
  show <- normalize_show_value(show)

  msg <- list(method = "toggle", value = show)
  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}

#' @describeIn popover Update the contents of a popover.
#' @export
update_popover <- function(id, ..., title = NULL, session = get_current_session()) {

  body <- tagList(...)

  msg <- dropNulls(list(
    method = "update",
    content = if (length(body) > 0) processDeps(body, session),
    header = if (!is.null(title)) processDeps(title, session)
  ))

  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}
