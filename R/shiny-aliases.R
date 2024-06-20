docs_callout_shiny_alias <- function(new, old) {
  sprintf(
    paste0(
      "This function is an alias for `shiny::%s()` and is included to ",
      "maintain more consistent naming conventions in Shiny apps that use ",
      "\\pkg{bslib}. The documentation on this page may still refer to the ",
      "original function names. You can replace `shiny::%s()` with `%s()`."
    ),
    old, old, new
  )
}

shiny_quote_if_unquoted <- function(
  expr,
  quoted = FALSE,
  ...,
  env = parent.frame()
) {
  if (quoted) return(expr)
  # installExprFunction() quotes using its parent.frame(), which will not be
  # the right frame when `shiny::renderPrint()` or similar are called from
  # within a wrapping function. This function is a workaround to quote the
  # expression, in the right environment, so that we always pass quoted
  # expressions to `shiny::renderPrint()`.
  eval(substitute(substitute(expr)), env)
}
