#' @inherit shiny::plotOutput params return title description details sections references
#'
#' @inheritParams output_text
#' @param ... Ignored, included for future expansion.
#'
#' @seealso [render_plot()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_plot <- function(
  id,
  width = "100%",
  height = "400px",
  ...,
  click = NULL,
  dblclick = NULL,
  hover = NULL,
  brush = NULL,
  inline = FALSE,
  fill = !inline
) {
  shiny::plotOutput(
    outputId = id,
    width = width,
    height = height,
    click = click,
    dblclick = dblclick,
    hover = hover,
    brush = brush,
    inline = inline,
    fill = fill
  )
}

#' @inherit shiny::renderPlot params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_plot", "renderPlot")`
#'
#' @seealso [output_plot()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_plot <- function(
  expr,
  width = "auto",
  height = "auto",
  res = 72,
  ...,
  alt = NA,
  env = parent.frame(),
  quoted = FALSE,
  execOnResize = FALSE,
  outputArgs = list()
) {
  expr <- shiny_quote_if_unquoted(expr, quoted)

  shiny::renderPlot(
    expr = expr,
    width = width,
    height = height,
    res = res,
    ...,
    alt = alt,
    env = env,
    quoted = TRUE,
    execOnResize = execOnResize,
    outputArgs = outputArgs
  )
}
