import { InputBinding } from "./_utils";
import { shinyAddCustomMessageHandlers } from "./webcomponents/_shinyAddCustomMessageHandlers";

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
};

if (window.Shiny) {
  shinyAddCustomMessageHandlers(bslibMessageHandlers);
}
