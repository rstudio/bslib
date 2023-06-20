#' Obtain a list of all available bootswatch themes.
#'
#' @param version the major version of Bootswatch.
#' @param full_path whether to return a path to the installed theme.
#' @export
#' @return a character vector of Bootswatch themes.
bootswatch_themes <- function(version = version_default(), full_path = FALSE) {
  list.dirs(bootswatch_dist(version), full.names = full_path, recursive = FALSE)
}

#' Obtain a theme's Bootswatch theme name
#'
#' @inheritParams bs_theme_update
#' @return the Bootswatch theme named used (if any) in the `theme`.
#' @export
theme_bootswatch <- function(theme) {
  if (!is_bs_theme(theme)) return(NULL)
  if (!"bs_preset_bootswatch" %in% class(theme)) return(NULL)
  theme_preset_info(theme)$name
}

#' Obtain a theme's Bootstrap version
#'
#' @inheritParams bs_theme_update
#' @return the major version of Bootstrap used in the `theme`.
#' @export
theme_version <- function(theme) {
  if (!is_bs_theme(theme)) return(NULL)

  version_class <- grep("^bs_version_", class(theme), value = TRUE)
  if (length(version_class) > 0) {
    sub("^bs_version_", "", version_class)
  } else {
    theme_preset_info(theme)$version
  }
}


bootswatch_dist <- function(version) {
  switch_version(
    version,
    five = lib_file("bsw5", "dist"),
    four = lib_file("bsw4", "dist"),
    three = lib_file("bsw3")
  )
}


# -----------------------------------------------------------------
# Bootswatch bundle
# -----------------------------------------------------------------

bootswatch_bundle <- function(bootswatch, version) {
  if (!length(bootswatch) || isTRUE(bootswatch %in% c("default", "bootstrap"))) {
    return(NULL)
  }

  bootswatch <- switch_version(
    version,
    default = {
      switch(
        bootswatch,
        paper = {
          message("Bootswatch 3 theme paper has been renamed to materia in version 4 (using that theme instead)")
          "materia"
        },
        readable = {
          message("Bootswatch 3 theme readable has been renamed to litera in version 4 (using that theme instead)")
          "litera"
        },
        match.arg(bootswatch, bootswatch_themes(version))
      )
    },
    three = match.arg(bootswatch, bootswatch_themes(version))
  )

  # Attach local font files, if necessary
  font_css <- file.path(bootswatch_dist(version), bootswatch, "font.css")
  attachments <- if (file.exists(font_css)) {
    c(
      "font.css" = font_css,
      fonts = system_file("fonts", package = "bslib")
    )
  }

  sass_bundle(
    bootswatch = sass_layer(
      file_attachments = attachments,
      defaults = list(
        "bslib-preset-type" = "bootswatch",
        "bslib-preset-name" = bootswatch,
        # Use local fonts (this path is relative to the bootstrap HTML dependency dir)
        '$web-font-path: "font.css" !default;',
        bootswatch_sass_file(bootswatch, "variables", version),
        # Unless we change navbarPage()'s markup, BS4+ will likely want BS3 compatibility
        switch_version(
          version, three = "", default = bs3compat_navbar_defaults(bootswatch)
        )
      ),
      rules = list(
        bootswatch_sass_file(bootswatch, "bootswatch", version),
        # For some reason sketchy sets .dropdown-menu{overflow: hidden}
        # but this prevents .dropdown-submenu from working properly
        # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
        if (identical(bootswatch, "sketchy")) ".dropdown-menu{ overflow: inherit; }" else "",
        # Several Bootswatch themes (e.g., zephyr, simplex, etc) add custom .btn-secondary
        # rules that should also apply to .btn-default
        ".btn-default:not(.btn-primary):not(.btn-info):not(.btn-success):not(.btn-warning):not(.btn-danger):not(.btn-dark):not(.btn-outline-primary):not(.btn-outline-info):not(.btn-outline-success):not(.btn-outline-warning):not(.btn-outline-danger):not(.btn-outline-dark) {
          @extend .btn-secondary !optional;
        }"
      )
    )
  )
}


# Mappings from BS3 navbar classes to BS4
bs3compat_navbar_defaults <- function(bootswatch) {
  # Do nothing if this isn't a Bootswatch 3 theme
  if (!bootswatch %in% c("materia", "litera", bootswatch_themes(3))) {
    return("")
  }

  bg_colors <- switch(
    bootswatch,
    cerulean = c("primary", "info"),
    cosmo = c("dark", "primary"),
    cyborg = c("body-bg", "secondary"),
    darkly = c("primary", "success"),
    flatly = c("primary", "success"),
    journal = c("light", "primary"),
    lumen = c("light", "white"),
    # i.e., materia
    paper = ,
    materia = c("light", "primary"),
    readable = ,
    litera = c("light", "dark"),
    sandstone = c("dark", "success"),
    simplex = c("light", "primary"),
    slate = c("primary", "light"),
    spacelab = c("light", "primary"),
    superhero = c("dark", "primary"),
    united = c("primary", "dark"),
    yeti = c("dark", "primary"),
    stop("Didn't recognize Bootswatch 3 theme: ", bootswatch, call. = FALSE)
  )


  list(
    sprintf('$navbar-light-bg: $%s !default;', bg_colors[1]),
    sprintf('$navbar-dark-bg: $%s !default;', bg_colors[2])
  )
}
