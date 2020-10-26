#' Safely use Google Fonts in a Bootstrap theme
#'
#' @param name Any Google Font name (e.g., Pacifico)
#' @param weight A font weight definition
#' @param local whether or not download and bundle local font files.
#' @param cache whether or not to cache local font files (only takes effect
#' when `local = TRUE`).
#' @references <https://developers.google.com/fonts/docs/css2>
#' @export
#'
#' roboto <- gfont("Roboto", local = TRUE, weight = "400")
#' bs_theme_preview(bs_theme(base_font = roboto))
gfont <- function(name, weight = NULL, local = FALSE, cache = TRUE) {
  if (!is.null(weight) && !(is.character(weight) && length(weight) == 1)) {
    stop("`weight` must be a character vector of length 1")
  }
  structure(
    list(
      name = name, weight = weight,
      local = isTRUE(local), cache = cache
    ),
    class = "bootstraplib_gfont"
  )
}

is_gfont <- function(x) {
  inherits(x, "bootstraplib_gfont")
}

bs_gfont_dependencies <- function(theme, base = NULL, code = NULL, heading = NULL) {
  gfonts <- dropNulls(list(
    find_first_gfont(base),
    find_first_gfont(code),
    find_first_gfont(heading)
  ))
  if (!length(gfonts)) {
    return(theme)
  }
  version <- packageVersion("bootstraplib")
  bundles <- lapply(deps, function(x) {
    layer <- sass_layer(html_deps = gfont_dependency(x, version))
    sass_bundle(!!paste0("gfont_", x$name) := layer)
  })
  bs_bundle(theme, !!!bundles)
}

# TODO: is this good enough? Seem like we might need _all_ gfonts?
find_first_gfont <- function(x) {
  if (is_gfont(x)) return(x)
  if (!is.list(x)) return(NULL)
  for (i in seq_along(x)) {
    if (is_gfont(x[[i]])) return(x[[i]])
  }
}

gfont_dependency <- function(gfont, version) {
  if (gfont$local) {
    gfont_dependency_local(gfont, version)
  } else {
    gfont_dependency_remote(gfont, version)
  }
}

gfont_dependency_remote <- function(gfont, version) {
  htmltools::htmlDependency(
    name = gfont$name, version = version,
    src = tempdir(), all_files = FALSE,
    head = format(gfonts_remote_links(gfont$name, gfont$weight))
  )
}

gfont_dependency_local <- function(gfont, version) {
  url <- gfont_family_url(gfont$name, gfont$weight)
  if (gfont$cache) {
    cache_dir <- bootstraplib_cache_dir()
    # TODO: implement caching
  } else {
    src_dir <- tempfile()
    dir.create(src_dir)
    tryCatch(
      download_gfont_files(url, dest = src_dir),
      error = function(e) {
        stop(
          "Downloading of Google Font family: '", gfont$name, "' has failed.",
          "Check your internet connection and try again. ", e$conditionMessage,
          call. = FALSE
        )
      }
    )

  }
}



download_gfont_files <- function(url, dest) {
  css <- readLines(url(url))

  families <- extract_first_group(css, "font-family:\\s*'(.+)';")
  if (length(families) == 0) {
    stop("Expected to find at least one font-family")
  }
  styles <- extract_first_group(font_css, "font-style:\\s*(.+);")
  weights <- extract_first_group(font_css, "font-weight:\\s*(.+);")
  if (length(weights) != length(families) || length(styles) != length(families)) {
    stop("Got a different number of weights/families")
  }
  font_ids <- paste0(
    gsub("\\s+", "_", families), "_", weights,
    ifelse(styles %in% "normal", "", styles)
  )
  urls <- extract_first_group(font_css, "url\\(([^)]+)")
  if (length(urls) != length(font_ids)) {
    stop("Got a different number of urls than font ids")
  }

  targets <- file.path(dest, paste0(font_ids, ".", tools::file_ext(urls)))
  Map(function(url, target) {
    download.file(url, target)
    css <<- sub(url, target, css)
  }, urls, targets)

  css_file <- file.path(dest, "font.css")
  writeLines(css, css_file)
  htmltools::htmlDependency(
    name = name,
    version = version,
    src = dest,
    stylesheet = css_file,
    all_files = TRUE
  )
}

extract_first_group <- function(x, pattern) {
  matches <- regmatches(x, regexec(pattern, x))
  na.omit(sapply(matches, "[", 2))
}


gfonts_remote_links <- function(families) {
  tagList(
    lapply(families, function(x) {
      tags$link(href = gfont_family_url(x), rel = "stylesheet")
    })
  )
}

gfont_family_url <- function(x, weight = NULL) {
  httpuv::encodeURI(paste0(
    "https://fonts.googleapis.com/css2?family=", x,
    if (length(weight)) paste0(":wght@", weight),
    ";display=swap"
  ))
}


bootstraplib_cache_dir <- function() {
  rappdirs::user_cache_dir("bootstraplib")
}


get_gfont_info <- function() {
  jsonlite::fromJSON(gfont_api_url())$items
}

# same as thematic:::gfont_api_url
# TODO: should this be v2?
gfont_api_url <- function() {
  paste0("https://www.googleapis.com/webfonts/v1/webfonts?key=",
         gfont_key())
}

# same as thematic:::gfont_key
gfont_key <- function() {
  Sys.getenv("GFONT_KEY", paste0("AIzaSyDP", "KvElVqQ-", "26f7tjxyg", "IGpIajf", "tS_zmas"))
}
