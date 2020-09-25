#' Compile Bootstrap 4 (or 3) SASS with (optional) theming
#'
#' Use `bootstrap()` to compile Bootstrap Sass into CSS and return it, along
#' with other HTML dependencies, as a list of [htmltools::htmlDependency()]s (if
#' you just want the CSS as a string, and a [bs_theme_new()] has been set, you
#' can call `sass::sass()` on the return value of [bs_theme_get()]). Use
#' `bootstrap_sass()` if you can assume Bootstrap already exists on the page,
#' but you want to leverage Bootstrap utilities (e.g., variables, functions, or
#' mixins) to generate additional CSS rules (as a string that can be included as
#' a `<style>` tag via `tags$style(css)`).
#'
#' @param theme one of the following: 1. The result of [bs_theme_get()] (i.e.,
#'   the current global theme). 2. `NULL`, which means use the latest version of
#'   Bootstrap with no custom theming. 3. A string containing a bootswatch theme
#'   and/or a Bootstrap major version. To specify both, use the syntax
#'   `"theme@version"`, (e.g., `"cosmo@4"` for Bootstrap 4 cosmo theme with BS3
#'   compatibility). If no version is specified, the latest available version is
#'   used (for more info, see `version` in [bs_theme_new()]). __Note__: this
#'   approach ignores global themes (i.e., [bs_theme_new()]) 4. A
#'   [sass::sass_layer()] which contains a bootstraplib theme. Useful for adding
#'   custom layers to the current theme without affecting the global state
#'   (e.g., `sass::sass_layer_merge(bs_theme_get(), my_layer())`).
#' @param sass_options see [sass::sass_options()].
#' @param jquery See [jquerylib::jquery_core()].
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
bootstrap <- function(
  theme = bs_theme_get(),
  sass_options = sass::sass_options(output_style = "compressed"),
  cache = sass::sass_cache_get(),
  jquery = jquerylib::jquery_core(3),
  precompiled = TRUE)
{

  theme <- as_bs_theme(theme)
  version <- theme_version(theme)

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
      out_dir <- file.path(tempdir(), paste0("bootstraplib-precompiled-", version))
      if (!dir.exists(out_dir)) {
        dir.create(out_dir)
      }
      out_file <- file.path(out_dir, basename(precompiled_css))
      file.copy(precompiled_css, out_file)

      sass::write_file_attachments(theme$file_attachments, out_dir)
    }
  }

  # If precompiled css not found, compile normally.
  if (is.null(out_file)) {
    out_file <- sass::sass(
      input = theme,
      options = sass_options,
      output = sass::output_template(basename = "bootstrap", dirname = "bootstraplib-"),
      cache = cache,
      write_attachments = TRUE,
      cache_key_extra = list(
        get_exact_version(version),
        utils::packageVersion("bootstraplib")
      )
    )
  }

  out_file_dir <- dirname(out_file)

  js_files <- bootstrap_javascript(version)
  success_js_files <- file.copy(js_files, out_file_dir, overwrite = TRUE)
  if (any(!success_js_files)) {
    warning("Failed to copy over bootstrap's javascript files into the htmlDependency() directory.")
  }

  c(
    if (inherits(jquery, "html_dependency")) list(jquery) else jquery,
    list(
      htmlDependency(
        name = "bootstrap",
        version = get_exact_version(version),
        src = out_file_dir,
        stylesheet = basename(out_file),
        script = basename(js_files),
        all_files = TRUE,
        meta = list(viewport = "width=device-width, initial-scale=1, shrink-to-fit=no")
      )
    ),
    theme$html_deps
  )
}


#' @rdname bootstrap
#' @param rules Sass styling rules that may reference `theme` `defaults` and `declarations`.
#' @param ... arguments passed along to [sass::sass()].
#' @export
bootstrap_sass <- function(rules = list(), theme = bs_theme_get(),
                           write_attachments = FALSE, ...) {
  theme <- as_bs_theme(theme)
  theme$rules <- ""
  sass::sass(
    input = list(theme, rules),
    write_attachments = write_attachments,
    ...
  )
}
