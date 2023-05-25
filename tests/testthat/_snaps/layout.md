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

# breakpoints_columns_widths() has correct classes and structure

    Code
      bp
    Output
      <breakpoints<column_widths>>
       sm: 1 (1) 1
       md: (1) 2 (2) 3
       lg: (2) 2 (3) 3 (2)
       xl: 1 2 3
       huge: 1 2 3

# bs_css_grid_width_classes() warns when too many column widths

    Truncating number of widths at 'md' breakpoint to match number of elements.
    * widths: 4
    * elements: 3

