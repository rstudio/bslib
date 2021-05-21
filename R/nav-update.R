#' Programmatically update panels
#'
#' Functions for dynamically updating selected (i.e., active) [nav()] items
#' within a particular nav container. These functions require an container `id`
#' to identify the container interest.
#'
#' @param id a character string identifying the nav container (e.g., [navs_tab()]).
#' @param selected a character string matching a particular [nav()] of interest.
#' @param session a shiny session object (the default should almost always be used).
#' @export
#' @rdname nav-update
nav_select <- function(id, selected = NULL,
                       session = getDefaultReactiveDomain()) {
  shiny::updateTabsetPanel(session, id, selected)
}

#' @export
#' @param nav a [nav()] item to insert.
#' @param target If inserting: the `value` of an existing `nav()` item, next to which tab will be added. If removing: the `value` of the `nav()` item that you want to remove.
#' @param position Should `nav` be added before or after the target?
#' @param select Should `nav` be selected upon being inserted?
#' @rdname nav-update
nav_insert <- function(id, nav, target, position = c("before", "after"),
                       select = FALSE, session = getDefaultReactiveDomain()) {

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
#' @rdname nav-update
nav_prepend <- function(id, nav, select = FALSE, menuName = NULL, # TODO: rename to value (to match the name change in nav_menu()?)
                       session = getDefaultReactiveDomain()) {
  force(select)
  force(menuName)
  inputId <- session$ns(id)

  item <- buildTabItem("id", "tsid", TRUE, divTag = nav,
                       textFilter = if (is.character(nav)) navbarMenuTextFilter else NULL)

  callback <- function() {
    session$sendInsertTab(
      inputId = inputId,
      liTag = processDeps(item$liTag, session),
      divTag = processDeps(item$divTag, session),
      menuName = menuName,
      target = NULL,
      position = "after",
      select = select)
  }
  session$onFlush(callback, once = TRUE)
}

#' @export
#' @rdname nav-update
nav_append <- function(id, nav, select = FALSE, menuName = NULL,
                       session = getDefaultReactiveDomain()) {
  force(select)
  force(menuName)
  inputId <- session$ns(id)

  item <- buildTabItem("id", "tsid", TRUE, divTag = nav,
                       textFilter = if (is.character(nav)) navbarMenuTextFilter else NULL)

  callback <- function() {
    session$sendInsertTab(
      inputId = inputId,
      liTag = processDeps(item$liTag, session),
      divTag = processDeps(item$divTag, session),
      menuName = menuName,
      target = NULL,
      position = "before",
      select = select)
  }
  session$onFlush(callback, once = TRUE)
}

#' @export
#' @rdname nav-update
nav_remove <- function(id, target, session = getDefaultReactiveDomain()) {
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
#' @rdname nav-update
nav_show <- function(id, target, select = FALSE,
                     session = getDefaultReactiveDomain()) {
  shiny::showTab(id, target, select, session)
}

#' @export
#' @rdname nav-update
nav_hide <- function(id, target,
                     session = getDefaultReactiveDomain()) {
  shiny::hideTab(id, target, session)
}
