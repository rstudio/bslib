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

// When a textarea becomes visible, update the height
const intersectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      updateHeight(entry.target as HTMLTextAreaElement);
    }
  });
});

class TextAreaSubmitInputBinding extends InputBinding {
  #submitButton: HTMLButtonElement | null = null;

  find(scope: HTMLElement): JQuery<HTMLElement> {
    return $(scope).find(".bslib-input-textsubmit > textarea");
  }

  initialize(el: HTMLTextAreaElement): void {
    const btn = el.nextElementSibling;
    // This assumption is forced server-side
    if (!(btn instanceof HTMLButtonElement)) {
      throw new Error("No submit button found");
    }
    this.#submitButton = btn;
    updateDisabledState(btn, !el.value);
    updateHeight(el);
    maybeUpdateSubmitButtonLabel(el, btn);
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

    const btn = this.#submitButton as HTMLButtonElement;

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
      updateDisabledState(btn, !el.value);
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

        const needsModifier = el.hasAttribute("data-needs-modifier");
        const hasModifier = event.ctrlKey || event.metaKey;

        // If a modifier is needed, and it is present, submit the input
        if (needsModifier && hasModifier) {
          event.preventDefault();
          btn.click();
          return;
        }

        // If no modifier is needed, shift+enter inserts a new line,
        // but enter alone submits the input
        if (!needsModifier && !event.shiftKey) {
          event.preventDefault();
          btn.click();
        }
      }
    );

    intersectObserver.observe(el);
  }

  unsubscribe(el: HTMLElement): void {
    $(el).off(`.${EVENT_NAMESPACE}`);
    const btn = el.nextElementSibling as HTMLElement;
    $(btn).off(`.${EVENT_NAMESPACE}`);
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
      const labEl = $(el).closest(".shiny-input-container").find("label");
      await updateLabel(data.label, labEl);
    }

    if (data.submit) {
      const btn = el.nextElementSibling;
      if (btn instanceof HTMLButtonElement) {
        btn.click();
        el.value = oldValue;
      }
    }

    if (data.focus) {
      el.focus();
    }
  }
}

function updateDisabledState(btn: HTMLButtonElement, isDisabled: boolean) {
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

function updateHeight(el: HTMLTextAreaElement) {
  if (el.scrollHeight === 0) {
    return;
  }
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

// If the textarea has data-needs-modifier, update the default
// button label/title accordingly
function maybeUpdateSubmitButtonLabel(
  el: HTMLTextAreaElement,
  btn: HTMLButtonElement
) {
  if (!el.hasAttribute("data-needs-modifier")) {
    return;
  }
  if (!btn.hasAttribute("data-default-button")) {
    return;
  }

  const isMac = navigator.userAgent.indexOf("Mac") !== -1;
  const modifierKey = isMac ? "\u2318" : "Ctrl";
  btn.textContent = `Submit ${modifierKey} \u23CE`;
  const titleText = `Press ${modifierKey} + Enter to Submit`;
  btn.title = titleText;
  btn.setAttribute("aria-label", titleText);
}

registerBinding(TextAreaSubmitInputBinding, "submit-text-area");
