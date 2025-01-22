test_that("layout_columns() with col_widths", {
  children <- lapply(1:2, function(...) {
    div(class = "layout-column-child-element")
  })

  expect_snapshot(
    layout_columns(col_widths = 6, !!!children)
  )

  expect_snapshot(
    layout_columns(col_widths = c(4, 8), !!!children)
  )

  expect_snapshot(
    layout_columns(
      col_widths = breakpoints(sm = 6, md = 4, lg = 3),
      !!!children
    )
  )

  expect_snapshot(
    layout_columns(col_widths = breakpoints(sm = NA, lg = c(4, 8)), !!!children)
  )

  expect_snapshot(
    layout_columns(
      col_widths = breakpoints(sm = NA, lg = c(4, -4, 4)),
      !!!children
    )
  )
})

test_that("layout_columns() without `col_widths`", {
  expect_no_match(
    format(layout_columns(div())),
    "col-widths-"
  )

  expect_no_match(
    format(layout_columns(div(), col_widths = NULL)),
    "col-widths-"
  )

  expect_no_match(
    format(layout_columns(div(), col_widths = list(NA))),
    "col-widths-"
  )
})

test_that("grid_item_container()", {
  expect_snapshot(
    grid_item_container(
      div(class = "layout-column-child-element"),
      fillable = TRUE
    )
  )

  expect_snapshot(
    grid_item_container(
      div(class = "layout-column-child-element"),
      fillable = FALSE
    )
  )
})

test_that("grid-breakpoints are known", {
  brks <- bs_get_variables(
    bs_add_variables(
      bs_theme(),
      "grid-brk-names" = "map-keys($grid-breakpoints)",
      .where = "declarations"
    ),
    "grid-brk-names"
  )

  # In bslib::breakpoints() we flag these as "known" breakpoints...
  # which mostly means we order them, but also, in the NA case,
  # we use lg/xl/xxl to fill in md
  expect_equal(
    strsplit(brks, ", ")[[1]],
    c("xs", "sm", "md", "lg", "xl", "xxl")
  )
})

test_that("breakpoints() re-orders well-known breaks and test print method", {
  bp <- breakpoints(
    xl = 5,
    sm = 2,
    xs = 1,
    giant = 7,
    lg = 4,
    huge = 8,
    md = 3,
    xxl = 6
  )

  expect_snapshot(bp)
  expect_equal(unclass(unname(unlist(bp))), 1:8)
})

test_that("breakpoints() has correct classes and structure", {
  bp <- breakpoints(
    lg = c(-2, 2, -1, -2, 3, -2),
    md = c(-1, 2, -2, 3),
    sm = c(1, -1, 1),
    xl = c(1, 2, 3, NA),
    huge = list(1, 2, 3, "auto")
  )

  expect_true(is_breakpoints(bp))

  # names are ordered, custom breakpoint names are last
  expect_named(bp, c("sm", "md", "lg", "xl", "huge"))

  expect_snapshot(bp)
})

test_that("breakpoints() must be named", {
  expect_error(breakpoints(1:3))
})

test_that("layout_columns() allows a single NA in a breakpoint", {
  expect_silent(
    layout_columns(col_widths = breakpoints(sm = NA), div())
  )
})

test_that("layout_columns() throws if NAs are mixed with other column values", {
  expect_snapshot_error(
    layout_columns(col_widths = breakpoints(sm = c(-1, NA, 1)))
  )
})

test_that("layout_columns() warns when too many column widths", {
  expect_snapshot_warning(
    layout_columns(
      col_widths = breakpoints(md = c(1, 1, 1)),
      div()
    )
  )
})

test_that("breakpoint_columns() throws if a column is 0", {
  expect_error(
    col_width_grid_classes(breakpoints(md = c(-1, 0, 1)), 3)
  )
})

test_that("layout_columns() throws if no columns are positive", {
  expect_error(
    layout_columns(col_widths = breakpoints(md = -1), div())
  )
  expect_error(
    layout_columns(
      col_widths = breakpoints(md = c(-1, -1, -1)),
      div(),
      div(),
      div()
    )
  )
})

test_that("as_column_spec() excludes offsets from oversized col_widths warning", {
  expect_silent(
    as_col_spec(col_widths = c(4, -4, 4), 2)
  )
})

test_that("row_heights_css_vars() decides fr/px for numeric, passes character", {
  expect_equal(
    row_heights_css_vars(breakpoints(md = c(2, 1)))$style,
    "--bslib-grid--row-heights--md:2fr 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list(2, 1)))$style,
    "--bslib-grid--row-heights--md:2fr 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list("auto", 1)))$style,
    "--bslib-grid--row-heights--md:auto 1fr;"
  )

  expect_equal(
    row_heights_css_vars(breakpoints(md = list("10px", 1)))$style,
    "--bslib-grid--row-heights--md:10px 1fr;"
  )
})

test_that("row_heights_css_vars() sets row heights at all sizes if no breakpoint is provided", {
  expect_equal(
    row_heights_css_vars(c(1, 2)),
    list(
      style = "--bslib-grid--row-heights:1fr 2fr;",
      class = character(0)
    )
  )
})

test_that("row_heights_css_vars() rounds fractional numeric values (fr must be integer)", {
  expect_equal(
    row_heights_css_vars(c(1.5, 2.5)), #<< R rounds 1.5 up and 2.5 down
    list(
      style = "--bslib-grid--row-heights:2fr 2fr;",
      class = character(0)
    )
  )
})

test_that("row_heights_css_vars() doesn't include the class for xs size", {
  expect_equal(
    row_heights_css_vars(breakpoints(xs = c(1, 2))),
    list(
      style = "--bslib-grid--row-heights:1fr 2fr;",
      class = character(0)
    )
  )
})

test_that("layout_column_wrap() handles deprecated width as first arg", {
  # first arg is fractional
  lifecycle::expect_deprecated(
    lc_implicit_width_frac <- layout_column_wrap(1 / 2, "one", "two")
  )

  expect_equal(
    as.character(lc_implicit_width_frac),
    as.character(layout_column_wrap(width = 1 / 2, "one", "two"))
  )

  # first arg is explicitly px character
  lifecycle::expect_deprecated(
    lc_implicit_width_px <- layout_column_wrap("400px", "one", "two")
  )

  expect_equal(
    as.character(lc_implicit_width_px),
    as.character(layout_column_wrap(width = "400px", "one", "two"))
  )

  # first arg is px, but numeric
  lifecycle::expect_deprecated(
    lc_implicit_width_px_implied <- layout_column_wrap(365, "one", "two")
  )

  expect_equal(
    as.character(lc_implicit_width_px_implied),
    as.character(layout_column_wrap(width = 365, "one", "two"))
  )

  # first arg is NULL
  lifecycle::expect_deprecated(
    lc_implicit_width_null <- layout_column_wrap(NULL, "one", "two")
  )

  expect_equal(
    as.character(lc_implicit_width_null),
    as.character(layout_column_wrap(width = NULL, "one", "two"))
  )

  # first arg is not a CSS unit
  rlang::local_options(lifecycle_verbosity = "warning")
  testthat::expect_silent(
    as.character(layout_column_wrap("1ft", "one", "two"))
  )
})
