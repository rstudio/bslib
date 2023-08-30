# print.bslib_showcase_layout()

    Code
      showcase_left_center()
    Output
      <showcase-left-center>
      width:      30%   [fs: 1fr]
      height:     ---   [fs: ---]
      max_height: 100px [fs: 67%]

---

    Code
      showcase_top_right()
    Output
      <showcase-top-right>
      width:      40%  [fs: 1fr]
      height:     ---  [fs: ---]
      max_height: 75px [fs: 67%]

---

    Code
      showcase_bottom()
    Output
      <showcase-bottom>
      width:      100%  [fs: ---]
      height:     auto  [fs: 2fr]
      max_height: 100px [fs: ---]

# value_box_theme() print method

    Code
      value_box_theme("bg-gradient-blue-purple")
    Output
      <bslib_value_box_theme>
      theme: bg-gradient-blue-purple

---

    Code
      value_box_theme("red", fg = "white")
    Output
      <bslib_value_box_theme>
      theme: bg-red
      color: white

---

    Code
      value_box_theme(bg = "black")
    Output
      <bslib_value_box_theme>
      background-color: black
      color: #FFFFFF

---

    Code
      value_box_theme("text-red", bg = "#FFE8E8")
    Output
      <bslib_value_box_theme>
      theme: text-red
      background-color: #FFE8E8

