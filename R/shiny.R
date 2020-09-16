.globals <- new.env(parent = emptyenv())

shiny_options_set <- function() {
  do_shiny({
    .globals$shinyOptions <- shinyOptions()
    shiny::shinyOptions(bootstraplib = TRUE)
  })
}

shiny_options_restore <- function() {
  do_shiny({
    shiny::shinyOptions(bootstraplib = .globals$shinyOptions$bootstraplib)
  })
}

do_shiny <- function(expr) {
  if ("shiny" %in% loadedNamespaces()) {
    return(expr)
  }

  setHook(
    packageEvent("shiny", event = "onLoad"),
    function(...) force(expr)
  )
}
