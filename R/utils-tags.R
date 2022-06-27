tag_require <- function(tag, version = 4, caller = "") {
  tagAddRenderHook(
    tag, replace = FALSE,
    func = function(x) {
      current_version <- theme_version(bs_current_theme()) %||% 3
      if (isTRUE(current_version >= version))
        return(x)

      stop(
        caller, " requires Bootstrap ", version, " or higher. ",
        "Please supply `bslib::bs_theme(version = ", version,
        ")` to the UI's page layout function.",
        call. = FALSE
      )
    }
  )
}

is_tag <- function(x) {
  inherits(x, "shiny.tag")
}
