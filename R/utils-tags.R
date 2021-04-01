is_tag <- function(x) {
  inherits(x, "shiny.tag")
}

tag_require <- function(tag, version = 4, caller = "") {
  tagFunc <- tagFunction(function() {
    if (isTRUE(theme_version(bs_current_theme()) >= version))
      return(NULL)
    stop(
      caller, " requires Bootstrap", version, " or higher. ",
      "Please supply `bslib::bs_theme()` to the UI's page layout function ",
      "(e.g., `fluidPage(theme = bslib::bs_theme())`).",
      call. = FALSE
    )
  })
  tagAppendChild(tag, tagFunc)
}


coerce_to_tag <- function(x, ..., .tag_func = div) {
  if (is.character(x)) {
    x <- paste0(x, collapse = "\n")
    return(.tag_func(x, ...))
  }
  if (is_tag(x)) {
    # TODO: throw instead if x doesn't have attributes in ...?
    return(tagAppendAttributes(x, ...))
  }
  x
}
