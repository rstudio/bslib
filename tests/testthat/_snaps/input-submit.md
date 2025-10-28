# input_submit_textarea() markup snapshots

    Code
      input_submit_textarea("test")
    Output
      <div class="bslib-input-submit-textarea shiny-input-container bslib-mb-spacing" style="width:min(680px, 100%);">
        <label class="control-label shiny-label-null" for="test" id="test-label"></label>
        <div class="bslib-submit-textarea-container">
          <textarea id="test" class="form-control" style="width:100%;" data-needs-modifier="" rows="1"></textarea>
          <footer>
            <div class="bslib-toolbar"></div>
            <button aria-label="Press Enter to Submit" class="btn btn-primary bslib-task-button btn-sm bslib-submit-textarea-btn" data-auto-reset id="test_submit" title="Press Enter to Submit" type="button">
              <bslib-switch-inline case="ready">
                <span slot="ready">
                  Submit
                  <span class="bslib-submit-key">⏎</span>
                </span>
                <span slot="busy">
                  Submit
                  <div class="spinner-border spinner-border-sm ms-2" role="status">
                    <span class="visually-hidden">Processing...</span>
                  </div>
                </span>
              </bslib-switch-inline>
            </button>
          </footer>
        </div>
      </div>

---

    Code
      input_submit_textarea("test", label = "Enter text", placeholder = "Type here...",
        value = "Initial value", width = 300, rows = 3, button = tags$button(id = "custom_submit",
          class = "btn btn-primary", "Send"), toolbar = tagList(tags$span("Press"),
        tags$kbd("Enter"), tags$span("to submit")), submit_key = "enter", spellcheck = "false",
        autocomplete = "off", )
    Output
      <div class="bslib-input-submit-textarea shiny-input-container bslib-mb-spacing" style="width:300px;">
        <label class="control-label" id="test-label" for="test">Enter text</label>
        <div class="bslib-submit-textarea-container">
          <textarea id="test" class="form-control" style="width:100%;" placeholder="Type here..." rows="3" spellcheck="false" autocomplete="off">Initial value</textarea>
          <footer>
            <div class="bslib-toolbar">
              <span>Press</span>
              <kbd>Enter</kbd>
              <span>to submit</span>
            </div>
            <button class="btn btn-primary bslib-submit-textarea-btn" id="custom_submit">Send</button>
          </footer>
        </div>
      </div>

# input_submit_textarea() validation errors

    Code
      input_submit_textarea("test", "With Children", div())
    Condition
      Error in `input_submit_textarea()`:
      ! All `...` arguments must be named
      i Did you mean to pass UI elements to `toolbar`?

---

    Code
      input_submit_textarea("test", value = 123)
    Condition
      Error in `input_submit_textarea()`:
      ! `value` must be a character string

---

    Code
      input_submit_textarea("test", value = c("a", "b"))
    Condition
      Error in `input_submit_textarea()`:
      ! `value` must be a character string

---

    Code
      input_submit_textarea("test", button = tags$div("Not a button"))
    Condition
      Error in `input_submit_textarea()`:
      ! `button` must be a `tags$button()`

---

    Code
      input_submit_textarea("test", submit_key = "invalid")
    Condition
      Error in `input_submit_textarea()`:
      ! `submit_key` must be one of "enter+modifier" or "enter", not "invalid".

