# grid_item_container()

    Code
      grid_item_container(div(class = "layout-column-child-element"), fillable = TRUE)
    Output
      <div class="bslib-grid-item bslib-gap-spacing html-fill-container">
        <div class="layout-column-child-element"></div>
      </div>

---

    Code
      grid_item_container(div(class = "layout-column-child-element"), fillable = FALSE)
    Output
      <div class="bslib-grid-item bslib-gap-spacing">
        <div class="layout-column-child-element"></div>
      </div>

# breakpoints() re-orders well-known breaks and test print method

    Code
      bp
    Output
      <breakpoints>
          xs: 1
          sm: 2
          md: 3
          lg: 4
          xl: 5
         xxl: 6
       giant: 7
        huge: 8

# breakpoints() has correct classes and structure

    Code
      bp
    Output
      <breakpoints>
         sm:    1   -1    1
         md:   -1    2   -2    3
         lg:   -2    2   -1   -2    3   -2
         xl:    1    2    3   NA
       huge:    1    2    3 auto

# layout_columns() throws if NAs are mixed with other column values

    Cannot mix widths and `NA` values. All column widths must be specified, or choose auto widths using a single `NA` value.

# layout_columns() warns when too many column widths

    More column widths than children at breakpoint 'md', extra widths will be ignored.

