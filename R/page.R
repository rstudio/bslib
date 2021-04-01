#' Creat a Bootstrap page
#'
#' Alias for [shiny::bootstrapPage()] with `theme` defaulting to a newer version
#' of Bootstrap.
#'
#' @export
bs_page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  page(
    shiny::bootstrapPage(..., title = title, theme = theme, lang = lang),
    theme = theme
  )
}


#' Create a page with fluid layout
#'
#' Alias for [shiny::fluidPage()] with `theme` defaulting to a newer version
#' of Bootstrap.
#'
#' @export
#' @inheritParams shiny::fluidPage
page_fluid <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  printable(
    shiny::fluidPage(..., title = title, theme = theme, lang = lang),
    theme = theme
  )
}

#' Create a page with fluid layout
#'
#' Alias for [shiny::fixedPage()] with `theme` defaulting to a newer version
#' of Bootstrap.
#'
#' @export
#' @inheritParams shiny::fixedPage
page_fixed <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  printable(
    shiny::fixedPage(..., title = title, theme = theme, lang = lang),
    theme = theme
  )
}
