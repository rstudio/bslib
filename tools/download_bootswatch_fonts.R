library(stringr)

if (Sys.getenv("RSTUDIO") == "1") {
  stop("Please run this script from the command line: `Rscript tools/fonts.R`")
}

# TODO: make sure this isn't drastically different from 2.1 Mb
fonts_home <- file.path("inst", "fonts")
unlink(fonts_home, recursive = TRUE)
dir.create(fonts_home)

extract_first_group <- function(x, pattern) {
  matches <- regmatches(x, regexec(pattern, x))
  na.omit(sapply(matches, "[", 2))
}

download_and_copy_fonts <-  function(theme) {
  theme_scss <- readLines(file.path(theme, "_bootswatch.scss"), warn = FALSE)
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
  css <- read_gfont_url(web_font_url, css_file)
  urls <- extract_group(css, "url\\(([^)]+)")
  basenames <- basename(urls)
  Map(function(url, nm) {
    download_file(url, file.path(fonts_home, nm))
    css <<- sub(url, file.path("fonts", nm), css, fixed = TRUE)
  }, urls, basenames)
  writeLines(css, css_file)
}

themes <- list.dirs(
  "inst/lib/bootswatch/dist",
  recursive = FALSE,
  full.names = TRUE
)
themes3 <- list.dirs(
  "inst/lib/bootswatch3",
  recursive = FALSE,
  full.names = TRUE
)

lapply(themes, download_and_copy_fonts)
lapply(themes3, download_and_copy_fonts)
