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
  # `brand` is already resolved in `bs_theme()`

  if (is.null(brand)) {
    return()
  }

  rlang::check_installed("brand.yml")

  brand_fonts <- brand.yml::brand_sass_fonts(brand)
  brand_color_palette <- brand.yml::brand_sass_color_palette(brand)
  brand_color <- brand.yml::brand_sass_color(brand)
  brand_defaults <- brand.yml::brand_sass_defaults_bootstrap(brand)
  brand_typography <- brand.yml::brand_sass_typography(brand)

  if (version <= 4) {
    rlang::warn(
      sprintf(
        "Branded theming works best with Bootstrap v5. Some features may not work as expected for Bootstrap v%s.",
        version
      )
    )
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
  rlang::check_installed("brand.yml")
  brand.yml::as_brand_yml(brand)
}

#' @export
`brand_resolve.NULL` <- function(brand, ...) {
  rlang::check_installed("brand.yml")
  brand <- tryCatch(
    brand.yml::read_brand_yml(NULL),
    brand_yml_not_found = function(err) {
      # Couldn't find _brand.yml but we're not going to error
      NULL
    }
  )
  if (is.null(brand)) {
    return(NULL)
  }
  brand_resolve(brand, ...)
}

#' @export
brand_resolve.logical <- function(brand, ...) {
  if (identical(brand, FALSE)) {
    return(NULL)
  }
  rlang::check_installed("brand.yml")
  brand.yml::read_brand_yml(NULL)
}

#' @export
brand_resolve.character <- function(brand, ...) {
  rlang::check_installed("brand.yml")
  brand.yml::read_brand_yml(brand)
}

#' @export
brand_resolve.brand_yml <- function(brand, ...) {
  brand
}

brand_resolve_preset <- function(brand, preset = NULL, version = NULL) {
  rlang::check_installed("brand.yml")

  version_resolved <-
    version %||%
    brand.yml::brand_pluck(brand, "defaults", "shiny", "theme", "version") %||%
    brand.yml::brand_pluck(brand, "defaults", "bootstrap", "version") %||%
    version_default()

  preset_resolved <-
    preset %||%
    brand.yml::brand_pluck(brand, "defaults", "shiny", "theme", "preset") %||%
    switch_version(version_resolved, five = "shiny", default = "bootstrap")

  resolve_bs_preset(preset_resolved, version = version_resolved)
}
