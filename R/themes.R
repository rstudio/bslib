#' Pre-defined and custom Bootstrap 4 themes
#'
#'
#' @inheritParams sass::sass_layers
#' @export
bs_themes <- sass::sass_layers

#' @rdname bs_themes
#' @export
bs_theme <- sass::sass_layer


#' @rdname bs_themes
#' @param theme a <https://bootswatch.com/> theme name.
#' @export
theme_bootswatch <- function(theme = "") {
  theme <- match.arg(theme, bootswatch_themes())

  sass_layer(
    pre = list(
      bootswatch_scss_file(theme, "_variables.scss"),
      # Make sure darkly/superhero code appears on the grayish background
      # (by default, pre-color inherits the white text color that appears elsewhere on the page)
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/darkly/_variables.scss#L178
      if (theme %in% c("darkly", "superhero")) list(`pre-color` = "#303030") else ""
    ),
    post = list(
      list(`web-font-path` = '"font.css"'),
      bootswatch_scss_file(theme, "_bootswatch.scss"),
      # For some reason the sketchy theme sets .dropdown-menu{overflow: hidden}
      # but this prevents .dropdown-submenu from working properly
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
      if (identical(theme, "sketchy")) as_sass(".dropdown-menu{ overflow: inherit; }") else ""
    )
  )
}

#' @rdname bs_themes
#' @export
theme_bs3compat <- function() {
  sass_layer(
    pre = sass_file(system.file("bs3compat", "_pre_variables.scss", package = "bootsass")),
    post = sass_file(system.file("bs3compat", "_post_variables.scss", package = "bootsass")),
    deps = list(
      htmltools::htmlDependency(
        "bs3compat", packageVersion("bootsass"),
        package = "bootsass",
        src = "bs3compat/js",
        script = c("tabs.js", "bs3compat.js")
      )
    )
  )
}


bootswatch_scss_file <- function(theme, file = "_variables.scss") {
  f <- file.path(bootswatch_dist(), theme, file)
  if (file.exists(f)) return(sass::sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}

#' @rdname bs_themes
#' @export
bootswatch_themes <- function(full.names = FALSE) {
  list.dirs(bootswatch_dist(), full.names = full.names, recursive = FALSE)
}

bootswatch_dist <- function() {
  system.file("node_modules", "bootswatch", "dist", package = "bootsass")
}

"%||%" <- function(x, y) {
  if (is.null(x)) y else x
}
