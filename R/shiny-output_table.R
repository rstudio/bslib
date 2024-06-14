#' @inherit shiny::tableOutput params return title description details sections references
#'
#' @inheritParams output_text
#'
#' @seealso [render_table()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_table <- function(id) {
  shiny::tableOutput(outputId = id)
}

#' @inherit shiny::renderTable params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_table", "renderTable")`
#'
#' @seealso [output_table()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_table <- function(
  expr,
  ...,
  striped = FALSE,
  hover = FALSE,
  bordered = FALSE,
  spacing = c("s", "xs", "m", "l"),
  width = "auto",
  align = NULL,
  rownames = FALSE,
  colnames = TRUE,
  digits = NULL,
  na = "NA",
  env = parent.frame(),
  quoted = FALSE,
  outputArgs = list()
) {
  shiny::renderTable(
    expr = expr,
    striped = striped,
    hover = hover,
    bordered = bordered,
    spacing = spacing,
    width = width,
    align = align,
    rownames = rownames,
    colnames = colnames,
    digits = digits,
    na = na,
    ...,
    env = env,
    quoted = quoted,
    outputArgs = outputArgs
  )
}
