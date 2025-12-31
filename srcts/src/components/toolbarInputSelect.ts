import type { InputSubscribeCallback } from "rstudio-shiny/srcts/types/src/bindings/input/inputBinding";
import {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  shinyRenderContent,
} from "./_utils";
import type { HtmlDep } from "./_utils";

type ToolbarInputSelectMessage = {
  label?: string | { html: string; deps: HtmlDep[] };
  showLabel?: boolean;
  options?: string;
  value?: string;
  icon?: string | { html: string; deps: HtmlDep[] };
};

/**
 * This is a Shiny input binding for `bslib::toolbar_input_select()`.
 * It extends the standard select input behavior with support for updating
 * the select's label, icon, and choices.
 */
class BslibToolbarInputSelectBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(".bslib-toolbar-input-select");
  }

  getId(el: HTMLElement): string {
    // The wrapper element has the input ID
    return el.id || "";
  }

  getValue(el: HTMLElement) {
    const selectEl = el.querySelector("select");
    return (selectEl as HTMLSelectElement)?.value;
  }

  subscribe(el: HTMLElement, callback: InputSubscribeCallback) {
    const selectEl = el.querySelector("select");
    if (selectEl) {
      $(selectEl).on("change.bslibToolbarInputSelect", () => {
        callback(false);
      });
    }
  }

  unsubscribe(el: HTMLElement) {
    const selectEl = el.querySelector("select");
    if (selectEl) {
      $(selectEl).off(".bslibToolbarInputSelect");
    }
  }

  async receiveMessage(el: HTMLElement, message: ToolbarInputSelectMessage) {
    // el is the wrapper div with class .bslib-toolbar-input-select
    const selectEl = el.querySelector("select");

    // Update label
    if (hasDefinedProperty(message, "label")) {
      const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
      if (labelEl && message.label !== undefined) {
        await shinyRenderContent(labelEl, message.label);
      }
    }

    // Update show_label visibility
    if (hasDefinedProperty(message, "showLabel")) {
      const labelEl = el.querySelector(".bslib-toolbar-label") as HTMLElement;
      if (labelEl) {
        if (message.showLabel === false) {
          labelEl.classList.add("visually-hidden");
        } else {
          labelEl.classList.remove("visually-hidden");
        }
      }
    }

    // Update icon
    if (hasDefinedProperty(message, "icon")) {
      const iconEl = el.querySelector(".bslib-toolbar-icon") as HTMLElement;
      if (iconEl && message.icon !== undefined) {
        await shinyRenderContent(iconEl, message.icon);
      }
    }

    // Update choices (options HTML)
    if (hasDefinedProperty(message, "options") && selectEl) {
      if (message.options) {
        // Replace the select options with new HTML
        selectEl.innerHTML = message.options;
      }
    }

    // Update selected value
    if (hasDefinedProperty(message, "value") && selectEl) {
      if (message.value !== undefined) {
        selectEl.value = message.value;
        // Trigger change event to notify Shiny of the value change
        $(selectEl).trigger("change");
      }
    }
  }
}

registerBinding(BslibToolbarInputSelectBinding, "toolbar-input-select");
