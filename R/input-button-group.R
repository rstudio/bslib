#' Create a button group of radio/check boxes
#'
#' Use `input_check_buttons()` if multiple choices may be selected at once; otherwise, use `input_radio_buttons()`
#'
#' @inheritParams input_check_search
#' @param size size of the button group
#' @param bg a theme color to use for the btn modifier class
#' @export
input_check_buttons <- function(id, choices, ..., selected = NULL, size = c("md", "sm", "lg"), bg = "primary") {
  size <- match.arg(size)
  inputs <- input_buttons(
    type = "checkbox", id = id, choices = choices, selected = selected,
    size = size, bg = bg
  )
  tag <- div(
    id = id,
    class = "btn-group bslib-toggle-buttons",
    class = if (size != "md") paste0("btn-group-", size),
    role = "group",
    ...,
    !!!inputs,
    toggle_dependency()
  )
  tag <- tag_require(tag, version = 5, caller = "input_check_buttons()")
  as_fragment(tag)
}

#' @export
#' @rdname input_check_buttons
update_check_buttons <- function(id, choices = NULL, selected = NULL, session = shiny::getDefaultReactiveDomain()) {
  if (!is.null(choices)) {
    choices <- input_buttons(type = "checkbox", id, choices, selected)
  }
  message <- dropNulls(list(
    choices = choices,
    selected = selected
  ))
  session$sendInputMessage(id, message)
}

#' @export
#' @rdname input_check_buttons
input_radio_buttons <- function(id, choices, ..., selected = NULL, size = c("md", "sm", "lg"), bg = "primary") {
  size <- match.arg(size)
  inputs <- input_buttons(
    type = "checkbox", id = id, choices = choices, selected = selected,
    size = size, bg = bg
  )
  tag <- div(
    id = id,
    class = "btn-group bslib-toggle-buttons",
    class = if (size != "md") paste0("btn-group-", size),
    role = "group",
    ...,
    !!!inputs,
    toggle_dependency()
  )
  tag <- tag_require(tag, version = 5, caller = "input_radio_buttons()")
  as_fragment(tag)
}

#' @export
#' @rdname input_check_buttons
update_radio_buttons <- function(id, choices = NULL, selected = NULL, session = shiny::getDefaultReactiveDomain()) {
  if (!is.null(choices)) {
    choices <- input_buttons(type = "radio", id, choices, selected)
  }
  message <- dropNulls(list(
    choices = choices,
    selected = selected
  ))
  session$sendInputMessage(id, message)
}


input_buttons <- function(type = c("radio", "checkbox"), id, choices, selected, size = "md", bg = "primary") {

  if (is.null(names(choices)) && is.atomic(choices)) {
    names(choices) <- choices
  }
  if (is.null(names(choices))) {
    stop("names() must be provided on list() vectors provided to choices")
  }

  vals <- rlang::names2(choices)
  if (!all(nzchar(vals))) {
    stop("Input values must be non-empty character strings")
  }

  is_checked <- vapply(vals, function(x) isTRUE(x %in% selected) || identical(I("all"), selected), logical(1))

  if (!any(is_checked) && !identical(selected, I("none"))) {
    is_checked[1] <- TRUE
  }

  type <- match.arg(type)
  if (type == "radio" && sum(is_checked) > 1)  {
    stop("input_radio_buttons() doesn't support more than one selected choice (do you want input_check_buttons() instead?)", call. = FALSE)
  }

  res <- Map(
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
          class = paste0("btn btn-outline-", bg),
          `for` = this_id, lbl
        )
      )
    }
  )

  unlist(res, recursive = FALSE, use.names = FALSE)
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
