#' Compile Bootstrap 4 (or 3) SASS with (optional) theming
#'
#' Use `bs_sass()` to obtain all of Bootstrap and it's dependencies as a list
#' of [htmltools::htmlDependency()] objects.
#' Use `bs_sass_partial()` if you can assume Bootstrap already exists in your
#' project, but you want to leverage Bootstrap utilities to generate additional
#' CSS (as a string that can be included as a `<style>` tag via `tags$style(css)`).
#'
#' @inheritParams sass::sass
#' @param theme one of the following:
#'   1. A [bs_theme()] object.
#'   2. A string containing a bootswatch theme and/or a Bootstrap major version. To specify
#'   both, use the syntax `"theme@version"`, (e.g., `"cosmo@4"` for Bootstrap 4 cosmo
#'   theme with BS3 compatibility). If no version is specified, the latest available
#'   version is used (for more info, see `version` in [bs_theme()]).
#'   3. `NULL` or `""` which means use the latest version of Bootstrap with no custom theming.
#'   4. Any acceptable [sass::sass] `input`. Ordinary sass input is placed _after_ all other
#'   Bootstrap/Bootswatch SASS code; however, [bs_theme_layer()]s may be used to place SASS
#'   both before and after all other Bootstrap/Bootswatch SASS code. Note that
#'   [bs_sass_partial()] never includes any `theme` SASS after Bootstrap (only `input`).
#' @param jquery See [jquerylib::jquery_core()].
#' @param minified whether the resulting HTML dependency should minify the JS/CSS files.
#'
#' @export
#' @seealso [bs_theme()]
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
#' preview_button(bs_sass())
#'
#' # Bootstrap 3
#' preview_button(bs_sass("3"))
#'
#' # Bootswatch minty theme
#' preview_button(bs_sass("minty"))
#'
#' # Bootswatch sketchy theme
#' preview_button(bs_sass("sketchy"))
#'
#' # Bootswatch solar theme with BS3 compatibility
#' preview_button(bs_sass("solar@4-3"))
#'
#' # Set bootstrap SASS variables (globally)
#' bs_theme_set(
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
#' preview_button(bs_sass())
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
#'   bs_sass(),
#'   tags$style(bs_sass_partial(person_scss)),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
bs_sass <- function(theme = bs_theme_get(),
                    jquery = jquerylib::jquery_core(3),
                    options = sass::sass_options(),
                    minified = TRUE) {

  theme <- as_bs_theme(theme)
  version <- theme$version
  bootswatch <- theme$bootswatch
  bs_sass <- bs_theme_sass(theme, before_only = FALSE)

  # Temporary dir for the html dependency files
  output_path <- tempfile("bscustom")
  dir.create(output_path)

  # Install local Glyphicon fonts
  if (identical(version, "4-3")) {
    file.copy(
      system.file("node_modules/bootstrap-sass/assets/fonts", package = "bootstraplib"),
      output_path,
      recursive = TRUE
    )
  }

  # Install local bootswatch fonts
  if (is_bootswatch_theme(theme)) {
    file.copy(
      file.path(bootswatch_dist(version), bootswatch, "font.css"),
      file.path(output_path, "font.css")
    )
    file.copy(
      system.file("fonts", package = "bootstraplib"),
      output_path,
      recursive = TRUE
    )
  }

  # Merge sass options
  opts <- sass_options(
    output_style = if (minified) "compressed" else "expanded",
    source_map_embed = minified
  )
  opts <- utils::modifyList(opts, options)

  # Compile sass
  output_css <- if (minified) "bootstrap-custom.min.css" else "bootstrap-custom.css"
  sass::sass(
    input = sass_layer_merge(bs_sass, theme$sass_layer),
    output = file.path(output_path, output_css),
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
    bs_sass$html_deps
  )
}


#' @rdname bs_sass
#' @export
bs_sass_partial <- function(sass = list(), theme = bs_theme_get(),
                            options = sass::sass_options()) {
  theme <- as_bs_theme(theme)
  bs_sass <- bs_theme_sass(theme, before_only = TRUE)
  sass::sass(
    options = options,
    input = sass_layer_merge(bs_sass, theme$sass_layer, sass)
  )
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

