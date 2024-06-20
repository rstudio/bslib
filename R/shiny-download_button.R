#' @inherit shiny::downloadButton params return title description details sections references
#'
#' @inheritParams input_action_button
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("download_button", "downloadButton")`
#'
#' @family Shiny upload/download aliases
#' @export
download_button <- function(
  id,
  label = "Download",
  ...,
  class = NULL,
  icon = shiny::icon("download")
) {
  shiny::downloadButton(
    outputId = id,
    label = "Download",
    class = NULL,
    ...,
    icon = shiny::icon("download")
  )
}

#' @inherit shiny::downloadLink params return title description details sections references
#'
#' @inheritParams input_action_button
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("download_link", "downloadLink")`
#'
#' @family Shiny upload/download aliases
#' @export
download_link <- function(
  id,
  label = "Download",
  ...,
  class = NULL
) {
  shiny::downloadLink(
    outputId = id,
    label = "Download",
    class = NULL,
    ...
  )
}

#' @inherit shiny::downloadHandler params return title description details sections references
#'
#' @section Aliased from Shiny: `r docs_callout_shiny_alias("download_handler", "downloadHandler")`
#'
#' @seealso
#'   * [download_button()] creates a download button in the UI.
#'   * [download_link()] creates a download link in the UI.
#'
#' @family Shiny upload/download aliases
#' @export
download_handler <- function(
  filename,
  content,
  contentType = NULL,
  outputArgs = list()
) {
  shiny::downloadHandler(
    filename = filename,
    content = content,
    contentType = contentType,
    outputArgs = outputArgs
  )
}
