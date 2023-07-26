import type { InputBinding as InputBindingType } from "rstudio-shiny/srcts/types/src/bindings/input";
import { InputBinding } from "./_utils";

interface ElementInputBinding {
  element?: HTMLElement;
  binding?: InputBindingType;
}

function getShinyInputBinding(id: string): ElementInputBinding {
  const ret = {} as ElementInputBinding;

  ret.element = document.getElementById(id) as HTMLElement;
  if (!ret.element) {
    console.warn("[bslib] No input element found", { id });
    return ret;
  }

  ret.binding = $(ret.element).data("shiny-input-binding");

  if (!(ret.binding instanceof InputBinding)) {
    console.warn("[bslib] No input binding found", { id });
    return ret;
  }

  return ret;
}

Shiny.addCustomMessageHandler("bslib.toggle-input-binary", function (msg) {
  // This handler was written for `toggle_switch()`, but could be used for any
  // binary Shiny input, e.g. checkbox.

  const { element, binding } = getShinyInputBinding(msg.id);
  if (typeof element === "undefined" || typeof binding === "undefined") return;

  let value = msg.value;
  if (typeof value === "undefined") {
    value = !binding.getValue(element);
  }
  binding.receiveMessage(element, { value });
});

Shiny.addCustomMessageHandler(
  "bslib.disable-input",
  function ({ id, disable }: { id: string; disable: boolean | undefined }) {
    // In the future we could use the binding (e.g. .getState() method) to
    // determine or set the disabled state.

    const element = document.getElementById(id);
    if (!(element instanceof HTMLElement)) return;

    if (typeof disable === "undefined") {
      disable = !(
        element.hasAttribute("disabled") ||
        element.classList.contains("disabled")
      );
    }

    if (disable) {
      element.setAttribute("disabled", "");
      element.classList.add("disabled");
    } else {
      element.removeAttribute("disabled");
      element.classList.remove("disabled");
    }
  }
);
