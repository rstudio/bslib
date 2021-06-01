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

# Copy of shiny::getCurrentThemeVersion()
# (copied to avoid >1.6.0 dependency)
getCurrentThemeVersion <- function() {
  theme <- shiny::getCurrentTheme()
  if (is_bs_theme(theme)) theme_version(theme) else "3"
}

# Copy of shiny:::anyNamed()
anyNamed <- function(x) {
  if (length(x) == 0)
    return(FALSE)
  nms <- names(x)
  if (is.null(nms))
    return(FALSE)
  any(nzchar(nms))
}

