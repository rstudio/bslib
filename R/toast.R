#' Toast notifications
#'
#' @description
#' Toast notifications are lightweight, temporary messages designed to mimic
#' push notifications from mobile and desktop operating systems. They are built
#' on Bootstrap 5's native toast component.
#'
#' @param body Main content of the toast. Can be text, HTML, or Shiny UI elements.
#' @param header Optional header content. Can be a string, or the result of
#'   [toast_header()]. If provided, creates a `.toast-header` with close button
#'   (if `closable = TRUE`).
#' @param ... Additional HTML attributes passed to the toast container.
#' @param id Optional unique identifier for the toast. If `NULL`, an ID will be
#'   automatically generated when the toast is shown via [show_toast()].
#'   Providing a stable ID allows you to update or hide the toast later.
#' @param type Optional semantic type. One of `NULL`, `"primary"`, `"secondary"`,
#'   `"success"`, `"info"`, `"warning"`, `"danger"`, `"light"`, or `"dark"`.
#'   Applies appropriate Bootstrap background utility classes (`text-bg-*`).
#' @param autohide Logical. Whether to automatically hide the toast after
#'   `duration` milliseconds. Default `TRUE`.
#' @param duration Numeric. Time in milliseconds before auto-hiding. Default
#'   `5000` (5 seconds). Ignored if `autohide = FALSE`.
#' @param position String. Where to position the toast container. One of
#'   `"top-left"`, `"top-center"`, `"top-right"` (default), `"middle-left"`,
#'   `"middle-center"`, `"middle-right"`, `"bottom-left"`, `"bottom-center"`,
#'   or `"bottom-right"`.
#' @param closable Logical. Whether to include a close button. Default `TRUE`.
#'   When `autohide = FALSE`, a close button is always included regardless of
#'   this setting (for accessibility).
#' @param class Additional CSS classes for the toast.
#'
#' @return A `bslib_toast` object that can be passed to [show_toast()].
#'
#' @export
#' @family Toast components
#'
#' @seealso [show_toast()] to display a toast, [hide_toast()] to dismiss a toast,
#'   and [toast_header()] to create structured headers.
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
toast <- function(
  body,
  header = NULL,
  ...,
  id = NULL,
  type = NULL,
  autohide = TRUE,
  duration = 5000,
  position = "top-right",
  closable = TRUE,
  class = NULL
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

  position <- rlang::arg_match(
    position,
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

  # Enforce close button for non-autohiding toasts (accessibility)
  if (!autohide) {
    closable <- TRUE
  }

  # Store toast data in a structured object
  structure(
    list(
      body = body,
      header = header,
      id = id,
      type = type,
      autohide = autohide,
      duration = duration,
      position = position,
      closable = closable,
      class = class,
      attribs = rlang::list2(...)
    ),
    class = "bslib_toast"
  )
}

#' @rdname toast
#' @param x A `bslib_toast` object.
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
    class = x$class,
    !!!x$attribs
  )
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
#' @param status Optional status indicator. One of `NULL`, `"primary"`,
#'   `"secondary"`, `"success"`, `"info"`, `"warning"`, `"danger"`, `"light"`,
#'   or `"dark"`. Adds a colored dot/badge before the title.
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
#'           status = "success"
#'         ),
#'         type = "success"
#'       )
#'     )
#'   })
#' }
#'
#' shinyApp(ui, server)
toast_header <- function(title, icon = NULL, status = NULL, ...) {
  # Validate status if provided
  if (!is.null(status)) {
    status <- rlang::arg_match(
      status,
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

  # Build status indicator (colored dot)
  status_indicator <- if (!is.null(status)) {
    htmltools::span(
      class = paste0("badge rounded-circle bg-", status, " me-2"),
      style = "width: 0.5rem; height: 0.5rem; padding: 0;",
      `aria-hidden` = "true"
    )
  }

  # Combine elements
  htmltools::tagList(
    status_indicator,
    icon,
    htmltools::strong(
      class = "me-auto",
      class = if (!is.null(icon) || !is.null(status)) "ms-2",
      title
    )
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
  ...
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
    ...,
    header_tag,
    body_tag
  )

  # Attach dependencies
  toast <- htmltools::tagAppendChild(toast, component_dependencies())
  toast <- tag_require(toast, version = 5)

  as_fragment(toast)
}
