
describe("Can find pre-built themes", {
  # Should be present for 4, 4+3, 3 without bootswatch theme
  expect_true(file.exists(prebuilt_css_path(bs_theme_create("4"))))
  expect_true(file.exists(prebuilt_css_path(bs_theme_create("4+3"))))
  expect_true(file.exists(prebuilt_css_path(bs_theme_create("3"))))

  # Not present for bootswatch themes
  expect_null(prebuilt_css_path(bs_theme_create("4", "sketchy")))
  expect_null(prebuilt_css_path(bs_theme_create("4+3", "darkly")))

  # With modifications
  bs_theme_new()
  bs_theme_add("body { background: red; }")
  expect_null(prebuilt_css_path(bs_theme_get()))
})


describe("Pre-built theme output is identical to compiled themes", {
  get_bootstrap_path <- function(x) {
    bs_dep <- Filter(x, f = function(y) { identical(y$name, "bootstrap") })[[1]]
    bs_dep$src$file
  }

  # Pre-built themes will end up in a different directory, but have identical
  # contents to non-pre-built. The dirs will be something like:
  # /tmp/RtmpVi9qRT/bootstraplib-088b402ee16511d7
  # /tmp/RtmpVi9qRT/bootstraplib-prebuilt-4
  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("4"), use_prebuilt_css = FALSE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("4"), use_prebuilt_css = TRUE))
  expect_false(identical(dir1, dir2))
  expect_true(identical_dirs(dir1, dir2))

  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("4+3"), use_prebuilt_css = FALSE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("4+3"), use_prebuilt_css = TRUE))
  expect_false(identical(dir1, dir2))
  expect_true(identical_dirs(dir1, dir2))

  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("3"), use_prebuilt_css = FALSE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("3"), use_prebuilt_css = TRUE))
  expect_false(identical(dir1, dir2))
  expect_true(identical_dirs(dir1, dir2))

  # For default sass options, we'll end up with the pre-built dir, something like
  # /tmp/RtmpVi9qRT/bootstraplib-prebuilt-4
  default_sass_options <- eval(formals(bootstrap)$sass_options)
  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("4"), use_prebuilt_css = TRUE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("4"), default_sass_options, use_prebuilt_css = TRUE))
  expect_identical(dir1, dir2)

  # For non-default sass options, we'll end up NOT with the pre-built dir, which
  # means that it didn't use the pre-built version.
  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("4"), use_prebuilt_css = TRUE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("4"),
                             sass::sass_options(output_style = "expanded"),
                             use_prebuilt_css = TRUE))
  expect_false(identical(dir1, dir2))

  # For themes where there's no pre-built version, they will be compiled to the
  # same directory whether use_prebuilt_css is TRUE or FALSE. It will look like:
  # /tmp/RtmpVi9qRT/bootstraplib-5c3108f39cfd584e
  dir1 <- get_bootstrap_path(bootstrap(bs_theme_create("4", "darkly"), use_prebuilt_css = FALSE))
  dir2 <- get_bootstrap_path(bootstrap(bs_theme_create("4", "darkly"), use_prebuilt_css = TRUE))
  expect_true(identical(dir1, dir2))
})
