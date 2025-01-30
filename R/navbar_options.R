#' Create a set of navbar options
#'
#' A `navbar_options()` object captures options specific to the appearance and
#' behavior of the navbar, independent from the content displayed on the page.
#' This helper should be used to create the list of options expected by
#' `navbar_options` in [page_navbar()] and [navset_bar()].
#'
#' ## Navbar style with Bootstrap 5 and Bootswatch themes
#'
#' In \pkg{bslib} v0.9.0, the default navbar colors for Bootswatch themes with
#' Bootstrap 5 changed. Prior to v0.9.0, bslib pre-selected navbar background
#' colors in light and dark mode; after v0.9.0 the default navbar colors are
#' less opinionated by default and follow light or dark mode (see
#' [input_dark_mode()]).
#'
#' You can use `navbar_options()` to adjust the colors of the navbar when using
#' a Bootswatch preset theme with Bootstrap 5. For example, the [Bootswatch
#' documentation for the Flatly theme](https://bootswatch.com/flatly/) shows
#' 4 navbar variations. Inspecting the source code for the first example reveals
#' the following markup:
#'
#' ```html
#' <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
#'   <!-- all of the navbar html -->
#' </nav>
#' ```
#'
#' Note that this navbar uses the `bg-primary` class for a dark navy background.
#' The navbar's white text is controlled by the `data-bs-theme="dark"`
#' attribute, which is used by Bootstrap for light text on a _dark_ background.
#' In \pkg{bslib}, you can achieve this look with:
#'
#' ```r
#' ui <- page_navbar(
#'   theme = bs_theme(5, "flatly"),
#'   navbar_options = navbar_options(class = "bg-primary", theme = "dark")
#' )
#' ```
#'
#' This particular combination of `class = "bg-primary"` and `theme = "dark"`
#' works well for most Bootswatch presets.
#'
#' Another variation from the Flatly documentation features a navar with dark
#' text on a light background:
#'
#' ```r
#' ui <- page_navbar(
#'   theme = bs_theme(5, "flatly"),
#'   navbar_options = navbar_options(class = "bg-light", theme = "light")
#' )
#' ```
#'
#' The above options set navbar foreground and background colors that are always
#' the same in both light and dark modes. To customize the navbar colors used in
#' light or dark mode, you can use the `$navbar-light-bg` and `$navbar-dark-bg`
#' Sass variables. When provided, bslib will automatically choose to use
#' light or dark text as the foreground color.
#'
#' ```r
#' ui <- page_navbar(
#'   theme = bs_theme(
#'     5,
#'     preset = "flatly",
#'     navbar_light_bg = "#18BC9C", # flatly's success color (teal)
#'     navbar_dark_bg = "#2C3E50"   # flatly's primary color (navy)
#'   )
#' )
#' ```
#'
#' Finally, you can also use the `$navbar-bg` Sass variable to set the navbar
#' background color for both light and dark modes:
#'
#' ```r
#' ui <- page_navbar(
#'   theme = bs_theme(
#'     5,
#'     preset = "flatly",
#'     navbar_bg = "#E74C3C" # flatly's danger color (red)
#'   )
#' )
#' ```
#'
#' @section Changelog:
#'
#' This function was introduced in \pkg{bslib} v0.9.0, replacing the `position`,
#' `bg`, `inverse`, `collapsible` and `underline` arguments of [page_navbar()]
#' and [navset_bar()]. Those arguments are deprecated with a warning and will be
#' removed in a future version of \pkg{bslib}. Note that the deprecated
#' `inverse` argument of [page_navbar()] and [navset_bar()] was replaced with
#' the `theme` argument of `navbar_options()`.
#'
#' @examples
#' navbar_options(position = "static-top", bg = "#2e9f7d", underline = FALSE)
#'
#' @inheritParams shiny::navbarPage
#' @param bg a CSS color to use for the navbar's background color.
#' @param theme Either `"dark"` for a light text color (on a **dark**
#'   background) or `"light"` for a dark text color (on a **light** background).
#'   If `"auto"` (the default) and `bg` is provided, the best contrast to `bg`
#'   is chosen.
#' @param underline Whether or not to add underline styling to page or navbar
#'   links when active or focused.
#' @param ... Additional attributes that will be passed directly to the navbar
#'   container element.
#'
#' @returns Returns a list of navbar options.
#'
#' @export
navbar_options <- function(
  ...,
  position = c("static-top", "fixed-top", "fixed-bottom"),
  bg = NULL,
  theme = c("auto", "light", "dark"),
  collapsible = TRUE,
  underline = TRUE
) {
  # Track user-provided arguments for print method and deprecation warnings
  is_default <- list(
    position = missing(position),
    bg = missing(bg),
    theme = missing(theme),
    collapsible = missing(collapsible),
    underline = missing(underline)
  )

  opts <- list(
    position = rlang::arg_match(position),
    bg = bg,
    theme = rlang::arg_match(theme),
    collapsible = collapsible,
    underline = underline
  )

  dots <- separate_arguments(...)
  if (length(dots$children) > 0) {
    abort(
      "All arguments in `...` must be named attributes to be applied to the navbar container."
    )
  }

  if ("inverse" %in% names(dots$attribs)) {
    # Catch muscle-memory for using `inverse`. We didn't officially release
    # `navbar_options()` with an `inverse` argument, but it's reasonable people
    # might try to use it and it did exist briefly in dev versions.
    lifecycle::deprecate_soft(
      when = "0.9.0",
      what = "navbar_options(inverse=)",
      with = "navbar_options(theme=)"
    )
  }
  if (length(dots$attribs)) {
    opts$attribs <- dots$attribs
  }

  structure(
    opts,
    class = c("bslib_navbar_options", "list"),
    is_default = is_default,
    waldo_opts = list(ignore_attr = TRUE)
  )
}

navbar_options_resolve_deprecated <- function(
  options_user = list(),
  position = deprecated(),
  bg = deprecated(),
  inverse = deprecated(),
  collapsible = deprecated(),
  underline = deprecated(),
  .fn_caller = "navset_bar",
  .warn_deprecated = TRUE
) {
  options_old <- list(
    position = if (lifecycle::is_present(position)) position,
    bg = if (lifecycle::is_present(bg)) bg,
    inverse = if (lifecycle::is_present(inverse)) inverse,
    collapsible = if (lifecycle::is_present(collapsible)) collapsible,
    underline = if (lifecycle::is_present(underline)) underline
  )
  options_old <- dropNulls(options_old)

  args_deprecated <- names(options_old)

  if (.warn_deprecated && length(args_deprecated)) {
    # TODO-deprecated: (2024-12) Elevate deprecation to an error
    lifecycle::deprecate_warn(
      "0.9.0",
      I(
        sprintf(
          "The arguments of `%s()` for navbar options (including %s) have been consolidated into a single `navbar_options` argument and ",
          .fn_caller,
          paste(sprintf("`%s`", args_deprecated), collapse = ", ")
        )
      ),
      details = c(
        "i" = "See `navbar_options()` for more details.",
        "!" = if ("inverse" %in% args_deprecated)
          "Use `theme` instead of `inverse` in `navbar_options()`."
      )
    )
  }

  # Upgrade `inverse` to the new `theme` argument of `navbar_options()`
  if ("inverse" %in% names(options_old)) {
    inverse <- options_old[["inverse"]]
    options_old[["inverse"]] <- NULL

    options_old[["theme"]] <-
      if (is.character(inverse)) {
        inverse
      } else if (isTRUE(as.logical(inverse))) {
        options_old[["theme"]] <- "dark"
      } else if (isFALSE(as.logical(inverse))) {
        options_old[["theme"]] <- "light"
      } else {
        abort(paste("Invalid `inverse` value: ", inverse))
      }
  }

  # Consolidate `navbar_options` (options_user) with the deprecated direct
  # options. We take the direct option if the user option is a default value,
  # warning if otherwise ignored.
  # TODO-deprecated: Remove this and warning when direct options are hard-deprecated
  is_default <- attr(options_user, "is_default") %||% list()
  keep_user_values <- vapply(
    names(options_user),
    function(x) !isTRUE(is_default[[x]]),
    logical(1)
  )
  options_user <- options_user[keep_user_values]

  ignored <- c()
  for (opt in names(options_old)) {
    if (!opt %in% names(options_user)) {
      options_user[[opt]] <- options_old[[opt]]
    } else if (!identical(options_old[[opt]], options_user[[opt]])) {
      ignored <- c(ignored, if (opt == "theme") "inverse" else opt)
    }
  }

  if (length(ignored) > 0) {
    rlang::warn(
      c(
        sprintf(
          "`%s` %s provided twice: once directly and once in `navbar_options`.",
          paste(ignored, collapse = "`, `"),
          if (length(ignored) == 1) "was" else "were"
        ),
        "The deprecated direct option(s) will be ignored and the values from `navbar_options` will be used."
      ),
      call = rlang::caller_call()
    )
  }

  attribs <- options_user[["attribs"]] %||% list()
  options_user$attribs <- NULL

  rlang::exec(navbar_options, !!!options_user, !!!attribs)
}

#' @export
print.bslib_navbar_options <- function(x, ...) {
  cat("<bslib_navbar_options>\n")

  if (length(x) == 0) {
    return(invisible(x))
  }

  fields <- names(x)
  opt_w <- max(nchar(fields))
  is_default <- attr(x, "is_default") %||% list()
  for (opt in fields) {
    value <- x[[opt]] %||% "NULL"
    if (inherits(value, "list")) {
      value <- paste(names(value), collapse = ", ")
    }
    if (isTRUE(is_default[[opt]])) {
      if (identical(value, "NULL")) {
        # Skip printing default NULL values
        next
      }
      value <- sprintf("(%s)", value)
    }
    cat(sprintf("%*s", opt_w, opt), ": ", value, "\n", sep = "")
  }

  invisible(x)
}
