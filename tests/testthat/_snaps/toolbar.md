# toolbar() basic attributes and defaults

    Code
      show_raw_html(toolbar("Item 1", "Item 2"))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        Item 1
        Item 2
      </div>

---

    Code
      show_raw_html(toolbar("Item 1", "Item 2", gap = "10px"))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right" style="gap:10px;">
        Item 1
        Item 2
      </div>

# toolbar() aligns correctly

    Code
      show_raw_html(toolbar("Item 1", "Item 2", align = "left"))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="left">
        Item 1
        Item 2
      </div>

---

    Code
      show_raw_html(toolbar("Item 1", "Item 2", align = "right"))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        Item 1
        Item 2
      </div>

# toolbar_input_button() has correct attributes

    Code
      show_raw_html(toolbar_input_button(id = "label_only", label = "Click me"))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="label_only" type="button">
        <span class="action-label">Click me</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "icon_only", icon = shiny::icon("star")))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="icon_only" type="button">
        <span class="action-icon">
          <i class="far fa-star" role="presentation" aria-label="star icon"></i>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "both", label = "Save", icon = shiny::icon(
        "save")))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="both" type="button">
        <span class="action-icon">
          <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
        </span>
        <span class="action-label">Save</span>
      </button>

# toolbar_input_button() disabled parameter

    Code
      show_raw_html(toolbar_input_button(id = "disabled_btn", label = "Disabled",
        disabled = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" disabled id="disabled_btn" type="button">
        <span class="action-label">Disabled</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "enabled_btn", label = "Enabled",
        disabled = FALSE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="enabled_btn" type="button">
        <span class="action-label">Enabled</span>
      </button>

# toolbar_input_button() border parameter

    Code
      show_raw_html(toolbar_input_button(id = "no_border", label = "No Border",
        border = FALSE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="no_border" type="button">
        <span class="action-label">No Border</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "with_border", label = "With Border",
        border = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-1" data-type="label" id="with_border" type="button">
        <span class="action-label">With Border</span>
      </button>

# toolbar_input_button() tooltip parameter

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_icon", icon = shiny::icon(
        "question"), tooltip = "Help"))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Help</template>
        <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_icon" type="button">
          <span class="action-icon">
            <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
          </span>
        </button>
      </bslib-tooltip>

