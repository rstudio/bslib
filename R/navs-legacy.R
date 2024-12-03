#' Navigation containers
#'
#' Render a collection of [nav_panel()] items into a container.
#'
#' @section Examples:
#'
#' ```{r child="man/fragments/ex-navset_tab.Rmd"}
#' ```
#'
#' @param ... a collection of [nav_panel()] items.
#' @param id a character string used for dynamically updating the container (see
#'    [nav_select()]).
#' @param selected a character string matching the `value` of a particular
#'   [nav_panel()] item to selected by default.
#' @param header UI element(s) ([htmltools::tags]) to display _above_ the nav
#'   content. For `card`-based navsets, these elements are implicitly wrapped in
#'   a `card_body()`. To control things like `padding`, `fill`, etc., wrap the
#'   elements in an explicit [card_body()].
#' @param footer UI element(s) ([htmltools::tags]) to display _below_ the nav
#'   content. For `card`-based navsets, these elements are implicitly wrapped in
#'   a `card_body()`. To control things like `padding`, `fill`, etc., wrap the
#'   elements in an explicit [card_body()].
#'
#' @seealso [nav_panel()], [nav_panel_hidden()] create panels of content.
#' @seealso [nav_menu()], [nav_item()], [nav_spacer()] create menus, items, or
#'   space in the navset control area.
#' @seealso [nav_insert()], [nav_remove()] programmatically add or remove nav
#'   panels.
#' @seealso [nav_select()], [nav_show()], [nav_hide()] change the state of a
#'   [nav_panel()] in a navset.
#'
#' @family Panel container functions
#' @rdname navset
#' @name navset
#' @export
navset_tab <- function(..., id = NULL, selected = NULL,
                     header = NULL, footer = NULL) {
  tabs <- tabsetPanel_(
    ..., type = "tabs", id = id, selected = selected,
    header = header, footer = footer
  )
  as_fragment(tabs)
}

#' @export
#' @rdname navset
navset_pill <- function(..., id = NULL, selected = NULL,
                      header = NULL, footer = NULL) {
  pills <- tabsetPanel_(
    ..., type = "pills", id = id, selected = selected,
    header = header, footer = footer
  )
  as_fragment(pills)
}

#' @export
#' @rdname navset
navset_underline <- function(
  ...,
  id = NULL,
  selected = NULL,
  header = NULL,
  footer = NULL
) {
  res <- tabsetPanel_(
    ..., type = "underline", id = id, selected = selected,
    header = header, footer = footer
  )
  as_fragment(res)
}

#' @export
#' @inheritParams shiny::navlistPanel
#' @rdname navset
navset_pill_list <- function(..., id = NULL, selected = NULL,
                           header = NULL, footer = NULL,
                           well = TRUE, fluid = TRUE,
                           widths = c(4, 8)) {
  pill_list <- navlistPanel_(
    ..., id = id, selected = selected,
    header = header, footer = footer,
    well = well, fluid = fluid,
    widths = widths
  )
  as_fragment(pill_list)
}

#' @export
#' @rdname navset
navset_hidden <- function(..., id = NULL, selected = NULL,
                        header = NULL, footer = NULL) {
  hidden <- tabsetPanel_(
    ..., type = "hidden", id = id, selected = selected,
    header = header, footer = footer
  )
  as_fragment(hidden)
}

#' @inheritParams shiny::navbarPage
#' @inheritParams page_fillable
#' @param sidebar A [sidebar()] component to display on every [nav_panel()]
#'   page.
#' @param fillable Whether or not to allow `fill` items to grow/shrink to fit
#'   the browser window. If `TRUE`, all [nav_panel()] pages are `fillable`. A
#'   character vector, matching the `value` of [nav_panel()]s to be filled, may
#'   also be provided. Note that, if a `sidebar` is provided, `fillable` makes
#'   the main content portion fillable.
#' @param navbar_options Options to control the appearance and behavior of the
#'   navbar. Use [navbar_options()] to create the list of options.
#' @param position `r lifecycle::badge("deprecated")` Please use 
#'   [`navbar_options = navbar_options(position=)`][navbar_options] instead.
#' @param collapsible `r lifecycle::badge("deprecated")` Please use 
#'   [`navbar_options = navbar_options(collapsible=)`][navbar_options] instead.
#' @param bg `r lifecycle::badge("deprecated")` Please use 
#'   [`navbar_options = navbar_options(bg=)`][navbar_options] instead.
#' @param inverse `r lifecycle::badge("deprecated")` Please use 
#'   [`navbar_options = navbar_options(inverse=)`][navbar_options] instead.
#' 
#' @export
#' @rdname navset
navset_bar <- function(
  ...,
  title = NULL,
  id = NULL,
  selected = NULL,
  sidebar = NULL,
  fillable = TRUE,
  gap = NULL,
  padding = NULL,
  header = NULL,
  footer = NULL,
  fluid = TRUE,
  navbar_options = NULL,
  position = deprecated(),
  bg = deprecated(),
  inverse = deprecated(),
  collapsible = deprecated()
) {
  padding <- validateCssPadding(padding)
  gap <- validateCssUnit(gap)

  .navbar_options <- navbar_options_resolve_deprecated(
    options_user = navbar_options,
    position = position,
    bg = bg,
    inverse = inverse,
    collapsible = collapsible
  )

  navs_bar_(
    ...,
    title = title,
    id = id,
    selected = selected,
    sidebar = sidebar,
    fillable = fillable,
    gap = gap,
    padding = padding,
    header = header,
    footer = footer,
    fluid = fluid,
    position = .navbar_options$position,
    bg = .navbar_options$bg,
    inverse = .navbar_options$type,
    collapsible = .navbar_options$collapsible,
    underline = .navbar_options$underline,
    # theme is only used to determine whether legacy style markup should be used
    # (and, at least at the moment, we don't need legacy markup for this exported function)
    theme = bs_theme()
  )
}


# This internal version of navs_bar() exists so both it and page_navbar()
# (and thus shiny::navbarPage()) can use it. And in the page_navbar() case,
# we can use addition theme information as an indication of whether we need
# to handle backwards compatibility
navs_bar_ <- function(..., title = NULL, id = NULL, selected = NULL,
                      sidebar = NULL, fillable = TRUE,
                      gap = NULL, padding = NULL,
                      position = c("static-top", "fixed-top", "fixed-bottom"),
                      header = NULL, footer = NULL,
                      bg = NULL, inverse = "auto",
                      underline = TRUE,
                      collapsible = TRUE, fluid = TRUE,
                      theme = NULL) {

  navbar_color_mode <- switch(
    as.character(inverse),
    "TRUE" = "dark",
    "FALSE" = "light",
    inverse
  )

  if (identical(inverse, "auto")) {
    inverse <- TRUE
    if (identical(theme_preset_info(theme)$name, "shiny")) {
      inverse <- FALSE
    }
    if (!is.null(bg)) {
      bg <- htmltools::parseCssColors(bg)
      bg_contrast <- bs_get_contrast(bs_theme("navbar-bg" = bg), "navbar-bg")
      inverse <- col2rgb(bg_contrast)[1,] > 127.5
    }
  }

  navbar <- navbarPage_(
    title = title, ..., id = id, selected = selected,
    sidebar = sidebar, fillable = fillable,
    gap = gap, padding = padding,
    position = match.arg(position),
    header = header, footer = footer, collapsible = collapsible,
    inverse = inverse, underline = underline, fluid = fluid,
    theme = theme
  )

  # navbarPage_() returns a tagList() of the nav and content
  navbar[[1]] <- tagAppendAttributes(
    navbar[[1]], 
    style = if (!is.null(bg)) css(background_color = paste(bg, "!important")),
    "data-bs-theme" = navbar_color_mode
  )

  as_fragment(navbar, page = page)
}

# -----------------------------------------------------------------------
# 'Internal' tabset logic that was pulled directly from shiny/R/bootstrap.R
#  (with minor modifications)
# -----------------------------------------------------------------------

navbarPage_ <- function(title,
                       ...,
                       id = NULL,
                       selected = NULL,
                       sidebar = NULL,
                       fillable = TRUE,
                       gap = NULL,
                       padding = NULL,
                       position = c("static-top", "fixed-top", "fixed-bottom"),
                       header = NULL,
                       footer = NULL,
                       inverse = FALSE,
                       underline = TRUE,
                       collapsible = FALSE,
                       fluid = TRUE,
                       theme = NULL) {

  # alias title so we can avoid conflicts w/ title in withTags
  pageTitle <- title

  # navbar class based on options
  navbarClass <- "navbar navbar-default"
  position <- match.arg(position)
  if (!is.null(position))
    navbarClass <- paste0(navbarClass, " navbar-", position)
  if (isTRUE(inverse))
    navbarClass <- paste(navbarClass, "navbar-inverse")

  if (!is.null(id))
    selected <- shiny::restoreInput(id = id, default = selected)

  # build the tabset
  ulClass <- "nav navbar-nav"
  if (underline)
    ulClass <- paste(ulClass, "nav-underline")
  tabset <- buildTabset(..., ulClass = ulClass, id = id, selected = selected)

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
          # data-bs-* is for BS5+
          `data-bs-toggle` = "collapse",
          `data-bs-target` = paste0("#", navId),
          span(class="sr-only visually-hidden", "Toggle navigation"),
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

  # Bootstrap 3 explicitly supported "dropup menus" via .navbar-fixed-bottom,
  # but BS4+ requires .dropup on menus with .navbar.fixed-bottom
  if (position == "fixed-bottom") {
    containerDiv <- tagQuery(containerDiv)$
      find(".dropdown-menu")$
      parent()$
      addClass("dropup")$
      allTags()
  }

  # If fillable is truthy, give the relevant .tab-content > .tab-pane containers
  # the potential to fill
  tabset$content <- makeTabsFillable(tabset$content, fillable, navbar = TRUE, gap = gap, padding = padding)

  # For backwards compatibility reasons, wrap header & footer in a .row
  # container if we're not using BS5+. I'm not entirely sure what the motivation
  # was for it in the 1st place, but now that, with BS5, .row adds
  # `display:flex` and makes children `width:100%`, which is surprising and
  # confusing from a user perspective
  isLegacy <- as.numeric(theme_version(theme) %||% 3) < 5
  if (!is.null(header) && isLegacy) {
    header <- div(class = "row", header)
  }
  if (!is.null(footer) && isLegacy) {
    footer <- div(class = "row", footer)
  }

  contents <- dropNulls(list(header, tabset$content, footer))

  if (is.null(sidebar)) {

    contentDiv <- div(class = containerClass, !!!contents)

    # If fillable is truthy, the .container also needs to be fillable
    if (!isFALSE(fillable)) {
      contentDiv <- bindFillRole(contentDiv, container = TRUE, item = TRUE)
    }

  } else {

    contentDiv <- div(
      # In the fluid case, the sidebar layout should be flush (i.e.,
      # the .container-fluid class adds padding that we don't want)
      class = if (!fluid) "container",
      layout_sidebar(
        sidebar = sidebar,
        fillable = !isFALSE(fillable),
        border_radius = FALSE,
        border = !fluid,
        page_main_container(contents)
      )
    )

    # Always have the sidebar layout fill its parent (in this case
    # fillable controls whether the _main_ content portion is fillable)
    contentDiv <- bindFillRole(contentDiv, container = TRUE, item = TRUE)

  }

  # *Don't* wrap in bootstrapPage() (shiny::navbarPage()) does that part
  tagList(
    tags$nav(class = navbarClass, role = "navigation", containerDiv),
    contentDiv
  )
}

navbarMenu_ <- function(title, ..., menuName = title, icon = NULL, align) {
  icon <- prepTabIcon(icon)
  structure(
    list(
      title = title,
      menuName = menuName,
      tabs = list2(...),
      # Here for legacy reasons
      # https://github.com/cran/miniUI/blob/74c87d3/R/layout.R#L369
      iconClass = if (inherits(icon, "shiny.tag")) tagGetAttribute(icon, "class"),
      icon = icon,
      align = align
    ),
    class = "shiny.navbarmenu"
  )
}

isNavbarMenu <- function(x) {
  inherits(x, "shiny.navbarmenu")
}

tabPanel_ <- function(title, ..., value = title, icon = NULL) {
  icon <- prepTabIcon(icon)
  pane <- div(
    class = "tab-pane",
    title = title,
    `data-value` = value,
    # Here for legacy reasons
    # https://github.com/cran/miniUI/blob/74c87d/R/layout.R#L395
    `data-icon-class` = if (inherits(icon, "shiny.tag")) tagGetAttribute(icon, "class"),
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

tabPanelBody_ <- function(value, ..., icon = NULL) {
  if (
    !is.character(value) ||
    length(value) != 1 ||
    any(is.na(value)) ||
    nchar(value) == 0
  ) {
    stop("`value` must be a single, non-empty string value")
  }
  tabPanel_(title = NULL, ..., value = value, icon = icon)
}

tabsetPanel_ <- function(...,
                        id = NULL,
                        selected = NULL,
                        type = c("tabs", "pills", "hidden", "underline"),
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

navlistPanel_ <- function(...,
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

    } else if (isTabPanel(x)) {
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
  if (!inherits(x, "shiny.tag")) return(x)

  is_fa <- grepl("fa-", tagGetAttribute(x, "class") %||% "", fixed = TRUE)
  if (!is_fa) return(x)

  # specify fixed-width for font-awesome
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
    ulClass <- "dropdown-menu"
    if (identical(divTag$align, "right")) {
      ulClass <- paste(ulClass, "dropdown-menu-right dropdown-menu-end")
    }
    tabset <- buildTabset(
      !!!divTag$tabs, ulClass = ulClass,
      textFilter = navbarMenuTextFilter,
      foundSelected = foundSelected
    )
    return(buildDropdown(divTag, tabset))
  }

  if (isTabPanel(divTag)) {
    return(buildNavItem(divTag, tabsetId, index))
  }

  if (is_nav_item(divTag) || is_nav_spacer(divTag)) {
    return(
      list(liTag = divTag, divTag = NULL)
    )
  }

  # The behavior is undefined at this point, so construct a condition message
  msg <- paste0(
    "Navigation containers expect a collection of `bslib::nav_panel()`/`shiny::tabPanel()`s ",
    "and/or `bslib::nav_menu()`/`shiny::navbarMenu()`s. ",
    "Consider using `header` or `footer` if you wish to place content above ",
    "(or below) every panel's contents."
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
      # data-bs-* is for BS5+
      `data-bs-toggle` = "tab",
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
      # data-bs-* is for BS5+
      `data-bs-toggle` = "dropdown",
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
          addClass(if (active) "active")$
          allTags()
      } else {
        tagAppendAttributes(x, class = if (active) "active")
      }
    }
  )

  list(
    divTag = tabset$content$children,
    liTag = dropdown
  )
}
