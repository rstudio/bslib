# TODO: pull this out into it's own package
jquery_deps <- function() {
  minified <- getOption("shiny.minified", TRUE)

  list(
    htmlDependency(
      "jquery",
      version_jquery,
      src = "node_modules/jquery/dist",
      package = "bootstraplib",
      script = if (minified) "jquery.min.js" else "jquery.js"
    )
  )
}
