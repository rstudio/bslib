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

# navbar markup snapshots

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 3)))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 4)))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5)))
    Output
      <nav class="navbar navbar-default navbar-static-top" role="navigation" data-bs-theme="auto"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 4), navbar_options = navbar_options(
        type = "dark")))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 4), navbar_options = navbar_options(
        type = "light")))
    Output
      <nav class="navbar navbar-default navbar-static-top" role="navigation" data-bs-theme="light"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 4), navbar_options = navbar_options(
        bg = "#000")))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" style="background-color:#000000 !important;" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5), navbar_options = navbar_options(
        type = "dark")))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5), navbar_options = navbar_options(
        type = "light")))
    Output
      <nav class="navbar navbar-default navbar-static-top" role="navigation" data-bs-theme="light"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5), navbar_options = navbar_options(
        bg = "#000")))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" style="background-color:#000000 !important;" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5), navbar_options = navbar_options(
        type = "light", `data-bs-theme` = "dark")))
    Output
      <nav class="navbar navbar-default navbar-static-top" role="navigation" data-bs-theme="dark"></nav>

---

    Code
      show_navbar_markup(navs_bar_(theme = bs_theme(version = 5), navbar_options = navbar_options(
        class = "bg-primary", type = "dark")))
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse bg-primary" data-bs-theme="dark" role="navigation"></nav>

