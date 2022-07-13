#' Create a Bootstrap theme
#'
#' @description
#'
#' Creates a Bootstrap theme object, where you can:
#'
#' * Choose a (major) Bootstrap `version`.
#' * Choose a [Bootswatch theme](https://bootswatch.com) (optional).
#' * Customize main colors and fonts via explicitly named arguments (e.g.,
#'   `bg`, `fg`, `primary`, etc).
#' * Customize other, lower-level, Bootstrap Sass variable defaults via `...`.
#'
#' To learn more about how to implement custom themes, as well as how to use them inside Shiny and R Markdown, [see here](https://rstudio.github.io/bslib/articles/bslib.html).
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
#'  Each `*_font` argument may be collection of character vectors,
#'  [font_google()]s, [font_link()]s and/or [font_face()]s. Note that a
#'  character vector can have:
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
#'  bs_theme(base_font = font_collection(font_google("Pacifico", local = FALSE), "Roboto", "sans-serif"))
#'  ````
#'
#' @param version The major version of Bootstrap to use (see [versions()]
#'   for possible values). Defaults to the currently recommended version
#'   for new projects (currently Bootstrap 5).
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
#' @param font_scale A scalar multiplier to apply to the base font size. For
#'   example, a value of `1.5` scales font sizes to 150% and a value of `0.8`
#'   scales to 80%. Must be a positive number.
#'
#' @return a [sass::sass_bundle()] (list-like) object.
#'
#' @references \url{https://rstudio.github.io/bslib/articles/bslib.html}
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
#' theme <- bs_add_variables(theme, "my-class-color" = "red")
#' theme <- bs_add_rules(theme, ".my-class { color: $my-class-color }")
#'
#' @export
bs_theme <- function(version = version_default(), bootswatch = "shiny", ...,
                     bg = NULL, fg = NULL, primary = NULL, secondary = NULL,
                     success = NULL, info = NULL, warning = NULL, danger = NULL,
                     base_font = NULL, code_font = NULL, heading_font = NULL,
                     font_scale = NULL) {

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
    heading_font = heading_font,
    font_scale = font_scale
  )
}

#' @rdname bs_theme
#' @param theme a [bs_theme()] object.
#' @export
bs_theme_update <- function(theme, ..., bootswatch = NULL, bg = NULL, fg = NULL,
                            primary = NULL, secondary = NULL, success = NULL,
                            info = NULL, warning = NULL, danger = NULL,
                            base_font = NULL, code_font = NULL, heading_font = NULL,
                            font_scale = NULL) {
  assert_bs_theme(theme)

  if (!is.null(bootswatch)) {
    old_swatch <- theme_bootswatch(theme)
    # You're only allowed one Bootswatch theme!
    if (length(old_swatch)) {
      theme <- bs_remove(theme, "bootswatch")
      class(theme) <- setdiff(class(theme), bootswatch_class(old_swatch))
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
  theme <- bs_fonts(theme, base = base_font, code = code_font, heading = heading_font)
  if (!is.null(font_scale)) {
    stopifnot(is.numeric(font_scale) && length(font_scale) == 1)
    theme <- bs_add_variables(
      theme, "font-size-base" = paste(
        font_scale, "*", bs_get_variables(theme, "font-size-base")
      )
    )
  }
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
    sass_layer(defaults = list("bootstrap-version" = version)),
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
  pandoc_tables <- list(
    # Pandoc uses align attribute to align content but BS4 styles take precedence...
    # we may want to consider adopting this more generally in "strict" BS4 mode as well
    ".table th[align=left] { text-align: left; }",
    ".table th[align=right] { text-align: right; }",
    ".table th[align=center] { text-align: center; }"
  )

  main_bundle <- switch_version(
    version,
    five = sass_bundle(
      # Don't name this "core" bundle so it can't easily be removed
      sass_layer(
        functions = bs5_sass_files("functions"),
        defaults = bs5_sass_files("variables"),
        mixins = bs5_sass_files("mixins")
      ),
      # Returns a _named_ list of bundles (i.e., these should be easily removed)
      !!!rule_bundles(
        # Names here should match https://github.com/twbs/bs5/blob/master/scss/bootstrap.scss
        bs5_sass_files(c(
          "utilities",
          "root", "reboot", "type", "images", "containers", "grid",
          "tables", "forms", "buttons", "transitions", "dropdown",
          "button-group", "nav", "navbar", "card", "accordion", "breadcrumb",
          "pagination", "badge", "alert", "progress", "list-group", "close",
          "toasts", "modal", "tooltip", "popover", "carousel", "spinners",
          "offcanvas", "placeholders", "helpers", "utilities/api"
        ))
      ),
      # Additions to BS5 that are always included (i.e., not a part of compatibility)
      sass_layer(rules = pandoc_tables),
      bs3compat = bs3compat_bundle(),
      # card() CSS (can be removed)
      card = sass_layer(
        rules = sass_file(system_file("components/card.scss", package = "bslib"))
      ),
      card_summary = sass_layer(
        rules = sass_file(system_file("components/card-summary.scss", package = "bslib"))
      ),
      sidebar = sass_layer(
        rules = sass_file(system_file("components/sidebar.scss", package = "bslib"))
      )
    ),
    four = sass_bundle(
      sass_layer(
        functions = bs4_sass_files(c("deprecated", "functions")),
        defaults = bs4_sass_files("variables"),
        mixins = bs4_sass_files("mixins")
      ),
      # Returns a _named_ list of bundles (i.e., these should be easily removed)
      !!!rule_bundles(
        # Names here should match https://github.com/twbs/bs4/blob/master/scss/bootstrap.scss
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
      sass_layer(rules = pandoc_tables),
      bs3compat = bs3compat_bundle()
    ),
    three = sass_bundle(
      sass_layer(
        defaults = bs3_sass_files("variables"),
        mixins = bs3_sass_files("mixins")
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
          "glyphicon-fonts" = lib_file("bs3", "assets", "fonts", "bootstrap")
        )
      )
    )
  )

  sass_bundle(
    main_bundle,
    # color-contrast() was introduced in Bootstrap 5.
    # We include our own version for a few reasons:
    # 1. Easily turn off warnings options(bslib.color_contrast_warnings=F)
    # 2. Allow Bootstrap 3 & 4 to use color-contrast() in variable definitions
    # 3. Allow Bootstrap 3 & 4 to use bs_get_contrast()
    sass_layer(
      functions = sass_file(system_file("sass-utils/color-contrast.scss", package = "bslib"))
    ),
    # nav_spacer() CSS (can be removed)
    nav_spacer = sass_layer(
      rules = sass_file(system_file("nav-spacer/nav-spacer.scss", package = "bslib"))
    ),
  )
}


bootstrap_javascript_map <- function(version) {
  switch_version(
    version,
    five = lib_file("bs5", "dist", "js", "bootstrap.bundle.min.js.map"),
    four = lib_file("bs4", "dist", "js", "bootstrap.bundle.min.js.map")
  )
}
bootstrap_javascript <- function(version) {
  switch_version(
    version,
    five = lib_file("bs5", "dist", "js", "bootstrap.bundle.min.js"),
    four = lib_file("bs4", "dist", "js", "bootstrap.bundle.min.js"),
    three = lib_file("bs3", "assets", "javascripts", "bootstrap.min.js")
  )
}


# -----------------------------------------------------------------
# BS3 compatibility bundle
# -----------------------------------------------------------------

bs3compat_bundle <- function() {
  sass_layer(
    defaults = sass_file(system_file("bs3compat", "_defaults.scss", package = "bslib")),
    mixins = sass_file(system_file("bs3compat", "_declarations.scss", package = "bslib")),
    rules = sass_file(system_file("bs3compat", "_rules.scss", package = "bslib")),
    # Gyliphicon font files
    file_attachments = c(
      fonts = lib_file("bs3", "assets", "fonts")
    ),
    html_deps = htmltools::htmlDependency(
      "bs3compat", packageVersion("bslib"),
      package = "bslib",
      src = "bs3compat/js",
      script = c("transition.js", "tabs.js", "bs3compat.js")
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
        "lib", "bs-a11y-p",
        "src", "sass", "bootstrap-accessibility.scss",
        package = "bslib"
      )
    ),
    html_deps = htmltools::htmlDependency(
      "bootstrap-accessibility", version_accessibility,
      package = "bslib", src = "lib/bs-a11y-p",
      script = "plugins/js/bootstrap-accessibility.min.js",
      all_files = FALSE
    )
  )
}

# -----------------------------------------------------------------
# Bootswatch bundle
# -----------------------------------------------------------------

bootswatch_bundle <- function(bootswatch, version) {
  if (!length(bootswatch) || isTRUE(bootswatch %in% c("default", "bootstrap"))) {
    return(NULL)
  }

  bootswatch <- switch_version(
    version,
    default = {
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
    three = match.arg(bootswatch, bootswatch_themes(version))
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
        # Several Bootswatch themes (e.g., zephyr, simplex, etc) add custom .btn-secondary
        # rules that should also apply to .btn-default
        ".btn-default:not(.btn-primary):not(.btn-info):not(.btn-success):not(.btn-warning):not(.btn-danger):not(.btn-dark):not(.btn-outline-primary):not(.btn-outline-info):not(.btn-outline-success):not(.btn-outline-warning):not(.btn-outline-danger):not(.btn-outline-dark) {
          @extend .btn-secondary !optional;
        }"
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

  bg_colors <- switch(
    bootswatch,
    cerulean = c("primary", "info"),
    cosmo = c("dark", "primary"),
    cyborg = c("body-bg", "secondary"),
    darkly = c("primary", "success"),
    flatly = c("primary", "success"),
    journal = c("light", "primary"),
    lumen = c("light", "white"),
    # i.e., materia
    paper = ,
    materia = c("light", "primary"),
    readable = ,
    litera = c("light", "dark"),
    sandstone = c("dark", "success"),
    simplex = c("light", "primary"),
    slate = c("primary", "light"),
    spacelab = c("light", "primary"),
    superhero = c("dark", "primary"),
    united = c("primary", "dark"),
    yeti = c("dark", "primary"),
    stop("Didn't recognize Bootswatch 3 theme: ", bootswatch, call. = FALSE)
  )


  list(
    sprintf('$navbar-light-bg: $%s !default;', bg_colors[1]),
    sprintf('$navbar-dark-bg: $%s !default;', bg_colors[2])
  )
}
