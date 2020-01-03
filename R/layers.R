# -----------------------------------------------------------------
# Core Bootstrap layer
# -----------------------------------------------------------------

bootstrap_layer <- function(version) {
  if (version %in% c("4", "4-3")) {
    # Should match https://github.com/twbs/bootstrap/blob/master/scss/bootstrap.scss

    return(sass_layer(
      defaults = bootstrap_sass_files(c("functions", "variables"), version = 4),
      declarations = bootstrap_sass_files("mixins", version = 4),
      rules = bootstrap_sass_files(c(
        "root", "reboot", "type", "images", "code", "grid", "tables",
        "forms", "buttons", "transitions", "dropdown", "button-group",
        "input-group", "custom-forms", "nav", "navbar", "card",
        "breadcrumb", "pagination", "badge", "jumbotron", "alert",
        "progress", "media", "list-group", "close", "toasts", "modal",
        "tooltip", "popover", "carousel", "spinners", "utilities", "print"
      ), version = 4),
      # Tag this layer so we know we can query the theme_version()
      tags = "boostraplib_version_4"
    ))
  }

  if (version %in% "3") {
    # Should match https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/_bootstrap.scss
    return(sass_layer(
      defaults = bootstrap_sass_files("variables", version = 3),
      declarations = bootstrap_sass_files("mixins", version = 3),
      rules = bootstrap_sass_files(c(
        "normalize", "print", "glyphicons", "scaffolding", "type", "code", "grid",
        "tables", "forms", "buttons", "component-animations", "dropdowns", "button-groups",
        "input-groups", "navs", "navbar", "breadcrumbs", "pagination", "pager", "labels",
        "badges", "jumbotron", "thumbnails", "alerts", "progress-bars", "media",
        "list-group", "panels", "responsive-embed", "wells", "close", "modals",
        "tooltip", "popovers", "carousel", "utilities", "responsive-utilities"
      ), version = 3),
      # Tag this layer so we know we can query the theme_version()
      tags = "boostraplib_version_3"
    ))
  }

  stop("Unknown Bootstrap version: ", version, call. = FALSE)
}



bootstrap_javascript <- function(version, minified = TRUE) {
  if (version %in% c("4", "4-3")) {
    return(system.file(
      "node_modules/bootstrap/dist/js",
      if (minified) "bootstrap.bundle.min.js" else "bootstrap.bundle.js",
      package = "bootstraplib"
    ))
  } else if (version %in% "3") {
    return(system.file(
      "node_modules/bootstrap-sass/assets/javascripts",
      if (minified) "bootstrap.min.js" else "bootstrap.js",
      package = "bootstraplib"
    ))
  }

  stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
}

# -----------------------------------------------------------------
# BS3 compatibility layer
# -----------------------------------------------------------------

bs3compat_layer <- function(version) {
  if (!identical(version, "4-3")) return(NULL)
  sass_layer(
    defaults = sass_file(system.file("bs3compat", "_pre_variables.scss", package = "bootstraplib")),
    rules = sass_file(system.file("bs3compat", "_post_variables.scss", package = "bootstraplib")),
    # Gyliphicon font files
    file_attachments = c(
      fonts = system.file("node_modules/bootstrap-sass/assets/fonts", package = "bootstraplib")
    ),
    html_deps = htmltools::htmlDependency(
      "bs3compat", packageVersion("bootstraplib"),
      package = "bootstraplib",
      src = "bs3compat/js",
      script = c("tabs.js", "bs3compat.js")
    )
  )
}

# -----------------------------------------------------------------
# Bootswatch layer
# -----------------------------------------------------------------

bootswatch_layer <- function(bootswatch, version) {

  # Exit early if this is vanilla Bootstrap
  if (!bootswatch %in% bootswatch_themes(version)) return(NULL)

  # Attach local font files, if necessary
  font_css <- file.path(bootswatch_dist(version), bootswatch, "font.css")
  attachments <- if (file.exists(font_css)) {
    c(
      "font.css" = font_css,
      fonts = system.file("fonts", package = "bootstraplib")
    )
  }

  layer <- sass_layer(
    # Tag this layer in case we ever need to know whether a
    # currently set theme contains a bootswatch theme (i.e. theme_bootswatch)
    tags = paste0("bootstraplib_bootswatch_", bootswatch),
    file_attachments = attachments,
    defaults = list(
      # Provide access to the navbar height via SASS variable
      # rmarkdown::html_document() and flexdashboard are two examples
      # of things that need access to this
      navbar_height_var(bootswatch, version),
      # Make sure darkly/superhero code appears on the grayish background
      # (by default, pre-color inherits the white text color that appears elsewhere on the page)
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/darkly/_variables.scss#L178
      if (bootswatch %in% c("darkly", "superhero")) "$pre-color: #303030 !default;" else "",
      # Use local fonts (this path is relative to the bootstrap HTML dependency dir)
      '$web-font-path: "font.css" !default;',
      bootswatch_sass_file(bootswatch, "variables", version)
    ),
    rules = list(
      bootswatch_sass_file(bootswatch, "bootswatch", version),
      # For some reason sketchy sets .dropdown-menu{overflow: hidden}
      # but this prevents .dropdown-submenu from working properly
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
      if (identical(bootswatch, "sketchy")) as_sass(".dropdown-menu{ overflow: inherit; }") else ""
    )
  )

  if (version %in% "4-3") {
    layer <- sass_layer_merge(layer, sass_layer_bs3compat_navbar(bootswatch))
  }

  layer
}



# -----------------------------------------------------------------
# Navbar height layer
#
# The height (in pixels) of a Bootswatch theme's navbar. Note that these
# heights to do not currently respect theme customizations.
#
# rmarkdown::html_document(), flexdashboard, and maybe others
# use this variable to add appropriate body/section padding
# -----------------------------------------------------------------

navbar_height_layer <- function(bootswatch, version) {
  sass_layer(defaults = navbar_height_var(bootswatch, version))
}


navbar_height_var <- function(bootswatch, version) {
  paste("$navbar-height:", navbar_height(bootswatch, version), "!default;")
}

navbar_height <- function(bootswatch, version) {

  if (version %in% "3") {
    return(switch(
      bootswatch,
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
      bootswatch,
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
sass_layer_bs3compat_navbar <- function(bootswatch) {
  # Do nothing if this isn't a Bootswatch 3 theme
  if (!bootswatch %in% c("materia", "litera", bootswatch_themes(3))) return("")

  nav_classes <- switch(
    bootswatch,
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
    ),
    stop("Didn't recognize Bootswatch 3 theme: ", theme, call. = FALSE)
  )

  layer <- sass_layer(
    defaults = list(
      sprintf('$navbar-default-type: %s !default;', nav_classes$default[1]),
      sprintf('$navbar-default-bg: %s !default;', nav_classes$default[2]),
      sprintf('$navbar-inverse-type: %s !default;', nav_classes$inverse[1]),
      sprintf('$navbar-inverse-bg: %s !default;', nav_classes$inverse[2])
    )
  )

  if (identical(bootswatch, "lumen")) {
    layer <- sass_layer_merge(layer, ".navbar.navbar-default {background-color: #f8f8f8 !important;}")
  }

  layer
}
