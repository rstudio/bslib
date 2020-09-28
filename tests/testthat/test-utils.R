test_that("lib_file returns multiple system files", {

  # version 4 has a js file and a js map file
  js_files <- bootstrap_javascript("4")
  expect_equal(length(js_files), 1)
  js_files <- bootstrap_javascript("3")
  expect_equal(length(js_files), 1)
  js_files <- bootstrap_javascript_map("4")
  expect_equal(length(js_files), 1)
  js_files <- bootstrap_javascript_map("3")
  expect_equal(length(js_files), 0)
})
