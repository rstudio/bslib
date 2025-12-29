import type { InputSubscribeCallback } from "rstudio-shiny/srcts/types/src/bindings/input/inputBinding";
import {
  InputBinding,
  registerBinding,
  hasDefinedProperty,
  shinyRenderContent,
  Shiny,
} from "./_utils";
import type { HtmlDep } from "./_utils";

type ToolbarInputSelectMessage = {
  label?: string | { html: string; deps: HtmlDep[] };
  showLabel?: boolean;
  choices?: { options: string; selected?: string[] | string };
  icon?: string | { html: string; deps: HtmlDep[] };
};

/**
 * This is a Shiny input binding for `bslib::toolbar_input_select()`.
 * It extends the standard select input behavior with support for updating
 * the select's label, icon, and choices.
 *
 * For core select functionality (getValue, subscribe, etc.), we delegate to
 * Shiny's built-in select input binding when available.
 */
class BslibToolbarInputSelectBinding extends InputBinding {
  #selectBinding: typeof InputBinding.prototype | null = null;

  constructor() {
    super();
    console.log("[toolbar-input-select] Binding constructor called");
    // Get reference to Shiny's standard select input binding
    if (Shiny?.inputBindings) {
      const bindings = Shiny.inputBindings.bindingNames;
      for (const name of Object.keys(bindings)) {
        if (name.includes("select")) {
          this.#selectBinding = bindings[name].binding;
          break;
        }
      }
    }
  }

  find(scope: HTMLElement) {
    const found = $(scope).find(".bslib-toolbar-input-select");
    console.log(
      "[toolbar-input-select] find() called, found:",
      found.length,
      "elements"
    );
    return found;
  }

  getId(el: HTMLElement): string {
    // The wrapper element has the input ID
    return el.id || "";
  }

  getValue(el: HTMLElement) {
    // Delegate to Shiny's select binding if available
    const selectEl = el.querySelector("select");
    if (selectEl && this.#selectBinding) {
      return this.#selectBinding.getValue(selectEl);
    }
    // Fallback: get the select value directly
    return (selectEl as HTMLSelectElement)?.value;
  }

  getType(/*el: HTMLElement*/): string | null {
    // Return null to use default type handling (same as standard select)
    return null;
  }

  subscribe(el: HTMLElement, callback: InputSubscribeCallback) {
    const selectEl = el.querySelector("select");
    if (selectEl && this.#selectBinding) {
      this.#selectBinding.subscribe(selectEl, callback);
    } else if (selectEl) {
      // Fallback: subscribe to change event
      $(selectEl).on("change.bslibToolbarInputSelect", () => {
        callback("event");
      });
    }
  }

  unsubscribe(el: HTMLElement) {
    const selectEl = el.querySelector("select");
    if (selectEl && this.#selectBinding) {
      this.#selectBinding.unsubscribe(selectEl);
    } else if (selectEl) {
      $(selectEl).off(".bslibToolbarInputSelect");
    }
  }

  async receiveMessage(el: HTMLElement, message: ToolbarInputSelectMessage) {
    // el is the wrapper div with class .bslib-toolbar-input-select
    const selectEl = el.querySelector("select");

    console.log("[toolbar-input-select] receiveMessage called", {
      el,
      message,
      hasIcon: hasDefinedProperty(message, "icon"),
      iconValue: message.icon,
      elClasses: el.className,
      elId: el.id,
      selectId: selectEl?.id,
    });

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
      console.log("[toolbar-input-select] Updating icon", {
        iconEl,
        iconElExists: !!iconEl,
        iconValue: message.icon,
        iconElInnerHTML: iconEl?.innerHTML,
        elOuterHTML: el.outerHTML.substring(0, 200),
        checkIconEl: !!iconEl,
        checkMessageIcon: message.icon !== undefined,
        messageIconType: typeof message.icon,
      });
      if (iconEl && message.icon !== undefined) {
        console.log("[toolbar-input-select] Before shinyRenderContent:", {
          iconElInnerHTML: iconEl.innerHTML,
          messageIcon: message.icon,
        });
        await shinyRenderContent(iconEl, message.icon);
        console.log("[toolbar-input-select] After shinyRenderContent:", {
          iconElInnerHTML: iconEl.innerHTML,
        });
        console.log("[toolbar-input-select] Icon updated successfully");
      } else {
        console.warn("[toolbar-input-select] Condition failed:", {
          iconElExists: !!iconEl,
          messageIconUndefined: message.icon === undefined,
          messageIcon: message.icon,
        });
      }
    }

    // Update choices
    if (hasDefinedProperty(message, "choices") && selectEl) {
      const choices = message.choices;
      if (choices && choices.options) {
        // Replace the select options with new HTML
        selectEl.innerHTML = choices.options;

        // Set the selected value(s) if provided
        if (choices.selected !== undefined) {
          const selected = choices.selected;
          if (Array.isArray(selected)) {
            Array.from(selectEl.options).forEach((opt) => {
              opt.selected = selected.includes(opt.value);
            });
          } else {
            selectEl.value = selected;
          }
        }

        // Trigger change event to notify Shiny of the value change
        $(selectEl).trigger("change");
      }
    }
  }
}

// Register with higher priority (lower number = higher priority) than the
// default select binding (priority 50) so we claim toolbar selects first
registerBinding(BslibToolbarInputSelectBinding, "toolbar-input-select", 40);
