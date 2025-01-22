tag_require <- function(tag, version = version_default(), caller = "") {
  tagAddRenderHook(
    tag,
    replace = FALSE,
    func = function(x) {
      # If we know for sure the version isn't sufficient, it's safe to throw
      current_version <- theme_version(bs_current_theme())
      if (isTRUE(current_version < version)) {
        stop(
          caller,
          " requires Bootstrap ",
          version,
          " or higher. ",
          "To specify the version of Bootstrap, see https://rstudio.github.io/bslib/#basic-usage",
          call. = FALSE
        )
      }
      # We generally don't know the theme/version if any of these conditions are true:
      # 1. We're inside an Rmd output format that doesn't run through rmarkdown::html_document_base
      #    * pkgdown is one known case where the Bootstrap version may be customized, but bslib
      #      doesn't currently have a way to know what the version is.
      # 2. shiny::bootstrapLib() is being called while shiny is not shiny::isRunning()
      #   * At one point I was hoping bootstrapLib() could set the relevant context when
      #     statically rendered, but we didn't end up merging this
      #     https://github.com/rstudio/htmltools/pull/267
      # 3. Someone else is providing the bootstrap dependency
      #   * I currently don't know of any cases where this is relevant, but it might be
      #
      # So, since there are totally legitimate cases where the version requirement
      # could be met, but we don't know for sure what's happening server-side,
      # resort to a client-side check/warning
      return(tag_require_client_side(x, version, caller))
    }
  )
}

tag_require_client_side <- function(
  tag,
  version = version_default(),
  caller = ""
) {
  tagAppendChild(
    tagAppendAttributes(
      tag,
      "data-require-bs-version" = version,
      "data-require-bs-caller" = caller
    ),
    htmlDependency(
      name = "bslib-tag-require",
      version = get_package_version("bslib"),
      package = "bslib",
      src = "components",
      script = "tag-require.js"
    )
  )
}

tag_add_outer_class <- function(x, class = NULL, ...) {
  if (is.null(class)) return(x)

  if (inherits(x, "shiny.tag")) {
    return(tagAppendAttributes(x, class = class, ...))
  }

  as_fill_carrier(div(x, class = class, ...))
}
