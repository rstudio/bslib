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
})

describe("b_get_color()", {
  it("detects cyclic references in brand.color.palette", {
    brand <- list(
      color = list(
        palette = list(red = "blue", blue = "red")
      )
    )

    expect_error(
      b_get_color(brand, "red"),
      "palette.red -> palette.blue -> palette.red"
    )

    expect_error(
      b_get_color(brand, "blue"),
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
      b_get_color(brand, "primary"),
      "primary -> secondary -> primary"
    )

    expect_error(
      b_get_color(brand, "secondary"),
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
      b_get_color(brand1, "primary"),
      "primary -> palette.primary -> secondary -> palette.primary"
    )

    brand2 <- list(
      color = list(
        palette = list(red = "primary"),
        primary = "red"
      )
    )

    expect_error(
      b_get_color(brand2, "red"),
      "palette.red -> primary -> palette.red"
    )

    expect_error(
      b_get_color(brand2, "primary"),
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
      b_get_color(brand, color_ref(0)),
      "recursion limit"
    )
  })
})
