import { InputBinding } from "./_utils";
import type { DarkModeMessageToggle } from "./darkModeSwitch";

const bslibMessageHandlers = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.toggle-input-binary": (msg: any) => {
    // This handler was written for `toggle_switch()`, but could be used for any
    // binary Shiny input, e.g. checkbox.
    const el = document.getElementById(msg.id) as HTMLElement;
    if (!el) {
      console.warn("[bslib.toggle-input-binary] No element found", msg);
    }

    const binding = $(el).data("shiny-input-binding");
    if (!(binding instanceof InputBinding)) {
      console.warn("[bslib.toggle-input-binary] No input binding found", msg);
      return;
    }

    let value = msg.value;
    if (typeof value === "undefined") {
      value = !binding.getValue(el);
    }
    binding.receiveMessage(el, { value });
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  "bslib.toggle-dark-mode": ({ method, value }: DarkModeMessageToggle) => {
    // Similar to DarkModeSwitch.receiveMessage(), but we directly update the
    // Bootstrap attribute on the <html> element. Currently, all toggle switches
    // follow this value.

    if (method !== "toggle") return;

    if (typeof value === "undefined" || value === null) {
      const current = document.documentElement.dataset.bsTheme || "light";
      value = current === "light" ? "dark" : "light";
    }

    document.documentElement.dataset.bsTheme = value;
  },
};

if (window.Shiny) {
  for (const [name, handler] of Object.entries(bslibMessageHandlers)) {
    Shiny.addCustomMessageHandler(name, handler);
  }
}
