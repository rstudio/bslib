library(stringr)

# if (Sys.getenv("RSTUDIO") == "1") {
#   stop("Please run this script from the command line: `Rscript tools/download_preset_fonts.R`")
# }

# TODO: make sure this isn't drastically different from 2.1 Mb
fonts_home <- file.path("inst", "fonts")
unlink(fonts_home, recursive = TRUE)
dir.create(fonts_home)

extract_first_group <- function(x, pattern) {
  matches <- regmatches(x, regexec(pattern, x))
  na.omit(sapply(matches, "[", 2))
}

# Google Fonts does browser sniffing to determine which font file type is appropriate.
# At the time of writing, woff2 is recommended for Chrome, and actually provides pretty
# good browser support (and compression), so we'll adopt it universally
# https://caniuse.com/woff2
request_headers <-  c(
  "User-Agent" = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

download_and_copy_fonts <-  function(theme, rule_file = "_bootswatch.scss") {
  theme_file <- file.path(theme, rule_file)

  if (!file.exists(theme_file)) {
    stop("Couldn't find '", rule_file, "' in ", theme)
  }

  theme_scss <- readLines(theme_file)

  web_font_path <- grep("$web-font-path:", theme_scss, value = TRUE, fixed = TRUE)
  if (!length(web_font_path)) {
    return()
  }
  web_font_url <- strsplit(stringr::str_trim(web_font_path), "\\s+")[[1]][2]
  if (!length(web_font_url)) {
    warning("Wasn't able to extract a url for $web-font-path from theme: ", theme)
    return()
  }
  web_font_url <- gsub('(^")|("$)', '', web_font_url)
  css_file <- file.path(theme, "font.css")
  download.file(
    utils::URLencode(web_font_url), css_file,
    method = "libcurl", headers = request_headers
  )
  css <- readLines(css_file)
  urls <- sass:::extract_group(css, "url\\(([^)]+)")
  basenames <- basename(urls)
  Map(function(url, nm) {
    if (!grepl("[.]woff2$", nm)) {
      stop("Expected a woff2 font file")
    }

    target <- file.path(fonts_home, nm)
    # The basename can sometimes be very long, and R CMD check
    # will complain if the target file is over 100 characters long,
    # so shorten it if necessary
    if (nchar(target) > 100) {
      nm <- paste0(
        rlang::hash(tools::file_path_sans_ext(nm)),
        ".", tools::file_ext(nm)
      )
      target <- file.path(fonts_home, nm)
    }
    download.file(url, target, method = "libcurl", headers = request_headers)
    css <<- sub(url, file.path("fonts", nm), css, fixed = TRUE)
  }, urls, basenames)
  writeLines(css, css_file)
  NULL
}


themes5 <- list.dirs(
  "inst/lib/bsw5/dist",
  recursive = FALSE,
  full.names = TRUE
)
themes4 <- list.dirs(
  "inst/lib/bsw4/dist",
  recursive = FALSE,
  full.names = TRUE
)
themes3 <- list.dirs(
  "inst/lib/bsw3",
  recursive = FALSE,
  full.names = TRUE
)
builtin5 <- list.dirs(
  "inst/builtin/bs5",
  recursive = FALSE,
  full.names = TRUE
)

invisible({
  lapply(themes5, download_and_copy_fonts)
  lapply(themes4, download_and_copy_fonts)
  lapply(themes3, download_and_copy_fonts)
})

lapply(builtin5, download_and_copy_fonts, rule_file = "_rules.scss")
