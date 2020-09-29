#' Compile Bootstrap Sass with (optional) theming
#'
#' Use `bs_dependencies()` to compile Bootstrap Sass into CSS and return it, along
#' with other HTML dependencies, as a list of [htmltools::htmlDependency()]s. Use
#' `bs_sass()` if you can assume Bootstrap already exists on the page,
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
#'     bs_dependencies() %>%
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
bs_dependencies <- function(
  theme,
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
  js_map_files <- bootstrap_javascript_map(version)
  success_js_files <- file.copy(c(js_files, js_map_files), out_file_dir, overwrite = TRUE)
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
        all_files = TRUE, # js_map_files
        meta = list(viewport = "width=device-width, initial-scale=1, shrink-to-fit=no")
      )
    ),
    theme$html_deps
  )
}


#' @rdname bs_dependencies
#' @param rules Sass styling rules that may reference the `theme`'s `defaults` and `declarations`.
#' @param ... arguments passed along to [sass::sass()].
#' @export
bs_sass <- function(rules = list(), theme, write_attachments = FALSE, ...) {
  theme <- as_bs_theme(theme)
  theme$rules <- ""
  sass::sass(
    input = list(theme, rules),
    write_attachments = write_attachments,
    ...
  )
}

as_bs_theme <- function(theme) {
  if (is_bs_theme(theme)) return(theme)

  # Allow users to do something like
  # bs_dependencies(theme = sass_layer_merge(bs_global_get(), my_layer()))
  if (inherits(theme, "sass_layer")) {
    theme <- add_class(theme, "bs_theme")
    if (is.null(theme_version(theme))) {
      stop("Wasn't able to figure out the Bootstrap version.")
    }
    return(theme)
  }

  # NULL means default Bootstrap
  if (is.null(theme)) return(bs_theme())

  # For example, `bs_dependencies(theme = 4)`
  if (is.numeric(theme)) return(bs_theme(version = theme))

  # For example, `bs_dependencies(theme = 'bootswatch@version')`
  if (is_string(theme)) {
    theme <- strsplit(theme, "@", fixed = TRUE)[[1]]
    if (length(theme) == 2) {
      return(bs_theme(version = theme[2], bootswatch = theme[1]))
    }
    # Also support `bs_dependencies(version = '4')` and `bs_dependencies(theme = 'bootswatch')`
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
