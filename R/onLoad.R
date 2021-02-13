.onLoad <- function(libname, pkgname) {
  register_upgrade_message("shiny", "1.6.0")
}


# Same as shiny:::register_upgrade_message
register_upgrade_message <- function(pkg, version) {

  msg <- sprintf(
    "This version of bslib is designed to work with %s version %s or higher. ",
    pkg, version
  )

  if (pkg %in% loadedNamespaces() && !is_available(pkg, version)) {
    packageStartupMessage(msg)
  }

  # Always register hook in case pkg is loaded at some
  # point the future (or, potentially, but less commonly,
  # unloaded & reloaded)
  setHook(
    packageEvent(pkg, "onLoad"),
    function(...) {
      if (!is_available(pkg, version)) packageStartupMessage(msg)
    }
  )
}
