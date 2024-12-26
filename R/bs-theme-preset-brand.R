# "brand" and "preset" interact in a few ways that need to be reconciled.
# Ultimately, we want three layers:
#
# 1. The base Bootstrap styles, by version. E.g. Bootstrap 5
# 2. The `preset` styles, which are one layer above and adjust the base
#    Bootstrap with the preset defaults E.g. "shiny" (bslib) or "flatly" (Bootswatch)
# 3. The `brand` styles, which can be seen as the final layer of default styles.
#    These styles set Bootstrap variables to adjust the `preset` theme in the
#    direction of the brand's color palette and typography.
#
# The `preset` and `version` can be specified in two ways with `brand`:
#
# 1. Directly via `bs_theme()`:
#    `bs_theme(preset = "shiny", version = 5, brand = TRUE)`.
#
# 2. As part of the `brand` definition:
#    `bs_theme(brand = list(defaults = list(shiny = list(theme = list(preset = "flatly")))))`
#
# So the order of operations is:
#
# 1. Read `brand`, if necessary.
# 2. If `bs_theme()` provides guidance for `version` and `theme`, use those preferences.
# 3. If not, inspect `brand` for guidance.
# 4. Finally, use our own defaults.
#
# Importantly we need to separately read `brand` and then resolve the preset and
# then resolve the brand bundle.

bs_brand_bundle <- function(brand, version = version_default()) {
  brand <- brand_resolve(brand)
  
  if (is.null(brand)) {
    return()
  }

  brand_fonts <- brand_sass_fonts(brand)
  brand_color_palette <- brand_sass_color_palette(brand)
  brand_color <- brand_sass_color(brand)
  brand_defaults <- brand_sass_defaults_bootstrap(brand)
  brand_typography <- brand_sass_typography(brand)

  if (version <= 4) {
    rlang::warn(sprintf(
      "Branded theming works best with Bootstrap v5, some features may not work as expected for Bootstrap v%s.",
      version
    ))
  }

  sass_bundle(
    "brand_base" = switch_version(
      version,
      five = sass_layer_file(
        system_file("brand", "bs5", "_brand-yml.scss", package = "bslib")
      ),
      default = list()
    ),
    "brand_defaults" = brand_defaults$layer,
    "brand" = sass_layer(
      defaults = list2(
        "//* ---- brand.color.palette ---- *//",
        !!!brand_color_palette$defaults,
        "//* ---- brand.defaults ---- *//",
        !!!brand_defaults$defaults,
        "//* ---- brand.color ---- *//",
        !!!brand_color$defaults,
        "//* ---- brand.typography ---- *//",
        !!!brand_fonts$defaults,
        !!!brand_typography$defaults,
      ),
      rules = list2(
        brand_color_palette$rules,
        !!!brand_fonts$rules
      )
    )
  )
}

brand_resolve <- function(brand, ...) {
  UseMethod("brand_resolve")
}

#' @export
brand_resolve.list <- function(brand, ...) {
  brand <- as_brand_yml(brand)
  brand_resolve(brand, ...)
}

#' @export
`brand_resolve.NULL` <- function(brand, ...) {
  brand <- tryCatch(
    read_brand_yml(NULL),
    error = function(err) {
      # Couldn't find _brand.yml but we're not going to error
      NULL
    }
  )
  if (is.null(brand)) return(NULL)
  brand_resolve(brand, ...) # future compat if we add anything to the ...
}

#' @export
brand_resolve.logical <- function(brand, ...) {
  if (identical(brand, FALSE)) {
    return(NULL)
  }
  brand <- read_brand_yml(NULL)
  brand_resolve(brand, ...) # future compat if we add anything to the ...
}

#' @export
brand_resolve.character <- function(brand, ...) {
  brand <- read_brand_yml(brand)
  brand_resolve(brand, ...)
}

#' @export
brand_resolve.brand_yml <- function(brand, ...) {
  brand
}

brand_resolve_preset <- function(brand, preset = NULL, version = NULL) {
  version_resolved <- 
    version %||%
    b_get(brand, "defaults", "shiny", "theme", "version") %||%
    b_get(brand, "defaults", "bootstrap", "version") %||%
    version_default()

  preset_resolved <- 
    preset %||%
    b_get(brand, "defaults", "shiny", "theme", "preset") %||%
    switch_version(version_resolved, five = "shiny", default = "bootstrap")

  resolve_bs_preset(preset_resolved, version = version_resolved)
}

# Brand Sass -------------------------------------------------------------------
brand_sass_color_palette <- function(brand) {
  palette <- b_get(brand, "color", "palette")

  if (is.null(palette)) {
    return(list(defaults = list(), rules = list()))
  }

  # Resolve internal references in colors
  palette <- lapply(
    rlang::set_names(names(palette)),
    b_get_color,
    brand = brand
  )

  defaults <- palette
  defaults <- lapply(defaults, paste, "!default")
  names(defaults) <- sprintf("brand-%s", names(defaults))

  for (color in intersect(names(palette), bootstrap_colors)) {
    defaults[color] <- sprintf("$brand-%s !default", color)
  }

  css_vars <- palette
  names(css_vars) <- sprintf("--brand-%s", names(css_vars))
  rules <- sprintf(":root { %s }", css(!!!css_vars))

  list(
    defaults = defaults,
    rules = rules
  )
}

bootstrap_colors <- c(
  "white",
  "black",
  "blue",
  "indigo",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan"
)

brand_sass_color <- function(brand) {
  # Create brand Sass variables and set related Bootstrap Sass vars
  # brand.color.primary = "#007bff"
  # ==> $brand_color_primary: #007bff !default;
  # ==> $primary: $brand_color_primary !default;

  colors <- b_get(brand, "color") %||% list()
  colors$palette <- NULL

  if (length(colors) == 0) {
    return(list())
  }

  # Resolve internal references in colors
  colors <- lapply(rlang::set_names(names(colors)), b_get_color, brand = brand)

  defaults <- list()
  for (thm_name in names(colors)) {
    brand_color_var <- sprintf("brand_color_%s", thm_name)
    defaults[[brand_color_var]] <- paste(colors[[thm_name]], "!default")
  }

  list(defaults = defaults)
}

brand_sass_typography <- function(brand) {
  # Creates a dictionary of Sass variables for typography settings defined in
  # the `brand` object. These are used to set brand Sass variables in the format
  # `$brand_typography_{field}_{prop}`.
  typography <- b_get(brand, "typography")

  if (is.null(typography)) {
    return(list(defaults = list()))
  }

  defaults <- list()

  for (field in names(typography)) {
    if (field == "fonts") {
      next
    }

    prop <- typography[[field]]
    for (prop_key in names(prop)) {
      prop_value <- prop[[prop_key]]
      if (field == "base" && prop_key == "size") {
        prop_value <- maybe_convert_font_size_to_rem(prop_value)
      } else if (prop_key %in% c("color", "background-color")) {
        prop_value <- b_get_color(brand, prop_value)
      }
      field <- gsub("-", "_", field)
      prop_key <- gsub("-", "_", prop_key)
      typo_sass_var <- paste("brand_typography", field, prop_key, sep = "_")
      defaults[[typo_sass_var]] <- paste(prop_value, "!default")
    }
  }

  list(defaults = defaults)
}

brand_sass_fonts <- function(brand) {
  fonts <- b_get(brand, "typography", "fonts")

  if (is.null(fonts)) {
    return(list(defaults = list(), rules = list()))
  }

  defaults <- list()
  rules <- list()

  for (font in fonts) {
    var_name <- sprintf(
      "brand-font-%s",
      gsub("[^a-z0-9-]+", "-", tolower(font$family))
    )

    font_obj <- switch(
      font$source,
      google = sass::font_google(
        family = font$family,
        wght = brand_remap_font_weight(font$weight) %||%
          seq(100, 900, by = 100),
        ital = c("normal" = 0, "italic" = 1)[font$style],
        display = font$display %||% "auto"
      ),
      bunny = brand_font_bunny(
        family = font$family,
        weight = font$weight,
        style = font$style,
        display = font$display
      ),
      file = brand_font_file(
        family = font$family,
        files = font$files,
        brand_root = dirname(brand$path)
      ),
      system = NULL,
      abort(sprintf("Unknown font source '%s'.", font$source))
    )

    if (!is.null(font_obj)) {
      defaults[[var_name]] <- font_obj
      rules <- c(
        rules,
        sprintf(".brand-font-%s { font-family: $%s; }", var_name, var_name)
      )
    }
  }

  list(defaults = defaults, rules = rules)
}

brand_font_bunny <- function(
  family,
  weight = NULL,
  style = NULL,
  display = NULL
) {
  if (!is_installed("utils")) {
    abort("The {utils} package is required.")
  }

  weight <- brand_remap_font_weight(weight) %||% seq(100, 900, 100)

  style <- style %||% c("normal", "italic")
  style <- rlang::arg_match(
    style,
    values = c("normal", "italic"),
    multiple = TRUE
  )

  display <- display %||% "auto"
  display <- rlang::arg_match(
    display,
    values = c("swap", "auto", "block", "fallback", "optional"),
    error_arg = "display"
  )

  if (!is.null(weight)) {
    stopifnot(is.character(weight) || is.numeric(weight))
    weight <- sort(weight)
  }

  weight_list <- as.character(weight)
  style_map <- c(normal = "", italic = "i")
  ital <- sort(style_map[style])

  values <- character(0)
  if (length(weight_list) > 0 && length(ital) > 0) {
    # 400,700,400i,700i
    values <- as.vector(outer(weight_list, ital, paste0))
  } else if (length(weight_list) > 0) {
    values <- weight_list
  } else if (length(ital) > 0) {
    values <- ifelse(ital == "", "regular", "italic")
  }

  family_values <- ""
  if (length(values) > 0) {
    family_values <- paste0(":", paste(values, collapse = ","))
  }

  params <- list(
    family = paste0(family, family_values),
    display = display
  )

  url_base <- "https://fonts.bunny.net/css"
  url_query <- paste0(
    names(params),
    "=",
    utils::URLencode(unlist(params)),
    collapse = "&"
  )

  url <- paste0(url_base, "?", url_query)

  font_link(family, url)
}

brand_font_file <- function(family, files, brand_root = getwd()) {
  if (!is_installed("tools")) {
    abort("The {tools} package is required.")
  }

  if (!(is.list(files) && length(files) > 0)) {
    abort(
      c(
        sprintf("Font family '%s' must have one or more associated files.", family),
        "i" = "Use `source: system` for fonts that are provided by the user's system."
      )
    )
  }

  font_collection_files <- lapply(files, function(file) {
    if (is.null(file$path)) {
      abort(
        sprintf("All font `files` for font family '%s' must have a `path`.", family)
      )
    }

    font_data_uri <- if (grepl("^https?://", file$path)) {
      font_path <- file$path
    } else {
      font_path <- file.path(brand_root, file$path)
      base64enc::dataURI(
        file = font_path,
        mime = mime::guess_type(font_path)
      )
    }
    font_type <- switch(
      tools::file_ext(tolower(font_path)),
      # otc = "collection",
      # ttc = "collection",
      # eot = "embedded-opentype",
      otf = "opentype",
      ttf = "truetype",
      # svg = "svg",
      # svgz = "svg",
      woff = "woff",
      woff2 = "woff2",
      abort(
        c(
          sprintf("Invalid font type: %s", font_path),
          "i" = "Font must be `.ttf`, `.otf`, `.woff` or `.woff2`."
        )
      )
    )

    sass::font_face(
      family = family,
      src = sprintf("url(%s) format(%s)", font_data_uri, font_type),
      weight = brand_remap_font_weight(file$weight),
      style = file$style,
      display = "auto"
    )
  })

  sass::font_collection(!!!font_collection_files)
}

brand_remap_font_weight <- function(x) {
  if (is.null(x)) return()

  for (i in seq_along(x)) {
    if (x[[i]] %in% names(brand_font_weight_map)) {
      x[[i]] <- brand_font_weight_map[x[[i]]]
    }
  }

  x
}

brand_font_weight_map <- c(
  "thin" = 100,
  "extra-light" = 200,
  "ultra-light" = 200,
  "light" = 300,
  "normal" = 400,
  "regular" = 400,
  "medium" = 500,
  "semi-bold" = 600,
  "demi-bold" = 600,
  "bold" = 700,
  "extra-bold" = 800,
  "ultra-bold" = 800,
  "black" = 900
)

#' Convert a font size to rem
#'
#' Some frameworks, like Bootstrap expect base font size to be in `rem`. This
#' function converts `em`, `%`, `px`, `pt` to `rem`:
#'
#' 1. `em` is directly replace with `rem`.
#' 2. `1%` is `0.01rem`, e.g. `90%` becomes `0.9rem`.
#' 3. `16px` is `1rem`, e.g. `18px` becomes `1.125rem`.
#' 4. `12pt` is `1rem`.
#' 5. `0.1666in` is `1rem`.
#' 6. `4.234cm` is `1rem`.
#' 7. `42.3mm` is `1rem`.
#'
#' @noRd
maybe_convert_font_size_to_rem <- function(x) {
  x_og <- as.character(x)
  split_result <- split_css_value_and_unit(x)
  value <- split_result$value
  unit <- split_result$unit

  if (unit %in% c("rem", "em")) {
    return(paste0(value, "rem"))
  }

  scale <- list(
    "%" = 100,
    "px" = 16,
    "pt" = 12,
    "in" = 16 / 96, # 96 px/inch
    "cm" = 16 / 96 * 2.54, # inch -> cm
    "mm" = 16 / 96 * 25.4 # cm -> mm
  )

  if (unit %in% names(scale)) {
    return(paste0(as.numeric(value) / scale[[unit]], "rem"))
  }

  if (unit == "") {
    unit <- "unknown"
  }

  abort(
    sprintf(
      "Could not convert font size '%s' from %s units to a relative unit.",
      x_og,
      unit
    )
  )
}

split_css_value_and_unit <- function(x) {
  x <- trimws(x)
  pattern <- "^(-?[0-9]*\\.?[0-9]+)\\s*([a-z%]*)$"
  match <- regexec(pattern, x)
  result <- regmatches(x, match)[[1]]

  if (length(result) != 3) {
    abort(paste0("Invalid CSS value format: ", x))
  }

  return(list(value = result[2], unit = result[3]))
}

brand_validate_bootstrap_defaults <- function(
  defaults,
  source = "brand.defaults.bootstrap.defaults"
) {
  if (is.null(defaults)) {
    return(list())
  }

  if (!is.list(defaults)) {
    abort("Invalid brand defaults in `", source, "`, must be a list.")
  }

  if (length(defaults) == 0) {
    return(list())
  }

  if (!all(nzchar(names2(defaults)))) {
    abort("Invalid brand defaults in `", source, "`, all values must be named.")
  }

  is_scalar <- function(v) {
    if (is.null(v)) return(TRUE)
    rlang::is_scalar_character(v) ||
      rlang::is_scalar_logical(v) ||
      rlang::is_scalar_double(v) ||
      rlang::is_scalar_integerish(v)
  }

  good <- vapply(defaults, is_scalar, logical(1))

  if (!all(good)) {
    abort(
      sprintf(
        "Invalid brand defaults in `%s`, all values must be scalar: %s",
        source,
        defaults[!good][1]
      )
    )
  }

  return(defaults)
}

brand_sass_defaults_bootstrap <- function(brand) {
  bootstrap <- b_get(brand, "defaults", "bootstrap")
  shiny <- b_get(brand, "defaults", "shiny", "theme")

  if (is.null(bootstrap) && is.null(shiny))
    return(
      list(
        defaults = list(),
        layer = list()
      )
    )

  shiny <- shiny %||% list()
  shiny_defaults <- brand_validate_bootstrap_defaults(
    shiny$defaults,
    "brand.defaults.shiny.theme"
  )

  bootstrap <- bootstrap %||% list()
  bootstrap_defaults <- brand_validate_bootstrap_defaults(bootstrap$defaults)

  defaults <- list2(!!!bootstrap_defaults, !!!shiny_defaults)
  defaults <- lapply(defaults, function(x) {
    if (is.null(x)) {
      x <- "null"
    } else if (is.logical(x)) {
      x <- tolower(as.character(x))
    }
    paste(x, "!default")
  })

  list(
    defaults = defaults,
    layer = sass_layer(
      functions = c(bootstrap$functions, shiny$functions),
      mixins = c(bootstrap$mixins, shiny$mixins),
      rules = c(bootstrap$rules, shiny$rules)
    )
  )
}

# Read Brand -------------------------------------------------------------------

read_brand_yml <- function(path = NULL) {
  path <- find_project_brand_yml(path)

  rlang::check_installed("yaml")
  brand <- yaml::read_yaml(path)

  brand <- as_brand_yml(brand)
  brand$path <- path

  brand
}

as_brand_yml <- function(brand = list()) {
  stopifnot(is.list(brand))

  # Normalize brand internals !! MINIMAL VALIDATION !!
  brand <- brand_normalize_meta(brand)
  brand <- brand_normalize_color(brand)

  class(brand) <- "brand_yml"
  brand
}

brand_normalize_meta <- function(brand) {
  if (!b_has(brand, "meta")) {
    return(brand)
  }

  if (b_has_string(brand, "meta", "name")) {
    name <- brand[["meta"]][["name"]]
    brand[["meta"]][["name"]] <- list(short = name, full = name)
  }

  if (b_has_string(brand, "meta", "link")) {
    brand[["meta"]][["link"]] <- list(
      home = brand[["meta"]][["link"]]
    )
  }

  brand
}

brand_normalize_color <- function(brand) {
  if (!b_has(brand, "color")) {
    return(brand)
  }

  # Pull out colors and resolve each color from original brand
  theme <- b_get(brand, "color")

  for (field in names(b_get(brand, "color"))) {
    if (field == "palette") {
      theme[[field]] <- lapply(
        rlang::set_names(names(theme[[field]])),
        b_get_color,
        brand = brand
      )
    } else {
      theme[[field]] <- b_get_color(brand, field)
    }
  }

  # Then replace brand.color with resolved colors
  brand[["color"]] <- theme
  brand
}

b_get_color <- function(brand, key) {
  if (!b_has(brand, "color")) {
    return(key)
  }

  theme_colors <- brand[["color"]]
  theme_colors$palette <- NULL
  palette <- brand[["color"]][["palette"]] %||% list()

  key_og <- key
  visited <- c()

  cycle <- function(key) {
    path <- c(visited, key)
    if (length(path) > 10) {
      path <- c(path[1:2], "...", path[-(1:(length(path) - 2))])
    }
    paste(path, collapse = " -> ")
  }

  assert_no_cycles <- function(key) {
    if (key %in% visited) {
      abort(
        c(
          sprintf(
            "Cyclic references detected in `brand.color` for color '%s'.",
            key_og
          ),
          "i" = cycle(key)
        )
      )
    }
    visited <<- c(visited, key)
  }

  p_key <- function(key) paste0("palette.", key)
  value <- ""
  i <- 0
  while (value != key) {
    i <- i + 1
    if (i > 100) {
      abort(
        c(
          sprintf(
            "Max recursion limit reached while trying to resolve color '%s' using `brand.color`.",
            key_og
          ),
          i = cycle(key)
        )
      )
    }

    in_theme <- key %in% names(theme_colors)
    in_theme_unseen <- in_theme && !key %in% visited
    in_pal <- key %in% names(palette)

    if (in_pal && !in_theme_unseen) {
      # Prioritize palette if theme was already visited
      assert_no_cycles(p_key(key))
      key <- palette[[key]]
    } else if (in_theme) {
      assert_no_cycles(key)
      key <- theme_colors[[key]]
    } else {
      value <- key
    }
  }

  return(value)
}

# Brand utilities --------------------------------------------------------------

b_has <- function(brand, ...) {
  x <- brand

  for (f in c(...)) {
    if (is.null(x[[f]])) return(FALSE)
    x <- x[[f]]
  }

  TRUE
}

b_get <- function(brand, ...) {
  if (!b_has(brand, ...)) {
    return(NULL)
  }

  brand[[c(...)]]
}

b_has_string <- function(brand, ...) {
  if (!b_has(brand, ...)) return(FALSE)  
  rlang::is_string(brand[[c(...)]])
}

b_has_list <- function(brand, ...) {
  if (!b_has(brand, ...)) return(FALSE)
  rlang::is_list(brand[[c(...)]])
}

# Find _brand.yml --------------------------------------------------------------

find_project_brand_yml <- function(path = NULL) {
  path <- path %||% getwd()
  path <- normalizePath(path, mustWork = FALSE)

  ext <- path_ext(path)
  if (ext %in% c("yml", "yaml")) {
    return(path)
  } 
  
  if (nzchar(ext)) {
    path <- dirname(path)
  }

  find_project_file(
    filename = c("_brand.yml", "_brand.yaml"),
    dir = path,
    subdir = c("brand", "_brand")
  )
}

find_project_file <- function(filename, dir, subdir = character()) {
  dir_og <- dir
  max_parents <- 20

  while (dir != dirname(dir) && max_parents > 0) {
    for (fname in filename) {
      file_path <- file.path(dir, fname)
      if (path_is_file(file_path)) {
        return(file_path)
      }
    }

    for (sub in subdir) {
      for (fname in filename) {
        file_path <- file.path(dir, sub, fname)
        if (path_is_file(file_path)) {
          return(file_path)
        }
      }
    }

    dir <- dirname(dir)
    max_parents <- max_parents - 1
  }

  abort(
    sprintf(
      "Could not find %s in %s or its parents.",
      paste(filename, collapse = ", "),
      dir_og
    )
  )
}

path_is_file <- function(path) {
  # The file exists and is a file
  file.exists(path) && !dir.exists(path)  
}

path_ext <- function(path) {
  # Same as tools::file_ext()  
  pos <- regexpr("\\.([[:alnum:]]+)$", path)
  ifelse(pos > -1L, substring(path, pos + 1L), "")
}
