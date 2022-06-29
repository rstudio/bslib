#' Create a "full bleed" sidebar layout
#'
#' @export
layout_sidebar <- function(
    # TODO: side_width needs breakpoints
    side, main, side_width = "20%",
    # TODO GREG: do these CSS variables make sense?
    bg_colors = c("var(--bs-body-bg)", "var(--bs-light)"),
    top = "55px"
) {
  # TODO:
  # * provide a manual (and/or breakpoint based) collapsing option?
  # * make top do something smart by default (i.e., set in JS using $('.navbar').height())?

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

  div(
    class = "bslib-sidebar-layout",
    style = htmltools::css(
      grid_template_columns = paste(validateCssUnit(side_width), "1fr"),
      top = top
    ),
    side_el, main_el
  )
}
