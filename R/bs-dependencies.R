#' Compile Bootstrap Sass with (optional) theming
#'
#' Use `bs_theme_dependencies()` to compile Bootstrap Sass into CSS and return it, along
#' with other HTML dependencies, as a list of [htmltools::htmlDependency()]s. Use
#' `sass_partial()` if you can assume Bootstrap already exists on the page,
#' but you want to leverage Bootstrap utilities (e.g., variables, functions, or
#' mixins) to generate additional CSS rules (as a string that can be included as
#' a `<style>` tag via `tags$style(css)`).
#'
#' @inheritParams bs_theme_update
#' @param sass_options a [sass::sass_options()] object.
#' @param jquery a [jquerylib::jquery_core()] object.
#' @param precompiled Before compiling the theme object, first look for a
#'   precompiled CSS file for the given `version`.  If this option is `TRUE` and
#'   a precompiled CSS file exists for the theme object, it will be fetched
#'   immediately and not compiled. At the moment, we only provide precompiled
#'   CSS for "stock" builds of Bootstrap (i.e., no theming additions, bootswatch
#'   themes, or non-default `sass_options`).
#'
#' @inheritParams sass::sass
#'
#' @return a list of HTML dependencies containing Bootstrap CSS, Bootstrap
#'   JavaScript, and `jquery`. This list may contain additional HTML
#'   dependencies if the `theme` calls for it (e.g., `version = "4+3"` contains
#'   an additional JavaScript dependency).
#'
#' @export
#' @seealso [bs_theme()], [bs_global_set()]
#' @examples
#'
#' # Function to preview the styling a (primary) Bootstrap button
#' library(htmltools)
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' preview_button <- function(theme) {
#'   theme %>%
#'     bs_theme_dependencies() %>%
#'     tags$body(button) %>%
#'     browsable()
#' }
#'
#' # Latest bootstrap
#' preview_button(bs_theme())
#' # Bootstrap 3
#' preview_button(bs_theme(3))
#' # Bootswatch minty theme
#' preview_button(bs_theme(bootswatch = "minty"))
#' # Bootswatch sketchy theme
#' preview_button(bs_theme(bootswatch = "sketchy"))
#' # Bootswatch solar theme with BS3 compatibility
#' preview_button(bs_theme(version = "4+3", bootswatch = "solar"))
#'
bs_theme_dependencies <- function(
  theme,
  sass_options = sass::sass_options(output_style = "compressed"),
  cache = sass::sass_cache_get(),
  jquery = jquerylib::jquery_core(3),
  precompiled = TRUE)
{

  theme <- as_bs_theme(theme)
  version <- theme_version(theme)
  theme_layer <- sass::as_sass_layer(theme)

  if (is.character(cache)) {
    cache <- sass::sass_cache_get(cache)
  }

  out_file <- NULL
  # Look for a precompiled css file if user asks for it AND the default options
  # are used.
  if (precompiled &&
      identical(sass_options, sass::sass_options(output_style = "compressed")))
  {
    precompiled_css <- precompiled_css_path(theme)
    if (!is.null(precompiled_css)) {
      out_dir <- file.path(tempdir(), paste0("bslib-precompiled-", version))
      if (!dir.exists(out_dir)) {
        dir.create(out_dir)
      }
      out_file <- file.path(out_dir, basename(precompiled_css))
      file.copy(precompiled_css, out_file)

      sass::write_file_attachments(
        theme_layer$file_attachments,
        out_dir
      )
    }
  }

  # If precompiled css not found, compile normally.
  if (is.null(out_file)) {
    out_file <- sass::sass(
      input = theme,
      options = sass_options,
      output = sass::output_template(basename = "bootstrap", dirname = "bslib-"),
      cache = cache,
      write_attachments = TRUE,
      cache_key_extra = list(
        get_exact_version(version),
        utils::packageVersion("bslib")
      )
    )
  }

  out_file_dir <- dirname(out_file)

  js_files <- bootstrap_javascript(version)
  js_map_files <- bootstrap_javascript_map(version)
  success_js_files <- file.copy(c(js_files, js_map_files), out_file_dir, overwrite = TRUE)
  if (any(!success_js_files)) {
    warning("Failed to copy over bootstrap's javascript files into the htmlDependency() directory.")
  }

  htmltools::resolveDependencies(c(
    if (inherits(jquery, "html_dependency")) list(jquery) else jquery,
    list(
      htmlDependency(
        name = "bootstrap",
        version = get_exact_version(version),
        src = out_file_dir,
        stylesheet = basename(out_file),
        script = basename(js_files),
        all_files = TRUE, # include font and map files
        meta = list(viewport = "width=device-width, initial-scale=1, shrink-to-fit=no")
      )
    ),
    theme_layer$html_deps
  ))
}


#' Themeable HTML components
#'
#' @description
#'
#' Themeable HTML components use Sass to generate CSS rules from Bootstrap Sass
#' variables, functions, and/or mixins (i.e., stuff inside of `theme`).
#' `bs_dependencies()` makes it a bit easier to create themeable components by
#' compiling [sass::sass()] (`input`) together with Bootstrap Sass inside of a
#' `theme`, and packaging up the result into an [htmlDependency()].
#'
#' Themable components can also be  _dynamically_ themed inside of Shiny (i.e.,
#' they may be themed in 'real-time' via [bs_themer()], and more generally,
#' update their styles in response to [shiny::session]'s `setCurrentTheme()`
#' method). Dynamically themeable components provide a "recipe" (i.e., a
#' function) to `bs_dependency_defer()`, describing how to generate new CSS
#' stylesheet(s) from a new `theme`. This function is called when the HTML page
#' is first rendered, and may be invoked again with a new `theme` whenever
#' [shiny::session]'s `setCurrentTheme()` is called.
#'
#' @param input Sass rules to compile, using `theme`.
#' @param theme A [bs_theme()] object.
#' @param cache_key_extra Extra information to add to the sass cache key. It is
#'   useful to add the version of your package.
#' @param .dep_args A list of additional arguments to pass to
#'   [htmltools::htmlDependency()].
#' @param .sass_args A list of additional arguments to pass to
#'   [sass::sass_partial()].
#' @inheritParams htmltools::htmlDependency
#' @references
#' <https://rstudio.github.io/bootstraplib/articles/theming.html#themable-components-1>
#'
#'
#' @return an [htmltools::htmlDependency()] object.
#' @export
bs_dependency <- function(input = list(), theme, name, version,
  cache_key_extra = NULL, .dep_args = list(), .sass_args = list())
{
  sass_args <- c(
    list(
      rules = input,
      bundle = theme,
      output = sass::output_template(basename = name, dirname = name),
      write_attachments = TRUE,
      cache_key_extra = cache_key_extra
    ),
    .sass_args
  )
  outfile <- do.call(sass::sass_partial, sass_args)

  dep_args <- c(
    list(
      name = name,
      version = version,
      src = dirname(outfile),
      stylesheet = basename(outfile)
    ),
    .dep_args
  )
  do.call(htmlDependency, dep_args)
}

#' @param func a _non-anonymous_ function, with a _single_ argument. This function
#'   should accept a [bs_theme()] object and return a single [htmlDependency()],
#'   a list of them, or `NULL`.
#' @export
#' @return A [htmltools::tagFunction()] object.
#'
#' @examples
#'
#' \dontrun{
#'
#' myWidgetVersion <- "1.2.3"
#'
#' myWidgetDependency <- function() {
#'   list(
#'     bs_dependency_defer(myWidgetCss),
#'     htmlDependency(
#'       name = "mywidget-js",
#'       version = myWidgetVersion,
#'       src = system.file(package = "mypackage", "js"),
#'       script = "mywidget.js"
#'     )
#'   )
#' }
#'
#' myWidgetCSS <- function(theme) {
#'   if (!is_bs_theme(theme)) {
#'     return(
#'       htmlDependency(
#'         name = "mywidget-css",
#'         version = myWidgetVersion,
#'         src = system.file(package = "mypackage", "css"),
#'         stylesheet = "mywidget.css"
#'       )
#'     )
#'   }
#'
#'   # Compile mywidget.scss using the variables and defaults from the theme
#'   # object.
#'   sass_input <- sass::sass_file(system.file(package = "mypackage", "scss/mywidget.scss"))
#'
#'   bs_dependency(
#'     input = sass_input,
#'     theme = theme,
#'     name = "mywidget",
#'     version = myWidgetVersion,
#'     cache_key_extra = utils::packageVersion("mypackage")
#'   )
#' }
#'
#' # Note that myWidgetDependency is not defined inside of myWidget. This is so
#' # that, if `myWidget()` is called multiple times, Shiny can tell that the
#' # function objects are identical and deduplicate them.
#' myWidget <- function(id) {
#'   div(
#'     id = id,
#'     span("myWidget"),
#'     myWidgetDependency()
#'   )
#' }
#' }
#'
#' @rdname bs_dependency
bs_dependency_defer <- function(func) {
  force(func)

  tagFunction(function() {
    if (is_shiny_app()) {
      # If we're in a Shiny app, do two things:
      # (1) Register this function as a dependency so that Shiny will know to
      # update it later if the theme dynamically changes. Repeated registrations
      # are harmless because Shiny will de-duplicate them.
      # (2) Call the user's `func()` with the current theme, and return the
      # resulting htmlDependency so that it can be embedded in the static page.
      shiny::registerThemeDependency(func)

      return(func(shiny::getCurrentTheme()))
    }

    # Outside of a Shiny context, we'll just get the global theme.
    func(bs_global_get())
  })
}

as_bs_theme <- function(theme) {
  if (is_bs_theme(theme)) return(theme)

  # Allow users to do something like
  # bs_theme_dependencies(theme = sass_bundle(bs_global_get(), my_layer()))
  if (is_sass_bundle(theme) || inherits(theme, "sass_layer")) {
    theme <- add_class(
      # make sure the sass layer turns into a sass bundle
      sass::sass_bundle(theme),
      "bs_theme"
    )
    if (is.null(theme_version(theme))) {
      stop("Wasn't able to figure out the Bootstrap version.")
    }
    return(theme)
  }

  # NULL means default Bootstrap
  if (is.null(theme)) return(bs_theme())

  # For example, `bs_theme_dependencies(theme = 4)`
  if (is.numeric(theme)) return(bs_theme(version = theme))

  # For example, `bs_theme_dependencies(theme = 'bootswatch@version')`
  if (is_string(theme)) {
    theme <- strsplit(theme, "@", fixed = TRUE)[[1]]
    if (length(theme) == 2) {
      return(bs_theme(version = theme[2], bootswatch = theme[1]))
    }
    # Also support `bs_theme_dependencies(version = '4')` and
    # `bs_theme_dependencies(theme = 'bootswatch')`
    if (length(theme) == 1) {
      if (theme %in% c("4", "4-3", "4+3", "3")) {
        return(bs_theme(version = theme))
      } else {
        return(bs_theme(bootswatch = theme))
      }
    }
    stop("If `theme` is a string, it can't contain more than one @")
  }

  stop(
    "`theme` must be one of the following: (1) `NULL`, ",
    "(2) a `'bootswatch@version'` string, ",
    "(3) the result of `bs_global_get()`."
  )
}
