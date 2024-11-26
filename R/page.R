# TODO: Once we have more UI stuff in bslib, copy over the
# page constructors from shiny so folks can create static
# pages without a shiny dependency.

#' Modern Bootstrap page layouts
#'
#' These functions are small wrappers around shiny's page constructors (i.e.,
#' [shiny::fluidPage()], [shiny::navbarPage()], etc) that differ in two ways:
#'  * The `theme` parameter defaults bslib's recommended version of Bootstrap (for new projects).
#'  * The return value is rendered as an static HTML page when printed interactively at the console.
#'
#' @inheritParams shiny::bootstrapPage
#' @param ... UI elements for the page. Named arguments become HTML attributes.
#' @param theme A [bslib::bs_theme()] object.
#'
#' @seealso Dashboard-style pages: [page_sidebar()], [page_navbar()],
#'   [page_fillable()].
#'
#' @describeIn page A \pkg{bslib} wrapper for [shiny::bootstrapPage()], a basic
#'   Boostrap page where the content is added directly to the page body.
#'
#' @export
page <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  # Wrap ... in <body> since bootstrapPage() passes ... to tagList(),
  # which means named arguments aren't handled sensibly
  as_page(
    shiny::bootstrapPage(
      tags$body(...),
      title = title,
      theme = theme,
      lang = lang,
      # Components require Bootstrap 5+
      if (isTRUE(theme_version(theme) >= 5)) component_dependencies()
    ),
    theme = theme
  )
}

#' @describeIn page A \pkg{bslib} wrapper for [shiny::fluidPage()], a fluid
#'   Bootstrap-based page layout that extends to the full viewport width.
#' @inheritParams shiny::fluidPage
#' @export
page_fluid <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fluidPage(
      # Components require Bootstrap 5+
      if (isTRUE(theme_version(theme) >= 5)) component_dependencies(),
      ...,
      title = title,
      theme = theme,
      lang = lang
    ),
    theme = theme
  )
}

#' @describeIn page A \pkg{bslib} wrapper for [shiny::fixedPage()], a fixed
#'   Bootstrap-based page layout where the page content container is centered
#'   horizontally and its width is constrained.
#' @inheritParams shiny::fixedPage
#' @export
page_fixed <- function(..., title = NULL, theme = bs_theme(), lang = NULL) {
  as_page(
    shiny::fixedPage(
      # Components require Bootstrap 5+
      if (isTRUE(theme_version(theme) >= 5)) component_dependencies(),
      ...,
      title = title,
      theme = theme,
      lang = lang
    ),
    theme = theme
  )
}

#' A screen-filling page layout
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' A Bootstrap-based page layout whose contents fill the full height and width
#' of the browser window.
#'
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
#' @inheritParams page
#'
#' @export
#' @family Dashboard page layouts
#'
#' @seealso [layout_columns()] and [layout_column_wrap()] for laying out content
#'   into rows and columns.
#' @seealso [layout_sidebar()] for 'floating' sidebar layouts.
#' @seealso [accordion()] for grouping related input controls in the `sidebar`.
#' @seealso [card()] for wrapping outputs in the 'main' content area.
#' @seealso [value_box()] for highlighting values.
#'
#' @references
#'   * [Filling Layouts](https://rstudio.github.io/bslib/articles/filling/index.html)
#'     on the bslib website.
#'   * [Getting Started with Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
#'     on the bslib website.
#'
#' @examplesIf rlang::is_interactive()
#'
#' library(shiny)
#' library(ggplot2)
#'
#' ui <- page_fillable(
#'   h1("Example", code("mtcars"), "dashboard"),
#'   layout_columns(
#'     card(
#'       full_screen = TRUE,
#'       card_header("Number of forward gears"),
#'       plotOutput("gear")
#'     ),
#'     card(
#'       full_screen = TRUE,
#'       card_header("Number of carburetors"),
#'       plotOutput("carb")
#'     )
#'   ),
#'   card(
#'     full_screen = TRUE,
#'     card_header("Weight vs. Quarter Mile Time"),
#'     layout_sidebar(
#'       sidebar = sidebar(
#'         varSelectInput("var_x", "Compare to qsec:", mtcars[-7], "wt"),
#'         varSelectInput("color", "Color by:", mtcars[-7], "cyl"),
#'         position = "right"
#'       ),
#'       plotOutput("var_vs_qsec")
#'     )
#'   )
#' )
#'
#' server <- function(input, output) {
#'   for (var in c("cyl", "vs", "am", "gear", "carb")) {
#'     mtcars[[var]] <- as.factor(mtcars[[var]])
#'   }
#'
#'   output$gear <- renderPlot({
#'     ggplot(mtcars, aes(gear)) + geom_bar()
#'   })
#'
#'   output$carb <- renderPlot({
#'     ggplot(mtcars, aes(carb)) + geom_bar()
#'   })
#'
#'   output$var_vs_qsec <- renderPlot({
#'     req(input$var_x, input$color)
#'
#'     ggplot(mtcars) +
#'       aes(y = qsec, x = !!input$var_x, color = !!input$color) +
#'       geom_point()
#'   })
#' }
#'
#' shinyApp(ui, server)
page_fillable <- function(
  ...,
  padding = NULL,
  gap = NULL,
  fillable_mobile = FALSE,
  title = NULL,
  theme = bs_theme(),
  lang = NULL
) {
  page(
    title = title,
    theme = theme,
    lang = lang,
    class = "bslib-page-fill bslib-gap-spacing",
    class = if (!fillable_mobile) "bslib-flow-mobile",
    style = css(
      padding = validateCssPadding(padding),
      gap = validateCssUnit(gap)
    ),
    as_fillable_container(),
    tags$head(tags$style("html { height: 100%; }")),
    ...
  )
}

validateCssPadding <- function(padding = NULL) {
  if (is.null(padding)) return(NULL)
  paste(
    vapply(padding, validateCssUnit, character(1)),
    collapse = " "
  )
}

#' A sidebar page (i.e., dashboard)
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' Create a dashboard layout with a full-width header (`title`) and [sidebar()].
#'
#' @param ... UI elements to display in the 'main' content area (i.e., next to
#'   the `sidebar`). These arguments are passed to [layout_sidebar()], which has
#'   more details.
#' @param title A string, number, or [htmltools::tag()] child to display as the
#'   title (just above the `sidebar`).
#' @inheritParams layout_sidebar
#' @inheritParams page_fillable
#' @inheritParams page_navbar
#'
#' @export
#' @family Dashboard page layouts
#'
#' @seealso [layout_columns()] and [layout_column_wrap()] for laying out content
#'   into rows and columns.
#' @seealso [accordion()] for grouping related input controls in the `sidebar`.
#' @seealso [card()] for wrapping outputs in the 'main' content area.
#' @seealso [value_box()] for highlighting values.
#'
#' @references [Getting Started with Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
#'   on the bslib website.
#'
#' @examplesIf rlang::is_interactive()
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
page_sidebar <- function(
  ...,
  sidebar = NULL,
  title = NULL,
  fillable = TRUE,
  fillable_mobile = FALSE,
  theme = bs_theme(),
  window_title = NA,
  lang = NULL
) {
  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- h1(title, class = "bslib-page-title navbar-brand")
  }

  navbar_title <-
    if (!is.null(title)) {
      div(
        class = "navbar navbar-static-top",
        div(title, class = "container-fluid")
      )
    }

  sidebar <- maybe_page_sidebar(sidebar)

  dots <- separate_arguments(...)

  layout_sidebar_args <- rlang::list2(
    sidebar = sidebar,
    fillable = fillable,
    border = FALSE,
    border_radius = FALSE,
    !!!dots$attribs,
    page_main_container(dots$children)
  )

  page_fillable(
    padding = 0,
    gap = 0,
    title = infer_window_title(title, window_title),
    theme = theme,
    lang = lang,
    fillable_mobile = fillable_mobile,
    class = "bslib-page-sidebar",
    navbar_title,
    rlang::exec(layout_sidebar, !!!layout_sidebar_args)
  )
}

page_main_container <- function(...) {
  as_fill_carrier(
    tags$main(
      class = "bslib-page-main bslib-gap-spacing",
      ...
    )
  )
}

maybe_page_sidebar <- function(x) {
  if (is.null(x)) return(NULL)
  if (!inherits(x, "sidebar")) {
    x <- sidebar(x)
  }

  # If `open` is not provided, choose a page-level default
  x$open <- x$open %||% sidebar_open_on(desktop = "open", mobile = "always")

  x
}


#' Multi-page app with a top navigation bar
#'
#' @description
#' Create a page that contains a top level navigation bar that can be used to
#' toggle a set of [nav_panel()] elements. Use this page layout to create the
#' effect of a multi-page app, where your app's content is broken up into
#' multiple "pages" that can be navigated to via the top navigation bar.
#'
#' @param fillable_mobile Whether or not `fillable` pages should fill the viewport's
#'   height on mobile devices (i.e., narrow windows).
#' @param underline `r lifecycle::badge("deprecated")` Please use 
#'   [`navbar_options = navbar_options(underline=)`][navbar_options] instead.
#' @param window_title the browser window title. The default value, `NA`, means
#'   to use any character strings that appear in `title` (if none are found, the
#'   host URL of the page is displayed by default).
#' @inheritParams navset_bar
#' @inheritParams page
#'
#' @export
#' @family Dashboard page layouts
#'
#' @seealso [nav_panel()], [nav_menu()], and [nav_item()] for adding content
#'   sections and organizing or creating items in the navigation bar.
#' @seealso [layout_columns()] and [layout_column_wrap()] for laying out content
#'   into rows and columns.
#' @seealso [card()] for wrapping outputs in the 'main' content area.
#' @seealso [value_box()] for highlighting values.
#' @seealso [accordion()] for grouping related input controls in the `sidebar`.
#'
#' @references [Getting Started with Dashboards](https://rstudio.github.io/bslib/articles/dashboards/index.html)
#'   on the bslib website.
#'
#' @examplesIf rlang::is_interactive()
#' library(shiny)
#' library(bslib)
#'
#' link_shiny <- tags$a(
#'   shiny::icon("github"), "Shiny",
#'   href = "https://github.com/rstudio/shiny",
#'   target = "_blank"
#' )
#' link_posit <- tags$a(
#'   shiny::icon("r-project"), "Posit",
#'   href = "https://posit.co",
#'   target = "_blank"
#' )
#'
#' ui <- page_navbar(
#'   title = "My App",
#'   nav_panel(title = "One", p("First page content.")),
#'   nav_panel(title = "Two", p("Second page content.")),
#'   nav_panel("Three", p("Third page content.")),
#'   nav_spacer(),
#'   nav_menu(
#'     title = "Links",
#'     align = "right",
#'     nav_item(link_shiny),
#'     nav_item(link_posit)
#'   )
#' )
#'
#' server <- function(...) { } # not used in this example
#'
#' shinyApp(ui, server)
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
  header = NULL,
  footer = NULL,
  navbar_options = NULL,
  fluid = TRUE,
  theme = bs_theme(),
  window_title = NA,
  lang = NULL,
  position = deprecated(),
  bg = deprecated(),
  inverse = deprecated(),
  underline = deprecated(),
  collapsible = deprecated()
) {

  sidebar <- maybe_page_sidebar(sidebar)

  padding <- validateCssPadding(padding)
  gap <- validateCssUnit(gap)

  # Change behavior when called by Shiny
  # TODO: Coordinate with next bslib version bump in Shiny to use the new interface
  was_called_by_shiny <- isNamespaceLoaded("shiny") && identical(rlang::caller_fn(), shiny::navbarPage)

  .navbar_options <- navbar_options_resolve_deprecated(
    options_user = navbar_options,
    position = position,
    bg = bg,
    inverse = inverse,
    collapsible = collapsible,
    underline = underline,
    .fn_caller = "page_navbar",
    .warn_deprecated = !was_called_by_shiny
  )

  # Default to fillable = F when this is called from shiny::navbarPage()
  # TODO: update shiny::navbarPage() to set fillable = FALSE and get rid of this hack
  if (missing(fillable) && was_called_by_shiny) {
    fillable <- FALSE
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
    class = if (!is.null(sidebar)) "has-page-sidebar",
    navs_bar_(
      ...,
      title = title,
      id = id,
      selected = selected,
      sidebar = sidebar,
      fillable = fillable,
      gap = gap,
      padding = padding,
      header = header,
      footer = footer,
      position = .navbar_options$position,
      bg = .navbar_options$bg,
      inverse = .navbar_options$inverse,
      underline = .navbar_options$underline %||% TRUE,
      collapsible = .navbar_options$collapsible,
      fluid = fluid,
      theme = theme
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

  if (isTRUE(is.na(window_title))) NULL else window_title
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
