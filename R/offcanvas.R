#' Offcanvas panels
#'
#' @description
#' An offcanvas is a panel that slides in from an edge of the viewport, built on
#' [Bootstrap 5's offcanvas
#' component](https://getbootstrap.com/docs/5.3/components/offcanvas/). It can be
#' used in three ways:
#'
#' 1. **With a trigger in the UI.** Pass a `trigger` element (e.g. a button);
#'    clicking it reveals the panel.
#' 2. **Controlled from the server.** Give the panel an `id`, place it in the UI,
#'    then reveal or hide it with [show_offcanvas()], [hide_offcanvas()], or
#'    [toggle_offcanvas()].
#' 3. **Defined and revealed entirely from the server.** Build the panel in the
#'    server function and pass it to [show_offcanvas()].
#'
#' @section Lifecycle:
#'
#'   The `id` is the switch that governs whether the panel persists:
#'
#'   * **With an `id`**, the panel persists in the DOM after it is hidden, so it
#'     can be shown again cheaply and any interactive Shiny content inside keeps
#'     its state. Its open/closed state is reactively available as `input[[id]]`.
#'   * **Without an `id`**, a panel shown via [show_offcanvas()] is removed from
#'     the DOM when hidden (its inner inputs are unbound). This keeps anonymous
#'     reveals from accumulating, and means input IDs used inside the panel can be
#'     reused on later reveals.
#'
#'   Multiple offcanvas panels can be open at the same time.
#'
#' @param ... Body content of the offcanvas, making up the scrollable
#'   `.offcanvas-body`. Named arguments become HTML attributes on the offcanvas
#'   container.
#' @param title Optional title for the offcanvas header. A string or arbitrary
#'   tags. A dismiss button is placed alongside it unless `close_button = FALSE`.
#' @param footer Optional content pinned to the bottom of the panel. A string or
#'   arbitrary tags.
#' @param id Optional unique identifier. Required to (1) reactively respond to the
#'   panel's visibility via `input[[id]]`, (2) control it from the server with
#'   [show_offcanvas()] / [hide_offcanvas()] / [toggle_offcanvas()], and (3) keep
#'   the panel in the DOM after it is hidden (see Lifecycle). If `NULL`, an id is
#'   generated when the panel is shown via [show_offcanvas()].
#' @param trigger Optional UI element (e.g. a [shiny::actionButton()] or
#'   [bsicons::bs_icon()]) that reveals the offcanvas when clicked; bslib attaches
#'   the necessary Bootstrap wiring. If `trigger` renders as multiple HTML
#'   elements (e.g., it's a `tagList()`), the last HTML element is used for the
#'   trigger. If the `trigger` should contain all of those elements, wrap the
#'   object in a [htmltools::div()] or [htmltools::span()].
#' @param placement The edge of the viewport the offcanvas slides in from. One of
#'   `"right"`, `"left"`, `"top"`, or `"bottom"`. `"start"` and `"end"` are
#'   accepted as aliases for `"left"` and `"right"`.
#' @param width Width of the offcanvas, used only for `"left"` and `"right"`
#'   placements. A number (interpreted as pixels) or a valid CSS length
#'   (e.g. `"400px"`). Defaults to Bootstrap's value.
#' @param height Height of the offcanvas, used only for `"top"` and `"bottom"`
#'   placements. A number (interpreted as pixels) or a valid CSS length
#'   (e.g. `"30vh"`). Defaults to Bootstrap's value.
#' @param close_button Whether to include a dismiss button in the header.
#'   Defaults to `TRUE`.
#' @param backdrop Whether to include a backdrop while the offcanvas is open. One
#'   of `TRUE` (default), `FALSE`, or `"static"` (a backdrop that does not close
#'   the offcanvas when clicked).
#' @param scroll Whether to allow the page body to scroll while the offcanvas is
#'   open. Defaults to `FALSE`.
#' @param keyboard Whether pressing the Escape key closes the offcanvas. Defaults
#'   to `TRUE`.
#'
#' @return A `bslib_offcanvas` object that can be added to a UI (when `id` or
#'   `trigger` is set) or passed to [show_offcanvas()].
#'
#' @seealso [show_offcanvas()] / [hide_offcanvas()] / [toggle_offcanvas()] to
#'   control an offcanvas from the server.
#'
#' @references Based on [Bootstrap's offcanvas
#'   component](https://getbootstrap.com/docs/5.3/components/offcanvas/).
#'
#' @family Offcanvas components
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' # 1. Reveal from a trigger in the UI
#' offcanvas(
#'   "Panel content goes here.",
#'   title = "Settings",
#'   trigger = actionButton("open", "Open settings")
#' )
#'
#' # 2. Control an id'd panel from the server
#' ui <- page_fluid(
#'   actionButton("open", "Open"),
#'   offcanvas("Panel content", title = "Details", id = "details")
#' )
#' server <- function(input, output, session) {
#'   observeEvent(input$open, toggle_offcanvas("details"))
#'   observeEvent(input$details, message("Panel is open: ", input$details))
#' }
#' shinyApp(ui, server)
#'
#' @export
offcanvas <- function(
  ...,
  title = NULL,
  footer = NULL,
  id = NULL,
  trigger = NULL,
  placement = c("right", "left", "top", "bottom"),
  width = NULL,
  height = NULL,
  close_button = TRUE,
  backdrop = TRUE,
  scroll = FALSE,
  keyboard = TRUE
) {
  args <- separate_arguments(...)

  placement <- normalize_offcanvas_placement(placement)

  if (!is.null(width) && placement %in% c("top", "bottom")) {
    rlang::warn('`width` is ignored when `placement` is "top" or "bottom".')
    width <- NULL
  }
  if (!is.null(height) && placement %in% c("left", "right")) {
    rlang::warn('`height` is ignored when `placement` is "left" or "right".')
    height <- NULL
  }

  structure(
    list(
      body = args$children,
      title = title,
      footer = footer,
      trigger = trigger,
      id = id,
      placement = placement,
      backdrop = backdrop,
      scroll = scroll,
      keyboard = keyboard,
      width = if (!is.null(width)) validateCssUnit(width),
      height = if (!is.null(height)) validateCssUnit(height),
      close_button = close_button,
      attribs = args$attribs
    ),
    class = "bslib_offcanvas"
  )
}

#' @export
as.tags.bslib_offcanvas <- function(x, ...) {
  if (is.null(x$id) && is.null(x$trigger)) {
    rlang::abort(
      paste0(
        "An offcanvas added to the UI needs an `id` or a `trigger`. ",
        "To reveal an offcanvas entirely from the server, use `show_offcanvas()`."
      )
    )
  }

  if (is.null(x$title)) {
    rlang::warn(
      paste0(
        "Consider providing a `title` for the offcanvas for accessibility. ",
        "An accessible name can be provided via `title` or by setting `aria-label` on the offcanvas."
      )
    )
  }

  id <- x$id %||% offcanvas_random_id()

  phys_class <- switch(
    x$placement,
    left   = "offcanvas-start",
    right  = "offcanvas-end",
    top    = "offcanvas-top",
    bottom = "offcanvas-bottom"
  )

  title_id <- paste0(id, "-title")

  title_tag <- if (!is.null(x$title)) {
    if (rlang::is_bare_character(x$title) || rlang::is_bare_numeric(x$title)) {
      tags$div(x$title, class = "offcanvas-title", id = title_id)
    } else {
      tagAppendAttributes(x$title, class = "offcanvas-title", id = title_id)
    }
  }

  close_btn <- if (x$close_button) {
    tags$button(
      type = "button",
      class = "btn-close",
      `data-bs-dismiss` = "offcanvas",
      `aria-label` = "Close"
    )
  }

  header_tag <- if (!is.null(title_tag) || !is.null(close_btn)) {
    tags$header(class = "offcanvas-header", title_tag, close_btn)
  }

  footer_tag <- if (!is.null(x$footer)) {
    tags$footer(class = "offcanvas-footer", x$footer)
  }

  style_parts <- c(
    if (!is.null(x$width)) paste0("--bs-offcanvas-width: ", x$width, ";"),
    if (!is.null(x$height)) paste0("--bs-offcanvas-height: ", x$height, ";")
  )
  style_val <- if (length(style_parts) > 0) paste(style_parts, collapse = " ")

  backdrop_attr <- if (isFALSE(x$backdrop)) {
    "false"
  } else if (identical(x$backdrop, "static")) {
    "static"
  }

  scroll_attr <- if (isTRUE(x$scroll)) "true"
  keyboard_attr <- if (isFALSE(x$keyboard)) "false"

  el <- htmltools::tag(
    "bslib-offcanvas",
    list(
      class = paste("offcanvas", phys_class),
      id = id,
      tabindex = "-1",
      `aria-labelledby` = if (!is.null(x$title)) title_id,
      `data-bs-backdrop` = backdrop_attr,
      `data-bs-scroll` = scroll_attr,
      `data-bs-keyboard` = keyboard_attr,
      style = style_val,
      !!!x$attribs,
      header_tag,
      tags$div(class = "offcanvas-body", x$body),
      footer_tag,
      component_dependencies()
    )
  )

  el <- as_fragment(tag_require(el, version = 5))

  if (!is.null(x$trigger)) {
    tq <- tagQuery(x$trigger)$last()$addAttrs(
      `data-bs-toggle` = "offcanvas",
      `data-bs-target` = paste0("#", id),
      `aria-controls` = id
    )
    wired_trigger <- tq$allTags()
    tagList(wired_trigger, el)
  } else {
    el
  }
}

# nocov start
#' @export
print.bslib_offcanvas <- function(x, ...) {
  if (is.null(x$id) && is.null(x$trigger)) {
    x$id <- offcanvas_random_id()
  }
  x_tags <- as.tags(x)
  if (is.null(x$trigger)) {
    x_tags <- tagQuery(x_tags)$addClass("show")$allTags()
  } else {
    x_tags <- tagQuery(x_tags)$find("bslib-offcanvas")$addClass("show")$allTags()
  }
  print(as_fragment(x_tags))
  invisible(x)
}
# nocov end

#' Show, hide, or toggle an offcanvas from the server
#'
#' @description
#' Control an [offcanvas()] panel from a Shiny server function. `show_offcanvas()`
#' takes an offcanvas **object** (and will render it into the page if it isn't
#' already there); `hide_offcanvas()` and `toggle_offcanvas()` act on a panel
#' already in the UI, by **id**.
#'
#' @param offcanvas An [offcanvas()] object, or a string / tags that will be
#'   converted to an offcanvas with default settings.
#' @param id The `id` of an offcanvas in the UI. `hide_offcanvas()` also accepts
#'   an [offcanvas()] object whose `id` was set.
#' @param show Whether to show (`TRUE`) or hide (`FALSE`) the offcanvas. The
#'   default (`NULL`) shows it if hidden and hides it if shown.
#' @param ... Currently ignored; must be empty.
#' @param session A Shiny session object (the default should almost always be
#'   used).
#'
#' @return Invisibly returns the offcanvas `id` (the generated id when
#'   `show_offcanvas()` is given an object without one).
#'
#' @family Offcanvas components
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show", "Show"),
#'   actionButton("hide", "Hide")
#' )
#' server <- function(input, output, session) {
#'   # Defined and revealed entirely from the server
#'   observeEvent(input$show, {
#'     show_offcanvas(
#'       offcanvas("Revealed from the server.", title = "Notice", id = "note")
#'     )
#'   })
#'   observeEvent(input$hide, hide_offcanvas("note"))
#' }
#' shinyApp(ui, server)
#'
#' @describeIn show_offcanvas Render (if needed) and show an offcanvas.
#' @export
show_offcanvas <- function(
  offcanvas,
  ...,
  session = get_current_session()
) {
  rlang::check_dots_empty()

  if (!inherits(offcanvas, "bslib_offcanvas")) {
    offcanvas <- offcanvas(offcanvas)
  }

  temporary <- is.null(offcanvas$id)
  local_id <- offcanvas$id %||% offcanvas_random_id()
  offcanvas$id <- session$ns(local_id)

  tags <- as.tags(offcanvas)
  rendered <- processDeps(tags, session)

  session$sendCustomMessage(
    "bslib.show-offcanvas",
    dropNulls(list(
      html = rendered$html,
      deps = rendered$deps,
      id = session$ns(local_id),
      temporary = temporary
    ))
  )

  invisible(local_id)
}

#' @describeIn show_offcanvas Hide an offcanvas by `id` (or object).
#' @export
hide_offcanvas <- function(id, ..., session = get_current_session()) {
  rlang::check_dots_empty()

  if (inherits(id, "bslib_offcanvas")) {
    if (is.null(id$id)) {
      rlang::abort("Cannot hide an offcanvas without an `id`.")
    }
    id <- id$id
  }

  msg <- list(method = "hide")
  force(id)
  session$onFlush(function() session$sendInputMessage(id, msg), once = TRUE)
  invisible(id)
}

#' @describeIn show_offcanvas Toggle an offcanvas by `id`.
#' @export
toggle_offcanvas <- function(id, show = NULL, ..., session = get_current_session()) {
  rlang::check_dots_empty()

  show <- normalize_show_value(show)
  msg <- dropNulls(list(method = "toggle", value = show))
  force(id)
  session$onFlush(function() session$sendInputMessage(id, msg), once = TRUE)
  invisible(id)
}

normalize_offcanvas_placement <- function(
  placement = c("right", "left", "top", "bottom"),
  error_call = rlang::caller_env()
) {
  placement <- rlang::arg_match(
    placement,
    c("right", "left", "top", "bottom", "start", "end"),
    error_call = error_call
  )
  switch(placement, start = "left", end = "right", placement)
}

offcanvas_random_id <- function() {
  paste0("bslib-offcanvas-", p_randomInt(1000, 10000000))
}
