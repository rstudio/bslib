.onLoad <- function(libname, pkgname) {
  register_upgrade_message("shiny", "1.6.0")
  register_upgrade_message("rmarkdown", "2.7")
  .dependency_cache <<- cachem::cache_mem(max_age = 1)

  # Call setup_input_handlers() when both bslib and shiny are loaded
  if ("shiny" %in% loadedNamespaces()) {
    # shiny is already loaded, go ahead and set up
    setup_input_handlers()
  } else {
    # shiny is not yet loaded, if it ever gets loaded we'll register then
    setHook(packageEvent("shiny", "onLoad"), function(...) {
      setup_input_handlers()
    })
  }
}

.dependency_cache <- NULL

setup_input_handlers <- function() {
  shiny::registerInputHandler("bslib.taskbutton", input_task_button_input_handler)
}
