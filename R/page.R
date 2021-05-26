# TODO: Once we have more UI stuff in bslib, copy over the
# page constructors from shiny so folks can create static
# pages without a shiny dependency.

#' Create a Bootstrap page
#'
#' These functions are small wrappers around shiny's page constructors (i.e., [shiny::fluidPage()], [shiny::navbarPage()], etc) that differ in two ways:
#'  * The `theme` parameter defaults bslib's recommended version of Bootstrap (for new projects).
#'  * The return value is rendered as an static HTML page when printed interactively at the console.
#'
#' @inheritParams shiny::bootstrapPage
#' @seealso [shiny::bootstrapPage()]
#' @export
page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::bootstrapPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams shiny::fluidPage
#' @seealso [shiny::fluidPage()]
#' @export
page_fluid <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fluidPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams shiny::fixedPage
#' @seealso [shiny::fixedPage()]
#' @export
page_fixed <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fixedPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams shiny::fillPage
#' @seealso [shiny::fillPage()]
#' @export
page_fill <- function(..., padding = 0, title = NULL,
                      theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fillPage(..., padding = padding, title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams navs_bar
#' @inheritParams bs_page
#' @seealso [shiny::navbarPage()]
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use any character strings that appear in `title` (if none are found, the
#'   host URL of the page is displayed by default).
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
  if (!is.null(title) && isTRUE(is.na(window_title))) {
    window_title <- unlist(find_characters(title))
    if (is.null(window_title)) {
      warning("Unable to infer a `window_title` default from `title`. Consider providing a character string to `window_title`.")
    } else {
      window_title <- paste(window_title, collapse = " ")
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

#> unlist(find_characters(div(h1("foo"), h2("bar"))))
#> [1] "foo" "bar"
find_characters <- function(x) {
  if (is.character(x)) {
    return(x)
  }
  if (inherits(x, "shiny.tag")) {
    return(lapply(x$children, find_characters))
  }
  if (is.list(x)) {
    return(lapply(x, find_characters))
  }
  NULL
}
