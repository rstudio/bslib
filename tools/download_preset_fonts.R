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
  css <- sass:::read_gfont_url(web_font_url, css_file)
  urls <- sass:::extract_group(css, "url\\(([^)]+)")
  basenames <- basename(urls)
  Map(function(url, nm) {
    if (!grepl("[.]woff$", nm)) {
      # Google Fonts recently started using query parameters
      # fonts.gstatic.com/l/font?kit={id}&skey={...}...
      stopifnot(grepl("?kit=", url, fixed = TRUE))
      nm <- strsplit(url, "?", fixed = TRUE)[[1]][2]
      nm <- paste0(shiny::parseQueryString(nm)$kit, ".woff")
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
    sass:::download_file(url, target)
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

lapply(themes5, download_and_copy_fonts)
lapply(themes4, download_and_copy_fonts)
lapply(themes3, download_and_copy_fonts)

lapply(builtin5, download_and_copy_fonts, rule_file = "_rules.scss")
