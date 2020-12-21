
test_that("shiny devmode shuts off default caching", {

  expect_equal(
    get_precompiled_option(),
    TRUE
  )


  withr::local_options(list(
    shiny.devmode = TRUE,
    shiny.devmode.verbose = FALSE
  ))
  withr::local_envvar(list(
    TESTTHAT = "false"
  ))

  expect_equal(
    get_precompiled_option(),
    FALSE
  )

})
