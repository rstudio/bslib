#' Import Google Fonts into a Bootstrap theme
#'
#' @param name Any Google Font name (e.g., Pacifico)
#' @param weight A font weight definition
#' @param local whether or not download and bundle local (woff) font files.
#' @param cache whether or not to cache local font files (only takes effect
#' when `local = TRUE`).
#' @references <https://developers.google.com/fonts/docs/css2>
#' @export
#' @examples
#'
#' theme <- bs_theme(base_font = gfont("Pacifico"))
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
gfont <- function(name, weight = NULL, local = FALSE, cache = TRUE) {
  stopifnot(is_string(name))
  if (!is.null(weight)) stopifnot(is_string(weight))
  structure(
    list(name = name, weight = weight, local = isTRUE(local), cache = cache),
    class = "bootstraplib_gfont"
  )
}

is_gfont <- function(x) {
  inherits(x, "bootstraplib_gfont")
}

# Extract gfont()s from font definitions, obtain the font files as HTML dependencies,
# then add dependencies to the bs_theme()
bs_gfont_dependencies <- function(theme, base = NULL, code = NULL, heading = NULL) {
  gfonts <- dropNulls(c(
    find_gfonts(base),
    find_gfonts(code),
    find_gfonts(heading)
  ))
  if (!length(gfonts)) {
    return(theme)
  }
  version <- packageVersion("bootstraplib")
  bundles <- lapply(gfonts, function(x) {
    layer <- sass_layer(html_deps = gfont_dependency(x, version))
    sass_bundle(!!paste0("gfont_", x$name) := layer)
  })
  bs_bundle(theme, !!!bundles)
}

# Always returns a _list_ of gfonts
find_gfonts <- function(x) {
  if (is_gfont(x)) return(list(x))
  if (!is.list(x)) return(NULL)
  lapply(x, function(y) if (is_gfont(y)) y else NULL)
}

gfont_dependency <- function(gfont, version) {
  if (gfont$local) {
    gfont_dependency_local(gfont, version)
  } else {
    gfont_dependency_remote(gfont, version)
  }
}

# -------------------------------------------------------
# Remote dependency logic
# -------------------------------------------------------

gfont_dependency_remote <- function(gfont, version) {
  htmltools::htmlDependency(
    name = gfont_dep_name(gfont),
    version = version,
    head = format(tags$link(
      href = gfont_url(gfont), rel = "stylesheet"
    )),
    # The src doesn't actually matter...this is just a way
    # to pass along <link> tags as a dependency
    src = tempdir(),
    all_files = FALSE
  )
}

gfont_url <- function(gfont) {
  httpuv::encodeURI(paste0(
    "https://fonts.googleapis.com/css2?family=", gfont$name,
    if (length(gfont$weight)) paste0(":wght@", gfont$weight)
  ))
}

gfont_dep_name <- function(gfont) {
  paste0("google-font-", gfont$name)
}

# -------------------------------------------------------
# Local dependency logic
# -------------------------------------------------------

gfont_dependency_local <- function(gfont, version) {
  # TODO: allow cache to be something like sass::sass_file_cache()?
  if (!isTRUE(gfont$cache)) {
    src_dir <- tempfile()
    dep <- try_gfont_url_dependency(gfont, src_dir, version)
    return(dep)
  }
  cache_dir <- gfont_cache_dir(gfont)
  # cache miss, download files
  if (!dir.exists(cache_dir)) {
    dep <- try_gfont_url_dependency(gfont, cache_dir, version)
    return(dep)
  }
  # cache hit
  htmltools::htmlDependency(
    name = gfont_dep_name(gfont),
    version = version,
    src = cache_dir,
    stylesheet = dir(cache_dir, pattern = "\\.css$"),
    all_files = TRUE
  )
}

try_gfont_url_dependency <- function(gfont, dest_dir, version) {
  tryCatch(
    gfont_url_dependency(gfont, dest_dir, version),
    error = function(e) {
      # TODO: also catch warnings? throw e as well?
      stop(
        "Failed to downloading Google Font family named: '",
        gfont$name, "'. ",
        "Check your internet connection and try again. ",
        call. = FALSE
      )
    }
  )
}

# For an example of the CSS you get back from a gfont_url()
# enter gfont_url(gfont) in your browser
gfont_url_dependency <- function(gfont, dest_dir, version) {
  css <- read_gfont_url(gfont_url(gfont))
  # For each @font-face we get back, infer the family, style, and weight
  # and use that to determine a font file name
  families <- extract_group(css, "font-family:\\s*'(.+)';")
  if (length(families) == 0) {
    stop("Expected to find at least one font-family")
  }
  styles <- extract_group(css, "font-style:\\s*(.+);")
  weights <- extract_group(css, "font-weight:\\s*(.+);")
  if (length(weights) != length(families) || length(styles) != length(families)) {
    stop("Got a different number of weights/families")
  }
  font_ids <- paste0(
    gsub("\\s+", "_", families), "_", weights,
    ifelse(styles %in% "normal", "", styles)
  )
  urls <- extract_group(css, "url\\(([^)]+)")
  if (length(urls) != length(font_ids)) {
    stop("Got a different number of urls than font ids")
  }
  dir.create(dest_dir, recursive = TRUE)
  targets <- file.path(dest_dir, paste0(font_ids, ".", tools::file_ext(urls)))
  Map(function(url, target) {
    download_file(url, target)
    css <<- sub(url, basename(target), css)
  }, urls, targets)

  css_file <- file.path(dest_dir, "font.css")
  writeLines(css, css_file)
  htmltools::htmlDependency(
    name = gfont_dep_name(gfont),
    version = version,
    src = dest_dir,
    stylesheet = basename(css_file),
    all_files = TRUE
  )
}

# Request the relevant @font-face definitions for the font url
# (without the IE11 user-agent header we'd get truetype fonts, but
# there's no reason why we can't use woff, which IE11 supports)
read_gfont_url <- function(url) {
  tmpfile <- tempfile(fileext = ".css")
  on.exit(unlink(tmpfile), add = TRUE)
  download_file(
    url, tmpfile,
    headers = c(
      "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
    )
  )
  readLines(tmpfile)
}

extract_group <- function(x, pattern, which = 1) {
  matches <- regmatches(x, regexec(pattern, x))
  na.omit(sapply(matches, "[", which + 1))
}

gfont_hash <- function(gfont) {
  digest::digest(gfont_url(gfont), algo = "spookyhash")
}

gfont_cache_dir <- function(gfont) {
  file.path(cache_context_dir(), gfont_hash(gfont))
}

# Inspired by sass::sass_cache_context_dir
cache_context_dir <- function(pkg = "bootstraplib") {
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
  if (is_installed("curl")) {
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
