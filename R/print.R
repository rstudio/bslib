fragment <- function(x, page = shiny::fluidPage, theme = bs_global_get() %||% bs_theme(), class = NULL) {
  stopifnot(is.function(page) && "theme" %in% names(formals(page)))
  stopifnot(is_bs_theme(theme))
  attr(x, "bslib_page") <- page
  attr(x, "bslib_theme") <- theme
  class(x) <- c(class, "bslib_fragment", class(x))
  x
}

#' @export
print.bslib_fragment <- function(x, ...) {
  page <- attr(x, "bslib_page")
  theme <- attr(x, "bslib_theme")
  x <- browsable2(page(x, theme = theme))
  withShinyTheme(print(x, ...), theme)
  invisible(x)
}

browsable2 <- function(x) {
  if (rlang::is_interactive()) browsable(x) else x
}

# Needed decause bootstrapLib() doesn't perform side-effects
# outside of shiny::isRunning()
withShinyTheme <- function(expr, theme) {
  currentTheme <- shiny::getCurrentTheme()
  on.exit(setCurrentTheme(currentTheme))
  setCurrentTheme(theme)
  force(expr)
}

setCurrentTheme <- function(...) {
  getFromNamespace("setCurrentTheme", "shiny")(...)
}
