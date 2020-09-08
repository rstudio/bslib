library(sass)

if (Sys.which("yarn") == "") {
  stop("The yarn CLI must be installed and in your PATH")
}

withr::with_dir("inst", system("yarn install"))


unlink("inst/lib", recursive = TRUE)
file.rename("inst/node_modules/", "inst/lib/")



# ----------------------------------------------------------------------
# Add known vendor prefixes to bootstrap.scss (since we don't want
# to rely on a node run-time to prefix after compilation)
# https://github.com/twbs/bootstrap/blob/d438f3/package.json#L30
# ----------------------------------------------------------------------

scss_files <- dir(
  "inst/lib/bootstrap/scss",
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
  readLines("inst/lib/bootstrap/dist/css/bootstrap.css")
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
unlink("inst/lib/popper.js/dist/umd", recursive = TRUE)
unlink("inst/lib/popper.js/dist/esm", recursive = TRUE)

# Avoiding bootstrap's distributed CSS saves us another 1.5 Mb
unlink("inst/lib/bootstrap/dist/css", recursive = TRUE)

# For now we're just using the main JS bundle
unlink("inst/lib/bootstrap/js", recursive = TRUE)
file.remove(file.path(
  "inst/lib/bootstrap/dist/js",
  c("bootstrap.js", "bootstrap.js.map", "bootstrap.min.js", "bootstrap.min.js.map")
))

# Each Bootswatch theme bundles Bootstrap
file.remove(c(
  Sys.glob("inst/lib/bootswatch/dist/*/bootstrap.css"),
  Sys.glob("inst/lib/bootswatch/dist/*/bootstrap.min.css")
))

# To fully support Bootstrap+Bootswatch 3 and 4, we need to bundle
# multiple versions of Bootswatch...this downloads Bootswatch 3
tmp_dir <- tempdir()
withr::with_dir(tmp_dir, system("yarn add bootswatch@3.4.1"))
source <- file.path(tmp_dir, "node_modules", "bootswatch")
target <- "inst/lib/bootswatch3"
if (!file.exists(target)) dir.create(target)
file.rename(source, target)

# Again, Bootswatch loves to bundle Bootstrap with each theme
file.remove(c(
  Sys.glob("inst/lib/bootswatch3/*/bootstrap.css"),
  Sys.glob("inst/lib/bootswatch3/*/bootstrap.min.css"),
  Sys.glob("inst/lib/bootswatch3/*/thumbnail.png"),
  # I don't think we'll need less files
  Sys.glob("inst/lib/bootswatch3/*/*.less")
))

# Bootswatch is quite bloated
unlink("inst/lib/bootswatch3/docs", recursive = TRUE)
unlink("inst/lib/bootswatch3/.github", recursive = TRUE)
# we already got fonts via tools/download_fonts.R
unlink("inst/lib/bootswatch3/fonts", recursive = TRUE)


withr::with_dir(
  "inst/lib/bootstrap-accessibility-plugin", {
    # Remove everything but the source
    unlink(setdiff(dir(), c("src", "plugins", "LICENSE.md")), recursive = TRUE)
    # The source of the accessibility plugins wants to utilize these compass
    # mixins via a run-time compass dependency...instead of bringing in all of
    # compass we'll just manually bring in the file that we need as niether of
    # these projects are likely to change anytime soon
    dir.create("src/sass/compass/css3", recursive = TRUE)
    base_url <- "https://raw.githubusercontent.com/Compass/compass/stable/core/stylesheets/compass"
    download.file(
      file.path(base_url, c("_support.scss", "css3/_transition.scss")),
      file.path("src/sass/compass", c("_support.scss", "css3/_transition.scss"))
    )
    # Fix the ill-defined import
    txt <- readLines("src/sass/compass/css3/_transition.scss")
    txt <- sub('@import "compass/support"', '@import "../support"', txt)
    writeLines(txt, "src/sass/compass/css3/_transition.scss")
  }
)


# Reduce bootstrap-colorpicker as well
file.rename("inst/lib/bootstrap-colorpicker/dist/css/", "inst/lib/bootstrap-colorpicker/css/")
file.rename("inst/lib/bootstrap-colorpicker/dist/js/", "inst/lib/bootstrap-colorpicker/js/")
unlink("inst/lib/bootstrap-colorpicker/node_modules/", recursive = TRUE)
unlink("inst/lib/bootstrap-colorpicker/src/", recursive = TRUE)
unlink("inst/lib/bootstrap-colorpicker/logo.png")

unlink("inst/lib/jquery/", recursive = TRUE)

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
  "- Bootstrap Accessibility Plugin, https://github.com/paypal/bootstrap-accessibility-plugin",
  "- bootstrap-colorpicker, https://github.com/itsjavi/bootstrap-colorpicker",
  "- Bootswatch, https://github.com/thomaspark/bootswatch",
  "- popper.js, https://github.com/popperjs/popper-core",
  rep("", 2),
  readLines("inst/lib/bootstrap/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootstrap-accessibility-plugin/LICENSE.md"),
  rep("", 2),
  readLines("inst/lib/bootstrap-colorpicker/LICENSE"),
  rep("", 2),
  readLines("inst/lib/bootswatch/LICENSE"),
  rep("", 2),
  readLines("https://raw.githubusercontent.com/popperjs/popper-core/master/LICENSE.md")
)
writeLines(LICENSE, "LICENSE")


# Apply any patches to source
patch_dir <- rprojroot::find_package_root_file("tools/patches")
for (patch in list.files(patch_dir, full.names = TRUE)) {
  tryCatch(
    {
      message(sprintf("Applying %s", basename(patch)))
      system(sprintf("git apply '%s'", patch))
    },
    error = function(e) quit(save = "no", status = 1)
  )
}

