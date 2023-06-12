describe("new_theme_preset()", {
  it("returns NULL if both `name` and `bootswatch` are missing", {
    expect_null(new_theme_preset(name = NULL, bootswatch = NULL))
  })

  it("throws an error if both `name` and `bootswatch` are provided", {
    expect_error(new_theme_preset(name = "name", bootswatch = "bootswatch"))
  })

  it("throws an error if `name` or `bootswatch` are not scalar strings", {
    expect_error(new_theme_preset(name = c("a", "b")))
    expect_error(new_theme_preset(bootswatch = c("a", "b")))

    expect_error(new_theme_preset(name = 1))
    expect_error(new_theme_preset(bootswatch = 1))

    expect_error(new_theme_preset(name = TRUE))
    expect_error(new_theme_preset(bootswatch = TRUE))

    expect_error(new_theme_preset(name = NA_character_))
    expect_error(new_theme_preset(bootswatch = NA_character_))
  })

  it("throws an error if `name` or `bootswatch` don't match existing presets", {
    expect_error(new_theme_preset(name = "not_a_preset"))
    expect_error(new_theme_preset(bootswatch = "not_a_preset"))
  })

  it("returns a 'default' preset if name or bootswatch is 'default' or 'bootstrap'", {
    expect_equal(
      new_theme_preset(name = "default"),
      new_theme_preset(bootswatch = "default")
    )

    expect_equal(
      new_theme_preset(name = "bootstrap"),
      new_theme_preset(bootswatch = "bootstrap")
    )

    expect_equal(
      new_theme_preset(name = "default"),
      new_theme_preset(name = "bootstrap")
    )

    expect_equal(
      unclass(new_theme_preset(name = "default")),
      list(version = version_default(), name = "default")
    )

    expect_identical(class(new_theme_preset(name = "default")), "bs_theme_preset")
  })

  it("returns a BS5 Bootswatch theme preset", {
    bsw_darkly <- new_theme_preset(bootswatch = "darkly", version = 5)

    expect_s3_class(bsw_darkly, "bs_theme_preset")
    expect_s3_class(bsw_darkly, "bs_preset_bootswatch")
    expect_equal(bsw_darkly$name, "darkly")
    expect_equal(bsw_darkly$version, 5)
    expect_equal(bsw_darkly$class, "bs_bootswatch_darkly")
  })

  it("returns a BS4 Bootswatch theme preset", {
    bsw_cosmo <- new_theme_preset(bootswatch = "cosmo", version = 4)

    expect_s3_class(bsw_cosmo, "bs_theme_preset")
    expect_s3_class(bsw_cosmo, "bs_preset_bootswatch")
    expect_equal(bsw_cosmo$name, "cosmo")
    expect_equal(bsw_cosmo$version, 4)
    expect_equal(bsw_cosmo$class, "bs_bootswatch_cosmo")
  })

  it("returns a BS3 Bootswatch theme preset", {
    bsw_readable <- new_theme_preset(bootswatch = "readable", version = 3)

    expect_s3_class(bsw_readable, "bs_theme_preset")
    expect_s3_class(bsw_readable, "bs_preset_bootswatch")
    expect_equal(bsw_readable$name, "readable")
    expect_equal(bsw_readable$version, 3)
    expect_equal(bsw_readable$class, "bs_bootswatch_readable")
  })

  it("returns a bootswatch theme preset if `name` is used instead of `bootswatch`", {
    expect_equal(
      new_theme_preset(name = "darkly", version = 5),
      new_theme_preset(bootswatch = "darkly", version = 5)
    )

    expect_equal(
      new_theme_preset(name = "cosmo", version = 4),
      new_theme_preset(bootswatch = "cosmo", version = 4)
    )

    expect_equal(
      new_theme_preset(name = "readable", version = 3),
      new_theme_preset(bootswatch = "readable", version = 3)
    )
  })

  it("returns the builtin shiny theme preset", {
    shiny <- new_theme_preset(name = "shiny", version = 5)

    expect_s3_class(shiny, "bs_theme_preset")
    expect_s3_class(shiny, "bs_preset_builtin")
    expect_equal(shiny$name, "shiny")
    expect_equal(shiny$version, 5)
    expect_equal(shiny$class, "bs_builtin_shiny")
  })
})

test_that("bs_preset_bundle() returns `NULL` for default or empty preset", {
  expect_null(bs_preset_bundle(new_theme_preset(name = "default")))
  expect_null(bs_preset_bundle(new_theme_preset(bootswatch = "default")))
  expect_null(bs_preset_bundle(NULL))
})
