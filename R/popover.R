#' Add a popover to a UI element
#'
#' Display additional information when clicking on a UI element (typically a
#' button).
#'
#' @param trigger The UI element to serve as the popover trigger (typically a
#'   [shiny::actionButton()] or similar).
#' @param ... UI elements for the popover's body. Character strings are
#'   [automatically escaped][htmlEscape()] unless marked as [HTML()].
#' @param title A title (header) for the popover.
#' @param id A character string. Required to re-actively respond to the
#'   visibility of the popover (via the `input[[id]]` value) and/or update the
#'   visibility/contents of the popover.
#' @param placement The placement of the popover relative to its trigger.
#' @param close_button Whether to include a close button in the popover.
#' @param options A list of additional
#'   [options](https://getbootstrap.com/docs/5.3/components/popovers/#options).
#'
#' @details If `trigger` yields multiple HTML elements (e.g., a `tagList()` or
#'   complex `{htmlwidgets}` object), the last HTML element is used as the
#'   trigger. If the `trigger` should contain all of those elements, wrap the
#'   object in a [div()] or [span()].
#'
#' @section Closing popovers In addition to clicking the `close_button`,
#'   popovers can be closed by pressing the escape key when the popover (and/or
#'   its trigger) is focused.
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
#' # TODO: example of popover with input in a card header
popover <- function(
  trigger,
  ...,
  title = NULL,
  id = NULL,
  placement = c("auto", "top", "right", "bottom", "left"),
  close_button = TRUE,
  options = list()
) {

  args <- separate_arguments(...)
  children <- args$children
  attribs <- args$attribs

  if (length(children) == 0) {
    abort("At least one value must be provided to `...`.")
  }

  res <- web_component(
    "bslib-popover",
    id = id,
    placement = rlang::arg_match(placement),
    closeButton = if (close_button) NA,
    bsOptions = jsonlite::toJSON(options, auto_unbox = TRUE),
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
#' @param id a character string that matches an existing popover id.
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
    title = if (length(title) > 0) processDeps(title, session)
  ))

  force(id)
  callback <- function() {
    session$sendInputMessage(id, msg)
  }
  session$onFlush(callback, once = TRUE)
}
