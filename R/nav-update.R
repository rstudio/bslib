#' Dynamically update nav containers
#'
#' Functions for dynamically updating nav containers (e.g., select, insert, and
#' remove nav items). These functions require an `id` on the nav container to be
#' specified and must be called within an active Shiny session.
#'
#' @param id a character string used to identify the nav container.
#' @param selected a character string used to identify a particular [nav()] item.
#' @param session a shiny session object (the default should almost always be used).
#' @export
#' @seealso [nav()], [navs_tab()].
#' @examples
#'
#' can_browse <- function() interactive() && require("shiny")
#'
#' # Selecting a tab
#' if (can_browse()) {
#'   shinyApp(
#'     page_fluid(
#'       radioButtons("item", "Choose", c("A", "B")),
#'       navs_hidden(
#'         id = "container",
#'         nav_content("A", "a"),
#'         nav_content("B", "b")
#'       )
#'     ),
#'     function(input, output) {
#'       observe(nav_select("container", input$item))
#'     }
#'   )
#' }
#'
#' # Inserting and removing
#' if (can_browse()) {
#'   ui <- page_fluid(
#'     actionButton("add", "Add 'Dynamic' tab"),
#'     actionButton("remove", "Remove 'Foo' tab"),
#'     navs_tab(
#'       id = "tabs",
#'       nav("Hello", "hello"),
#'       nav("Foo", "foo"),
#'       nav("Bar", "bar tab")
#'     )
#'   )
#'   server <- function(input, output) {
#'     observeEvent(input$add, {
#'       nav_insert(
#'         "tabs", target = "Bar", select = TRUE,
#'         nav("Dynamic", "Dynamically added content")
#'       )
#'     })
#'     observeEvent(input$remove, {
#'       nav_remove("tabs", target = "Foo")
#'     })
#'   }
#'   shinyApp(ui, server)
#' }
#'
nav_select <- function(id, selected = NULL,
                       session = get_current_session()) {
  session
  shiny::updateTabsetPanel(session, id, selected)
}


#' @param nav a [nav()] item.
#' @param target The `value` of an existing `nav()` item, next to which tab will be added. If removing: the `value` of the `nav()` item that you want to remove.
#' @param position Should `nav` be added before or after the target?
#' @param select Should `nav` be selected upon being inserted?
#' @rdname nav_select
#' @export
nav_insert <- function(id, nav, target = NULL, position = c("after", "before"),
                       select = FALSE, session = get_current_session()) {

  force(target)
  force(select)
  position <- match.arg(position)
  inputId <- session$ns(id)

  # Barbara -- August 2017
  # Note: until now, the number of tabs in a tabsetPanel (or navbarPage
  # or navlistPanel) was always fixed. So, an easy way to give an id to
  # a tab was simply incrementing a counter. (Just like it was easy to
  # give a random 4-digit number to identify the tabsetPanel). Since we
  # can only know this in the client side, we'll just pass `id` and
  # `tsid` (TabSetID) as dummy values that will be fixed in the JS code.
  item <- buildTabItem("id", "tsid", TRUE, divTag = nav,
                       textFilter = if (is.character(nav)) navbarMenuTextFilter else NULL)

  callback <- function() {
    session$sendInsertTab(
      inputId = inputId,
      liTag = processDeps(item$liTag, session),
      divTag = processDeps(item$divTag, session),
      menuName = NULL,
      target = target,
      position = position,
      select = select)
  }
  session$onFlush(callback, once = TRUE)
}

#' @export
#' @rdname nav_select
nav_remove <- function(id, target, session = get_current_session()) {
  force(target)
  inputId <- session$ns(id)

  callback <- function() {
    session$sendRemoveTab(
      inputId = inputId,
      target = target
    )
  }
  session$onFlush(callback, once = TRUE)
}

#' @export
#' @rdname nav_select
nav_show <- function(id, target, select = FALSE,
                     session = get_current_session()) {
  session
  shiny::showTab(id, target, select, session)
}

#' @export
#' @rdname nav_select
nav_hide <- function(id, target,
                     session = get_current_session()) {
  session
  shiny::hideTab(id, target, session)
}

#' Append or prepend nav item to a dropdown menu
#'
#' Exported for use by [shiny::prependTab()]/[shiny::appendTab()]. These
#' functions have been superseded by [nav_insert()] (i.e.,
#' [shiny::insertTab()]), since it can do everything these functions do (i.e.,
#' add a [nav()] to the start or end of a [nav_menu()]) and more (i.e., insert a
#' [nav()] anywhere inside a nav container).
#'
#' @inheritParams nav_insert
#' @param menu_title The title of a [nav_menu()].
#' @keywords internal
#' @export
nav_prepend <- function(id, nav, menu_title, select = FALSE, session = get_current_session()) {

  force(select)
  force(menu_title)
  inputId <- session$ns(id)

  item <- buildTabItem("id", "tsid", TRUE, divTag = nav,
                       textFilter = if (is.character(nav)) navbarMenuTextFilter else NULL)

  callback <- function() {
    session$sendInsertTab(
      inputId = inputId,
      liTag = processDeps(item$liTag, session),
      divTag = processDeps(item$divTag, session),
      menuName = menu_title,
      target = NULL,
      position = "before",
      select = select)
  }
  session$onFlush(callback, once = TRUE)
}

#' @rdname nav_prepend
#' @keywords internal
#' @export
nav_append <- function(id, nav, menu_title, select = FALSE, session = get_current_session()) {

  force(select)
  force(menu_title)
  inputId <- session$ns(id)

  item <- buildTabItem("id", "tsid", TRUE, divTag = nav,
                       textFilter = if (is.character(nav)) navbarMenuTextFilter else NULL)

  callback <- function() {
    session$sendInsertTab(
      inputId = inputId,
      liTag = processDeps(item$liTag, session),
      divTag = processDeps(item$divTag, session),
      menuName = menu_title,
      target = NULL,
      position = "after",
      select = select)
  }
  session$onFlush(callback, once = TRUE)
}
