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
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="label_only" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">Click me</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "test_btn", label = "Click me", icon = shiny::icon(
        "star"), ))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click me</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="test_btn" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="far fa-star" role="presentation" aria-label="star icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" hidden>Click me</span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "test_btn", label = "Click me", icon = shiny::icon(
        "star"), show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="test_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none">
            <i class="far fa-star" role="presentation" aria-label="star icon"></i>
          </span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">Click me</span>
        </span>
      </button>

# toolbar_input_button() disabled parameter

    Code
      show_raw_html(toolbar_input_button(id = "disabled_btn", label = "Disabled",
        disabled = TRUE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" disabled id="disabled_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">Disabled</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "enabled_btn", label = "Enabled",
        disabled = FALSE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="enabled_btn" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">Enabled</span>
        </span>
      </button>

# toolbar_input_button() border parameter

    Code
      show_raw_html(toolbar_input_button(id = "no_border", label = "No Border",
        border = FALSE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="no_border" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">No Border</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "with_border", label = "With Border",
        border = TRUE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-1" data-type="label" id="with_border" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785">With Border</span>
        </span>
      </button>

# toolbar_input_button() tooltip parameter

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_default", label = "Help",
        icon = shiny::icon("question")))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Help</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_default" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" hidden>Help</span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_false", label = "No Tooltip",
        icon = shiny::icon("question"), tooltip = FALSE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_false" type="button">
        <span class="action-icon">
          <span aria-hidden="true" style="pointer-events: none">
            <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
          </span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" hidden>No Tooltip</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_custom", label = "Help", icon = shiny::icon(
        "question"), tooltip = "Click for assistance"))
    Output
      <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click for assistance</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_custom" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" hidden>Help</span>
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
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="both_label_tooltip" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none">
              <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785">Save</span>
          </span>
        </button>
      </bslib-tooltip>

# toolbar_input_switch() has correct attributes

    Code
      show_raw_html(toolbar_input_switch(id = "switch_with_label", label = "Flip",
        value = TRUE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="switch_with_label" class="form-check-input" type="checkbox" role="switch" checked/>
          <label class="form-check-label" for="switch_with_label">
            <span>Flip</span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "switch_no_label", label = NULL, value = FALSE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="switch_no_label" class="form-check-input" type="checkbox" role="switch"/>
          <label class="form-check-label" for="switch_no_label">
            <span></span>
          </label>
        </div>
      </div>

# toolbar_input_switch() value parameter

    Code
      show_raw_html(toolbar_input_switch(id = "default", label = "Default"))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="default" class="form-check-input" type="checkbox" role="switch"/>
          <label class="form-check-label" for="default">
            <span>Default</span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "off", label = "Off", value = FALSE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="off" class="form-check-input" type="checkbox" role="switch"/>
          <label class="form-check-label" for="off">
            <span>Off</span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "on", label = "On", value = TRUE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="on" class="form-check-input" type="checkbox" role="switch" checked/>
          <label class="form-check-label" for="on">
            <span>On</span>
          </label>
        </div>
      </div>

# toolbar_input_switch() label variations

    Code
      show_raw_html(toolbar_input_switch(id = "text_label", label = "Enable Feature",
        value = FALSE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="text_label" class="form-check-input" type="checkbox" role="switch"/>
          <label class="form-check-label" for="text_label">
            <span>Enable Feature</span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "html_label", label = strong(
        "Bold Label"), value = TRUE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="html_label" class="form-check-input" type="checkbox" role="switch" checked/>
          <label class="form-check-label" for="html_label">
            <span>
              <strong>Bold Label</strong>
            </span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "no_label", label = NULL, value = FALSE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="no_label" class="form-check-input" type="checkbox" role="switch"/>
          <label class="form-check-label" for="no_label">
            <span></span>
          </label>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar_input_switch(id = "empty_label", label = "", value = TRUE))
    Output
      <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
        <div class="bslib-input-switch form-switch form-check">
          <input id="empty_label" class="form-check-input" type="checkbox" role="switch" checked/>
          <label class="form-check-label" for="empty_label">
            <span></span>
          </label>
        </div>
      </div>

# toolbar_input_switch() in toolbar context

    Code
      show_raw_html(toolbar(align = "right", toolbar_input_switch(id = "feature1",
        label = "Feature 1", value = TRUE), toolbar_input_switch(id = "feature2",
        label = "Feature 2", value = FALSE), toolbar_input_button(id = "save", label = "Save",
        icon = shiny::icon("save"))))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="feature1" class="form-check-input" type="checkbox" role="switch" checked/>
            <label class="form-check-label" for="feature1">
              <span>Feature 1</span>
            </label>
          </div>
        </div>
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="feature2" class="form-check-input" type="checkbox" role="switch"/>
            <label class="form-check-label" for="feature2">
              <span>Feature 2</span>
            </label>
          </div>
        </div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Save</template>
          <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="save" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4785" hidden>Save</span>
            </span>
          </button>
        </bslib-tooltip>
      </div>

---

    Code
      show_raw_html(toolbar(align = "left", toolbar_input_switch(id = "toggle",
        label = "Toggle", value = TRUE)))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="left">
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="toggle" class="form-check-input" type="checkbox" role="switch" checked/>
            <label class="form-check-label" for="toggle">
              <span>Toggle</span>
            </label>
          </div>
        </div>
      </div>

---

    Code
      show_raw_html(toolbar(align = "right", gap = "0.5rem", toolbar_input_switch(id = "opt1",
        label = "Option 1", value = TRUE), toolbar_input_switch(id = "opt2", label = "Option 2",
        value = FALSE), toolbar_input_switch(id = "opt3", label = "Option 3", value = TRUE)))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right" style="gap:0.5rem;">
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="opt1" class="form-check-input" type="checkbox" role="switch" checked/>
            <label class="form-check-label" for="opt1">
              <span>Option 1</span>
            </label>
          </div>
        </div>
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="opt2" class="form-check-input" type="checkbox" role="switch"/>
            <label class="form-check-label" for="opt2">
              <span>Option 2</span>
            </label>
          </div>
        </div>
        <div class="form-group shiny-input-container" data-require-bs-version="5" data-require-bs-caller="input_switch()">
          <div class="bslib-input-switch form-switch form-check">
            <input id="opt3" class="form-check-input" type="checkbox" role="switch" checked/>
            <label class="form-check-label" for="opt3">
              <span>Option 3</span>
            </label>
          </div>
        </div>
      </div>

