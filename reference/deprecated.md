# Deprecated functions

These functions have been deprecated but remain for backwards
compatibility.

## Usage

``` r
bs_theme_new(...)

bs_theme_clear(...)

bs_theme_get(...)

bs_theme_set(...)

bs_theme_base_colors(...)

bs_theme_accent_colors(...)

bs_theme_fonts(...)

bs_theme_add_variables(...)

bs_theme_add(...)

bs_theme_get_variables(...)

bootstrap(theme = bs_theme_get(), ...)

bootstrap_sass(rules = list(), theme = bs_theme_get(), ...)

bs_add_declarations(theme, declarations)

card_body_fill(...)

page_fill(...)

sidebar_toggle(id, open = NULL, session = get_current_session())

nav(...)

nav_content(...)

navs_tab(...)

navs_pill(...)

navs_pill_list(...)

navs_hidden(...)

navs_bar(...)

navs_tab_card(...)

navs_pill_card(...)
```

## Value

a [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)
object.

## v0.9.1

The function `sidebar_toggle()` is now deprecated in v0.9.1. Please use
[`toggle_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
instead.

## Navigation Containers

Several functions for navigation containers were renamed in version
0.5.0:

- `nav()` was renamed
  [`nav_panel()`](https://rstudio.github.io/bslib/reference/nav-items.md)

- `nav_content()` was renamed
  [`nav_panel_hidden()`](https://rstudio.github.io/bslib/reference/nav-items.md)

- `navs_tab()` was renamed
  [`navset_tab()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_pill()` was renamed
  [`navset_pill()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_pill_list()` was renamed
  [`navset_pill_list()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_hidden()` was renamed
  [`navset_hidden()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_bar()` was renamed
  [`navset_bar()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_tab_card()` was renamed
  [`navset_card_tab()`](https://rstudio.github.io/bslib/reference/navset.md)

- `navs_pill_card()` was renamed
  [`navset_card_pill()`](https://rstudio.github.io/bslib/reference/navset.md)
