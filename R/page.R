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

  padding_css <- paste(
    sapply(padding, validateCssUnit, USE.NAMES = FALSE),
    collapse = " "
  )

  styles <- tags$style(
    type = "text/css",
    "html, body { width: 100%; height: 100%; }",
     sprintf("body { padding: %s; margin: 0; }", padding_css)
  )

  page(
    title = title,
    theme = theme,
    lang = lang,
    tags$head(styles),
    # TODO: is there a good reason why bootstrapPage() doesn't return a <body> already?
    bindFillRole(tags$body(...), container = TRUE)
  )
}

#' @rdname page
#' @inheritParams navs_bar
#' @inheritParams bs_page
#' @seealso [shiny::navbarPage()]
#' @param sidebar A [sidebar()] component to display on every [nav()] page.
#' @param fill Whether or not to allow 'fill items' (i.e., UI elements marked with
#'   `htmltools::bindFillRole(x, item = TRUE)`) to fit the viewport. If `TRUE`,
#'   all [nav()] pages are filled. A character vector, matching the `value` of
#'   [nav()]s to be filled, may also be provided.
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use any character strings that appear in `title` (if none are found, the
#'   host URL of the page is displayed by default).
#' @export
page_navbar <- function(..., title = NULL, id = NULL, selected = NULL,
                        sidebar = NULL, fill = FALSE,
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

  if (!is.null(sidebar) && !inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  page_func <- if (!isFALSE(fill)) page_fill else page

  page_func(
    title = window_title,
    theme = theme,
    lang = lang,
    navs_bar(
      ..., title = title, id = id, selected = selected,
      sidebar = sidebar, fill = fill,
      position = match.arg(position), header = header,
      footer = footer, bg = bg, inverse = inverse,
      collapsible = collapsible, fluid = fluid
    )
  )
}

#' Contain, pad, and align content
#'
#' @param ... A collection of [htmltools::tag()] children.
#' @param size A size (i.e., max-width policy) for the container.
#' @param bg A background color.
#' @param class Additional CSS classes for the container.
#'
#' @references <https://getbootstrap.com/docs/5.3/layout/containers/>
#'
#' @export
container <- function(..., size = c("sm", "md", "lg", "xl", "xxl", "fluid"), bg = NULL, class = NULL) {

  size <- match.arg(size)

  res <- div(
    class = paste0("container-", size),
    class = class,
    # TODO: parseCssColors(), once it supports var() and !important
    style = css(background_color = bg),
    ...
  )

  as_fragment(
    tag_require(res, version = 5, caller = "container()")
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
