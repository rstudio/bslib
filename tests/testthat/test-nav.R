test_that("navs_[tab/pill]_card() basically works", {

  nav_items <- list(
    nav("a", "tab a"),
    nav("b", "tab b"),
    nav_item(
      tags$a(shiny::icon("github"), "Shiny", href = "https://github.com/rstudio/shiny", target = "_blank")
    ),
    nav_spacer(),
    nav_menu(
      "Other links", align = "right",
      nav("c", "tab c"),
      nav_item(
        tags$a(shiny::icon("r-project"), "RStudio", href = "https://rstudio.com", target = "_blank")
      )
    )
  )

  expect_snapshot_tabs(
    page_fluid(navs_tab_card(!!!nav_items))
  )
  expect_snapshot_tabs(
    page_fluid(navs_pill_card(!!!nav_items))
  )
})

test_that("Generic nav items aren't marked active", {
  expect_snapshot_tabs(
    page_fluid(navs_tab(
      nav_spacer(),
      nav("A", "a"),
      nav("B", "b")
    ))
  )
  expect_snapshot_tabs(
    page_fluid(navs_tab(
      nav_item(tags$a("Foo", href = "https://google.com")),
      nav("A", "a"),
      nav("B", "b")
    ))
  )
})
