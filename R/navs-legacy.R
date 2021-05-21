#' Navigation items
#'
#' Create nav item(s) for use inside nav containers (e.g., [navs_tab()],
#' [navs_bar()], etc).
#'
#' @param title A title to display. Can be a character string or UI elements
#'   (i.e., HTML [htmltools::tags]).
#' @param ... UI elements (i.e., HTML [htmltools::tags]) to show when the nav
#'   item is selected.
#' @param value A character string to assign to the nav item. This value may be
#'   supplied to the relevant container's `selected` argument in order to show
#'   particular nav item's content immediately on page load. This value is also
#'   useful for programmatically updating the selected content via
#'   [nav_select()], [nav_hide()], etc (updating selected tabs this way is often
#'   useful for showing/hiding panels of content via other UI controls like
#'   [shiny::radioButtons()] -- in this scenario, consider using [nav_content()]
#'   with [navs_hidden()]).
#' @param icon Optional icon to appear next to the nav item's `title`.
#' @return A nav item that may be passed to a nav container (e.g. [navs_tab()]).
#' @export
#' @seealso [navs_tab]
#' @examples
#'
#' navs_tab(
#'   nav("A", "a"),
#'   nav("B", "b"),
#'   nav_menu(
#'     "More",
#'     nav("C", "c"),
#'     "-----",
#'     nav("D", "d")
#'   )
#' )
#'
#' plot_tag <- function(expr) {
#'   htmltools::plotTag(
#'     expr, alt = "R plot", width = 800,
#'     suppressSize = "x",
#'     attribs = list(width = "100%")
#'   )
#' }
#'
#' navs_pill(
#'   nav(
#'     "Volcano", plot_tag(image(volcano)),
#'     icon = if (require("shiny")) icon("r-project")
#'    ),
#'   nav(
#'     "Pressure", plot_tag(plot(pressure)),
#'     icon = if (require("shiny")) icon("github")
#'    )
#' )
nav <- function(title, ..., value = title, icon = NULL) {
  tabPanel(title, ..., value = title, icon = icon)
}

#' @rdname nav
#' @export
nav_menu <- function(title, ..., value = title, icon = NULL) {
  navbarMenu(title, ..., menuName = value, icon = icon)
}

#' @rdname nav
#' @export
nav_content <- function(value, ..., icon = NULL) {
  tabPanelBody(value, ..., icon = icon)
}

#' Navigation containers
#'
#' Render a collection of [nav()] items into a
#'
#' @inheritParams shiny::tabsetPanel
#' @export
#' @rdname navs
navs_tab <- function(..., id = NULL, selected = NULL,
                     header = NULL, footer = NULL) {
  tabs <- tabsetPanel(
    ..., type = "tabs", id = id, selected = selected,
    header = header, footer = footer
  )
  fragment(tabs)
}

#' @export
#' @rdname navs
navs_pill <- function(..., id = NULL, selected = NULL,
                      header = NULL, footer = NULL) {
  pills <- tabsetPanel(
    ..., type = "pills", id = id, selected = selected,
    header = header, footer = footer
  )
  fragment(pills)
}

#' @export
#' @rdname navs
navs_pill_list <- function(..., id = NULL, selected = NULL,
                           header = NULL, footer = NULL,
                           well = TRUE, fluid = TRUE,
                           widths = c(4, 8)) {
  pill_list <- navlistPanel(
    ..., id = id, selected = selected,
    header = header, footer = footer,
    well = well, fluid = fluid,
    widths = widths
  )
  fragment(pill_list)
}

#' @export
#' @rdname navs
navs_hidden <- function(..., id = NULL, selected = NULL,
                        header = NULL, footer = NULL) {
  hidden <- tabsetPanel(
    ..., type = "hidden", id = id, selected = selected,
    header = header, footer = footer
  )
  fragment(hidden)
}


#' @inheritParams shiny::navbarPage
#' @param bg a CSS color to use for the navbar's background color.
#' @param inverse Either `TRUE` for a light text color or `FALSE` for a dark
#'   text color. If `"auto"` (the default), the best contrast to `bg` is chosen.
#' @export
#' @rdname navs
navs_bar <- function(..., title = NULL, id = NULL, selected = NULL,
                     # TODO: add sticky-top as well?
                     position = c("static-top", "fixed-top", "fixed-bottom"),
                     header = NULL, footer = NULL,
                     bg = NULL, inverse = "auto",
                     collapsible = TRUE, fluid = TRUE) {

  if (identical(inverse, "auto")) {
    inverse <- TRUE
    if (!is.null(bg)) {
      bg <- htmltools::parseCssColors(bg)
      bg_contrast <- bs_get_contrast(bs_theme("navbar-bg" = bg), "navbar-bg")
      inverse <- col2rgb(bg_contrast)[1,] > 127.5
    }
  }

  navbar <- navbarPage(
    title = title, ..., id = id, selected = selected,
    position = match.arg(position),
    header = header, footer = footer, collapsible = collapsible,
    inverse = inverse, fluid = fluid
  )

  if (!is.null(bg)) {
    navbar <- tagAppendAttributes(
      navbar, .cssSelector = ".navbar",
      style = css(background_color = paste(bg, "!important"))
    )
  }

  fragment(navbar, page = bs_page)
}



# -----------------------------------------------------------------------
# 'Internal' tabset logic that was pulled directly from shiny/R/bootstrap.R
#  (with minor modifications)
# -----------------------------------------------------------------------

navbarPage <- function(title,
                       ...,
                       id = NULL,
                       selected = NULL,
                       position = c("static-top", "fixed-top", "fixed-bottom"),
                       header = NULL,
                       footer = NULL,
                       inverse = FALSE,
                       collapsible = FALSE,
                       fluid = TRUE,
                       theme = NULL,
                       windowTitle = title,
                       lang = NULL) {

  # alias title so we can avoid conflicts w/ title in withTags
  pageTitle <- title

  # navbar class based on options
  navbarClass <- "navbar navbar-default"
  position <- match.arg(position)
  if (!is.null(position))
    navbarClass <- paste0(navbarClass, " navbar-", position)
  if (inverse)
    navbarClass <- paste(navbarClass, "navbar-inverse")

  if (!is.null(id))
    selected <- shiny::restoreInput(id = id, default = selected)

  # build the tabset
  tabset <- buildTabset(..., ulClass = "nav navbar-nav", id = id, selected = selected)

  containerClass <- paste0("container", if (fluid) "-fluid")

  # built the container div dynamically to support optional collapsibility
  if (collapsible) {
    navId <- paste0("navbar-collapse-", p_randomInt(1000, 10000))
    containerDiv <- div(
      class = containerClass,
      div(
        class = "navbar-header",
        tags$button(
          type = "button",
          class = "navbar-toggle collapsed",
          `data-toggle` = "collapse",
          `data-target` = paste0("#", navId),
          span(class="sr-only", "Toggle navigation"),
          span(class = "icon-bar"),
          span(class = "icon-bar"),
          span(class = "icon-bar")
        ),
        span(class = "navbar-brand", pageTitle)
      ),
      div(
        class = "navbar-collapse collapse",
        id = navId, tabset$navList
      )
    )
  } else {
    containerDiv <- div(
      class = containerClass,
      div(
        class = "navbar-header",
        span(class = "navbar-brand", pageTitle)
      ),
      tabset$navList
    )
  }

  # build the main tab content div
  contentDiv <- div(class = containerClass)
  if (!is.null(header))
    contentDiv <- tagAppendChild(contentDiv, div(class = "row", header))
  contentDiv <- tagAppendChild(contentDiv, tabset$content)
  if (!is.null(footer))
    contentDiv <- tagAppendChild(contentDiv, div(class = "row", footer))

  # *Don't* wrap in bootstrapPage() (shiny::navbarPage()) does that part
  tagList(
    tags$nav(class = navbarClass, role = "navigation", containerDiv),
    contentDiv
  )
}

navbarMenu <- function(title, ..., menuName = title, icon = NULL) {
  icon <- prepTabIcon(icon)
  structure(
    list(
      title = title,
      menuName = menuName,
      tabs = list2(...),
      # Here for legacy reasons
      # https://github.com/cran/miniUI/blob/74c87d3/R/layout.R#L369
      iconClass = tagGetAttribute(icon, "class"),
      icon = icon
    ),
    class = "shiny.navbarmenu"
  )
}

isNavbarMenu <- function(x) {
  inherits(x, "shiny.navbarmenu")
}

tabPanel <- function(title, ..., value = title, icon = NULL) {
  icon <- prepTabIcon(icon)
  pane <- div(
    class = "tab-pane",
    title = title,
    `data-value` = value,
    # Here for legacy reasons
    # https://github.com/cran/miniUI/blob/74c87d/R/layout.R#L395
    `data-icon-class` = tagGetAttribute(icon, "class"),
    ...
  )
  attr(pane, "_shiny_icon") <- icon
  pane
}

isTabPanel <- function(x) {
  if (!inherits(x, "shiny.tag")) return(FALSE)
  class <- tagGetAttribute(x, "class") %||% ""
  "tab-pane" %in% strsplit(class, "\\s+")[[1]]
}

tabPanelBody <- function(value, ..., icon = NULL) {
  if (
    !is.character(value) ||
    length(value) != 1 ||
    any(is.na(value)) ||
    nchar(value) == 0
  ) {
    stop("`value` must be a single, non-empty string value")
  }
  tabPanel(title = NULL, ..., value = value, icon = icon)
}

tabsetPanel <- function(...,
                        id = NULL,
                        selected = NULL,
                        type = c("tabs", "pills", "hidden"),
                        header = NULL,
                        footer = NULL) {

  if (!is.null(id))
    selected <- shiny::restoreInput(id = id, default = selected)

  type <- match.arg(type)
  tabset <- buildTabset(..., ulClass = paste0("nav nav-", type), id = id, selected = selected)

  tags$div(
    class = "tabbable",
    !!!dropNulls(list(
      tabset$navList,
      header,
      tabset$content,
      footer
    ))
  )
}

navlistPanel <- function(...,
                         id = NULL,
                         selected = NULL,
                         header = NULL,
                         footer = NULL,
                         well = TRUE,
                         fluid = TRUE,
                         widths = c(4, 8)) {

  if (!is.null(id))
    selected <- shiny::restoreInput(id = id, default = selected)

  tabset <- buildTabset(
    ..., ulClass = "nav nav-pills nav-stacked",
    textFilter = function(text) tags$li(class = "navbar-brand", text),
    id = id, selected = selected
  )

  row <- if (fluid) shiny::fluidRow else shiny::fixedRow

  row(
    shiny::column(widths[[1]], class = if (well) "well", tabset$navList),
    shiny::column(
      widths[[2]],
      !!!dropNulls(list(header, tabset$content, footer))
    )
  )
}


# Helpers to build tabsetPanels (& Co.) and their elements
markTabAsSelected <- function(x) {
  attr(x, "selected") <- TRUE
  x
}

isTabSelected <- function(x) {
  isTRUE(attr(x, "selected", exact = TRUE))
}

containsSelectedTab <- function(tabs) {
  any(vapply(tabs, isTabSelected, logical(1)))
}

findAndMarkSelectedTab <- function(tabs, selected, foundSelected) {
  tabs <- lapply(tabs, function(x) {
    if (foundSelected || is.character(x)) {
      # Strings are not selectable items

    } else if (isNavbarMenu(x)) {
      # Recur for navbarMenus
      res <- findAndMarkSelectedTab(x$tabs, selected, foundSelected)
      x$tabs <- res$tabs
      foundSelected <<- res$foundSelected

    } else {
      # Base case: regular tab item. If the `selected` argument is
      # provided, check for a match in the existing tabs; else,
      # mark first available item as selected
      if (is.null(selected)) {
        foundSelected <<- TRUE
        x <- markTabAsSelected(x)
      } else {
        tabValue <- x$attribs$`data-value` %||% x$attribs$title
        if (identical(selected, tabValue)) {
          foundSelected <<- TRUE
          x <- markTabAsSelected(x)
        }
      }
    }
    return(x)
  })
  return(list(tabs = tabs, foundSelected = foundSelected))
}

prepTabIcon <- function(x = NULL) {
  if (is.null(x)) return(NULL)
  if (!inherits(x, "shiny.tag")) {
    stop(
      "`icon` must be a `shiny.tag` object. ",
      "Try passing `icon()` (or `tags$i()`) to the `icon` parameter.",
      call. = FALSE
    )
  }

  is_fa <- grepl("fa-", tagGetAttribute(x, "class") %||% "", fixed = TRUE)
  if (!is_fa) {
    return(x)
  }

  # for font-awesome we specify fixed-width
  tagAppendAttributes(x, class = "fa-fw")
}

# Text filter for navbarMenu's (plain text) separators
navbarMenuTextFilter <- function(text) {
  if (grepl("^\\-+$", text)) tags$li(class = "divider")
  else tags$li(class = "dropdown-header", text)
}

# This function is called internally by navbarPage, tabsetPanel
# and navlistPanel
buildTabset <- function(..., ulClass, textFilter = NULL, id = NULL,
                        selected = NULL, foundSelected = FALSE) {

  tabs <- dropNulls(list2(...))
  res <- findAndMarkSelectedTab(tabs, selected, foundSelected)
  tabs <- res$tabs
  foundSelected <- res$foundSelected

  # add input class if we have an id
  if (!is.null(id)) ulClass <- paste(ulClass, "shiny-tab-input")

  if (anyNamed(tabs)) {
    nms <- names(tabs)
    nms <- nms[nzchar(nms)]
    stop("Tabs should all be unnamed arguments, but some are named: ",
         paste(nms, collapse = ", "))
  }

  tabsetId <- p_randomInt(1000, 10000)
  tabs <- lapply(seq_len(length(tabs)), buildTabItem,
                 tabsetId = tabsetId, foundSelected = foundSelected,
                 tabs = tabs, textFilter = textFilter)

  tabNavList <- tags$ul(class = ulClass, id = id,
                        `data-tabsetid` = tabsetId, !!!lapply(tabs, "[[", "liTag"))

  tabContent <- tags$div(class = "tab-content",
                         `data-tabsetid` = tabsetId, !!!lapply(tabs, "[[", "divTag"))

  list(navList = tabNavList, content = tabContent)
}

# Builds tabPanel/navbarMenu items (this function used to be
# declared inside the buildTabset() function and it's been
# refactored for clarity and reusability). Called internally
# by buildTabset.
buildTabItem <- function(index, tabsetId, foundSelected, tabs = NULL,
                         divTag = NULL, textFilter = NULL) {

  divTag <- divTag %||% tabs[[index]]

  # Handles navlistPanel() headers and dropdown dividers
  if (is.character(divTag) && !is.null(textFilter)) {
    return(list(liTag = textFilter(divTag), divTag = NULL))
  }

  if (isNavbarMenu(divTag)) {
    # tabPanelMenu item: build the child tabset
    tabset <- buildTabset(
      !!!divTag$tabs, ulClass = "dropdown-menu",
      textFilter = navbarMenuTextFilter,
      foundSelected = foundSelected
    )
    return(buildDropdown(divTag, tabset))
  }

  if (isTabPanel(divTag)) {
    return(buildNavItem(divTag, tabsetId, index))
  }

  # The behavior is undefined at this point, so construct a condition message
  msg <- paste0(
    "Expected a collection `tabPanel()`s",
    if (is.null(textFilter)) " and `navbarMenu()`.",
    if (!is.null(textFilter)) ", `navbarMenu()`, and/or character strings.",
    " Consider using `header` or `footer` if you wish to place content above (or below) every panel's contents"
  )

  # Luckily this case has never worked, so it's safe to throw here
  # https://github.com/rstudio/shiny/issues/3313
  if (!inherits(divTag, "shiny.tag"))  {
    stop(msg, call. = FALSE)
  }

  # Unfortunately, this 'off-label' use case creates an 'empty' nav and includes
  # the divTag content on every tab. There shouldn't be any reason to be relying on
  # this behavior since we now have pre/post arguments, so throw a warning, but still
  # support the use case since we don't make breaking changes
  warning(msg, call. = FALSE)

  return(buildNavItem(divTag, tabsetId, index))
}

buildNavItem <- function(divTag, tabsetId, index) {
  id <- paste("tab", tabsetId, index, sep = "-")
  # Get title attribute directory (not via tagGetAttribute()) so that contents
  # don't get passed to as.character().
  # https://github.com/rstudio/shiny/issues/3352
  title <- divTag$attribs[["title"]]
  value <- divTag$attribs[["data-value"]]
  active <- isTabSelected(divTag)
  divTag <- tagAppendAttributes(divTag, class = if (active) "active")
  divTag$attribs$id <- id
  divTag$attribs$title <- NULL
  list(
    divTag = divTag,
    liTag = tagAddRenderHook(
      liTag(id, title, value, attr(divTag, "_shiny_icon")),
      function(x) {
        if (isTRUE(getCurrentThemeVersion() >= 4)) {
          tagQuery(x)$
            addClass("nav-item")$
            find("a")$
            addClass(c("nav-link", if (active) "active"))$
            allTags()
        } else {
          tagAppendAttributes(x, class = if (active) "active")
        }
      }
    )
  )
}

liTag <- function(id, title, value, icon) {
  tags$li(
    tags$a(
      href = paste0("#", id),
      `data-toggle` = "tab",
      `data-value` = value,
      icon, title
    )
  )
}

buildDropdown <- function(divTag, tabset) {

  navList <- tagAddRenderHook(
    tabset$navList,
    function(x) {
      if (isTRUE(getCurrentThemeVersion() >= 4)) {
        tagQuery(x)$
          find(".nav-item")$
          removeClass("nav-item")$
          find(".nav-link")$
          removeClass("nav-link")$
          addClass("dropdown-item")$
          allTags()
      } else {
        x
      }
    }
  )

  active <- containsSelectedTab(divTag$tabs)

  dropdown <- tags$li(
    class = "dropdown",
    tags$a(
      href = "#",
      class = "dropdown-toggle",
      `data-toggle` = "dropdown",
      `data-value` = divTag$menuName,
      divTag$icon,
      divTag$title,
      tags$b(class = "caret")
    ),
    navList,
    .renderHook = function(x) {
      if (isTRUE(getCurrentThemeVersion() >= 4)) {
        tagQuery(x)$
          addClass("nav-item")$
          find(".dropdown-toggle")$
          addClass("nav-link")$
          allTags()
      } else {
        x
      }
    }
  )

  list(
    divTag = tabset$content$children,
    liTag = dropdown
  )
}
