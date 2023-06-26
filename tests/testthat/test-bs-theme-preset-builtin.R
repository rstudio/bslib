# test_that()

describe("builtin_bundle()", {
  it("errors for unknown preset names", {
    expect_snapshot(
      error = TRUE,
      builtin_bundle("not-a-preset", version = "5")
    )

    expect_snapshot(
      error = TRUE,
      builtin_bundle("not-a-preset", version = "4")
    )
  })

  it("errors for unknown Bootstrap version", {
    expect_error(builtin_bundle("shiny", version = 99))
  })

  it("returns a bundle for a known preset name", {
    bundle <- builtin_bundle("shiny", version = "5")
    expect_s3_class(bundle, "sass_bundle")
    expect_named(bundle$layers, "builtin")
  })
})
