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
#'   * See all [Bootstrap 4 variables](https://github.com/rstudio/bslib/blob/master/inst/lib/bootstrap/scss/_variables.scss)
#'   * See all [Bootstrap 3 variables](https://github.com/rstudio/bslib/blob/master/inst/lib/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss)
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
#'  CSS properties, but don't necessarily import the relevant font files. To
#'  both set CSS properties _and_ import font files, consider using the various
#'  [font_face()] helpers.
#'
#'  Each `*_font` argument may be collection of character vector(s),
#'  [font_google()](s), [font_link()]s and/or [font_face()](s). Note that a character vector can
#'  have:
#'    * A single unquoted name (e.g., `"Source Sans Pro"`).
#'    * A single quoted name (e.g., `"'Source Sans Pro'"`).
#'    * A comma-separated list of names w/ individual names quoted as necessary.
#'      (e.g. `c("Open Sans", "'Source Sans Pro'", "'Helvetica Neue', Helvetica, sans-serif")`)
#'
#'  Since `font_google(..., local = TRUE)` guarantees that the client has access to
#'  the font family, meaning it's relatively safe to specify just one font
#'  family, for instance:
#'
#'  ```
#'  bs_theme(base_font = font_google("Pacifico", local = TRUE))
#'  ```
#'
#'  However, specifying multiple "fallback" font families is recommended,
#'  especially when relying on remote and/or system fonts being available, for
#'  instance. Fallback fonts are useful not only for handling missing fonts, but
#'  also for handling a Flash of Invisible Text (FOIT) which can be quite
#'  noticeable with remote web fonts on a slow internet connection.
#'
#'  ```
#'  bs_theme(base_font = list(font_google("Pacifico", local = FALSE), "Roboto", "sans-serif")
#'  ````
#'
#' @param version The major version of Bootstrap to use (see [versions()]
#'   for possible values).
#' @param bootswatch The name of a bootswatch theme (see [bootswatch_themes()]
#'   for possible values). When provided to `bs_theme_update()`, any previous
#'   Bootswatch theme is first removed before the new one is applied (use
#'   `bootswatch = "default"` to effectively remove the Bootswatch theme).
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
#' @seealso [bs_add_variables()], [bs_theme_preview()]
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
  theme <- bs_bundle(
    bs_theme_init(version, bootswatch),
    bootstrap_bundle(version),
    bootswatch_bundle(bootswatch, version)
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
bs_theme_update <- function(theme, ..., bootswatch = NULL, bg = NULL, fg = NULL,
                            primary = NULL, secondary = NULL, success = NULL,
                            info = NULL, warning = NULL, danger = NULL,
                            base_font = NULL, code_font = NULL, heading_font = NULL) {
  assert_bs_theme(theme)

  if (!is.null(bootswatch)) {
    old_swatch <- theme_bootswatch(theme)
    # You're only allowed one Bootswatch theme!
    if (length(old_swatch)) {
      theme <- bs_remove(theme, "bootswatch")
      class(theme) <- sub(
        bootswatch_class(old_swatch),
        bootswatch_class(bootswatch),
        class(theme), fixed = TRUE
      )
    }
    if (!identical(bootswatch, "default")) {
      theme <- add_class(theme, bootswatch_class(bootswatch))
      theme <- bs_bundle(theme, bootswatch_bundle(bootswatch, theme_version(theme)))
    }
  }
  # See R/bs-theme-update.R for the implementation of these
  theme <- bs_base_colors(theme, bg = bg, fg = fg)
  theme <- bs_accent_colors(
    theme, primary = primary, secondary = secondary, success = success,
    info = info, warning = warning, danger = danger
  )
  theme <- bs_font_dependencies(theme, base = base_font, code = code_font, heading = heading_font)
  theme <- bs_fonts(theme, base = base_font, code = code_font, heading = heading_font)
  bs_add_variables(theme, ...)
}

#' @rdname bs_global_theme
#' @export
bs_global_theme_update <- function(..., bootswatch = NULL, bg = NULL, fg = NULL,
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

# Start an empty bundle with special classes that
# theme_version() & theme_bootswatch() search for
bs_theme_init <- function(version, bootswatch = NULL) {
  add_class(
    sass_bundle(),
    c(
      bootswatch_class(bootswatch),
      paste0("bs_version_", version),
      "bs_theme"
    )
  )
}

bootswatch_class <- function(bootswatch = NULL) {
  if (is.null(bootswatch)) NULL else paste0("bs_bootswatch_", bootswatch)
}

assert_bs_theme <- function(theme) {
  if (!is_bs_theme(theme)) {
    stop("`theme` must be a `bs_theme()` object")
  }
  invisible(theme)
}
# -----------------------------------------------------------------
# Core Bootstrap bundle
# -----------------------------------------------------------------

bootstrap_bundle <- function(version) {
  switch_version(
    version,
    four = sass_bundle(
      # Don't name this "core" bundle so it can't easily be removed
      sass_layer(
        defaults = bs4_sass_files(c("functions", "variables")),
        declarations = bs4_sass_files("mixins")
      ),
      # Returns a _named_ list of bundles (i.e., these should be easily removed)
      !!!rule_bundles(
        # Names here should match https://github.com/twbs/bootstrap/blob/master/scss/bootstrap.scss
        bs4_sass_files(c(
          "root", "reboot", "type", "images", "code", "grid", "tables",
          "forms", "buttons", "transitions", "dropdown", "button-group",
          "input-group", "custom-forms", "nav", "navbar", "card",
          "breadcrumb", "pagination", "badge", "jumbotron", "alert",
          "progress", "media", "list-group", "close", "toasts", "modal",
          "tooltip", "popover", "carousel", "spinners", "utilities", "print"
        ))
      ),
      # Additions to BS4 that are always included (i.e., not a part of compatibility)
      sass_layer(
        # Don't impose such a jarring change to the base font-size
        defaults = "$font-size-base: 0.875rem !default;",
        # Pandoc uses align attribute to align content but BS4 styles take precedence...
        # we may want to consider adopting this more generally in "strict" BS4 mode as well
        rules = list(
          ".table th[align=left] { text-align: left; }",
          ".table th[align=right] { text-align: right; }",
          ".table th[align=center] { text-align: center; }"
        )
      ),
      bs3compat = bs3compat_bundle()
    ),
    three = sass_bundle(
      sass_layer(
        defaults = bs3_sass_files("variables"),
        declarations = bs3_sass_files("mixins")
      ),
      # Should match https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/_bootstrap.scss
      !!!rule_bundles(
        bs3_sass_files(c(
          "normalize", "print", "glyphicons", "scaffolding", "type", "code", "grid",
          "tables", "forms", "buttons", "component-animations", "dropdowns", "button-groups",
          "input-groups", "navs", "navbar", "breadcrumbs", "pagination", "pager", "labels",
          "badges", "jumbotron", "thumbnails", "alerts", "progress-bars", "media",
          "list-group", "panels", "responsive-embed", "wells", "close", "modals",
          "tooltip", "popovers", "carousel", "utilities", "responsive-utilities"
        ))
      ),
      accessibility = bs3_accessibility_bundle(),
      glyphicon_font_files = sass_layer(
        defaults = list("icon-font-path" = "'glyphicon-fonts/'"),
        file_attachments = c(
          "glyphicon-fonts" = lib_file("bootstrap-sass", "assets", "fonts", "bootstrap")
        )
      )
    )
  )
}


bootstrap_javascript_map <- function(version) {
  switch_version(
    version,
    four = lib_file("bootstrap", "dist", "js", "bootstrap.bundle.min.js.map")
  )
}
bootstrap_javascript <- function(version) {
  switch_version(
    version,
    four = lib_file("bootstrap", "dist", "js", "bootstrap.bundle.min.js"),
    three = lib_file("bootstrap-sass", "assets", "javascripts", "bootstrap.min.js")
  )
}


# -----------------------------------------------------------------
# BS3 compatibility bundle
# -----------------------------------------------------------------

bs3compat_bundle <- function() {
  sass_layer(
    defaults = sass_file(system_file("bs3compat", "_defaults.scss", package = "bslib")),
    declarations = sass_file(system_file("bs3compat", "_declarations.scss", package = "bslib")),
    rules = sass_file(system_file("bs3compat", "_rules.scss", package = "bslib")),
    # Gyliphicon font files
    file_attachments = c(
      fonts = lib_file("bootstrap-sass", "assets", "fonts")
    ),
    html_deps = htmltools::htmlDependency(
      "bs3compat", packageVersion("bslib"),
      package = "bslib",
      src = "bs3compat/js",
      script = c("tabs.js", "bs3compat.js")
    )
  )
}

# -----------------------------------------------------------------
# BS3 accessibility bundle
# -----------------------------------------------------------------

bs3_accessibility_bundle <- function() {
  sass_layer(
    rules = sass_file(
      system_file(
        "lib", "bootstrap-accessibility-plugin",
        "src", "sass", "bootstrap-accessibility.scss",
        package = "bslib"
      )
    ),
    html_deps = htmltools::htmlDependency(
      "bootstrap-accessibility", version_accessibility,
      package = "bslib",
      src = "lib/bootstrap-accessibility-plugin",
      script = "plugins/js/bootstrap-accessibility.min.js"
    )
  )
}

# -----------------------------------------------------------------
# Bootswatch bundle
# -----------------------------------------------------------------

bootswatch_bundle <- function(bootswatch, version) {
  if (!length(bootswatch)) return(NULL)

  bootswatch <- switch_version(
    version,
    four = {
      switch(
        bootswatch,
        paper = {
          message("Bootswatch 3 theme paper has been renamed to materia in version 4 (using that theme instead)")
          "materia"
        },
        readable = {
          message("Bootswatch 3 theme readable has been renamed to litera in version 4 (using that theme instead)")
          "litera"
        },
        match.arg(bootswatch, bootswatch_themes(version))
      )
    },
    default = match.arg(bootswatch, bootswatch_themes(version))
  )

  # Attach local font files, if necessary
  font_css <- file.path(bootswatch_dist(version), bootswatch, "font.css")
  attachments <- if (file.exists(font_css)) {
    c(
      "font.css" = font_css,
      fonts = system_file("fonts", package = "bslib")
    )
  }

  sass_bundle(
    bootswatch = sass_layer(
      file_attachments = attachments,
      defaults = list(
        # Use local fonts (this path is relative to the bootstrap HTML dependency dir)
        '$web-font-path: "font.css" !default;',
        bootswatch_sass_file(bootswatch, "variables", version),
        # Unless we change navbarPage()'s markup, BS4+ will likely want BS3 compatibility
        switch_version(
          version, three = "", default = bs3compat_navbar_defaults(bootswatch)
        )
      ),
      rules = list(
        bootswatch_sass_file(bootswatch, "bootswatch", version),
        # For some reason sketchy sets .dropdown-menu{overflow: hidden}
        # but this prevents .dropdown-submenu from working properly
        # https://github.com/rstudio/bootscss/blob/023d455/inst/node_modules/bootswatch/dist/sketchy/_bootswatch.scss#L204
        if (identical(bootswatch, "sketchy")) ".dropdown-menu{ overflow: inherit; }" else "",
        # TODO: is this really needed? Why isn't it listening to a Sass var?
        if (identical(bootswatch, "lumen")) ".navbar.navbar-default {background-color: #f8f8f8 !important;}" else ""
      )
    )
  )
}


# Mappings from BS3 navbar classes to BS4
bs3compat_navbar_defaults <- function(bootswatch) {
  # Do nothing if this isn't a Bootswatch 3 theme
  if (!bootswatch %in% c("materia", "litera", bootswatch_themes(3))) {
    return("")
  }

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
      default = c("dark", "primary"),
      inverse = c("dark", "light")
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

  list(
    sprintf('$navbar-default-type: %s !default;', nav_classes$default[1]),
    sprintf('$navbar-default-bg: %s !default;', nav_classes$default[2]),
    sprintf('$navbar-inverse-type: %s !default;', nav_classes$inverse[1]),
    sprintf('$navbar-inverse-bg: %s !default;', nav_classes$inverse[2])
  )
}
