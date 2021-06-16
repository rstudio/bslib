test_that("bs4 base colors", {
  varnames <- c(
    "black", "white", paste0("gray-", 1:9 * 100),
    "body-bg", "body-color", "primary", "secondary"
  )

  theme <- bs_theme(4, bg = "white", fg = "black", primary = "blue", secondary = "silver")
  colors <- bs_get_variables(theme, varnames)

  expect_identical(colors,
    c(
      black = "#000000", white = "#FFFFFF", `gray-100` = "#E6E6E6",
      `gray-200` = "#CCCCCC", `gray-300` = "#B2B2B2", `gray-400` = "#999999",
      `gray-500` = "#808080", `gray-600` = "#666666", `gray-700` = "#4D4D4D",
      `gray-800` = "#333333", `gray-900` = "#191919", `body-bg` = "#FFFFFF",
      `body-color` = "#191919", primary = "#0000FF", secondary = "#C0C0C0")
  )

  theme <- bs_theme("4", bg = "#112233", fg = "#FFEEDD", primary = "orange", secondary = "brown")
  colors <- bs_get_variables(theme, varnames)

  expect_identical(colors,
    c(
      black = "#FFEEDD", white = "#112233", `gray-100` = "#293644",
      `gray-200` = "#414B55", `gray-300` = "#585F66", `gray-400` = "#707477",
      `gray-500` = "#888888", `gray-600` = "#A09C99", `gray-700` = "#B8B1AA",
      `gray-800` = "#CFC5BB", `gray-900` = "#E7DACC", `body-bg` = "#112233",
      `body-color` = "#E7DACC", primary = "#FFA500", secondary = "#A52A2A")
  )

  # Can individual colors still be overridden?
  theme <- bs_add_variables(theme, "body-bg" = "white", black = "red")
  expect_identical(bs_get_variables(theme, c("body-bg", "black")),
    c("body-bg" = "white", black = "red"))
})

test_that("bs3 base colors", {

  varnames <- c(
    "gray-base", "white",
    paste0("gray", c("-darker", "-dark", "", "-light", "-lighter")),
    "body-bg", "text-color", "brand-primary")

  theme <- bs_theme("3", bg = "white", fg = "black", primary = "blue")
  colors <- bs_get_variables(theme, varnames)

  expect_identical(colors,
    c(`gray-base` = "#000000", white = "#FFFFFF", `gray-darker` = "#222222",
      `gray-dark` = "#333333", gray = "#555555", `gray-light` = "#777777",
      `gray-lighter` = "#EEEEEE", `body-bg` = "#FFFFFF", `text-color` = "#333333",
      `brand-primary` = "#0000FF")
  )

  expect_warning(
    theme <- bs_theme("3", bg = "#112233", fg = "#FFEEDD", primary = "orange", secondary = "brown"),
    "doesn't support.*ignored"
  )
  colors <- bs_get_variables(theme, varnames)

  expect_identical(colors,
    c(`gray-base` = "#FFEEDD", white = "#112233", `gray-darker` = "#DFD3C6",
      `gray-dark` = "#CFC5BB", gray = "#B0AAA4", `gray-light` = "#908F8E",
      `gray-lighter` = "#21303E", `body-bg` = "#112233", `text-color` = "#CFC5BB",
      `brand-primary` = "#FFA500")
  )

  # Can individual colors still be overridden?
  theme <- bs_add_variables(theme, "body-bg" = "black")
  expect_identical(bs_get_variables(theme, c("body-bg", "gray-darker")),
    c("body-bg" = "black", "gray-darker" = "#DFD3C6"))
})

test_that("bs4 accent colors", {
  varnames <- c("primary", "secondary", "success", "info", "warning",
    "danger")

  # Baseline
  theme <- bs_theme(4)
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#007bff", secondary = "#6c757d",
      success = "#28a745", info = "#17a2b8", warning = "#ffc107", danger = "#dc3545")
  )

  theme <- bs_theme(4, primary = "#123", secondary = "#234",
                    success = "#345", info = "#456", warning = "#567", danger = "#678")
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#112233", secondary = "#223344", success = "#334455",
      info = "#445566", warning = "#556677", danger = "#667788")
  )

  theme <- bs_theme(4, primary = "#123", secondary = "#234",
                    success = "#345", info = "#456", warning = "#567", danger = "#678")
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#112233", secondary = "#223344",
      success = "#334455", info = "#445566", warning = "#556677", danger = "#667788")
  )
})

test_that("bs3 accent colors", {
  varnames <- c("primary", "secondary", "default", "success", "info", "warning",
    "danger")
  varnames <- paste0("brand-", varnames)

  # Baseline
  theme <- bs_theme("3")
  expect_identical(bs_get_variables(theme, varnames),
    c(`brand-primary` = "#337ab7", `brand-secondary` = NA, `brand-default` = NA,
      `brand-success` = "#5cb85c", `brand-info` = "#5bc0de", `brand-warning` = "#f0ad4e",
      `brand-danger` = "#d9534f")
  )

  expect_warning(
    theme <- bs_theme("3", primary = "#123", secondary = "#234",
                      success = "#345", info = "#456", warning = "#567", danger = "#678"),
    "doesn't support"
  )
  expect_identical(bs_get_variables(theme, varnames),
    c(`brand-primary` = "#112233", `brand-secondary` = NA, `brand-default` = NA,
      `brand-success` = "#334455", `brand-info` = "#445566", `brand-warning` = "#556677",
      `brand-danger` = "#667788")
  )
})

test_that("bs_theme_fonts", {
  expected_result <- "\"Source Sans Pro\", \"Open Sans\", Helvetica, sans-serif"
  candidates <- list(
    # All separate
    c("Source Sans Pro", "Open Sans", "Helvetica", "sans-serif"),
    # All together
    c("'Source Sans Pro'", "Open Sans", "Helvetica, sans-serif"),
    # Mixed
    c("'Source Sans Pro', \"Open Sans\", Helvetica, sans-serif")
  )

  lapply(versions(), function(version) {

    for (candidate in candidates) {
      theme <- bs_theme(version, base_font = candidate)
      expect_identical(
        bs_get_variables(theme, "font-family-base"),
        c(`font-family-base` = expected_result)
      )
    }
    expect_error(bs_fonts(theme, ""))
    expect_error(bs_fonts(theme, code = NA_character_))
    expect_error(bs_fonts(theme, heading = TRUE))
    expect_error(bs_fonts(theme, 10L))

    # NOT an error
    expect_error(bs_fonts(theme, NULL), NA)

    theme <- bs_fonts(bs_theme(), base = "a", code = "b", heading = "c")
    expect_identical(
      bs_get_variables(theme, c("font-family-base", "font-family-monospace", "headings-font-family")),
      c(`font-family-base` = "a", `font-family-monospace` = "b", `headings-font-family` = "c")
    )
  })
})

test_that("format_varnames", {
  expect_identical(format_varnames("a"), "`a`")
  expect_identical(format_varnames(c("a", "b")), "`a`, `b`")
  expect_identical(format_varnames(c("foo bar", "baz qux"), quot = "'", delim = "/"), "'foo bar'/'baz qux'")
})

test_that("validate_and_normalize_colors", {
  expect_null(validate_and_normalize_colors(NULL))

  # Bad
  expect_error(validate_and_normalize_colors(list(mycolor = "")), "Invalid.*mycolor")
  expect_error(validate_and_normalize_colors(list(foo = "bar")), "Invalid")
  expect_error(
    validate_and_normalize_colors(list(valid = "black", notvalid1 = "#00", notvalid2 = "#11111")),
    "Invalid.*notvalid.*notvalid2"
  )
  expect_error(validate_and_normalize_colors(list(toomany = c("red", "blue"))), "Invalid.*toomany")

  expect_identical(
    validate_and_normalize_colors(list(a = "#000", b = "white", c = "rgb(16, 32, 64)")),
    list(a = "#000000", b = "#FFFFFF", c = "#102040")
  )
})


test_that("bs_get_variables is fg/bg aware", {
  expect_equal(
    bs_get_variables(bs_theme(), c("bg", "fg")),
    c(bg = "#fff", fg = "#000")
  )
  expect_equal(
    bs_get_variables(bs_theme(version = 3), c("bg", "fg")),
    c(bg = "#fff", fg = "#000")
  )
  expect_equal(
    bs_get_variables(bs_theme(version = 4, bootswatch = "darkly"), c("bg", "fg")),
    c(bg = "#222", fg = "#fff")
  )
  expect_equal(
    bs_get_variables(bs_theme(version = 3, bootswatch = "darkly"), c("bg", "fg")),
    c(bg = "#222222", fg = "#fff")
  )
})


test_that("theme-color('default') works as expected", {
  # default theme color derives defaults from $gray-300
  css <- sass::sass_partial(
    ".foo{color:theme-color('default')}", bs_theme(version = 4)
  )
  expect_css(css, ".foo{color:#dee2e6;}")
  # but can be customized via secondary
  css <- sass::sass_partial(
    ".foo{color:theme-color('default')}", bs_theme(version = 4, secondary = "red")
  )
  expect_css(css, ".foo{color:#FF0000;}")
  expect_error(
    sass::sass(
      list(bs_theme(), ".foo { @extend .bg-default; }")
    ),
    NA
  )
})

test_that("bs_get_contrast() works as expected", {
  for (version in versions()) {
    base <- bs_theme(version)
    expect_equal(
      bs_get_contrast(base, "input-bg"), c("input-bg" = "#000000")
    )
    primary <- if ("3" %in% version) "brand-primary" else "primary"
    expect_equal(
      bs_get_contrast(base, c("input-bg", primary)),
      setNames(c("#000000", "#FFFFFF"), c("input-bg", primary))
    )
    inverted <- bs_theme_update(base, bg = "black", fg = "white")
    expect_equal(
      bs_get_contrast(inverted, "input-bg"),
      c("input-bg" = "#FFFFFF")
    )
    yb <- bs_theme(4, bg = "yellow", fg = "#0000FF")
    expect_equal(
      bs_get_contrast(yb, "input-bg"),
      c("input-bg" = "#0000FF")
    )
    yb <- bs_theme_update(yb, bg = "black", fg = "white", "color-contrast-light" = "#0000FF", "color-contrast-dark" = "yellow")
    expect_equal(
      bs_get_contrast(yb, "input-bg"),
      c("input-bg" = "#FFFF00")
    )
    expect_error(
      bs_get_contrast(base, "font"),
      "Undefined variable"
    )
    expect_error(
      bs_get_contrast(base, "font-family-base"),
      "must be a color"
    )
    if ("3" %in% version) {
      next
    }
    light_success <- bs_theme_update(inverted, success = "#E5FFE5")
    expect_equal(
      bs_get_contrast(light_success, "success"),
      c("success" = "#000000")
    )
    expect_equal(
      bs_get_contrast(bs_theme_update(light_success, "color-contrast-light" = "#222", "min-contrast-ratio" = 1), "success"),
      c("success" = "#222222")
    )
    dark_success <- bs_theme_update(inverted, success = "#193319")
    expect_equal(
      bs_get_contrast(dark_success, "success"),
      c("success" = "#FFFFFF")
    )
    expect_equal(
      bs_get_contrast(bs_theme_update(dark_success, "color-contrast-light" = "#F8F9FA"), "success"),
      c("success" = "#F8F9FA")
    )
  }
})


