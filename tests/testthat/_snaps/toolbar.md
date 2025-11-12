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

# toolbar_input_button() markup snapshots

    Code
      show_raw_html(toolbar_input_button(id = "btn1", label = "Click me"))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" id="btn1" type="button">Click me</button>

---

    Code
      show_raw_html(toolbar_input_button(id = "btn2", icon = shiny::icon("star")))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" id="btn2" type="button">
        <i class="far fa-star" role="presentation" aria-label="star icon"></i>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "btn3", label = "Save", icon = shiny::icon(
        "save")))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" id="btn3" type="button">
        <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
        Save
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "btn4", label = "Delete", class = "btn-danger"))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0 btn-danger" id="btn4" type="button">Delete</button>

