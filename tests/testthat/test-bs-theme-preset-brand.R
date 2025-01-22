# testthat::test_that()

describe("as_brand_yml()", {
  it("normalizes colors", {
    brand <- list(
      color = list(
        palette = list(red = "#FF1122"),
        primary = "red",
        secondary = "berry"
      )
    )

    brand <- as_brand_yml(brand)
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

    brand <- as_brand_yml(brand)
    expect_s3_class(brand, "brand_yml")
    expect_equal(brand$typography$base$family, "Times New Roman")
    expect_equal(brand$typography$headings$family, "Helvetica")
    expect_equal(brand$typography[["monospace"]]$family, "Courier New")
    expect_equal(brand$typography[["monospace-inline"]]$family, "Fira Code")
  })
})

describe("brand_resolve()", {
  withr::local_dir(withr::local_tempdir())

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
  
  it("returns NULL if `brand = FALSE`", {
    expect_null(brand_resolve(FALSE))
  })

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
    brand <- as_brand_yml(
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
    brand <- as_brand_yml(
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
    brand <- as_brand_yml(
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
    brand <- as_brand_yml(
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
  it("detects cyclic references in brand.color.palette", {
    brand <- list(
      color = list(
        palette = list(red = "blue", blue = "red")
      )
    )

    expect_error(
      brand_color_pluck(brand, "red"),
      "palette.red -> palette.blue -> palette.red"
    )

    expect_error(
      brand_color_pluck(brand, "blue"),
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
      brand_color_pluck(brand, "primary"),
      "primary -> secondary -> primary"
    )

    expect_error(
      brand_color_pluck(brand, "secondary"),
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
      brand_color_pluck(brand1, "primary"),
      "primary -> palette.primary -> secondary -> palette.primary"
    )

    brand2 <- list(
      color = list(
        palette = list(red = "primary"),
        primary = "red"
      )
    )

    expect_error(
      brand_color_pluck(brand2, "red"),
      "palette.red -> primary -> palette.red"
    )

    expect_error(
      brand_color_pluck(brand2, "primary"),
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
          rlang::set_names(seq_max, color_ref(seq_max-1)),
          color_ref
        )
      )
    )

    expect_error(
      brand_color_pluck(brand, color_ref(0)),
      "recursion limit"
    )
  })

  it("returns `key` if `brand.color` isn't present", {
    brand <- list(meta = list(name = "no color"))
    expect_equal(brand_color_pluck(brand, "red"), "red")
  })

  it("returns `NULL` if the color is preset but `NULL`", {
    brand <- list(color = list(secondary = NULL, palette = list(black = NULL)))
    expect_null(brand_color_pluck(brand, "secondary"))
    expect_null(brand_color_pluck(brand, "black"))
  })

  it("errors if the color value is not a string", {
    brand <- list(
      color = list(
        secondary = 123456,
        palette = list(black = 123456)
      )
    )

    expect_error(brand_color_pluck(brand, "secondary"), "brand.color.secondary")
    expect_error(brand_color_pluck(brand, "black"), "brand.color.palette.black")
  })
})

describe("maybe_convert_font_size_to_rem()", {
  it("returns `rem` directly", {
    expect_equal(maybe_convert_font_size_to_rem("1rem"), "1rem")
    expect_equal(maybe_convert_font_size_to_rem("1.123rem"), "1.123rem")
    expect_equal(maybe_convert_font_size_to_rem("1.123 rem"), "1.123rem")
  })

  it("returns `em` as 1:1 with `rem`", {
    expect_equal(maybe_convert_font_size_to_rem("1em"), "1rem")
    expect_equal(maybe_convert_font_size_to_rem("1.123em"), "1.123rem")
    expect_equal(maybe_convert_font_size_to_rem("1.123 em"), "1.123rem")
  })

  it("converts `%` as 100%:1rem", {
    expect_equal(maybe_convert_font_size_to_rem("100%"), "1rem")
    expect_equal(maybe_convert_font_size_to_rem("225%"), "2.25rem")
    expect_equal(maybe_convert_font_size_to_rem("50 %"), "0.5rem")
  })

  it("converts `in`, `cm` and `mm` to `rem`", {
    expect_equal(maybe_convert_font_size_to_rem("1in"), "6rem")
    expect_equal(maybe_convert_font_size_to_rem("0.5in"), "3rem")

    expect_equal(maybe_convert_font_size_to_rem("2.54cm"), "6rem")
    expect_equal(maybe_convert_font_size_to_rem("1.27cm"), "3rem")

    expect_equal(maybe_convert_font_size_to_rem("25.4mm"), "6rem")
    expect_equal(maybe_convert_font_size_to_rem("12.7mm"), "3rem")
  })

  it("throws for unsupported units", {
    expect_error(
      maybe_convert_font_size_to_rem("1 foo")
    )
    expect_error(
      maybe_convert_font_size_to_rem("1 foo bar")
    )
    expect_error(
      maybe_convert_font_size_to_rem("1vw")
    )
    expect_error(
      maybe_convert_font_size_to_rem("123")
    )
  })
})

describe("bs_brand_bundle()", {
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
})
