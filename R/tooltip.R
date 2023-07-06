#' Add a tooltip to a UI element
#'
#' Tooltips are useful for showing additional information when focusing (or
#' hovering over) a UI element.
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags]. Named arguments become HTML attributes on returned
#'   UI element. Attributes starting with `data-bs-*` may be supplied to further
#'   customize [tooltip
#'   options](https://getbootstrap.com/docs/5.3/components/tooltips/).
#' @param body Content to display in the tooltip.
#' @param placement The placement of the tooltip relative to the target element.
#' @param html Whether to treat `body` as HTML. WARNING: setting this `TRUE`
#'   when the `body` is a function of user `inputs` is dangerous and not
#'   recommended.
#' @param sanitize Whether to sanitize HTML (only relevant when `html = TRUE`).
#'   This can be useful if `body` is a function of user `inputs`, but should
#'   also be treated as HTML.
#' @param id If provided, you can use `input$id` in your server logic to
#'   determine whether the tooltip is currently shown/hidden.
#'
#' @details If multiple UI elements are provided to `...`, the last element is
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
#'   body = "A message"
#' )
#'
#' card(
#'   card_header(
#'     tooltip(
#'       span("Card title ", bsicons::bs_icon("question-circle-fill")),
#'       body = "Additional info",
#'       placement = "right"
#'     )
#'   ),
#'   "Card body content..."
#' )
tooltip <- function(
  ...,
  body = "Tooltip",
  placement = c("auto", "top", "right", "bottom", "left"),
  html = FALSE,
  sanitize = FALSE,
  id = NULL
) {

  res <- web_component(
    "bslib-tooltip",
    placement = rlang::arg_match(placement),
    html = if (html) NA,
    sanitize = if (sanitize) NA,
    id = id,
    # Use display:none instead of <template> since shiny.js
    # doesn't bind to the contents of the latter
    div(body, style = "display:none;"),
    ...
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


#' @describeIn tooltip Update the `body` of a tooltip.
#' @export
tooltip_update <- function(id, body = NULL, session = get_current_session()) {

  msg <- dropNulls(list(
    method = "update",
    title = if (!is.null(body)) processDeps(body, session)
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
