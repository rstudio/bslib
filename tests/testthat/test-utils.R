test_that("path_lib returns multiple system files", {
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

test_that("get_color_contrast() works", {
  expect_equal(get_color_contrast("white"), "#000000")
  expect_equal(get_color_contrast("black"), "#FFFFFF")
  expect_warning(expect_null(get_color_contrast("fsdnffdgdsfsd")))
})

test_that("separate_arguments() works", {
  expect_equal(
    separate_arguments(1, 2, 3)$children,
    list(1, 2, 3)
  )

  expect_equal(
    separate_arguments(a = 1, b = 2, c = 3)$attribs,
    list(a = 1, b = 2, c = 3)
  )

  expect_equal(
    separate_arguments(a = 1, 2, 3),
    list(attribs = list(a = 1), children = list(2, 3))
  )

  expect_equal(
    separate_arguments(1, a = 2, 3),
    list(attribs = list(a = 2), children = list(1, 3))
  )
})
