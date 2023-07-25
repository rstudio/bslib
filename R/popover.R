#' Add a popover to a UI element
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
#' @param title A title (header) for the popover.
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
#'   Like other bslib components, popovers can be themed by supplying [relevant
#'   theming
#'   variables](https://rstudio.github.io/bslib/articles/bs5-variables.html#popover-bg)
#'   to [bs_theme()], which effects styling of every popover on the page. To
#'   style a _specific_ popover differently from other popovers, utilize the
#'   `customClass` option:
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
#' @describeIn popover Add a popover to a UI element
#' @references <https://getbootstrap.com/docs/5.3/components/popovers/>
#' @export
#' @seealso [tooltip()]
#' @examplesIf interactive()
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

  if ("trigger" %in% names(options)) {
    rlang::abort("The `trigger` option is not currently supported.")
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
    # Use display:none instead of <template> since shiny.js
    # doesn't bind to the contents of the latter
    div(
      style = "display:none;",
      div(!!!children),
      div(title)
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
    header = if (length(title) > 0) processDeps(title, session)
  ))

  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}
