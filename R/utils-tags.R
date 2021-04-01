# Find and return the 1st tag with a certain class
#
# find_first_tag(list(div(), span(div(class = "foo", a())), div()))
#> <div class="foo"><a></a></div>
find_first_tag <- function(x, class) {
  # Implementation similar to sass:::find_bundle_or_layer()
  if (!is.list(x)) return(NULL)
  if (has_class(x, class)) return(x)
  for (item in x) {
    if (has_class(item, class)) return(item)
    tag <- find_first_tag(item, class = class)
    if (is_tag(tag)) return(tag)
  }
  return(NULL)
}

# A smarter tagAppendAttributes() that can append attributes to
# any tag(s) within a tree that has a certain class
#
# > tag_append_attrs(list(div(), div(class = "foo")), .class = "foo", class = "bar")

tag_append_attrs <- function(x, .class, ...) {
  func <- function(x) {
    if (has_class(x, .class)) tagAppendAttributes(x, ...) else x
  }
  rewrite_tags(x, func)
}

# Replace any tag(s) with a certain class with another tag
# > replace_tags(list(div(), div(class = "foo")), class = "foo", tag = span())
#   [[1]]
#   <div></div>
#
#   [[2]]
#   <span></span>
replace_tags <- function(x, class, tag) {
  func <- function(x) if (has_class(x, class)) tag else x
  rewrite_tags(x, func)
}

# preorder = TRUE version of htmltools:::rewriteTags()
rewrite_tags <- function(ui, func) {
  ui <- func(ui)
  if (is_tag(ui)) {
    ui$children[] <- lapply(ui$children, rewrite_tags, func)
  } else if (is.list(ui)) {
    ui[] <- lapply(ui, rewrite_tags, func)
  }
  ui
}

has_class <- function(x, class) {
  if (!is_tag(x)) return(FALSE)
  classes <- unlist(x$attribs[names(x$attribs) %in% "class"], use.names = FALSE)
  if (!length(classes)) return(FALSE)
  classes <- unlist(strsplit(classes, split = "\\s+"), use.names = FALSE)
  isTRUE(class %in% classes)
}

is_tag <- function(x) {
  inherits(x, "shiny.tag")
}

tag_require <- function(tag, version = 4, caller = "") {
  tagFunc <- tagFunction(function() {
    if (isTRUE(theme_version(bs_current_theme()) >= version))
      return(NULL)
    stop(
      caller, " requires Bootstrap", version, " or higher. ",
      "Please supply `bslib::bs_theme()` to the UI's page layout function ",
      "(e.g., `fluidPage(theme = bslib::bs_theme())`).",
      call. = FALSE
    )
  })
  tagAppendChild(tag, tagFunc)
}


coerce_to_tag <- function(x, ..., .tag_func = div) {
  if (is.character(x)) {
    x <- paste0(x, collapse = "\n")
    return(.tag_func(x, ...))
  }
  if (is_tag(x)) {
    # TODO: throw instead if x doesn't have attributes in ...?
    return(tagAppendAttributes(x, ...))
  }
  x
}
