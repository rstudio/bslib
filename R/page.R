# TODO: Once we have more UI stuff in bslib, copy over the
# page constructors from shiny so folks can create static
# pages without a shiny dependency.

#' Create a Bootstrap page
#'
#' Alias for [shiny::bootstrapPage()] with `theme` defaulting to bslib's
#' recommended version Bootstrap.
#'
#' @export
#' @inheritParams shiny::bootstrapPage
page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::bootstrapPage(..., title = title, theme = theme, lang = lang)
  )
}

#' Create a page with fluid layout
#'
#' Alias for [shiny::fluidPage()] with `theme` defaulting to bslib's recommended
#' version Bootstrap.
#'
#' @export
#' @inheritParams shiny::fluidPage
page_fluid <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fluidPage(..., title = title, theme = theme, lang = lang)
  )
}

#' Create a page with fluid layout
#'
#' Alias for [shiny::fixedPage()] with `theme` defaulting to bslib's recommended
#' version Bootstrap.
#'
#' @export
#' @inheritParams shiny::fixedPage
page_fixed <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fixedPage(..., title = title, theme = theme, lang = lang)
  )
}


#' Create a navbar page
#'
#' A convenience wrapper around [navs_bar()] and [page()].
#'
#' @inheritParams navs_bar
#' @inheritParams bs_page
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use `title` if it's character string (otherwise, it defaults to the host
#'   URL of the page).
#' @export
page_navbar <- function(..., title = NULL, id = NULL, selected = NULL,
                        position = c("static-top", "fixed-top", "fixed-bottom"),
                        header = NULL, footer = NULL,
                        bg = NULL, inverse = "auto",
                        collapsible = TRUE, fluid = TRUE,
                        theme =  bs_theme(),
                        window_title = NA,
                        lang = NULL) {

  # https://github.com/rstudio/shiny/issues/2310
  if (isTRUE(is.na(window_title))) {
    if (is.character(title)) {
      window_title <- paste(title, collapse = "\n")
    } else {
      warning("Not using `title` to populate `window_title` since it's not a char")
      window_title <- NULL
    }
  }

  page(
    title = window_title,
    theme = theme,
    lang = lang,
    navs_bar(
      ..., title = title, id = id, selected = selected,
      position = match.arg(position), header = header,
      footer = footer, bg = bg, inverse = inverse,
      collapsible = collapsible, fluid = fluid
    )
  )
}
