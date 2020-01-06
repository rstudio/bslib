context("bootstrap")

test_that("Can access the sass behind all versions and Bootswatch themes", {
  versions <- c("4-3", "3", "4")
  for (version in versions) {
    # Can compile CSS against variables (in each version)
    css <- bootstrap_sass("body{background-color:$body-bg}", theme = version)
    expect_css(css, "body{background-color:#fff;}")
    themes <- bootswatch_themes(version)
    for (theme in themes) {
      # Can compile each bootswatch theme/version combination
      bs <- bootstrap(theme = paste0(theme, "@", version))
      expect_true(length(bs) > 1)
    }
  }
})

#test_that("Compiling bootstrap 4 matches it's distributed CSS", {
#  skip_if_offline()
#
#  # Grab the distributed CSS from the relevant Bootstrap 4 release
#  release <- sprintf("https://github.com/twbs/bootstrap/archive/v%s.zip", version_bs4)
#  tmp <- tempfile(fileext = ".zip")
#  download.file(release, tmp)
#  unzip(tmp, exdir = dirname(tmp))
#  css <- file.path(tmpdir, paste0("bootstrap-", version_bs4), "dist", "css", "bootstrap.css")
#  scss <- system.file(package = "bootstraplib", "node_modules", "bootstrap", "scss", "bootstrap.scss")
#  sass <- sass::sass(
#    sass::sass_file(scss),
#    # https://github.com/twbs/bootstrap/blob/5d9dd3b/package.json#L24
#    options = sass::sass_options(precision = 6)
#  )
#  sass <- strsplit(sass, "\n", fixed = TRUE)[[1]]
#  # TODO: how to incorporate the autoprefixer?
#  # https://github.com/twbs/bootstrap/blob/5d9dd3b/package.json#L30
#  length(sass)
#  length(readLines(css))
#})
