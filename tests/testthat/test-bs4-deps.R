local_disable_cache()

describe("Compiling against theme", {
  # Example CSS that includes one variable, one function call, one mixin
  bs4_css <- ".foo { background-color: $primary; color: color-contrast($primary); width: 120px; height: 120px; }"
  resolved_css <- ".foo { background-color: #007bff; color: #fff; width: 120px; height: 120px; }"

  # Compare bs_sass(input1) and sass(input2)
  expect_bs4_equal <- function(
    input1,
    input2,
    options = sass_options(),
    theme = bs_theme(version = 4)
  ) {
    expect_css(
      sass_partial(input1, theme, options = options),
      sass(input2, options = options)
    )
  }

  it("automatically includes Bootstrap 4 variables/functions", {
    expect_bs4_equal(bs4_css, resolved_css)
  })

  it("respects output_style", {
    expect_bs4_equal(
      bs4_css,
      resolved_css,
      options = sass_options(output_style = "compressed")
    )
  })

  it("respects theme options", {
    # Theme options are respected
    expect_bs4_equal(
      bs4_css,
      ".foo { background-color: #FF0000; color: #fff; width: 120px; height: 120px; }",
      theme = bs_theme(version = 4, primary = "red")
    )
    # Unless they're not
    expect_bs4_equal(bs4_css, resolved_css)
  })
})
