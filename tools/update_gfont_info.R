pkgload::load_all()
gfont_info <- get_gfont_info()
usethis::use_data(
  gfont_info,
  internal = TRUE,
  overwrite = TRUE
)
