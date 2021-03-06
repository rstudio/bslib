% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/nav-update.R
\name{nav_select}
\alias{nav_select}
\alias{nav_insert}
\alias{nav_remove}
\alias{nav_show}
\alias{nav_hide}
\title{Dynamically update nav containers}
\usage{
nav_select(id, selected = NULL, session = getDefaultReactiveDomain())

nav_insert(
  id,
  nav,
  target = NULL,
  position = c("after", "before"),
  select = FALSE,
  session = getDefaultReactiveDomain()
)

nav_remove(id, target, session = getDefaultReactiveDomain())

nav_show(id, target, select = FALSE, session = getDefaultReactiveDomain())

nav_hide(id, target, session = getDefaultReactiveDomain())
}
\arguments{
\item{id}{a character string used to identify the nav container.}

\item{selected}{a character string used to identify a particular \code{\link[=nav]{nav()}} item.}

\item{session}{a shiny session object (the default should almost always be used).}

\item{nav}{a \code{\link[=nav]{nav()}} item.}

\item{target}{The \code{value} of an existing \code{nav()} item, next to which tab will be added. If removing: the \code{value} of the \code{nav()} item that you want to remove.}

\item{position}{Should \code{nav} be added before or after the target?}

\item{select}{Should \code{nav} be selected upon being inserted?}
}
\description{
Functions for dynamically updating nav containers (e.g., select, insert, and
remove nav items). These functions require an \code{id} on the nav container to be
specified.
}
\examples{

can_browse <- function() interactive() && require("shiny")

# Selecting a tab
if (can_browse()) {
  shinyApp(
    page_fluid(
      radioButtons("item", "Choose", c("A", "B")),
      navs_hidden(
        id = "container",
        nav_content("A", "a"),
        nav_content("B", "b")
      )
    ),
    function(input, output) {
      observe(nav_select("container", input$item))
    }
  )
}

# Inserting and removing
if (can_browse()) {
  ui <- page_fluid(
    actionButton("add", "Add 'Dynamic' tab"),
    actionButton("remove", "Remove 'Foo' tab"),
    navs_tab(
      id = "tabs",
      nav("Hello", "hello"),
      nav("Foo", "foo"),
      nav("Bar", "bar tab")
    )
  )
  server <- function(input, output) {
    observeEvent(input$add, {
      nav_insert(
        "tabs", target = "Bar", select = TRUE,
        nav("Dynamic", "Dynamically added content")
      )
    })
    observeEvent(input$remove, {
      nav_remove("tabs", target = "Foo")
    })
  }
  shinyApp(ui, server)
}

}
\seealso{
\code{\link[=nav]{nav()}}, \code{\link[=navs_tab]{navs_tab()}}.
}
