# toolbar() markup snapshots

    Code
      show_raw_html(toolbar("Item 1", "Item 2"))
    Output
      <div class="bslib-toolbar" data-align="right" data-size="sm">
        Item 1
        Item 2
      </div>

---

    Code
      show_raw_html(toolbar("Item 1", "Item 2", align = "left"))
    Output
      <div class="bslib-toolbar" data-align="left" data-size="sm">
        Item 1
        Item 2
      </div>

---

    Code
      show_raw_html(toolbar("Item 1", "Item 2", size = "md"))
    Output
      <div class="bslib-toolbar" data-align="right" data-size="md">
        Item 1
        Item 2
      </div>

