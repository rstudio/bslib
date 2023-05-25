# https://github.com/rstudio/shiny/issues/3816#issuecomment-1553516080
with_private_seed <- function() {
  shiny:::withPrivateSeed(set.seed(100))
}
