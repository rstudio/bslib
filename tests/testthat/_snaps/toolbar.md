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
      show_raw_html(toolbar(shiny::actionButton("btn1", "Button 1"), align = "left"))
    Output
      <div class="bslib-toolbar" data-align="left" data-size="sm">
        <button id="btn1" type="button" class="btn btn-default action-button">Button 1</button>
      </div>

---

    Code
      show_raw_html(toolbar(size = "md"))
    Output
      <div class="bslib-toolbar" data-align="right" data-size="md"></div>

---

    Code
      show_raw_html(card(card_header("Card Title", toolbar(tags$button("Settings"),
      align = "right", size = "sm")), card_body("Card content")))
    Output
      <div class="card bslib-card bslib-mb-spacing html-fill-item html-fill-container" data-bslib-card-init data-require-bs-caller="card()" data-require-bs-version="5">
        <div class="card-header">
          Card Title
          <div class="bslib-toolbar" data-align="right" data-size="sm">
            <button>Settings</button>
          </div>
        </div>
        <div class="card-body bslib-gap-spacing html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">Card content</div>
        <script data-bslib-card-init>bslib.Card.initializeAllCards();</script>
      </div>

---

    Code
      show_raw_html(toolbar(shiny::selectInput("select", NULL, choices = c("A", "B",
        "C"), multiple = FALSE, selectize = FALSE), shiny::checkboxInput("check",
        "Check"), align = "right"))
    Output
      <div class="bslib-toolbar" data-align="right" data-size="sm">
        <div class="form-group shiny-input-container">
          <label class="control-label shiny-label-null" for="select" id="select-label"></label>
          <div>
            <select class="shiny-input-select form-control" id="select"><option value="A" selected>A</option>
      <option value="B">B</option>
      <option value="C">C</option></select>
          </div>
        </div>
        <div class="form-group shiny-input-container">
          <div class="checkbox">
            <label>
              <input id="check" type="checkbox" class="shiny-input-checkbox"/>
              <span>Check</span>
            </label>
          </div>
        </div>
      </div>

