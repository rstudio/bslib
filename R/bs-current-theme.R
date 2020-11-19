#' Obtain the currently active theme at render time
#'
#' Intended for advanced use by developers to obtain the currently active theme
#' _at render time_ and primarily for implementing themable widgets that can't
#' otherwise be themed via [bs_dependency_defer()] .
#'
#' @details
#'
#' This function should generally only be called at print/render time. For
#' example:
#'
#'  * Inside the `preRenderHook` of [htmlwidgets::createWidget()].
#'  * Inside of a custom [print] method that generates [htmltools::tags].
#'  * Inside of a [htmltools::tagFunction()]
#'
#' Calling this function at print/render time is important because it does
#' different things based on the context in which it's called:
#'
#' * If a reactive context is active, `session$getCurrentTheme()` is called
#'   (which is a reactive read).
#' * If no reactive context is active, `shiny::getCurrentTheme()` is called
#'   (which returns the current app's `theme`, if relevant).
#' * If `shiny::getCurrentTheme()` comes up empty, then `bs_global_get()`
#'   is called, which is relevant for [rmarkdown::html_document()], and
#'   possibly other static rendering contexts.
#'
#' @param session The current Shiny session (if any).
#'
#' @return a [bs_theme()] object.
#' @export
bs_current_theme <- function(session = get_reactive_domain()) {
  # If we're able to make a reactive read of the theme, then do it
  if (has_valid_reactive_context(session)) {
    return(session$getCurrentTheme())
  }
  # Otherwise, this'll be a non-reactive read of session/app/global state
  get_current_theme() %||% bs_global_get()
}

get_reactive_domain <- function() {
  if ("shiny" %in% loadedNamespaces()) shiny::getDefaultReactiveDomain() else NULL
}

has_valid_reactive_context <- function(session) {
  if (is.null(session)) return(FALSE)
  if (!"getCurrentTheme" %in% names(session)) return(FALSE)
  hasReactiveContext <- getFromNamespace("hasCurrentContext", "shiny") %||% function() FALSE
  hasReactiveContext()
}

get_current_theme <- function() {
  if ("shiny" %in% loadedNamespaces()) shiny::getCurrentTheme() else NULL
}
