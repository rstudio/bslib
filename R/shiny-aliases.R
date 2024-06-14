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
