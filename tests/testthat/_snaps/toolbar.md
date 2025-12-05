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

# toolbar_spacer() creates spacer element

    Code
      show_raw_html(toolbar_spacer())
    Output
      <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_spacer(width = "20px"))
    Output
      <div class="bslib-toolbar-spacer" style="width:20px;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_spacer(divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>

---

    Code
      show_raw_html(toolbar_spacer(width = "2rem", divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:2rem;"></div>

---

    Code
      show_raw_html(toolbar_spacer())
    Output
      <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_spacer(width = "20px"))
    Output
      <div class="bslib-toolbar-spacer" style="width:20px;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_spacer(divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>

---

    Code
      show_raw_html(toolbar_spacer(width = "2rem", divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:2rem;"></div>

# toolbar_spacer() in toolbar context

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "left", label = "Left"),
      toolbar_spacer(), toolbar_input_button(id = "right", label = "Right")))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="left" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785">Left</span>
          </span>
        </button>
        <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>
        <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="right" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-1502">Right</span>
          </span>
        </button>
      </div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "a", label = "A"),
      toolbar_spacer(width = "10px"), toolbar_input_button(id = "b", label = "B"),
      toolbar_spacer(divider = TRUE), toolbar_input_button(id = "c", label = "C")))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="a" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785">A</span>
          </span>
        </button>
        <div class="bslib-toolbar-spacer" style="width:10px;" aria-hidden="true"></div>
        <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="b" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-1502">B</span>
          </span>
        </button>
        <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>
        <button aria-labelledby="btn-label-4429" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="c" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4429">C</span>
          </span>
        </button>
      </div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "left", label = "Left"),
      toolbar_spacer(), toolbar_input_button(id = "right", label = "Right")))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="left" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785">Left</span>
          </span>
        </button>
        <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>
        <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="right" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-1502">Right</span>
          </span>
        </button>
      </div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "a", label = "A"),
      toolbar_spacer(width = "10px"), toolbar_input_button(id = "b", label = "B"),
      toolbar_spacer(divider = TRUE), toolbar_input_button(id = "c", label = "C")))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="a" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4785">A</span>
          </span>
        </button>
        <div class="bslib-toolbar-spacer" style="width:10px;" aria-hidden="true"></div>
        <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="b" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-1502">B</span>
          </span>
        </button>
        <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>
        <button aria-labelledby="btn-label-4429" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="label" id="c" type="button">
          <span class="action-icon">
            <span aria-hidden="true" style="pointer-events: none"></span>
          </span>
          <span class="action-label">
            <span id="btn-label-4429">C</span>
          </span>
        </button>
      </div>

# toolbar_spacer() with fixed width (use case 2)

    Code
      show_raw_html(toolbar_spacer(width = "20px"))
    Output
      <div class="bslib-toolbar-spacer" style="width:20px;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "a", label = "Star", icon = shiny::icon(
        "star")), toolbar_spacer(width = "20px"), toolbar_input_button(id = "b",
        label = "Heart", icon = shiny::icon("heart")), toolbar_spacer(width = "20px"),
      toolbar_input_button(id = "c", label = "Comment", icon = shiny::icon("comment"))))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Star</template>
          <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="a" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="far fa-star" role="presentation" aria-label="star icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4785" hidden>Star</span>
            </span>
          </button>
        </bslib-tooltip>
        <div class="bslib-toolbar-spacer" style="width:20px;" aria-hidden="true"></div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Heart</template>
          <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="b" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="far fa-heart" role="presentation" aria-label="heart icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-1502" hidden>Heart</span>
            </span>
          </button>
        </bslib-tooltip>
        <div class="bslib-toolbar-spacer" style="width:20px;" aria-hidden="true"></div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Comment</template>
          <button aria-labelledby="btn-label-4429" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="c" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="far fa-comment" role="presentation" aria-label="comment icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4429" hidden>Comment</span>
            </span>
          </button>
        </bslib-tooltip>
      </div>

---

    Code
      show_raw_html(toolbar_spacer(width = "1rem"))
    Output
      <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>

---

    Code
      show_raw_html(toolbar_spacer(width = "50px"))
    Output
      <div class="bslib-toolbar-spacer" style="width:50px;" aria-hidden="true"></div>

# toolbar_spacer() with divider (use case 3)

    Code
      show_raw_html(toolbar_spacer(divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "save", label = "Save", icon = shiny::icon(
        "save")), toolbar_input_button(id = "edit", label = "Edit", icon = shiny::icon(
        "pencil")), toolbar_spacer(divider = TRUE), toolbar_input_button(id = "delete",
        label = "Delete", icon = shiny::icon("trash"))))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
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
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Edit</template>
          <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="edit" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-pencil" role="presentation" aria-label="pencil icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-1502" hidden>Edit</span>
            </span>
          </button>
        </bslib-tooltip>
        <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Delete</template>
          <button aria-labelledby="btn-label-4429" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="delete" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-trash" role="presentation" aria-label="trash icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4429" hidden>Delete</span>
            </span>
          </button>
        </bslib-tooltip>
      </div>

---

    Code
      show_raw_html(toolbar_spacer(width = "1rem", divider = TRUE))
    Output
      <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>

---

    Code
      show_raw_html(toolbar(toolbar_input_button(id = "undo", label = "Undo", icon = shiny::icon(
        "undo")), toolbar_input_button(id = "redo", label = "Redo", icon = shiny::icon(
        "redo")), toolbar_spacer(width = "1rem", divider = TRUE),
      toolbar_input_button(id = "save", label = "Save", icon = shiny::icon("save")),
      toolbar_input_button(id = "paragraph", label = "Paragraph", icon = shiny::icon(
        "paragraph")), toolbar_spacer(), toolbar_input_button(id = "settings", label = "Settings",
        icon = shiny::icon("gear"))))
    Output
      <div class="bslib-toolbar bslib-gap-spacing" data-align="right">
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Undo</template>
          <button aria-labelledby="btn-label-4785" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="undo" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-arrow-rotate-left" role="presentation" aria-label="arrow-rotate-left icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4785" hidden>Undo</span>
            </span>
          </button>
        </bslib-tooltip>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Redo</template>
          <button aria-labelledby="btn-label-1502" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="redo" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-arrow-rotate-right" role="presentation" aria-label="arrow-rotate-right icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-1502" hidden>Redo</span>
            </span>
          </button>
        </bslib-tooltip>
        <div aria-hidden="true" class="bslib-toolbar-spacer bslib-toolbar-divider" style="width:1rem;"></div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Save</template>
          <button aria-labelledby="btn-label-4429" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="save" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="far fa-floppy-disk" role="presentation" aria-label="floppy-disk icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4429" hidden>Save</span>
            </span>
          </button>
        </bslib-tooltip>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Paragraph</template>
          <button aria-labelledby="btn-label-4695" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="paragraph" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-paragraph" role="presentation" aria-label="paragraph icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-4695" hidden>Paragraph</span>
            </span>
          </button>
        </bslib-tooltip>
        <div class="bslib-toolbar-spacer" style="width:1rem;" aria-hidden="true"></div>
        <bslib-tooltip placement="bottom" bsOptions="[]" data-require-bs-version="5" data-require-bs-caller="tooltip()">
          <template>Settings</template>
          <button aria-labelledby="btn-label-5089" class="btn btn-default action-button bslib-toolbar-input-button btn-sm border-0" data-type="icon" id="settings" type="button">
            <span class="action-icon">
              <span aria-hidden="true" style="pointer-events: none">
                <i class="fas fa-gear" role="presentation" aria-label="gear icon"></i>
              </span>
            </span>
            <span class="action-label">
              <span id="btn-label-5089" hidden>Settings</span>
            </span>
          </button>
        </bslib-tooltip>
      </div>

