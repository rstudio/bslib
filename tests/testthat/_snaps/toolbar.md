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
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">Click me</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "test_btn", label = "Click me", icon = shiny::icon(
        "star"), ))
    Output
      <bslib-tooltip id="test_btn-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click me</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="test_btn" type="button">
          <span class="action-icon">
            <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
              <i class="far fa-star" role="presentation" aria-label="star icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" class="bslib-toolbar-label" hidden>Click me</span>
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
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
            <i class="far fa-star" role="presentation" aria-label="star icon"></i>
          </span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">Click me</span>
        </span>
      </button>

# toolbar_input_button() disabled parameter

    Code
      show_raw_html(toolbar_input_button(id = "disabled_btn", label = "Disabled",
        disabled = TRUE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" disabled id="disabled_btn" type="button">
        <span class="action-icon">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">Disabled</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "enabled_btn", label = "Enabled",
        disabled = FALSE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="enabled_btn" type="button">
        <span class="action-icon">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">Enabled</span>
        </span>
      </button>

# toolbar_input_button() border parameter

    Code
      show_raw_html(toolbar_input_button(id = "no_border", label = "No Border",
        border = FALSE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="no_border" type="button">
        <span class="action-icon">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">No Border</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "with_border", label = "With Border",
        border = TRUE, show_label = TRUE))
    Output
      <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-1" data-type="label" id="with_border" type="button">
        <span class="action-icon">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none"></span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label">With Border</span>
        </span>
      </button>

# toolbar_input_button() tooltip parameter

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_default", label = "Help",
        icon = shiny::icon("question")))
    Output
      <bslib-tooltip id="tooltip_default-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Help</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_default" type="button">
          <span class="action-icon">
            <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" class="bslib-toolbar-label" hidden>Help</span>
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
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
            <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
          </span>
        </span>
        <span class="action-label">
          <span id="btn-label-4785" class="bslib-toolbar-label" hidden>No Tooltip</span>
        </span>
      </button>

---

    Code
      show_raw_html(toolbar_input_button(id = "tooltip_custom", label = "Help", icon = shiny::icon(
        "question"), tooltip = "Click for assistance"))
    Output
      <bslib-tooltip id="tooltip_custom-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Click for assistance</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="tooltip_custom" type="button">
          <span class="action-icon">
            <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
              <i class="fas fa-question" role="presentation" aria-label="question icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" class="bslib-toolbar-label" hidden>Help</span>
          </span>
        </button>
      </bslib-tooltip>

---

    Code
      show_raw_html(toolbar_input_button(id = "both_label_tooltip", label = "Save",
        icon = shiny::icon("save"), show_label = TRUE, tooltip = "Save your work"))
    Output
      <bslib-tooltip id="both_label_tooltip-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
        <template>Save your work</template>
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="both" id="both_label_tooltip" type="button">
          <span class="action-icon">
            <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
              <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
            </span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785" class="bslib-toolbar-label">Save</span>
          </span>
        </button>
      </bslib-tooltip>

# toolbar_divider() creates divider element

    Code
      show_raw_html(toolbar_divider())
    Output
      <div class="bslib-toolbar-divider" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_divider(gap = "20px"))
    Output
      <div class="bslib-toolbar-divider" style="--_divider-gap:20px;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_divider(width = "5px", gap = "2rem"))
    Output
      <div class="bslib-toolbar-divider" style="--_divider-gap:2rem;--_divider-width:5px;" aria-hidden="true"></div>

# toolbar_input_select() markup snapshots

    Code
      show_raw_html(toolbar_input_select(id = "select1", label = "Basic select",
        choices = c("A", "B", "C"), tooltip = FALSE))
    Output
      <div id="select1" class="bslib-toolbar-input-select shiny-input-container">
        <label id="select1-label" class="control-label" for="select1">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">Basic select</span>
        </label>
        <select id="select1" class="form-select form-select-sm" data-shiny-no-bind-input><option value="A" selected>A</option>
      <option value="B">B</option>
      <option value="C">C</option></select>
      </div>

---

    Code
      show_raw_html(toolbar_input_select(id = "select2", label = "Select with selected",
        choices = c("Option 1", "Option 2", "Option 3"), selected = "Option 2",
        tooltip = FALSE))
    Output
      <div id="select2" class="bslib-toolbar-input-select shiny-input-container">
        <label id="select2-label" class="control-label" for="select2">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">Select with selected</span>
        </label>
        <select id="select2" class="form-select form-select-sm" data-shiny-no-bind-input><option value="Option 1">Option 1</option>
      <option value="Option 2" selected>Option 2</option>
      <option value="Option 3">Option 3</option></select>
      </div>

---

    Code
      show_raw_html(toolbar_input_select(id = "select3", label = "Select with custom class",
        choices = c("X", "Y", "Z"), class = "bg-success-subtle", style = "width: 400px",
        tooltip = FALSE))
    Output
      <div class="bslib-toolbar-input-select shiny-input-container bg-success-subtle" id="select3" style="width: 400px">
        <label id="select3-label" class="control-label" for="select3">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">Select with custom class</span>
        </label>
        <select id="select3" class="form-select form-select-sm" data-shiny-no-bind-input><option value="X" selected>X</option>
      <option value="Y">Y</option>
      <option value="Z">Z</option></select>
      </div>

# toolbar_input_select() handles grouped choices

    Code
      show_raw_html(grouped_select)
    Output
      <div id="grouped" class="bslib-toolbar-input-select shiny-input-container">
        <label id="grouped-label" class="control-label" for="grouped">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">Grouped select</span>
        </label>
        <select id="grouped" class="form-select form-select-sm" data-shiny-no-bind-input><optgroup label="Group A">
      <option value="A1" selected>A1</option>
      <option value="A2">A2</option>
      </optgroup>
      <optgroup label="Group B">
      <option value="B1">B1</option>
      <option value="B2">B2</option>
      </optgroup></select>
      </div>

# toolbar_input_select() tooltip parameter

    Code
      show_raw_html(toolbar_input_select(id = "tooltip_true", label = "My Select Label",
        choices = c("A", "B"), tooltip = TRUE))
    Output
      <div id="tooltip_true" class="bslib-toolbar-input-select shiny-input-container">
        <label id="tooltip_true-label" class="control-label" for="tooltip_true">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">My Select Label</span>
        </label>
        <bslib-tooltip id="tooltip_true-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>
            <span aria-hidden="true">My Select Label</span>
          </template>
          <select id="tooltip_true" class="form-select form-select-sm" data-shiny-no-bind-input><option value="A" selected>A</option>
      <option value="B">B</option></select>
        </bslib-tooltip>
      </div>

---

    Code
      show_raw_html(toolbar_input_select(id = "with_tooltip", label = "With tooltip",
        choices = c("A", "B"), tooltip = "This is helpful information"))
    Output
      <div id="with_tooltip" class="bslib-toolbar-input-select shiny-input-container">
        <label id="with_tooltip-label" class="control-label" for="with_tooltip">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1"></span>
          <span class="bslib-toolbar-label visually-hidden">With tooltip</span>
        </label>
        <bslib-tooltip id="with_tooltip-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>This is helpful information</template>
          <select id="with_tooltip" class="form-select form-select-sm" data-shiny-no-bind-input><option value="A" selected>A</option>
      <option value="B">B</option></select>
        </bslib-tooltip>
      </div>

# toolbar_input_select() icon parameter

    Code
      show_raw_html(toolbar_input_select(id = "with_icon", label = "With icon",
        choices = c("A", "B"), icon = shiny::icon("filter"), tooltip = FALSE))
    Output
      <div id="with_icon" class="bslib-toolbar-input-select shiny-input-container">
        <label id="with_icon-label" class="control-label" for="with_icon">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1">
            <i class="fas fa-filter" role="presentation" aria-label="filter icon"></i>
          </span>
          <span class="bslib-toolbar-label visually-hidden">With icon</span>
        </label>
        <select id="with_icon" class="form-select form-select-sm" data-shiny-no-bind-input><option value="A" selected>A</option>
      <option value="B">B</option></select>
      </div>

---

    Code
      show_raw_html(toolbar_input_select(id = "icon_tooltip", label = "Icon and tooltip",
        choices = c("A", "B"), icon = shiny::icon("star"), tooltip = "Select an option"))
    Output
      <div id="icon_tooltip" class="bslib-toolbar-input-select shiny-input-container">
        <label id="icon_tooltip-label" class="control-label" for="icon_tooltip">
          <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none" role="none" tabindex="-1">
            <i class="far fa-star" role="presentation" aria-label="star icon"></i>
          </span>
          <span class="bslib-toolbar-label visually-hidden">Icon and tooltip</span>
        </label>
        <bslib-tooltip id="icon_tooltip-tooltip" placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Select an option</template>
          <select id="icon_tooltip" class="form-select form-select-sm" data-shiny-no-bind-input><option value="A" selected>A</option>
      <option value="B">B</option></select>
        </bslib-tooltip>
      </div>

# update_toolbar_input_select() validates label parameter

    Code
      update_toolbar_input_select("test_id", label = "", session = session)
    Condition
      Error in `update_toolbar_input_select()`:
      ! `label` must be a non-empty string.

---

    Code
      update_toolbar_input_select("test_id", label = "   ", session = session)
    Condition
      Error in `update_toolbar_input_select()`:
      ! `label` must be a non-empty string.

---

    Code
      update_toolbar_input_select("test_id", label = 123, session = session)
    Condition
      Error in `update_toolbar_input_select()`:
      ! `label` must be a non-empty string.

---

    Code
      update_toolbar_input_select("test_id", label = c("A", "B"), session = session)
    Condition
      Error in `update_toolbar_input_select()`:
      ! `label` must be a non-empty string.

# toolbar_input_select() validates selected is in choices

    Code
      toolbar_input_select(id = "test", label = "Test", choices = c("A", "B", "C"),
      selected = "D", tooltip = FALSE)
    Condition
      Error in `toolbar_input_select()`:
      ! `selected` value 'D' is not in `choices`.

---

    Code
      toolbar_input_select(id = "test", label = "Test", choices = c(`Label A` = "val_a",
        `Label B` = "val_b"), selected = "Label A", tooltip = FALSE)
    Condition
      Error in `toolbar_input_select()`:
      ! `selected` value 'Label A' is not in `choices`.

---

    Code
      toolbar_input_select(id = "test", label = "Test", choices = list(`Group 1` = c(
        "A", "B"), `Group 2` = c("C", "D")), selected = "E", tooltip = FALSE)
    Condition
      Error in `toolbar_input_select()`:
      ! `selected` value 'E' is not in `choices`.

# update_toolbar_input_select() validates selected is in choices

    Code
      update_toolbar_input_select("test_id", choices = c("A", "B", "C"), selected = "D",
      session = session)
    Condition
      Warning:
      `selected` value 'D' is not in `choices`.

