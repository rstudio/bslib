#' Value box
#'
#' @description
#' `r lifecycle::badge("experimental")`
#'
#' An opinionated ([card()]-powered) box, designed for displaying a `value` and
#' `title`. Optionally, a `showcase` can provide for context for what the
#' `value` represents (for example, it could hold a [bsicons::bs_icon()], or
#' even a [shiny::plotOutput()]).
#'
#' @section Build a Box App:
#'
#'   Explore all of the `value_box()` options and layouts interactively with the
#'   [Build a Box app](https://bslib.shinyapps.io/build-a-box/), available
#'   online thanks to [shinyapps.io](https://www.shinyapps.io/). Or, you can
#'   run the app locally with:
#'
#'   ```r
#'   shiny::runApp(system.file("examples", "build-a-box", package = "bslib"))
#'   ```
#'
#' @section Themes:
#'
#'   ```{r child="man/fragments/value-box-themes.Rmd"}
#'   ```
#'
#' @section Showcase Layouts:
#'
#'   ```{r child="man/fragments/value-box-showcase.Rmd"}
#'   ```
#'
#' @param title,value A string, number, or [htmltools::tag()] child to display as
#'   the title or value of the value box. The `title` appears above the `value`.
#' @param ... Unnamed arguments may be any [htmltools::tag()] children to
#'   display below `value`. Named arguments become attributes on the containing
#'   element.
#' @param showcase A [htmltools::tag()] child to showcase (e.g., a
#'   [bsicons::bs_icon()], a `plotly::plotlyOutput()`, etc).
#' @param showcase_layout One of `"left center"` (default), `"top right"` or
#'   `"bottom"`. Alternatively, you can customize the showcase layout options
#'   with the [showcase_left_center()], [showcase_top_right()], or
#'   [showcase_bottom()] functions. Use the options functions when you want to
#'   control the height or width of the showcase area.
#' @param theme The name of a theme for the value box, or a theme constructed
#'   with `value_box_theme()`. The theme names provide a convenient way to use
#'   your app's Bootstrap theme colors as the foreground or background colors of
#'   the value box. See below for more details on the provided themes. For more
#'   control, you can create your own theme with `value_box_theme()` where you
#'   can pass foreground and background colors directly. See the **Themes**
#'   section for more details.
#' @param class Utility classes for customizing the appearance of the summary
#'   card. Use `bg-*` and `text-*` classes (e.g, `"bg-danger"` and
#'   `"text-light"`) to customize the background/foreground colors.
#' @param fill Whether to allow the value box to grow/shrink to fit a fillable
#'   container with an opinionated height (e.g., `page_fillable()`).
#' @inheritParams card
#' @param theme_color `r lifecycle::badge("deprecated")` Use `theme` instead.
#'
#' @examplesIf rlang::is_interactive()
#' library(htmltools)
#'
#' value_box(
#'   "KPI Title",
#'   h1(HTML("$1 <i>Billion</i> Dollars")),
#'   span(
#'     bsicons::bs_icon("arrow-up"),
#'     " 30% VS PREVIOUS 30 DAYS"
#'   ),
#'   showcase = bsicons::bs_icon("piggy-bank"),
#'   theme = "success"
#' )
#'
#' @seealso [card()]
#' @export
value_box <- function(
  title,
  value,
  ...,
  showcase = NULL,
  showcase_layout = c("left center", "top right", "bottom"),
  full_screen = FALSE,
  theme = NULL,
  height = NULL,
  max_height = NULL,
  fill = TRUE,
  class = NULL,
  theme_color = deprecated()
) {
  dots <- separate_arguments(...)
  attribs <- dots$attribs
  children <- dots$children

  # ---- Title and value ----
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

  # ---- Contents ----
  contents <- div(class = "value-box-area", title, value, !!!children)
  contents <- as_fill_carrier(contents)

  # ---- Showcase ----
  if (!is.null(showcase)) {
    showcase_layout <- resolve_showcase_layout(showcase_layout)
    contents <- render_showcase_layout(showcase_layout, showcase, contents)
  }

  # ---- Theme ----
  if (lifecycle::is_present(theme_color)) {
    lifecycle::deprecate_soft(
      "0.6.0",
      "value_box(theme_color =)",
      "value_box(theme =)",
      details = if (!missing(theme)) {
        "Both `theme` and `theme_color` were provided, but only the `theme` argument will be used."
      }
    )

    if (missing(theme)) {
      theme <- theme_color
    }
  }

  if (!inherits(theme, "bslib_value_box_theme")) {
    theme <- value_box_theme(theme)
  }

  border_class <- value_box_auto_border_class(theme, class)

  # ---- Layout ----
  res <- card(
    class = c(
      "bslib-value-box",
      theme$class,
      class,
      border_class,
      if (!is.null(showcase)) showcase_layout$class
    ),
    full_screen = full_screen,
    height = height,
    max_height = max_height,
    fill = fill,
    style = css(
      color = theme$fg,
      background_color = theme$bg,
      # These variables are used by the full screen card button
      "--bslib-color-fg" = theme$fg,
      "--bslib-color-bg" = theme$bg
    ),
    !!!attribs,
    contents
  )

  as_fragment(tag_require(res, version = 5, caller = "value_box()"))
}

value_box_auto_border_class <- function(theme, class = NULL) {
  # We add .border-auto to value boxes that might benefit from a border.
  # These are disabled if `$bslib-value-box-enable-border` is set to `"never"`
  # and are ignored if `$bslib-value-box-enable-border` is set to `"always".
  # When `$bslib-value-box-enable-border` is set to `"auto"` (the default), we
  # add a border if the theme color changes only the text and not the background
  # and when shadows are disabled for the value boxes (via `$enable-shadows` or
  # `$bslib-value-box-enable-shadow`).

  if (!is.null(class) && any(grepl("border", class))) {
    # If the user does anything with the border, we don't get involved
    return(NULL)
  }

  if (identical(theme$class, "default") && is.null(class)) {
    # Add border to default boxes (which generally don't have a bg color)
    return("border-auto")
  }

  all_classes <- paste(c(theme$class, class), collapse = " ")

  sets_foreground <- grepl("text-", all_classes) || !is.null(theme$fg)
  sets_background <- grepl("bg-", all_classes) || !is.null(theme$bg)

  if (sets_foreground && !sets_background) {
    # Add a border if the theme changes only text and not background
    return("border-auto")
  }

  return(NULL)
}

#' @param name The name of the theme, e.g. `"primary"`, `"danger"`, `"purple"`.
#' @param bg,fg The background and foreground colors for the theme. If only `bg`
#'   is provided, then the foreground color is automatically chosen from
#'   `$black` or `$white` to provide the best contrast with the background
#'   color.
#'
#' @rdname value_box
#' @export
value_box_theme <- function(name = NULL, bg = NULL, fg = NULL) {
  if (is.null(name)) {
    if (is.null(bg)) {
      name <- "default"
    } else {
      # don't warn if we can't get a contrast color, `bg` might be valid
      # CSS but not something sass can compute on
      fg <- fg %||% suppressWarnings(get_color_contrast(bg))
    }

    return(new_value_box_theme(name, bg, fg))
  }

  if (!rlang::is_string(name)) {
    rlang::abort('`theme` must be a single value, e.g. "primary", "danger", "purple", etc.')
  }

  if (!grepl("^(text|bg)-", name)) {
    name <- paste0("bg-", name)
  }

  new_value_box_theme(name, bg, fg)
}

new_value_box_theme <- function(class = NULL, bg = NULL, fg = NULL) {
  structure(
    list(
      class = class,
      fg = fg,
      bg = bg
    ),
    class = "bslib_value_box_theme"
  )
}

#' @param width,width_full_screen,height,height_full_screen one of the
#'   following:
#'   * A proportion (i.e., a number between 0 and 1) of available width or
#'     height to allocate to the showcase.
#'   * A valid [CSS unit][htmltools::validateCssUnit] defining the width or
#'     height of the showcase column, or a valid value accepted by the
#'     `grid-template-columns` (width) or `grid-template-rows` (height) CSS
#'     property to define the width or height of the showcase column or row.
#'     Accepted values in the second category are `"auto"`, `"min-content"`,
#'     `"max-content"`, a fractional unit (e.g. `2fr`), or a `minmax()` function
#'     (e.g., `minmax(100px, 1fr)`).
#' @param max_height,max_height_full_screen A proportion (i.e., a number between
#'   0 and 1) or any valid [CSS unit][htmltools::validateCssUnit] defining the
#'   showcase max_height.
#'
#' @export
#' @rdname value_box
showcase_left_center <- function(
  width = 0.3,
  width_full_screen = "1fr",
  max_height = "100px",
  max_height_full_screen = 0.67
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
  width_full_screen = "1fr",
  max_height = "75px",
  max_height_full_screen = 0.67
) {
  new_showcase_layout(
    class = "showcase-top-right",
    width = width,
    width_full_screen = width_full_screen,
    max_height = max_height,
    max_height_full_screen = max_height_full_screen
  )
}

#' @export
#' @rdname value_box
showcase_bottom <- function(
  width = "100%",
  width_full_screen = NULL,
  height = "auto",
  height_full_screen = "2fr",
  max_height = "100px",
  max_height_full_screen = NULL
) {
  new_showcase_layout(
    class = "showcase-bottom",
    width = width,
    width_full_screen = width_full_screen,
    height = height,
    height_full_screen = height_full_screen,
    max_height = max_height,
    max_height_full_screen = max_height_full_screen
  )
}

new_showcase_layout <- function(
  class,
  width = 0.3,
  width_full_screen = "1fr",
  height = NULL,
  height_full_screen = NULL,
  max_height = "100px",
  max_height_full_screen = 0.67
) {
  width <- validate_grid_unit(width)
  width_full_screen <- validate_grid_unit(width_full_screen)

  height <- validate_grid_unit(height)
  height_full_screen <- validate_grid_unit(height_full_screen)

  max_height <- validate_height_unit(max_height)
  max_height_full_screen <- validate_height_unit(max_height_full_screen)

  structure(
    list(
      class = class,
      width = width,
      width_full_screen = width_full_screen,
      height = height,
      height_full_screen = height_full_screen,
      max_height = max_height,
      max_height_full_screen = max_height_full_screen
    ),
    class = "bslib_showcase_layout"
  )
}

resolve_showcase_layout <- function(showcase_layout) {
  if (inherits(showcase_layout, "bslib_showcase_layout")) {
    return(showcase_layout)
  }

  if (is.character(showcase_layout)) {
    layout_choices <- c("left center", "top right", "bottom")
    showcase_layout <- rlang::arg_match(showcase_layout, layout_choices)
    showcase_layout <- switch(
      showcase_layout,
      "left center" = showcase_left_center(),
      "top right" = showcase_top_right(),
      bottom = showcase_bottom()
    )
    return(showcase_layout)
  }

  rlang::abort("`showcase_layout` must be a string or a `showcase_*()` layout")
}

render_showcase_layout <- function(showcase_layout, showcase, contents) {
  stopifnot(inherits(showcase_layout, "bslib_showcase_layout"))

  showcase <- div(class = "value-box-showcase", showcase)
  showcase <- as_fill_carrier(showcase)

  grid_props <- css(
    "--bslib-grid-height" = "auto",
    "--bslib-grid-height-mobile" = "auto",
    # These are private variables but css() can't handle _ prefix yet
    # FIXME: rstudio/htmltools#397
    "---bslib-value-box-showcase-w" = showcase_layout$width,
    "---bslib-value-box-showcase-w-fs" = showcase_layout$width_full_screen,
    "---bslib-value-box-showcase-h" = showcase_layout$height,
    "---bslib-value-box-showcase-h-fs" = showcase_layout$height_full_screen,
    "---bslib-value-box-showcase-max-h" = showcase_layout$max_height,
    "---bslib-value-box-showcase-max-h-fs" = showcase_layout$max_height_full_screen
  )

  value_box_grid <- div(
    class = "value-box-grid",
    style = grid_props,
    showcase, # .value-box-showcase
    contents  # .value-box-area (prepared in value_box())
  )

  card_body(
    style = css(padding = 0),
    fillable = TRUE,
    as_fill_item(value_box_grid)
  )
}


# It seems to be to use % over fr here since there is no gap on the grid
validate_grid_unit <- function(x) {
  if (is.null(x)) return(x)

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
  if (is.null(x)) return(x)

  if (!is_01_scalar(x)) {
    return(validateCssUnit(x))
  }
  paste0(100 * x, "%")
}

is_01_scalar <- function(x) {
  rlang::is_scalar_double(x) && x >= 0 && x <= 1
}

# Print methods ---------------------------------------

#' @export
print.bslib_value_box_theme <- function(x, ...) {
  cat("<bslib_value_box_theme>\n")
  if (!is.null(x$class)) {
    cat("theme: ", x$class, "\n", sep = "")
  }
  if (!is.null(x$bg)) {
    cat("background-color: ", x$bg, "\n", sep = "")
  }
  if (!is.null(x$fg)) {
    cat("color: ", x$fg, "\n", sep = "")
  }
  invisible(x)
}

#' @export
print.bslib_showcase_layout <- function(x, ...) {
  cat("<", x$class, ">\n", sep = "")

  fields <- c("width", "height", "max_height")
  unset <- "---"
  nchar_fields <- max(nchar(fields))
  nchar_value <- max(vapply(dropNulls(x[fields]), nchar, integer(1)))

  if (any(vapply(x[fields], is.null, logical(1)))) {
    nchar_value <- max(nchar_value, nchar(unset))
  }

  for (field in fields) {
    t_field <- format(paste0(field, ": "), width = nchar_fields + 2, align = "left")
    t_value <- format(x[[field]] %||% unset, width = nchar_value, align = "right")
    t_value_fs <- x[[paste0(field, "_full_screen")]] %||% unset

    cat(t_field, t_value, " [fs: ", t_value_fs, "]\n", sep = "")
  }

  invisible(x)
}
