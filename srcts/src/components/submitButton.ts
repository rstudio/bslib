import { BslibTaskButtonInputBinding } from "./taskButton";
import { registerBinding, showShinyClientMessage } from "./_utils";

import type { ShinyEventInputChanged } from "rstudio-shiny/srcts/types/src/events/shinyEvents";

// eslint-disable-next-line @typescript-eslint/naming-convention
const EVENT_NAMESPACE = "submitButtonInputBinding";

class BslibSubmitButtonInputBinding extends BslibTaskButtonInputBinding {
  #target: HTMLElement | null = null;

  find(scope: HTMLElement) {
    return $(scope).find(".bslib-submit-button");
  }

  initialize(el: HTMLElement): void {
    const scope = el.dataset.submitScope;

    // Find the submit button's target scope.
    this.#target = scope
      ? document.querySelector(scope)
      : (el.parentElement as HTMLElement);

    // Target must be an HTML element
    if (!this.#target) {
      showShinyClientMessage({
        status: "error",
        message: `input_submit_button() scope "${scope}" not found`,
      });
      return;
    }

    // TODO: perhaps it's worth changing all the relevant input bindings to
    // use an "immediate" rate policy?

    // For all the inputs under the relevant target scope, cancel and capture
    // the input change events. This way, no input update messages are sent
    // to the server until the submit button is clicked.
    const inputChangeEvents = new Map<ShinyEventInputChanged, string>();
    $(this.#target).on(
      `shiny:inputchanged.${EVENT_NAMESPACE}`,
      (event: unknown) => {
        const e = event as ShinyEventInputChanged;
        // If the input change is private, let it through (not sure if this is
        // actually needed, but can't hurt)
        if (/^\./.test(e.name)) {
          return;
        }

        // If the change is for this submit button, let it through
        if (e.name === el.id) {
          return;
        }

        // Cancel and capture (so we can send later)
        e.preventDefault();
        inputChangeEvents.set(e, e.name);
      }
    );

    // Send the 'pending' input values to the server on submit
    $(el).on(`click.${EVENT_NAMESPACE}`, () => {
      if (el.hasAttribute("disabled")) {
        return;
      }

      if (!window.Shiny || !window.Shiny.setInputValue) {
        return;
      }

      // N.B. unfortunately if the values are sent with `priority: "event"`,
      // each value update is sent as a separate message to the server.
      // For performance reasons, it's important to send all the values
      // in a single message. The default priority achieves this.
      for (const [event, name] of inputChangeEvents) {
        window.Shiny.setInputValue(name, event.value);
      }

      inputChangeEvents.clear();
    });
  }

  unsubscribe(el: HTMLElement): void {
    $(el).off(`click.${EVENT_NAMESPACE}`);
    if (this.#target) {
      $(this.#target).off(`shiny:inputchanged.${EVENT_NAMESPACE}`);
    }
  }
}

registerBinding(BslibTaskButtonInputBinding, "task-button");
registerBinding(BslibSubmitButtonInputBinding, "submit-button");
