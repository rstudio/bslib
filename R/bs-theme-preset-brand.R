bs_preset_brand_bundle <- function(brand_preset = NULL) {
  # The plan of attach
  # 1. Read brand.yml from path
  # 2. Pull out direct brand-related vars
  # 3. Pull out `brand.defaults` that affect the bootstrap theme
  # 4. Create the base theme bundle or default to using `shiny`
  # 5. Apply base theme, brand sass file, and pulled out brand vars/rules
  # 6. Create the final Sass bundle

  if (is.null(brand_preset)) {
    brand_preset <- brand_resolve_preset()
  }

  brand_color_palette <- brand_sass_color_palette(brand_preset$brand)
  brand_color_defaults <- brand_sass_color(brand_preset$brand)
  brand_defaults <- brand_sass_defaults_bootstrap(brand_preset$brand)
  brand_typography_defaults <- brand_sass_typography(brand_preset$brand)

  sass_bundle(
    "base" = bs_preset_bundle(brand_preset$preset),
    "brand_base" = switch_version(
      brand_preset$version,
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
        !!!brand_color_defaults,
        "//* ---- brand.typography ---- *//",
        !!!brand_typography_defaults,
      ),
      rules = list(
        brand_color_palette$rules
      )
    )
  )
}

brand_resolve_preset <- function(path = NULL, version = NULL) {
  brand <- read_brand_yml(path)

  base_version <- 
    version %||% 
    b_get(brand, "defaults", "shiny", "theme", "version") %||% 
    version_default()
  
  base_theme_preset <- 
    b_get(brand, "defaults", "shiny", "theme", "preset") %||% 
    switch_version(base_version, five = "shiny", default = "bootstrap")

  if (!rlang::is_string(base_theme_preset) || base_theme_preset == "brand") {
    abort("brand.defaults.shiny.theme.preset must be a string and cannot be 'brand'.")
  }
  
  base_preset <- resolve_bs_preset(base_theme_preset, version = base_version)

  new_bs_preset(
    type = "brand",
    name = b_get(brand, "meta", "name", "short"),
    version = base_preset$version,
    brand = brand,
    preset = base_preset
  )
}

# Brand Sass -------------------------------------------------------------------
brand_sass_color_palette <- function(brand) {
  palette <- b_get(brand, "color", "palette")

  if (is.null(palette)) {
    return(list(defaults = list(), rules = list()))
  }

  # Resolve internal references in colors
  palette <- lapply(rlang::set_names(names(palette)), b_get_color, brand = brand)

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
    defaults[[brand_color_var]] = paste(colors[[thm_name]], "!default")
    # Currently, brand.color fields are directly named after Bootstrap vars. If
    # that changes, we'd need to use a map here. These values can't be set to
    # `null !default` because they're used by maps in the Bootstrap mixins layer
    # and cause errors if a color is `null` rather than non-existent.
    defaults[[thm_name]] = sprintf("$%s !default", brand_color_var)
  }

  defaults
}

brand_sass_typography <- function(brand) {
  # Creates a dictionary of Sass variables for typography settings defined in
  # the `brand` object. These are used to set brand Sass variables in the format
  # `$brand_typography_{field}_{prop}`.
  typography <- b_get(brand, "typography")

  if (is.null(typography)) {
    return(list())
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

  defaults
}

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
  
  if (unit == "rem") {
    return(x)
  }
  if (unit == "em") {
    return(paste0(value, "rem"))
  }
  
  scale <- list(
    "%" = 100,
    "px" = 16,
    "pt" = 12,
    "in" = 96 / 16,  # 96 px/inch
    "cm" = 96 / 16 * 2.54,  # inch -> cm
    "mm" = 16 / 96 * 25.4  # cm -> mm
  )
  
  if (unit %in% names(scale)) {
    return(paste0(as.numeric(value) / scale[[unit]], "rem"))
  }

  if (unit == "") {
    unit <- "unknown"
  }
  
  stop(paste0("Could not convert font size '", x_og, "' from ", unit, " units to a relative unit."))
}

split_css_value_and_unit <- function(x) {
  pattern <- "^(-?[0-9]*\\.?[0-9]+)\\s*([a-z%]*)$"
  match <- regexec(pattern, x)
  result <- regmatches(x, match)[[1]]
  
  if (length(result) != 3) {
    stop(paste0("Invalid CSS value format: ", x))
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
    stop("Invalid brand defaults in `", source, "`, must be a list.")
  }

  if (length(defaults) == 0) {
    return(list())
  }
  
  if (!all(nzchar(names2(defaults)))) {
    stop("Invalid brand defaults in `", source, "`, all values must be named.")
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
    stop(
      "Invalid brand defaults in `", source, "` all values must be scalar: ",
      defaults[!good][1]
    )
  }
  
  return(defaults)
}

brand_sass_defaults_bootstrap <- function(brand) {
  bootstrap <- b_get(brand, "defaults", "bootstrap")
  shiny <- b_get(brand, "defaults", "shiny", "theme")

  if (is.null(bootstrap) && is.null(shiny)) return(
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

  # Normalize brand internals !! DOES NOT VALIDATE !!
  brand <- brand_normalize_meta(brand)

  class(brand) <- "brand_yml"

  brand
}

#' @export
print.brand_yml <- function(x, ..., max_depth = 2) {
  if (is_installed("lobstr")) {
    lobstr::tree(x, max_depth = max_depth, ...)
  } else {
    str(x, max.level = max_depth, ...)
  }
  invisible(x)
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

b_get_color <- function(brand, key) {
  if (!b_has(brand, "color")) {
    return(key)
  }

  theme_colors <- brand[["color"]]
  theme_colors$palette <- NULL
  palette <- brand[["color"]][["palette"]] %||% list()

  value <- ""
  while (value != key) {
    if (key %in% names(theme_colors)) {
      key <- theme_colors[[key]]
    } else if (key %in% names(palette)) {
      key <- palette[[key]]
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
  } else if (nzchar(ext)) {
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
  file.access(path, 0L) == 0L && !path_is_dir(path)
}

path_is_dir <- function(path) {
  file.info(path, extra_cols = FALSE)[["isdir"]]
}

path_ext <- function(path) {
    pos <- regexpr("\\.([[:alnum:]]+)$", path)
    ifelse(pos > -1L, substring(path, pos + 1L), "")
}