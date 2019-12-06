#' Compile Bootstrap 4 (or 3) SASS with (optional) theming
#'
#' Use `bs_sass()` to obtain all of Bootstrap and it's dependencies as a list
#' of [htmltools::htmlDependency()] objects.
#' Use `bs_sass_partial()` if you can assume Bootstrap already exists in your
#' project, but you want to leverage Bootstrap utilities to generate additional
#' CSS (as a string that can be included as a `<style>` tag via `tags$style(css)`).
#'
#' @inheritParams sass::sass
#' @param ... a collection of [sass::sass()] to include after Bootstrap's SASS.
#' Use [bs_theme()] if you need to place [sass::sass()] both before and after Bootstrap's SASS.
#' @param bootswatch The name of a bootswatch theme.
#' See [bootswatch_themes()] for a list of possible names.
#' @param variables A list of SASS variables to include prior to any other SASS.
#' To ignore any existing variables (set by [theme_variables()]) at runtime,
#' set this to `NULL`.
#' @param version The major version of Bootstrap to use. A value of
#' `'4-3'` means Bootstrap 4, but with additional CSS/JS to support
#' BS3 style markup in BS4. Other supported versions include 3 and 4.
#' @param jquery See [jquerylib::jquery_core()].
#'
#' @export
#' @seealso [bs_theme()], [theme_variables()]
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
#' # Vanilla Bootstrap 4
#' preview_button(bs_sass())
#'
#' # Vanilla Bootstrap 3
#' preview_button(bs_sass(version = 3))
#'
#' # Bootswatch 4 theme minty
#' preview_button(bs_sass(bootswatch = "minty"))
#'
#' # Bootswatch 4 theme sketchy
#' preview_button(bs_sass(bootswatch = "sketchy"))
#'
#' # Set bootstrap SASS variables (globally)
#' theme_variables(primary = "orange", "body-bg" = "#EEEEEE")
#' theme_variables("font-family-base" = "monospace", "font-size-base" = "1.4rem")
#' theme_variables("btn-padding-y" = ".16rem")
#' theme_variables("btn-padding-x" = "2rem")
#' theme_variables("border-radius" = 0, "border-radius-lg" = 0, "border-radius-sm" = 0)
#' preview_button(bs_sass())
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
                    bootswatch = NULL, version = c("4-3", "4", "3"),
                    jquery = jquerylib::jquery_core(3),
                    options = sass_options(),
                    minified = TRUE) {

  if (!is.null(names(list(...)))) {
    stop("Components of `...` had unexpected names.", call. = FALSE)
  }
  version <- version_normalize(version)

  bs_sass <- sass_file_bootstrap(version = version)
  bs_sass <- sass_layer_merge(bs_sass, sass_layer(pre = navbar_height_var(version = version)))

  if (identical(version, "4-3")) {
    bs_sass <- sass_layer_merge(bs_sass, theme_layer_bs3compat())
  }

  # Temporary dir for the html dependency files
  output_path <- tempfile("bscustom")
  dir.create(output_path)

  if (!is.null(bootswatch)) {
    bs_sass <- sass_layer_merge(bs_sass, theme_layer_bootswatch(bootswatch, version))
  }

  # Note that ... is given the highest priority
  # (i.e., users should be able to override all the pre-packaged layers)
  bs_sass <- sass_layer_merge(bs_sass, ...)

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
      bs_sass
    )
  )

  js <- bootstrap_javascript(version, minified)
  file.copy(js, output_path)


  # Ugly hack to identify bootswatch theme(s) and install
  # the appropriate local fonts if any
  is_bootswatch <- sapply(bs_sass$deps, "[[", "name") %in% "bootswatch-local-fonts"
  if (any(is_bootswatch)) {
    # theme_layer_bootswatch() attaches the theme name to 'src' field
    lapply(bs_sass$deps[is_bootswatch], function(x) {
      file.copy(
        file.path(bootswatch_dist(version), x$src, "font.css"),
        file.path(output_path, "font.css")
      )
    })
    bs_sass$deps[is_bootswatch] <- NULL
    file.copy(
      system.file("fonts", package = "bootstraplib"),
      output_path,
      recursive = TRUE
    )
  }


  if (inherits(jquery, "html_dependency")) {
    jquery <- list(jquery)
  }

  c(
    jquery,
    list(
      htmlDependency(
        "bootstrap",
        if (version %in% "3") {
          version_bs3
        } else {
          version_bs4
        },
        src = output_path,
        meta = c(
          name = "viewport",
          content = "width=device-width, initial-scale=1, shrink-to-fit=no"
        ),
        stylesheet = output_css,
        script = basename(js)
      )
    ),
    bs_sass$deps
  )
}

#' @rdname bs_sass
#' @export
bs_sass_partial <- function(input = list(), ...,
                            variables = theme_variables(),
                            bootswatch = NULL,
                            version = c("4-3", "4", "3"),
                            options = sass_options()) {

  version <- version_normalize(version)

  scss <- if (version %in% "3") {
    c(
      "_variables.scss",
      "_mixins.scss"
    )
  } else if (version %in% c("4", "4-3")) {
    c(
      "_functions.scss",
      "_variables.scss",
      "_mixins.scss"
    )
  }

  bs_sass <- lapply(scss, sass_file_bootstrap, version = version)

  # bs_sass_partial() is intended to be 'header only' meaning
  # that if the user passes sass_layer()s through ...
  # then we only keep the pre field (i.e., headers)
  # That's why we explictly pass BS scss file to pre here:
  bs_sass <- sass_layer(pre = bs_sass)
  bs_sass <- sass_layer_merge(bs_sass, sass_layer(pre = navbar_height_var(version = version)))

  if (identical(version, "4-3")) {
    bs_sass <- sass_layer_merge(bs_sass, theme_layer_bs3compat())
  }

  if (!is.null(bootswatch)) {
    bs_sass <- sass_layer_merge(
      bs_sass, theme_layer_bootswatch(bootswatch, version)
    )
  }

  # It doesn't make sense for anything than a layer to be in ...
  # since it'll endup being discarded
  is_sass_layer <- vapply(rlang::list2(...), inherits, "sass_layer", logical(1))
  if (FALSE %in% is_sass_layer) {
    stop(
      "... only understand bs_theme() (i.e., sass_layer()) objects. ",
      "Use the input argument for arbitrary sass code", call. = FALSE
    )
  }
  bs_sass <- discard_post_layer(sass_layer_merge(bs_sass, ...))

  sass(
    options = options,
    input = list(
      if (length(variables)) list(variables) else "",
      bs_sass,
      input
    )
  )
}


discard_post_layer <- function(x) {
  if (inherits(x, "sass_layer")) {
    x$post <- ""
  }

  if (is.list(x)) {
    lapply(x, discard_post_layer)
  }

  x
}

#' Obtain Bootstrap and Bootswatch SASS files
#'
#' Useful if you need to import specific SASS files from
#' Bootstrap and/or Bootswatch as part of a [bs_sass_partial()]
#' based workflow.
#'
#' `sass_file_bootstrap()` defaults to the main Bootstrap scss file.
#' `sass_file_bootswatch()` default to the variables scss file.
#'
#' @param file a scss file path.
#' @param version the major version.
#' @param theme a bootswatch theme name.
#' @rdname sass_files
#' @export
sass_file_bootstrap <- function(file = NULL, version = 4) {
  version <- version_normalize(version)
  if (length(file) > 1) stop("file should be of length 1")

  f <- if (version %in% "3") {
    file <- file %||% "_bootstrap.scss"
    system.file("node_modules", "bootstrap-sass", "assets", "stylesheets", file, package = "bootstraplib")
  } else if (version %in% c("4", "4-3")) {
    file <- file %||% "bootstrap.scss"
    system.file("node_modules", "bootstrap", "scss", file, package = "bootstraplib")
  } else {
    stop("Bootstrap version not supported:", version, call. = FALSE)
  }
  if (f == "") stop("The bootstrap stylesheet '", file, "' doesn't exist.", call. = FALSE)
  sass::sass_file(f)
}

#' @rdname sass_files
#' @export
sass_file_bootswatch <- function(theme, file = NULL, version = version_latest()) {
  version <- version_normalize(version)
  if (length(file) > 1) stop("file should be of length 1")
  theme <- match.arg(theme, bootswatch_themes(version))
  f <- file.path(bootswatch_dist(version), theme, file %||% "_variables.scss")
  if (file.exists(f)) return(sass::sass_file(f))
  stop("Bootswatch file '", file, "' doesn't exist for theme '", theme, "'.", call. = FALSE)
}

#' List all Bootswatch themes
#'
#' @param version the major version of Bootswatch.
#' @param full_path whether to return a path to the installed theme.
#' @export
bootswatch_themes <- function(version = version_latest(), full_path = FALSE) {
  version <- version_normalize(version)
  list.dirs(bootswatch_dist(version), full.names = full_path, recursive = FALSE)
}

bootswatch_dist <- function(version, full_path = TRUE) {
  dist <- if (version %in% "3") {
    file.path("node_modules", "bootswatch3")
  } else if (version %in% c("4", "4-3")) {
    file.path("node_modules", "bootswatch", "dist")
  } else {
    stop("Didn't recognize Bootstrap version: ", version, call. = FALSE)
  }
  if (full_path) {
    dist <- system.file(dist, package = "bootstraplib")
  }
  dist
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

