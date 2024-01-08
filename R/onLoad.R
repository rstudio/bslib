.onLoad <- function(libname, pkgname) {
  register_upgrade_message("shiny", "1.6.0")
  register_upgrade_message("rmarkdown", "2.7")
  .dependency_cache <<- cachem::cache_mem(max_age = 1)

  # Call setup_input_handlers() when both bslib and shiny are loaded
  if (!setup_input_handlers()) {
    # shiny is not yet loaded, if it ever gets loaded we'll register then
    setHook(packageEvent("shiny", "onLoad"), function(...) {
      setup_input_handlers()
    })
  }
}

.dependency_cache <- NULL

# Returns TRUE if input handlers were successfully loaded
setup_input_handlers <- function() {
  if (!"shiny" %in% loadedNamespaces()) {
    return(FALSE)
  }

  if (!"registerInputHandler" %in% names(asNamespace("shiny"))) {
    # In devtools::load_all(), the shiny namespace is loaded but empty at the
    # time bslib loads. It's OK not to do the registration now, it'll just
    # happen when shiny finishes loading.
    return(FALSE)
  }

  shiny::registerInputHandler("bslib.taskbutton", input_task_button_input_handler)
  TRUE
}
