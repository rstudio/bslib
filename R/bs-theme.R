#' Create a Bootstrap theme
#'
#' @description
#'
#' Creates a Bootstrap theme object which can be:
#'
#' * Used in any HTML page powered by [shiny::bootstrapLib()] (e.g.,
#'   [shiny::fluidPage()], [shiny::bootstrapPage()], etc).
#' * Used in any output format powered by [rmarkdown::html_document()]
#'   (or [rmarkdown::html_document_base()]).
#' * Used more generally in any [htmltools::tags] via [bs_theme_dependencies()].
#'
#' These functions (i.e., `bs_theme()` or `bs_theme_update()`) allow you to do
#' the following common Bootstrap customization(s):
#'
#' * Choose a (major) Bootstrap version.
#' * Choose a [Bootswatch theme](https://bootswatch.com) (optional).
#' * Customize main colors and fonts via explicitly named arguments (e.g.,
#'   `bg`, `fg`, `primary`, etc).
#' * Customize other, lower-level, Bootstrap Sass variable defaults via `...`
#'   * See all [Bootstrap 4 variables](https://github.com/rstudio/bootstraplib/blob/master/inst/lib/bootstrap/scss/_variables.scss)
#'   * See all [Bootstrap 3 variables](https://github.com/rstudio/bootstraplib/blob/master/inst/lib/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss)
#'
#' For less common theming customization(s), you can modify theme objects to:
#'
#' * Add additional Sass/CSS rules (see [bs_add_rules()] and [sass_partial()]).
#' * Leverage (new) Sass functions and mixins in those rules (see
#' [bs_add_declarations()])
#'
#' These lower-level theming tools build on the concept of a
#' [sass::sass_layer()]. To learn more, [see
#' here](https://rstudio.github.io/sass/articles/sass.html#composable-sass).
#'
#' @section Colors:
#'
#'  Colors may be provided in any format that [htmltools::parseCssColors()] can
#'  understand. To control the vast majority of the ('grayscale') color
#'  defaults, specify both the `fg` (foreground) and `bg` (background) colors.
#'  The `primary` and `secondary` theme colors are also useful for accenting the
#'  main grayscale colors in things like hyperlinks, tabset panels, and buttons.
#'
#' @section Fonts:
#'
#'  Use `base_font`, `code_font`, and `heading_font` to control the main
#'  typefaces. These arguments set new defaults for the relevant `font-family`
#'  CSS properties **which does not guarantee the relevant fonts are available
#'  in the users system**. To ensure the fonts are actually available, use a
#'  package like **gfonts** (if Google Fonts) to download and provide the font
#'  files with the HTML site.
#'
#'  Each `*_font` argument accepts a character vector where each element of that
#'  vector can a single unquoted font family name, a single quoted font family
#'  name, or a comma-separated list of font families (with individual font
#'  family names quoted as necessary). The comma-separated list is useful for
#'  specifying "fallback" font families (e.g., generic CSS families like
#'  `sans-serif` or `serif`) when font(s) may be unavailable.
#'
#'  For example, each example below is valid:
#'
#'  ```
#'  # Single, unquoted
#'  bs_theme(base_font = "Source Sans Pro")
#'  # Single, quoted
#'  bs_theme(base_font = "'Source Sans Pro'")
#'  # Multiple, quoted
#'  bs_theme(base_font = "'Source Sans Pro', sans-serif")
#'  # Combining all of the above
#'  bs_theme(
#'    base_font = c("Open Sans", "'Source Sans Pro'",
#'    "'Helvetica Neue', Helvetica, sans-serif")
#'  )
#'  ```
#'
#'  But the following is _technically_ not valid because `Source Sans Pro` is
#'  not quoted (the resulting CSS will contain `font-family: Source Sans Pro,
#'  sans-serif;` which is technically out of the CSS specifications but may
#'  still work in some modern browsers).
#'
#'  ```
#'  bs_theme(base_font = "Source Sans Pro, sans-serif")
#'  ```
#'
#' @param version The major version of Bootstrap to use. A value of `'4+3'`
#'   means Bootstrap 4, but with additional CSS/JS to support BS3 style markup
#'   in BS4. Other supported versions include 3 and 4.
#' @param bootswatch The name of a bootswatch theme (see [bootswatch_themes()]
#'   for possible values).
#' @param ... arguments passed along to [bs_add_variables()].
#' @param bg A color string for the background.
#' @param fg A color string for the foreground.
#' @param primary A color to be used for hyperlinks, to indicate primary/default
#'   actions, and to show active selection state in some Bootstrap components.
#'   Generally a bold, saturated color that contrasts with the theme's base
#'   colors.
#' @param secondary A color for components and messages that don't need to stand
#'   out. (Not supported in Bootstrap 3.)
#' @param success A color for messages that indicate an operation has succeeded.
#'   Typically green.
#' @param info A color for messages that are informative but not critical.
#'   Typically a shade of blue-green.
#' @param warning A color for warning messages. Typically yellow.
#' @param danger A color for errors. Typically red.
#' @param base_font The default typeface.
#' @param code_font The typeface to be used for code. Be sure this is monospace!
#' @param heading_font The typeface to be used for heading elements.
#'
#' @references \url{https://getbootstrap.com/docs/4.4/getting-started/theming/}
#' @references \url{https://rstudio.github.io/sass/}
#' @seealso [bs_add_variables()], [bs_theme_preview()],
#'   [bs_theme_dependencies()], [bs_global_set()]
#' @examples
#'
#' theme <- bs_theme(
#'   # Controls the default grayscale palette
#'   bg = "#202123", fg = "#B8BCC2",
#'   # Controls the accent (e.g., hyperlink, button, etc) colors
#'   primary = "#EA80FC", secondary = "#48DAC6",
#'   base_font = c("Grandstander", "sans-serif"),
#'   code_font = c("Courier", "monospace"),
#'   heading_font = "'Helvetica Neue', Helvetica, sans-serif",
#'   # Can also add lower-level customization
#'   "input-border-color" = "#EA80FC"
#' )
#' if (interactive()) {
#'   bs_theme_preview(theme)
#' }
#'
#' # Lower-level bs_add_*() functions allow you to work more
#' # directly with the underlying Sass code
#' theme <- theme %>%
#'   bs_add_variables("my-class-color" = "red") %>%
#'   bs_add_rules(".my-class { color: $my-class-color }")
#'
#' @export
bs_theme <- function(version = version_default(), bootswatch = NULL, ...,
                     bg = NULL, fg = NULL, primary = NULL, secondary = NULL,
                     success = NULL, info = NULL, warning = NULL, danger = NULL,
                     base_font = NULL, code_font = NULL, heading_font = NULL) {
  version <- version_resolve(version)
  bootswatch <- bootswatch_theme_resolve(bootswatch, version)
  theme <- bs_add_bundles(
    bs_theme_init(),
    bootstrap_layer(version),
    if (identical(version, "4+3")) bs3compat_layer(),
    bootswatch_layer(bootswatch, version)
  )
  bs_theme_update(
    theme, ...,
    bg = bg, fg = fg,
    primary = primary,
    secondary = secondary,
    success = success,
    info = info,
    warning = warning,
    danger = danger,
    base_font = base_font,
    code_font = code_font,
    heading_font = heading_font
  )
}

#' @rdname bs_theme
#' @param theme a [bs_theme()] object.
#' @export
bs_theme_update <- function(theme, ..., bg = NULL, fg = NULL,
                            primary = NULL, secondary = NULL, success = NULL,
                            info = NULL, warning = NULL, danger = NULL,
                            base_font = NULL, code_font = NULL, heading_font = NULL) {
  assert_bs_theme(theme)
  # See R/bs-theme-update.R for the implementation of these
  theme <- bs_base_colors(theme, bg = bg, fg = fg)
  theme <- bs_accent_colors(
    theme, primary = primary, secondary = secondary, success = success,
    info = info, warning = warning, danger = danger
  )
  theme <- bs_fonts(theme, base = base_font, code = code_font, heading = heading_font)
  bs_add_variables(theme, ...)
}

#' @rdname bs_global_theme
#' @export
bs_global_theme_update <- function(..., bg = NULL, fg = NULL,
                                   primary = NULL,  secondary = NULL, success = NULL,
                                   info = NULL, warning = NULL, danger = NULL,
                                   base_font = NULL, code_font = NULL, heading_font = NULL) {
  theme <- assert_global_theme("bs_theme_global_update()")
  bs_global_set(bs_theme_update(
    theme, ...,
    bg = bg, fg = fg,
    primary = primary,
    secondary = secondary,
    success = success,
    info = info,
    warning = warning,
    danger = danger,
    base_font = base_font,
    code_font = code_font,
    heading_font = heading_font
  ))
}

#' @rdname bs_theme
#' @param x an object.
#' @export
is_bs_theme <- function(x) {
  inherits(x, "bs_theme")
}

bs_theme_init <- function() {
  add_class(sass_layer(), "bs_theme")
}

assert_bs_theme <- function(theme) {
  if (!is_bs_theme(theme)) {
    stop("`theme` must be a `bs_theme()` object")
  }
  invisible(theme)
}


# -----------------------------------------------------------------
# Core Bootstrap layer
# -----------------------------------------------------------------

bootstrap_layer <- function(version) {
  if (version %in% c("4", "4+3")) {
    # Should match https://github.com/twbs/bootstrap/blob/master/scss/bootstrap.scss
    bs4_layer <- bs_sass_file_bundle(
      version = version,
      name = "bootstrap",
      defaults = c("functions", "variables"),
      declarations = "mixins",
      rules = c(
        "root", "reboot", "type", "images", "code", "grid", "tables",
        "forms", "buttons", "transitions", "dropdown", "button-group",
        "input-group", "custom-forms", "nav", "navbar", "card",
        "breadcrumb", "pagination", "badge", "jumbotron", "alert",
        "progress", "media", "list-group", "close", "toasts", "modal",
        "tooltip", "popover", "carousel", "spinners", "utilities", "print"
      )
    )

    # Additions to BS4 that are always included (i.e., not a part of compatibility)
    bs4_additions <- sass_layer(
      # Don't impose such a jarring change to the base font-size
      defaults = "$font-size-base: 0.875rem !default;",
      # Pandoc uses align attribute to align content but BS4 styles take precedence...
      # we may want to consider adopting this more generally in "strict" BS4 mode as well
      rules = list(
        ".table th[align=left] { text-align: left; }",
        ".table th[align=right] { text-align: right; }",
        ".table th[align=center] { text-align: center; }"
      )
    )

    return(sass_bundle(
      bs4_layer,
      !!bs_sass_bundle_version("bootstrap", version, subname = "additions") := bs4_additions
    ))
  }

  if (version %in% "3") {

    glyphicon <- sass_layer(
      defaults = list("icon-font-path" = "'glyphicon-fonts/'"),
      file_attachments = c(
        "glyphicon-fonts" = lib_file("bootstrap-sass", "assets", "fonts", "bootstrap")
      )
    )

    # Should match https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/_bootstrap.scss
    bs3_core <- bs_sass_file_bundle(
      name = "bootstrap",
      version = 3,
      defaults = "variables",
      declarations = "mixins",
      rules = c(
        "normalize", "print", "glyphicons", "scaffolding", "type", "code", "grid",
        "tables", "forms", "buttons", "component-animations", "dropdowns", "button-groups",
        "input-groups", "navs", "navbar", "breadcrumbs", "pagination", "pager", "labels",
        "badges", "jumbotron", "thumbnails", "alerts", "progress-bars", "media",
        "list-group", "panels", "responsive-embed", "wells", "close", "modals",
        "tooltip", "popovers", "carousel", "utilities", "responsive-utilities"
      )
    )

    return(sass_bundle(
      bs3_core,
      !!bs_sass_bundle_version("bootstrap", version, subname = "accessiblity") := bs3_accessibility_layer(),
      glyphicon = glyphicon
    ))
  }

  stop("Unknown Bootstrap version: ", version, call. = FALSE)
}



bootstrap_javascript_map <- function(version) {
  if (version %in% c("4", "4+3")) {
    return(lib_file(
      "bootstrap", "dist", "js", "bootstrap.bundle.min.js.map"
    ))
  }
  if (version %in% "3") {
    return(NULL)
  }

  stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
}
bootstrap_javascript <- function(version) {
  if (version %in% c("4", "4+3")) {
    return(lib_file(
      "bootstrap", "dist", "js", "bootstrap.bundle.min.js"
    ))
  }
  if (version %in% "3") {
    return(lib_file(
      "bootstrap-sass", "assets", "javascripts", "bootstrap.min.js"
    ))
  }

  stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
}

# -----------------------------------------------------------------
# BS3 compatibility layer
# -----------------------------------------------------------------

bs3compat_layer <- function() {
  sass_layer(
    defaults = list(
      sass_file(system_file("bs3compat", "_defaults.scss", package = "bootstraplib"))
    ),
    declarations = list(
      sass_file(system_file("bs3compat", "_declarations.scss", package = "bootstraplib"))
    ),
    rules = list(
      sass_file(system_file("bs3compat", "_rules.scss", package = "bootstraplib"))
    ),
    # Gyliphicon font files
    file_attachments = c(
      fonts = lib_file("bootstrap-sass", "assets", "fonts")
    ),
    html_deps = list(
      htmltools::htmlDependency(
        "bs3compat", packageVersion("bootstraplib"),
        package = "bootstraplib",
        src = "bs3compat/js",
        script = c("tabs.js", "bs3compat.js")
      )
    )
  )
}

# -----------------------------------------------------------------
# BS3 accessibility layer
# -----------------------------------------------------------------

bs3_accessibility_layer <- function() {
  sass_layer(
    rules = list(
      sass_file(
        system_file(
          "lib", "bootstrap-accessibility-plugin",
          "src", "sass", "bootstrap-accessibility.scss",
          package = "bootstraplib"
        )
      )
    ),
    html_deps = list(
      htmltools::htmlDependency(
        "bootstrap-accessibility", version_accessibility,
        package = "bootstraplib",
        src = "lib/bootstrap-accessibility-plugin",
        script = "plugins/js/bootstrap-accessibility.min.js"
      )
    )
  )
}

# -----------------------------------------------------------------
# Bootswatch layer
# -----------------------------------------------------------------

bootswatch_layer <- function(bootswatch, version) {

  # Exit early if this is vanilla Bootstrap
  if (!bootswatch %in% bootswatch_themes(version)) return(NULL)

  # Attach local font files, if necessary
  font_css <- file.path(bootswatch_dist(version), bootswatch, "font.css")
  attachments <- if (file.exists(font_css)) {
    c(
      "font.css" = font_css,
      fonts = system_file("fonts", package = "bootstraplib")
    )
  }

  bootswatch_core <- sass_layer(
    file_attachments = attachments,
    defaults = list(
      # Use local fonts (this path is relative to the bootstrap HTML dependency dir)
      '$web-font-path: "font.css" !default;',
      bootswatch_sass_file(bootswatch, "variables", version)
    ),
    rules = list(
      bootswatch_sass_file(bootswatch, "bootswatch", version),
      # For some reason sketchy sets .dropdown-menu{overflow: hidden}
      # but this prevents .dropdown-submenu from working properly
      # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
      if (identical(bootswatch, "sketchy")) as_sass(".dropdown-menu{ overflow: inherit; }") else ""
    )
  )
  bundle <- sass_bundle(
    !!bs_sass_bundle_version("bootswatch", bootswatch) := bootswatch_core
  )

  if (version %in% "4+3") {
    bundle <- sass_bundle(
      bundle,
      !!bs_sass_bundle_version("bootswatch", bootswatch, subname = "bs3_compat_navbar") := sass_layer_bs3compat_navbar(bootswatch)
    )
  }

  bundle
}


# Mappings from BS3 navbar classes to BS4
sass_layer_bs3compat_navbar <- function(bootswatch) {
  # Do nothing if this isn't a Bootswatch 3 theme
  if (!bootswatch %in% c("materia", "litera", bootswatch_themes(3))) return("")

  nav_classes <- switch(
    bootswatch,
    # https://bootswatch.com/cerulean/
    # https://bootswatch.com/3/cerulean/
    cerulean = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    cosmo = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    cyborg = list(
      default = c("dark", "dark"),
      inverse = c("dark", "secondary")
    ),
    darkly = list(
      default = c("dark", "primary"),
      inverse = c("light", "light")
    ),
    flatly = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    journal = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    lumen = list(
      # Inline style is actually used for default's bg-color
      default = c("light", "light"),
      inverse = c("light", "light")
    ),
    # i.e., materia
    paper = ,
    materia = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    readable = ,
    litera = list(
      # The default styling is totally different here, but I don't see a
      # easy and consistent way to bring in the old styling
      default = c("light", "light"),
      inverse = c("light", "dark")
    ),
    sandstone = list(
      default = c("dark", "primary"),
      # technically speaking this background should be green, but dark looks
      # better/more consistent with other stuff on the page
      inverse = c("dark", "dark")
    ),
    simplex = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    slate = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    spacelab = list(
      default = c("light", "light"),
      inverse = c("dark", "primary")
    ),
    superhero = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    united = list(
      default = c("dark", "primary"),
      inverse = c("dark", "dark")
    ),
    yeti = list(
      default = c("dark", "dark"),
      inverse = c("dark", "primary")
    ),
    stop("Didn't recognize Bootswatch 3 theme: ", bootswatch, call. = FALSE)
  )

  bundle <- sass_layer(
    defaults = list(
      sprintf('$navbar-default-type: %s !default;', nav_classes$default[1]),
      sprintf('$navbar-default-bg: %s !default;', nav_classes$default[2]),
      sprintf('$navbar-inverse-type: %s !default;', nav_classes$inverse[1]),
      sprintf('$navbar-inverse-bg: %s !default;', nav_classes$inverse[2])
    )
  )

  if (identical(bootswatch, "lumen")) {
    bundle <- sass_bundle(bundle, ".navbar.navbar-default {background-color: #f8f8f8 !important;}")
  }

  bundle
}
