#' Navigation containers
#'
#' Render a collection of [nav()] items into a container.
#'
#' @param ... a collection of [nav()] items.
#' @param id a character string used for dynamically updating the container (see [nav_select()]).
#' @param selected a character string matching the `value` of a particular [nav()] item to selected by default.
#' @param header UI element(s) ([tags]) to display _above_ the nav content.
#' @param footer UI element(s) ([tags]) to display _below_ the nav content.
#' @export
#' @seealso [nav()], [nav_select()].
#' @rdname navs
#' @examples
#'
#' library(shiny)
#'
#' nav_items <- function(prefix) {
#'   list(
#'     nav("a", paste(prefix, ": tab a content")),
#'     nav("b", paste(prefix, ": tab b content")),
#'     nav_item(
#'       tags$a(icon("github"), "Shiny", href = "https://github.com/rstudio/shiny", target = "_blank")
#'     ),
#'     nav_spacer(),
#'     nav_menu(
#'       "Other links", align = "right",
#'       nav("c", paste(prefix, ": tab c content")),
#'       nav_item(
#'         tags$a(icon("r-project"), "RStudio", href = "https://rstudio.com", target = "_blank")
#'       )
#'     )
#'   )
#' }
#'
#' if (interactive()) {
#'   shinyApp(
#'     page_navbar(
#'       title = "page_navbar()",
#'       bg = "#0062cc",
#'       !!!nav_items("page_navbar()"),
#'       footer = div(
#'         style = "width:80%; margin: 0 auto",
#'         h4("navs_tab()"),
#'         navs_tab(!!!nav_items("navs_tab()")),
#'         h4("navs_pill()"),
#'         navs_pill(!!!nav_items("navs_pill()")),
#'         h4("navs_tab_card()"),
#'         navs_tab_card(!!!nav_items("navs_tab_card()")),
#'         h4("navs_pill_card()"),
#'         navs_pill_card(!!!nav_items("navs_pill_card()")),
#'         h4("navs_pill_list()"),
#'         navs_pill_list(!!!nav_items("navs_pill_list()"))
#'       )
#'     ),
#'     function(...) { }
#'   )
#' }
navs_tab <- function(..., id = NULL, selected = NULL,
                     header = NULL, footer = NULL) {
  Compile(Tag(
    "Navs", type = "tabs", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer), ...
  ))
}

#' @export
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL,
                          header = NULL, footer = NULL) {
  Compile(Tag(
    "NavsCard", type = "tabs", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer), ...
  ))
}

#' @export
#' @rdname navs
navs_pill <- function(..., id = NULL, selected = NULL,
                      header = NULL, footer = NULL) {
  Compile(Tag(
    "Navs", type = "pills", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer), ...
  ))
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL,
                           header = NULL, footer = NULL,
                           placement = c("above", "below")) {
  Compile(Tag(
    "NavsCard", type = "pills", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer),
    placement = match.arg(placement), ...
  ))
}

#' @export
#' @inheritParams shiny::navlistPanel
#' @rdname navs
navs_pill_list <- function(..., id = NULL, selected = NULL,
                           header = NULL, footer = NULL,
                           well = TRUE, fluid = TRUE,
                           widths = c(4, 8)) {
  Compile(Tag(
    "NavsList", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer), well = well,
    widthNav = widths[[1]], widthContent = widths[[2]], ...
  ))
}

#' @export
#' @rdname navs
navs_hidden <- function(..., id = NULL, selected = NULL,
                        header = NULL, footer = NULL) {
  # TODO: implement (does this need it's own component)?
  Compile(Tag(
    "NavsHidden", id = id, selected = selected,
    header = html_attr(header), footer = html_attr(footer), ...
  ))
}


#' @inheritParams shiny::navbarPage
#' @param bg a CSS color to use for the navbar's background color.
#' @param inverse Either `TRUE` for a light text color or `FALSE` for a dark
#'   text color. If `"auto"` (the default), the best contrast to `bg` is chosen.
#' @export
#' @rdname navs
navs_bar <- function(..., title = NULL, id = NULL, selected = NULL,
                     # TODO: add sticky-top as well?
                     position = c("static-top", "fixed-top", "fixed-bottom"),
                     header = NULL, footer = NULL,
                     bg = NULL, inverse = "auto",
                     collapsible = TRUE, fluid = TRUE) {
  Compile(Tag(
    "NavsBar", title = title, id = id, selected = selected,
    position = match.arg(position),
    header = html_attr(header), footer = html_attr(footer),
    bg = bg, inverse = inverse,
    collapsible = collapsible, fluid = fluid,
    ...
  ))
}

Compile <- function(x) {
  if (!nzchar(Sys.which("yarn"))){
    stop("The yarn command line utility is required for compilation")
  }
  tmpdir <- tempfile()
  dir.create(tmpdir)
  owd <- setwd(tmpdir)
  on.exit(setwd(owd), add = TRUE)
  file.copy(
    dir(system.file("srcjs", package = "bslib"), full.names = TRUE),
    getwd(),
    recursive = TRUE
  )
  src <- c(
    "import ReactDOMServer from 'react-dom/server';",
    readLines("core.js"),
    paste0("const html = ", as.character(x)),
    "console.log(ReactDOMServer.renderToString(html));"
  )
  writeLines(src, "entry.js")
  system("yarn install")
  system("yarn build")
  as_fragment(HTML(system("node outfile.js", intern = TRUE)))
}
