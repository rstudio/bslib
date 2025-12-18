import {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  shinyRenderContent,
} from "./_utils";
import type { HtmlDep } from "./_utils";

type ToolbarInputButtonMessage = {
  label?: string | { html: string; deps: HtmlDep[] };
  icon?: string | { html: string; deps: HtmlDep[] };
  disabled?: boolean;
};

/**
 * This is a Shiny input binding for `bslib::toolbar_input_button()`.
 * It extends the standard action button behavior with support for updating
 * the button's label, icon, and disabled state.
 */
class BslibToolbarInputButtonBinding extends InputBinding {
  #clickCount = new WeakMap<HTMLElement, number>();
  #clickListeners = new WeakMap<HTMLElement, EventListener>();

  find(scope: HTMLElement) {
    return $(scope).find(".bslib-toolbar-input-button");
  }

  getValue(el: HTMLElement) {
    return this.#clickCount.get(el) ?? 0;
  }

  getType(/*el: HTMLElement*/): string {
    return "bslib.toolbar.button";
  }

  subscribe(el: HTMLElement, callback: (x: boolean) => void) {
    if (this.#clickListeners.has(el)) {
      this.unsubscribe(el);
    }

    const eventListener = (/*event: Event*/) => {
      this.#clickCount.set(el, (this.#clickCount.get(el) ?? 0) + 1);
      callback(true);
    };
    this.#clickListeners.set(el, eventListener);
    el.addEventListener("click", eventListener);
  }

  unsubscribe(el: HTMLElement) {
    const listener = this.#clickListeners.get(el);
    if (listener) {
      el.removeEventListener("click", listener);
    }
  }

  async receiveMessage(el: HTMLElement, message: ToolbarInputButtonMessage) {
    // Update disabled state
    if (hasDefinedProperty(message, "disabled")) {
      (el as HTMLButtonElement).disabled = message.disabled;
    }

    // Update label
    if (hasDefinedProperty(message, "label")) {
      const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
      if (labelEl && message.label !== undefined) {
        await shinyRenderContent(labelEl, message.label);
      }
    }

    // Update icon
    if (hasDefinedProperty(message, "icon")) {
      const iconEl = el.querySelector(".bslib-toolbar-icon") as HTMLElement;
      if (iconEl && message.icon !== undefined) {
        await shinyRenderContent(iconEl, message.icon);
      }
    }
  }
}

registerBinding(BslibToolbarInputButtonBinding, "toolbar-input-button");
