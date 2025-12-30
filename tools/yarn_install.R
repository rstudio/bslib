#!/usr/bin/env Rscript
library(sass)
library(rprojroot)
library(brio)
library(withr)

if (!identical(getwd(), find_package_root_file())) {
  stop("This script must be run from the top directory of the bslib package")
}

if (Sys.which("yarn") == "") {
  stop("The yarn CLI must be installed and in your PATH")
}

# Build _our_ JS assets (e.g., accordion component)
system("yarn install")
system("yarn build")

# only install the direct deps
with_dir("inst", system("yarn install --production"))

unlink("inst/lib", recursive = TRUE)
file.rename("inst/node_modules/", "inst/lib/")

# not used
unlink("inst/lib/.yarn-integrity")

# jquery comes in via jquerylib (R package)
unlink("inst/lib/jquery", recursive = TRUE)

# bootstrap is a peer dependency of bs-colorpicker?
unlink("inst/lib/bootstrap", recursive = TRUE)

# bootstrap.bundle.min.js includes popper (but not jQuery)
# https://getbootstrap.com/docs/4.4/getting-started/introduction/#js
unlink("inst/lib/popper.js", recursive = TRUE)

# ----------------------------------------------------------------------
# Add known vendor prefixes to all scss files since we don't want
# to rely on a node run-time to prefix after compilation
# https://github.com/twbs/bootstrap/blob/d438f3/package.json#L30
# ----------------------------------------------------------------------
scss_files <- dir(
  "inst",
  pattern = "\\.scss$",
  recursive = TRUE,
  full.names = TRUE
)
# These libs should already have prefixes in their source
# TODO: add test(s) that we aren't missing vendor prefixes
scss_files <- scss_files[
  !grepl(
    "^inst/(lib/bs3|bs3compat|themer|components|bslib-scss|builtin|examples)",
    scss_files
  )
]

scss_src <- lapply(scss_files, readLines)

add_property_prefixes <- function(
  src,
  property,
  ok_values = NULL,
  vendors = c("-webkit-", "-moz-", "-ms-", "-o-")
) {
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

# Unconditionally prefix the following CSS properties for all vendors
needs_prefix <- c(
  "appearance",
  "user-select",
  "backdrop-filter",
  "backface-visibility",
  "touch-action",
  "animation-duration"
)
for (prop in needs_prefix) {
  scss_src <- lapply(scss_src, add_property_prefixes, prop)
}

# Only add webkit prefix for BS5+ since other vendors aren't really relevant anymore
for (prop in c('mask-image', 'mask-size', 'mask-position')) {
  scss_src <- lapply(
    scss_src,
    add_property_prefixes,
    prop,
    vendors = "-webkit-"
  )
}

# Print specific vendor prefixes
scss_src <- lapply(
  scss_src,
  add_property_prefixes,
  "color-adjust",
  vendors = "-webkit-print-"
)

# phantomjs 2.1.1 needs webkit vendor prefix on flex properties to work correctly
flex_props <- c(
  "flex-direction",
  "flex-wrap",
  "flex-flow",
  "justify-content",
  "align-items",
  "align-content",
  "order",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "flex",
  "align-self"
)
for (prop in flex_props) {
  scss_src <- lapply(
    scss_src,
    add_property_prefixes,
    prop,
    vendors = "-webkit-"
  )
}

# Conditionally prefix text-decoration if its not CSS2 compliant
# https://www.w3.org/TR/CSS2/text.html#lining-striking-props
# https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
# https://caniuse.com/#search=text-decoration
scss_src <- lapply(
  scss_src,
  add_property_prefixes,
  "text-decoration",
  ok_values = c(
    "none",
    "underline",
    "overline",
    "line-through",
    "blink",
    "inherit"
  )
)

add_value_prefixes <- function(
  src,
  value,
  vendors = c("-webkit-", "-moz-", "-ms-", "-o-")
) {
  pattern <- paste0("^\\s*[^/]+:\\s*", value, "\\s*(!important)?\\s*;")
  idx <- grep(pattern, src)
  for (i in idx) {
    prop_val <- strsplit(src[[i]], ":\\s*")[[1]]
    src[[i]] <- paste0(
      prop_val[1],
      ": ",
      c("", vendors),
      prop_val[2],
      collapse = "\n"
    )
  }
  src
}

# https://caniuse.com/?search=min-content
scss_src <- lapply(scss_src, add_value_prefixes, "min-content")
scss_src <- lapply(scss_src, add_value_prefixes, "max-content")

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
    pattern <- sprintf("-%s-([^:|;| |\\|,)]+)", vendor)
    prefixes <- regmatches(css, regexec(pattern, css))
    lapply(prefixes, function(x) if (length(x) > 1) x[2] else NULL)
  })
  unique(unlist(prefixes, recursive = TRUE))
}

# TODO: do for each bootstrap?
src_prefixes <- find_prefixed_css(unlist(scss_src))
dist_prefixes <- find_prefixed_css(
  c(
    readLines("inst/lib/bs4/dist/css/bootstrap.css"),
    readLines("inst/lib/bs5/dist/css/bootstrap.css")
  )
)
auto_prefixes <- setdiff(dist_prefixes, src_prefixes)

whitelist <- c(
  # https://caniuse.com/#feat=flexbox
  "flex",
  "inline-flex",
  "inline-flexbox",
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
  "placeholder",
  "input-placeholder",
  # https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
  "text-decoration-skip-ink",
  # webkit prefix doesn't seem necessary? And Bootstrap docs warn about IE...
  # https://caniuse.com/#search=sticky
  "sticky",
  # Already applied conditional prefixing
  "text-decoration",
  "text-decoration-color",
  # IE11 technically needs a prefix, but this is just for floating labels
  # and I'm lazy https://caniuse.com/?search=placeholder-shown
  "placeholder-shown",
  # False positive?
  "margin-end"
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
    "'",
    paste(collapse = "', '", unknown_prefixes),
    "'.",
    call. = FALSE
  )
}

# ----------------------------------------------------------------------
# Now, get rid of files that we don't need to bundle with the package
# ----------------------------------------------------------------------

with_dir("inst/lib", {
  # Downsize Bootstrap
  for (bs in c("bs5", "bs4")) {
    unlink(file.path(bs, "dist/css"), recursive = TRUE)
    unlink(file.path(bs, "js"), recursive = TRUE)
    js_dist <- file.path(bs, "dist/js")
    non_bundle <- setdiff(
      dir(js_dist),
      c("bootstrap.bundle.min.js", "bootstrap.bundle.min.js.map")
    )
    file.remove(file.path(js_dist, non_bundle))
  }

  # Only keep Bootswatch's Sass source files
  for (bsw in c("bsw5", "bsw4")) {
    file.remove(Sys.glob(file.path(bsw, "dist/*/*.css")))
    file.remove(Sys.glob(file.path(bsw, "dist/*/*.map")))
    unlink("bsw5/docs", recursive = TRUE)
    # Remove hidden files
    unlink(
      dir(bsw, pattern = "^\\.[a-z]+", all.files = TRUE, full.names = TRUE),
      recursive = TRUE
    )
  }
  file.remove(
    c(
      Sys.glob("bsw3/*/bootstrap.css"),
      Sys.glob("bsw3/*/bootstrap.min.css"),
      Sys.glob("bsw3/*/thumbnail.png"),
      Sys.glob("bsw3/*/*.less")
    )
  )
  unlink("bsw3/docs", recursive = TRUE)
  unlink("bsw3/.github", recursive = TRUE)
  unlink("bsw3/fonts", recursive = TRUE) # have fonts via tools/download_fonts.R

  # Downsize bootstrap-accessibility
  with_dir("bs-a11y-p", {
    discard <- setdiff(dir(), c("src", "plugins", "LICENSE.md", "package.json"))
    unlink(discard, recursive = TRUE)
  })

  # Downsize bootstrap-colorpicker
  with_dir("bs-colorpicker", {
    file.rename("dist/css", "css")
    file.rename("dist/js", "js")
    # For the sake of simplicity, a patch is applied to just the
    # non-minified version (and the minified version isn't used)
    unlink(Sys.glob("js/*.min.js"))
    unlink("node_modules", recursive = TRUE)
    unlink("dist", recursive = TRUE)
    unlink("src", recursive = TRUE)
    unlink("logo.png")
  })

  # ----------------------------------------------------------------------
  # Copy prism-code-editor files (selective copy from dist/)
  # The full package is installed as prism-code-editor-full, and we copy
  # only the needed files to prism-code-editor, then remove the full package
  # ----------------------------------------------------------------------
  unlink("prism-code-editor", recursive = TRUE)

  src <- "prism-code-editor-full/dist"
  dest <- "prism-code-editor"

  # Languages to bundle locally for syntax highlighting
  code_editor_bundled_languages <<- c(
    # Data Science
    "r",
    "python",
    "julia",
    "sql",
    # Web/Frontend
    "javascript",
    "typescript",
    "markup",
    "css",
    "scss",
    "sass",
    "json",
    # Markup/Config
    "markdown",
    "yaml",
    "xml",
    "toml",
    "ini",
    # Shell/Infrastructure
    "bash",
    "docker",
    # Extras
    "latex",
    "cpp",
    "rust",
    "diff"
  )

  # Create destination directories
  dir.create(dest, recursive = TRUE)
  dir.create(file.path(dest, "utils"), recursive = TRUE)

  dir.create(file.path(dest, "languages"), recursive = TRUE)
  dir.create(file.path(dest, "prism", "languages"), recursive = TRUE)
  dir.create(file.path(dest, "extensions", "copyButton"), recursive = TRUE)
  dir.create(file.path(dest, "themes"), recursive = TRUE)

  # Copy core files (*.js and *.css from dist root)
  core_files <- c(
    Sys.glob(file.path(src, "*.js")),
    Sys.glob(file.path(src, "*.css"))
  )
  file.copy(core_files, dest)

  # Copy utils
  file.copy(
    Sys.glob(file.path(src, "utils", "*.js")),
    file.path(dest, "utils")
  )

  # Copy languages (only bundled)
  bundled_lang_files <- paste0(code_editor_bundled_languages, ".js")
  file.copy(
    file.path(src, "languages", bundled_lang_files),
    file.path(dest, "languages")
  )

  # Copy prism grammars (only bundled)
  file.copy(
    file.path(src, "prism", "languages", bundled_lang_files),
    file.path(dest, "prism", "languages")
  )

  # Copy extensions
  ext_files <- list.files(
    file.path(src, "extensions"),
    full.names = TRUE,
    recursive = FALSE
  )
  # Copy top-level extension files
  ext_js <- ext_files[grepl("\\.js$", ext_files)]
  file.copy(ext_js, file.path(dest, "extensions"))
  # Copy copyButton extension folder
  file.copy(
    Sys.glob(file.path(src, "extensions", "copyButton", "*")),
    file.path(dest, "extensions", "copyButton")
  )

  # Copy themes
  file.copy(
    Sys.glob(file.path(src, "themes", "*.css")),
    file.path(dest, "themes")
  )

  # Scope theme CSS files to support multiple editors with different themes.
  # Each theme is wrapped with attribute selectors that match the editor's
  # data-theme-light/data-theme-dark attributes, combined with the page's
  # data-bs-theme attribute, using CSS nesting (supported in modern browsers).
  theme_files <- Sys.glob(file.path(dest, "themes", "*.css"))
  for (theme_file in theme_files) {
    theme_name <- sub("\\.css$", "", basename(theme_file))
    css_content <- readLines(theme_file, warn = FALSE)

    # Wrap with scoped selectors using CSS nesting
    scoped_css <- c(
      sprintf(
        "[data-bs-theme=\"light\"] [data-theme-light=\"%s\"], [data-bs-theme=\"light\"][data-theme-light=\"%s\"],",
        theme_name,
        theme_name
      ),
      sprintf(
        "[data-bs-theme=\"dark\"] [data-theme-dark=\"%s\"], [data-bs-theme=\"dark\"][data-theme-dark=\"%s\"] {",
        theme_name,
        theme_name
      ),
      css_content,
      "}"
    )

    writeLines(scoped_css, theme_file)
  }

  # Get version for tracking
  version_prism_code_editor <<- jsonlite::fromJSON(
    "prism-code-editor-full/package.json"
  )$version

  # Remove the full package now that we've copied what we need

  unlink("prism-code-editor-full", recursive = TRUE)

  # GitHub reports security issues of devDependencies, but that's irrelevant to us
  remove_dev_dependencies <- function(pkg_file) {
    if (!file.exists(pkg_file)) {
      return()
    }
    json <- jsonlite::fromJSON(pkg_file)
    json <- json[setdiff(names(json), "devDependencies")]
    jsonlite::write_json(json, pkg_file, pretty = TRUE, auto_unbox = TRUE)
  }
  invisible(lapply(Sys.glob("*/package.json"), remove_dev_dependencies))

  # Get BS4/BS3 versions (for bslib::bs_dependencies() version-ing)
  version_bs5 <- sub(
    "-beta[0-9]+",
    "",
    jsonlite::fromJSON("bs5/package.json")$version
  )
  version_bs4 <- jsonlite::fromJSON("bs4/package.json")$version
  version_bs3 <- jsonlite::fromJSON("bs3/package.json")$version
  version_accessibility <- jsonlite::fromJSON("bs-a11y-p/package.json")$version
})

writeLines(
  c(
    '# Generated by tools/yarn_install.R: do not edit by hand',
    paste0('version_bs5 <- ', deparse(version_bs5)),
    paste0('version_bs4 <- ', deparse(version_bs4)),
    paste0('version_bs3 <- ', deparse(version_bs3)),
    paste0('version_accessibility <- ', deparse(version_accessibility)),
    paste0('version_prism_code_editor <- ', deparse(version_prism_code_editor)),
    paste0(
      'code_editor_bundled_languages <- ',
      deparse1(code_editor_bundled_languages)
    )
  ),
  "R/versions.R"
)

# ----------------------------------------------------------------------
# Apply any patches to source
# ----------------------------------------------------------------------

patch_files <- list.files(
  find_package_root_file("tools/patches"),
  full.names = TRUE
)

rej_pre <- dir(pattern = "\\.rej$", recursive = TRUE)
for (patch in patch_files) {
  message(sprintf("Applying %s", basename(patch)))
  res <- system(sprintf("git apply --reject --whitespace=fix '%s'", patch))
  if (res > 0) stop("Couldn't successfully apply patch: ", patch, call. = FALSE)
}
rej_post <- dir(pattern = "\\.rej$", recursive = TRUE)
if (length(rej_post) > length(rej_pre)) {
  warning(
    "Running `git apply --reject` generated `.rej` files. \n",
    "An 'easy' way to do this is to first `git add` the new source changes, ",
    "then manually make the relevant changes from the patch file,",
    "then `git diff` to get the relevant diff output and update the patch diff with the new diff."
  )
}

# Tracking changes in solar isn't so important since we've basically
# re-implemented it using a proper color system
# TODO: do the same for BS5?
writeLines(
  sass::as_sass(
    list(
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
    )
  ),
  "inst/lib/bsw4/dist/solar/_variables.scss"
)
writeLines(
  c(
    '$web-font-path: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap" !default;',
    '@import url($web-font-path);'
  ),
  "inst/lib/bsw4/dist/solar/_bootswatch.scss"
)

# ----------------------------------------------------------------------
# Apply minification to patched files
# ----------------------------------------------------------------------

with_dir("inst", {
  local({
    # install all deps
    system("yarn install")
    # remove node modules
    on.exit(
      {
        unlink("node_modules", recursive = TRUE)
      },
      add = TRUE
    )

    bslib_plugin_paths <- file.path(
      "lib",
      "bs-a11y-p",
      "plugins",
      "js",
      c(
        "bootstrap-accessibility.js"
      )
    )

    for (unminified_file in c(
      bslib_plugin_paths
    )) {
      message("Minifying ", basename(unminified_file))
      cmd <- paste0(
        "yarn parcel",
        " build ",
        unminified_file,
        " --no-source-maps",
        " --no-cache",
        " --out-dir ",
        dirname(unminified_file),
        " --out-file ",
        sub(".js", ".min.js", fixed = TRUE, basename(unminified_file))
      )

      system(cmd)
    }
  })
})

# Clean up
unlink("inst/yarn.lock")
unlink("inst/node_modules", recursive = TRUE)

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

invisible(
  lapply(versions(), function(version) {
    res <- bs_theme_dependencies(
      bs_theme(version, brand = FALSE),
      precompiled = FALSE,
      sass_options = sass_options(output_style = "compressed"),
      cache = NULL
    )
    # Extract the Bootstrap dependency object (as opposed to, say, jQuery)
    bs_dep <- Filter(res, f = function(x) {
      identical(x$name, "bootstrap")
    })[[1]]

    tmp_css <- file.path(bs_dep$src$file, bs_dep$stylesheet)
    dest_dir <- file.path(precompiled_dir, version)
    if (!dir.exists(dest_dir)) {
      dir.create(dest_dir)
    }
    file.copy(tmp_css, dest_dir)

    # Also save the BS5+ Sass code used to generate the pre-compiled CSS.
    # This is primarily here to help Quarto more easily replicate bs_theme()'s Sass.
    if (version >= 5) {
      theme_sass <- gsub(
        paste0("@import \"", getwd(), "/"),
        "@import \"",
        as_sass(bs_theme(version))
      )
      writeLines(theme_sass, file.path(dest_dir, "bootstrap.scss"))
      # Sanity check that we we can compile by moving file to home dir
      file.copy(file.path(dest_dir, "bootstrap.scss"), "bootstrap.scss")
      on.exit(unlink("bootstrap.scss"), add = TRUE)
      testthat::expect_error(sass(sass_file("bootstrap.scss")), NA)
    }
  })
)
