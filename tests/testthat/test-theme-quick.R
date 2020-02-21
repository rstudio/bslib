context("theme_quick")

test_that("bs4 quick theme", {
  on.exit(bs_theme_clear(), add = TRUE, after = FALSE)

  varnames <- c("yiq-text-light", "yiq-text-dark",
    "black", "white", paste0("gray-", 1:9 * 100), "body-bg", "body-color",
    "primary", "secondary", "default")

  is_light <- function(colorstr) {
    col <- t(col2rgb(colorstr, alpha = FALSE))
    color_yiq_islight(col[,"red"], col[,"green"], col[,"blue"])
  }

  bs_theme_new("4+3")
  bs_theme_quick(bg = "white", fg = "black", accent = "blue", secondary = "silver")
  colors <- bs_theme_get_variables(varnames)
  expect_true(is_light(colors[["yiq-text-light"]]))
  expect_false(is_light(colors[["yiq-text-dark"]]))

  expect_identical(colors,
    c(`yiq-text-light` = "#FFFFFF", `yiq-text-dark` = "#191919",
      black = "#000000", white = "#FFFFFF", `gray-100` = "#E6E6E6",
      `gray-200` = "#CCCCCC", `gray-300` = "#B2B2B2", `gray-400` = "#999999",
      `gray-500` = "#808080", `gray-600` = "#666666", `gray-700` = "#4D4D4D",
      `gray-800` = "#333333", `gray-900` = "#191919", `body-bg` = "#FFFFFF",
      `body-color` = "#191919", primary = "blue", secondary = "silver",
      default = "silver")
  )

  bs_theme_new("4")
  bs_theme_quick(bg = "#112233", fg = "#FFEEDD", accent = "orange", secondary = "brown")
  colors <- bs_theme_get_variables(varnames)
  expect_true(is_light(colors[["yiq-text-light"]]))
  expect_false(is_light(colors[["yiq-text-dark"]]))

  expect_identical(colors,
    c(`yiq-text-light` = "#E7DACC", `yiq-text-dark` = "#112233",
      black = "#FFEEDD", white = "#112233", `gray-100` = "#293644",
      `gray-200` = "#414B55", `gray-300` = "#585F66", `gray-400` = "#707477",
      `gray-500` = "#888888", `gray-600` = "#A09C99", `gray-700` = "#B8B1AA",
      `gray-800` = "#CFC5BB", `gray-900` = "#E7DACC", `body-bg` = "#112233",
      `body-color` = "#E7DACC", primary = "orange", secondary = "brown",
      default = "brown")
  )

  # Can individual colors still be overridden?
  bs_theme_add_variables("body-bg" = "white", black = "red")
  expect_identical(bs_theme_get_variables(c("body-bg", "black")),
    c("body-bg" = "white", black = "red"))
})

test_that("bs3 quick theme", {
  on.exit(bs_theme_clear(), add = TRUE, after = FALSE)

  varnames <- c(
    "gray-base", "white",
    paste0("gray", c("-darker", "-dark", "", "-light", "-lighter")),
    "body-bg", "text-color", "brand-primary")

  bs_theme_new("3")
  bs_theme_quick(bg = "white", fg = "black", accent = "blue")
  colors <- bs_theme_get_variables(varnames)

  expect_identical(colors,
    c(`gray-base` = "#000000", white = "#FFFFFF", `gray-darker` = "#222222",
      `gray-dark` = "#333333", gray = "#555555", `gray-light` = "#777777",
      `gray-lighter` = "#EEEEEE", `body-bg` = "#FFFFFF", `text-color` = "#333333",
      `brand-primary` = "blue")
  )

  bs_theme_new("3")
  expect_warning(
    bs_theme_quick(bg = "#112233", fg = "#FFEEDD", accent = "orange", secondary = "brown"),
    "argument is not currently supported"
  )
  colors <- bs_theme_get_variables(varnames)

  expect_identical(colors,
    c(`gray-base` = "#FFEEDD", white = "#112233", `gray-darker` = "#DFD3C6",
      `gray-dark` = "#CFC5BB", gray = "#B0AAA4", `gray-light` = "#908F8E",
      `gray-lighter` = "#21303E", `body-bg` = "#112233", `text-color` = "#CFC5BB",
      `brand-primary` = "orange")
  )

  # Can individual colors still be overridden?
  bs_theme_add_variables("body-bg" = "black")
  expect_identical(bs_theme_get_variables(c("body-bg", "gray-darker")),
    c("body-bg" = "black", "gray-darker" = "#DFD3C6"))
})
