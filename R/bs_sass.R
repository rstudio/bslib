#' Compile Bootstrap 4 (or 3) SASS with (optional) theming
#'
#' Use `bootstrap()` to compile Bootstrap Sass into CSS and return it,
#' along with other HTML dependencies, as a list of [htmltools::htmlDependency()]s
#' (if you just want the CSS as a string, and a [bs_theme_new()] has been set,
#'  you can call `sass::sass()` on the return value of [bs_theme_get()]).
#' Use `bootstrap_sass()` if you can assume Bootstrap already exists on the
#' page, but you want to leverage Bootstrap utilities (e.g., variables, functions,
#' or mixins) to generate additional CSS rules (as a string that can be included
#' as a `<style>` tag via `tags$style(css)`).
#'
#' @param theme one of the following:
#'   1. The result of [bs_theme_get()] (i.e., the current global theme).
#'   2. `NULL`, which means use the latest version of Bootstrap with no custom theming.
#'   3. A string containing a bootswatch theme and/or a Bootstrap major version. To specify
#'   both, use the syntax `"theme@version"`, (e.g., `"cosmo@4"` for Bootstrap 4 cosmo
#'   theme with BS3 compatibility). If no version is specified, the latest available
#'   version is used (for more info, see `version` in [bs_theme_new()]).
#'   __Note__: this approach ignores global themes (i.e., [bs_theme_new()])
#'   4. A [sass::sass_layer()] which contains a bootstraplib theme. Useful for adding
#'   custom layers to the current theme without affecting the global state (e.g.,
#'   `sass::sass_layer_merge(bs_theme_get(), my_layer())`).
#' @param sass_options see [sass::sass_options()].
#' @param jquery See [jquerylib::jquery_core()].
#' @inheritParams sass::sass
#'
#' @return a list of HTML dependencies containing Bootstrap CSS, Bootstrap JavaScript, and `jquery`.
#' This list may contain additional HTML dependencies if the `theme` calls for it (e.g., `version = "4+3"`
#' contains an additional JavaScript dependency).
#'
#' @export
#' @seealso [bs_theme_set()]
#' @examples
#'
#' # Function to preview the styling a (primary) Bootstrap button
#' library(htmltools)
#' button <- tags$a(class = "btn btn-primary", href = "#", role = "button", "Hello")
#' preview_button <- function(x) {
#'   browsable(tags$body(x, button))
#' }
#'
#' # Latest bootstrap
#' preview_button(bootstrap())
#' # Bootstrap 3
#' preview_button(bootstrap("3"))
#' # Bootswatch minty theme
#' preview_button(bootstrap("minty"))
#' # Bootswatch sketchy theme
#' preview_button(bootstrap("sketchy"))
#' # Bootswatch solar theme with BS3 compatibility
#' preview_button(bootstrap("solar@4+3"))
#'
bootstrap <- function(theme = bs_theme_get(),
                      sass_options = sass::sass_options(output_style = "compressed"),
                      cache = sass::sass_cache_get(),
                      jquery = jquerylib::jquery_core(3)) {

  theme <- as_bs_theme(theme)
  version <- theme_version(theme)
  minified <- isTRUE(sass_options$output_style %in% c("compressed", "compact"))
  output_css <- if (minified) "bootstrap-custom.min.css" else "bootstrap-custom.css"
  js <- bootstrap_javascript(version, minified)

  cache_key <- sass::sass_hash(list(
    theme,
    sass_options,
    get_exact_version(version),
    utils::packageVersion("bootstraplib")
  ))

  # Temp dir for building the HTML dependencies
  output_path <- file.path(
    tempdir(),
    "bootstraplib",
    paste0("bootstrap-", cache_key)
  )

  # If the output path already exists, then we don't need to write anything.
  if (!dir.exists(output_path)) {
    dir.create(output_path, recursive = TRUE)

    # Compile sass in temp dir
    sass::sass(
      input = theme,
      options = sass_options,
      output = file.path(output_path, output_css),
      cache = cache,
      write_attachments = TRUE
    )

    file.copy(js, output_path)
  }

  c(
    if (inherits(jquery, "html_dependency")) list(jquery) else jquery,
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
#' @param rules Sass styling rules that may reference `theme` `defaults` and `declarations`.
#' @param ... arguments passed along to [sass::sass()].
#' @export
bootstrap_sass <- function(rules = list(), theme = bs_theme_get(), ...) {
  theme <- as_bs_theme(theme)
  theme$rules <- ""
  sass::sass(input = list(theme, rules), ...)
}


