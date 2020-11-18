#' Obtain the currently active theme
#' 
#' @param session 
#'
#' @return a [bs_theme()] object.
#' @export
#'
#' @examples
bs_current_theme <- function(session = shiny::getDefaultReactiveDomain()) {
  # If called in a reactive context, this'll be a reactive read
  if (!is.null(session) && shiny:::hasCurrentContext()) {
    return(session$getCurrentTheme())
  }
  # Otherwise, this'll be a non-reactive read of session/app/global state
  shiny::getCurrentTheme() %||% bs_global_get()
}
