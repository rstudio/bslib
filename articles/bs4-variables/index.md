# Bootstrap 4 variables

Below is a search-able table of Bootstrap 4 Sass variables. If you
aren’t sure what a Sass variable is or how to use them, see this [Get
Started article](https://rstudio.github.io/bslib/articles/theming). A
few things to keep in mind when using this table:

- Each row represents a different Sass variable, showing its name and
  default value.
  - For Sass variables whose value defaults to another Sass variable
    (e.g., [`border-color`](#border-color)), you may hover over the
    value to get the (default) CSS value that it represents.
- Rows are grouped into sections of similar variables
  - For example, [Navs](#nav-link-padding-y)
    ([`navset_card_tab()`](https://rstudio.github.io/bslib/reference/navset.md)),
    [Navbars](#navbar-padding-y)
    ([`page_navbar()`](https://rstudio.github.io/bslib/reference/page_navbar.md)),
    and [Dropdowns](#dropdown-min-width) (e.g.,
    [`nav_menu()`](https://rstudio.github.io/bslib/reference/nav-items.md)).
- Towards the top of the table are more general theming options like
  `white`, `gray-*`, `black`, `primary`, `border-radius`, and so on,
  which end up impacting more specific theming variables like
  `btn-border-radius`.
  - [`bs_theme()`](https://rstudio.github.io/bslib/reference/bs_theme.md)’s
    `bg` and `fg` arguments provide a more convenient way to set the
    `white`, `gray-*`, and `black` variables, so there is no need to set
    these Sass variables directly (same goes for `base_font` -\>
    `$font-family-base`, `heading_font` -\> `$headings-font-family`, and
    `code_font` -\> `$font-family-monospace`).
