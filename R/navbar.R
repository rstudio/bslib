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
      readable = ,
      litera = 59.5,
      lumen = 57,
      lux = 91.25,
      paper = ,
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
theme_layer_bs3compat_navbar <- function(theme) {
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
      # Inline style is actually used for default's bg-color
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
      # The default styling is totally different here, but I don't see a
      # easy and consistent way to bring in the old styling
      default = c("light", "light"),
      inverse = c("light", "dark")
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
    )
  )

  layer <- theme_layer(
    pre = list(
      sprintf('$navbar-default-type: %s !default;', nav_classes$default[1]),
      sprintf('$navbar-default-bg: %s !default;', nav_classes$default[2]),
      sprintf('$navbar-inverse-type: %s !default;', nav_classes$inverse[1]),
      sprintf('$navbar-inverse-bg: %s !default;', nav_classes$inverse[2])
    )
  )

  if (identical(theme, "lumen")) {
    layer <- sass_layer_merge(layer, ".navbar.navbar-default {background-color: #f8f8f8 !important;}")
  }

  layer
}
