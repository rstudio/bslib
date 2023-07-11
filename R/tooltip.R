#' Add a tooltip to a UI element
#'
#' Tooltips are useful for showing additional information when focusing (or
#' hovering over) a UI element.
#'
#' @param trigger A UI element (i.e., [htmltools tag][htmltools::tags]) to serve as the
#'   tooltips trigger. It's good practice for this element to be a keyboard-focusable
#'   and interactive element (e.g., `actionButton()`, `actionLink()`, etc) so that
#'   the tooltip is accessible to keyboard and assistive technology users.
#' @param ... UI elements for the tooltip. Character strings are automatically
#'   [htmlEscape()]d unless marked as [HTML()].
#' @param id If provided, you can use `input$id` in your server logic to
#'   determine whether the tooltip is currently shown/hidden.
#' @param placement The placement of the tooltip relative to its trigger.
#' @param options A list of additional [Bootstrap options](https://getbootstrap.com/docs/5.3/components/tooltips/#options).
#'
#' @details If `x` yields multiple HTML elements, the last element is
#' used as the tooltip's target. If the target should contain multiple elements,
#' then wrap those elements in a [span()] or [div()].
#'
#' @describeIn tooltip Add a tooltip to a UI element
#' @references <https://getbootstrap.com/docs/5.3/components/tooltips/>
#' @export
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
    trigger, ..., id = NULL,
    placement = c("auto", "top", "right", "bottom", "left"),
    options = list()
  ) {

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  children <- args[!nzchar(argnames)]
  attribs <- args[nzchar(argnames)]

  #if (length(attribs) > 0) {
  #  abort(c(
  #    paste0("Unknown named argument: '", names(attribs)[1], "'."),
  #    "i" = "Did you intend to pass it to `options`?"
  #  ))
  #}

  res <- web_component(
    "bslib-tooltip",
    id = id,
    placement = rlang::arg_match(placement),
    options = jsonlite::toJSON(options),
    !!!attribs,
    # Use display:none instead of <template> since shiny.js
    # doesn't bind to the contents of the latter
    div(!!!children, style = "display:none;"),
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
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @export
tooltip_toggle <- function(id, show = NULL, session = get_current_session()) {
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
tooltip_update <- function(id, ..., session = get_current_session()) {

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

# TODO: worth it?
# tooltip_disable <- function(id) {}
# tooltip_enable <- function(id) {}


normalize_show_value <- function(show) {
  if (is.null(show)) return("toggle")

  if (length(show) != 1 || !is.logical(show)) {
    abort("`show` must be `TRUE`, `FALSE`, or `NULL`.")
  }

  if (show) "show" else "hide"
}
