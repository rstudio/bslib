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
#' @param open Whether or not the sidebar should be open on page load. Provide a
#'   value of `NA` to prevent sidebar from being collapsible.
#' @param id A character string. Required if wanting to re-actively read (or
#'   update) the `collapsible` state in a Shiny app.
#' @param bg,fg A background or foreground color. If only one of either is
#'   provided, an accessible contrasting color is provided for the opposite
#'   color, e.g. setting `bg` chooses an appropriate `fg` color.
#' @param class Additional CSS classes for the top-level HTML element.
#'
#' @export
sidebar <- function(
  ...,
  width = 250,
  position = c("left", "right"),
  open = TRUE,
  id = NULL,
  bg = NULL,
  fg = NULL,
  class = NULL
) {
  # For accessibility reasons, always provide id when collapsible,
  # but only create input binding when id is provided
  if (is.null(id) && is.logical(open)) {
    id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-sidebar-input", class)
  }

  if (is.null(fg) && !is.null(bg)) {
    fg <- get_color_contrast(bg)
  }
  if (is.null(bg) && !is.null(fg)) {
    bg <- get_color_contrast(fg)
  }

  hide_collapse <- isTRUE(is.na(open))

  collapse_tag <- tags$button(
    class = "collapse-toggle",
    type = "button",
    title = "Toggle sidebar",
    style = css(
      display = if (hide_collapse) "none",
      background_color = bg,
      color = fg
    ),
    "aria-expanded" = if (open || hide_collapse) "true" else "false",
    "aria-controls" = id,
    collapse_icon()
  )

  res <- list2(
    tag = tags$form(
      id = id,
      role = "complementary",
      class = c("sidebar", class),
      style = css(
        background_color = bg,
        color = fg
      ),
      ...
    ),
    collapse_tag = collapse_tag,
    position = match.arg(position),
    open = open,
    width = validateCssUnit(width),
    bg = bg,
    fg = fg
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
  sidebar,
  ...,
  fillable = FALSE,
  fill = TRUE,
  bg = NULL,
  fg = NULL,
  border = TRUE,
  border_radius = TRUE,
  height = NULL
) {
  if (!inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  # main content area colors, if not provided ----
  # 1. Fill in contrasting color for `fg` or `bg` if only one provided
  if (is.null(fg) && !is.null(bg)) {
    fg <- get_color_contrast(bg)
  }
  if (is.null(bg) && !is.null(fg)) {
    bg <- get_color_contrast(fg)
  }
  # 2. If the sidebar has a color, reset main to body fg/bg color
  if (is.null(fg) && !is.null(sidebar$fg)) {
    fg <- "var(--bs-body-color)"
  }
  if (is.null(bg) && !is.null(sidebar$bg)) {
    bg <- "var(--bs-body-bg)"
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

  contents <- list(sidebar$tag, sidebar$collapse_tag, main)
  columns <- c(sidebar$width, "minmax(0, 1fr)")
  columns_collapse <- c("0px", "minmax(0, 1fr)")

  right <- identical(sidebar$position, "right")
  if (right) {
    contents <- rev(contents)
    columns <- rev(columns)
    columns_collapse <- rev(columns_collapse)
  }

  res <- div(
    class = "bslib-sidebar-layout",
    class = if (right) "sidebar-right",
    class = if (isFALSE(sidebar$open)) "sidebar-collapsed",
    style = css(
      "--bslib-sidebar-columns" = columns,
      "--bslib-sidebar-columns-collapsed" = columns_collapse,
      "--bslib-sidebar-border" = if (!border) "none",
      "--bslib-sidebar-border-radius" = if (!border_radius) "initial",
      height = validateCssUnit(height),
      background_color = sidebar$bg,
      color = sidebar$fg
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
  tags$script("data-bslib-sidebar-init" = NA, HTML(
    "
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
    "
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

collapse_icon <- function() {
  HTML("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' class='collapse-icon' fill='currentColor'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>")
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
