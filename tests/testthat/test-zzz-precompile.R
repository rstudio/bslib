local_disable_cache()

test_that("Can find precompiled themes", {
  # Should be present for 4, 3 without bootswatch theme
  expect_true(file.exists(precompiled_css_path(bs_theme("4"))))
  expect_true(file.exists(precompiled_css_path(bs_theme("3"))))

  # Not present for bootswatch themes
  expect_null(precompiled_css_path(bs_theme("4", "sketchy")))

  # With modifications
  theme <- bs_add_rules(bs_theme(), rules = "body { background: red; }")
  expect_null(precompiled_css_path(theme))
})

test_that("Precompiled theme output is identical to compiled themes", {
  skip_on_cran()
  # If this fails run: Rscript tools/main.R

  get_bootstrap_path <- function(x) {
    bs_dep <- Filter(x, f = function(y) {
      identical(y$name, "bootstrap")
    })[[1]]
    bs_dep$src$file
  }

  # precompiled themes will end up in a different directory, but have identical
  # contents to non-precompiled. The dirs will be something like:
  # /tmp/RtmpVi9qRT/bslib-088b402ee16511d7
  # /tmp/RtmpVi9qRT/bslib-precompiled-4
  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = FALSE)
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = TRUE)
  )
  expect_false(identical(dir1, dir2))
  expect_true(identical_dirs(dir1, dir2))

  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("3"), precompiled = FALSE)
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("3"), precompiled = TRUE)
  )
  expect_false(identical(dir1, dir2))
  expect_true(identical_dirs(dir1, dir2))

  # Two calls to bs_theme_dependencies() with precompiled CSS should end up in
  # the same dir, even when caching is turned off. Something like:
  # /tmp/RtmpVi9qRT/bslib-precompiled-4
  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = TRUE)
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = TRUE)
  )
  expect_identical(dir1, dir2)

  # For default sass options, we'll end up with the precompiled dir, something
  # like:
  # /tmp/RtmpVi9qRT/bslib-precompiled-4
  default_sass_options <- eval(formals(bs_theme_dependencies)$sass_options)
  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = TRUE)
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(
      bs_theme("4"),
      default_sass_options,
      precompiled = TRUE
    )
  )
  expect_identical(dir1, dir2)

  # For non-default sass options, we'll end up NOT with the precompiled dir,
  # which means that it didn't use the precompiled version.
  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(bs_theme("4"), precompiled = TRUE)
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(
      bs_theme("4"),
      sass::sass_options(output_style = "expanded"),
      precompiled = TRUE
    )
  )
  expect_false(identical(dir1, dir2))

  # For themes where there's no precompiled version, they will be compiled to
  # the same directory whether precompiled is TRUE or FALSE. It will
  # look like:
  # /tmp/RtmpVi9qRT/bslib-5c3108f39cfd584e
  # Need to tell sass to use a cache, because otherwise it will write into a new
  # directory every time.
  cache <- sass_file_cache(tempfile())
  dir1 <- get_bootstrap_path(
    bs_theme_dependencies(
      bs_theme("4", "darkly"),
      cache = cache,
      precompiled = FALSE
    )
  )
  dir2 <- get_bootstrap_path(
    bs_theme_dependencies(
      bs_theme("4", "darkly"),
      cache = cache,
      precompiled = TRUE
    )
  )
  expect_true(identical(dir1, dir2))
})
