#' Sidebar layouts
#'
#' @description Create a collapsing sidebar layout by providing a `sidebar()`
#'   object to the `sidebar` argument of:
#'
#' * `layout_sidebar()`
#'   * Creates a sidebar layout component which can be dropped inside any
#'     [page()] or [card()] context.
#' * [page_navbar()], [navs_tab_card()], and [navs_pill_card()]
#'   * Creates a multi page/tab UI with a singular `sidebar()` (which is
#'     shown on every page/tab).
#'
#' See [this article](https://rstudio.github.io/bslib/articles/sidebars.html)
#'   to learn more.
#'
#' @param ... Unnamed arguments can be any valid child of an [htmltools
#'   tag][htmltools::tags] and named arguments become HTML attributes on
#'   returned UI element. In the case of `layout_sidebar()`, these arguments are
#'   passed to the main content tag (not the sidebar+main content container).
#' @param width A valid [CSS unit][htmltools::validateCssUnit] used for the
#'   width of the sidebar.
#' @param position Where the sidebar should appear relative to the main content.
#' @param open The initial state of the sidebar, choosing from the following
#'   options:
#'
#'   * `"desktop"`: The sidebar starts open on desktop screen, closed on mobile.
#'     This is default sidebar behavior.
#'   * `"open"` or `TRUE`: The sidebar starts open.
#'   * `"closed"` or `FALSE`: The sidebar starts closed.
#'   * `"always"` or `NA`: The sidebar is always open and cannot be closed.
#'
#'   In `sidebar_toggle()`, `open` indicates the desired state of the sidebar,
#'   where the default of `open = NULL` will cause the sidebar to be toggled
#'   open if closed or vice versa. Note that `sidebar_toggle()` can only open or
#'   close the sidebar, so it does not support the `"desktop"` and `"always"`
#'   options.
#' @param id A character string. Required if wanting to re-actively read (or
#'   update) the `collapsible` state in a Shiny app.
#' @param title A character title to be used as the sidebar title, which will be
#'   wrapped in a `<div>` element with class `sidebar-title`. You can also
#'   provide a custom [htmltools::tag()] for the title element, in which case
#'   you'll likely want to give this element `class = "sidebar-title"`.
#' @param bg,fg A background or foreground color. If only one of either is
#'   provided, an accessible contrasting color is provided for the opposite
#'   color, e.g. setting `bg` chooses an appropriate `fg` color.
#' @param class CSS classes for the sidebar container element, in addition to
#'   the fixed `.sidebar` class.
#' @param max_height_mobile The maximum height of the horizontal sidebar when
#'   viewed on mobile devices. The default is `250px` unless the sidebar is
#'   included in a [layout_sidebar()] with a specified height, in which case
#'   the default is to take up no more than 50% of the layout container.
#'
#' @export
sidebar <- function(
  ...,
  width = 250,
  position = c("left", "right"),
  open = c("desktop", "open", "closed", "always"),
  id = NULL,
  title = NULL,
  bg = NULL,
  fg = NULL,
  class = NULL,
  max_height_mobile = NULL
) {
  if (isTRUE(open)) {
    open <- "open"
  } else if (identical(open, FALSE)) {
    open <- "closed"
  } else if (isTRUE(is.na(open))) {
    open <- "always"
  }

  open <- rlang::arg_match(open)

  if (!is.null(id)) {
    if (length(id) != 1 || is.na(id) || !nzchar(id)) {
      rlang::abort("`id` must be a non-empty, length-1 character string or `NULL`.")
    }

    # create input binding when id is provided by adding input class
    class <- c("bslib-sidebar-input", class)
  }

  if (is.null(id) && open != "always") {
    # always provide id when collapsible for accessibility reasons
    id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))
  }

  if (is.null(fg) && !is.null(bg)) {
    fg <- get_color_contrast(bg)
  }
  if (is.null(bg) && !is.null(fg)) {
    bg <- get_color_contrast(fg)
  }

  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- div(title, class = "sidebar-title")
  }

  collapse_tag <-
    if (open != "always") {
      tags$button(
        class = "collapse-toggle",
        type = "button",
        title = "Toggle sidebar",
        style = css(
          background_color = bg,
          color = fg
        ),
        "aria-expanded" = if (open %in% c("open", "desktop")) "true" else "false",
        "aria-controls" = id,
        collapse_icon()
      )
    }

  res <- list2(
    tag = tags$div(
      id = id,
      role = "complementary",
      class = c("sidebar", class),
      hidden = if (open == "closed") NA,
      style = css(background_color = bg, color = fg),
      tags$div(
        class = "sidebar-content",
        title,
        ...
      )
    ),
    collapse_tag = collapse_tag,
    position = match.arg(position),
    open = open,
    width = validateCssUnit(width),
    max_height_mobile = validateCssUnit(max_height_mobile)
  )

  class(res) <- c("sidebar", class(res))
  res
}

#' @rdname sidebar
#' @param sidebar A [sidebar()] object.
#' @param fillable Whether or not the `main` content area should be considered a
#'   fillable (i.e., flexbox) container.
#' @param fill Whether or not to allow the layout container to grow/shrink to fit a
#'   fillable container with an opinionated height (e.g., `page_fillable()`).
#' @param border Whether or not to add a border.
#' @param border_radius Whether or not to add a border radius.
#' @param border_color The border color that is applied to the entire layout (if
#'   `border = TRUE`) and the color of the border between the sidebar and the
#'   main content area.
#' @inheritParams card
#'
#' @export
layout_sidebar <- function(
  sidebar,
  ...,
  fillable = FALSE,
  fill = TRUE,
  bg = NULL,
  fg = NULL,
  border = NULL,
  border_radius = NULL,
  border_color = NULL,
  height = NULL
) {
  if (!inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  if (!(is.null(border) || isTRUE(border) || isFALSE(border))) {
    abort("`border` must be `NULL`, `TRUE`, or `FALSE`")
  }
  if (!(is.null(border_radius) || isTRUE(border_radius) || isFALSE(border_radius))) {
    abort("`border`_radius must be `NULL`, `TRUE`, or `FALSE`")
  }

  # main content area colors, if not provided ----
  if (is.null(fg) && !is.null(bg)) {
    fg <- get_color_contrast(bg)
  }
  if (is.null(bg) && !is.null(fg)) {
    bg <- get_color_contrast(fg)
  }

  main <- div(
    role = "main",
    class = "main",
    style = css(
      background_color = bg,
      color = fg
    ),
    ...
  )

  main <- bindFillRole(main, container = fillable)

  contents <- list(main, sidebar$tag, sidebar$collapse_tag)

  right <- identical(sidebar$position, "right")

  max_height_mobile <- sidebar$max_height_mobile %||%
    if (is.null(height)) "250px" else "50%"

  sidebar_init <- if (!identical(sidebar$open, "always")) TRUE

  res <- div(
    class = "bslib-sidebar-layout",
    class = if (right) "sidebar-right",
    class = if (identical(sidebar$open, "closed")) "sidebar-collapsed",
    `data-bslib-sidebar-init` = sidebar_init,
    `data-bslib-sidebar-open` = sidebar$open,
    `data-bslib-sidebar-border` = if (!is.null(border)) tolower(border),
    `data-bslib-sidebar-border-radius` = if (!is.null(border_radius)) tolower(border_radius),
    style = css(
      "--bslib-sidebar-width" = sidebar$width,
      "--bs-card-border-color" = border_color,
      height = validateCssUnit(height),
      "--bslib-sidebar-max-height-mobile" = max_height_mobile
    ),
    !!!contents,
    sidebar_dependency(),
    sidebar_init_js()
  )

  res <- bindFillRole(res, item = fill)

  res <- as.card_item(res)

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}

#' @describeIn sidebar Toggle a `sidebar()` state during an active Shiny user
#'   session.
#' @param session A Shiny session object (the default should almost always be
#'   used).
#' @export
sidebar_toggle <- function(id, open = NULL, session = get_current_session()) {
  method <-
    if (is.null(open) || identical(open, "toggle")) {
      "toggle"
    } else if (isTRUE(open) || identical(open, "open")) {
      "open"
    } else if (isFALSE(open) || identical(open, "closed")) {
      "close"
    } else if (isTRUE(is.na(open)) || identical(open, "always")) {
      abort('`open = "always"` is not supported by `sidebar_toggle()`.')
    } else if (identical(open, "desktop")) {
      abort('`open = "desktop"` is not supported by `sidebar_toggle()`.')
    } else {
      abort('`open` must be `NULL`, `TRUE` (or "open"), or `FALSE` (or "closed").')
    }

  force(id)
  callback <- function() {
    session$sendInputMessage(id, list(method = method))
  }
  session$onFlush(callback, once = TRUE)
}

collapse_icon <- function() {
  if (!is_installed("bsicons")) {
    icon <- "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" class=\"bi bi-chevron-down collapse-icon\" style=\"fill:currentColor;\" aria-hidden=\"true\" role=\"img\" ><path fill-rule=\"evenodd\" d=\"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z\"></path></svg>"
    return(HTML(icon))
  }
  bsicons::bs_icon("chevron-down", class = "collapse-icon", size = NULL)
}

sidebar_dependency <- function() {
  htmlDependency(
    name = "bslib-sidebar",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components",
    script = "sidebar.min.js"
  )
}

sidebar_init_js <- function() {
  # Note: if we want to avoid inline `<script>` tags in the future for
  # initialization code, we might be able to do so by turning the sidebar layout
  # container into a web component
  tags$script(HTML("bslib.Sidebar.initCollapsibleAll()"))
}
