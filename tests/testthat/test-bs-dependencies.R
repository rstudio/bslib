# A factory of deferred deps that differ only in captured variables (#1330).
defer_test_dep <- function(name, css, ...) {
  bs_dependency_defer(
    function(theme) {
      if (!is_bs_theme(theme)) {
        theme <- bs_theme(version = 5)
      }
      bs_dependency(
        input = css,
        theme = theme,
        name = paste0("test-", name),
        version = "0.0.0"
      )
    },
    ...
  )
}

test_that("bs_dependency_defer() gives factory-built closures distinct cache entries via `cache_key` (#1330)", {
  red <- defer_test_dep("red", ".x { color: red }", cache_key = "red")()
  blue <- defer_test_dep("blue", ".x { color: blue }", cache_key = "blue")()

  expect_identical(red$name, "test-red")
  expect_identical(blue$name, "test-blue")
})

test_that("bs_dependency_defer() collides factory-built closures without `cache_key` (#1330)", {
  red <- defer_test_dep("red", ".x { color: red }")()
  blue <- defer_test_dep("blue", ".x { color: blue }")()

  # The deferred closures differ only in captured variables, so they share a
  # memoise key: `blue` is served `red`'s cached dependency instead of its own.
  expect_identical(red$name, "test-red")
  expect_identical(blue$name, "test-red")
})

test_that("bs_dependency_defer(memoise = FALSE) recomputes on every call (#1330)", {
  red <- defer_test_dep("red", ".x { color: red }", memoise = FALSE)()
  blue <- defer_test_dep("blue", ".x { color: blue }", memoise = FALSE)()

  expect_identical(red$name, "test-red")
  expect_identical(blue$name, "test-blue")
})

test_that("bs_dependency_defer() warns when `cache_key` is set with `memoise = FALSE`", {
  expect_warning(
    bs_dependency_defer(function(theme) NULL, memoise = FALSE, cache_key = "x"),
    "cache_key.*ignored"
  )
})

test_that("bs_dependency_defer() keeps distinct functions separate without `cache_key`", {
  dep_a <- bs_dependency_defer(function(theme) list(name = "a", version = "0.0.0"))()
  dep_b <- bs_dependency_defer(function(theme) list(name = "b", version = "0.0.0"))()

  expect_identical(dep_a$name, "a")
  expect_identical(dep_b$name, "b")
})
