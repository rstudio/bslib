#' Create navigation items
#'
#' @inheritParams shiny::tabPanel
#' @export
#' @seealso [navs_tab]
nav <- function(title, ..., value = title, icon = NULL) {
  tabPanel(title, ..., value = title, icon = icon)
}


#' @param menuName A name that identifies this `navbarMenu`. This
#'   is needed if you want to insert/remove or show/hide an entire
#'   `navbarMenu`.
#' @export
nav_menu <- function(title, ..., value = title, icon = NULL) {
  navbarMenu(title, ..., menuName = value, icon = icon)
}


#' Create a navigation panel
#'
#' Render a collection of [nav()] items into a panel of contents.
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
#' @export
#' @rdname navs
navs_bar <- function(..., title = NULL, id = NULL, selected = NULL,
                     # TODO: add sticky-top as well?
                     position = c("static-top", "fixed-top", "fixed-bottom"),
                     header = NULL, footer = NULL, collapsible = TRUE, bg = NULL) {

  inverse <- TRUE
  if (!is.null(bg)) {
    bg <- htmltools::parseCssColors(bg)
    bg_contrast <- bs_get_contrast(bs_theme("navbar-bg" = bg), "navbar-bg")
    inverse <- col2rgb(bg_contrast)[1,] > 127.5
  }

  # TODO: throw if we detect theme, lang, etc?
  navbar <- navbarPage(
    title = title, ..., id = id, selected = selected,
    position = match.arg(position), header = header, footer = footer,
    collapsible = collapsible, inverse = inverse
  )

  if (!is.null(bg)) {
    navbar <- tag_append_attrs(
      navbar, "navbar",
      style = css(background_color = paste(bg, "!important"))
    )
  }

  fragment(navbar, page = bs_page)
}



# -----------------------------------------------------------------------
# 'Internal' tabset logic that was pulled directly from shiny/R/bootstrap.R
#  (with minor modifications)
# TODO: make sure this code isn't being used elsewhere inside shiny
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
  # TODO: tagFunction() the navbar logic?
  navbarClass <- "navbar navbar-default"
  position <- match.arg(position)
  if (!is.null(position))
    navbarClass <- paste0(navbarClass, " navbar-", position)
  if (inverse)
    navbarClass <- paste(navbarClass, "navbar-inverse")

  if (!is.null(id))
    selected <- restoreInput(id = id, default = selected)

  # build the tabset
  tabset <- buildTabset(..., ulClass = "nav navbar-nav", id = id, selected = selected)

  containerClass <- paste0("container", if (fluid) "-fluid")

  # built the container div dynamically to support optional collapsibility
  if (collapsible) {
    navId <- paste0("navbar-collapse-", p_randomInt(1000, 10000))
    containerDiv <- div(class=containerClass,
                        div(class="navbar-header",
                            tags$button(type="button", class="navbar-toggle collapsed",
                                        `data-toggle`="collapse", `data-target`=paste0("#", navId),
                                        span(class="sr-only", "Toggle navigation"),
                                        span(class="icon-bar"),
                                        span(class="icon-bar"),
                                        span(class="icon-bar")
                            ),
                            span(class="navbar-brand", pageTitle)
                        ),
                        div(class="navbar-collapse collapse", id=navId, tabset$navList)
    )
  } else {
    containerDiv <- div(class=containerClass,
                        div(class="navbar-header",
                            span(class="navbar-brand", pageTitle)
                        ),
                        tabset$navList
    )
  }

  # build the main tab content div
  contentDiv <- div(class=containerClass)
  if (!is.null(header))
    contentDiv <- tagAppendChild(contentDiv, div(class="row", header))
  contentDiv <- tagAppendChild(contentDiv, tabset$content)
  if (!is.null(footer))
    contentDiv <- tagAppendChild(contentDiv, div(class="row", footer))

  # build the page
  shiny::bootstrapPage(
    title = windowTitle,
    theme = theme,
    lang = lang,
    tags$nav(class=navbarClass, role="navigation", containerDiv),
    contentDiv
  )
}

navbarMenu <- function(title, ..., menuName = title, icon = NULL) {
  structure(list(title = title,
                 menuName = menuName,
                 tabs = list2(...),
                 # TODO: new approach?
                 iconClass = shiny:::iconClass(icon)),
            class = "shiny.navbarmenu")
}

isNavbarMenu <- function(x) {
  inherits(x, "shiny.navbarmenu")
}


tabPanel <- function(title, ..., value = title, icon = NULL) {
  div(
    class = "tab-pane",
    title = title,
    `data-value` = value,
    `data-icon-class` = iconClass(icon),
    ...
  )
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
  # Implementation
  if (!is.null(id))
    selected <- restoreInput(id = id, default = selected)

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
    selected <- restoreInput(id = id, default = selected)

  tabset <- buildTabset(
    ..., ulClass = "nav nav-pills nav-stacked",
    textFilter = function(text) tags$li(class = "navbar-brand", text),
    id = id, selected = selected
  )

  row <- if (fluid) fluidRow else fixedRow

  row(
    column(widths[[1]], class = if (well) "well", tabset$navList),
    column(
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

# Returns the icon object (or NULL if none), provided either a
# tabPanel, OR the icon class
getIcon <- function(tab = NULL, iconClass = NULL) {
  if (!is.null(tab)) iconClass <- tab$attribs$`data-icon-class`
  if (!is.null(iconClass)) {
    if (grepl("fa-", iconClass, fixed = TRUE)) {
      # for font-awesome we specify fixed-width
      iconClass <- paste(iconClass, "fa-fw")
    }
    icon(name = NULL, class = iconClass)
  } else NULL
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
  icon <- getIcon(iconClass = divTag$attribs[["data-icon-class"]])
  active <- isTabSelected(divTag)
  divTag <- tagAppendAttributes(divTag, class = if (active) "active")
  divTag$attribs$id <- id
  divTag$attribs$title <- NULL
  list(
    divTag = divTag,
    liTag = tagAddRenderHook(
      liTag(id, title, value, icon),
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
      getIcon(iconClass = divTag$iconClass),
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
