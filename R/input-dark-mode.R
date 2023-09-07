#' Dark mode input control
#'
#' Creates a button that toggles between dark and light modes, specifically for
#' toggling between light and dark [Bootstrap color
#' modes](https://getbootstrap.com/docs/5.3/customize/color-modes/) -- a new
#' feature added in [Bootstrap
#' 5.3](https://getbootstrap.com/docs/5.3/migration/#color-modes).
#'
#' @param ... Additional attributes to be passed to the input control UI, such
#'   as `class`, `style`, etc.
#'
#'   In `toggle_dark_mode()`, the `...` are included for future extensibility
#'   and are currently ignored.
#' @param id An optional input id, required to reactively read the current color
#'   mode.
#' @param mode The initial mode of the dark mode switch. By default or when set
#'   to `NULL`, the user's system settings for preferred color scheme will be
#'   used. Otherwise, set to `"light"` or `"dark"` to force a particular initial
#'   mode.
#' @inheritParams tooltip
#'
#' @return Returns a UI element for a dark mode switch input control. The server
#'   value received for the input corresponding to `id` will be a string value
#'   with the current color mode (`"light"` or `"dark"`).
#'
#' @describeIn input_dark_mode Create a dark mode switch input control
#' @family input controls
#' @export
input_dark_mode <- function(..., id = NULL, mode = NULL) {
  if (!is.null(mode)) {
    mode <- rlang::arg_match(mode, c("light", "dark"))
  }

  if (any(!nzchar(rlang::names2(rlang::list2(...))))) {
    abort("All arguments in `...` must be named.")
  }

  res <- web_component(
    "bslib-input-dark-mode",
    id = id,
    attribute = "data-bs-theme",
    mode = mode,
    style = css(
      "--text-1" = "var(--bs-emphasis-color)",
      "--text-2" = "var(--bs-tertiary-color)",
      # The vertical correction used in the dark mode component isn't quite
      # right on Bootstrap pages. This next line overrides it and removes the
      # vertical correction. But users can still set the CSS property manually
      # in their a `style` argument passed in via `...` if they want.
      "--vertical-correction" = " "
    ),
    ...,
    component_dependency_js("bslibShiny")
  )

  res <- tag_require(res, version = 5, caller = "input_dark_mode()")
  as_fragment(res)
}

#' @describeIn input_dark_mode Programmatically toggle or set the current light
#'   or dark color mode.
#' @export
toggle_dark_mode <- function(mode = NULL, ..., session = get_current_session()) {
  rlang::check_dots_empty(
    error = function(err) rlang::warn(rlang::cnd_message(err))
  )

  if (!is.null(mode)) {
    mode <- tryCatch(
      rlang::arg_match(mode, c("light", "dark")),
      error = function(err) {
        rlang::warn(rlang::cnd_message(err))
        mode
      }
    )
  }

  data <- dropNulls(list(method = "toggle", value = mode))

  # We're using sendCustomMessage() here because dark mode is set globally and
  # `id` is not required for `toggle_dark_mode()`. `$sendInputMessage()` would
  # require us to know the `id` of at least one input control.
  callback <- function() {
    session$sendCustomMessage("bslib.toggle-dark-mode", data)
  }

  session$onFlush(callback, once = TRUE)
}
