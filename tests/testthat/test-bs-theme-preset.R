describe("new_theme_preset()", {
  it("returns NULL if both `name` and `bootswatch` are missing", {
    expect_null(resolve_bs_preset(preset = NULL, bootswatch = NULL))
  })

  it("throws an error if both `name` and `bootswatch` are provided", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(preset = "name", bootswatch = "bootswatch")
    )
  })

  it("throws an error if `name` or `bootswatch` are not scalar strings", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(preset = c("a", "b"))
    )
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(bootswatch = c("a", "b"))
    )

    expect_error(resolve_bs_preset(preset = 1))
    expect_error(resolve_bs_preset(bootswatch = 1))

    expect_error(resolve_bs_preset(preset = TRUE))
    expect_error(resolve_bs_preset(bootswatch = TRUE))

    expect_error(resolve_bs_preset(preset = NA_character_))
    expect_error(resolve_bs_preset(bootswatch = NA_character_))
  })

  it("throws an error if `name` or `bootswatch` don't match existing presets", {
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(preset = "not_a_preset", version = 4)
    )
    expect_snapshot(
      error = TRUE,
      resolve_bs_preset(bootswatch = "not_a_preset", version = 4)
    )
  })

  it("throws an error for unknown bootstrap version", {
    expect_error(resolve_bs_preset(preset = "cerulean", version = "2"))
    expect_error(resolve_bs_preset(bootswatch = "cerulean", version = "99"))

    expect_warning(resolve_bs_preset(bootswatch = "cerulean", version = "4-3"))
  })

  it("returns a 'default' preset if name or bootswatch is 'default' or 'bootstrap'", {
    expect_equal(
      resolve_bs_preset(preset = "default"),
      resolve_bs_preset(bootswatch = "default")
    )

    expect_equal(
      resolve_bs_preset(preset = "bootstrap"),
      resolve_bs_preset(bootswatch = "bootstrap")
    )

    expect_equal(
      resolve_bs_preset(preset = "default"),
      resolve_bs_preset(preset = "bootstrap")
    )

    expect_equal(
      unclass(resolve_bs_preset(preset = "default")),
      list(version = version_default(), name = "bootstrap")
    )

    expect_identical(class(resolve_bs_preset(preset = "default")), "bs_preset")
  })

  it("returns a BS5 Bootswatch theme preset", {
    bsw_darkly <- resolve_bs_preset(bootswatch = "darkly", version = 5)

    expect_s3_class(bsw_darkly, "bs_preset")
    expect_s3_class(bsw_darkly, "bs_preset_bootswatch")
    expect_equal(bsw_darkly$name, "darkly")
    expect_equal(bsw_darkly$version, "5")
    expect_equal(bsw_darkly$theme_class, "bs_theme_with_preset")
  })

  it("returns a BS4 Bootswatch theme preset", {
    bsw_cosmo <- resolve_bs_preset(bootswatch = "cosmo", version = 4)

    expect_s3_class(bsw_cosmo, "bs_preset")
    expect_s3_class(bsw_cosmo, "bs_preset_bootswatch")
    expect_equal(bsw_cosmo$name, "cosmo")
    expect_equal(bsw_cosmo$version, "4")
    expect_equal(bsw_cosmo$theme_class, "bs_theme_with_preset")
  })

  it("returns a BS3 Bootswatch theme preset", {
    bsw_readable <- resolve_bs_preset(bootswatch = "readable", version = 3)

    expect_s3_class(bsw_readable, "bs_preset")
    expect_s3_class(bsw_readable, "bs_preset_bootswatch")
    expect_equal(bsw_readable$name, "readable")
    expect_equal(bsw_readable$version, "3")
    expect_equal(bsw_readable$theme_class, "bs_theme_with_preset")
  })

  it("returns a bootswatch theme preset if `name` is used instead of `bootswatch`", {
    expect_equal(
      resolve_bs_preset(preset = "darkly", version = 5),
      resolve_bs_preset(bootswatch = "darkly", version = 5)
    )

    expect_equal(
      resolve_bs_preset(preset = "cosmo", version = 4),
      resolve_bs_preset(bootswatch = "cosmo", version = 4)
    )

    expect_equal(
      resolve_bs_preset(preset = "readable", version = 3),
      resolve_bs_preset(bootswatch = "readable", version = 3)
    )
  })

  it("returns the builtin shiny theme preset", {
    shiny <- resolve_bs_preset(preset = "shiny", version = 5)

    expect_s3_class(shiny, "bs_preset")
    expect_s3_class(shiny, "bs_preset_builtin")
    expect_equal(shiny$name, "shiny")
    expect_equal(shiny$version, "5")
    expect_equal(shiny$theme_class, "bs_theme_with_preset")
  })
})

test_that("bs_preset_bundle() returns `NULL` for default or empty preset", {
  expect_null(bs_preset_bundle(resolve_bs_preset(preset = "default")))
  expect_null(bs_preset_bundle(resolve_bs_preset(bootswatch = "default")))
  expect_null(bs_preset_bundle(NULL))
})

describe("theme_preset_info()", {
  it("returns bootswatch theme information", {
    expect_equal(
      theme_preset_info(bs_theme(version = 5, bootswatch = "flatly")),
      new_bs_preset("flatly", version = "5", type = "bootswatch")
    )

    expect_equal(
      theme_preset_info(bs_theme(version = 4, bootswatch = "superhero")),
      new_bs_preset("superhero", version = "4", type = "bootswatch")
    )

    expect_equal(
      theme_preset_info(bs_theme(version = 3, bootswatch = "yeti")),
      new_bs_preset("yeti", version = "3", type = "bootswatch")
    )
  })

  it("returns builtin preset theme information", {
    expect_equal(
      theme_preset_info(bs_theme(version = 5, preset = "shiny")),
      new_bs_preset("shiny", version = "5", type = "builtin")
    )
  })

  it("returns vanilla bootstrap theme information", {
    expect_equal(
      theme_preset_info(bs_theme(version = 5)),
      new_bs_preset("bootstrap", version = "5")
    )

    expect_equal(
      theme_preset_info(bs_theme(version = 4)),
      new_bs_preset("bootstrap", version = "4")
    )

    expect_equal(
      theme_preset_info(bs_theme(version = 3)),
      new_bs_preset("bootstrap", version = "3")
    )
  })

  it("returns NULL if not given a bs_theme object", {
    expect_null(theme_preset_info(list()))
  })
})
