bs_size <- function(x) {
  bs <- bs_theme_dependencies(x)[[2]]
  files <- file.path(bs$src, bs$stylesheet)
  file.info(files)["size"]
}

test_that("Can remove rules", {
  a <- bs_theme(version = "4")
  b <- bs_remove(a, "_print")
  c <- bs_remove(b, "_carousel")
  expect_true(bs_size(a) > bs_size(b))
  expect_true(bs_size(b) > bs_size(c))
})

test_that("Can retrieve rules", {
  a <- bs_theme(version = "4")
  b <- bs_retrieve(a, "_print")
  c <- bs_retrieve(a, "_carousel")
  expect_true(bs_size(a) > bs_size(b))
  expect_true(bs_size(a) > bs_size(c))
})
