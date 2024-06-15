#' @inherit shiny::uiOutput params return title description details sections references
#'
#' @inheritParams output_text
#'
#' @seealso [render_ui()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_ui <- function(
  id,
  ...,
  inline = FALSE,
  container = if (inline) span else div,
  fill = FALSE
) {
  shiny::uiOutput(
    outputId = id,
    inline = inline,
    container = container,
    fill = fill,
    ...
  )
}

#' @inherit shiny::renderUI params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_ui", "renderUI")`
#'
#' @seealso [output_ui()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_ui <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  outputArgs = list()
) {
  expr <- shiny_quote_if_unquoted(expr, quoted)

  shiny::renderUI(
    expr = expr,
    env = env,
    quoted = TRUE,
    outputArgs = outputArgs
  )
}
