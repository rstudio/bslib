#' @inherit shiny::verbatimTextOutput params return title description details sections references
#'
#' @inheritParams output_text
#'
#' @seealso [render_text_verbatim()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_text_verbatim <- function(
  id,
  placeholder = FALSE
) {
  shiny::verbatimTextOutput(outputId = id, placeholder = placeholder)
}

#' @inherit shiny::renderPrint params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_text_verbatim", "renderPrint")`
#'
#' @seealso [output_text_verbatim()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_text_verbatim <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  width = getOption("width"),
  outputArgs = list()
) {
  expr <- shiny_quote_if_unquoted(expr, quoted)

  shiny::renderPrint(
    expr = expr,
    env = env,
    quoted = TRUE,
    width = width,
    outputArgs = outputArgs
  )
}
