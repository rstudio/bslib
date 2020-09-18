library(testthat)
library(sass)

options(sass.cache = FALSE)

describe("bootstrap_sass", {
  # Example CSS that includes one variable, one function call, one mixin
  bs4_css <- ".foo { background-color: $primary; color: color-yiq($primary); @include size(120px); }"
  resolved_css <- ".foo { background-color: #007bff; color: #fff; width: 120px; height: 120px; }"

  # Compare bootstrap_sass(input1) and sass(input2)
  expect_bs4_equal <- function(input1, input2, options = sass_options()) {
    expect_css(
      bootstrap_sass(input1, options = options),
      sass(input2, options = options)
    )
  }

  it("automatically includes Bootstrap 4 variables/functions", {
    expect_bs4_equal(bs4_css, resolved_css)
  })

  it("respects output_style", {
    expect_bs4_equal(bs4_css, resolved_css, options = sass_options(output_style = "compressed"))
  })


  it("respects theme options", {
    # Theme options are respected
    bs_theme_new()
    bs_theme_add_variables(primary = "red")
    expect_bs4_equal(bs4_css, ".foo { background-color: red; color: #fff; width: 120px; height: 120px; }")
    # Unless they're not
    bs_theme_clear()
    expect_bs4_equal(bs4_css, resolved_css)
  })

})
