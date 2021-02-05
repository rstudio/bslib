#!/usr/bin/env Rscript
library(sass)
library(rprojroot)


if (!identical(getwd(), find_package_root_file())) {
  stop("This script must be run from the top directory of the bslib package")
}

if (Sys.which("yarn") == "") {
  stop("The yarn CLI must be installed and in your PATH")
}

# only install the direct deps
withr::with_dir("inst", system("yarn install --production"))


unlink("inst/lib", recursive = TRUE)
file.rename("inst/node_modules/", "inst/lib/")

# ----------------------------------------------------------------------
# Get rid of peer dependencies that we don't need
# ----------------------------------------------------------------------

# Not necessary dependences brought in by bootwswatch (at least in v4.5.2)
unlink("inst/lib/http-parser-js", recursive = TRUE)
unlink("inst/lib/safe-buffer", recursive = TRUE)
unlink("inst/lib/websocket-driver", recursive = TRUE)
unlink("inst/lib/websocket-extensions", recursive = TRUE)

# jquery comes in via jquerylib (R package)
unlink("inst/lib/jquery/", recursive = TRUE)

# bootstrap.bundle.min.js includes popper (but not jQuery)
# https://getbootstrap.com/docs/4.4/getting-started/introduction/#js
unlink("inst/lib/popper.js", recursive = TRUE)


# ----------------------------------------------------------------------
# Add known vendor prefixes to all scss files since we don't want
# to rely on a node run-time to prefix after compilation
# https://github.com/twbs/bootstrap/blob/d438f3/package.json#L30
# ----------------------------------------------------------------------

scss_files <- dir("inst", pattern = "\\.scss$", recursive = TRUE, full.names = TRUE)
# These libs should already have prefixes in their source
# TODO: add test(s) that we aren't missing vendor prefixes
scss_files <- scss_files[!grepl("(^inst/lib/bootstrap-sass)|(^inst/bs3compat)|(^inst/themer)", scss_files)]

scss_src <- lapply(scss_files, readLines)

add_property_prefixes <- function(src, property, ok_values = NULL, vendors = c("-webkit-", "-moz-", "-ms-", "-o-")) {
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
    src[[i]] <- paste0(
      leading_ws,
      c("", vendors),
      sub("^\\s+", "", prop),
      collapse = "\n"
    )
  }
  src
}

# Unconditionally prefix the following CSS properties
needs_prefix <- c(
  "appearance", "user-select", "backdrop-filter",
  "backface-visibility", "touch-action",
  "animation-duration"
)
for (prop in needs_prefix) {
  scss_src <- lapply(scss_src, add_property_prefixes, prop)
}

scss_src <- lapply(scss_src, add_property_prefixes, "color-adjust", vendors = "-webkit-print-")

# phantomjs 2.1.1 needs webkit vendor prefix on flex properties to work correctly
flex_props <- c(
  "flex-direction", "flex-wrap", "flex-flow",  "justify-content",
  "align-items", "align-content", "order", "flex-grow", "flex-shrink",
  "flex-basis", "flex", "align-self"
)
for (prop in flex_props) {
  scss_src <- lapply(scss_src, add_property_prefixes, prop, vendors = "-webkit-")
}

# Conditionally prefix text-decoration if its not CSS2 compliant
# https://www.w3.org/TR/CSS2/text.html#lining-striking-props
# https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
# https://caniuse.com/#search=text-decoration
scss_src <- lapply(
  scss_src, add_property_prefixes, "text-decoration",
  ok_values = c("none", "underline", "overline", "line-through", "blink", "inherit")
)


add_value_prefixes <- function(src, value, vendors = c("-webkit-", "-moz-", "-ms-", "-o-")) {
  pattern <- paste0("^\\s*[^/]+:\\s*", value, "\\s*(!important)?\\s*;")
  idx <- grep(pattern, src)
  for (i in idx) {
    prop_val <- strsplit(src[[i]], ":\\s*")[[1]]
    src[[i]] <- paste0(
      prop_val[1], ": ", c("", vendors), prop_val[2],
      collapse = "\n"
    )
  }
  src
}

# https://caniuse.com/?search=min-content
scss_src <- lapply(scss_src, add_value_prefixes, "min-content")

# phantomjs 2.1.1 needs `display: -webkit-flex` to work properly
scss_src <- lapply(scss_src, add_value_prefixes, "flex", vendors = "-webkit-")

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
  readLines("inst/lib/bootstrap/dist/css/bootstrap.css", warn = FALSE)
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
    "Use either add_property_prefixes() to add prefixes or whitelist them ",
    "(if they're not needed for modern browsers): ",
    "'", paste(collapse = "', '", unknown_prefixes), "'.",
    call. = FALSE
  )
}


# ----------------------------------------------------------------------
# Now, get rid of files that we don't need to bundle with the package
# ----------------------------------------------------------------------


# Avoiding bootstrap's distributed CSS saves us another 1.5 Mb
unlink("inst/lib/bootstrap/dist/css", recursive = TRUE)

# For now we're just using the minified JS bundle
unlink("inst/lib/bootstrap/js", recursive = TRUE)

js_folder <- "inst/lib/bootstrap/dist/js"
file.remove(
  file.path(
    js_folder,
    setdiff(
      dir(js_folder),
      c("bootstrap.bundle.min.js", "bootstrap.bundle.min.js.map")
    )
  )
)

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

# Downsize Bootswatch 3
unlink("inst/lib/bootswatch3/docs", recursive = TRUE)
unlink("inst/lib/bootswatch3/.github", recursive = TRUE)
# we already got fonts via tools/download_fonts.R
unlink("inst/lib/bootswatch3/fonts", recursive = TRUE)

# Downsize bootstrap-accessibility
withr::with_dir("inst/lib/bootstrap-accessibility-plugin", {
  unlink(setdiff(dir(), c("src", "plugins", "LICENSE.md", "package.json")), recursive = TRUE)
})

# Downsize bootstrap-colorpicker
file.rename("inst/lib/bootstrap-colorpicker/dist/css/", "inst/lib/bootstrap-colorpicker/css/")
file.rename("inst/lib/bootstrap-colorpicker/dist/js/", "inst/lib/bootstrap-colorpicker/js/")
unlink("inst/lib/bootstrap-colorpicker/node_modules/", recursive = TRUE)
unlink("inst/lib/bootstrap-colorpicker/dist/", recursive = TRUE)
unlink("inst/lib/bootstrap-colorpicker/src/", recursive = TRUE)
unlink("inst/lib/bootstrap-colorpicker/logo.png")

# GitHub reports security issues of devDependencies, but that's irrelevant to us
remove_dev_dependencies <- function(pkg_file) {
  if (!file.exists(pkg_file)) return()
  json <- jsonlite::fromJSON(pkg_file)
  json <- json[setdiff(names(json), "devDependencies")]
  jsonlite::write_json(json, pkg_file, pretty = TRUE, auto_unbox = TRUE)
}
invisible(lapply(Sys.glob("inst/lib/*/package.json"), remove_dev_dependencies))

# Get BS4/BS3 versions (for bslib::bs_dependencies() versioning)
version_bs4 <- jsonlite::fromJSON("inst/lib/bootstrap/package.json")$version
version_bs3 <- jsonlite::fromJSON("inst/lib/bootstrap-sass/package.json")$version
version_accessibility <- jsonlite::fromJSON("inst/lib/bootstrap-accessibility-plugin/package.json")$version
writeLines(
  c(
    '# DO NOT EDIT',
    '# This file is auto-generated by tools/yarn_install.R',
    paste0('version_bs4 <- ', deparse(version_bs4)),
    paste0('version_bs3 <- ',  deparse(version_bs3)),
    paste0('version_accessibility <- ',  deparse(version_accessibility))
  ),
  "R/versions.R"
)


# ----------------------------------------------------------------------
# Rename files to shorter names
# ----------------------------------------------------------------------

rename_info <- c(
  "bs" = "bootstrap",
  "bs-a11y-p" = "bootstrap-accessibility-plugin",
  "bs-colorpicker" = "bootstrap-colorpicker",
  "bs-sass" = "bootstrap-sass",
  "bsw" = "bootswatch",
  "bsw3" = "bootswatch3"
)
file.rename(
  from = file.path("inst", "lib", unname(rename_info)),
  to = file.path("inst", "lib", names(rename_info))
)

# not used
unlink(file.path("inst", "lib", ".yarn-integrity"))

# ----------------------------------------------------------------------
# Apply any patches to source
# ----------------------------------------------------------------------

patch_files <- list.files(
  find_package_root_file("tools/patches"),
  full.names = TRUE
)

for (patch in patch_files) {
  tryCatch(
    {
      message(sprintf("Applying %s", basename(patch)))
      rej_pre <- dir(pattern = "\\.rej$", recursive = TRUE)
      system(sprintf("git apply --reject --whitespace=fix '%s'", patch))
      rej_post <- dir(pattern = "\\.rej$", recursive = TRUE)
      if (length(rej_post) > length(rej_pre)) {
        stop(
          "Running `git apply --reject` generated `.rej` files.\n",
          "Please fix the relevant conflicts inside ", patch, "\n",
          "An 'easy' way to do this is to first `git add` the new source changes, ",
          "then manually make the relevant changes from the patch file,",
          "then `git diff` to get the relevant diff output and update the patch diff with the new diff."
        )
      }
    },
    error = function(e) {
      stop(conditionMessage(e))
      quit(save = "no", status = 1)
    }
  )
}

# Tracking changes in solar isn't so important since we've basically
# re-implemented it using a proper color system
writeLines(
  sass::as_sass(list(
    "white" = "#092B36 !default",
    "gray-100" = "#173741 !default",
    "gray-200" = "#25434B !default",
    "gray-300" = "#324E56 !default",
    "gray-400" = "#405A61 !default",
    "gray-500" = "#4E666B !default",
    "gray-600" = "#5C7276 !default",
    "gray-700" = "#6A7E81 !default",
    "gray-800" = "#77898C !default",
    "gray-900" = "#859596 !default",
    "black" = "#93A1A1 !default",
    "blue" = "#b58900 !default",
    "indigo" = "#6610f2 !default",
    "purple" = "#6f42c1 !default",
    "pink" = "#e83e8c !default",
    "red" = "#d33682 !default",
    "orange" = "#fd7e14 !default",
    "yellow" = "#cb4b16 !default",
    "green" = "#2aa198 !default",
    "teal" = "#20c997 !default",
    "cyan" = "#268bd2 !default",
    "enable-gradients" = "true !default",
    "secondary" = "$gray-800 !default",
    # Darker green and lighter green than `$black` and `$white`
    "color-contrast-dark" = "#031014 !default",
    "color-contrast-light" = "#BBD0D0 !default"
  )),
  "inst/lib/bsw/dist/solar/_variables.scss"
)
writeLines(
  c(
    '$web-font-path: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" !default;',
    '@import url($web-font-path);'
  ),
  "inst/lib/bsw/dist/solar/_bootswatch.scss"
)

# ----------------------------------------------------------------------
# Apply minification to patched files
# ----------------------------------------------------------------------

withr::with_dir("inst", {
  local({
    # install all deps
    system("yarn install")
    # remove node modules
    on.exit({
      unlink("node_modules", recursive = TRUE)
    }, add = TRUE)

    bslib_plugin_paths <- file.path(
      "lib", "bs-a11y-p", "plugins", "js", c(
        "bootstrap-accessibility.js"
      ))

    for (unminified_file in c(
      bslib_plugin_paths
    )) {
      message("Minifying ", basename(unminified_file))
      cmd <- paste0(
        "yarn parcel",
        " build ", unminified_file,
        " --no-source-maps",
        " --no-cache",
        " --out-dir ", dirname(unminified_file),
        " --out-file ", sub(".js", ".min.js", fixed = TRUE, basename(unminified_file))
      )

      system(cmd)
    }

  })

})


# ----------------------------------------------------------------------
# Precompile Bootstrap CSS
# ----------------------------------------------------------------------

# This generates precompiled builds of Bootstrap's css. It would be nice to do
# it at binary package build time, but I couldn't get that to work, using either
# src/install.libs.R (because the bslib functions used in this script
# aren't available yet), or by putting this code directly in the R/ directory
# (because the R/ files are evaluated only after the inst directory is copied
# over).
library(bslib)

precompiled_dir <- find_package_root_file("inst/css-precompiled")
unlink(precompiled_dir, recursive = TRUE)
dir.create(precompiled_dir, recursive = TRUE)

lapply(versions(), function(version) {
  res <- bs_theme_dependencies(bs_theme(version), precompiled = FALSE, cache = NULL)
  # Extract the Bootstrap dependency object (as opposed to, say, jQuery)
  bs_dep <- Filter(res, f = function(x) { identical(x$name, "bootstrap") })[[1]]

  tmp_css <- file.path(bs_dep$src$file, bs_dep$stylesheet)
  dest_dir <- file.path(precompiled_dir, version)
  if (!dir.exists(dest_dir)) {
    dir.create(dest_dir)
  }
  file.copy(tmp_css, dest_dir)
})


# ----------------------------------------------------------------------
# Cleanup
# ----------------------------------------------------------------------
withr::with_dir("inst", {
  unlink("yarn.lock")
})
