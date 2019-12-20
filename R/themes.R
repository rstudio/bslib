#' Create a Bootstrap theme
#'
#' Use [bs_theme()] (or [bs_theme_set()]) to create a customized
#' Bootstrap SASS theme which [bs_sass()] (or [bs_sass_partial()]) can consume.
#' Either pass a [bs_theme()] object directly to [bs_sass()]'s `theme` argument
#' or use [bs_theme_set()] to set a theme globally ([bs_sass()]'s `theme` argument
#' defaults to `bs_theme_get()`, which get the current global).
#'
#' Developers who need their own sass compilation entry point may use the
#' `bs_theme_sass()`
#'
#' @param before Any [sass::as_sass()] input to place before Bootstrap's SASS code.
#' For `bs_theme_set()`, this may also be a `bs_theme()` object (in that case,
#' no other arguments may be used).
#' @param after Any [sass::as_sass()] input to place after Bootstrap's SASS code.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] for a list of possible names.
#' @param version The major version of Bootstrap to use. A value of
#' `'4-3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
#' @param variables a named list of SASS variables to include prior to `before`.
#' @param html_deps An HTML dependency (or a list of them).
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#'
#' @rdname theming
#' @export
#' @examples
#'
#' # Theming by overriding Bootstrap variable defaults
#' # (Note: If you want to influence the CSS that Bootstrap generates,
#' # you probably want bs_sass(), but for sake of demonstration,
#' # we use bs_sass_partial() here)
#' red_primary <- bs_theme(list(primary = "red !default;"))
#' foo_color <- ".foo { color: rgba($primary, 0.3) }"
#' bs_sass_partial(foo_color)
#' bs_sass_partial(foo_color, theme = red_primary)
#'
#' # Generate CSS using Bootstrap variables/function/mixins
#' primary_contrast <- list("primary-contrast" = "color-yiq($primary) !default;")
#' bs_sass_partial(
#'   ".bar { color: $primary-contrast }",
#'   theme = bs_theme(after = primary_contrast)
#' )
#'
#' # For complex theming projects, it may be useful to combine
#' # individually packaged themes via bs_theme_merge() which
#' # combines several theme into one by layering them
#' # together like an onion -- the pre sass for latter themes
#' # (e.g., blue_primary) is placed _before_ pre sass for former
#' # themes (e.g., red_primary) and post sass for latter themes
#' # is placed _after_ the post sass for former themes
#' blue_primary <- bs_theme(list(primary = "blue !default;"))
#' primary <- bs_theme_merge(red_primary, blue_primary)
#' # The blue theme wins out
#' bs_sass_partial(foo_color, theme = primary)
#'
bs_theme <- function(before = "", after = "", bootswatch = NULL, version = c("4-3", "4", "3"),
                     variables = list(), html_deps = NULL) {

  if (any(names2(variables) != "")) stop("All variables must be named", call. = FALSE)
  version <- version_resolve(version)

  structure(
    list(
      bootswatch = bootswatch_theme_resolve(bootswatch, version),
      version = version,
      sass_layer = sass_layer(
        before = c(list(variables), list(before)),
        after = after,
        html_deps = html_deps
      )
    ),
    class = "bs_theme"
  )
}


#' @rdname theming
#' @export
bs_theme_set <- function(before = "", after = "", bootswatch = NULL, version = c("4-3", "4", "3"),
                         variables = list(), html_deps = NULL) {
  if (is_bs_theme(before)) {
    if (!identical(after, "") || !is.null(bootswatch) || !is.null(html_deps) ||
        !identical(version, c("4-3", "4", "3")) || length(variables) > 0) {
      stop("When before is a bs_theme() object, you aren't allowed to use other arguments to bs_theme_set()", call. = FALSE)
    }
    theme <- before
  } else {
    theme <- bs_theme(
      before = before, after = after,
      bootswatch = bootswatch, version = version,
      html_deps = html_deps, variables = variables
    )
  }
  old_theme <- options(bootstraplib_theme = theme)
  invisible(old_theme)
}

#' @rdname theming
#' @export
bs_theme_get <- function() {
  getOption("bootstraplib_theme")
}

#' @rdname theming
#' @export
bs_theme_clear <- function() {
  options(bootstraplib_theme = NULL)
}

#' @rdname theming
#' @export
bs_theme_merge <- function(...) {
  # basically the same algorithm as sass::sass_layer_merge
  themes <- dropNulls(rlang::list2(...))
  is_theme <- vapply(themes, is_bs_theme, logical(1))
  themes[!is_theme] <- lapply(themes[!is_theme], function(x) {
    bs_theme(after = x)
  })
  Reduce(bs_themes_join, themes)
}

#' @rdname theming
#' @export
bs_theme_sass <- function(theme = NULL, before_only = TRUE) {
  theme <- as_bs_theme(theme)
  version <- theme$version
  bootswatch <- theme$bootswatch

  # Grab the main Boostrap imports
  bs_sass <- bootstrap_core(version, before_only = before_only)

  # Add adjustments for navbar height
  # TODO: maybe do this via jQuery instead? https://stackoverflow.com/a/46021836/1583084
  navbar_height <- sass_layer_navbar_height(bootswatch, version)
  if (before_only) navbar_height$after <- ""
  bs_sass <- sass_layer_merge(bs_sass, navbar_height)

  # BS3 compatibility
  if (version %in% "4-3") {
    bs3compat <- sass_layer_bs3compat()
    if (before_only) bs3compat$after <- ""
    bs_sass <- sass_layer_merge(bs_sass, bs3compat)
  }

  bootswatch_layer <- sass_layer_bootswatch(bootswatch, version)
  if (before_only) bootswatch_layer$after <- ""
  sass_layer_merge(bs_sass, bootswatch_layer)
}

bootstrap_core <- function(version, before_only = TRUE) {
  if (!before_only) {
    # This function should default to the 'main' scss file
    return(sass_file_bootstrap(version = version))
  }
  scss <- c(
    if (version %in% c("4", "4-3")) "_functions.scss",
    "_variables.scss",
    "_mixins.scss"
  )
  if (version %in% "3") scss <- file.path("bootstrap", scss)
  lapply(scss, sass_file_bootstrap, version = version)
}


bs_themes_join <- function(theme1, theme2) {
  if (theme1$version != theme2$version) {
    stop("Don't know how to merge two different Bootstrap versions", call. = FALSE)
  }
  if (theme1$bootswatch != theme2$bootswatch) {
    warning("Merging two different bootswatch themes isn't recommended.")
  }

  sass_layer <- getFromNamespace("sass_layers_join", "sass")(
    theme1$sass_layer, theme2$sass_layer
  )
  bs_theme(
    before = sass_layer$before,
    after = sass_layer$after,
    bootswatch = theme2$bootswatch,
    version = theme2$version,
    html_deps = sass_layer$html_deps
  )
}

as_bs_theme <- function(theme) {
  if (is_bs_theme(theme)) return(theme)
  # NULL/empty string means vanilla Bootstrap
  if (is.null(theme) || identical(theme, "")) return(bs_theme())
  # Handle numeric version
  if (is.numeric(theme)) theme <- as.character(theme)
  # non-string is treated like sass input
  if (!is_string(theme)) return(bs_theme(as_sass(theme)))

  # String should be "bootswatch@version"
  theme <- strsplit(theme, "@", fixed = TRUE)[[1]]
  if (length(theme) == 2) {
    return(bs_theme(bootswatch = theme[1], version = theme[2]))
  }

  # Also support "bootswatch" or "version"
  if (length(theme) == 1) {
    if (theme %in% c("4", "4-3", "3")) {
      return(bs_theme(version = theme))
    } else {
      return(bs_theme(bootswatch = theme))
    }
  }

  stop("theme string can't contain more than one @", call. = FALSE)
}
