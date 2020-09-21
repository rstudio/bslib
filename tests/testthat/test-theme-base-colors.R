test_that("bs4 base colors", {
  varnames <- c("yiq-text-light", "yiq-text-dark",
    "black", "white", paste0("gray-", 1:9 * 100), "body-bg", "body-color",
    "primary", "secondary", "default")

  is_light <- function(colorstr) {
    col <- t(col2rgb(colorstr, alpha = FALSE))
    color_yiq_islight(col[,"red"], col[,"green"], col[,"blue"])
  }

  theme <- bs_theme("4+3", bg = "white", fg = "black", primary = "blue", secondary = "silver")
  colors <- bs_get_variables(theme, varnames)
  expect_true(is_light(colors[["yiq-text-light"]]))
  expect_false(is_light(colors[["yiq-text-dark"]]))

  expect_identical(colors,
    c(`yiq-text-light` = "#FFFFFF", `yiq-text-dark` = "#191919",
      black = "#000000", white = "#FFFFFF", `gray-100` = "#E6E6E6",
      `gray-200` = "#CCCCCC", `gray-300` = "#B2B2B2", `gray-400` = "#999999",
      `gray-500` = "#808080", `gray-600` = "#666666", `gray-700` = "#4D4D4D",
      `gray-800` = "#333333", `gray-900` = "#191919", `body-bg` = "#FFFFFF",
      `body-color` = "#191919", primary = "#0000FF", secondary = "#C0C0C0",
      default = "#C0C0C0")
  )

  theme <- bs_theme("4", bg = "#112233", fg = "#FFEEDD", primary = "orange", secondary = "brown")
  colors <- bs_get_variables(theme, varnames)
  expect_true(is_light(colors[["yiq-text-light"]]))
  expect_false(is_light(colors[["yiq-text-dark"]]))

  expect_identical(colors,
    c(`yiq-text-light` = "#E7DACC", `yiq-text-dark` = "#112233",
      black = "#FFEEDD", white = "#112233", `gray-100` = "#293644",
      `gray-200` = "#414B55", `gray-300` = "#585F66", `gray-400` = "#707477",
      `gray-500` = "#888888", `gray-600` = "#A09C99", `gray-700` = "#B8B1AA",
      `gray-800` = "#CFC5BB", `gray-900` = "#E7DACC", `body-bg` = "#112233",
      `body-color` = "#E7DACC", primary = "#FFA500", secondary = "#A52A2A",
      default = NA)
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

  theme <- expect_warning(
    bs_theme("3", bg = "#112233", fg = "#FFEEDD", primary = "orange", secondary = "brown"),
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
  varnames <- c("primary", "secondary", "default", "success", "info", "warning",
    "danger")

  # Baseline
  theme <- bs_theme("4+3")
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#007bff", secondary = "#6c757d", default = "#dee2e6",
      success = "#28a745", info = "#17a2b8", warning = "#ffc107", danger = "#dc3545")
  )

  theme <- bs_theme("4", primary = "#123", secondary = "#234",
                    success = "#345", info = "#456", warning = "#567", danger = "#678")
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#112233", secondary = "#223344", default = NA, success = "#334455",
      info = "#445566", warning = "#556677", danger = "#667788")
  )

  theme <- bs_theme("4+3", primary = "#123", secondary = "#234",
                    success = "#345", info = "#456", warning = "#567", danger = "#678")
  expect_identical(bs_get_variables(theme, varnames),
    c(primary = "#112233", secondary = "#223344", default = "#223344",
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

  theme <- expect_warning(
    bs_theme("3", primary = "#123", secondary = "#234",
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

  for (version in c("4+3", "4", "3")) {

    for (candidate in candidates) {
      theme <- bs_theme(version, base_font = candidate)
      expect_identical(
        bs_get_variables(theme, "font-family-base"),
        c(`font-family-base` = expected_result)
      )
    }

    expect_error(bs_fonts(theme, ""), "base")
    expect_error(bs_fonts(theme, code = NA_character_), "code")
    expect_error(bs_fonts(theme, heading = TRUE), "heading")
    expect_error(bs_fonts(theme, 10L))

    # NOT an error
    expect_error(bs_fonts(theme, NULL), NA)

    theme <- bs_fonts(base = "a", code = "b", heading = "c")
    expect_identical(
      bs_get_variables(theme, c("font-family-base", "font-family-monospace", "headings-font-family")),
      c(`font-family-base` = "a", `font-family-monospace` = "b", `headings-font-family` = "c")
    )
  }
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

test_that("dispatch_theme_setter", {
  theme <- bs_theme("4+3")
  expect_error(dispatch_theme_modifier(theme, list(), args = list(), "HelloWorld"))
  expect_error(dispatch_theme_modifier(theme, list("3" = identity), args = list(), "HelloWorld"))
  expect_error(dispatch_theme_modifier(theme, list("4" = identity), args = list(), "HelloWorld"))
  expect_error(
    dispatch_theme_modifier(theme, list("4+3" = identity), args = list(), "HelloWorld"),
    NA
  )
})
