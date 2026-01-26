#' Localized themes
#'
#' Tools for using bootstraplib themes in a localized manner. Use
#' `bs_with_theme()` to scope theming side-effects to the given `expr` and
#' `bs_local_theme()` to scope within a particular environment. This makes
#' `bs_local_theme()` handy for theming within a function that returns a shiny
#' app and `bs_with_theme()` handy for running "top-level" code at the R console
#' without introducing theming side-effects.
#'
#' @param expr theming code to evaluate in a localized fashion
#' @param .local_envir The environment to use for scoping.
#' @export
#' @examples
#'
#' theme <- bs_theme_get()
#' bs_with_theme({
#'   bs_theme_new()
#'   bs_theme_base_colors(bg = "black", fg = "white")
#'   if (interactive()) shiny::runExample("01_hello")
#' })
#' identical(theme, bs_theme_get())
#'
#' my_app_func <- function() {
#'   bs_local_theme({
#'     bs_theme_new(3)
#'     bs_theme_base_colors(bg = "black", fg = "white")
#'   })
#'   shinyApp(fluidPage("Howdy"), function(input, output) {})
#' }
#'
#' my_app_func()
#' identical(theme, bs_theme_get())
#'
bs_local_theme <- function(expr, .local_envir = parent.frame()) {
  old_theme <- bs_theme_get()
  withr::defer(bs_theme_set(old_theme), envir = .local_envir)
  force(expr)
}

#' @rdname bs_local_theme
bs_with_theme <- function(expr) {
  old_theme <- bs_theme_get()
  on.exit(bs_theme_set(old_theme), add = TRUE)
  force(expr)
}
