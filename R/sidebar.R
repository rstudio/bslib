#' Sidebar layouts
#'
#' Create various sidebar-based layouts. See [this
#' article](https://rstudio.github.io/bslib/articles/sidebars.html) to learn
#' more.
#'
#' @param ... A collection of [htmltools::tag()] children (i.e., UI elements).
#' @param width A valid [CSS unit][htmltools::validateCssUnit] used for the
#'   width of the sidebar.
#' @param position Where the sidebar should appear relative to the main content.
#' @param open Whether or not the sidebar should be open on page load. Provide a
#'   value of `NA` to prevent sidebar from being collapsible.
#' @param id A character string. Required if wanting to re-actively read (or
#'   update) the `collapsible` state in a Shiny app.
#' @param bg A background color.
#' @param class Additional CSS classes for the top-level HTML element.
#'
#' @export
#' @seealso [card_sidebar()], [page_navbar()], [navs_tab_card()]
sidebar <- function(..., width = 250, position = c("left", "right"), open = TRUE, id = NULL, bg = NULL, class = NULL) {

  # For accessiblity reasons, always provide id when collapsible,
  # but only create input binding when id is provided
  if (is.null(id) && is.logical(open)) {
    id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-sidebar-input", class)
  }

  collapse_tag <- tags$button(
    class = "collapse-toggle",
    type = "button",
    "aria-expanded" = if (open) "true" else "false",
    "aria-controls" = id,
    title = "Toggle sidebar"
  )

  res <- list2(
    tag = tags$form(
      id = id,
      role = "complementary",
      class = c("sidebar", class),
      # TODO: parseCssColors(), once it supports var() and !important
      style = css("--bslib-sidebar-bg" = bg),
      ...
    ),
    collapse_tag = if (!isTRUE(is.na(open))) collapse_tag,
    position = match.arg(position),
    open = open,
    width = validateCssUnit(width)
  )

  class(res) <- c("sidebar", class(res))
  res
}


#' @describeIn sidebar A 'localized' sidebar layout
#'
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
layout_sidebar <- function(sidebar = sidebar(), ..., fillable = FALSE, fill = TRUE, bg = NULL, border = TRUE, border_radius = TRUE, height = NULL) {

  if (!inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  main <- div(
    role = "main",
    class = "main",
    # TODO: parseCssColors(), once it supports var() and !important
    style = css("--bslib-sidebar-main-bg" = bg),
    ...
  )

  main <- bindFillRole(main, container = fillable)

  contents <- list(sidebar$tag, sidebar$collapse_tag, main)
  columns <- c(sidebar$width, "minmax(0, 1fr)")
  columns_collapse <- c("0px", "minmax(0, 1fr)")

  if (identical(sidebar$position, "right")) {
    contents[[2]] <- tagAppendAttributes(
      contents[[2]], class = "collapse-toggle-right"
    )
    contents <- rev(contents)
    columns <- rev(columns)
    columns_collapse <- rev(columns_collapse)
  }

  res <- div(
    class = "bslib-sidebar-layout",
    class = if (isFALSE(sidebar$open)) "sidebar-collapsed",
    style = css(
      "--bslib-sidebar-width" = sidebar$width,
      "--bslib-sidebar-columns" = columns,
      "--bslib-sidebar-columns-collapsed" = columns_collapse,
      "--bslib-sidebar-border" = if (!border) "none",
      "--bslib-sidebar-border-radius" = if (!border_radius) "initial",
      height = validateCssUnit(height)
    ),
    !!!contents,
    sidebar_dependency()
  )

  res <- bindFillRole(res, item = fill)

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}


#' @describeIn sidebar Close a (`collapsible`) [sidebar()].
#' @param session a shiny session object (the default should almost always be
#'   used).
#' @export
sidebar_open <- function(id, session = get_current_session()) {
  callback <- function() {
    session$sendInputMessage(id, list(method = "open"))
  }
  session$onFlush(callback, once = TRUE)
}

#' @describeIn sidebar Close a (`collapsible`) [sidebar()].
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
