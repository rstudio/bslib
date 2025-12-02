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

# toolbar_input_button() tests

    Code
      show_raw_html(toolbar_input_button(id = "label_only", label = "Click me",
        show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="label_only" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">Click me</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "test_btn", label = "Click me", icon = shiny::icon(
        "star"), ))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click me</template>
        <span id="test_btn-label" hidden>Click me</span>
        <button aria-labelledby="test_btn-label" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="test_btn" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="far fa-star" role="presentation" aria-label="star icon"></i>
            </span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "test_btn", label = "Click me", icon = shiny::icon(
        "star"), show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="test_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none">
            <i class="far fa-star" role="presentation" aria-label="star icon"></i>
          </span>
        </span>
        <span class="action-label">Click me</span>
      </button>

# toolbar_input_button() disabled parameter

    Code
      show_raw_html(toolbar_input_button(id = "disabled_btn", label = "Disabled",
        disabled = TRUE, show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" disabled id="disabled_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">Disabled</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "enabled_btn", label = "Enabled",
        disabled = FALSE, show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="enabled_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">Enabled</span>
      </button>

# toolbar_input_button() border parameter

    Code
      show_raw_html(toolbar_input_button(id = "no_border", label = "No Border",
        border = FALSE, show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="no_border" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">No Border</span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "with_border", label = "With Border",
        border = TRUE, show_label = TRUE))
    Output
      <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-1" data-type="label" id="with_border" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">With Border</span>
      </button>

# toolbar_input_button() tooltip parameter

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_default", label = "Help",
        icon = shiny::icon("question")))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Help</template>
        <span id="tooltip_default-label" hidden>Help</span>
        <button aria-labelledby="tooltip_default-label" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_default" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_false", label = "No Tooltip",
        icon = shiny::icon("question"), tooltip = FALSE))
    Output
      <span id="tooltip_false-label" hidden>No Tooltip</span>
      <button aria-labelledby="tooltip_false-label" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_false" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none">
            <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
          </span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_custom", label = "Help", icon = shiny::icon(
        "question"), tooltip = "Click for assistance"))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click for assistance</template>
        <span id="tooltip_custom-label" hidden>Help</span>
        <button aria-labelledby="tooltip_custom-label" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_custom" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "both_label_tooltip", label = "Save",
        icon = shiny::icon("save"), show_label = TRUE, tooltip = "Save your work"))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Save your work</template>
        <button class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="both_label_tooltip" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
            </span>
          </span>
          <span class="action-label">Save</span>
        </button>
      </bslib-tooltip>

