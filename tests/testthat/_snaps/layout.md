# grid_item_container()

    Code
      grid_item_container(div(class = "layout-column-child-element"), class = "g-col-md-6 g-col-lg-4",
      fillable = TRUE)
    Output
      <div class="g-col-md-6 g-col-lg-4 bslib-gap-spacing html-fill-container">
        <div class="layout-column-child-element"></div>
      </div>

---

    Code
      grid_item_container(div(class = "layout-column-child-element"), class = "g-col-md-6 g-col-lg-4",
      fillable = FALSE)
    Output
      <div class="g-col-md-6 g-col-lg-4 bslib-gap-spacing">
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

# breakpoints() throws if NAs are mixed with other column values

    Cannot mix widths and `NA` values. All column widths must be specified, or choose auto widths using a single `NA` value.

# bs_css_grid_width_classes() warns when too many column widths

    Truncating number of widths at 'md' breakpoint to match number of elements.
    * widths: 4
    * elements: 3

