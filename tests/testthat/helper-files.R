# Returns TRUE if two files have identical contents
identical_files <- function(a, b) {
  content_a <- readBin(a, "raw", file.size(a))
  content_b <- readBin(b, "raw", file.size(b))
  identical(content_a, content_b)
}

# Returns TRUE if two directories have identical contents, recursively.
identical_dirs <- function(a, b) {
  if (!all(dir.exists(c(a, b)))) {
    return(FALSE)
  }
  files_a <- sort(dir(a, recursive = TRUE))
  files_b <- sort(dir(b, recursive = TRUE))
  if (!identical(files_a, files_b)) {
    return(FALSE)
  }

  for (file in files_a) {
    res <- identical_files(
      file.path(a, file),
      file.path(b, file)
    )
    if (!res) {
      return(FALSE)
    }
  }

  TRUE
}
