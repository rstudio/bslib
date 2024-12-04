# navbar_options() print method

    Code
      navbar_options()
    Output
      <bslib_navbar_options>
         position: (static-top)
             type: (auto)
      collapsible: (TRUE)
        underline: (TRUE)

---

    Code
      navbar_options(type = "dark", bg = "red")
    Output
      <bslib_navbar_options>
         position: (static-top)
               bg: red
             type: dark
      collapsible: (TRUE)
        underline: (TRUE)

---

    Code
      navbar_options(position = "static-top", type = "auto", collapsible = TRUE)
    Output
      <bslib_navbar_options>
         position: static-top
             type: auto
      collapsible: TRUE
        underline: (TRUE)

