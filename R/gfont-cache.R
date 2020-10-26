#' Control the directory used for font caching
font_cache_set <- function(path, cleanup = FALSE) {
  old_home <- font_cache_housing()
  # Copy the existing cache over to the new cache
  font_files <- dir(old_home, recursive = TRUE)
  file.copy(
    file.path(old_home, font_files),
    file.path(path, font_files)
  )
  # Remove the old cache, if requested
  if (cleanup) {
    unlink(file.path(old_home, font_files), recursive = TRUE)
  }
  Sys.setenv("BOOTSTRAPLIB_FONT_CACHE_DIR" = path)
  invisible(old_home)
}

gfont_cache_dir <- function(family) {
  file.path(font_cache_housing(), gfont_id(family))
}

gfont_id <- function(family) {
  gsub("\\s+", "-", tolower(family))
}

font_cache_housing <- function() {
  Sys.getenv(
    "BOOTSTRAPLIB_FONT_CACHE_DIR",
    file.path(bootstraplib_cache_dir(), "fonts")
  )
}


bootstraplib_cache_dir <- function() {
  rappdirs::user_cache_dir("bootstraplib")
}
