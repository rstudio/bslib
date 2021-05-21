#' Programmatically update panels
#'
#' @inheritParams shiny::updateTabsetPanel
#' @export
nav_select <- function(input_id, selected = NULL,
                       session = getDefaultReactiveDomain()) {
  shiny::updateTabsetPanel(session, input_id, selected)
}

#' @export
#' @rdname nav_update
nav_insert <- function(input_id, nav, target, position = c("before", "after"),
                       select = FALSE, session = getDefaultReactiveDomain()) {

  force(target)
  force(select)
  position <- match.arg(position)
  inputId <- session$ns(input_id)

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
#' @rdname nav_update
nav_prepend <- function(input_id, nav, select = FALSE, menuName = NULL,
                       session = getDefaultReactiveDomain()) {
  force(select)
  force(menuName)
  inputId <- session$ns(input_id)

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
#' @rdname nav_update
nav_append <- function(input_id, nav, select = FALSE, menuName = NULL,
                       session = getDefaultReactiveDomain()) {
  force(select)
  force(menuName)
  inputId <- session$ns(input_id)

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
#' @rdname nav_update
nav_remove <- function(input_id, target, session = getDefaultReactiveDomain()) {
  force(target)
  inputId <- session$ns(input_id)

  callback <- function() {
    session$sendRemoveTab(
      inputId = inputId,
      target = target
    )
  }
  session$onFlush(callback, once = TRUE)
}

#' @export
#' @rdname nav_update
nav_show <- function(input_id, target, select = FALSE,
                     session = getDefaultReactiveDomain()) {
  shiny::showTab(input_id, target, select, session)
}

#' @export
#' @rdname nav_update
nav_hide <- function(input_id, target,
                     session = getDefaultReactiveDomain()) {
  shiny::hideTab(input_id, target, session)
}
