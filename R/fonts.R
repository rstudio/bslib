#' Import web fonts into a [bs_theme()]
#'
#' When used with any of the main font settings in [bs_theme()] (e.g.,
#' `base_font`, `code_font`, `heading_font`), these font objects ensure relevant
#' font file resources are included with the theme. A particular font object should
#' define an single font `family` --- if you need multiple families, a `list()` of
#' font objects may be provided to `bs_theme()`.
#'
#' @section Local fonts:
#'
#' With local (i.e., self-hosted) fonts, clients (i.e., end users) can render
#' fonts without an internet connection. By default, `google_font()` will
#' automatically download, cache, and serve font files locally. Non-Google fonts
#' may also be served locally, but you'll have to download and serve local file
#' using something like [shiny::addResourcePath()] (or similar) and provide the
#' relevant files to a [font_face()] definiton.
#'
#' @section Remote fonts:
#'
#' With remotely hosted fonts, clients (i.e., end users) need an internet
#' connection to render the fonts. Remote fonts can be implemented using
#' `font_google(..., local = FALSE)` (hosted via Google), `font_link()` (hosted
#' via `href` URL), or `font_face()` (hosted via `src` URL).
#'
#' @param family A character string with a _single_ font family name.
#' @param src A character vector for the `src` `@font-face` property. Beware
#'   that is character strings are taken verbatim, so careful quoting and/or URL
#'   encoding may be required.
#' @param weight A character (or numeric) vector for the `font-weight`
#'   `@font-face` property.
#' @param display A character vector for the `font-display` `@font-face`
#'   property.
#' @param style A character vector for the `font-style` `@font-face` property.
#' @param stretch A character vector for the `font-stretch` `@font-face`
#'   property.
#' @param variant A character vector for the `font-variant` `@font-face`
#'   property.
#' @param unicode_range A character vector for `unicode-range` `@font-face`
#'   property.
#'
#' @references <https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face>
#' @references <https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts>
#' @export
#' @examples
#'
#' # If you have an internet connection, running the following code
#' # will download, cache, and import the relevant Google Font files
#' # for local use
#' theme <- bs_theme(
#'   base_font = font_google("Fira Sans"),
#'   code_font = font_google("Fira Code"),
#'   heading_font = font_google("Fredoka One")
#' )
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
#'
#' # Three different yet equivalent ways of importing a remotely-hosted Google Font
#' a <- font_google("Crimson Pro", wght = "200..900", local = FALSE)
#' b <- font_link(
#'   "Crimson Pro",
#'   href = "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@200..900"
#' )
#' url <- "https://fonts.gstatic.com/s/crimsonpro/v13/q5uDsoa5M_tv7IihmnkabARboYF6CsKj.woff2"
#' c <- font_face(
#'   family = "Crimson Pro",
#'   style = "normal",
#'   weight = "200 900",
#'   src = paste0("url(", url, ") format('woff2')")
#' )
#' theme <- bs_theme(base_font = c)
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
#'
font_face <- function(family, src, weight = NULL, style = NULL,
                      display = c("swap", "auto", "block", "fallback", "optional"),
                      stretch = NULL, variant = NULL, unicode_range = NULL) {

  x <- dropNulls(list(
    family = unquote_font_family(family),
    src = src,
    weight = weight,
    style = style,
    display = if (!is.null(display)) match.arg(display),
    stretch = stretch,
    variant = variant,
    unicode_range = unicode_range
  ))

  # Multiple src values are separated by "," (everything else by white space)
  # TODO: src could accept a list of named lists which might give us the
  # opportunity to handle quoting and encoding of URLs
  for (prop in names(x)) {
    collapse <- if (prop %in% c("src", "unicode_range")) ", " else " "
    x[[prop]] <- paste0(x[[prop]], collapse = collapse)
  }
  x$css <- font_face_css(x)

  structure(x, class = "bs_font_face")
}

font_face_css <- function(x) {
  props <- names(x)
  font_prop <- !props %in% c("src", "unicode_range")
  props[font_prop] <- paste0("font-", props[font_prop])
  paste0(
    "@font-face {\n",
    paste0("  ", props, ": ", x, ";", collapse = "\n"),
    "\n}"
  )
}

#' @rdname font_face
#' @param href A URL resource pointing to the font data.
#' @export
font_link <- function(family, href) {
  structure(
    list(family = unquote_font_family(family), href = href),
    class = "bs_font_link"
  )
}

#' @rdname font_face
#' @param local Whether or not download and bundle local (woff) font files.
#' @param cache A [sass::sass_file_cache()] object (or, more generally, a file
#'   caching class with `$get_file()` and `$set_file()` methods). Set this
#'   argument to `FALSE` or `NULL` to disable caching.
#' @param wght One of the following:
#'   * `NULL`, the default weight for the `family`.
#'   * A character string defining an [axis range](https://developers.google.com/fonts/docs/css2#axis_ranges)
#'   * A numeric vector of desired font weight(s).
#' @param ital One of the following:
#'   * `NULL`, the default `font-style` for the `family`.
#'   * `0`, meaning `font-style: normal`
#'   * `1`, meaning `font-style: italic`
#'   * `c(0, 1)`, meaning both `normal` and `italic`
#' @param display the `font-display` `@font-face` property.
#' @references <https://developers.google.com/fonts/docs/css2>
#' @export
font_google <- function(family, local = TRUE, cache = sass::sass_file_cache(dir = cache_context_dir(), max_size = 100 * 1024^2),
                        wght = NULL, ital = NULL, display = c("swap", "auto", "block", "fallback", "optional")) {
  stopifnot(is.logical(local))
  if (!is.null(wght)) {
    stopifnot(is.character(wght) || is.numeric(wght))
    wght <- sort(wght)
  }
  if (!is.null(ital)) {
    stopifnot(all(ital %in% c(0, 1)))
    ital <- sort(ital)
  }
  display <- match.arg(display)

  axis_rng <-
    if (is.null(wght) && is.null(ital)) {
     ""
    } else if (is.null(ital)) {
      paste0(":wght@", paste0(wght, collapse = ";"))
    } else if (is.null(wght)) {
      paste0(":ital@", paste0(ital, collapse = ";"))
    } else {
      paste0(":ital,wght@", paste0(
        apply(expand.grid(wght, ital)[, 2:1], 1, paste0, collapse = ","),
        collapse = ";"
      ))
    }

  structure(
    dropNulls(list(
      family = unquote_font_family(family),
      local = local, cache = cache,
      href = paste0(
        "https://fonts.googleapis.com/css2?family=",
        family, axis_rng, "&display=", display
      )
    )),
    class = "bs_font_google"
  )
}

is_font_object <- function(x) {
  is_font_face(x) || is_font_link(x) || is_font_google(x)
}

is_font_face <- function(x) {
  inherits(x, "bs_font_face")
}

is_font_link <- function(x) {
  inherits(x, "bs_font_link")
}

is_font_google <- function(x) {
  inherits(x, "bs_font_google")
}

# Only to be used when we know x is meant to be a single font family
unquote_font_family <- function(x) {
  if (!is_string(x)) stop("Font family must be a string")
  if (grepl(",", x)) stop("Font family cannot contain comma(s)")
  gsub("(^\\s*)|(\\s*$)|(')|(\")", "", x)
}

# Extract font_google()s from font definitions, obtain the font files as HTML dependencies,
# then add dependencies to the bs_theme()
bs_font_dependencies <- function(theme, base = NULL, code = NULL, heading = NULL) {
  fonts <- dropNulls(c(
    find_font_objects(base),
    find_font_objects(code),
    find_font_objects(heading)
  ))
  if (!length(fonts)) {
    return(theme)
  }
  version <- packageVersion("bslib")
  bundles <- lapply(fonts, function(x) {
    # Resolve dependencies at render-time (i.e., tagFunction())
    # so the context-aware caching dir has the proper context
    sass_bundle(
      !!font_dep_name(x) := sass_layer(
        html_deps = htmltools::tagFunction(function() {
          font_dep(x, version)
        })
      )
    )
  })
  bs_bundle(theme, !!!bundles)
}

# Always returns a _list_ of font specs
find_font_objects <- function(x) {
  if (is_font_object(x)) return(list(x))
  if (!is.list(x)) return(NULL)
  lapply(x, function(y) if (is_font_object(y)) y else NULL)
}

font_dep <- function(x, version) {
  UseMethod("font_dep")
}

font_dep.bs_font_face <- function(x, version) {
  font_dep_face(x, version)
}

font_dep.bs_font_link <- function(x, version) {
  font_dep_link(x, version)
}

font_dep.bs_font_google <- function(x, version) {
  if (isTRUE(x$local)) {
    font_dep_google_local(x, version)
  } else {
    font_dep_link(x, version)
  }
}

font_dep_name <- function(x) {
  paste0(class(x)[[1]], sub("\\s*", "_", tolower(x$family)))
}


font_dep_face <- function(x, version) {
  src_dir <- tempfile()
  dir.create(src_dir)
  writeLines(x$css, file.path(src_dir, "font.css"))
  htmltools::htmlDependency(
    font_dep_name(x), version,
    src = src_dir,
    stylesheet = "font.css",
    all_files = FALSE
  )
}

font_dep_link <- function(x, version) {
  htmltools::htmlDependency(
    font_dep_name(x), version,
    head = format(tags$link(
      href = utils::URLencode(x$href),
      rel = "stylesheet"
    )),
    # The src dir doesn't actually matter...this is just a way
    # to pass along <link> tags as a dependency
    src = tempdir(), all_files = FALSE
  )
}
# -------------------------------------------------------
# Local dependency logic
# -------------------------------------------------------

# For our purposes, cache objects must support these methods.
is_cache_object <- function(x) {
  # Use tryCatch in case the object does not support `$`.
  tryCatch(
    is.function(x$get_file) && is.function(x$set_file),
    error = function(e) FALSE
  )
}

resolve_cache <- function(cache) {
  if (is_cache_object(cache)) return(cache)
  list(
    get_file = function(...) FALSE,
    set_file = function(...) FALSE
  )
}

font_dep_google_local <- function(x, version) {

  tmpdir <- tempfile()
  dir.create(tmpdir, recursive = TRUE)
  css_file <- file.path(tmpdir, "font.css")

  # TODO: could the hash be more aware of when the href updates?
  x$cache <- resolve_cache(x$cache)
  css_key <- hash(x$href)
  css_hit <- x$cache$get_file(css_key, css_file)

  # Even if we have a cache hit on the CSS file, we may need
  # to re-download font file(s) if they've been pruned from the cache
  css <- if (css_hit) readLines(css_file) else read_gfont_url(x$href, css_file)

  # basename() of these url()s contain a hash key of the font data
  urls <- extract_group(css, "url\\(([^)]+)")
  basenames <- basename(urls)

  # If need be, download the font file(s) that the CSS imports,
  # and modify the CSS to point to the local files
  Map(function(url, nm) {
    key <- hash(nm)
    f <- file.path(tmpdir, nm)
    hit <- x$cache$get_file(key, f)
    if (hit) return()
    # In the event we have a CSS cache hit but miss here, url should actually be
    # a local file. In that case, bust the CSS cache, and start over so we know
    # where to find the font files
    if (!grepl("^\\s*http", url)) {
      x$cache$remove(css_key)
      return(font_dep_google_local(x, version))
    }
    download_file(url, f)
    x$cache$set_file(key, f)
    css <<- sub(url, nm, css, fixed = TRUE)
  }, urls, basenames)

  # Cache the *modified* form of the CSS file
  # (with the local file paths instead of remote URLs)
  if (!css_hit) {
    writeLines(css, css_file)
    x$cache$set_file(css_key, css_file)
  }

  htmltools::htmlDependency(
    font_dep_name(x), version,
    src = dirname(css_file),
    stylesheet = basename(css_file),
    all_files = TRUE
  )
}

# Request the relevant @font-face definitions for the font url
# (without the IE11 user-agent header we'd get truetype fonts, but
# there's no reason why we can't use woff, which IE11 supports)
read_gfont_url <- function(url, file) {
  download_file(
    utils::URLencode(url), file,
    headers = c(
      "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
    )
  )
  readLines(file)
}

extract_group <- function(x, pattern, which = 1) {
  matches <- regmatches(x, regexec(pattern, x))
  na.omit(sapply(matches, "[", which + 1))
}

hash <- function(x) {
  digest::digest(x, algo = "spookyhash")
}

# Same idea as sass::sass_cache_context_dir, but different dir
cache_context_dir <- function(pkg = "bslib") {
  tryCatch(
    {
      # The usual place we'll look. This may be superseded below.
      cache_dir <- rappdirs::user_cache_dir(paste0("R-", pkg))
      if (is_shiny_app()) {
        app_cache_dir <- file.path(
          shiny::getShinyOption("appDir"),
          "app_cache", pkg
        )
        app_has_cache <- dir.exists(app_cache_dir) || dir.exists(dirname(app_cache_dir))
        if (is_hosted_app() || app_has_cache) {
          cache_dir <- app_cache_dir
        }
      }

      if (!dir.exists(cache_dir)) {
        res <- dir.create(cache_dir, recursive = TRUE)
        if (!res) {
          stop("Error creating cache directory")
        }
      }
    },
    error = function(e) {
      warning("Error using cache directory at '", cache_dir, "'. Using temp dir instead.")
      cache_dir <<- tempfile(paste0(pkg, "-"))
      dir.create(cache_dir)
    }
  )
  normalizePath(cache_dir)
}

# similar to thematic:::download_file, but also translates headers to curl
download_file <- function(url, dest, headers = NULL, ...) {
  if (is_available("curl")) {
    if (!curl::has_internet()) {
      warning(
        "Looks like you don't have internet access, which is needed to ",
        "download and install Google Fonts files. Try either changing ",
        "thematic::font_spec(), manually installing the relevant font, or ",
        "trying again with internet access.",
        call. = FALSE
      )
    }
    handle <- curl::handle_setheaders(curl::new_handle(), .list = headers)
    return(curl::curl_download(url, dest, handle = handle, quiet = FALSE, ...))
  }

  if (capabilities("libcurl")) {
    return(download.file(url, dest, method = "libcurl", headers = headers, ...))
  }

  stop(
    "Downloading Google Font files requires either the curl package or ",
    "`capabilities('libcurl')`. ", call. = FALSE
  )
}
