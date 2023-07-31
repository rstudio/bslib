input_status_button <- function(
  id,
  label,
  icon = NULL,
  auto_disable = TRUE,
  help = NULL,
  ...,
  pending = NULL,
  success = NULL,
  failure = NULL
) {
  pending <- pending %||%
    input_status_state("Loading...", icon = "spinner-border", disable = TRUE)

  success <- success %||%
    input_status_state("Done!", icon = "check", class = "text-bg-success", delay = 2)

  failure <- failure %||%
    input_status_state("Error!", icon = "exclamation-triangle-fill", class = "text-bg-danger", delay = 3)

  stopifnot(
    inherits(pending, "input_status_state"),
    inherits(success, "input_status_state"),
    inherits(failure, "input_status_state")
  )

  icon <- as_bs_icon(icon)

  res <- web_component(
    "bslib-status-button",
    icon = icon,
    label = label,
    state = "ready",
    "auto-disable" = if (auto_disable) NA,
    pending = to_json(pending),
    success = to_json(success),
    failure = to_json(failure),
    shiny::actionButton(
      inputId = id,
      class = "bslib-status-button",
      label = tagList(
        span(class = "bslib-status-icon", icon),
        span(class = "bslib-status-label", label)
      ),
      ...
    ),
    div(class = "bslib-status-help", help)
  )

  res <- tag_require(res, version = 5, caller = "input_status_button()")
  as_fragment(res)
}

as_bs_icon <- function(x, ...) {
  if (is.null(x)) return(x)
  if (inherits(x, c("shiny.tag", "shiny.tag.list", "html"))) {
    return(x)
  }
  if (is.character(x)) {
    icon <- switch(
      x,
      "spinner-border" = div(class = "spinner-border spinner-border-sm"),
      "spinner-grow" = div(class = "spinner-grow spinner-grow-sm"),
      bsicons::bs_icon(x, ...)
    )
    return(icon)
  }
  stop("Expected a `bsicons::bs_icon()` name or a shiny HTML object or tag.")
}

input_status_state <- function(
  label = NULL,
  icon = NULL,
  class = NULL,
  disable = FALSE,
  delay = NULL,
  help = NULL
) {
  structure(
    list(
      label = label,
      icon = as_html_chr(as_bs_icon(icon)),
      class = class,
      disable = disable,
      delay = delay,
      help = as_html_chr(help)
    ),
    class = "input_status_state"
  )
}

as_html_chr <- function(x) {
  if (is.null(x)) return()
  if (is.character(x)) return(x)
  if (inherits(x, c("shiny.tag", "shiny.tag.list"))) return(format(x))
  stop("What are you trying to do here?")
}
