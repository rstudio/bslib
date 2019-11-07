#' Create a bs4 theme
#'
#' A bs4 theme defines sass input to place before and/or after Bootstrap's SASS.
#'
#' @param pre An acceptable [sass::sass()] input. This SASS input will be included before bootstrap's SASS
#' @param post An acceptable [sass::sass()] input. This SASS input will be included before bootstrap's SASS
#' @param deps A [htmltools::htmlDependency()] object (or a list of them)
#' @references <https://getbootstrap.com/docs/4.3/getting-started/theming/>, <https://bootswatch.com/>
#' @export
#' @seealso [bs4_sass()]
bs4_theme <- function(pre = "", post = "", deps = NULL) {
  if (inherits(deps, "html_dependency")) {
    deps <- list(deps)
  }
  if (!is.null(deps)) {
    is_dependency <- vapply(deps, inherits, logical(1), "html_dependency")
    if (any(!is_dependency)) stop("deps must be a collection of htmltools::htmlDependency() objects", call. = FALSE)
  }

  theme <- list(
    pre = as_sass(pre),
    post = as_sass(post),
    deps = deps
  )
  structure(theme, class = "bs4_theme")
}

#' @rdname bs4_theme
#' @param ... `bs4_theme()` objects.
#' @export
bs4_themes <- function(...) {
  themes <- dropNulls(list(...))
  is_theme <- vapply(themes, inherits, logical(1), "bs4_theme")
  if (!all(is_theme)) {
    stop("bs4_themes() only understands bs4_theme() objects")
  }
  Reduce(bs4_themes_join, themes)
}

bs4_themes_join <- function(theme1 = bs4_theme(), theme2 = bs4_theme()) {
  bs4_theme(
    pre = as_sass(paste0(theme1$pre, theme2$pre)),
    post = as_sass(paste0(theme2$post, theme1$post)),
    deps = c(theme1$deps, theme1$deps)
  )
}

dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE=logical(1))]
}

#' @rdname bs4_theme
#' @param theme a <https://bootswatch.com/> theme name.
#' @export
bs4_theme_bootswatch <- function(theme = "") {
  theme <- match.arg(theme, bootswatch_themes())

  bs4_theme(
    pre = bootswatch_scss_file(theme, "_variables.scss"),
    post = list(
      list(`web-font-path` = '"font.css"'),
      bootswatch_scss_file(theme, "_bootswatch.scss")
    )
  )
}

#' @rdname bs4_theme
#' @export
bs4_theme_bs3compat <- function() {
  bs4_theme(
    pre = sass_file(system.file("bs3compat", "_pre_variables.scss", package = "bootscss")),
    post = sass_file(system.file("bs3compat", "_post_variables.scss", package = "bootscss")),
    deps = list(
      htmltools::htmlDependency(
        "bs3compat", packageVersion("bootscss"),
        package = "bootscss",
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

#' @rdname bs4_theme
#' @export
bootswatch_themes <- function(full.names = FALSE) {
  list.dirs(bootswatch_dist(), full.names = full.names, recursive = FALSE)
}

bootswatch_dist <- function() {
  system.file("node_modules", "bootswatch", "dist", package = "bootscss")
}

"%||%" <- function(x, y) {
  if (is.null(x)) y else x
}
