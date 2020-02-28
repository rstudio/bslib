library(sass)

if (Sys.which("yarn") == "") {
  stop("The yarn CLI must be installed and in your PATH")
}

withr::with_dir("inst", system("yarn install"))

# ----------------------------------------------------------------------
# Add known vendor prefixes to bootstrap.scss (since we don't want
# to rely on a node run-time to prefix after compilation)
# https://github.com/twbs/bootstrap/blob/d438f3/package.json#L30
# ----------------------------------------------------------------------

scss_files <- dir(
  "inst/node_modules/bootstrap/scss",
  recursive = TRUE, full.names = TRUE
)
scss_src <- lapply(scss_files, readLines)

add_prefixes <- function(src, property, ok_values = NULL) {
  pattern <- paste0("^\\s*", property, ":\\s*(.+);")
  idx <- grep(pattern, src)
  for (i in idx) {
    prop <- src[[i]]
    if (length(ok_values)) {
      value <- regmatches(prop, regexec(pattern, prop))[[1]][2]
      vals <- strsplit(value, "\\s+")[[1]]
      if (all(vals %in% c(ok_values, "!important"))) next
    }
    leading_ws <- regmatches(prop, regexpr("^\\s+", prop))
    prop_prefixes <- paste0(
      leading_ws,
      c("-webkit-", "-moz-", "-ms-"),
      sub("^\\s+", "", prop),
      collapse = "\n"
    )
    src[[i]] <- paste0(prop, "\n", prop_prefixes)
  }
  src
}

# Unconditionally prefix the following CSS properties
needs_prefix <- c(
  "appearance", "user-select", "backdrop-filter",
  "backface-visibility", "touch-action"
)
for (prop in needs_prefix) {
  scss_src <- lapply(scss_src, add_prefixes, prop)
}
# Conditionally prefix text-decoration if its not CSS2 compliant
# https://www.w3.org/TR/CSS2/text.html#lining-striking-props
# https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
# https://caniuse.com/#search=text-decoration
scss_src <- lapply(scss_src, add_prefixes, "text-decoration", c("none", "underline", "overline", "line-through", "blink", "inherit"))

# Write modified source to disk
invisible(Map(writeLines, scss_src, scss_files))

# ----------------------------------------------------------------------
# Check to make sure we're not missing any vendor prefixes
# that we don't already know about in the distributed CSS
# ----------------------------------------------------------------------

find_prefixed_css <- function(css) {
  vendors <- c("webkit", "moz", "ms")
  prefixes <- lapply(vendors, function(vendor) {
    pattern <- sprintf("-%s-([^:|;| |\\)]+)", vendor)
    prefixes <- regmatches(css, regexec(pattern, css))
    lapply(prefixes, function(x) if (length(x) > 1) x[2] else NULL)
  })
  unique(unlist(prefixes, recursive = TRUE))
}

src_prefixes <- find_prefixed_css(unlist(scss_src))
dist_prefixes <- find_prefixed_css(
  readLines("inst/node_modules/bootstrap/dist/css/bootstrap.css")
)
auto_prefixes <- setdiff(dist_prefixes, src_prefixes)

whitelist <- c(
  # https://caniuse.com/#feat=flexbox
  "flex", "inline-flex", "inline-flexbox",
  # https://caniuse.com/#feat=mdn-api_csskeyframesrule
  "keyframes",
  # https://caniuse.com/#feat=mdn-css_properties_transition
  "transition",
  # https://caniuse.com/#feat=css-animation
  "animation",
  # https://caniuse.com/#feat=transforms2d
  "transform",
  # https://caniuse.com/#feat=mdn-css_properties_column-count
  "column-count",
  # https://caniuse.com/#feat=mdn-css_properties_column-gap_multicol_context
  "column-gap",
  # https://caniuse.com/#feat=css-placeholder
  "placeholder", "input-placeholder",
  # https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
  "text-decoration-skip-ink",
  # webkit prefix doesn't seem necessary? And Bootstrap docs warn about IE...
  # https://caniuse.com/#search=sticky
  "sticky",
  # Already applied conditional prefixing
  "text-decoration"
)

unknown_prefixes <- setdiff(
  # whitelist flexbox props (there are many)
  auto_prefixes[!grepl("^flex-*", auto_prefixes)],
  whitelist
)
if (length(unknown_prefixes)) {
  stop(
    "Unknown vendor prefixes introduced by Bootstrap's autoprefixer. ",
    "Use either add_prefixes() to add prefixes or whitelist them ",
    "(if they're not needed for modern browsers): ",
    "'", paste(collapse = "', '", unknown_prefixes), "'.",
    call. = FALSE
  )
}


# ----------------------------------------------------------------------
# Now, get rid of files that we don't need to bundle with the package
# ----------------------------------------------------------------------

# I don't think we'll need these special builds of popper (at least for now)
unlink("inst/node_modules/popper.js/dist/umd", recursive = TRUE)
unlink("inst/node_modules/popper.js/dist/esm", recursive = TRUE)

# Avoiding bootstrap's distributed CSS saves us another 1.5 Mb
unlink("inst/node_modules/bootstrap/dist/css", recursive = TRUE)

# For now we're just using the main JS bundle
unlink("inst/node_modules/bootstrap/js", recursive = TRUE)
file.remove(file.path(
  "inst/node_modules/bootstrap/dist/js",
  c("bootstrap.js", "bootstrap.js.map", "bootstrap.min.js", "bootstrap.min.js.map")
))

# Each Bootswatch theme bundles Bootstrap
file.remove(c(
  Sys.glob("inst/node_modules/bootswatch/dist/*/bootstrap.css"),
  Sys.glob("inst/node_modules/bootswatch/dist/*/bootstrap.min.css")
))

# To fully support Bootstrap+Bootswatch 3 and 4, we need to bundle
# multiple versions of Bootswatch...this downloads Bootswatch 3
tmp_dir <- tempdir()
withr::with_dir(tmp_dir, system("yarn add bootswatch@3.4.1"))
source <- file.path(tmp_dir, "node_modules", "bootswatch")
target <- "inst/node_modules/bootswatch3"
if (!file.exists(target)) dir.create(target)
file.rename(source, target)

# Again, Bootswatch loves to bundle Bootstrap with each theme
file.remove(c(
  Sys.glob("inst/node_modules/bootswatch3/*/bootstrap.css"),
  Sys.glob("inst/node_modules/bootswatch3/*/bootstrap.min.css"),
  Sys.glob("inst/node_modules/bootswatch3/*/thumbnail.png"),
  # I don't think we'll need less files
  Sys.glob("inst/node_modules/bootswatch3/*/*.less")
))

# :eye_roll:
unlink("inst/node_modules/bootswatch3/docs", recursive = TRUE)
unlink("inst/node_modules/bootswatch3/.github", recursive = TRUE)
# we already got fonts via tools/download_fonts.R
unlink("inst/node_modules/bootswatch3/fonts", recursive = TRUE)

# Rename node_modules to lib to avoid this CRAN note
# https://www.r-bloggers.com/the-most-annoying-warning-for-cran-submission/
pkg_files <- dir("inst/node_modules", recursive = TRUE, full.names = TRUE)
file.copy(
  pkg_files,
  sub("node_modules/", "lib/", pkg_files),
  recursive = TRUE
)
unlink("inst/node_modules/", recursive = TRUE)

# GitHub reports security issues of devDependencies, but that's irrelevant to us
remove_dev_dependencies <- function(pkg_file) {
  if (!file.exists(pkg_file)) return()
  json <- jsonlite::fromJSON(pkg_file)
  json <- json[setdiff(names(json), "devDependencies")]
  jsonlite::write_json(json, pkg_file, pretty = TRUE, auto_unbox = TRUE)
}
invisible(lapply(Sys.glob("inst/lib/*/package.json"), remove_dev_dependencies))

# Get BS4/BS3 versions (for bootstraplib::bootstrap() versioning)
version_bs4 <- jsonlite::fromJSON("inst/lib/bootstrap/package.json")$version
version_bs3 <- jsonlite::fromJSON("inst/lib/bootstrap-sass/package.json")$version
usethis::use_data(version_bs4, version_bs3, internal = TRUE, overwrite = TRUE)

# Create the LICENSE file
LICENSE <- c(
  "The bootstraplib package as a whole is distributed under MIT.",
  "",
  "The bootstraplib package includes other open source software components.",
  "The following is a list of these components (full copies of the license",
  "agreements used by these components are included below):",
  "",
  "- Bootstrap, https://github.com/twbs/bootstrap",
  "- bootstrap-colorpicker, https://github.com/itsjavi/bootstrap-colorpicker",
  "- Bootswatch, https://github.com/thomaspark/bootswatch",
  "- popper.js, https://github.com/popperjs/popper-core",
  rep("", 2),
  readLines("inst/lib/bootstrap/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootstrap-colorpicker/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootswatch/LICENSE"),
  rep("", 2),
  readLines("https://raw.githubusercontent.com/popperjs/popper-core/master/LICENSE.md")
)
writeLines(LICENSE, "LICENSE")
