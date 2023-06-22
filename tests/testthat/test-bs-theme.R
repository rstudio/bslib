test_that("bs_theme() and bs_theme_update() add and remove preset class", {
  theme <- bs_theme(5, preset = "bootstrap")
  expect_s3_class(theme, "bs_theme")
  expect_no_match(class(theme), THEME_PRESET_CLASS)

  # Adds preset class when adding a new preset
  theme_bsw_cyborg <- bs_theme_update(theme, preset = "cyborg")
  expect_s3_class(theme_bsw_cyborg, "bs_theme")
  expect_s3_class(theme_bsw_cyborg, THEME_PRESET_CLASS)

  # Keeps preset theme class when preset changes
  expect_s3_class(
    bs_theme_update(theme_bsw_cyborg, preset = "lumen"),
    THEME_PRESET_CLASS
  )

  # Drops preset theme class when preset is removed
  expect_no_match(
    class(bs_theme_update(theme_bsw_cyborg, preset = "bootstrap")),
    THEME_PRESET_CLASS
  )
})
