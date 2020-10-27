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

  font_css <- read_gfont_url(web_font_url)

  families <- extract_first_group(font_css, "font-family:\\s*'(.+)';")
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

  local_files <- file.path(fonts_home, paste0(font_ids, ".", tools::file_ext(urls)))

  Map(function(url, local_file) {
    download.file(url, local_file)
    font_css <<- sub(url, sub("inst/", "", local_file), font_css)
  }, urls, local_files)

  writeLines(font_css, file.path(theme, "font.css"))
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
