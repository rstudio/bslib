#' Compile Bootstrap 4 SASS with (optional) theming
#'
#' Obtain Bootstrap (and it's dependencies) as an [htmltools::htmlDependency()].
#' By default, `bs_sass()` returns vanilla Bootstrap, but it also provides
#' various ways to theme (see examples below).
#'
#' @param ... a collection of [sass::sass()] input and/or [bs_themes()].
#' Use this argument to supply pre-defined theme(s) like [theme_bootswatch()] and
#' combine those theme with your own SASS code.
#' @param variables A list of SASS variables to include prior to any other SASS.
#' To ignore any existing variables (set by [theme_variables()]) at runtime,
#' set this to `NULL`.
#' @param bootstrap_scss bootstrap scss files to compile `variables` and `...` against.
#' By default, all of bootstrap is included. Use `bs4_scss_required()` to compile against
#' 'core' parts of Bootstrap 4. If you need to use a specific version of Bootstrap,
#' supply it via [sass::sass_file()] and attach a `"bootstrap_version"` attribute
#' for the version to be reflected in the returned HTML dependency.
#' @param options Compiler options for SASS, see [sass::sass_options()].
#'
#' @return a list of HTML dependencies.
#' @export
#' @seealso [bs_themes()], [theme_variables()]
#' @references <https://getbootstrap.com/docs/4.3/getting-started/theming/>
#' @examples
#' library(htmltools)
#'
#' # Vanilla Bootstrap 4
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' browsable(tags$body(bs_sass(), button))
#'
#' # Use a bootswatch theme
#' minty <- bs_sass(theme_bootswatch("minty"))
#' browsable(tags$body(minty, button))
#'
#' # Set bootstrap SASS variables (globally)
#' theme_variables(primary = "orange", "body-bg" = "#EEEEEE")
#' theme_variables("font-family-base" = "monospace", "font-size-base" = "1.4rem")
#' theme_variables("btn-padding-y" = ".16rem")
#' theme_variables("btn-padding-x" = "2rem")
#' theme_variables("border-radius" = 0, "border-radius-lg" = 0, "border-radius-sm" = 0)
#' browsable(tags$body(bs_sass(), button))
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
#' person_scss <- sass::sass_file(system.file("custom", "person.scss", package = "bootstraplib"))
#' browsable(tags$body(
#'   bs_sass(person_scss),
#'   person("Andrew Carnegie", "Owner", "Carnegie Steel Company"),
#'   person("John D. Rockefeller", "Chairman", "Standard Oil")
#' ))
#'
bs_sass <- function(..., variables = theme_variables(),
                    bootstrap_scss = bs4_scss_file("bootstrap.scss"),
                    bs3compat = TRUE,
                    options = sass_options()) {

  theme <- bs_themes(...)

  # Give users the opportunity to provide the Bootstrap version with the scss file(s)
  bs_version <- attr(bootstrap_scss, "bootstrap_version") %||% version_bootstrap
  if (bs3compat && grepl("^4\\b", bs_version)) {
    theme <- bs_themes(theme_bs3compat(), theme)
  }

  minified <- getOption("shiny.minified", TRUE)

  output_path <- tempfile("bscustom")
  dir.create(output_path)

  # Add local fonts for the bootswatch theme, if any
  for (bootswatch in bootswatch_themes(TRUE)) {
    if (length(grep(bootswatch, c(theme$pre, theme$post), fixed = TRUE))) {
      file.copy(
        file.path(bootswatch, "font.css"),
        file.path(output_path, "font.css")
      )
      file.copy(
        system.file("fonts", package = "bootstraplib"),
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
    package = "bootstraplib"
  )

  file.copy(bootstrap_js, output_path)

  c(
    jquery_deps(),
    list(
      htmlDependency(
        "bootstrap",
        bs_version,
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

#' @rdname bs_sass
#' @export
bs4_scss_required <- function() {
  list(
    bs4_scss_file("_functions.scss"),
    bs4_scss_file("_variables.scss"),
    bs4_scss_file("_mixins.scss")
  )
}


#' @rdname bs_sass
#' @export
bs4_scss_file <- function(path) {
  f <- system.file("node_modules", "bootstrap", "scss", path, package = "bootstraplib")
  if (f == "") stop("The bootstrap scss file '", path, "' doesn't exist.", .call = FALSE)
  sass_file(f)
}
