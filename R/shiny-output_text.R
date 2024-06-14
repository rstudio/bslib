#' @inherit shiny::textOutput params return title description details sections references
#'
#' @seealso [render_text()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_text <- function(
  id,
  inline = FALSE,
  container = if (inline) span else div
) {
  shiny::textOutput(outputId = id, container = container, inline = inline)
}

#' @inherit shiny::renderText params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_text", "renderText")`
#'
#' @seealso [output_text()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_text <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  outputArgs = list(),
  sep = " "
) {
  shiny::renderText(
    expr = expr,
    env = env,
    quoted = quoted,
    outputArgs = outputArgs,
    sep = sep
  )
}
