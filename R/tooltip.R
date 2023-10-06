#' Add a tooltip to a UI element
#'
#' Display additional information when focusing (or hovering over) a UI element.
#'
#' @param trigger A UI element (i.e., [htmltools tag][htmltools::tags]) to serve
#'   as the tooltip trigger. If `trigger` renders as multiple HTML
#'   elements (e.g., it's a `tagList()`), the last HTML element is used for the
#'   trigger. If the `trigger` should contain all of those elements, wrap the
#'   object in a [div()] or [span()].
#' @param ... UI elements for the tooltip. Character strings are [automatically
#'   escaped][htmlEscape()] unless marked as [HTML()].
#' @param id A character string. Required to re-actively respond to the
#'   visibility of the tooltip (via the `input[[id]]` value) and/or update the
#'   visibility/contents of the tooltip.
#' @param placement The placement of the tooltip relative to its trigger.
#' @param options A list of additional [options](https://getbootstrap.com/docs/5.3/components/tooltips/#options).
#'
#' @section Theming/Styling:
#'
#'   ```{r child="man/fragments/tooltip-popover_theming.Rmd", el="tooltip"}
#'   ```
#'
#'   ```
#'   tooltip(
#'     "Trigger", "Tooltip message",
#'     options = list(customClass = "my-tip")
#'   )
#'   ```
#'
#'   And then add relevant rules to [bs_theme()] via [bs_add_rules()]:
#'
#'   ```
#'   bs_theme() |> bs_add_rules(".my-tip { max-width: none; }")
#'   ```
#'
#' @section Accessibility of Tooltip Triggers:
#'
#'   ```{r child="man/fragments/tooltip-popover_a11y-trigger.Rmd", el = "tooltip"}
#'   ```
#'
#'   ```r
#'   tooltip(
#'     bsicons::bs_icon("info-circle", title = "About tooltips."),
#'     "Text shown in the tooltip."
#'   )
#'   ```
#'
#' @describeIn tooltip Add a tooltip to a UI element
#' @references <https://getbootstrap.com/docs/5.3/components/tooltips/>
#' @export
#' @seealso [popover()]
#' @examplesIf interactive()
#'
#' tooltip(
#'   shiny::actionButton("btn", "A button"),
#'   "A message"
#' )
#'
#' card(
#'   card_header(
#'     tooltip(
#'       span("Card title ", bsicons::bs_icon("question-circle-fill")),
#'       "Additional info",
#'       placement = "right"
#'     )
#'   ),
#'   "Card body content..."
#' )
tooltip <- function(
  trigger,
  ...,
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

  bad_opts <- intersect(c("title", "placement"), names(options))
  if (length(bad_opts) > 0) {
    rlang::abort(
      sprintf("The `%s` option cannot be specified directly.", bad_opts[1])
    )
  }

  res <- web_component(
    "bslib-tooltip",
    id = id,
    placement = rlang::arg_match(placement),
    bsOptions = to_json(options),
    !!!attribs,
    # Use <template> as a way to protect these children from potentially being
    # pulled outside this element (the browser's parser does this to, for
    # example, block elements inside a <p> tag)
    tags$template(!!!children),
    trigger
  )

  res <- tag_require(res, version = 5, caller = "tooltip()")
  as_fragment(res)
}

#' @describeIn tooltip Programmatically show/hide a tooltip.
#'
#' @param id a character string that matches an existing tooltip id.
#' @param show Whether to show (`TRUE`) or hide (`FALSE`) the tooltip. The
#'   default (`NULL`) will show if currently hidden and hide if currently shown.
#'   Note that a tooltip will not be shown if the trigger is not visible (e.g.,
#'   it's hidden behind a tab).
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @export
toggle_tooltip <- function(id, show = NULL, session = get_current_session()) {
  show <- normalize_show_value(show)

  msg <- list(method = "toggle", value = show)
  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}


#' @describeIn tooltip Update the contents of a tooltip.
#' @export
update_tooltip <- function(id, ..., session = get_current_session()) {

  title <- tagList(...)

  msg <- dropNulls(list(
    method = "update",
    title = if (length(title) > 0) processDeps(title, session)
  ))

  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}

normalize_show_value <- function(show) {
  if (is.null(show)) return("toggle")

  if (length(show) != 1 || !is.logical(show)) {
    abort("`show` must be `TRUE`, `FALSE`, or `NULL`.")
  }

  if (show) "show" else "hide"
}


to_json <- function(..., auto_unbox = TRUE, null = "null") {
  jsonlite::toJSON(..., auto_unbox = auto_unbox, null = null)
}
