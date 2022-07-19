#' A searchable list of checkboxes
#'
#' @param id an input id.
#' @param choices a vector/list of choices. If there are names on the on the vector, those names are used as the input value.
#' @param selected a vector/list of choices to select by default.
#' @param placeholder some text to appear when no search input is provided
#' @param height a valid CSS unit for the height of the input.
#'
#' @export
input_check_search <- function(id, choices, selected = NULL, placeholder = "🔍 Search", height = NULL, width = NULL) {

  tag <- div(
    id = id,
    class = "bslib-check-search",
    style = css(height = height, width = width),
    tags$a(class = "clear-options", role = "button", "Clear all"),
    tags$input(
      type = "text",
      id = paste0(id, "-search"),
      class = "form-control form-control-sm",
      class = "shiny-no-bind", # TODO: require shiny PR
      placeholder = placeholder,
      autocomplete = "off"
    ),
    check_search_choices(id, choices, selected),
    check_search_dependency()
  )

  tag <- tag_require(tag, version = 5, caller = "input_check_search")

  as_fragment(tag)
}


#' @export
update_check_search <- function(id, choices = NULL, selected = NULL, placeholder = NULL, height = NULL, session = shiny::getDefaultReactiveDomain()) {
  if (!is.null(choices)) {
    choices <- process_ui(
      check_search_choices(id, choices, selected),
      session
    )
  }

  message <- dropNulls(list(
    choices = choices,
    selected = as.list(selected), # make sure this is always a JS array
    placeholder = placeholder,
    height = height
  ))
  session$sendInputMessage(id, message)
}

check_search_choices <- function(id, choices, selected) {
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

  is_selected <- vapply(vals, function(x) {
    isTRUE(x %in% selected) || identical(selected, I("all"))
  }, logical(1))

  checks <- unname(Map(
    vals, choices, is_selected, paste0(id, "-", seq_along(is_selected)),
    f = form_check
  ))

  # Always bring selections to the top
  idx <- c(which(is_selected), which(!is_selected))

  div(
    class = "check-search-choices",
    !!!checks[idx]
  )
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
