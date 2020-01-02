#' Compile Bootstrap 4 (or 3) SASS with (optional) theming
#'
#' Use `bootstrap()` to obtain all of Bootstrap and it's dependencies as a list
#' of [htmltools::htmlDependency()] objects.
#' Use `bootstrap_sass()` if you can assume Bootstrap already exists in your
#' project, but you want to leverage Bootstrap utilities (e.g., variables, functions,
#' or mixins) to generate additional CSS rules (as a string that can be included
#' as a `<style>` tag via `tags$style(css)`).
#'
#' @param theme one of the following:
#'   1. The result of [bs_theme_get()] (recommended default).
#'   2. A string containing a bootswatch theme and/or a Bootstrap major version. To specify
#'   both, use the syntax `"theme@version"`, (e.g., `"cosmo@4"` for Bootstrap 4 cosmo
#'   theme with BS3 compatibility). If no version is specified, the latest available
#'   version is used (for more info, see `version` in [bs_theme_set()]).
#'   3. `NULL`, which means use the latest version of Bootstrap with no custom theming.
#' @param jquery See [jquerylib::jquery_core()].
#' @param minified whether the resulting HTML dependency should minify the JS/CSS files.
#' @inheritParams sass::sass
#'
#' @export
#' @seealso [bs_theme_set()]
#' @references <https://getbootstrap.com/docs/4.3/getting-started/theming/>
#' @examples
#' library(htmltools)
#'
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#'
#' preview_button <- function(x) {
#'   browsable(tags$body(x, button))
#' }
#'
#' # Latest bootstrap
#' preview_button(bootstrap())
#'
#' # Bootstrap 3
#' preview_button(bootstrap("3"))
#'
#' # Bootswatch minty theme
#' preview_button(bootstrap("minty"))
#'
#' # Bootswatch sketchy theme
#' preview_button(bootstrap("sketchy"))
#'
#' # Bootswatch solar theme with BS3 compatibility
#' preview_button(bootstrap("solar@4-3"))
#'
#' # Set bootstrap SASS variables (globally)
#' bs_theme_add_variables(
#'   primary = "orange",
#'   "body-bg" = "#EEEEEE",
#'   "font-family-base" = "monospace",
#'   "font-size-base" = "1.4rem",
#'   "btn-padding-y" = ".16rem",
#'   "btn-padding-x" = "2rem",
#'   "border-radius" = 0,
#'   "border-radius-lg" = 0,
#'   "border-radius-sm" = 0
#' )
#' preview_button(bootstrap())
#' bs_theme_clear()
#'
#' # Include custom CSS that leverages bootstrap SASS variables
#' person <- function(name, title, company) {
#'   tags$div(
#'     class = "person",
#'     h3(class = "name", name),
#'     div(class = "title", title),
#'     div(class = "company", company)
#'   )
#' }
#' person_scss <- sass::sass_file(system.file("custom", "person.scss", package = "bootstraplib"))
#' browsable(tags$body(
#'   bootstrap(),
#'   tags$style(bootstrap_sass(person_scss)),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
bootstrap <- function(theme = bs_theme_get(),
                      jquery = jquerylib::jquery_core(3),
                      options = sass::sass_options(),
                      minified = TRUE) {

  # Resolve theme and merge it with Bootstrap core imports
  theme <- as_bs_theme(theme)
  version <- theme_version(theme)
  core <- sass_layer(declarations = bootstrap_core_scss(version, partial = FALSE))
  theme <- sass_layer_merge(core, theme)

  # Merge sass options
  opts <- sass_options(
    output_style = if (minified) "compressed" else "expanded",
    source_map_embed = minified
  )
  opts <- utils::modifyList(opts, options)

  # Temp dir for building the HTML dependencies
  output_path <- tempfile("bscustom")
  dir.create(output_path)

  # Compile sass in temp dir
  output_css <- if (minified) "bootstrap-custom.min.css" else "bootstrap-custom.css"
  sass::sass(
    input = theme,
    output = file.path(output_path, output_css),
    write_attachments = TRUE,
    options = opts
  )

  # Bootstrap JS
  js <- bootstrap_javascript(version, minified)
  file.copy(js, output_path)

  if (inherits(jquery, "html_dependency")) {
    jquery <- list(jquery)
  }

  c(
    jquery,
    list(
      htmlDependency(
        "bootstrap",
        if (version %in% "3") version_bs3 else version_bs4,
        src = output_path,
        meta = c(
          name = "viewport",
          content = "width=device-width, initial-scale=1, shrink-to-fit=no"
        ),
        stylesheet = output_css,
        script = basename(js)
      )
    ),
    theme$html_deps
  )
}


#' @rdname bootstrap
#' @export
bootstrap_sass <- function(rules = list(), theme = bs_theme_get(),
                           options = sass::sass_options()) {

  theme <- as_bs_theme(theme)
  theme$rules <- ""
  version <- theme_version(theme)
  core <- sass_layer(declarations = bootstrap_core_scss(version, partial = TRUE))
  theme <- sass_layer_merge(core, theme)

  sass::sass(
    options = options,
    input = list(theme, rules)
  )
}

bootstrap_core_scss <- function(version, partial = TRUE) {
  if (!partial) {
    # This function should default to the 'main' scss file
    return(sass_file_bootstrap(version = version))
  }
  scss <- c(
    if (version %in% c("4", "4-3")) "_functions.scss",
    "_variables.scss",
    "_mixins.scss"
  )
  if (version %in% "3") scss <- file.path("bootstrap", scss)
  lapply(scss, sass_file_bootstrap, version = version)
}


bootstrap_javascript <- function(version, minified = TRUE) {
  if (version %in% c("4", "4-3")) {
    return(system.file(
      "node_modules/bootstrap/dist/js",
      if (minified) "bootstrap.bundle.min.js" else "bootstrap.bundle.js",
      package = "bootstraplib"
    ))
  }

  if (version %in% "3") {
    return(system.file(
      "node_modules/bootstrap-sass/assets/javascripts",
      if (minified) "bootstrap.min.js" else "bootstrap.js",
      package = "bootstraplib"
    ))
  }

  stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
}

