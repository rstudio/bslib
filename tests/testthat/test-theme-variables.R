library(testthat)

context("theme_variables")

t_o <- function(name) {
  theme_variables()[[name]]
}

describe("theme_variables", {

  it("can set named options", {
    theme_variables_clear()

    expect_null(t_o("a"))
    theme_variables(a = 1)
    expect_identical(t_o("a"), 1)
  })

  it("merges options", {
    theme_variables_clear()

    theme_variables(primary = "blue")
    theme_variables(dark = "red")

    expect_identical(t_o("primary"), "blue")
    expect_identical(t_o("dark"), "red")
  })

  it("returns previous options invisibly", {
    theme_variables_clear()

    opts1 <- theme_variables(a = 1, b = 2, c = 3)
    expect_identical(opts1, list(a = NULL, b = NULL, c = NULL))

    opts2 <- theme_variables(c = 4, d = 5)
    expect_identical(opts2, list(c = 3, d = NULL))
  })

  it("can set unnamed list object", {
    theme_variables_clear()

    theme_variables(list(x = "xxx", y = "yyy"))

    expect_identical(t_o("x"), "xxx")
    expect_identical(t_o("y"), "yyy")
    expect_identical(theme_variables(), list(x = "xxx", y = "yyy"))
  })

  it("throws if names are missing", {
    theme_variables_clear()

    expect_error(theme_variables("a"))
    expect_error(theme_variables(a = 1, 2))
    # You can have an unnamed argument iff it's a named list and the only
    # argument
    expect_error(theme_variables(list(a = 1), b = 2), "named")
    expect_error(theme_variables(list(a = 1), list(b = 2)), "named")
    expect_error(theme_variables(list(a = 1, 2)), "named")
  })
})

describe("theme_variables_clear", {
  it("works", {
    theme_variables_clear()

    theme_variables(a = 1)
    expect_identical(t_o("a"), 1)

    theme_variables_clear()
    expect_identical(t_o("a"), NULL)
  })
})
