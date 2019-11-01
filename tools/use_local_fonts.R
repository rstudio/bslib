library(sass)

themes <- list.dirs(
  "inst/node_modules/bootswatch/dist",
  recursive = FALSE,
  full.names = TRUE
)

for (theme in themes) {
  sass_files <- list(
    sass_file(file.path(theme, "_variables.scss")),
    list(`web-font-path` = sprintf('"%s"', file.path(theme, "font.css"))),
    sass_file(file.path("inst", "node_modules", "bootstrap", "scss", "bootstrap.scss")),
    sass_file(file.path(theme, "_bootswatch.scss"))
  )
  # Re-compile bootstrap.min.css (with source map embedded so we don't need boostrap.css)
  sass(
    sass_files,
    output = file.path(theme, "bootstrap.min.css"),
    options = sass_options(
      output_style = "compressed",
      source_map_embed = TRUE
    )
  )
  # prevent bloating the size of the package
  file.remove(file.path(theme, "bootstrap.css"))
}
