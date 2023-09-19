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
#' @param theme A [bslib::bs_theme()] object.
#' @seealso [page_sidebar()]
#' @export
page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::bootstrapPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams shiny::fluidPage
#' @export
page_fluid <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fluidPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @inheritParams shiny::fixedPage
#' @export
page_fixed <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fixedPage(..., title = title, theme = theme, lang = lang)
  )
}

#' @rdname page
#' @param padding Padding to use for the body. This can be a numeric vector
#'   (which will be interpreted as pixels) or a character vector with valid CSS
#'   lengths. The length can be between one and four. If one, then that value
#'   will be used for all four sides. If two, then the first value will be used
#'   for the top and bottom, while the second value will be used for left and
#'   right. If three, then the first will be used for top, the second will be
#'   left and right, and the third will be bottom. If four, then the values will
#'   be interpreted as top, right, bottom, and left respectively.
#' @param fillable_mobile Whether or not the page should fill the viewport's
#'   height on mobile devices (i.e., narrow windows).
#' @param gap A [CSS length unit][htmltools::validateCssUnit()] defining the
#'   `gap` (i.e., spacing) between elements provided to `...`.
#' @export
page_fillable <- function(..., padding = NULL, gap = NULL, fillable_mobile = FALSE, title = NULL, theme = bs_theme(), lang = NULL) {
  page(
    title = title,
    theme = theme,
    lang = lang,
    bindFillRole(
      tags$body(
        class = "bslib-page-fill bslib-gap-spacing",
        style = css(
          padding = validateCssPadding(padding),
          gap = validateCssUnit(gap),
          "--bslib-page-fill-mobile-height" = if (fillable_mobile) "100%" else "auto"
        ),
        ...,
        component_dependency_css("page_fillable")
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
#' Create a dashboard layout with a full-bleed header (`title`) and [sidebar()].
#'
#' @inheritParams layout_sidebar
#' @inheritParams page_fillable
#' @param ... UI elements to display in the 'main' content area (i.e., next to
#'   the `sidebar`). These arguments are passed to `layout_sidebar()`, which has
#'   more details.
#' @param title A string, number, or [htmltools::tag()] child to display as the
#'   title (just above the `sidebar`).
#'
#' @export
#' @seealso [layout_sidebar()] for 'floating' sidebar layouts.
#' @seealso [accordion()] for grouping related input controls in the `sidebar`.
#' @seealso [card()] for wrapping outputs in the 'main' content area.
#' @seealso [value_box()] for highlighting values.
#'
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
page_sidebar <- function(..., sidebar = NULL, title = NULL, fillable = TRUE, fillable_mobile = FALSE, theme = bs_theme(), window_title = NA, lang = NULL) {

  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- h1(title, class = "bslib-page-title")
  }

  page_fillable(
    padding = 0,
    gap = 0,
    title = infer_window_title(title, window_title),
    theme = theme,
    lang = lang,
    fillable_mobile = fillable_mobile,
    class = "bslib-page-sidebar",
    title,
    layout_sidebar(
      sidebar = sidebar,
      fillable = fillable,
      border = FALSE,
      border_radius = FALSE,
      ...
    ),
    bs_dependency_defer(page_sidebar_dependency_sass)
  )
}

page_sidebar_dependency_sass <- function(theme) {
  component_dependency_sass(theme, "page_sidebar")
}


#' @rdname page
#' @inheritParams navset_bar
#' @seealso [shiny::navbarPage()]
#' @param fillable_mobile Whether or not `fillable` pages should fill the viewport's
#'   height on mobile devices (i.e., narrow windows).
#' @param underline Whether or not to add underline styling to page links when
#'   active or focused.
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use any character strings that appear in `title` (if none are found, the
#'   host URL of the page is displayed by default).
#' @export
page_navbar <- function(
  ...,
  title = NULL,
  id = NULL,
  selected = NULL,
  sidebar = NULL,
  fillable = TRUE,
  fillable_mobile = FALSE,
  gap = NULL,
  padding = NULL,
  position = c("static-top", "fixed-top", "fixed-bottom"),
  header = NULL,
  footer = NULL,
  bg = NULL,
  inverse = "auto",
  underline = TRUE,
  collapsible = TRUE,
  fluid = TRUE,
  theme = bs_theme(),
  window_title = NA,
  lang = NULL
) {


  # Default to fillable = F when this is called from shiny::navbarPage()
  # TODO: update shiny::navbarPage() to set fillable = FALSE and get rid of this hack
  if (missing(fillable)) {
    isNavbarPage <- isNamespaceLoaded("shiny") && identical(rlang::caller_fn(), shiny::navbarPage)
    if (isNavbarPage) {
      fillable <- FALSE
    }
  }

  # If a sidebar is provided, we want the layout_sidebar(fill = TRUE) component
  # (which is a sibling of the <nav>) to always fill the page
  page_func <- if (isFALSE(fillable) && is.null(sidebar)) {
    page
  } else {
    function(...) page_fillable(..., fillable_mobile = fillable_mobile, padding = 0, gap = 0)
  }

  page_func(
    title = infer_window_title(title, window_title),
    theme = theme,
    lang = lang,
    class = "bslib-page-navbar",
    navs_bar_(
      ..., title = title, id = id, selected = selected,
      sidebar = sidebar, fillable = fillable,
      gap = gap, padding = padding,
      position = match.arg(position), header = header,
      footer = footer, bg = bg, inverse = inverse,
      underline = underline, collapsible = collapsible,
      fluid = fluid, theme = theme
    )
  )
}

# https://github.com/rstudio/shiny/issues/2310
infer_window_title <- function(title = NULL, window_title = NA) {
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
