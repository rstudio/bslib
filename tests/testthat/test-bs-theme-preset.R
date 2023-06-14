describe("new_theme_preset()", {
  it("returns NULL if both `name` and `bootswatch` are missing", {
    expect_null(resolve_bs_preset(name = NULL, bootswatch = NULL))
  })

  it("throws an error if both `name` and `bootswatch` are provided", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(name = "name", bootswatch = "bootswatch")
    )
  })

  it("throws an error if `name` or `bootswatch` are not scalar strings", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(name = c("a", "b"))
    )
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(bootswatch = c("a", "b"))
    )

    expect_error(resolve_bs_preset(name = 1))
    expect_error(resolve_bs_preset(bootswatch = 1))

    expect_error(resolve_bs_preset(name = TRUE))
    expect_error(resolve_bs_preset(bootswatch = TRUE))

    expect_error(resolve_bs_preset(name = NA_character_))
    expect_error(resolve_bs_preset(bootswatch = NA_character_))
  })

  it("throws an error if `name` or `bootswatch` don't match existing presets", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(name = "not_a_preset", version = 4)
    )
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(bootswatch = "not_a_preset", version = 4)
    )
  })

  it("throws an error for unknown bootstrap version", {
    expect_error(resolve_bs_preset(name = "cerulean", version = "2"))
    expect_error(resolve_bs_preset(bootswatch = "cerulean", version = "99"))

    expect_warning(resolve_bs_preset(bootswatch = "cerulean", version = "4-3"))
  })

  it("returns a 'default' preset if name or bootswatch is 'default' or 'bootstrap'", {
    expect_equal(
      resolve_bs_preset(name = "default"),
      resolve_bs_preset(bootswatch = "default")
    )

    expect_equal(
      resolve_bs_preset(name = "bootstrap"),
      resolve_bs_preset(bootswatch = "bootstrap")
    )

    expect_equal(
      resolve_bs_preset(name = "default"),
      resolve_bs_preset(name = "bootstrap")
    )

    expect_equal(
      unclass(resolve_bs_preset(name = "default")),
      list(version = version_default(), name = "default")
    )

    expect_identical(class(resolve_bs_preset(name = "default")), "bs_preset")
  })

  it("returns a BS5 Bootswatch theme preset", {
    bsw_darkly <- resolve_bs_preset(bootswatch = "darkly", version = 5)

    expect_s3_class(bsw_darkly, "bs_preset")
    expect_s3_class(bsw_darkly, "bs_preset_bootswatch")
    expect_equal(bsw_darkly$name, "darkly")
    expect_equal(bsw_darkly$version, "5")
    expect_equal(bsw_darkly$class, "bs_bootswatch_darkly")
  })

  it("returns a BS4 Bootswatch theme preset", {
    bsw_cosmo <- resolve_bs_preset(bootswatch = "cosmo", version = 4)

    expect_s3_class(bsw_cosmo, "bs_preset")
    expect_s3_class(bsw_cosmo, "bs_preset_bootswatch")
    expect_equal(bsw_cosmo$name, "cosmo")
    expect_equal(bsw_cosmo$version, "4")
    expect_equal(bsw_cosmo$class, "bs_bootswatch_cosmo")
  })

  it("returns a BS3 Bootswatch theme preset", {
    bsw_readable <- resolve_bs_preset(bootswatch = "readable", version = 3)

    expect_s3_class(bsw_readable, "bs_preset")
    expect_s3_class(bsw_readable, "bs_preset_bootswatch")
    expect_equal(bsw_readable$name, "readable")
    expect_equal(bsw_readable$version, "3")
    expect_equal(bsw_readable$class, "bs_bootswatch_readable")
  })

  it("returns a bootswatch theme preset if `name` is used instead of `bootswatch`", {
    expect_equal(
      resolve_bs_preset(name = "darkly", version = 5),
      resolve_bs_preset(bootswatch = "darkly", version = 5)
    )

    expect_equal(
      resolve_bs_preset(name = "cosmo", version = 4),
      resolve_bs_preset(bootswatch = "cosmo", version = 4)
    )

    expect_equal(
      resolve_bs_preset(name = "readable", version = 3),
      resolve_bs_preset(bootswatch = "readable", version = 3)
    )
  })

  it("returns the builtin shiny theme preset", {
    shiny <- resolve_bs_preset(name = "shiny", version = 5)

    expect_s3_class(shiny, "bs_preset")
    expect_s3_class(shiny, "bs_preset_builtin")
    expect_equal(shiny$name, "shiny")
    expect_equal(shiny$version, "5")
    expect_equal(shiny$class, "bs_builtin_shiny")
  })
})

test_that("bs_preset_bundle() returns `NULL` for default or empty preset", {
  expect_null(bs_preset_bundle(resolve_bs_preset(name = "default")))
  expect_null(bs_preset_bundle(resolve_bs_preset(bootswatch = "default")))
  expect_null(bs_preset_bundle(NULL))
})
