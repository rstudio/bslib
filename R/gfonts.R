get_gfont_info <- function() {
  # TODO: make this async?
  jsonlite::fromJSON(gfont_api_url())$items
}

# same as thematic:::gfont_api_url
gfont_api_url <- function() {
  paste0("https://www.googleapis.com/webfonts/v1/webfonts?key=",
         gfont_key())
}

# same as thematic:::gfont_key
gfont_key <- function() {
  Sys.getenv("GFONT_KEY", paste0("AIzaSyDP", "KvElVqQ-", "26f7tjxyg", "IGpIajf", "tS_zmas"))
}
