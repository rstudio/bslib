# Navbar height
#
# The height (in pixels) of a Bootswatch theme's navbar. Note that these
# heights to do not currently respect theme customizations.
#
# rmarkdown::html_document(), flexdashboard, and maybe others
# use this variable to add appropriate body/section padding
navbar_height_var <- function(theme = "", version) {
  paste("$navbar-height:", navbar_height(theme, version), "!default;")
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

# Mappings from BS3 navbar classes to BS4
bootswatch_navbar_bs3compat <- function(theme) {
  theme <- theme %||% "bootstrap"

  nav_classes <- switch(
    theme,
    # https://bootswatch.com/cerulean/
    # https://bootswatch.com/3/cerulean/
    cerulean = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    cosmo = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    cyborg = list(
      default = c("dark", "dark"),
      inverse = c("dark", "secondary")
    ),
    darkly = list(
      default = c("dark", "primary"),
      inverse = c("light", "light")
    ),
    flatly = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    journal = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    lumen = list(
      # TODO: default bg should be slightly darker...include .navbar-default{background-color: #f8f8f8};?
      default = c("light", "light"),
      inverse = c("light", "light")
    ),
    # i.e., materia
    paper = ,
    materia = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    readable = ,
    litera = list(
      # hmm, should we care about difference in nav-link colors?
      default = c("light", "light"),
      inverse = c("light", "light")
    ),
    sandstone = list(
      default = c("dark", "primary"),
      # technically speaking this background should be green, but dark looks
      # better/more consistent with other stuff on the page
      inverse = c("dark", "dark")
    ),
    simplex = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    # TODO: should these be gradients?
    slate = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    spacelab = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    superhero = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    united = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    yeti = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    # i.e., no bootswatch theme
    list(
      default = c("light", "light"),
      inverse = c("dark", "dark")
    )
  )

  extends <- function(classes) {
    extends <- paste0("@extend .", c("navbar-", "bg-"), classes, ";")
    paste(extends, collapse = "\n")
  }

  theme_layer(
    post = list(
      sprintf(".navbar.navbar-default { %s }", extends(nav_classes$default)),
      sprintf(".navbar.navbar-inverse { %s }", extends(nav_classes$inverse))
    )
  )
}
