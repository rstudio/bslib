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
#' @param fill_mobile Whether or not the page should fill the viewport's
#'   height on mobile devices (i.e., narrow windows).
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] defining the
#'   `gap` (i.e., spacing) between elements provided to `...`.
#' @seealso [shiny::fillPage()]
#' @export
page_fillable <- function(..., padding = NULL, gap = NULL, fill_mobile = FALSE, title = NULL, theme = bs_theme(), lang = NULL) {
  page(
    title = title,
    theme = theme,
    lang = lang,
    tags$head(tags$style(HTML("html { height: 100%; }"))),
    bindFillRole(
      tags$body(
        class = "bslib-page-fill bslib-gap-spacing",
        style = css(
          padding = validateCssPadding(padding),
          gap = validateCssUnit(gap),
          "--bslib-page-fill-mobile-height" = if (fill_mobile) "100%" else "auto"
        ),
        ...
      ),
      container = TRUE
    )
  )
}

validateCssPadding <- function(padding = NULL) {
  paste(
    vapply(padding, validateCssUnit, character(1)),
    collapse = " "
  )
}

#' A sidebar page (i.e., dashboard)
#'
#' Easily create a traditional dashboard layout with a full-bleed header
#' (`title`) and [sidebar()].
#'
#' @inheritParams page_fillable
#' @inheritParams layout_sidebar
#' @param title A string, number, or [htmltools::tag()] child to display as the
#'   title (just above the [layout_sidebar()]).
#'
#' @export
#' @examplesIf interactive()
#'
#' library(shiny)
#' library(ggplot2)
#'
#' ui <- page_sidebar(
#'   title = "Example dashboard",
#'   sidebar = sidebar(
#'     varSelectInput("var", "Select variable", mtcars)
#'   ),
#'   card(
#'     full_screen = TRUE,
#'     card_header("My plot"),
#'     plotOutput("p")
#'   )
#' )
#'
#' server <- function(input, output) {
#'   output$p <- renderPlot({
#'     ggplot(mtcars) + geom_histogram(aes(!!input$var))
#'   })
#' }
#'
#' shinyApp(ui, server)
#'
page_sidebar <- function(..., sidebar = sidebar(), title = NULL, fillable = TRUE, fill_mobile = FALSE, theme = bs_theme(), window_title = NULL, lang = NULL) {

  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- h2(title, class = "bslib-page-title")
  }

  page_fillable(
    padding = 0,
    gap = 0,
    title = get_window_title(title, window_title),
    theme = theme,
    lang = lang,
    fill_mobile = fill_mobile,
    title,
    layout_sidebar(
      sidebar = sidebar,
      fillable = fillable,
      border = FALSE,
      border_radius = FALSE,
      ...
    )
  )
}

#' @rdname page
#' @inheritParams navset_bar
#' @inheritParams bs_page
#' @seealso [shiny::navbarPage()]
#' @param fill_mobile Whether or not `fillable` pages should fill the viewport's
#'   height on mobile devices (i.e., narrow windows).
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use any character strings that appear in `title` (if none are found, the
#'   host URL of the page is displayed by default).
#' @export
page_navbar <- function(..., title = NULL, id = NULL, selected = NULL,
                        sidebar = NULL, fillable = TRUE, fill_mobile = FALSE,
                        fill_gap = NULL, fill_padding = NULL,
                        position = c("static-top", "fixed-top", "fixed-bottom"),
                        header = NULL, footer = NULL,
                        bg = NULL, inverse = "auto",
                        collapsible = TRUE, fluid = TRUE,
                        theme =  bs_theme(),
                        window_title = NA,
                        lang = NULL) {

  if (!is.null(sidebar) && !inherits(sidebar, "sidebar")) {
    abort("`sidebar` argument must contain a `bslib::sidebar()` component.")
  }

  # If a sidebar is provided, we want the layout_sidebar(fill = TRUE) component
  # (which is a sibling of the <nav>) to always fill the page
  page_func <- if (isFALSE(fillable) && is.null(sidebar)) {
    page
  } else {
    function(...) page_fillable(..., fill_mobile = fill_mobile, padding = 0, gap = 0)
  }

  page_func(
    title = get_window_title(title, window_title),
    theme = theme,
    lang = lang,
    navs_bar_(
      ..., title = title, id = id, selected = selected,
      sidebar = sidebar, fillable = fillable,
      fill_gap = fill_gap, fill_padding = fill_padding,
      position = match.arg(position), header = header,
      footer = footer, bg = bg, inverse = inverse,
      collapsible = collapsible, fluid = fluid,
      theme = theme
    )
  )
}

# https://github.com/rstudio/shiny/issues/2310
get_window_title <- function(title = NULL, window_title = NA) {
  if (!isTRUE(is.na(window_title))) {
    return(window_title)
  }

  if (!is.null(title)) {
    window_title <- unlist(find_characters(title))
    if (is.null(window_title)) {
      warning("Unable to infer a `window_title` default from `title`. Consider providing a character string to `window_title`.")
    } else {
      window_title <- paste(window_title, collapse = " ")
    }
  }

  window_title
}

# CPS (2023-02-09): Joe is currently working on a potentially
# more compelling contain_width() interface, so we'll punt on this for now
#
# #' Contain, pad, and align content
# #'
# #' @param ... A collection of [htmltools::tag()] children.
# #' @param size A size (i.e., max-width policy) for the container.
# #' @param bg A background color.
# #' @param class Additional CSS classes for the container.
# #'
# #' @references <https://getbootstrap.com/docs/5.3/layout/containers/>
# #'
# #' @export
# contain_width <- function(..., size = c("sm", "md", "lg", "xl", "xxl", # "fluid"), bg = NULL, class = NULL) {
#
#   size <- match.arg(size)
#
#   res <- div(
#     class = paste0("container-", size),
#     class = class,
#     # TODO: parseCssColors(), once it supports var() and !important
#     style = css(background_color = bg),
#     ...
#   )
#
#   as_fragment(
#     tag_require(res, version = 5, caller = "contain_width()")
#   )
# }

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
