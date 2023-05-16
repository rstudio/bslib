get_current_session <- function(require_active = TRUE, call = rlang::caller_env()) {

  session <- if (isNamespaceLoaded("shiny")) {
    shiny::getDefaultReactiveDomain()
  }

  if (is.null(session) && require_active) {
    rlang::abort(
      paste(
        "This function must be called with a Shiny `server` function",
        "(i.e., it can only be used inside an active user session)."
      ),
      call = call,
      class = "shiny-no-active-session"
    )
  }

  session
}


has_valid_reactive_context <- function(session) {
  if (is.null(session)) return(FALSE)
  if (!"getCurrentTheme" %in% names(session)) return(FALSE)
  hasReactiveContext <- getFromNamespace("hasCurrentContext", "shiny") %||% function() FALSE
  hasReactiveContext()
}

get_current_theme <- function() {
  if (isNamespaceLoaded("shiny")) shiny::getCurrentTheme()
}


# Shiny internal funcs needed for nav_panel() (i.e., tabPanel()) logic

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

