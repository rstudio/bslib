#' Create a set of navbar options
#' 
#' A `navbar_options()` object captures options specific to the appearance and
#' behavior of the navbar, independent from the content displayed on the page.
#' This helper should be used to create the list of options expected by
#' `navbar_options` in [page_navbar()] and [navset_bar()].
#' 
#' ## Changelog
#' 
#' This function was introduced in \pkg{bslib} v0.9.0, replacing the `position`,
#' `bg`, `inverse`, `collapsible` and `underline` arguments of [page_navbar()]
#' and [navset_bar()]. Those arguments are deprecated with a warning and will be
#' removed in a future version of \pkg{bslib}.
#' 
#' @examples
#' navbar_options(position = "static-top", bg = "#2e9f7d", underline = FALSE)
#' 
#' @inheritParams shiny::navbarPage
#' @param bg a CSS color to use for the navbar's background color.
#' @param type Either `"dark"` for a light text color (on a **dark** background)
#'   or `"light"` for a dark text color (on a **light** background). If `"auto"`
#'   (the default) and `bg` is provided, the best contrast to `bg` is chosen.
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
  type = c("auto", "light", "dark"),
  collapsible = TRUE,
  underline = TRUE
) {
  # Track user-provided arguments for print method and deprecation warnings
  is_default <- list(
    position = missing(position),
    bg = missing(bg),
    type = missing(type),
    collapsible = missing(collapsible),
    underline = missing(underline)
  )

  
  opts <- list(
    position = rlang::arg_match(position),
    bg = bg,
    type = rlang::arg_match(type),
    collapsible = collapsible,
    underline = underline
  )
  
  attrs <- rlang::dots_list(...)
  if (length(attrs)) {
    opts[["attrs"]] <- attrs
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
      I(sprintf(
        "The %s argument%s of `%s()` %s been consolidated into a single `navbar_options` argument and ",
        paste(sprintf("`%s`", args_deprecated), collapse = ", "),
        if (length(args_deprecated) > 1) "s" else "",
        .fn_caller,
        if (length(args_deprecated) > 1) "have" else "has"
      )),
      details = c(
        "i" = "See `navbar_options()` for more details.",
        "!" = if ("inverse" %in% args_deprecated) "Use `type` instead of `inverse` in `navbar_options()`."
      )
    )
  }

  # Upgrade `inverse` to the new `type` argument of `navbar_options()`
  if ("inverse" %in% names(options_old)) {
    inverse <- options_old[["inverse"]]
    options_old[["inverse"]] <- NULL
    
    options_old[["type"]] <- 
      if (is.character(inverse)) {
        inverse
      } else if (isTRUE(as.logical(inverse))) {
        options_old[["type"]] <- "dark"
      } else if (isFALSE(as.logical(inverse))) {
        options_old[["type"]] <- "light"
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
      ignored <- c(ignored, opt)      
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

  attrs <- options_user$attrs %||% list()
  options_user$attrs <- NULL

  rlang::exec(navbar_options, !!!options_user, !!!attrs)
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
