#' Create various sidebar-based layouts
#'
#' @param ... A collection of [htmltools::tag()] children to place in the main
#'   content area.
#' @param width A valid [CSS unit][htmltools::validateCssUnit] used for the
#'   width of the sidebar.
#' @param collapsible Whether or not the sidebar should be collapsible.
#' @param id A character string. Required if wanting to re-actively read (or
#'   update) the `collapsible` state in a Shiny app.
#' @param bg A background color.
#' @param class Additional CSS classes for the top-level HTML element.
#'
#' @export
#' @seealso [card_sidebar()], [container()], [page_navbar()]
sidebar <- function(..., width = 250, collapsible = TRUE, id = NULL, bg = NULL, class = NULL) {
  
  # For accessiblity reasons, always provide id (when collapsible), 
  # but only create input binding when id is provided
  if (is.null(id) && collapsible) {
    id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-sidebar-input", class)
  }

  res <- list2(
    tag = tags$form(
      id = id,
      role = "complementary",
      class = c("sidebar", class),
      # TODO: parseCssColors(), once it supports var() and !important
      style = css(background_color = bg),
      ...
    ),
    collapse_tag = tags$a(
      class = "collapse-toggle",
      role = "button",
      "aria-expanded" = "true",
      "aria-controls" = id
    ),
    width = validateCssUnit(width)
  )

  class(res) <- c("sidebar", class(res))
  res
}


#' @describeIn sidebar A 'low-level' sidebar layout
#'
#' @param sidebar A [sidebar()] object.
#' @param full_bleed whether or not to clip the layout container the entire viewport.
#' @param fill whether or not the `main` content area should be considered a
#'   fill (i.e., flexbox) container.
#' @param border whether or not to add a border.
#' @param border_radius whether or not to add a border radius.
#'
#' @export
layout_sidebar <- function(sidebar = sidebar(), ..., full_bleed = FALSE, fill = FALSE, bg = "var(--bs-body-bg)", border = !full_bleed, border_radius = !full_bleed, class = NULL) {
  if (!inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  main <- div(
    role = "main",
    class = "main",
    # TODO: parseCssColors(), once it supports var() and !important
    style = css(background_color = bg),
    ...
  )

  border_css <- if (border) {
    "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)"
  } else {
    "none"
  }

  border_radius_css <- if (border_radius) "var(--bs-border-radius)" else "initial"

  res <- div(
    class = c("bslib-sidebar-layout", class),
    style = css(
      "--bslib-sidebar-width" = sidebar$width,
      "--bslib-sidebar-border" = border_css,
      "--bslib-sidebar-border-radius" = border_radius_css
    ),
    sidebar$tag,
    sidebar$collapse_tag,
    bindFillRole(main, container = fill),
    sidebar_dependency()
  )

  if (full_bleed) {
    res <- tagAppendAttributes(res, style = css(position = "fixed", inset = 0))
    res <- tagAppendChild(res, adjust_full_bleed_inset())
  }

  res <- bindFillRole(res, item = TRUE)

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}


#' @describeIn sidebar Close a (`collapsible`) [sidebar()].
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


adjust_full_bleed_inset <- function() {
  tags$script("data-bslib-sidebar-full-bleed-inset" = NA, HTML(
    "
    var thisScript = document.querySelector('script[data-bslib-sidebar-full-bleed-inset]');
    thisScript.removeAttribute('data-bslib-sidebar-full-bleed-inset');

    var navbar = $('.navbar:visible');
    // TODO: actually handle the multiple navbar case.
    if (navbar.length > 1) {
      console.warning('More than one navbar is visible. Will only adjust full_bleed layout for the first navbar.')
      navbar = navbar.first();
    }
    if (navbar.length == 1) {
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