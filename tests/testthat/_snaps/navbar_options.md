# navbar_options() print method

    Code
      navbar_options()
    Output
      <bslib_navbar_options>
         position: (static-top)
            theme: (auto)
      collapsible: (TRUE)
        underline: (TRUE)

---

    Code
      navbar_options(theme = "dark", bg = "red")
    Output
      <bslib_navbar_options>
         position: (static-top)
               bg: red
            theme: dark
      collapsible: (TRUE)
        underline: (TRUE)

---

    Code
      navbar_options(position = "static-top", theme = "auto", collapsible = TRUE)
    Output
      <bslib_navbar_options>
         position: static-top
            theme: auto
      collapsible: TRUE
        underline: (TRUE)

