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
#' @param fluid Whether or not to use a fluid or fixed (i.e., constrained width)
#'   layout.
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
#'     accordion(!!!items, id = "acc", autoclose = FALSE, fluid = FALSE)
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
    id <- paste0("accordion-", p_randomInt(1000, 10000))
  } else {
    class <- c("bslib-accordion-input", class)
  }

  # TODO: support bookmarking (i.e., shiny::restoreInput())
  children <- Map(
    children, is_selected,
    f = function(x, select) {

      if (autoclose) {
        x <- tagAppendAttributes(
          x, "data-bs-parent" = paste0("#", id),
          .cssSelector = ".accordion-collapse"
        )
      }

      tagAppendAttributes(
        x, class = if (select) "show" else "collapsed",
        .cssSelector = if (select) ".accordion-collapse" else ".accordion-button",
      )
    }
  )

  tag <- div(
    id = id,
    class = "accordion",
    class = class,
    style = htmltools::css(width = width, height = height),
    !!!attrs,
    !!!children,
    accordion_dependency()
  )

  # TODO: fix static render
  #tag <- tag_require(tag, version = 5, caller = "accordion()")

  as_fragment(tag)
}

#' @rdname accordion
#' @export
accordion_item <- function(title, ..., value = title, icon = NULL) {

  id <- paste0("item-", p_randomInt(1000, 10000))

  if (!is.null(icon)) {
    icon <- tagAppendAttributes(icon, style = "margin-right:0.5rem")
  }

  btn <- tags$button(
    # TODO: make this rounded in "standalone"/flush mode?
    class = "accordion-button",
    type = "button",
    "data-bs-toggle" = "collapse",
    "data-bs-target" = paste0("#", id),
    icon,
    title
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


accordion_dependency <- function() {
  htmlDependency(
    name = "bslib-accordion",
    version = get_package_version("bslib"),
    package = "bslib",
    src = "components",
    script = "accordion.js"
  )
}
