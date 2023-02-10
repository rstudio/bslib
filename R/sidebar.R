#' Create various sidebar-based layouts
#'
#' @param ... A collection of [htmltools::tag()] children (i.e., UI elements).
#' @param width A valid [CSS unit][htmltools::validateCssUnit] used for the
#'   width of the sidebar.
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

  collapse_tag <- tags$a(
    class = "collapse-toggle",
    role = "button",
    "aria-expanded" = "true",
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
#' @param fill Whether or not the `main` content area should be considered a
#'   fill (i.e., flexbox) container.
#' @param border Whether or not to add a border.
#' @param border_radius Whether or not to add a border radius.
#' @inheritParams card
#'
#' @export
layout_sidebar <- function(sidebar = sidebar(), ..., fill = FALSE, bg = NULL, border = TRUE, border_radius = TRUE, height = NULL) {

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

  main <- bindFillRole(main, container = fill)

  border_css <- if (border) {
    "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)"
  } else {
    "none"
  }

  border_radius_css <- if (border_radius) "var(--bs-border-radius)" else "initial"

  sidebar_right <- identical(sidebar$position, "right")

  contents <- if (sidebar_right) {
    list(main, sidebar$collapse_tag, sidebar$tag)
  } else {
    list(sidebar$tag, sidebar$collapse_tag, main)
  }

  res <- div(
    class = "bslib-sidebar-layout",
    class = if (sidebar_right) "right-sidebar",
    class = if (isFALSE(sidebar$open)) "sidebar-collapsed",
    style = css(
      "--bslib-sidebar-width" = sidebar$width,
      "--bslib-sidebar-border" = border_css,
      "--bslib-sidebar-border-radius" = border_radius_css,
      height = validateCssUnit(height)
    ),
    !!!contents,
    sidebar_dependency()
  )

  res <- bindFillRole(res, item = TRUE)

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}

#' @describeIn sidebar A 'full-bleed' sidebar layout
#'
#' @param inset A valid [CSS
#'   inset](https://developer.mozilla.org/en-US/docs/Web/CSS/inset) definition.
#'   If not provided, a sensible default to avoid overlap with [page_navbar()]
#'   is provided.
#'
#' @export
layout_sidebar_full_bleed <- function(sidebar = sidebar(), ..., fill = FALSE, bg = NULL, inset = NULL, class = NULL) {

  res <- layout_sidebar(
    sidebar, ..., fill = fill, bg = bg, class = class,
    border = FALSE, border_radius = FALSE
  )

  res <- tagAppendAttributes(res, class = "full-bleed")

  if (is.null(inset)) {
    tagAppendChild(res, adjust_full_bleed_inset())
  } else {
    tagAppendAttributes(res, style = css("--bslib-sidebar-full-bleed-inset" = inset))
  }
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

# TODO: actually handle the multiple navbar case?
adjust_full_bleed_inset <- function() {
  tags$script("data-bslib-sidebar-full-bleed-inset" = NA, HTML(
    "
    var thisScript = document.querySelector('script[data-bslib-sidebar-full-bleed-inset]');
    thisScript.removeAttribute('data-bslib-sidebar-full-bleed-inset');

    var navbar = $('.navbar:visible');
    if (navbar.length > 1) {
      console.warning('More than one navbar is visible. Will only adjust full_bleed layout for the first navbar.');
      navbar = navbar.first();
    }
    if (navbar.length === 1) {
      var height = navbar.outerHeight() + 'px';
      var $el = $(thisScript.parentElement);
      navbar.hasClass('navbar-fixed-bottom') ?
        $el.css('bottom', height) :
        $el.css('top', height);
    }
    "
  ))
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
