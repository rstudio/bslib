show_raw_html <- function(x) {
  cat(format(x))
}

expect_snapshot_html <- function(x, .envir = parent.frame()) {
  with_private_seed()
  x_str <- deparse1(substitute(x))
  code <- parse(text = sprintf("expect_snapshot(show_raw_html(%s))", x_str))
  eval(code, envir = .envir)
}
