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
  theme <- attr(x, "bslib_theme")
  x <- attr(x, "bslib_page")(x, theme = theme)
  print.bslib_page(page(x, theme = theme))
  invisible(x)
}

page <- function(x, theme) {
  attr(x, "bslib_theme") <- theme
  class(x) <- c("bslib_page", class(x))
  x
}

#' @export
print.bslib_page <- function(x, ...) {
  class(x) <- setdiff(class(x), "bslib_page")
  withShinyTheme(
    print(browsable(x)),
    attr(x, "bslib_theme")
  )
  invisible(x)
}

# Needed decause bootstrapLib() doesn't perform side-effects
# outside of shiny::isRunning()
withShinyTheme <- function(expr, theme) {
  currentTheme <- shiny::getCurrentTheme()
  on.exit(shiny:::setCurrentTheme(currentTheme))
  shiny:::setCurrentTheme(theme)
  force(expr)
}

# TODO: do we need to add these deps?
#x <- attachDependencies(
#  x, shiny:::shinyDependencyCSS(theme),
#  append = TRUE
#)
