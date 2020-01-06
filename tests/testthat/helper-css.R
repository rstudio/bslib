# expect should be a css string with no spaces or linebreaks
# actual should be the output of sass compilation
expect_css <- function(expect, actual) {
  expect_identical(
    gsub("\\s+|\\n", "", as.character(expect)),
    gsub("\\s+|\\n", "", as.character(actual))
  )
}
