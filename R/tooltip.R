#' Add a tooltip to a UI element
#'
#' Display additional information when focusing (or hovering over) a UI element.
#'
#' @param trigger A UI element (i.e., [htmltools tag][htmltools::tags]) to serve
#'   as the tooltips trigger. It's good practice for this element to be a
#'   keyboard-focusable and interactive element (e.g., `actionButton()`,
#'   `actionLink()`, etc) so that the tooltip is accessible to keyboard and
#'   assistive technology users.
#' @param ... UI elements for the tooltip. Character strings are [automatically
#'   escaped][htmlEscape()] unless marked as [HTML()].
#' @param id A character string. Required to re-actively respond to the
#'   visibility of the tooltip (via the `input[[id]]` value) and/or update the
#'   visibility/contents of the tooltip.
#' @param placement The placement of the tooltip relative to its trigger.
#' @param options A list of additional [Bootstrap
#'   options](https://getbootstrap.com/docs/5.3/components/tooltips/#options).
#'
#' @details If `trigger` yields multiple HTML elements (e.g., a `tagList()` or
#'   complex `{htmlwidgets}` object), the last HTML element is used as the
#'   trigger. If the `trigger` should contain all of those elements, wrap the
#'   object in a [div()] or [span()].
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

  res <- web_component(
    "bslib-tooltip",
    id = id,
    placement = rlang::arg_match(placement),
    bsOptions = jsonlite::toJSON(options, auto_unbox = TRUE),
    !!!attribs,
    # Use display:none instead of <template> since shiny.js
    # doesn't bind to the contents of the latter
    div(
      style = "display:none;",
      div(!!!children)
    ),
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
