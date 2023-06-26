# Fixtures ------------------------------------------------------------------
tag_simple <- function(...) {
  htmltools::div(class = "test", id = "test", ...)
}

tag_nested <- function(...) {
  htmltools::withTags(
    div(
      div(class = "inner"),
      div(
        class = "nested",
        div(class = "inner deep")
      ),
      div(class = "inner"),
      ...
    )
  )
}

# Fill Item -----------------------------------------------------------------

test_that("as_fill_item() with a simple tag", {
  expect_false(is_fill_item(tag_simple()))
  expect_true(is_fill_item(as_fill_item(tag_simple())))

  expect_match(
    tagGetAttribute(as_fill_item(tag_simple()), "class"),
    "html-fill-item"
  )

  expect_snapshot(cat(format(as_fill_item(tag_simple()))))
  expect_equal(
    format(as_fill_item(tag_simple())),
    format(tag_simple(as_fill_item()))
  )
})

test_that("as_fill_item() with a simple tag with arguments", {
  expect_false(is_fill_item(tag_simple()))

  ts_fill <- as_fill_item(tag_simple(), min_height = "100px", max_height = "100%")
  expect_true(is_fill_item(ts_fill))

  expect_match(tagGetAttribute(ts_fill, "class"), "html-fill-item")
  expect_match(tagGetAttribute(ts_fill, "style"), "min-height:\\s*100px")
  expect_match(tagGetAttribute(ts_fill, "style"), "max-height:\\s*100%")

  expect_snapshot(cat(format(ts_fill)))
  expect_equal(
    format(ts_fill),
    format(
      tag_simple(as_fill_item(min_height = "100px", max_height = "100%"))
    )
  )
})

test_that("as_fill_item() with a nested tag on outer tag", {
  expect_false(is_fill_item(tag_nested()))
  expect_true(is_fill_item(as_fill_item(tag_nested())))
  expect_match(
    tagGetAttribute(as_fill_item(tag_nested()), "class"),
    "html-fill-item"
  )

  expect_snapshot(cat(format(as_fill_item(tag_nested()))))
  expect_equal(
    format(as_fill_item(tag_nested())),
    format(tag_nested(as_fill_item()))
  )
})

test_that("as_fill_item() with a nested tag on inner tag", {
  # three inner tags that aren't fill items
  expect_equal(
    renders_to_tag_class(tag_nested(), "html-fill-item", selector = ".inner"),
    rep(FALSE, 3)
  )

  nested_fill <- as_fill_item(tag_nested(), css_selector = ".inner")
  expect_equal(
    renders_to_tag_class(nested_fill, "html-fill-item", selector = ".inner"),
    rep(TRUE, 3)
  )

  nested_fill_tq <-
    tagQuery(tag_nested())$
    find(".inner")$
    addAttrs(as_fill_item())$
    allTags()

  expect_equal(
    renders_to_tag_class(nested_fill_tq, "html-fill-item", selector = ".inner"),
    rep(TRUE, 3)
  )

  expect_snapshot(cat(format(nested_fill)))
  expect_equal(
    format(nested_fill),
    format(nested_fill_tq)
  )
})


# Fillable Container --------------------------------------------------------

test_that("as_fillable_container() with a simple tag", {
  expect_false(is_fillable_container(tag_simple()))
  expect_true(is_fillable_container(as_fillable_container(tag_simple())))

  expect_match(
    tagGetAttribute(as_fillable_container(tag_simple()), "class"),
    "html-fill-container"
  )

  expect_snapshot(cat(format(as_fillable_container(tag_simple()))))
  expect_equal(
    format(as_fillable_container(tag_simple())),
    format(tag_simple(as_fillable_container()))
  )
})

test_that("as_fillable_container() with a simple tag with arguments", {
  expect_false(is_fillable_container(tag_simple()))

  ts_fillable <-
    as_fillable_container(
      tag_simple(),
      min_height = "100px",
      max_height = "100%",
      gap = "1em"
    )
  expect_true(is_fillable_container(ts_fillable))

  expect_match(tagGetAttribute(ts_fillable, "class"), "html-fill-container")
  expect_match(tagGetAttribute(ts_fillable, "style"), "min-height:\\s*100px")
  expect_match(tagGetAttribute(ts_fillable, "style"), "max-height:\\s*100%")
  expect_match(tagGetAttribute(ts_fillable, "style"), "gap:\\s*1em")

  ts_fillable_inline <-
    tag_simple(
      as_fillable_container(
        min_height = "100px",
        max_height = "100%",
        gap = "1em"
      )
    )

  expect_snapshot(cat(format(ts_fillable)))
  expect_equal(format(ts_fillable), format(ts_fillable_inline))
})

test_that("as_fillable_container() with a nested tag on outer tag", {
  expect_false(is_fillable_container(tag_nested()))
  expect_true(is_fillable_container(as_fillable_container(tag_nested())))
  expect_match(
    tagGetAttribute(as_fillable_container(tag_nested()), "class"),
    "html-fill-container"
  )

  expect_snapshot(cat(format(as_fillable_container(tag_nested()))))
  expect_equal(
    format(as_fillable_container(tag_nested())),
    format(tag_nested(as_fillable_container()))
  )
})

test_that("as_fillable_container() with a nested tag on inner tag", {
  # three inner tags that aren't fillable containers
  expect_equal(
    renders_to_tag_class(tag_nested(), "html-fill-container", selector = ".inner"),
    rep(FALSE, 3)
  )

  nested_fillable <- as_fillable_container(tag_nested(), css_selector = ".inner")
  expect_equal(
    renders_to_tag_class(nested_fillable, "html-fill-container", selector = ".inner"),
    rep(TRUE, 3)
  )

  nested_fillable_tq <-
    tagQuery(tag_nested())$
    find(".inner")$
    addAttrs(as_fillable_container())$
    allTags()

  expect_equal(
    renders_to_tag_class(nested_fillable_tq, "html-fill-container", selector = ".inner"),
    rep(TRUE, 3)
  )

  expect_snapshot(cat(format(nested_fillable)))
  expect_equal(
    format(nested_fillable),
    format(nested_fillable_tq)
  )
})


# Fill Carrier --------------------------------------------------------------

expect_has_classes <- function(tag, classes) {
  tag_classes <- tagGetAttribute(tag, "class")
  tag_classes <- strsplit(tag_classes, " ")[[1]]
  expect_true(all(!!classes %in% tag_classes))
}

test_that("as_fill_carrier() with a simple tag", {
  expect_false(is_fill_carrier(tag_simple()))
  expect_true(is_fill_carrier(as_fill_carrier(tag_simple())))

  expect_has_classes(
    as_fill_carrier(tag_simple()),
    c("html-fill-container", "html-fill-item")
  )

  expect_snapshot(cat(format(as_fill_carrier(tag_simple()))))
  expect_equal(
    format(as_fill_carrier(tag_simple())),
    format(tag_simple(as_fill_carrier()))
  )
})

test_that("as_fill_carrier() with a simple tag with arguments", {
  expect_false(is_fill_carrier(tag_simple()))

  ts_carrier <- as_fill_carrier(
    tag_simple(),
    min_height = "100px",
    max_height = "100%",
    gap = "1em"
  )
  expect_true(is_fill_carrier(ts_carrier))

  expect_match(tagGetAttribute(ts_carrier, "class"), "html-fill-container")
  expect_match(tagGetAttribute(ts_carrier, "style"), "min-height:\\s*100px")
  expect_match(tagGetAttribute(ts_carrier, "style"), "max-height:\\s*100%")
  expect_match(tagGetAttribute(ts_carrier, "style"), "gap:\\s*1em")

  ts_carrier_inline <-
    tag_simple(
      as_fill_carrier(
        min_height = "100px",
        max_height = "100%",
        gap = "1em"
      )
    )

  expect_snapshot(cat(format(ts_carrier)))
  expect_equal(format(ts_carrier), format(ts_carrier_inline))
})

test_that("as_fill_carrier() with a nested tag on outer tag", {
  expect_false(is_fill_carrier(tag_nested()))
  expect_true(is_fill_carrier(as_fill_carrier(tag_nested())))

  expect_has_classes(
    as_fill_carrier(tag_simple()),
    c("html-fill-container", "html-fill-item")
  )

  expect_snapshot(cat(format(as_fill_carrier(tag_nested()))))
  expect_equal(
    format(as_fill_carrier(tag_nested())),
    format(tag_nested(as_fill_carrier()))
  )
})

test_that("as_fill_carrier() with a nested tag on inner tag", {
  # three inner tags that aren't fill carriers
  expect_equal(
    renders_to_tag_class(tag_nested(), "html-fill-container", selector = ".inner"),
    rep(FALSE, 3)
  )
  expect_equal(
    renders_to_tag_class(tag_nested(), "html-fill-item", selector = ".inner"),
    rep(FALSE, 3)
  )

  nested_carrier <- as_fill_carrier(tag_nested(), css_selector = ".inner")
  expect_equal(
    renders_to_tag_class(nested_carrier, "html-fill-container", selector = ".inner"),
    rep(TRUE, 3)
  )
  expect_equal(
    renders_to_tag_class(nested_carrier, "html-fill-item", selector = ".inner"),
    rep(TRUE, 3)
  )

  nested_carrier_tq <-
    tagQuery(tag_nested())$
    find(".inner")$
    addAttrs(as_fill_carrier())$
    allTags()

  expect_equal(
    renders_to_tag_class(nested_carrier_tq, "html-fill-container", selector = ".inner"),
    rep(TRUE, 3)
  )
  expect_equal(
    renders_to_tag_class(nested_carrier_tq, "html-fill-item", selector = ".inner"),
    rep(TRUE, 3)
  )

  expect_snapshot(cat(format(nested_carrier)))
  expect_equal(
    format(nested_carrier),
    format(nested_carrier_tq)
  )
})

# Remove All Fill -----------------------------------------------------------

test_that("remove_all_fill() removes fill from outer element", {
  expect_equal(
    remove_all_fill(as_fill_item(tag_simple())),
    tag_simple()
  )

  # ignoring the 'htmltools-fill' dependency
  expect_equal(
    format(remove_all_fill(as_fillable_container(tag_simple()))),
    format(tag_simple())
  )

  expect_equal(
    format(remove_all_fill(as_fill_carrier(tag_simple()))),
    format(tag_simple())
  )
})

# Unexpected Uses -----------------------------------------------------------

test_that("as_fill_item() warns about usage of `css_selector` without an input tag", {
  expect_warning(
    expect_equal(
      as_fill_item(class = "test", css_selector = ".inner"),
      as_fill_item(class = "test")
    )
  )

  expect_warning(
    expect_equal(
      div(as_fill_item(class = "test", css_selector = ".inner")),
      div(as_fill_item(class = "test"))
    )
  )
})

test_that("as_fillable_container() warns about usage of `css_selector` without an input tag", {
  expect_warning(
    expect_equal(
      as_fillable_container(class = "test", css_selector = ".inner"),
      as_fillable_container(class = "test")
    )
  )

  expect_warning(
    expect_equal(
      div(as_fillable_container(class = "test", css_selector = ".inner")),
      div(as_fillable_container(class = "test"))
    )
  )
})

test_that("as_fill_carrier() warns about usage of `css_selector` without an input tag", {
  expect_warning(
    expect_equal(
      as_fill_carrier(class = "test", css_selector = ".inner"),
      as_fill_carrier(class = "test")
    )
  )

  expect_warning(
    expect_equal(
      div(as_fill_carrier(class = "test", css_selector = ".inner")),
      div(as_fill_carrier(class = "test"))
    )
  )
})
