library(testthat)
library(sass)

options(sass.cache = FALSE)

context("bs4-deps")

describe("bs4_sass", {
  # Example CSS that includes one variable, one function call, one mixin
  bs4_css <- ".foo { background-color: $primary; color: color-yiq($primary); @include size(120px); }"
  resolved_css <- ".foo { background-color: #007bff; color: #fff; width: 120px; height: 120px; }"

  # Compare bs4_sass(input1) and sass(input2)
  expect_bs4_equal <- function(input1, input2, options = sass_options(), variables = theme_variables()) {
    output1 <- bs4_sass(
      theme = bs4_theme(post = input1),
      options = options,
      bootstrap_scss = bs4_scss_required(),
      variables = variables
    )
    output1 <- paste(readLines(file.path(output1[[2]]$src$file, output1[[2]]$stylesheet)), collapse = "\n")

    expect_equal(
      output1,
      as.character(sass(input2, options = options))
    )
  }

  it("automatically includes Bootstrap 4 variables/functions", {
    expect_bs4_equal(bs4_css, resolved_css)
  })

  it("respects output_style", {
    expect_bs4_equal(bs4_css, resolved_css, sass_options(output_style = "compressed"))
  })


  it("respects theme options", {
    # Theme options are respected
    theme_variables(primary = "red")
    on.exit(theme_variables_clear())

    expect_bs4_equal(bs4_css, ".foo { background-color: red; color: #fff; width: 120px; height: 120px; }")

    # Unless they're not
    expect_bs4_equal(bs4_css, resolved_css, variables = NULL)
  })
})
