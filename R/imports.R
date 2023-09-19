#' Helpers for importing web fonts
#'
#' `font_google()`, `font_link()`, and `font_face()` are all re-exported from
#' the \pkg{sass} package (see [sass::font_face()] for details). For a quick
#' example of how to use these functions with [bslib::bs_theme()], see the
#' examples section below.
#'
#' @importFrom sass font_face
#' @export font_face
#' @name font_face
#' @examples
#'
#' # If you have an internet connection, running the following code
#' # will download, cache, and import the relevant Google Font files
#' # for local use
#' theme <- bs_theme(
#'   base_font = font_google("Fira Sans"),
#'   code_font = font_google("Fira Code"),
#'   heading_font = font_google("Fredoka One")
#' )
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
#'
#' # Three different yet equivalent ways of importing a remotely-hosted Google Font
#' a <- font_google("Crimson Pro", wght = "200..900", local = FALSE)
#' b <- font_link(
#'   "Crimson Pro",
#'   href = "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900"
#' )
#' url <- "https://fonts.gstatic.com/s/crimsonpro/v13/q5uDsoa5M_tv7IihmnkabARboYF6CsKj.woff2"
#' c <- font_face(
#'   family = "Crimson Pro",
#'   style = "normal",
#'   weight = "200 900",
#'   src = paste0("url(", url, ") format('woff2')")
#' )
#' theme <- bs_theme(base_font = c)
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
NULL

#' @importFrom sass font_link
#' @export font_link
#' @name font_link
#' @rdname font_face
NULL

#' @importFrom sass font_google
#' @export font_google
#' @name font_google
#' @rdname font_face
NULL

#' @importFrom sass font_collection
#' @export font_collection
#' @name font_collection
#' @rdname font_face
NULL
