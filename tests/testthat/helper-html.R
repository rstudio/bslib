show_raw_html <- function(x) {
  cat(format(x))
}

expect_snapshot_html <- function(x, .envir = parent.frame()) {
  # Use deparse1() with collapse to ensure single-line output
  # This avoids issues with trailing commas from multi-line deparse
  x_str <- deparse1(substitute(x), collapse = " ")
  code <- parse(text = sprintf("expect_snapshot(show_raw_html(%s))", x_str))
  eval(code, envir = .envir)
}
