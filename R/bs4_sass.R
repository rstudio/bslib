#' Compile Bootstrap 4 SASS with (optional) theming
#'
#' Obtain Bootstrap (and it's dependencies) as an [htmltools::htmlDependency()].
#' By default, `bs4_sass()` returns vanilla Bootstrap, but it also provides
#' various ways to theme (see examples below).
#'
#' @param variables A list of SASS variables to include prior to any bootstrap or
#' `theme` sass. To ignore any existing variables (set by [theme_variables()]) at
#' runtime, set to `NULL`.
#' @param theme a [bs4_theme()] object. Use this argument to define your own custom
#' theme and/or use a pre-defined theme (e.g., [bs4_theme_bootswatch()]).
#' @param bootstrap_scss bootstrap scss files to compile `variables` and `theme` against.
#' By default, all of bootstrap is included. Use `bs4_scss_required()` to compile against
#' 'core' parts of bootstrap. Use `bs4_scss_file()` to fully customize what files to import.
#' @param options Compiler options for SASS, see [sass::sass_options()].
#'
#' @export
#' @seealso [bs4_theme()], [theme_variables()]
#' @references <https://getbootstrap.com/docs/4.3/getting-started/theming/>
#' @examples
#' library(htmltools)
#'
#' # Vanilla Bootstrap 4
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' browsable(tags$body(bs4_sass(), button))
#'
#' # Use a bootswatch theme
#' bs4_minty <- bs4_sass(theme = bs4_theme_bootswatch("minty"))
#' browsable(tags$body(bs4_minty, button))
#'
#' # Set bootstrap SASS variables (globally)
#' theme_variables(primary = "orange", "body-bg" = "#EEEEEE")
#' theme_variables("font-family-base" = "monospace", "font-size-base" = "1.4rem")
#' theme_variables("btn-padding-y" = ".16rem")
#' theme_variables("btn-padding-x" = "2rem")
#' theme_variables("border-radius" = 0, "border-radius-lg" = 0, "border-radius-sm" = 0)
#' browsable(tags$body(bs4_sass(), button))
#'
#' # Use a custom theme
#' person <- function(name, title, company) {
#'   tags$div(
#'     class = "person",
#'     h3(class = "name", name),
#'     div(class = "title", title),
#'     div(class = "company", company)
#'   )
#' }
#' person_scss <- sass::sass_file(system.file("custom", "person.scss", package = "bootscss"))
#' browsable(tags$body(
#'   bs4_sass(theme = bs4_theme(post = person_scss)),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
bs4_sass <- function(variables = theme_variables(), theme = bs4_theme_bs3compat(),
                     bootstrap_scss = bs4_scss_file("bootstrap.scss"),
                     options = sass_options()) {

  if (!is.null(theme) && !inherits(theme, "bs4_theme")) {
    stop("theme must be a bs4_theme() object.", call. = FALSE)
  }

  minified <- getOption("shiny.minified", TRUE)

  output_path <- tempfile("bs4custom")
  dir.create(output_path)

  # Add local fonts for the bootswatch theme, if any
  for (bootswatch in bootswatch_themes(TRUE)) {
    if (length(grep(bootswatch, c(theme$pre, theme$post), fixed = TRUE))) {
      file.copy(
        file.path(bootswatch, "font.css"),
        file.path(output_path, "font.css")
      )
      file.copy(
        system.file("fonts", package = "bootscss"),
        output_path,
        recursive = TRUE
      )
    }
  }

  output_css <- if (minified) "bootstrap-custom.min.css" else "bootstrap-custom.css"
  opts <- sass_options(
    output_style = if (minified) "compressed" else "expanded",
    source_map_embed = minified
  )
  opts <- utils::modifyList(opts, options)

  sass(
    output = file.path(output_path, output_css),
    options = opts,
    input = list(
      if (length(variables)) list(variables) else "",
      theme$pre %||% "",
      bootstrap_scss,
      theme$post %||% ""
    )
  )

  bootstrap_js <- system.file(
    "node_modules/bootstrap/dist/js",
    if (minified) "bootstrap.bundle.min.js" else "bootstrap.bundle.js",
    package = "bootscss"
  )

  file.copy(bootstrap_js, output_path)

  c(
    jquery_deps(),
    list(
      htmlDependency(
        "bootstrap",
        version_bootstrap,
        src = output_path,
        meta = c(
          name = "viewport",
          content = "width=device-width, initial-scale=1, shrink-to-fit=no"
        ),
        stylesheet = output_css,
        script = basename(bootstrap_js),
        # needed for ttf font files (imported via font.css)
        all_files = TRUE
      )
    ),
    theme$deps
  )
}

#' @rdname bs4_sass
#' @export
bs4_scss_required <- function() {
  list(
    bs4_scss_file("_functions.scss"),
    bs4_scss_file("_variables.scss"),
    bs4_scss_file("_mixins.scss")
  )
}


#' @rdname bs4_sass
#' @export
bs4_scss_file <- function(path) {
  f <- system.file("node_modules", "bootstrap", "scss", path, package = "bootscss")
  if (f == "") stop("The bootstrap scss file '", path, "' doesn't exist.", .call = FALSE)
  sass_file(f)
}
