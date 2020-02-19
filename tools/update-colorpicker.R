version <- "3.2.0"
dist <- sprintf("https://unpkg.com/bootstrap-colorpicker@%s/dist", version)
js <- c("bootstrap-colorpicker.js", "bootstrap-colorpicker.js.map")
css <- c("bootstrap-colorpicker.min.css", "bootstrap-colorpicker.min.css.map")
download.file(
  file.path(dist, "js", js),
  file.path("inst/lib/bootstrap-colorpicker/js", js)
)
download.file(
  file.path(dist, "css", css),
  file.path("inst/lib/bootstrap-colorpicker/css", css)
)
