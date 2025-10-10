import type { InputSubscribeCallback } from "rstudio-shiny/srcts/types/src/bindings/input/inputBinding";
import { registerBinding, InputBinding, updateLabel } from "./_utils";

type TextSubmitReceiveMessageData = {
  value?: string;
  placeholder?: string;
  label?: string;
  submit?: boolean;
  focus?: boolean;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const EVENT_NAMESPACE = "textSubmitInputBinding";

// eslint-disable-next-line @typescript-eslint/naming-convention
const CSS_CLASSES = {
  // Top-level container for the entire input (label and everything)
  input: "bslib-input-submit-textarea",
  // Container for the textarea and submit button
  container: "bslib-submit-textarea-container",
  // Class assigned to the submit button
  button: "bslib-submit-textarea-btn",
  // Class assigned to the span within the button that shows the key combo
  submitKey: "bslib-submit-key",
};

// When a textarea becomes visible, update the height
const intersectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      updateHeight(entry.target as HTMLTextAreaElement);
    }
  });
});

class TextAreaSubmitInputBinding extends InputBinding {
  find(scope: HTMLElement): JQuery<HTMLElement> {
    return $(scope).find(`.${CSS_CLASSES.input} textarea`);
  }

  initialize(el: HTMLTextAreaElement): void {
    updateDisabledState(el);
    updateHeight(el);
    maybeUpdateSubmitButtonLabel(el);
  }

  // Read a 'proxy' value instead of the actual value since we
  // intentionally don't want the value server-side until it's submitted.
  getValue(el: HTMLTextAreaElement): string {
    return $(el).data("val");
  }

  setValue(el: HTMLTextAreaElement, value: string): void {
    el.value = value;
  }

  subscribe(el: HTMLTextAreaElement, callback: InputSubscribeCallback): void {
    // Before notifying Shiny of a change, update the proxy value,
    // clear the input, and trigger an input event (for disabled state).
    function doSendValue() {
      $(el).data("val", el.value);
      el.value = "";
      el.dispatchEvent(new Event("input", { bubbles: true }));
      callback("event");
    }

    const btn = findSubmitButton(el);
    if (btn.classList.contains("shiny-bound-input")) {
      // If the button is a task/action button, make sure this text input value
      // is sent along with the button input value _on the same update message
      // tick_.
      //
      // This is important for a task button since its input handler updates
      // state from 'busy' to 'ready' on the next flush, but if the button value
      // gets sent before the text value, the next flush will happen before the
      // new text value gets handled. In other words, you'll get a "flash" of
      // busy state, then a pre-mature ready state.
      $(btn).on(`shiny:inputchanged.${EVENT_NAMESPACE}`, doSendValue);
    } else {
      // If this is just a regular button, send the value on click
      $(btn).on(`click.${EVENT_NAMESPACE}`, doSendValue);
    }

    // When new input is received, update the button's disabled state
    $(el).on(`input.${EVENT_NAMESPACE}`, function () {
      updateDisabledState(el);
      updateHeight(el);
    });

    $(el).on(
      `keydown.${EVENT_NAMESPACE}`,
      // event: JQuery.KeyboardEventObject
      function (event) {
        // If this isn't an enter key, do nothing
        if (event.key !== "Enter") {
          return;
        }

        // If the input is empty, do nothing
        if (!el.value) {
          event.preventDefault();
          return;
        }

        // If shift is held, allow default (newline)
        if (event.shiftKey) {
          return;
        }

        // If alt is held, insert a newline
        // (browser's don't seem to handle this consistently, so handle it manually)
        if (event.altKey) {
          event.preventDefault();
          insertNewLineAtCursor(el);
          return;
        }

        // Since we'll handle the newline cases above, if no modifier is needed,
        // submit the input
        const needsModifier = el.hasAttribute("data-needs-modifier");
        if (!needsModifier) {
          event.preventDefault();
          btn.click();
          return;
        }

        // If a modifier is needed, and it is present, submit the input
        const hasModifier = event.ctrlKey || event.metaKey;
        if (needsModifier && hasModifier) {
          event.preventDefault();
          btn.click();
          return;
        }
      }
    );

    // Focus the textarea when the container is clicked
    const container = el.closest(`.${CSS_CLASSES.container}`) as HTMLElement;
    $(container).on(
      `click.${EVENT_NAMESPACE}`,
      // event: JQuery.KeyboardEventObject
      (event) => {
        if (event.target.classList.contains(CSS_CLASSES.container)) {
          el.focus();
        }
      }
    );

    intersectObserver.observe(el);
  }

  unsubscribe(el: HTMLElement): void {
    $(el).off(`.${EVENT_NAMESPACE}`);
    const btn = el.nextElementSibling as HTMLElement;
    $(btn).off(`.${EVENT_NAMESPACE}`);
    const container = el.closest(`.${CSS_CLASSES.container}`) as HTMLElement;
    $(container).off(`.${EVENT_NAMESPACE}`);

    intersectObserver.unobserve(el);
  }

  async receiveMessage(
    el: HTMLTextAreaElement,
    data: TextSubmitReceiveMessageData
  ): Promise<void> {
    const oldValue = el.value;

    if (data.value !== undefined) {
      el.value = data.value;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }

    if (data.placeholder !== undefined) {
      el.placeholder = data.placeholder;
    }

    if (data.label !== undefined) {
      const labEl = $(el).closest(`.${CSS_CLASSES.input}`).find("label");
      await updateLabel(data.label, labEl);
    }

    if (data.submit) {
      const btn = findSubmitButton(el);
      btn.click();
      el.value = oldValue;
    }

    if (data.focus) {
      el.focus();
    }
  }
}

// Update the submit button's disabled state based on whether
// or not the textarea has content
function updateDisabledState(el: HTMLTextAreaElement) {
  const btn = findSubmitButton(el);
  const isDisabled = !el.value;

  // This class brings in Bootstrap disabled styles, which should not only
  // visually grey out the button, but also prevent pointer events
  btn.classList.toggle("disabled", isDisabled);

  // Add aria-disabled attribute to prevent screen readers from
  // announcing the button as clickable
  btn.setAttribute("aria-disabled", isDisabled.toString());

  // Set tabindex=-1 to prevent focus via keyboard
  isDisabled
    ? btn.setAttribute("tabindex", "-1")
    : btn.removeAttribute("tabindex");
}

// Update the height of the textarea to fit its content
function updateHeight(el: HTMLTextAreaElement) {
  if (el.scrollHeight === 0) {
    return;
  }
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

// If the textarea has data-needs-modifier, update the default
// button label/title accordingly
function maybeUpdateSubmitButtonLabel(el: HTMLTextAreaElement) {
  if (!el.hasAttribute("data-needs-modifier")) {
    return;
  }
  const btn = findSubmitButton(el);
  if (!btn.querySelector(`.${CSS_CLASSES.submitKey}`)) {
    return;
  }

  const isMac = navigator.userAgent.indexOf("Mac") !== -1;

  // Insert the appropriate modifier symbol into button label
  btn.querySelectorAll(`.${CSS_CLASSES.submitKey}`).forEach((span) => {
    const modifierKey = isMac ? "\u2318" : "Ctrl";
    span.textContent = `${modifierKey} \u23CE`;
  });

  // Insert the appropriate modifier into the button title and aria-label
  const modifierKey = isMac ? "Command" : "Ctrl";
  btn.title = btn.title.replace("Press Enter", `Press ${modifierKey}+Enter`);
  const ariaLabel = btn.getAttribute("aria-label");
  if (ariaLabel) {
    btn.setAttribute(
      "aria-label",
      ariaLabel.replace("Press Enter", `Press ${modifierKey}+Enter`)
    );
  }
}

// Find the submit button associated with this textarea
function findSubmitButton(el: HTMLTextAreaElement): HTMLButtonElement {
  const btn = el.parentElement?.querySelector(`.${CSS_CLASSES.button}`);
  if (btn instanceof HTMLButtonElement) {
    return btn;
  }
  throw new Error(
    "Expected input_submit_textarea()'s container to have a button with class of 'bslib-submit-textarea-btn'"
  );
}

// Insert a newline at the cursor position
function insertNewLineAtCursor(el: HTMLTextAreaElement) {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  el.value = el.value.substring(0, start) + "\n" + el.value.substring(end);
  el.selectionStart = el.selectionEnd = start + 1;
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

registerBinding(TextAreaSubmitInputBinding, "submit-text-area");
