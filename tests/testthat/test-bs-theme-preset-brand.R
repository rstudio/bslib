# testthat::test_that()

describe("as_brand_yml()", {
  skip_if_not_installed("brand.yml")

  it("normalizes colors", {
    brand <- list(
      color = list(
        palette = list(red = "#FF1122"),
        primary = "red",
        secondary = "berry"
      )
    )

    brand <- brand.yml::as_brand_yml(brand)
    expect_s3_class(brand, "brand_yml")
    expect_equal(brand$color$palette$red, brand$color$primary)
    expect_equal(brand$color$secondary, "berry")
  })

  it("normalizes font family choices", {
    brand <- list(
      typography = list(
        base = "Times New Roman",
        headings = "Helvetica",
        monospace = "Courier New",
        "monospace-inline" = "Fira Code"
      )
    )

    brand <- brand.yml::as_brand_yml(brand)
    expect_s3_class(brand, "brand_yml")
    expect_equal(brand$typography$base$family, "Times New Roman")
    expect_equal(brand$typography$headings$family, "Helvetica")
    expect_equal(brand$typography[["monospace"]]$family, "Courier New")
    expect_equal(brand$typography[["monospace_inline"]]$family, "Fira Code")
  })
})

describe("brand_resolve()", {
  withr::local_dir(withr::local_tempdir())

  it("returns `NULL` if brand.yml is not installed", {
    is_installed_og <- is_installed

    local_mocked_bindings(
      is_installed = function(pkg) {
        if (pkg == "brand.yml") FALSE else is_installed_og(pkg)
      }
    )

    expect_null(brand_resolve(NULL))
  })

  it("returns NULL if `brand = FALSE`", {
    expect_null(brand_resolve(FALSE))
  })

  skip_if_not_installed("brand.yml")

  it("doesn't error if `brand = NULL` and no _brand.yml is found", {
    expect_null(brand_resolve(NULL))
  })

  it("throws if `brand = TRUE` and no `_brand.yml` is found", {
    expect_error(brand_resolve(TRUE))
  })

  writeLines(
    c("meta:", "  name: test-brand-yml"),
    "_brand.yml"
  )

  direct_is_valid <- FALSE

  it("finds _brand.yml or reads from brand path", {
    path_with_parent_dir <- function(x) {
      file.path(basename(dirname(x)), basename(x))
    }

    # brand=TRUE and brand=NULL are the same in presence of _brand.yml file
    expect_equal(brand_resolve(TRUE), brand_resolve(NULL))

    brand_found <- brand_resolve(TRUE)
    brand_found$path <- path_with_parent_dir(brand_found$path)
    brand_direct <- brand_resolve("_brand.yml")
    brand_direct$path <- path_with_parent_dir(brand_direct$path)

    expect_equal(brand_found, brand_direct)
    expect_s3_class(brand_found, "brand_yml")
    expect_equal(
      brand_found$path,
      path_with_parent_dir(file.path(getwd(), "_brand.yml"))
    )
    direct_is_valid <<- TRUE
  })

  it("takes a list or a brand_yml object", {
    expect_true(direct_is_valid)

    brand_list <- brand_resolve(list(meta = list(name = "test-brand-yml")))
    brand_direct <- brand_resolve("_brand.yml")
    brand_direct$path <- NULL # brand is equal other than via path
    brand_obj <- brand_resolve(brand_direct)

    # brand_direct validated above
    expect_equal(brand_list, brand_direct)
    expect_equal(brand_obj, brand_direct)
  })

  it("uses brand.defaults.shiny.theme.preset", {
    brand <- brand.yml::as_brand_yml(
      list(
        meta = list(name = "test-brand-yml"),
        defaults = list(
          shiny = list(theme = list(preset = "flatly", version = "4"))
        )
      )
    )

    expected_base_preset <- resolve_bs_preset("flatly", version = "4")
    brand_preset <- brand_resolve(brand)
    preset <- brand_resolve_preset(brand)
    expect_equal(preset, expected_base_preset)
    expect_equal(preset$version, "4")
    expect_equal(preset$name, "flatly")
    expect_equal(preset$version, "4")
  })

  it("throws if `brand.defaults.shiny.theme.preset: brand`", {
    brand <- brand.yml::as_brand_yml(
      list(
        meta = list(name = "test-brand-yml"),
        defaults = list(
          shiny = list(theme = list(preset = "brand", version = "4"))
        )
      )
    )

    expect_error(
      brand_resolve_preset(brand),
      "is not a known preset"
    )
  })

  it("uses brand.defaults.shiny.theme.version before brand.defaults.bootstrap.version", {
    brand <- brand.yml::as_brand_yml(
      list(
        meta = list(name = "test-brand-yml"),
        defaults = list(
          bootstrap = list(version = 3),
          shiny = list(theme = list(preset = "flatly", version = "4"))
        )
      )
    )

    expected_base_preset <- resolve_bs_preset("flatly", version = "4")
    brand <- brand_resolve(brand)
    preset <- brand_resolve_preset(brand)
    expect_equal(preset, expected_base_preset)
    expect_equal(preset$version, "4")
    expect_equal(preset$name, "flatly")
    expect_equal(preset$version, "4")
  })

  it("uses brand.defaults.bootstrap.version", {
    brand <- brand.yml::as_brand_yml(
      list(
        meta = list(name = "test-brand-yml"),
        defaults = list(
          bootstrap = list(version = 4)
        )
      )
    )

    expected_base_preset <- resolve_bs_preset("bootstrap", version = "4")
    brand <- brand_resolve(brand)
    preset <- brand_resolve_preset(brand)
    expect_equal(preset, expected_base_preset)
    expect_equal(preset$version, "4")
    expect_equal(preset$name, "bootstrap")
    expect_equal(preset$version, "4")
  })
})

describe("brand_resolve_preset()", {
  skip_if_not_installed("brand.yml")
  withr::local_dir(withr::local_tempdir())

  write_brand_yml_preset <- function(preset = NULL, version = NULL) {
    b <- list(
      defaults = list(
        shiny = list(
          theme = list(
            preset = preset,
            version = version
          )
        )
      )
    )
    b <- dropNulls(b)
    yaml::write_yaml(b, "_brand.yml")
  }

  write_brand_yml_preset(preset = "flatly")

  it("uses `preset` and `version` from `_brand.yml`", {
    preset <- brand_resolve_preset(brand_resolve(NULL))
    expect_equal(preset$name, "flatly")
    expect_equal(preset$version, version_default())
  })

  it("uses `preset` and `version` from `bs_theme()`", {
    preset <- brand_resolve_preset(NULL, preset = "cosmo", 5)
    expect_equal(preset$name, "cosmo")
    expect_equal(preset$version, version_default())
  })

  it("uses `shiny` by default for BS 5", {
    write_brand_yml_preset(version = "5")
    preset <- brand_resolve_preset(brand_resolve(NULL))
    expect_equal(preset$name, "shiny")
    expect_equal(preset$version, "5")
  })

  it("uses `bootstrap` by default for BS 4", {
    write_brand_yml_preset(version = "4")
    preset <- brand_resolve_preset(brand_resolve(NULL))
    expect_equal(preset$name, "bootstrap")
    expect_equal(preset$version, "4")
  })
})

describe("brand_color_pluck()", {
  skip_if_not_installed("brand.yml")

  it("detects cyclic references in brand.color.palette", {
    brand <- list(
      color = list(
        palette = list(red = "blue", blue = "red")
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, "red"),
      "palette.red -> palette.blue -> palette.red"
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, "blue"),
      "palette.blue -> palette.red -> palette.blue"
    )
  })

  it("detects cyclic references in brand.color", {
    brand <- list(
      color = list(
        primary = "secondary",
        secondary = "primary"
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, "primary"),
      "primary -> secondary -> primary"
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, "secondary"),
      "secondary -> primary -> secondary"
    )
  })

  it("detects cyclic references in brand.color and brand.color.palette", {
    brand1 <- list(
      color = list(
        palette = list(
          primary = "secondary",
          secondary = "resolved" # cycles before reaches here
        ),
        primary = "primary",
        secondary = "primary" # bad
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand1, "primary"),
      "primary -> palette.primary -> secondary -> palette.primary"
    )

    brand2 <- list(
      color = list(
        palette = list(red = "primary"),
        primary = "red"
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand2, "red"),
      "palette.red -> primary -> palette.red"
    )

    expect_error(
      brand.yml::brand_color_pluck(brand2, "primary"),
      "primary -> palette.red -> primary"
    )
  })

  it("avoids high levels of recursion", {
    max_recursion <- 101
    seq_max <- 1:max_recursion
    color_ref <- function(i) sprintf("color%s", i)

    brand <- list(
      color = list(
        palette = lapply(
          rlang::set_names(seq_max, color_ref(seq_max - 1)),
          color_ref
        )
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, color_ref(0)),
      "recursion limit"
    )
  })

  it("returns `key` if `brand.color` isn't present", {
    brand <- list(meta = list(name = "no color"))
    expect_equal(brand.yml::brand_color_pluck(brand, "red"), "red")
  })

  it("returns `NULL` if the color is preset but `NULL`", {
    brand <- list(color = list(secondary = NULL, palette = list(black = NULL)))
    expect_null(brand.yml::brand_color_pluck(brand, "secondary"))
    expect_null(brand.yml::brand_color_pluck(brand, "black"))
  })

  it("errors if the color value is not a string", {
    brand <- list(
      color = list(
        secondary = 123456,
        palette = list(black = 123456)
      )
    )

    expect_error(
      brand.yml::brand_color_pluck(brand, "secondary"),
      "brand.color.secondary"
    )
    expect_error(
      brand.yml::brand_color_pluck(brand, "black"),
      "brand.color.palette.black"
    )
  })
})

describe("bs_brand_bundle()", {
  skip_if_not_installed("brand.yml")

  it("warns with Bootstrap <= 4", {
    expect_warning(
      bs_brand_bundle(list(), "3")
    )

    expect_warning(
      bs_brand_bundle(list(), "4")
    )

    expect_silent(
      bs_brand_bundle(list(), "5")
    )
  })

  it("doesn't re-resolve brand", {
    bs_theme_base <- bs_theme()

    withr::local_dir(withr::local_tempdir())

    writeLines(
      c("color:", "  primary: '#FF1122'"),
      "_brand.yml"
    )

    expect_null(bs_brand_bundle(NULL))
    expect_true(
      bs_get_variables(bs_theme(brand = FALSE), "primary") != "#FF1122"
    )
    expect_equal(bs_theme(brand = FALSE), bs_theme_base)
  })
})

brand_css <- function(brand) {
  withr::local_options("bslib.color_contrast_warnings" = FALSE)

  dependencies <- bs_theme_dependencies(
    bs_theme(version = 5, preset = "bootstrap", brand = brand),
    sass_options = sass::sass_options(output_style = "expanded"),
    cache = FALSE,
    precompiled = FALSE
  )
  bootstrap <- Filter(
    function(x) identical(x$name, "bootstrap"),
    dependencies
  )[[1]]

  paste(
    readLines(file.path(bootstrap$src$file, bootstrap$stylesheet)),
    collapse = "\n"
  )
}

brand_css_light_root <- function(css) {
  matches <- regmatches(
    css,
    gregexpr(
      ':root\\s*,\\s*\\[data-bs-theme="light"\\]\\s*\\{[^}]*\\}',
      css,
      perl = TRUE
    )
  )[[1]]
  matches <- Filter(
    function(x) grepl("--bs-body-bg:", x, fixed = TRUE),
    matches
  )
  expect_length(matches, 1)
  matches[[1]]
}

brand_css_dark_root <- function(css) {
  matches <- regmatches(
    css,
    gregexpr('\\[data-bs-theme="dark"\\]\\s*\\{[^}]*\\}', css, perl = TRUE)
  )[[1]]
  matches <- Filter(
    function(x) grepl("--bs-body-bg:", x, fixed = TRUE),
    matches
  )
  expect_gte(length(matches), 2)

  # The final stylesheet layer emits the complete dark root followed by
  # Bootstrap's dark-specific variables.
  tail(matches, 2)[[1]]
}

brand_css_dark_rule <- function(css, selector) {
  matches <- regmatches(
    css,
    gregexpr(
      sprintf('\\[data-bs-theme="dark"\\]\\s+%s\\s*\\{[^}]*\\}', selector),
      css,
      perl = TRUE
    )
  )[[1]]
  expect_length(matches, 1)
  matches[[1]]
}

brand_css_dark_runtime <- function(css) {
  matches <- regmatches(
    css,
    gregexpr('\\[data-bs-theme="dark"\\]\\s*\\{[^}]*\\}', css, perl = TRUE)
  )[[1]]
  matches <- Filter(
    function(x) grepl("--bs-link-bg:", x, fixed = TRUE),
    matches
  )
  expect_length(matches, 1)
  matches[[1]]
}

describe("brand light and dark color modes", {
  skip_if_not_installed("brand.yml", minimum_version = "0.1.0.9000")

  it("emits full color and typography variants in Bootstrap mode selectors", {
    css <- brand_css(list(
      color = list(
        foreground = list(light = "#111111", dark = "#eeeeee"),
        background = list(light = "#ffffff", dark = "#222222"),
        primary = list(light = "#0066cc", dark = "#66b2ff")
      ),
      typography = list(
        headings = list(color = list(light = "#223344", dark = "#ddeeff"))
      )
    ))

    light <- brand_css_light_root(css)
    dark <- brand_css_dark_root(css)

    expect_match(light, "--bs-body-color: #111111;", fixed = TRUE)
    expect_match(light, "--bs-body-bg: #ffffff;", fixed = TRUE)
    expect_match(light, "--bs-primary: #0066cc;", fixed = TRUE)
    expect_match(light, "--bs-heading-color: #223344;", fixed = TRUE)
    expect_match(dark, "--bs-body-color: #eeeeee;", fixed = TRUE)
    expect_match(dark, "--bs-body-bg: #222222;", fixed = TRUE)
    expect_match(dark, "--bs-primary: #66b2ff;", fixed = TRUE)
    expect_match(dark, "--bs-heading-color: #ddeeff;", fixed = TRUE)
  })

  it("leaves an undefined mode at Bootstrap's default", {
    dark_only <- brand_css(list(
      color = list(background = list(dark = "#222222"))
    ))
    expect_match(
      brand_css_light_root(dark_only),
      "--bs-body-bg: #fff;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(dark_only),
      "--bs-body-bg: #222222;",
      fixed = TRUE
    )

    light_only <- brand_css(list(
      color = list(primary = list(light = "#112233"))
    ))
    expect_match(
      brand_css_light_root(light_only),
      "--bs-primary: #112233;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(light_only),
      "--bs-primary: #0d6efd;",
      fixed = TRUE
    )
    expect_false(grepl(
      "#112233",
      brand_css_dark_root(light_only),
      fixed = TRUE
    ))
  })

  it("resolves partial references within their own color mode", {
    css <- brand_css(list(
      color = list(
        primary = list(dark = "#112233"),
        secondary = list(light = "primary", dark = "#445566")
      )
    ))

    expect_match(
      brand_css_light_root(css),
      "--bs-secondary: #6c757d;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(css),
      "--bs-secondary: #445566;",
      fixed = TRUE
    )
  })

  it("keeps scalar colors and typography values in both modes", {
    css <- brand_css(list(
      color = list(primary = "#123456"),
      typography = list(
        base = list(family = "Georgia"),
        headings = list(color = "#445566")
      )
    ))

    for (root in list(brand_css_light_root(css), brand_css_dark_root(css))) {
      expect_match(root, "--bs-primary: #123456;", fixed = TRUE)
      expect_match(root, "--bs-body-font-family: Georgia;", fixed = TRUE)
      expect_match(root, "--bs-heading-color: #445566;", fixed = TRUE)
    }
  })

  it("switches typography backgrounds and block colors", {
    css <- brand_css(list(
      typography = list(
        link = list(
          "background-color" = list(
            light = "#e6f0ff",
            dark = "#12243d"
          )
        ),
        "monospace-inline" = list(
          "background-color" = list(
            light = "#f1f3f5",
            dark = "#24292f"
          )
        ),
        "monospace-block" = list(
          color = list(light = "#202124", dark = "#f8f9fa"),
          "background-color" = list(light = "#ffffff", dark = "#161b22")
        )
      )
    ))

    expect_match(css, "--bs-link-bg: #e6f0ff;", fixed = TRUE)
    expect_match(css, "--bs-link-bg: #12243d;", fixed = TRUE)
    expect_match(css, "background-color: #f1f3f5;", fixed = TRUE)
    expect_match(
      brand_css_dark_rule(css, "code"),
      "background-color: #24292f;",
      fixed = TRUE
    )
    expect_match(css, "color: #202124;", fixed = TRUE)
    expect_match(css, "background-color: #ffffff;", fixed = TRUE)
    expect_match(
      brand_css_dark_rule(css, "pre"),
      "color: #f8f9fa;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_rule(css, "pre"),
      "background-color: #161b22;",
      fixed = TRUE
    )
  })

  it("does not leak light typography backgrounds into dark mode", {
    css <- brand_css(list(
      typography = list(
        link = list("background-color" = list(light = "#e6f0ff")),
        "monospace-inline" = list(
          "background-color" = list(light = "#f1f3f5")
        ),
        "monospace-block" = list(
          color = list(light = "#202124"),
          "background-color" = list(light = "#ffffff")
        )
      )
    ))

    expect_match(
      brand_css_dark_runtime(css),
      "--bs-link-bg: ;",
      fixed = TRUE
    )
    expect_false(grepl(
      "#f1f3f5",
      brand_css_dark_rule(css, "code"),
      fixed = TRUE
    ))
    expect_false(grepl(
      "#202124|#ffffff",
      brand_css_dark_rule(css, "pre")
    ))
  })

  it("uses typography link color before semantic link color in each mode", {
    semantic_css <- brand_css(list(
      color = list(link = list(light = "#0066cc", dark = "#66b2ff"))
    ))
    expect_match(
      brand_css_light_root(semantic_css),
      "--bs-link-color: #0066cc;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(semantic_css),
      "--bs-link-color: #66b2ff;",
      fixed = TRUE
    )

    css <- brand_css(list(
      color = list(link = list(dark = "#66b2ff")),
      typography = list(
        link = list(color = list(light = "#0066cc"))
      )
    ))

    expect_match(
      brand_css_light_root(css),
      "--bs-link-color: #0066cc;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(css),
      "--bs-link-color: #66b2ff;",
      fixed = TRUE
    )

    override_css <- brand_css(list(
      color = list(link = list(light = "#0066cc", dark = "#66b2ff")),
      typography = list(
        link = list(color = list(light = "#00509e", dark = "#8ac5ff"))
      )
    ))
    expect_match(
      brand_css_light_root(override_css),
      "--bs-link-color: #00509e;",
      fixed = TRUE
    )
    expect_match(
      brand_css_dark_root(override_css),
      "--bs-link-color: #8ac5ff;",
      fixed = TRUE
    )
  })

  it("ships both selectors in one stylesheet for runtime switching", {
    css <- brand_css(list(
      color = list(primary = list(light = "#0066cc", dark = "#66b2ff"))
    ))

    expect_true(grepl('[data-bs-theme="light"]', css, fixed = TRUE))
    expect_gte(
      length(gregexpr('\\[data-bs-theme="dark"\\]', css, perl = TRUE)[[1]]),
      2
    )
  })
})
