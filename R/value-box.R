#' Value box
#'
#' An opinionated ([card()]-powered) box, designed for displaying a `value` and
#' `title`. Optionally, a `showcase` can provide for context for what the
#' `value` represents (for example, it could hold a [bsicons::bs_icon()], or
#' even a [shiny::plotOutput()]).
#'
#' @param title,value A string, number, or [htmltools::tag()] child to display as
#'   the title or value of the value box. The `title` appears above the `value`.
#' @param ... Unnamed arguments may be any [htmltools::tag()] children to
#'   display below `value`. Named arguments become attributes on the containing
#'   element.
#' @param showcase A [htmltools::tag()] child to showcase (e.g., a
#'   [bsicons::bs_icon()], a `plotly::plotlyOutput()`, etc).
#' @param showcase_layout One of `"left center"` (default) or `"top right"`, or
#'   the showcase options provided by [showcase_left_center()] or
#'   [showcase_top_right()]. Use the showcase functions when you want to control
#'   the height and width of the showcase area.
#' @param theme_color A theme color to use for the background color. Should
#'   match a name in the Bootstrap Sass variable `$theme-colors` (e.g.,
#'   `"secondary"`, `"success"`, `"danger"`, etc).
#' @param class Utility classes for customizing the appearance of the summary
#'   card. Use `bg-*` and `text-*` classes (e.g, `"bg-danger"` and
#'   `"text-light"`) to customize the background/foreground colors.
#' @param fill Whether to allow the value box to grow/shrink to fit a fillable
#'   container with an opinionated height (e.g., `page_fillable()`).
#' @inheritParams card
#' @export
#' @seealso [card()]
#' @examples
#'
#' library(htmltools)
#'
#' if (interactive()) {
#'   value_box(
#'     "KPI Title",
#'     h1(HTML("$1 <i>Billion</i> Dollars")),
#'     span(
#'       bsicons::bs_icon("arrow-up"),
#'       " 30% VS PREVIOUS 30 DAYS"
#'     ),
#'     showcase = bsicons::bs_icon("piggy-bank"),
#'     class = "bg-success"
#'   )
#' }
value_box <- function(
  title,
  value,
  ...,
  showcase = NULL,
  showcase_layout = c("left center", "top right"),
  full_screen = FALSE,
  theme_color = NULL,
  height = NULL,
  max_height = NULL,
  fill = TRUE,
  class = NULL
) {

  args <- rlang::list2(...)
  argnames <- rlang::names2(args)

  attribs <- args[nzchar(argnames)]
  children <- args[!nzchar(argnames)]

  if (rlang::is_bare_character(title) || rlang::is_bare_numeric(title)) {
    title <- tags$p(title)
  }
  if (rlang::is_bare_character(value) || rlang::is_bare_numeric(value)) {
    value <- tags$p(value)
  }

  if (!is.null(title)) {
    title <- tag_add_outer_class(title, class = "value-box-title")
  }
  if (!is.null(value)) {
    value <- tag_add_outer_class(value, class = "value-box-value")
  }

  contents <- div(class = "value-box-area", title, value, !!!children)
  contents <- bindFillRole(contents, container = TRUE, item = TRUE)

  if (!is.null(showcase)) {
    if (is.character(showcase_layout)) {
      showcase_layout <- rlang::arg_match(showcase_layout)
      showcase_layout <- switch(
        showcase_layout,
        "left center" = showcase_left_center(),
        "top right" = showcase_top_right()
      )
    } else if (!inherits(showcase_layout, "bslib_showcase_layout")) {
      rlang::abort("`showcase_layout` must be a string or a `showcase_*()` layout")
    }
    contents <- layout_showcase(showcase_layout, showcase, contents)
  }

  style <- NULL

  if (is.null(theme_color)) {
    theme_color <- "default"
  } else {
    if (!rlang::is_string(theme_color)) {
      rlang::abort('`theme_color` must be a single value, e.g. "primary", "danger", "purple", etc.')
    }

    if (!grepl("^(text|bg)-", theme_color)) {
      theme_color <- paste0("bg-", theme_color)
    }
  }

  border_class <- value_box_auto_border_class(theme_color, class)

  res <- card(
    class = c(
      "bslib-value-box",
      theme_color,
      class,
      border_class,
      showcase_layout$class
    ),
    full_screen = full_screen,
    height = height,
    max_height = max_height,
    fill = fill,
    !!!attribs,
    contents,
    as.card_item(value_box_dependency())
  )

  as_fragment(tag_require(res, version = 5, caller = "value_box()"))
}

value_box_auto_border_class <- function(theme_color, class = NULL) {
  # We add .border-auto to value boxes that might benefit from a border.
  # These are disabled if `$bslib-value-box-enable-border` is set to `"never"`
  # and are ignored if `$bslib-value-box-enable-border` is set to `"always".
  # When `$bslib-value-box-enable-border` is set to `"auto"` (the default), we
  # add a border if the theme color changes only the text and not the background
  # and when shadows are disabled for the value boxes (via `$enable-shadows` or
  # `$bslib-value-box-enable-shadow`).

  if (!is.null(class) && grepl("border-?", class)) {
    # If the user does anything with the border, we don't get involved
    return(NULL)
  }

  if (identical(theme_color, "default")) {
    # Add border to default boxes (which generally don't have a bg color)
    return("border-auto")
  }

  theme <- paste(c(theme_color, class), collapse = " ")

  if (grepl("text-", theme) && !grepl("bg-", theme)) {
    # Add a border if the theme changes only text and not background
    return("border-auto")
  }

  # Otherwise disable borders
  return(NULL)
}

value_box_dependency <- function() {
  bs_dependency_defer(value_box_dependency_sass)
}

value_box_dependency_sass <- function(theme) {
  component_dependency_sass(theme, "value_box")
}

#' @param width, width_full_screen one of the following:
#'   * A proportion (i.e., a number between 0 and 1) of available width to
#'     allocate to the showcase.
#'   * A valid [CSS unit][htmltools::validateCssUnit] defining the width of the
#'     showcase column, or a valid value accepted by the `grid-template-columns`
#'     CSS property to define the width of the showcase column. Accepted values
#'     in the second category are `"auto"`, `"min-content"`, `"max-content"`, a
#'     fractional unit (e.g. `2fr`), or a `minmax()` function (e.g.,
#'     `minmax(100px, 1fr)`).
#' @param max_height,max_height_full_screen A proportion (i.e., a number between
#'   0 and 1) or any valid [CSS unit][htmltools::validateCssUnit] defining the
#'   showcase max_height.
#'
#' @export
#' @rdname value_box
showcase_left_center <- function(
  width = 0.3,
  max_height = "100px",
  max_height_full_screen = 0.67,
  width_full_screen = "1fr"
) {
  new_showcase_layout(
    class = "showcase-left-center",
    width = width,
    width_full_screen = width_full_screen,
    max_height = max_height,
    max_height_full_screen = max_height_full_screen
  )
}

#' @export
#' @rdname value_box
showcase_top_right <- function(
  width = 0.4,
  max_height = "75px",
  max_height_full_screen = 0.67,
  width_full_screen = "1fr"
) {
  new_showcase_layout(
    class = "showcase-top-right",
    width = width,
    width_full_screen = width_full_screen,
    max_height = max_height,
    max_height_full_screen = max_height_full_screen
  )
}

new_showcase_layout <- function(
  class,
  width = 0.3,
  width_full_screen = "1fr",
  max_height = "100px",
  max_height_full_screen = 0.67
) {
  width <- validate_grid_width_unit(width)
  width_full_screen <- validate_grid_width_unit(width_full_screen)

  max_height <- validate_height_unit(max_height)
  max_height_full_screen <- validate_height_unit(max_height_full_screen)

  structure(
    list(
      class = class,
      width = width,
      width_full_screen = width_full_screen,
      max_height = max_height,
      max_height_full_screen = max_height_full_screen
    ),
    class = "bslib_showcase_layout"
  )
}

#' @export
print.bslib_showcase_layout <- function(x, ...) {
  cat("<", x$class, ">\n", sep = "")
  cat("width: ", x$width, " [fs: ", x$width_full_screen, "]\n", sep = "")
  cat("max_height:", x$max_height, " [fs: ", x$max_height_full_screen, "]\n", sep = "")
  invisible(x)
}

layout_showcase <- function(showcase_layout, showcase, contents) {
  showcase_container <- div(
    class = "value-box-showcase",
    style = css(
      "---bslib-value-box-showcase-max-h" = showcase_layout$max_height,
      "---bslib-value-box-showcase-max-h-fs" = showcase_layout$max_height_full_screen
    ),
    showcase
  )

  card_body(
    style = css(padding = 0),
    layout_column_wrap(
      width = NULL, gap = 0,
      heights_equal = "row",
      class = "value-box-grid",
      style = css(
        "---bslib-value-box-showcase-w" = showcase_layout$width,
        "---bslib-value-box-showcase-w-fs" = showcase_layout$width_full_screen
      ),
      as_fill_carrier(showcase_container),
      contents
    )
  )
}


# It seems to be to use % over fr here since there is no gap on the grid
validate_grid_width_unit <- function(x) {
  if (!is_01_scalar(x)) {
    if (tolower(x) %in% c("auto", "min-content", "max-content")) {
      return(tolower(x))
    }
    if (grepl("^minmax\\(", x)) {
      return(x)
    }
    if (!grepl("\\d+\\s*fr", x)) {
      x <- validateCssUnit(x)
    }
    return(x)
  }
  paste0(100 * x, "%")
}

validate_height_unit <- function(x) {
  if (!is_01_scalar(x)) {
    return(validateCssUnit(x))
  }
  paste0(100 * x, "%")
}

is_01_scalar <- function(x) {
  rlang::is_scalar_double(x) && x >= 0 && x <= 1
}
