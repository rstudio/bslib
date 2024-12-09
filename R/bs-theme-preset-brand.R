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

  sass_bundle(
    "base" = bs_preset_bundle(brand_preset$preset),
    "brand_base" = switch_version(
      brand_preset$version,
      five = sass_layer_file(
        system_file("brand", "bs5", "_brand-yml.scss", package = "bslib")
      ),
      default = list()
    ),
    "brand" = sass_layer(
      defaults = list2(
        !!!brand_color_palette$defaults
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