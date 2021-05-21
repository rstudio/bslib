# TODO: Once we have more UI stuff in bslib, copy over the
# page constructors from shiny so folks can create static
# pages without a shiny dependency.

#' Create a Bootstrap page
#'
#' Alias for [shiny::bootstrapPage()] with `theme` defaulting to a newer version
#' of Bootstrap.
#'
#' @export
bs_page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  browsable2(
    shiny::bootstrapPage(..., title = title, theme = theme, lang = lang)
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
  browsable2(
    shiny::fluidPage(..., title = title, theme = theme, lang = lang)
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
  browsable2(
    shiny::fixedPage(..., title = title, theme = theme, lang = lang)
  )
}
