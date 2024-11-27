# navbar_options() print method

    Code
      navbar_options()
    Output
      <bslib_navbar_options>
         position: (static-top)
          inverse: (auto)
      collapsible: (TRUE)

---

    Code
      navbar_options(inverse = TRUE, bg = "red")
    Output
      <bslib_navbar_options>
         position: (static-top)
               bg: red
          inverse: TRUE
      collapsible: (TRUE)

---

    Code
      navbar_options(position = "static-top", inverse = FALSE, collapsible = TRUE)
    Output
      <bslib_navbar_options>
         position: static-top
          inverse: FALSE
      collapsible: TRUE

