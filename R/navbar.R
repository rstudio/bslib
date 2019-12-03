#' Height of navbar height for a given Bootswatch theme
#'
#' The height (in pixels) of a Bootswatch theme's navbar. Note that these
#' heights to do not currently respect theme customizations.
#'
#' This is primarily useful for logic internal to [rmarkdown::html_document()]
#'
#' @param theme a <https://bootswatch.com/> theme name. The default value
#' means vanilla Bootstrap (i.e. no bootswatch theme).
#' @export
navbar_height <- function(theme = "") {

  # TODO: it'd be great if, someday, this took into account SASS variables,
  # but it's not immediately obvious how to do that correctly
  switch(
    theme,
    cerulean = 56,
    cosmo = 54.5,
    cyborg = 53,
    darkly = 70.5,
    flatly = 70.5,
    journal = 61,
    litera = 59.5,
    lumen = 57,
    lux = 91.25,
    materia = 80.3,
    minty = 56,
    pulse = 75.4,
    sandstone = 54,
    simplex = 66.3,
    sketchy = 58,
    slate = 56.5,
    solar = 56,
    spacelab = 58,
    superhero = 48,
    united = 56,
    yeti = 54.5,
    53
  )
}
