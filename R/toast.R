#' Toast notifications
#'
#' @description
#' Toast notifications are lightweight, temporary messages designed to mimic
#' push notifications from mobile and desktop operating systems. They are built
#' on [Bootstrap 5's toast
#' component](https://getbootstrap.com/docs/5.3/components/toasts/).
#'
#' bslib includes a complete example of toasts and their many configuration
#' options:
#'
#' ```r
#' shiny::runExample("toast", package = "bslib")
#' ```
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show_simple", "Simple Toast"),
#'   actionButton("show_header", "Toast with Header")
#' )
#'
#' server <- function(input, output, session) {
#'   observeEvent(input$show_simple, {
#'     show_toast(
#'       toast(
#'         "Operation completed successfully!",
#'         header = "Success",
#'         type = "success"
#'       )
#'     )
#'   })
#'
#'   observeEvent(input$show_header, {
#'     show_toast(
#'       toast(
#'         "Your settings have been saved.",
#'         header = toast_header(
#'           title = "Settings Updated",
#'           status = "just now"
#'         ),
#'         type = "success"
#'       )
#'     )
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @param ... Body content of the toast. Can be a string, or any HTML elements.
#'   Named arguments will be treated as HTML attributes for the toast container.
#' @param header Optional header content. Can be a string, or the result of
#'   [toast_header()]. If provided, creates a `.toast-header` with close button
#'   (if `closable = TRUE`).
#' @param id Optional unique identifier for the toast. If `NULL`, an ID will be
#'   automatically generated when the toast is shown via [show_toast()].
#'   Providing a stable ID allows you to hide the toast later. If a toast with
#'   `id` is already visible, that toast is automatically hidden before showing
#'   the new toast with the same `id` so that only one toast with a given ID is
#'   shown at once.
#' @param type Optional semantic type. One of `NULL`, `"primary"`,
#'   `"secondary"`, `"success"`, `"info"`, `"warning"`, `"danger"`, `"light"`,
#'   or `"dark"`. Applies appropriate Bootstrap background utility classes
#'   (`text-bg-*`).
#' @param duration_s Numeric. Number of seconds after which the toast should
#'   automatically hide. Use `0`, or `NA` to disable auto-hiding (toast will
#'   remain visible until manually dismissed). Default is `5` (5 seconds).
#' @param position String or character vector specifying where to position the
#'   toast container. Can be provided in several formats:
#'   * Kebab-case: `"top-left"`, `"bottom-right"`, etc.
#'   * Space-separated: `"top left"`, `"bottom right"`, etc.
#'   * Character vector: `c("top", "left")`, `c("bottom", "right")`, etc.
#'   * Any order: `"left top"` is equivalent to `"top left"`
#'
#'   Valid vertical positions are `"top"`, `"middle"`, or `"bottom"`. Valid
#'   horizontal positions are `"left"`, `"center"`, or `"right"`. Input is
#'   case-insensitive. Default is `"bottom-right"`.
#' @param closable Logical. Whether to include a close button. Defaults to
#'   `TRUE`. When both `duration_s = NA` (or `0` or `NULL`) and `closable =
#'   FALSE`, the toast will remain visible until manually hidden via
#'   [hide_toast()]. This is useful when the toast contains interactive Shiny UI
#'   elements and you want to manage the toast display programmatically.
#'
#' @return A `bslib_toast` object that can be passed to [show_toast()].
#'
#' @seealso [show_toast()] to display a toast, [hide_toast()] to dismiss a
#'   toast, and [toast_header()] to create structured headers.
#' @describeIn toast Create a toast element.
#' @family Toast components
#' @export
toast <- function(
  ...,
  header = NULL,
  icon = NULL,
  id = NULL,
  type = NULL,
  duration_s = 5,
  position = "top-right",
  closable = TRUE
) {
  if (!is.null(type)) {
    type <- rlang::arg_match(
      type,
      # fmt: skip
      c(
        "primary", "secondary",
        "success", "info", "warning", "danger", "error",
        "light", "dark"
      )
    )
    # Support "error" as alias for "danger"
    type <- switch(type, error = "danger", type)
  }

  dots <- separate_arguments(...)

  position <- normalize_toast_position(position)

  # duration_s of 0 or NA (or NULL) disables auto-hiding
  if (is.null(duration_s) || rlang::is_na(duration_s)) {
    autohide <- FALSE
  } else {
    if (!is.numeric(duration_s) || length(duration_s) != 1 || duration_s < 0) {
      rlang::abort(
        "`duration_s` must be a single non-negative number or NA."
      )
    }
    autohide <- duration_s != 0
  }

  duration <- if (autohide) duration_s * 1000 # milliseconds

  structure(
    list(
      body = dots$children,
      header = header,
      icon = icon,
      id = id,
      type = type,
      autohide = autohide,
      duration = duration,
      position = position,
      closable = closable,
      attribs = dots$attribs
    ),
    class = "bslib_toast"
  )
}

#' @describeIn toast Create a structured toast header with optional icon and
#'   status indicator. Returns a data structure that can be passed to the
#'   `header` argument of `toast()`.
#'
#' @param title Header text (required).
#' @param icon Optional icon element, for example from [shiny::icon()],
#'   [bsicons::bs_icon()] or [fontawesome::fa()].
#' @param status Optional status text that appears as small, muted text on the
#'   right side of the header.
#'
#' @return For `toast_header()`: a toast header object that can be used with the
#'   `header` argument of `toast()`.
#'
#' @export
toast_header <- function(title, ..., icon = NULL, status = NULL) {
  dots <- separate_arguments(...)

  structure(
    list(
      title = tagList(title, !!!dots$children),
      icon = icon,
      status = status,
      attribs = dots$attribs
    ),
    class = "bslib_toast_header"
  )
}

#' @export
as.tags.bslib_toast <- function(x, ...) {
  id <- x$id %||% toast_random_id()

  toast_component(
    body = x$body,
    header = x$header,
    icon = x$icon,
    type = x$type,
    closable = x$closable,
    id = id,
    attribs = x$attribs
  )
}

# nocov start
#' @export
print.bslib_toast <- function(x, ...) {
  x_tags <- x
  # Add "show" class to make toast visible when printed
  x_tags$attribs <- c(x_tags$attribs, list(class = "show"))
  x_tags <- as.tags(x_tags)
  print(as_fragment(x_tags))
  invisible(x)
}
# nocov end

#' Show or hide a toast notification
#'
#' @description
#' Displays a toast notification in a Shiny application.
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show_persistent", "Show Persistent Toast"),
#'   actionButton("hide_persistent", "Hide Toast")
#' )
#'
#' server <- function(input, output, session) {
#'   toast_id <- reactiveVal(NULL)
#'
#'   observeEvent(input$show_persistent, {
#'     id <- show_toast(
#'       toast(
#'         body = "This toast won't disappear automatically.",
#'         autohide = FALSE
#'       )
#'     )
#'     toast_id(id)
#'   })
#'
#'   observeEvent(input$hide_persistent, {
#'     req(toast_id())
#'     hide_toast(toast_id())
#'     toast_id(NULL)
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
#' @param toast A [toast()], or a string that will be automatically converted to
#'   a toast with default settings.
#' @param id String with the toast ID returned by `show_toast()` or a `toast`
#'   object provided that the `id` was set when created/shown.
#' @param ... Reserved for future extensions (currently ignored).
#' @param session Shiny session object.
#'
#' @return `show_toast()` Invisibly returns the toast ID (string) that can be
#'   used with `hide_toast()`.
#'
#' @family Toast components
#' @describeIn show_toast Show a toast notification.
#' @export
show_toast <- function(
  toast,
  ...,
  session = shiny::getDefaultReactiveDomain()
) {
  rlang::check_dots_empty()

  if (!inherits(toast, "bslib_toast")) {
    toast <- toast(toast)
  }

  if (length(toast$body) == 0 && length(toast$header) == 0) {
    rlang::warn("`toast` has no content; no toast to show.")
    return(invisible(NULL))
  }

  toast$id <- toast$id %||% toast_random_id()

  toasted <- processDeps(toast, session)

  data <- list(
    html = toasted$html,
    deps = toasted$deps,
    autohide = toast$autohide,
    duration = toast$duration,
    position = toast$position,
    id = toast$id
  )

  # Use custom message to show toast immediately
  session$sendCustomMessage("bslib.show-toast", dropNulls(data))
  invisible(toast$id)
}

#' @describeIn show_toast Hide a toast notification by ID.
#' @export
hide_toast <- function(id, ..., session = shiny::getDefaultReactiveDomain()) {
  rlang::check_dots_empty()

  if (inherits(id, "bslib_toast")) {
    if (is.null(id$id)) {
      rlang::abort("Cannot hide a toast without an ID. Provide the toast ID.")
    }
    id <- id$id
  }
  if (is.null(id)) {
    rlang::warn("`id` is NULL; no toast to hide.")
    return(invisible(NULL))
  }

  # Use custom message to hide toast immediately
  session$sendCustomMessage("bslib.hide-toast", list(id = id))
  invisible(id)
}

toast_component_header <- function(x) {
  UseMethod("toast_component_header")
}

#' @export
toast_component_header.character <- function(x) {
  strong(class = "me-auto", header)
}

#' @export
toast_component_header.bslib_toast_header <- function(x) {
  # Status text (small muted text)
  status_text <- if (!is.null(x$status)) {
    tags$small(class = "text-muted text-end", x$status)
  }

  tagList(
    if (!is.null(x$icon)) span(class = "toast-header-icon", x$icon),
    strong(
      class = "me-auto",
      class = if (!is.null(x$icon)) "ms-2",
      x$title
    ),
    status_text
  )
}

#' @export
toast_component_header.list <- function(x) {
  # Treat a bare list with a `title` element as a toast_header()
  if (!rlang::has_name(x, "title")) {
    rlang::abort(
      "Invalid toast header: must be a string, toast_header(), or a list with a `title` element."
    )
  }

  toast_component_header(structure(x, class = "bslib_toast_header"))
}

#' @export
toast_component_header.default <- function(x) {
  x
}

# Internal function to build toast HTML structure
toast_component <- function(
  body,
  header = NULL,
  icon = NULL,
  type = NULL,
  closable = TRUE,
  id = NULL,
  class = NULL,
  attribs = list()
) {
  # Set ARIA attributes based on toast urgency level
  # - danger toasts use role="alert" + aria-live="assertive" to immediately
  #   interrupt screen readers (critical errors requiring immediate attention)
  # - other toasts use role="status" + aria-live="polite" to announce updates
  #   without interrupting (non-critical, announced when convenient)
  aria_role <- if (!is.null(type) && type == "danger") "alert" else "status"
  aria_live <- if (!is.null(type) && type == "danger") "assertive" else "polite"

  type_class <- if (!is.null(type)) {
    paste0("text-bg-", type)
  }

  close_button <- tags$button(
    type = "button",
    class = "btn-close",
    `data-bs-dismiss` = "toast",
    `aria-label` = "Close"
  )

  header_tag <- if (closable && !is.null(header)) {
    div(
      class = "toast-header",
      toast_component_header(header),
      close_button
    )
  }

  # Body with optional close button
  # * If header exists, close button goes in header
  # * If no header, close button goes in body (if closable)
  body_has_close_btn <- is.null(header) && closable
  body_tag <- if (!body_has_close_btn && is.null(icon)) {
    div(class = "toast-body", body)
  } else {
    div(
      class = "toast-body d-flex gap-2",
      if (!is.null(icon)) span(class = "toast-body-icon", icon),
      div(class = "toast-body-content flex-grow-1", body),
      if (body_has_close_btn) close_button
    )
  }

  toast <- div(
    id = id,
    class = paste(c("toast", type_class, class), collapse = " "),
    role = aria_role,
    `aria-live` = aria_live,
    `aria-atomic` = "true",
    !!!attribs,
    header_tag,
    body_tag,
    component_dependencies()
  )

  as_fragment(tag_require(toast, version = 5))
}

toast_random_id <- function() {
  paste0("bslib-toast-", p_randomInt(1000, 10000000))
}

normalize_toast_position <- function(position = "bottom-right") {
  if (is.null(position) || length(position) == 0) {
    return("bottom-right")
  }

  original_position <- position # for error messages

  # If position is a vector, collapse it to a single string with spaces
  if (length(position) > 1) {
    position <- paste(position, collapse = " ")
  }

  position <- tolower(trimws(position))
  components <- strsplit(position, "[-\\s]+", perl = TRUE)[[1]]
  components <- components[nzchar(components)] # Remove empty strings

  vertical <- intersect(components, c("top", "middle", "bottom"))
  horizontal <- intersect(components, c("left", "center", "right"))
  invalid <- setdiff(components, c(vertical, horizontal))

  if (length(vertical) != 1 || length(horizontal) != 1 || length(invalid) > 0) {
    rlang::abort(
      paste0(
        "Invalid toast position: '",
        paste(original_position, collapse = " "),
        "'. ",
        "Must specify one vertical position (top, middle, bottom) and ",
        "one horizontal position (left, center, right)."
      )
    )
  }

  result <- paste0(vertical, "-", horizontal)

  rlang::arg_match(
    result,
    c(
      "top-left",
      "top-center",
      "top-right",
      "middle-left",
      "middle-center",
      "middle-right",
      "bottom-left",
      "bottom-center",
      "bottom-right"
    )
  )
}
