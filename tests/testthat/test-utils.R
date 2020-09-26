test_that("lib_file returns multiple system files", {

  # version 4 has a js file and a js map file
  js_files <- bootstrap_javascript("4")
  expect_equal(length(js_files), 2)
})
