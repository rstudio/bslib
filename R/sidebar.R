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
#' @param id A character string. Required if wanting to re-actively read (or
#'   update) the `collapsible` state in a Shiny app.
#' @param bg A background color. If provided, an accessible contrasting color is
#'   provided for the foreground color (consider using a utility `class` to
#'   customize the foreground color).
#' @param class Additional CSS classes for the top-level HTML element.
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
  class = NULL,
  max_height_mobile = NULL
) {
  # For accessibility reasons, always provide id when collapsible,
  # but only create input binding when id is provided
  if (is.null(id) && is.logical(open)) {
    id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-sidebar-input", class)
  }

  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- span(title, class = "sidebar-title")
  }

  if (isTRUE(open)) {
    open <- "open"
  } else if (identical(open, FALSE)) {
    open <- "closed"
  } else if (isTRUE(is.na(open))) {
    open <- "always"
  }

  open <- rlang::arg_match(open)
  is_init_open <- open %in% c("open", "always")

  hide_collapse <- identical(open, "always")

  collapse_tag <- tags$button(
    class = "collapse-toggle",
    type = "button",
    title = "Toggle sidebar",
    style = css(display = if (hide_collapse) "none"),
    "aria-expanded" = if (is_init_open || hide_collapse) "true" else "false",
    "aria-controls" = id
  )

  res <- list2(
    tag = tags$form(
      id = id,
      role = "complementary",
      class = c("sidebar", class),
      style = css(
        background_color = bg,
        color = if (!is.null(bg)) get_color_contrast(bg)
      ),
      title,
      ...
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
#' @param fill Whether or not the layout container should grow/shrink to fit
#'   a fillable container.
#' @param border Whether or not to add a border.
#' @param border_radius Whether or not to add a border radius.
#' @inheritParams card
#'
#' @export
layout_sidebar <- function(
  sidebar = sidebar(),
  ...,
  fillable = FALSE,
  fill = TRUE,
  bg = NULL,
  border = TRUE,
  border_radius = TRUE,
  height = NULL
) {
  if (!inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  main <- div(
    role = "main",
    class = "main",
    style = css(
      background_color = bg,
      color = if (!is.null(bg)) get_color_contrast(bg)
    ),
    ...
  )

  main <- bindFillRole(main, container = fillable)

  contents <- list(sidebar$tag, sidebar$collapse_tag, main)
  columns <- c(sidebar$width, "minmax(0, 1fr)")
  columns_collapse <- c("0px", "minmax(0, 1fr)")

  right <- identical(sidebar$position, "right")
  if (right) {
    contents <- rev(contents)
    columns <- rev(columns)
    columns_collapse <- rev(columns_collapse)
  }

  sidebar_max_height_mobile <-
    if (is.null(sidebar$max_height_mobile)) {
      if (!is.null(height)) {
        "fit-content(50%)"
      } else {
        "fit-content(250px)"
      }
    } else {
      sprintf("fit-content(%s)", sidebar$max_height_mobile)
    }

  res <- div(
    class = "bslib-sidebar-layout",
    class = if (right) "sidebar-right",
    class = if (identical(sidebar$open, "closed")) "sidebar-collapsed",
    `data-sidebar-collapse-at-breakpoint` =
      if (identical(sidebar$open, "desktop")) "true",
    style = css(
      "--bslib-sidebar-columns" = columns,
      "--bslib-sidebar-columns-collapsed" = columns_collapse,
      "--bslib-sidebar-border" = if (!border) "none",
      "--bslib-sidebar-border-radius" = if (!border_radius) "initial",
      height = validateCssUnit(height),
      "--bslib-sidebar-mobile-row-height" = sidebar_max_height_mobile
    ),
    !!!contents,
    sidebar_dependency(),
    sidebar_js_init()
  )

  res <- bindFillRole(res, item = fill)

  res <- as.card_item(res)

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}

sidebar_js_init <- function() {
  tags$script("data-bslib-sidebar-init" = NA, HTML("
(function() {
  var thisScript = document.querySelector('script[data-bslib-sidebar-init]');
  thisScript.removeAttribute('data-bslib-sidebar-init');

  // If this layout is the innermost layout, then allow it to add CSS
  // variables to it and its ancestors (counting how parent layouts there are)
  var thisLayout = $(thisScript).parent();
  var noChildLayouts = thisLayout.find('.bslib-sidebar-layout').length === 0;
  if (noChildLayouts) {
    var parentLayouts = thisLayout.parents('.bslib-sidebar-layout');
    // .add() sorts the layouts in DOM order (i.e., innermost is last)
    var layouts = thisLayout.add(parentLayouts);
    var ctrs = {left: 0, right: 0};
    layouts.each(function(i, x) {
      $(x).css('--bslib-sidebar-counter', i);
      var right = $(x).hasClass('sidebar-right');
      $(x).css('--bslib-sidebar-overlap-counter', right ? ctrs.right : ctrs.left);
      right ? ctrs.right++ : ctrs.left++;
    });
  }

  // If sidebar is marked open='desktop', collapse sidebar if on mobile
  if (thisLayout.data('sidebarCollapseAtBreakpoint')) {
    var breakPoint = thisLayout.css('--bslib-sidebar-collapse-breakpoint');
    var isMobile = window.matchMedia('(max-width: ' + breakPoint + ')').matches;
    if (isMobile) {
      thisLayout.addClass('sidebar-collapsed');
    }
  }
})()"
  ))
}


#' @describeIn sidebar Open a `sidebar()` (during an active Shiny user session).
#' @param session a shiny session object (the default should almost always be
#'   used).
#' @export
sidebar_open <- function(id, session = get_current_session()) {
  callback <- function() {
    session$sendInputMessage(id, list(method = "open"))
  }
  session$onFlush(callback, once = TRUE)
}

#' @describeIn sidebar Close a `sidebar()` (during an active Shiny user session).
#' @export
sidebar_close <- function(id, session = get_current_session()) {
  callback <- function() {
    session$sendInputMessage(id, list(method = "close"))
  }
  session$onFlush(callback, once = TRUE)
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
