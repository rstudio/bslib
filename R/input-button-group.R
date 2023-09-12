#' Create a button group of radio/check boxes
#'
#' Use `input_check_buttons()` if multiple choices may be selected at once; otherwise, use `input_radio_buttons()`
#'
#' @param theme a theme color.
#' @export
input_check_buttons <- function(
  id,
  choices,
  ...,
  selected = NULL,
  gap = 0,
  theme = NULL
) {

  input_tags <- toggle_button_tags(
    type = "checkbox", id = id, choices = choices,
    selected = selected, theme = theme
  )

  res <- toggle_button_container(
    id = id,
    input_tags = input_tags,
    gap = gap,
    ...
  )

  as_fragment(
    tag_require(res, version = 5, caller = "input_check_buttons()")
  )
}

#' @export
#' @rdname input_check_buttons
input_radio_buttons <- function(
  id,
  choices,
  ...,
  selected = NULL,
  gap = 0,
  theme = NULL
) {

  input_tags <- toggle_button_tags(
    type = "radio", id = id, choices = choices,
    selected = selected, theme = theme
  )

  res <- toggle_button_container(
    id = id,
    input_tags = input_tags,
    gap = gap,
    ...
  )

  as_fragment(
    tag_require(res, version = 5, caller = "input_radio_buttons()")
  )
}


#' @export
#' @rdname input_check_buttons
update_check_buttons <- function(id, choices = NULL, selected = NULL, session = get_current_session()) {
  if (!is.null(choices)) {
    choices <- processDeps(
      toggle_button_tags(type = "checkbox", id, choices, selected),
      session
    )
  }
  message <- dropNulls(list(
    choices = choices,
    selected = as.list(selected)
  ))
  session$sendInputMessage(id, message)
}

#' @export
#' @rdname input_check_buttons
update_radio_buttons <- function(id, choices = NULL, selected = NULL, session = get_current_session()) {
  if (!is.null(choices)) {
    choices <- processDeps(
      toggle_button_tags(type = "radio", id, choices, selected),
      session
    )
  }
  message <- dropNulls(list(
    choices = choices,
    selected = as.list(selected)
  ))
  session$sendInputMessage(id, message)
}


# TODO: container should have an aria-label!
toggle_button_container <- function(id, input_tags, gap = 0, ...) {

  has_gap <- !identical(gap, 0)

  div(
    id = id,
    class = "bslib-toggle-buttons bslib-mb-spacing",
    class = if (!has_gap) "btn-group",
    style = css(
      display = "flex",
      gap = validateCssUnit(gap),
      flexWrap = if (has_gap) "wrap"
    ),
    role = "group",
    ...,
    !!!input_tags,
    toggle_dependency()
  )
}


toggle_button_tags <- function(type = c("radio", "checkbox"), id, choices, selected, theme = NULL) {

  if (is.null(names(choices)) && is.atomic(choices)) {
    names(choices) <- choices
  }
  if (is.null(names(choices))) {
    stop("names() must be provided on list() vectors provided to choices")
  }

  vals <- rlang::names2(choices)
  #if (!all(nzchar(vals))) {
  #  stop("Input values must be non-empty character strings")
  #}

  is_checked <- vapply(vals, function(x) isTRUE(x %in% selected) || identical(I("all"), selected), logical(1))

  if (!any(is_checked) && !identical(selected, I("none"))) {
    is_checked[1] <- TRUE
  }

  type <- match.arg(type)
  if (type == "radio" && sum(is_checked) > 1)  {
    stop("input_radio_buttons() doesn't support more than one selected choice (do you want input_check_buttons() instead?)", call. = FALSE)
  }

  unname(Map(
    vals, choices, is_checked, paste0(id, "-", seq_along(is_checked)),
    f = function(val, lbl, checked, this_id) {
      list(
        tags$input(
          type = type, class = "btn-check", name = id,
          id = this_id, autocomplete = "off",
          `data-value` = val,
          checked = if (checked) NA
        ),
        tags$label(
          class = paste0("btn btn-outline-", theme %||% "secondary"),
          `for` = this_id, lbl
        )
      )
    }
  ))
}

toggle_dependency <- function() {
  htmltools::htmlDependency(
    "bslib-toggle-buttons",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components",
    script = "toggle-buttons.js"
  )
}
