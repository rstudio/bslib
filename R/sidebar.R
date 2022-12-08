#' Create a "full bleed" sidebar layout
#'
#' @param side A [htmltools::tag()] child to place in the sidebar.
#' @param main A [htmltools::tag()] child to place in the main content area.
#' @param side_width A valid [CSS unit][htmltools::validateCssUnit] used for the width of the sidebar.
#' @param bg_colors A character vector of color codes of length 2. The first color is
#' used for the `side` content and the second in is used for the `main` content.
#' @param fill whether or not the `main` content area should be considered a fill (i.e., flexbox) container.
#' @param class Additional CSS classes for the top-level HTML element.
#'
#' @export
layout_sidebar <- function(..., sidebar = list(), sidewidth = 250,
                           title = NULL, collapsible = TRUE, fill = FALSE,
                           bg_colors = c("var(--bs-body-bg)", "var(--bs-gray-200)"),
                           class = NULL) {

  if (!is.null(title)) {
    sidebar <- tagList(title, hr(class = "my-3"), sidebar)
  }

  collapse_id <- if (collapsible) paste0("bslib-sidebar-collapse", p_randomInt(1000, 10000))
  collapse_control <- if (collapsible) collapse_control(collapse_id)

  sidebar <- tags$form(
    role = "complementary",
    class = "sidebar border-end",
    class = if (collapsible) "collapse collapse-horizontal show",
    id = collapse_id,
    style = css(background_color = bg_colors[1]),
    sidebar
  )

  main <- div(
    role = "main",
    class = "main",
    style = css(background_color = bg_colors[2]),
    ...
  )

  main <- bindFillRole(main, container = fill)

  id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))

  js <- sprintf(
    "
    var thisScript = document.querySelector('script[data-bslib-sidebar-layout-needs-init]');
    if (!thisScript) throw new Error('Failed to adjust height of layout_sidebar()');

    thisScript.removeAttribute('data-bslib-sidebar-layout-needs-init')

    // Let Shiny know to trigger resize when the sidebar size changes
    // (so that outputs resize when the sidebar collapses)
    // TODO: shiny could/should do this itself (rstudio/shiny#3682)
    var resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
    ro.observe(document.getElementById('%s').querySelector('.main'));

    // Add some top to the fixed positioning if a navbar is present
    var navbar = $('.navbar').first();
    var sidebarLayout = $('#%s');
    sidebarLayout.css('top', navbar.outerHeight() + 'px');
    ",
    id, id
  )

  res <- div(
    id = id,
    class = c("bslib-sidebar-layout", class),
    style = css(
      grid_template_columns = paste(
        validateCssUnit(sidewidth), "minmax(0, 1fr)"
      )
    ),
    sidebar,
    collapse_control,
    main,
    tags$script("data-bslib-sidebar-layout-needs-init" = NA, HTML(js))
  )

  as_fragment(
    tag_require(res, version = 5, caller = "layout_sidebar()")
  )
}



collapse_control <- function(collapse_id) {
  tags$a(
    class = "sidebar-collapse",
    type = "button",
    "data-bs-toggle" = "collapse",
    "data-bs-target" = paste0("#", collapse_id),
    "aria-expanded" = "false",
    "aria-controls" = collapse_id
  )
}
