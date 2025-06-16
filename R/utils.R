# @staticimports pkg:staticimports
#  is_installed get_package_version system_file
#  register_upgrade_message
#  %||% is_string
#  read_utf8

switch_version <- function(
  version,
  five = default,
  four = default,
  three = default,
  default = NULL
) {
  if (is_bs_theme(version)) {
    version <- theme_version(version)
  }
  version <- as.character(version)
  if (isTRUE(version %in% c("4-3", "4+3"))) {
    warning("Version ", version, " has been renamed to 4. Please use 4 instead")
    version <- "4"
  }
  switch(
    version,
    `5` = five,
    `4` = four,
    `3` = three,
    stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
  )
}

get_exact_version <- function(version) {
  switch_version(
    version,
    five = version_bs5,
    four = version_bs4,
    three = version_bs3
  )
}

path_inst <- function(...) {
  files <- system_file(..., package = "bslib")
  files_found <- files != ""
  if (all(files_found)) {
    return(files)
  }

  files_not_found <- file.path(...)[!files_found]
  stop(
    "bslib file not found: '",
    files_not_found,
    "'",
    call. = FALSE
  )
}

path_lib <- function(...) path_inst("lib", ...)

is_shiny_app <- function() {
  # Make sure to not load shiny as a side-effect of calling this function.
  isNamespaceLoaded("shiny") && shiny::isRunning()
}

is_hosted_app <- function() {
  nzchar(Sys.getenv("SHINY_SERVER_VERSION")) && is_shiny_app()
}

is_shiny_runtime <- function() {
  if (!is_installed("knitr")) {
    return(FALSE)
  }
  isTRUE(grepl("^shiny", knitr::opts_knit$get("rmarkdown.runtime")))
}

register_runtime_package_check <- function(feature, pkg, version) {
  msg <- sprintf(
    "%s is designed to work with %s %s or higher",
    feature,
    pkg,
    version
  )

  if (isNamespaceLoaded(pkg) && !is_installed(pkg, version)) {
    warning(msg, call. = FALSE)
  }

  setHook(
    packageEvent(pkg, "onLoad"),
    function(...) {
      if (!is_installed(pkg, version)) warning(msg, call. = FALSE)
    }
  )
}

add_class <- function(x, y) {
  class(x) <- unique(c(y, oldClass(x)))
  x
}

dropNulls <- function(x) {
  x[!vapply(x, is.null, FUN.VALUE = logical(1))]
}

names2 <- function(x) {
  names(x) %||% rep.int("", length(x))
}

any_unnamed <- function(x) {
  if (length(x) == 0) {
    return(FALSE)
  }
  nms <- names(x)
  is.null(nms) || !all(nzchar(nms))
}

separate_arguments <- function(...) {
  x <- rlang::list2(...)
  x_names <- rlang::names2(x)
  is_named <- nzchar(x_names)

  if (all(is_named)) {
    return(list(attribs = x, children = list()))
  }

  if (!any(is_named)) {
    return(list(attribs = list(), children = x))
  }

  list(attribs = x[is_named], children = unname(dropNulls(x[!is_named])))
}

#' Rename a named list
#'
#' @param x a named list to be renamed
#' @param nms a named character vector defining the renaming
#' @noRd
#' @examples
#' rename2(list(a=1, b=3, c=4, a=2), b="z", f="w", a="y")
#' #> list(y = 1, z = 3, c = 4, y = 2)
#' rename2(c("a", "b", "c", "a"), b="z", f="w", a="y")
#' #> c("y", "z", "c", "y")
rename2 <- function(x, ...) {
  defs <- rlang::list2(...)
  nms <- names(x) %||% as.character(x)
  matches <- intersect(nms, names(defs))
  map <- match(nms, names(defs))
  mapidxNA <- is.na(map)
  replacement <- as.character(defs)[map[!mapidxNA]]
  if (is.null(names(x))) {
    x[!mapidxNA] <- replacement
  } else {
    names(x)[!mapidxNA] <- replacement
  }
  x
}

# Get an accessible color contrast for a specified bg_color
# (and return NULL+warn on failure)
get_color_contrast <- function(bg_color) {
  utils_layer <- sass::sass_layer(
    functions = sass::sass_file(
      path_inst("sass-utils", "color-contrast.scss")
    ),
    defaults = c(
      "$black: #000000;",
      "$white: #FFFFFF;"
    ),
    rules = sprintf(
      "._ {--RET: #{color-contrast(%s)}}",
      bg_color
    )
  )

  tryCatch(
    {
      css <- sass::sass(
        utils_layer,
        cache_key_extra = get_package_version("bslib"),
        # Don't listen to global Sass options so we can be sure
        # that stuff like source maps won't be included
        options = sass::sass_options(source_map_embed = FALSE)
      )
      # example: css <- "._ {\n  --RET: #fff;\n}"
      # we'll split to get value:     ^     ^
      ret <- strsplit(css, "--RET:")[[1]][2]
      trimws(strsplit(ret, ";")[[1]][1])
    },
    error = function(err) {
      warning(
        "Failed to compute a contrasting color for '",
        bg_color,
        "'",
        call. = FALSE
      )
      NULL
    }
  )
}
