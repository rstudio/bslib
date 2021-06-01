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

  expect_snapshot_tabs(navs_tab_card(!!!nav_items))
  expect_snapshot_tabs(navs_pill_card(!!!nav_items))
})
