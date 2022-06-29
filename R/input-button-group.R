#' Search a "large" number of check options
#'
#'
#'
#' @export
input_check_search <- function(id, choices, selected = NULL, placeholder = "🔍 Search", height = "150px") {

  # N.B., reverse to how Shiny does things!
  vals <- rlang::names2(choices)
  lbls <- as.character(choices)
  idx <- !nzchar(vals)
  vals[idx] <- lbls[idx]

  is_selected <- vapply(vals, function(x) {
    isTRUE(x %in% selected) || identical(selected, I("all"))
  }, logical(1))

  checks <- Map(
    vals, lbls, is_selected, paste0(id, "-", seq_along(is_selected)),
    f = form_check
  )

  tag <- div(
    id = id,
    class = "bslib-check-search",
    style = htmltools::css(
      height = height,
      width = "fit-content",
      overflow = "scroll",
      padding = "0.5rem"
    ),
    tags$input(
      type = "text", class = "form-control form-control-sm mb-1",
      class = "shiny-no-bind", # TODO: require shiny PR
      placeholder = placeholder, id = paste0(id, "-search")
    ),
    !!!unname(checks),
    check_search_dependency()
  )

  # TODO: should tag_require() not apply during static render?
  #tag <- tag_require(tag, version = 5, caller = "input_check_search")

  as_fragment(tag)
}

form_check <- function(val, lbl, checked, this_id) {
  div(
    class = "form-check", `data-value` = val,
    tags$input(
      type = "checkbox",
      class = "form-check-input",
      class = "shiny-no-bind",
      id = this_id,
      checked = if (checked) NA
    ),
    tags$label(class = "form-check-label", `for` = this_id, lbl)
  )
}

check_search_dependency <- function() {
  htmlDependency(
    "bslib-check-search",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components",
    script = "check-search.js"
  )
}


#' Create a button group of radio/check boxes
#'
#' Use `input_check_buttons()` if multiple choices may be selected at once; otherwise, use `input_radio_buttons()`
#'
#' @export
input_check_buttons <- function(id, choices, ..., selected = NULL, size = c("md", "sm", "lg"), bg = "primary", outline = TRUE) {
  size <- match.arg(size)
  input_toggle_buttons(
    type = "checkbox", id = id, choices = choices, selected = selected,
    size = size, bg = bg, outline = outline, ...
  )
}

#' @export
input_radio_buttons <- function(id, choices, ..., selected = NULL, size = c("md", "sm", "lg"), bg = "primary", outline = TRUE) {
  size <- match.arg(size)
  input_toggle_buttons(
    type = "radio", id = id, choices = choices, selected = selected,
    size = size, bg = bg, outline = outline, ...
  )
}

input_toggle_buttons <- function(type = c("radio", "checkbox"), id, label, choices, selected, size, bg, outline, ...) {

  # N.B., reverse to how Shiny does things!
  vals <- rlang::names2(choices)
  lbls <- as.character(choices)
  idx <- !nzchar(vals)
  vals[idx] <- lbls[idx]

  is_checked <- vapply(vals, function(x) isTRUE(x %in% selected) || identical(I("all"), selected), logical(1))

  if (!any(is_checked) && !identical(selected, I("none"))) {
    is_checked[1] <- TRUE
  }

  type <- match.arg(type)
  if (type == "radio" && sum(is_checked) > 1)  {
    stop("input_radio_buttons() doesn't support more than one selected choice (do you want input_check_buttons() instead?)", call. = FALSE)
  }

  inputs <- Map(
    vals, lbls, is_checked, paste0(id, "-", seq_along(is_checked)),
    f = function(val, lbl, checked, this_id) {
      list(
        tags$input(
          type = type, class = "btn-check", name = id,
          id = this_id, autocomplete = "off",
          `data-value` = val,
          checked = if (checked) NA
        ),
        tags$label(
          # TODO: custom bg color?
          class = paste0("btn btn-", if (outline) "outline-", bg),
          `for` = this_id, lbl
        )
      )
    }
  )

  tag <- div(
    id = id,
    class = "btn-group bslib-toggle-buttons",
    class = if (size != "md") paste0("btn-group-", size),
    role = "group",
    ...,
    !!!unlist(inputs, recursive = FALSE, use.names = FALSE),
    toggle_dependency()
  )

  # TODO: should tag_require() not apply during static render?
  #tag <- tag_require(tag, version = 5, caller = paste("input", type, "buttons()", collapse = "_"))

  as_fragment(tag)
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
