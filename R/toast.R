#' Toast notifications
#'
#' @description
#' Toast notifications are lightweight, temporary messages designed to mimic
#' push notifications from mobile and desktop operating systems. They are built
#' on Bootstrap 5's native toast component.
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show_toast", "Show Toast")
#' )
#'
#' server <- function(input, output, session) {
#'   observeEvent(input$show_toast, {
#'     show_toast(
#'       toast(
#'         body = "Operation completed successfully!",
#'         header = "Success",
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
#'   Providing a stable ID allows you to update or hide the toast later.
#' @param type Optional semantic type. One of `NULL`, `"primary"`,
#'   `"secondary"`, `"success"`, `"info"`, `"warning"`, `"danger"`, `"light"`,
#'   or `"dark"`. Applies appropriate Bootstrap background utility classes
#'   (`text-bg-*`).
#' @param autohide_s Numeric. Number of seconds after which the toast should
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
#'   `TRUE` and is only relevant when auto-hiding is enabled. If auto-hiding is
#'   disabled, a close button is always included for accessibility.
#'
#' @return A `bslib_toast` object that can be passed to [show_toast()].
#'
#' @seealso [show_toast()] to display a toast, [hide_toast()] to dismiss a
#'   toast, and [toast_header()] to create structured headers.
#' @family Toast components
#' @export
toast <- function(
  ...,
  header = NULL,
  id = NULL,
  type = NULL,
  autohide_s = 5,
  position = "top-right",
  closable = TRUE
) {
  # Validate arguments
  if (!is.null(type)) {
    type <- rlang::arg_match(
      type,
      c(
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark"
      )
    )
  }

  dots <- separate_arguments(...)

  position <- normalize_toast_position(position)

  # Determine autohide behavior
  # autohide_s of 0 or NA (or NULL) disables auto-hiding
  if (is.null(autohide_s) || (length(autohide_s) == 1 && is.na(autohide_s))) {
    autohide <- FALSE
  } else {
    if (!is.numeric(autohide_s) || length(autohide_s) != 1 || autohide_s < 0) {
      rlang::abort(
        "`autohide_s` must be a single non-negative number or NA."
      )
    }
    autohide <- autohide_s != 0
  }

  duration <- if (autohide) autohide_s * 1000 # milliseconds

  # Enforce close button for non-autohiding toasts (accessibility)
  if (!autohide) {
    closable <- TRUE
  }

  # Store toast data in a structured object
  structure(
    list(
      body = dots$children,
      header = header,
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

#' @export
as.tags.bslib_toast <- function(x, ...) {
  # Generate ID if not provided
  id <- x$id %||% paste0("bslib-toast-", p_randomInt(1000, 10000000))

  toast_component(
    body = x$body,
    header = x$header,
    type = x$type,
    closable = x$closable,
    id = id,
    attribs = x$attribs
  )
}

#' @export
print.bslib_toast <- function(x, ...) {
  x_tags <- x
  x_tags$attribs <- c(x_tags$attribs, list(class = "show"))
  x_tags <- as.tags(x_tags)
  print(as_fragment(x_tags))
  invisible(x)
}

#' Display a toast notification
#'
#' @description
#' Displays a toast notification in a Shiny application.
#'
#' @param toast A `bslib_toast` object created by [toast()], or a string/UI
#'   element (which will be automatically converted to a toast with default
#'   settings).
#' @param ... Reserved for future extensions (currently ignored).
#' @param session Shiny session object.
#'
#' @return Invisibly returns the toast ID (string) that can be used with
#'   [hide_toast()].
#'
#' @export
#' @family Toast components
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show_simple", "Show Simple Toast"),
#'   actionButton("show_success", "Show Success Toast")
#' )
#'
#' server <- function(input, output, session) {
#'   observeEvent(input$show_simple, {
#'     # Simple string automatically converted to toast
#'     show_toast("Operation completed!")
#'   })
#'
#'   observeEvent(input$show_success, {
#'     # Show a pre-created toast
#'     show_toast(
#'       toast(
#'         body = "Your file has been uploaded.",
#'         header = "Success",
#'         type = "success"
#'       )
#'     )
#'   })
#' }
#'
#' shinyApp(ui, server)
show_toast <- function(
  toast,
  ...,
  session = shiny::getDefaultReactiveDomain()
) {
  # Check for unused arguments
  rlang::check_dots_empty()

  # Convert to toast object if needed (convenience)
  if (!inherits(toast, "bslib_toast")) {
    toast <- toast(body = toast)
  }

  # Generate ID if not already set
  id <- toast$id %||% paste0("bslib-toast-", p_randomInt(1000, 10000000))

  # Ensure ID is stored in toast object
  toast$id <- id

  # Convert toast object to HTML tags
  toast_tag <- as.tags(toast)

  # Render to HTML with dependencies
  html <- as.character(toast_tag)
  deps <- htmltools::resolveDependencies(htmltools::findDependencies(toast_tag))

  # Prepare message data
  data <- list(
    html = html,
    deps = lapply(deps, shiny::createWebDependency),
    options = list(
      autohide = toast$autohide,
      delay = toast$duration
    ),
    position = toast$position,
    id = id
  )

  # Send to client via custom message handler
  callback <- function() {
    session$sendCustomMessage("bslib.show-toast", data)
  }

  session$onFlush(callback, once = TRUE)

  invisible(id)
}

#' Hide a toast notification
#'
#' @description
#' Manually dismisses a toast notification.
#'
#' @param id String with the toast ID returned by [show_toast()] or a `toast`
#'   object provided that the `id` was set when created/shown.
#' @param session Shiny session object.
#'
#' @return Called for side effects; returns `NULL` invisibly.
#'
#' @export
#' @family Toast components
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
hide_toast <- function(id, session = shiny::getDefaultReactiveDomain()) {
  force(id)

  callback <- function() {
    session$sendCustomMessage("bslib.hide-toast", list(id = id))
  }

  session$onFlush(callback, once = TRUE)

  invisible(NULL)
}

#' Create a structured toast header
#'
#' @description
#' Creates a structured header for a toast with optional icon and status
#' indicator.
#'
#' @param title Header text (required).
#' @param icon Optional icon element (e.g., from `bsicons::bs_icon()` or
#'   `fontawesome::fa()`).
#' @param status Optional status text (e.g., "11 mins ago", "just now") that
#'   appears as small, muted text in the header.
#' @param ... Additional HTML attributes passed to the header container.
#'
#' @return A tag object representing the toast header content.
#'
#' @export
#' @family Toast components
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' ui <- page_fluid(
#'   actionButton("show_header", "Show Toast with Header")
#' )
#'
#' server <- function(input, output, session) {
#'   observeEvent(input$show_header, {
#'     show_toast(
#'       toast(
#'         body = "Your settings have been saved.",
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
toast_header <- function(title, icon = NULL, status = NULL, ...) {
  # Build status text (small muted text)
  status_text <- if (!is.null(status)) {
    htmltools::tags$small(class = "text-muted", status)
  }

  # Combine elements
  htmltools::tagList(
    if (!is.null(icon)) icon,
    htmltools::strong(
      class = "me-auto",
      if (!is.null(icon)) htmltools::tags$span(class = "ms-2"),
      title
    ),
    status_text
  )
}

# Internal function to build toast HTML structure
toast_component <- function(
  body,
  header = NULL,
  type = NULL,
  closable = TRUE,
  id = NULL,
  class = NULL,
  attribs = list()
) {
  # Determine accessibility attributes
  aria_role <- if (!is.null(type) && type == "danger") "alert" else "status"
  aria_live <- if (!is.null(type) && type == "danger") "assertive" else "polite"

  # Build type-based classes
  type_class <- if (!is.null(type)) {
    paste0("text-bg-", type)
  }

  # Create close button (if needed)
  close_button <- if (closable) {
    htmltools::tags$button(
      type = "button",
      class = "btn-close",
      `data-bs-dismiss` = "toast",
      `aria-label` = "Close"
    )
  }

  # Build header if provided
  header_tag <- if (!is.null(header)) {
    # Check if header is already a toast_header() result or just text/tags
    header_content <- if (is.character(header)) {
      htmltools::strong(class = "me-auto", header)
    } else {
      # Assume it's a tag object (from toast_header() or user-provided)
      header
    }

    htmltools::div(
      class = "toast-header",
      header_content,
      close_button
    )
  }

  # Build body with optional close button (if no header)
  body_tag <- if (!is.null(header)) {
    # Has header, so just body content (close button in header)
    htmltools::div(class = "toast-body", body)
  } else {
    # No header, so include close button in body (if closable)
    if (closable) {
      htmltools::div(
        class = "toast-body d-flex",
        htmltools::div(class = "flex-grow-1", body),
        htmltools::tags$button(
          type = "button",
          class = "btn-close",
          `data-bs-dismiss` = "toast",
          `aria-label` = "Close"
        )
      )
    } else {
      # No close button needed
      htmltools::div(class = "toast-body", body)
    }
  }

  # Combine into toast structure
  toast <- htmltools::div(
    id = id,
    class = paste(c("toast", type_class, class), collapse = " "),
    role = aria_role,
    `aria-live` = aria_live,
    `aria-atomic` = "true",
    !!!attribs,
    header_tag,
    body_tag
  )

  # Attach dependencies
  toast <- htmltools::tagAppendChild(toast, component_dependencies())
  toast <- tag_require(toast, version = 5)

  as_fragment(toast)
}

# Helper function to normalize toast position arguments
normalize_toast_position <- function(position = "bottom-right") {
  if (is.null(position) || length(position) == 0) {
    return("bottom-right")
  }

  # Store original for error messages
  original_position <- position

  # If position is a vector, collapse it to a single string with spaces
  if (length(position) > 1) {
    position <- paste(position, collapse = " ")
  }

  # Normalize to lowercase and trim
  position <- tolower(trimws(position))

  # Split on spaces or hyphens to get individual components
  components <- strsplit(position, "[-\\s]+", perl = TRUE)[[1]]
  components <- components[nzchar(components)] # Remove empty strings

  # Separate vertical and horizontal components
  vertical <- intersect(components, c("top", "middle", "bottom"))
  horizontal <- intersect(components, c("left", "center", "right"))
  invalid <- setdiff(components, c(vertical, horizontal))

  # Validate we have exactly one of each
  if (length(vertical) != 1 || length(horizontal) != 1 || length(invalid) > 0) {
    rlang::abort(
      paste0(
        "Invalid toast position: '",
        original_position,
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
