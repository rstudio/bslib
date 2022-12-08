#' Create a vertically collapsing accordion
#'
#' @param ... Named arguments become attributes on the `<div class="accordion">`
#'   element. Unnamed arguments should be `accordion_item()`s.
#' @param id If provided, you can use `input$id` in your server logic to
#'   determine which of the `accordion_item()`s are currently active. The value
#'   will correspond to the `accordion_item()`'s `value` argument.
#' @param selected A character vector of `accordion_item()` `value`s to
#'   select/show by default. The default value of `NULL` will select the first
#'   `accordion_item()`. Use a special value of `I("all")` ( or `I("none")`) to
#'   select all (or none) of the items. It's only possible to select more than
#'   one item when `autoclose=FALSE`.
#' @param autoclose Upon clicking a new `accordion_item()`, should the
#'   previously active one close?
#' @param class Additional CSS classes to include on the accordion div.
#' @param width,height Any valid CSS unit; for example, height="100%".
#'
#' @references <https://getbootstrap.com/docs/5.2/components/accordion/>
#'
#' @export
#' @examples
#'
#' items <- lapply(LETTERS, function(x) {
#'   accordion_item(paste("Section", x), paste("Some narrative for section", x))
#' })
#'
#' # First shown by default
#' accordion(!!!items)
#' # Nothing shown by default
#' accordion(!!!items, selected = I("none"))
#' # Everything shown by default
#' accordion(!!!items, selected = I("all"))
#'
#' # Show particular sections
#' accordion(!!!items, selected = "Section B")
#' accordion(!!!items, selected = c("Section A", "Section B"))
#'
#' # Provide an id to create a shiny input binding
#' if (interactive()) {
#'   library(shiny)
#'
#'   ui <- page_fluid(
#'     accordion(!!!items, id = "acc", fluid = FALSE)
#'   )
#'
#'   server <- function(input, output) {
#'     observe(print(input$acc))
#'   }
#'
#'   shinyApp(ui, server)
#' }
#'
accordion <- function(..., id = NULL, selected = NULL, autoclose = FALSE, class = NULL, width = NULL, height = NULL) {

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attrs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  if (isNamespaceLoaded("shiny")) {
    selected <- shiny::restoreInput(id = id, default = selected)
  }

  is_selected <- vapply(children, function(x) {
    isTRUE(tagGetAttribute(x, "data-value") %in% selected) || identical(selected, I("all"))
  }, logical(1))

  if (!any(is_selected) && !identical(selected, I("none"))) {
    is_selected[1] <- TRUE
  }

  if (autoclose && sum(is_selected) > 1) {
    stop("Can't select more than one item when `autoclose = TRUE`")
  }

  # Since autoclose=TRUE requires an id, we always include one,
  # but only create a binding when it's provided
  if (is.null(id)) {
    id <- paste0("bslib-accordion-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-accordion-input", class)
  }

  children <- Map(
    children, is_selected,
    f = function(x, select) {

      if (autoclose) {
        x <- tagAppendAttributes(
          x, "data-bs-parent" = paste0("#", id),
          .cssSelector = ".accordion-collapse"
        )
      }

      # accordion_item() defaults to a collapsed state
      if (select) {
        tq <- tagQuery(x)
        tq$find(".accordion-collapse")$addClass("show")
        tq$find(".accordion-button")$removeClass("collapsed")$removeAttrs("aria-expanded")$addAttrs("aria-expanded" = "true")
        x <- tq$allTags()
      }

      x
    }
  )

  tag <- div(
    id = id,
    class = "accordion",
    class = if (autoclose) "autoclose", # just for ease of identifying autoclosing client-side
    class = class,
    style = css(
      width = validateCssUnit(width),
      height = validateCssUnit(height)
    ),
    !!!attrs,
    !!!children,
    accordion_dependency()
  )

  tag <- tag_require(tag, version = 5, caller = "accordion()")

  as_fragment(tag)
}

#' @rdname accordion
#' @param title A title to appear in the `accordion_item()`'s header.
#' @param value A character string that uniquely identifies this item.
#' @param icon A [htmltools::tag] child (e.g., [bsicons::bs_icon()]) which is positioned just before the `title`.
#' @export
accordion_item <- function(title, ..., value = title, icon = NULL) {

  id <- paste0("bslib-accordion-item-", p_randomInt(1000, 10000))

  btn <- tags$button(
    class = "accordion-button collapsed",
    type = "button",
    "data-bs-toggle" = "collapse",
    "data-bs-target" = paste0("#", id),
    "aria-expanded" = "false",
    "aria-controls" = id,
    style = css(gap = "0.5rem"),
    div(class = "accordion-icon", icon),
    div(class = "accordion-title", title)
  )

  if (!rlang::is_string(value)) stop("`value` must be a string")

  div(
    class = "accordion-item",
    "data-value" = value,
    # TODO: can we provide a way to put more stuff in the header? Like maybe some right-aligned controls?
    h2(class = "accordion-header", btn),
    div(
      id = id,
      class = "accordion-collapse collapse",
      div(class = "accordion-body", ...)
    )
  )
}

#' Dynamically update accordions
#'
#' Functions for dynamically updating nav containers (e.g., select, insert, and
#' remove nav items). These functions require an `id` on the nav container to be
#' specified and must be called within an active Shiny session.
#'
#' @param id an character string that matches an existing [accordion()]'s `id`.
#' @param selected a character string used to identify a particular [accordion_item()].
#' @param close whether to close non-`selected` [accordion_item()]s. Note that `close=FALSE` won't be respected when the [accordion()] has `autoclose=TRUE`.
#' @param session a shiny session object (the default should almost always be used).
#' @export
accordion_select <- function(id, selected, close = TRUE, session = get_current_session()) {

  force(selected)
  if (!rlang::is_scalar_logical(close)) stop("`close` must be a logical value.")

  callback <- function() {
    message <- list(
      method = "select",
      value = as.list(as.character(selected)),
      close = close
    )
    session$sendInputMessage(id, message)
  }

  session$onFlush(callback, once = TRUE)
}

#' @param item an [accordion_item()].
#' @param target The `value` of an existing `item` to insert next to. If removing: the `value` of the [accordion_item()] to remove.
#' @param position Should `item` be added before or after the target?
#' @rdname accordion_select
#' @export
accordion_insert <- function(id, item, target = NULL, position = c("after", "before"), session = get_current_session()) {

  force(target)
  position <- match.arg(position)

  callback <- function() {
    message <- dropNulls(list(
      method = "insert",
      item = processDeps(item, session),
      target = target,
      position = position
    ))
    session$sendInputMessage(id, message)
  }

  session$onFlush(callback, once = TRUE)
}

#' @rdname accordion_select
#' @export
accordion_remove <- function(id, target, session = get_current_session()) {

  if (length(target) == 0) stop("`target` must have length greater than 0.")

  callback <- function() {
    msg <- list(
      method = "remove",
      target = as.list(as.character(target))
    )
    session$sendInputMessage(id, msg)
  }

  session$onFlush(callback, once = TRUE)
}


#' @rdname accordion_select
#' @inheritParams accordion_item
#' @export
accordion_replace <- function(id, target, ..., title = NULL, value = NULL, icon = NULL, session = get_current_session()) {

  body <- rlang::list2(...)
  body <- if (length(body) == 0) NULL else body

  force(target)
  force(value)
  force(title)
  force(icon)

  callback <- function() {
    message <- dropNulls(list(
      method = "mutate",
      target = target,
      value = value,
      body = if (!is.null(body)) processDeps(body, session),
      title = if (!is.null(title)) processDeps(title, session),
      icon = if (!is.null(icon)) processDeps(icon, session)
    ))
    session$sendInputMessage(id, message)
  }

  session$onFlush(callback, once = TRUE)
}

accordion_dependency <- function() {
  htmlDependency(
    name = "bslib-accordion",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components",
    script = "accordion.js"
  )
}
