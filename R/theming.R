#' Bootstrap theming helpers
#'
#' Use `theme_variables()` to set Bootstrap SASS variables globally so
#' that [bs_sass()]/[bs_sass_partial()] can respect them at runtime.
#' Use `theme_layer()` to provide [sass::sass()] to place both before and after
#' Bootstrap's SASS in [bs_sass()]/[bs_sass_partial()].
#'
#' @param ... Variables to be set, using `name = value`; or, a single unnamed
#'   argument which is a named list of variables to set. To specify a name that
#'   uses characters that aren't valid for R identifiers, wrap that name in
#'   quotes, double quotes, or backticks (see examples section below).
#'
#' @return If no arguments are passed, a list of all set options is returned. If
#'   arguments are passed, a list containing the previous values of the newly
#'   set options is returned invisibly.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#'
#' @include globals.R
#' @rdname theming
#' @export
#' @examples
#' library(htmltools)
#'
#' theme_variables(primary = "orange", "body-bg" = "#EEEEEE")
#' theme_variables("font-family-base" = "monospace", "font-size-base" = "1.4rem")
#' theme_variables("btn-padding-y" = ".16rem")
#' theme_variables("btn-padding-x" = "2rem")
#' theme_variables("border-radius" = 0, "border-radius-lg" = 0, "border-radius-sm" = 0)
#'
#' browsable(tags$body(
#'   bs_sass(),
#'   tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' ))
#'
theme_variables <- function(...) {
  args <- rlang::list2(...)
  arg_names <- names(args)

  # If called without args, this is just a read operation.
  if (length(args) == 0) {
    # Getter
    return(globals$sass_vars)
  }

  # If called with a single unnamed argument that's a list, then act
  # like it was a do.call.
  if (length(args) == 1 && is.null(arg_names) && is.list(args[[1]])) {
    args <- args[[1]]
    arg_names <- names(args)
  }

  if (is.null(arg_names) || !isTRUE(all(nzchar(arg_names), na.rm = FALSE))) {
    stop("All arguments to theme_variables() must be named")
  }

  old_opts <- globals$sass_vars

  globals$sass_vars[arg_names] <- args

  invisible(setNames(old_opts[arg_names], arg_names))
}

#' @rdname theming
#' @export
theme_variables_clear <- function() {
  old_opts <- globals$sass_vars
  globals$sass_vars <- list()
  invisible(old_opts)
}

#' @inheritParams sass::sass_layer
#' @rdname theming
#' @export
theme_layer <- sass::sass_layer


#' @rdname theming
#' @export
theme_layer_bs3compat <- function() {
  sass_layer(
    pre = sass_file(system.file("bs3compat", "_pre_variables.scss", package = "bootstraplib")),
    post = sass_file(system.file("bs3compat", "_post_variables.scss", package = "bootstraplib")),
    deps = htmltools::htmlDependency(
      "bs3compat", packageVersion("bootstraplib"),
      package = "bootstraplib",
      src = "bs3compat/js",
      script = c("tabs.js", "bs3compat.js")
    )
  )
}

#' @param theme a Bootswatch theme name.
#' @param version the major version.
#' @rdname theming
#' @export
theme_layer_bootswatch <- function(theme = "", version = version_latest()) {
  theme <- bootswatch_theme_match(theme, version)

  sass_layer(
    pre = list(
      # Provide access to the navbar height via SASS variable
      # rmarkdown::html_document() and flexdashboard are two examples
      # of things that need access to this
      navbar_height_var(theme, version),
      # Make sure darkly/superhero code appears on the grayish background
      # (by default, pre-color inherits the white text color that appears elsewhere on the page)
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/darkly/_variables.scss#L178
      if (theme %in% c("darkly", "superhero")) "$pre-color: #303030 !default;" else "",
      # Use local fonts (this path is relative to the bootstrap HTML dependency dir)
      '$web-font-path: "font.css" !default;',
      sass_file_bootswatch(theme, "_variables.scss", version)
    ),
    post = list(
      sass_file_bootswatch(theme, "_bootswatch.scss", version),
      # For some reason the sketchy theme sets .dropdown-menu{overflow: hidden}
      # but this prevents .dropdown-submenu from working properly
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
      if (identical(theme, "sketchy")) as_sass(".dropdown-menu{ overflow: inherit; }") else ""
    ),
    # This is a fake dep that gives us a means for identifying
    # which bootswatch themes exist in the input to bs_sass()
    deps = htmlDependency(
      "bootswatch-local-fonts",
      packageVersion("bootstraplib"),
      src = theme
    )
  )
}

bootswatch_theme_match <- function(theme, version) {
  if (version %in% c("4", "4-3")) {
    theme <- switch(theme, paper = "materia", readable = "litera", theme)
  }
  match.arg(theme, bootswatch_themes(version))
}
