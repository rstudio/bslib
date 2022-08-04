#' Create a "full bleed" sidebar layout
#'
#' @param side A [htmltools::tag] (or list of them) to place in the sidebar.
#' @param main A [htmltools::tag] (or list of them) to place in the main content area.
#' @param side_width A valid CSS unit used for the width of the sidebar.
#' @param bg_colors A character vector of color codes of length 2. The first color is
#' used for the `side` content and the second in is used for the `main` content.
#' @export
layout_sidebar <- function(side, main, side_width = "20%", bg_colors = c("var(--bs-body-bg)", "var(--bs-light)")) {

  side_el <- tags$form(
    role = "complementary",
    class = "sidebar",
    style = htmltools::css(background_color = bg_colors[1]),
    side
  )

  main_el <- div(
    role = "main",
    class = "main",
    style = htmltools::css(background_color = bg_colors[2]),
    main
  )

  id <- paste0("bslib-sidebar-", p_randomInt(1000, 10000))

  js <- sprintf(
    "$(function() {
       var navbar = $('.navbar').first();
       var navHeight = navbar.outerHeight();
       var sidebarContainer = $('#%s');
       sidebarContainer.css('top', navHeight + 'px');
       $(window).trigger('resize');
    })",
    id
  )

  div(
    id = id,
    class = "bslib-sidebar-layout",
    style = htmltools::css(
      grid_template_columns = paste(validateCssUnit(side_width), "1fr")
    ),
    side_el, main_el,
    tags$head(tags$script(HTML(js)))
  )
}
