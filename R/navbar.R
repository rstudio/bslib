# Navbar height
#
# The height (in pixels) of a Bootswatch theme's navbar. Note that these
# heights to do not currently respect theme customizations.
#
# rmarkdown::html_document(), flexdashboard, and maybe others
# use this variable to add appropriate body/section padding
navbar_height_var <- function(theme = "", version) {
  paste("$navbar-height:", navbar_height(theme, version), "px !default")
}

navbar_height <- function(theme = "", version) {

  if (version %in% "3") {
    return(switch(
      theme,
      journal = 61,
      flatly = 60,
      darkly = 60,
      readable = 66,
      spacelab = 52,
      united = 51,
      cosmo = 51,
      lumen = 54,
      paper = 64,
      sandstone = 61,
      simplex = 41,
      yeti = 45,
      51))
  }


  # TODO: it'd be great if, someday, this took into account SASS variables,
  # but it's not immediately obvious how to do that correctly
  if (version %in% c("4", "4-3")) {
    return(switch(
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
    ))
  }

  stop("Bootstrap version not supported", version, call. = FALSE)
}
