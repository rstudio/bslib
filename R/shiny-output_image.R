#' @inherit shiny::imageOutput params return title description details sections references
#'
#' @inheritParams output_text
#' @param ... Ignored, included for future expansion.
#'
#' @seealso [render_image()] to reactively update the `new_output()`.
#'
#' @family Shiny output aliases
#' @export
output_image <- function(
  id,
  width = "100%",
  height = "400px",
  ...,
  click = NULL,
  dblclick = NULL,
  hover = NULL,
  brush = NULL,
  inline = FALSE,
  fill = FALSE
) {
  shiny::imageOutput(
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

#' @inherit shiny::renderImage params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("render_image", "renderImage")`
#'
#' @seealso [output_image()] to create an output in the UI.
#'
#' @family Shiny render aliases
#' @export
render_image <- function(
  expr,
  env = parent.frame(),
  quoted = FALSE,
  deleteFile,
  outputArgs = list()
) {
  shiny::renderImage(
    expr = expr,
    env = env,
    quoted = quoted,
    deleteFile = deleteFile,
    outputArgs = outputArgs
  )
}
