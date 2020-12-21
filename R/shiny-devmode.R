

###
# These methods could be removed if shiny were able to be imported.
# * `shiny::in_devmode()`
# * `shiny::get_devmode_option()`
###

get_precompiled_option <- function(
  name = "bslib.precompiled",
  default = TRUE,
  devmode_default = FALSE,
  devmode_message = "Disabling the use of bslib precompiled themes. To be able to use precompiled themes, call `options(bslib.precompiled = TRUE)`"
) {
  get_shiny_devmode_option(
    name,
    default = default,
    devmode_default = devmode_default,
    devmode_message = devmode_message
  )
}


in_shiny_devmode <- function() {
  isTRUE(getOption("shiny.devmode", FALSE)) &&
    !identical(Sys.getenv("TESTTHAT"), "true")
}

#' @importFrom rlang missing_arg is_missing maybe_missing
get_shiny_devmode_option <- function(
  name,
  default = NULL,
  devmode_default = missing_arg(),
  devmode_message = missing_arg()
) {

  if (!in_shiny_devmode()) {
    # Dev Mode disabled, act like `getOption()`
    return(getOption(name, default = default))
  }

  # Dev Mode enabled, update the default value for `getOption()`
  getOption(name, default = {
    # Notify developer
    if (
      !is_missing(devmode_message) &&
      !is.null(devmode_message) &&
      getOption("shiny.devmode.verbose", TRUE)
    ) {
      devmode_message <- paste0("shiny devmode - ", devmode_message)
      rlang::inform(
        message = devmode_message,
        .frequency = "regularly",
        .frequency_id = devmode_message,
        .file = stderr()
      )
    }

    # Return Dev Mode default value `devmode_default`
    maybe_missing(devmode_default, default)
  })
}
