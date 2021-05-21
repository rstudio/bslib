getDefaultReactiveDomain <- function() {
  shiny::getDefaultReactiveDomain()
}

# Shiny internal funcs needed for nav() (i.e., tabPanel()) logic

processDeps <- function(...) {
  getFromNamespace("processDeps", "shiny")(...)
}

p_randomInt <- function(...) {
  getFromNamespace("p_randomInt", "shiny")(...)
}

getCurrentThemeVersion <- function(...) {
  getFromNamespace("getCurrentThemeVersion", "shiny")(...)
}

anyNamed <- function(x) {
  if (length(x) == 0)
    return(FALSE)
  nms <- names(x)
  if (is.null(nms))
    return(FALSE)
  any(nzchar(nms))
}

